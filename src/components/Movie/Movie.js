import { useEffect, useState } from "react";
import "./Movie.css";
import { GET_MOVIE, IMAGE_PATH } from "../../utils/constants";
// import useScrollMovieList from "../../utils/useScrollMovieList";

const Movie = () => {
  const [movieList, setMovieList] = useState([]);
  const [year, setYear] = useState(2012);
  const fetchMovieData = async (params = {}) => {
    let url = GET_MOVIE + "?api_key=" + process.env.REACT_APP_API_KEY;
    Object.keys(params).forEach((key) => {
      url += "&" + key + "=" + params[key];
    });
    const data = await fetch(url);
    const list = await data.json();
    setMovieList(list.results);
  };
  const fetchNextMovieData = async (primary_year, direction, params = {}) => {
    console.log("Year =================== > ", primary_year);
    let url =
      GET_MOVIE +
      "?sort_by=popularity.desc&primary_release_year=" +
      primary_year +
      "&api_key=" +
      process.env.REACT_APP_API_KEY;
    Object.keys(params).forEach((key) => {
      url += "&" + key + "=" + params[key];
    });
    const data = await fetch(url);
    const list = await data.json();
    // console.log("movieList => ", movieList);
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
    var clientHeight = document.documentElement.clientHeight;

    if (scrollHeight - scrollTop - clientHeight === 0) {
      // put some condition to get the year wise list
      console.log("Scrolled bottom ***************************** ");
      setYear((prev) => prev + 1);
      fetchNextMovieData(year + 1, "bottom");
    } else if (scrollTop === 0) {
      // put some condition to get the year wise list
      console.log("Scrolled top ***************************** ");
      setYear((prev) => {
        return prev - 1;
      });
      fetchNextMovieData(year - 1, "top");
    }
  }, 500);
  useEffect(() => {
    fetchMovieData();
    window.addEventListener("scroll", debounceHandler);
  }, []);

  if (movieList === undefined || movieList.length === 0) {
    return (
      <div>
        <h2>List is empty</h2>
      </div>
    );
  }
  return (
    <div id="movie_list_main_container">
      <div className="movie_year">{year}</div>
      <div id="movie_list_container">
        {movieList.map((movie) => {
          console.log("Movie =>>>>>>>>>>>>>>>>>>> ", movie);
          return (
            <div className="movie_item" key={movie.id}>
              <img
                className="movie_app_image"
                src={IMAGE_PATH + movie.poster_path}
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
};

export default Movie;
