import { Card } from "./Card/Card";
import { useState, useEffect } from "react";
import "./GifCard.css";

const GIFS = [
  { id: "wZuqtORr4zRf6r8RTL", name: "Cobson", url: "" },
  { id: "KzaBIW1AQ5gubGktAQ", name: "Chudjak", url: "" },
  { id: "CNt6ZAx90T94RUj5GT", name: "Wojak", url: "" },
  { id: "7ZiH2PsAoRPnLfccqL", name: "SquirrelJak", url: "" },
];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export function GifCard({ cardsData, setCardsData, clickedIds, setClickedIds, setIsGameOver }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function startFetching() {
      setIsLoading(true);
      setError(null);

      try {
        let ids = GIFS.map((item) => item.id).join(",");
        const query = `https://api.giphy.com/v1/gifs?api_key=U3r51LJVi1SQniHri4OnFnC06z92g4SJ&ids=${ids}`;
        const response = await fetch(query, { signal });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();

        const formattedData = GIFS.map((item) => {
          const fetchedGif = json.data.find((gif) => gif.id === item.id);

          return {
            ...item,
            url: fetchedGif ? fetchedGif.images.downsized.url : "",
          };
        });

        setCardsData(shuffleArray(formattedData));
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Caught error:", err);
          setError(err.message);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    startFetching();

    return () => {
      controller.abort();
    };
  }, [setCardsData]);

  const handleCardClick = (id) => {
    if (clickedIds.includes(id)) {
      setIsGameOver(true);
    } else {
      setClickedIds((prev) => [...prev, id]);
      setCardsData((prevCards) => shuffleArray(prevCards));
    }
  };

  return (
    <div className={`cards-grid ${isLoading ? "loading" : error ? "error" : ""}`}>
      {isLoading && <strong>Loading...</strong>}
      {error && <strong>{error}</strong>}
      {cardsData.length > 0 &&
        cardsData.map((item) => (
          <Card key={item.id} gifData={item} onCardClick={handleCardClick} />
        ))}
    </div>
  );
}
