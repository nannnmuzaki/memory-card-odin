import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { GifCard } from "./components/GifCard/GifCard";
import { Scoreboard } from "./components/Scoreboard/Scoreboard";

function App() {
  const [cardsData, setCardsData] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  const score = clickedIds.length;

  if (isGameOver) {
    if (score > bestScore) {
      setBestScore(score);
    }

    setClickedIds([]);
    setIsGameOver(false);
  }

  return (
    <>
      <Header />
      <Scoreboard score={score} bestScore={bestScore} />
      <GifCard
        cardsData={cardsData}
        setCardsData={setCardsData}
        clickedIds={clickedIds}
        setClickedIds={setClickedIds}
        setIsGameOver={setIsGameOver}
      />
    </>
  );
}

export default App;
