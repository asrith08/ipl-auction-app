import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import { Player } from './data/players';
import { generateRandomAuctionList } from "./utils/auctionUtils";
import authRoutes from "./routes/auth";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

interface Room {
  id: string;
  host: string;
  players: { id: string; username: string }[];
  settings: {
    purse: number;
    squadSize: number;
    bidTimer: number;
    isPrivate?: boolean;
    password?: string;
  };
  auctionQueue: Player[];
  currentIndex: number;
  purse: Record<string, number>;
  squads: Record<string, Player[]>; 
  currentBid: number;
  highestBidder: string;
  highestBidderId: string | null;
  currentPlayer: Player | null;
  auctionStarted: boolean;
  timer: any; 
  interval: any; 
}

const activeRooms: Record<string, Room> = {};

/**
 * HELPER: Finalizes the hammer for the current player
 * Triggers Sold/Unsold events and checks if the full auction is complete.
 */
const finalizePlayerHammer = (roomId: string) => {
  const room = activeRooms[roomId];
  if (!room) return;

  if (room.highestBidderId && room.currentPlayer) {
    const buyerId = room.highestBidderId;
    const buyerName = room.highestBidder;
    const finalPrice = room.currentBid;
    const playerSold = room.currentPlayer;

    room.purse[buyerId] -= finalPrice;
    room.squads[buyerId].push({ ...playerSold, basePrice: finalPrice });

    io.to(roomId).emit("player-sold", {
      buyerName: buyerName,
      player: playerSold,
      amount: finalPrice
    });
  } else {
    io.to(roomId).emit("player-unsold", { player: room.currentPlayer });
  }

  room.currentPlayer = null;

  // --- CHECK IF AUCTION IS COMPLETE ---
  if (room.currentIndex >= room.auctionQueue.length) {
    io.to(roomId).emit("auction-complete", room);
  } else {
    io.to(roomId).emit("room-update", room);
  }
};

/**
 * HELPER: Starts the 10-second ticker and the final timeout
 */
const startTimer = (roomId: string) => {
  const room = activeRooms[roomId];
  if (!room) return;

  if (room.timer) clearTimeout(room.timer);
  if (room.interval) clearInterval(room.interval);

  let timeLeft = room.settings.bidTimer;
  io.to(roomId).emit("timer-update", timeLeft);

  room.interval = setInterval(() => {
    timeLeft--;
    io.to(roomId).emit("timer-update", timeLeft);
    if (timeLeft <= 0) clearInterval(room.interval);
  }, 1000);

  room.timer = setTimeout(() => {
    finalizePlayerHammer(roomId);
  }, room.settings.bidTimer * 1000);
};

io.on("connection", (socket: Socket) => {
  console.log('User connected:', socket.id);

  // CREATE ROOM
  socket.on("create-room", (data: { settings: any }) => {
    const roomId = uuid();
    activeRooms[roomId] = {
      id: roomId,
      host: socket.id,
      players: [],
      settings: {
        purse: data.settings?.purse || 120,
        squadSize: data.settings?.squadSize || 18,
        bidTimer: 10, // Fixed at 10s per your requirement
        isPrivate: data.settings?.isPrivate || false,
        password: data.settings?.password || ""
      },
      auctionQueue: generateRandomAuctionList(),
      currentIndex: 0,
      purse: {},
      squads: {},
      currentBid: 0,
      highestBidder: "Base Price",
      highestBidderId: null,
      currentPlayer: null,
      auctionStarted: false,
      timer: null,
      interval: null
    };
    socket.join(roomId);
    socket.emit("room-created", roomId);
  });

  // JOIN ROOM
  socket.on("join-room", ({ roomId, username, password, bypassPassword }) => {
    const room = activeRooms[roomId];
    if (!room) return socket.emit("error-message", "Room not found");

    if (room.settings.isPrivate && !bypassPassword) {
      if (room.settings.password !== password) {
        return socket.emit("error-message", "Incorrect Room Password");
      }
    }

    if (room.players.length >= 10) return socket.emit("error-message", "Room is full");
    if (room.players.find(p => p.username === username)) return socket.emit("error-message", "Name taken");

    const newPlayer = { id: socket.id, username };
    room.players.push(newPlayer);
    room.purse[socket.id] = room.settings.purse;
    room.squads[socket.id] = [];

    socket.join(roomId);
    io.to(roomId).emit("room-update", room);
  });

  // GET NEXT PLAYER
  socket.on("get-next-player", ({ roomId }: { roomId: string }) => {
    const room = activeRooms[roomId];
    if (!room || room.host !== socket.id) return;

    const nextPlayer = room.auctionQueue[room.currentIndex];
    if (nextPlayer) {
      room.currentPlayer = nextPlayer; 
      room.currentBid = nextPlayer.basePrice;
      room.highestBidder = "Base Price";
      room.highestBidderId = null;
      room.currentIndex++; 
      room.auctionStarted = true;

      io.to(roomId).emit("new-player-on-hammer", nextPlayer);
      io.to(roomId).emit("room-update", room);
      
      startTimer(roomId);
    } else {
      // If no players are left in queue
      io.to(roomId).emit("auction-complete", room);
    }
  });

  // PLACE BID
  socket.on("place-bid", ({ roomId, amount, bidderName }: { roomId: string, amount: number, bidderName: string }) => {
    const room = activeRooms[roomId];
    if (!room || !room.currentPlayer) return;

    if (amount > room.purse[socket.id]) {
      socket.emit("error-message", "Insufficient funds!");
      return;
    }

    room.currentBid = amount;
    room.highestBidder = bidderName;
    room.highestBidderId = socket.id;

    io.to(roomId).emit("bid-update", {
      amount: room.currentBid,
      bidderName: room.highestBidder
    });

    startTimer(roomId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

const PORT = 5000;
httpServer.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));