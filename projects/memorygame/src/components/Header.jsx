import "../css/Header.css";

export function Header({ setSearchInput, score, message }) {
  return (
    <div className="header">
      <h1>Memory Gif Game</h1>
      <p>
        Check your memory: click on each gif, but avoid repeated clicks on the
        same gif
      </p>

      <div className="searchInput">
        <label>
          New Search:
          <input
            type="text"
            placeholder="Simpsons"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </label>
      </div>
      <div>
        <div className="result">
          <p>Score: {score}</p>
          <p className="message">{message}</p>
        </div>
      </div>
    </div>
  );
}
