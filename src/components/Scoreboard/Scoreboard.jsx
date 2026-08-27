import "./Scoreboard.css";

export function Scoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <p>best Score : {bestScore}</p>
      <p>Score : {score}</p>
    </div>
  );
}
