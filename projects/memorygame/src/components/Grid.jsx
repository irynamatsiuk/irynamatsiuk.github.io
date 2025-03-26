import "../css/Grid.css";
import { useEffect } from "react";
import { Card } from "./Card";

export function Grid({
  searchInput,
  imgData,
  setImgData,
  setGameOver,
  setMessage,
  handleClick,
}) {
  const q = searchInput;

  useEffect(() => {
    let ignore = false;
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=ybUi056GFkZbxTAtFs47M6b5EtR8Zz1P&q=${q}&limit=12&offset=0&rating=g&lang=en&bundle=messaging_non_clips`,
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((response) => {
        if (!ignore) {
          const imgObj = response.data.map((img) => ({
            id: img.id,
            url: img.images.original.url,
            title: img.title,
            isClicked: false,
          }));
          setImgData(imgObj);
          setGameOver(false);
          setMessage("");
        }
      });
    return () => {
      ignore = true;
    };
  }, [q]);

  return (
    <div className="grid">
      {imgData.map((image) => (
        <Card
          key={image.id}
          title={image.title}
          imgUrl={image.url}
          onClick={() => handleClick(image.id)}
        />
      ))}
    </div>
  );
}
