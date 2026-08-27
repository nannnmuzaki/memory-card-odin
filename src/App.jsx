import { useState } from "react";
import { Header } from "./components/Header/Header";
import { GifCard } from "./components/GifCard/GifCard";
import { Scoreboard } from "./components/Scoreboard/Scoreboard";
import "./App.css";

function App() {
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);

  const score = clickedIds.length;

  const onCardClick = (id) => {
    if (clickedIds.includes(id)) {
      setBestScore((prev) => Math.max(prev, clickedIds.length));
      setClickedIds([]);
    } else {
      setClickedIds((prev) => [...prev, id]);
    }
  };

  return (
    <>
      <Header />
      <Scoreboard score={score} bestScore={bestScore} />
      <GifCard onCardClick={onCardClick} />
    </>
  );
}

export default App;
