import { createContext } from 'react';
import Board from './components/board';
import History from './components/history';
import type {
  PlayGameFunctionType,
  PlayerType,
  SquaresType,
  WinnerType,
} from './constants';
import S from './game.module.css';
import useTicTacToe from './hooks/use-tic-tac-toe';

interface GameState {
  gameHistory: SquaresType[];
  gameIndex: number;
  squares: SquaresType;
  nextPlayer: PlayerType;
  winner: WinnerType | null;
  isDraw: boolean;
  playGame: PlayGameFunctionType;
  restartGame: () => void;
  makeTimeTravel: (travelIndex: number) => () => void;
  statusMessage: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TicTacToeContext = createContext<null | GameState>(null);

export default function TicTacToeGame() {
  const gameState = useTicTacToe();

  return (
    <TicTacToeContext.Provider value={gameState}>
      <div className={S.Game}>
        <Board />
        <History />
      </div>
    </TicTacToeContext.Provider>
  );
}
