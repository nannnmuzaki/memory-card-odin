import "./Card.css";

export function Card({ gifData, clickedIds, setClickedIds, setIsGameOver }) {
  const handleClick = () => {
    if (clickedIds.includes(gifData.id)) {
      setIsGameOver(true);
    } else {
      setClickedIds((prev) => [...prev, gifData.id]);
    }
  };

  return (
    <button onClick={handleClick} className="card">
      <img src={gifData.url} alt={`a gif of ${gifData.url}`} />
      <strong>{gifData.name}</strong>
    </button>
  );
}
