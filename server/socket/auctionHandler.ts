import { Server, Socket } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// This keeps track of the active auction in memory
let auctionState = {
  currentPlayer: null as any,
  currentBid: 0,
  highestBidder: null as string | null,
  timer: 15,
  isActive: false
};

export const setupAuctionConfig = (io: Server) => {
  io.on("connection", (socket: Socket) => {

    socket.on("join_auction", (roomId: string) => {
      socket.join(roomId);
    });

    // 1. Fetch and Start a New Player
    socket.on("start_player", async ({ roomId, playerId }) => {
      const player = await prisma.player.findUnique({ where: { id: playerId } });
      
      if (player) {
        auctionState = {
          currentPlayer: player,
          currentBid: player.basePrice,
          highestBidder: null,
          timer: 15,
          isActive: true
        };
        io.to(roomId).emit("new_player_started", auctionState);
      }
    });

    // 2. Place Bid with Budget Check
    socket.on("place_bid", async (data: { roomId: string, teamId: string, bidAmount: number }) => {
      const { roomId, teamId, bidAmount } = data;

      try {
        // Logic: Check if team has enough purse (120 - already spent)
        // Fixed: Added "as any" assertion to bypass the strict compiler types on Render
        const spent = await (prisma.squadMember.aggregate({
          where: { roomId, buyerId: teamId },
          _sum: { price: true }
        }) as any);

        const totalSpent = spent?._sum?.price || 0;
        const currentPurse = 120 - totalSpent;

        if (bidAmount <= currentPurse) {
          auctionState.currentBid = bidAmount;
          auctionState.highestBidder = teamId;
          auctionState.timer = 15; // Reset timer on every bid

          io.to(roomId).emit("bid_updated", {
            currentBid: auctionState.currentBid,
            highestBidderId: teamId
          });
        } else {
          socket.emit("error", "Insufficient Balance!");
        }
      } catch (error) {
        console.error("Error processing bid:", error);
        socket.emit("error", "An internal error occurred while placing your bid.");
      }
    });

    // 3. Finalize Sale
    socket.on("confirm_sold", async (roomId: string) => {
      if (auctionState.highestBidder && auctionState.currentPlayer) {
        await prisma.squadMember.create({
          data: {
            roomId: roomId,
            playerId: auctionState.currentPlayer.id,
            buyerId: auctionState.highestBidder,
            price: auctionState.currentBid
          }
        });

        io.to(roomId).emit("player_sold", {
          winner: auctionState.highestBidder,
          price: auctionState.currentBid,
          player: auctionState.currentPlayer.name
        });
        
        auctionState.isActive = false;
      }
    });
  });
};