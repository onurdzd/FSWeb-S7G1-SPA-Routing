import React, { useState, useEffect } from "react";
import axios from "axios";

import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import Film from "./Filmler/Film";
import FilmListesi from "./Filmler/FilmListesi";
import { Route } from "react-router-dom";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

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

  const KaydedilenlerListesineEkle = (a) => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    const savedYedek = saved;

    savedYedek.find((e) => e.id === a.id) === null && savedYedek.push(a);

    setSaved([...savedYedek]);
  };

  return (
    <div>
      <KaydedilenlerListesi list={[...saved]} />
      <Route exact path={"/"}>
        <FilmListesi movies={movieList}></FilmListesi>
      </Route>
      <Route path={"/filmler/:id"}>
        <Film KaydedilenlerListesineEkle={KaydedilenlerListesineEkle}></Film>
      </Route>
    </div>
  );
}
