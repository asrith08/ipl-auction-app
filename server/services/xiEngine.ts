import { Player } from '../data/players';

export const pickBestXI = (squad: Player[]) => {
  // 1. Separate players by role and origin
  const overseas = squad.filter(p => p.overseas).sort((a, b) => (b.rating || 0) - (a.rating || 0));
  const Indians = squad.filter(p => !p.overseas).sort((a, b) => (b.rating || 0) - (a.rating || 0));

  let finalXI: Player[] = [];
  let overseasCount = 0;

  // 2. Simple Role-Based Selection Logic
  // (In a real app, you'd check for 1 WK, 3-4 Bowlers, etc.)
  const sortedSquad = [...squad].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  for (const player of sortedSquad) {
    if (finalXI.length >= 11) break;

    if (player.overseas) {
      if (overseasCount < 4) {
        finalXI.push(player);
        overseasCount++;
      }
    } else {
      finalXI.push(player);
    }
  }

  return finalXI;
};