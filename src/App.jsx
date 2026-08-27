import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { GifCard } from "./components/GifCard/GifCard";

function App() {
  const [cardsData, setCardsData] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  if (isGameOver) {
    setClickedIds([]);
    setIsGameOver(false);
  }

  return (
    <>
      <Header />
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
