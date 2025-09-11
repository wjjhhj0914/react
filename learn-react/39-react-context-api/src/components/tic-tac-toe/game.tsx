import Board from './components/board';
import History from './components/history';
import TicTacToeProvider from './context';
import S from './game.module.css';

export default function TicTacToeGame() {
  return (
    <TicTacToeProvider>
      <div className={S.Game}>
        <Board />
        <History />
      </div>
    </TicTacToeProvider>
  );
}
