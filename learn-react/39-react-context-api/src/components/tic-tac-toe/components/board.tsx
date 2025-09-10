import SquaresGrid from './squares-grid';
import Status from './status';

export default function Board() {
  return (
    <div className="Board">
      <Status />
      <SquaresGrid />
    </div>
  );
}
