import React from "react";
import { useHistory } from "react-router";

export default function KaydedilenlerListesi(props) {
  const history = useHistory();
  function handleClick() {
    history.push("/");
  }

  return (
    <div className="saved-list">
      <h3>Kaydedilen Filmler:</h3>
      {props.list.map((movie, index) => (
        <span className="saved-movie" key={index}>
          {movie.title}
        </span>
      ))}
      <div className="home-button" onClick={handleClick}>
        Anasayfa
      </div>
    </div>
  );
}
