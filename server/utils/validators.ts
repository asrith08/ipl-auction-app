import type { Player } from "../data/players";

export const validateSquad = (
  squad: Player[], 
  purse: number, 
  maxSquad: number
) => {
  const overseas = squad.filter(p => p.overseas);

  if (overseas.length > 8) {
    return {
      valid: false,
      message: "Only 8 overseas players allowed"
    };
  }

  if (squad.length > maxSquad) {
    return {
      valid: false,
      message: "Squad size exceeded"
    };
  }

  if (purse < 0) {
    return {
      valid: false,
      message: "Insufficient purse"
    };
  }

  return {
    valid: true
  };
};