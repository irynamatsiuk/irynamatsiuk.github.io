import "./css/App.css";
import { useState } from "react";
import { Header } from "./components/Header";
import { Grid } from "./components/Grid";
import { shuffle } from "./utility";

function App() {
  const [searchInput, setSearchInput] = useState("simpsons");
  const [imgData, setImgData] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const score = imgData.filter((img) => img.isClicked).length;

  function handleClick(clickedId) {
    if (gameOver) return;
    let nextImgData = imgData.map((img) => {
      checkGameOver(clickedId);
      if (img.id === clickedId && img.isClicked != true) {
        return {
          ...img,
          isClicked: true,
        };
      } else {
        return img;
      }
    });
    if (gameOver) return;
    else {
      nextImgData = shuffle(nextImgData);
      setImgData(nextImgData);
    }
  }

  function checkGameOver(clickedId) {
    imgData.map((img) => {
      if (img.id === clickedId && img.isClicked) {
        setMessage(
          "Unfortunately you lost this round, but don't give up - update the search field for a new challenge"
        );
        setGameOver(true);
        return;
      } else if (img.id === clickedId && score === imgData.length - 1) {
        setMessage(
          "Well done! You have a good memory. Would like to try again? Just update the search fild with new subject"
        );
        setGameOver(true);
        return;
      }
    });
  }

  return (
    <>
      <Header setSearchInput={setSearchInput} score={score} message={message} />
      <Grid
        searchInput={searchInput}
        imgData={imgData}
        setImgData={setImgData}
        gameOver={gameOver}
        setGameOver={setGameOver}
        checkGameOver={checkGameOver}
        setMessage={setMessage}
        handleClick={handleClick}
      />
    </>
  );
}

export default App;
