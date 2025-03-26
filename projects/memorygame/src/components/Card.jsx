import "../css/Card.css";

export function Card({ title, imgUrl, onClick }) {
  return (
    <div className="card">
      <img
        src={imgUrl}
        alt={title}
        onClick={onClick}
        width="200px"
        height="200px"
      />
      <p>{title}</p>
    </div>
  );
}
