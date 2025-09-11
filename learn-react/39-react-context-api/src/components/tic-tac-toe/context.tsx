import {
  type MouseEvent,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  GRID,
  INITIAL_SQUARES,
  PLAYER,
  type PlayGameFunctionType,
  type PlayerType,
  type SquaresType,
  type WinnerType,
  checkWinner,
} from './constants';

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

const TicTacToeContext = createContext<null | GameState>(null);

export default function TicTacToeProvider({ children }: PropsWithChildren) {
  const gameState: GameState = useT3State();

  return (
    <TicTacToeContext.Provider value={gameState}>
      {children}
    </TicTacToeContext.Provider>
  );
}

function useT3State() {
  const [gameHistory, setGameHistory] = useState<SquaresType[]>([
    INITIAL_SQUARES,
  ]);

  const [gameIndex, setGameIndex] = useState<number>(0);

  const squares: SquaresType = gameHistory[gameIndex];

  const nextPlayer: PlayerType = gameIndex % 2 === 0 ? PLAYER.ONE : PLAYER.TWO;

  const winner = checkWinner(squares);

  const isDraw = !winner && gameIndex === GRID.COLS * GRID.ROWS;

  const playGame: PlayGameFunctionType = useCallback(
    (squareIndex: number, e: MouseEvent<HTMLButtonElement>) => {
      if (winner) {
        return alert('GAME OVER');
      }

      const target = e.target as HTMLButtonElement;

      if (target.getAttribute('aria-disabled') === 'true') {
        return alert(
          '이미 게임이 진행된 칸입니다. 다른 빈 칸에 말을 놓으세요.'
        );
      }

      const nextGameIndex = gameIndex + 1;
      setGameIndex(nextGameIndex);

      const nextSquares = squares.map((square, index) =>
        index === squareIndex ? nextPlayer : square
      );

      const nextGameHistory = [
        ...gameHistory.slice(0, nextGameIndex),
        nextSquares,
      ];
      setGameHistory(nextGameHistory);
    },
    [gameHistory, gameIndex, nextPlayer, squares, winner]
  );

  const restartGame = useCallback(() => {
    setGameHistory([INITIAL_SQUARES]);
    setGameIndex(0);
  }, []);

  const makeTimeTravel = useCallback(
    (travelIndex: number) => () => {
      setGameIndex(travelIndex);
    },
    []
  );

  let statusMessage = `다음 플레이어 ${nextPlayer}`;
  if (winner) statusMessage = `게임 위너! ${winner.player}`;
  if (isDraw) statusMessage = '무승부! 게임 위너는 없습니다.';

  return {
    gameHistory,
    gameIndex,
    squares,
    nextPlayer,
    winner,
    isDraw,
    playGame,
    restartGame,
    makeTimeTravel,
    statusMessage,
  };
}

// 공급된 컨텍스트의 값을 컨텍스트 내부의
// 모든 컴포넌트에서 쉽게 꺼내올 수 있도록 커스텀 훅 작성
// eslint-disable-next-line react-refresh/only-export-components
export const useTicTacToe = () => {
  // 컨텍스트로부터 공급된 컨텍스트 값을 가져오려면?
  const gameState = useContext(TicTacToeContext);

  // 컨텍스트 내부에서만 커스텀 훅을 사용할 있어야 하므로 안전성 검사
  if (!gameState) {
    throw new Error(
      'useTicTacToe 훅은 TicTacToeProvider 내부에서만 사용 가능합니다.'
    );
  }

  return gameState;
};
