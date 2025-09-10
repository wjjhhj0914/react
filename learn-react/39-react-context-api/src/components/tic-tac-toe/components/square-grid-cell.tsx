import { type MouseEvent, useContext } from 'react';
import { tw } from '@/utils';
import { GRID, type PlayerType, getPlayerName } from '../constants';
import { TicTacToeContext } from '../game';
import S from './square-grid-cell.module.css';

interface Props {
  isWinnerPattern?: boolean;
  children: PlayerType | null;
  index: number;
}

export default function SquareGridCell({
  isWinnerPattern,
  children,
  index,
}: Props) {
  const gameState = useContext(TicTacToeContext);

  const isDisabled = !!children;

  const playerName = getPlayerName(children);

  const label = `${index + 1}번째 칸, ${playerName}`;

  const rowIndex = Math.floor(index / GRID.ROWS) + 1;

  const colIndex = (index % GRID.COLS) + 1;

  const handlePlay = (e: MouseEvent<HTMLButtonElement>) => {
    gameState?.playGame(index, e);
  };

  return (
    <button
      role="gridcell"
      className={tw(S.SquareGridCell, isWinnerPattern && 'bg-yellow-300!')}
      onClick={handlePlay}
      aria-disabled={isDisabled}
      aria-rowindex={rowIndex}
      aria-colindex={colIndex}
      aria-label={label}
    >
      {children}
    </button>
  );
}
