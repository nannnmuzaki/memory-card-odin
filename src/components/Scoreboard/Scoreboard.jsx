import "./Scoreboard.css";

export function Scoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <p>Best Score : {bestScore}</p>
      <p>Score : {score}</p>
    </div>
  );
}
