import { useContext, useEffect, useState } from "react";
import "./Movie.css";
import { GET_MOVIE, IMAGE_PATH } from "../../utils/constants";
import { GenresContext } from "../../utils/GenresContext";
// import useScrollMovieList from "../../utils/useScrollMovieList";

const Movie = () => {
  const [movieList, setMovieList] = useState([]);
  const [year, setYear] = useState(2012);
  const [prevYear, setPrevYear] = useState(2012);
  const [nextYear, setNextYear] = useState(2012);
  const { selectedGenres } = useContext(GenresContext);
  const groupMoviesByYear = () => {
    return movieList.reduce((acc, movie) => {
      let movieYear = movie.release_date.split("-")[0];
      if (!acc[movieYear]) {
        acc[movieYear] = [];
      }
      acc[movieYear].push(movie);
      return acc;
    }, {});
  };
  const fetchMovieData = async (/* params = {} */) => {
    var listOfGenres = selectedGenres.map((g) => g.id).join(",");
    let url =
      GET_MOVIE +
      "?primary_release_year=2012&vote_count_gte=100&api_key=" +
      process.env.REACT_APP_API_KEY;
    if (listOfGenres !== "") {
      url += "&with_genres=" + listOfGenres;
    }
    const data = await fetch(url);
    const list = await data.json();
    setMovieList(list.results);
  };
  const fetchNextMovieData = async (primary_year, direction) => {
    var listOfGenres = selectedGenres.map((g) => g.id).join(",");
    let url =
      GET_MOVIE +
      "?sort_by=popularity.desc&vote_count_gte=100&primary_release_year=" +
      primary_year +
      "&api_key=" +
      process.env.REACT_APP_API_KEY;
    // selectedGenres.map((g) => {
    //   listOfGenres += g.id + ",";
    // });
    if (listOfGenres !== "") {
      url += "&with_genres=" + listOfGenres;
    }
    const data = await fetch(url);
    const list = await data.json();
    if (direction === "bottom") {
      setMovieList((prev) => [...prev, ...list.results]);
    } else {
      setMovieList((prev) => [...list.results, ...prev]);
    }
  };
  const mainDebounce = (debcounceFunc, time) => {
    let timer;
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        // let context = this, args = arguments;
        debcounceFunc(); // or debcounceFunc.apply(context, args);
      }, time);
    };
  };
  const debounceHandler = mainDebounce(() => {
    var scrollHeight = document.documentElement.scrollHeight;
    var scrollTop = document.documentElement.scrollTop;
    var screenHeight = document.documentElement.clientHeight;

    if (Math.floor(scrollHeight - scrollTop - screenHeight) === 0) {
      // put some condition to get the year wise list
      setNextYear((nextYear) => {
        const newYear = nextYear + 1;
        fetchNextMovieData(newYear, "bottom");
        return newYear;
      });
    } else if (scrollTop === 0) {
      // put some condition to get the year wise list
      setPrevYear((prevYear) => {
        const newYear = prevYear - 1;
        fetchNextMovieData(newYear, "top");
        return newYear;
      });
    }
  }, 500);
  useEffect(() => {
    fetchMovieData();
    window.addEventListener("scroll", debounceHandler);
    return () => {
      setPrevYear(2012);
      setNextYear(2012);
      console.log("Cleaning up event listener ============> ");
      window.removeEventListener("scroll", debounceHandler);
    };
  }, [selectedGenres]);
  if (movieList === undefined || movieList.length === 0) {
    return (
      <div>
        <h2>List is empty</h2>
      </div>
    );
  }
  const groupedMovies = groupMoviesByYear(movieList);
  return (
    <div id="movie_list_main_container">
      {Object.entries(groupedMovies).map(([movieYear, updatedMovieList]) => {
        return (
          <div key={movieYear}>
            <div className="movie_year">{movieYear}</div>
            <div id="movie_list_container">
              {updatedMovieList.map((movie) => {
                return (
                  <div className="movie_item" key={movie.id}>
                    <img
                      className="movie_app_image"
                      src={IMAGE_PATH + movie.poster_path}
                      alt={movie.title}
                    />
                    <div>
                      <div className="movie_app_title">{movie.title}</div>
                      <div className="movie_app_desc">{movie.overview}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Movie;
