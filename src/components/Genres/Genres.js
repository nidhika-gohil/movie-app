import { useEffect, useState } from "react";
import "./Genres.css";
import { GET_GENRES } from "../../utils/constants";

const Genres = () => {
  const [genresList, setGenresList] = useState([]);
  const fetchGenres = async () => {
    let data = await fetch(
      GET_GENRES + "?api_key=" + process.env.REACT_APP_API_KEY
    );
    // console.log("data => ", data);
    let list = await data.json();
    // console.log("list => ", list);
    setGenresList(list.genres);
  };
  useEffect(() => {
    fetchGenres();
  }, []);
  if (genresList.length == 0) {
    return <div className="shimmer_ui"></div>;
  }
  return (
    <div className="movie_app_genres_container">
      <div className="movie_app_genre selected">All</div>
      {genresList.map((genre) => {
        // console.log("genre => ", genre);
        return (
          <div className="movie_app_genre" key={genre.id}>
            {genre.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
