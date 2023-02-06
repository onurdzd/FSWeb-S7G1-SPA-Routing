import React, { useState, useEffect } from "react";
import axios from "axios";

import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import Film from "./Filmler/Film";
import FilmListesi from "./Filmler/FilmListesi";
import { Route } from "react-router-dom";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);
  const [disable, setDisable] = useState("ads");

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <div>
      <KaydedilenlerListesi list={[...saved]} />
      <Route exact path={"/"}>
        <FilmListesi movies={movieList}></FilmListesi>
      </Route>
      <Route path={"/filmler/:id"}>
        <Film
          KaydedilenlerListesineEkle={KaydedilenlerListesineEkle}
          setSaved={setSaved}
          saved={saved}
          disable={disable}
          setDisable={setDisable}
        ></Film>
      </Route>
    </div>
  );
}
