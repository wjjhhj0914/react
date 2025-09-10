import { useContext } from 'react';
import { TicTacToeContext } from '../game';
import S from './status.module.css';

export default function Status() {
  const gameState = useContext(TicTacToeContext);

  return (
    <h2 className={S.Status} role="status">
      {gameState?.statusMessage}
    </h2>
  );
}
