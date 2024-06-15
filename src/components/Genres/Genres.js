import { useContext, useEffect, useState } from "react";
import "./Genres.css";
import { GET_GENRES } from "../../utils/constants";
import { GenresContext } from "../../utils/GenresContext";

const Genres = () => {
  const [genresList, setGenresList] = useState([]);
  const { selectedGenres, setSelectedGenres } = useContext(GenresContext);
  const addSelectionAttribute = (list) => {
    return list.map((genre) => ({ ...genre, selected: false }));
  };
  const fetchGenres = async () => {
    let data = await fetch(
      GET_GENRES + "?api_key=" + process.env.REACT_APP_API_KEY
    );
    let list = await data.json();
    let newGenresData = addSelectionAttribute(list.genres);
    setGenresList(newGenresData);
  };
  const handleAllGenres = () => {
    setSelectedGenres([]);
  };
  const addRemoveGenres = (genre) => {
    setSelectedGenres((prevGenres) => {
      if (prevGenres.some((g) => g.id === genre.id)) {
        // Genre is already selected, remove it
        return prevGenres.filter((g) => g.id !== genre.id);
      } else {
        return [...prevGenres, genre];
      }
    });
  };
  useEffect(() => {
    fetchGenres();
  }, []);
  if (genresList.length == 0) {
    return <div className="shimmer_ui"></div>;
  }
  return (
    <div className="movie_app_genres_container">
      <div
        className={`movie_app_genre ${
          selectedGenres.length === 0 ? "selected" : ""
        }`}
        onClick={handleAllGenres}
      >
        All
      </div>
      {genresList.map((genre) => {
        return (
          <div
            className={`movie_app_genre ${
              selectedGenres.some((g) => g.id === genre.id) ? "selected" : ""
            }`}
            onClick={() => {
              addRemoveGenres(genre);
            }}
            key={genre.id}
          >
            {genre.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
