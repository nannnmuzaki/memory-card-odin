import { Card } from "./Card/Card";
import { useState, useEffect } from "react";
import "./GifCard.css";

const GIFS = [
  { id: "wZuqtORr4zRf6r8RTL", name: "Gem Cobson", url: "" },
  { id: "KzaBIW1AQ5gubGktAQ", name: "Chudjak", url: "" },
  { id: "CNt6ZAx90T94RUj5GT", name: "Wojak", url: "" },
  { id: "7ZiH2PsAoRPnLfccqL", name: "SquirrelJak", url: "" },
  { id: "C9CoWYJBtw3uw5ofCb", name: "Billion must smile", url: "" },
  { id: "lcv0r1JOtHmCTYHef0", name: "Nodding Soyjak", url: "" },
  { id: "Y0ig1C8rK7Y8kEo4qP", name: "Dancing Impjak", url: "" },
  { id: "nLhOhQge5GVHarWZ7w", name: "Truth Nuke", url: "" },
  { id: "3tGbo2ey4lhkonNPFW", name: "Context Jak", url: "" },
  { id: "6KYhn9qv2Jes7szMsX", name: "Coal Jak", url: "" },
  { id: "YLn30deFai3xvKmgBK", name: "All Quiet on Happening Front", url: "" },
  { id: "j6uCp9lM2IaAhRcIGh", name: "Hope", url: "" },
];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export function GifCard({ onCardClick }) {
  const [cardsData, setCardsData] = useState([]);
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
  }, []);

  const handleCardClick = (id) => {
    onCardClick(id);
    setCardsData((prev) => shuffleArray(prev));
  };

  return (
    <div className={`cards-grid ${isLoading ? "loading" : error ? "error" : ""}`}>
      {isLoading && <strong>Loading...</strong>}
      {error && <strong>{error}</strong>}
      {!isLoading &&
        !error &&
        cardsData.length > 0 &&
        cardsData.map((item) => (
          <Card key={item.id} gifData={item} onCardClick={handleCardClick} />
        ))}
    </div>
  );
}
