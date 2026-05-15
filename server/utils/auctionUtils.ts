import { Player, players, playerSets } from "../data/players";

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffle<T>(array: T[] | readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i] as T;
    result[i] = result[j] as T;
    result[j] = temp;
  }
  return result;
}

/**
 * Generates the master auction list by shuffling sets first,
 * then shuffling players within those sets.
 */
export const generateRandomAuctionList = (): Player[] => {
  // Explicitly casting keys to ensure they are treated as valid keys of playerSets
  const allSetKeys = Object.keys(playerSets) as Array<keyof typeof playerSets>;
  
  // 1. Shuffle the order of the sets
  const shuffledSetKeys = shuffle(allSetKeys);

  const auctionOrder: Player[] = [];
  
  // Explicitly defined as Set<string> 
  const assignedPlayerNames: Set<string> = new Set<string>();

  // 2. Process each set
  for (const setKey of shuffledSetKeys) {
    // FIX: Changed type from string[] to readonly string[]
    const playerNamesInSet: readonly string[] = playerSets[setKey];
    
    // Find player objects from the master list that belong to this set
    const setPlayers = players.filter((p) => playerNamesInSet.includes(p.name));
    
    // Shuffle players within this specific set
    const shuffledSetPlayers = shuffle(setPlayers);
    
    // Add players to the final list if they haven't been added yet
    for (const player of shuffledSetPlayers) {
      if (!assignedPlayerNames.has(player.name)) {
        auctionOrder.push(player);
        assignedPlayerNames.add(player.name);
      }
    }
  }

  // 3. Handle any players not in a specific set (like those manually defined marquee players)
  const remainingPlayers = players.filter(
    (p) => !assignedPlayerNames.has(p.name)
  );

  if (remainingPlayers.length > 0) {
    const shuffledRemaining = shuffle(remainingPlayers);
    auctionOrder.push(...shuffledRemaining);
  }

  return auctionOrder;
};