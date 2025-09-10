import { useContext } from 'react';
import { TicTacToeContext } from '../game';
import S from './history-item.module.css';

interface Props {
  index: number;
  isFirst: boolean;
  selectedIndex: boolean;
  onTimeTravel: () => void;
}

export default function HistoryItem({
  index,
  isFirst,
  selectedIndex: isDisabled,
  onTimeTravel,
}: Props) {
  const gameState = useContext(TicTacToeContext);

  const label = isFirst
    ? '게임 시작!'
    : `게임 #${index < 10 ? `0${index}` : index}`;

  const ariaLabel = isFirst ? undefined : `${label} 이동`;

  const handler = isFirst ? gameState?.restartGame : onTimeTravel;

  return (
    <li className={S.HistoryListItem}>
      <button
        type="button"
        className={S.HistoryButton}
        aria-label={ariaLabel}
        disabled={isDisabled}
        onClick={handler}
      >
        {label}
      </button>
    </li>
  );
}
