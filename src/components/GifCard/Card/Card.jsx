import "./Card.css";

export function Card({ gifData, onCardClick }) {
  return (
    <button onClick={() => onCardClick(gifData.id)} className="card">
      <img src={gifData.url} alt={`a gif of ${gifData.url}`} />
      <strong>{gifData.name}</strong>
    </button>
  );
}
