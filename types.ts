export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type GameState = 'HOME' | 'PLAYING' | 'PAUSED' | 'VICTORY';

export interface GameMetrics {
  timeElapsed: number;
  moves: number;
  pairsFound: number;
}
