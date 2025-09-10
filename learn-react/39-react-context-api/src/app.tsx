import { ErrorBoundary, LearnSection } from './components';
import RandomCountUp from './components/random-count-up';
import TicTacToeGame from './components/tic-tac-toe/game';

export default function App() {
  return (
    <LearnSection
      title="틱택토 게임 상태를 리액트의 컨텍스트 API로 공유"
      className="p-4"
    >
      <RandomCountUp />
      <ErrorBoundary>
        <TicTacToeGame />
      </ErrorBoundary>
    </LearnSection>
  );
}
