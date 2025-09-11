import { useTicTacToe } from '../context';
import S from './status.module.css';

export default function Status() {
  const gameState = useTicTacToe();

  return (
    <h2 className={S.Status} role="status">
      {gameState?.statusMessage}
    </h2>
  );
}
