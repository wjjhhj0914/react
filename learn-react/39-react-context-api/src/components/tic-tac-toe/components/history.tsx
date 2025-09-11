import { useTicTacToe } from '../context';
import HistoryItem from './history-item';
import S from './history.module.css';

export default function History() {
  const gameState = useTicTacToe();

  return (
    <div className={S.History}>
      <ol className={S.HistoryList}>
        {gameState?.gameHistory.map((_, index) => (
          <HistoryItem
            key={index}
            index={index}
            isFirst={index === 0}
            selectedIndex={gameState.gameIndex === index}
            onTimeTravel={gameState.makeTimeTravel(index)}
          />
        ))}
      </ol>
    </div>
  );
}
