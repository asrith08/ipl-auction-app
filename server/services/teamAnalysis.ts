import { Player } from '../data/players';
import { pickBestXI } from './xiEngine';

interface AnalysisResult {
  teamName: string;
  bestXI: Player[];
  scores: {
    opening: number;
    middleOrder: number;
    pace: number;
    spin: number;
    captaincy: number;
    balance: number;
  };
  totalAverage: number;
}

export const analyzeAllTeams = (squads: Record<string, Player[]>, playersInRoom: any[]): AnalysisResult[] => {
  const analysis = playersInRoom.map(user => {
    const squad = squads[user.id] || [];
    const xi = pickBestXI(squad);

    // Helper to get average rating of specific slices of the XI
    const getAvg = (start: number, end: number) => {
      const slice = xi.slice(start, end);
      if (slice.length === 0) return 0;
      return slice.reduce((acc, p) => acc + (p.rating || 50), 0) / slice.length;
    };

    const scores = {
      opening: getAvg(0, 2), // First 2 players
      middleOrder: getAvg(2, 6), // Middle 4 players
      pace: getAvg(7, 11), // Assuming tail contains bowlers
      spin: getAvg(6, 9), 
      captaincy: Math.max(...xi.map(p => p.rating || 0)) * 0.9, // Best player acts as captain metric
      balance: (squad.length / 18) * 100 // How close they got to a full squad
    };

    const totalAverage = Object.values(scores).reduce((a, b) => a + b, 0) / 6;

    return {
      teamName: user.username,
      bestXI: xi,
      scores,
      totalAverage
    };
  });

  // Rank by Total Average
  return analysis.sort((a, b) => b.totalAverage - a.totalAverage);
};