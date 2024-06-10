// import { useEffect, useState } from "react";
// import { GET_MOVIE } from "./constants";

// const useScrollMovieList = () => {
//   const [movieList, setMovieList] = useState([]);
//   const [year, setYear] = useState(2012);
//   const fetchMovieData = async (params = {}) => {
//     let url = GET_MOVIE + "?api_key=" + process.env.REACT_APP_API_KEY;
//     Object.keys(params).forEach((key) => {
//       url += "&" + key + "=" + params[key];
//     });
//     const data = await fetch(url);
//     const list = await data.json();
//     setMovieList(list.results);
//   };
//   const fetchNextMovieData = async (params = {}) => {
//     let url =
//       GET_MOVIE +
//       "?sort_by=popularity.desc&primary_release_year=" +
//       year +
//       "&api_key=" +
//       process.env.REACT_APP_API_KEY;
//     Object.keys(params).forEach((key) => {
//       url += "&" + key + "=" + params[key];
//     });
//     const data = await fetch(url);
//     const list = await data.json();
//     console.log("movieList => ", movieList);
//     setMovieList((prev) => [...prev, ...list.results]);
//   };
//   const mainDebounce = (debcounceFunc, time) => {
//     let timer;

//     return () => {
//       if (timer) {
//         clearTimeout(timer);
//       }
//       timer = setTimeout(() => {
//         // let context = this, args = arguments;
//         debcounceFunc(); // or debcounceFunc.apply(context, args);
//       }, time);
//     };
//   };
//   const debounceHandler = mainDebounce(() => {
//     var scrollHeight = document.documentElement.scrollHeight;
//     var scrollTop = document.documentElement.scrollTop;
//     var clientHeight = document.documentElement.clientHeight;

//     if (scrollHeight - scrollTop - clientHeight === 0) {
//       // put some condition to get the year wise list
//       console.log("Scrolled bottom ***************************** ");
//       setYear((prev) => prev + 1);
//       fetchNextMovieData();
//     } else if (scrollTop === 0) {
//       // put some condition to get the year wise list
//       console.log("Scrolled top ***************************** ");
//       setYear((prev) => {
//         return prev - 1;
//       });
//       fetchNextMovieData();
//     }
//   }, 500);
//   useEffect(() => {
//     fetchMovieData();
//     window.addEventListener("scroll", debounceHandler);
//   }, []);
//   return { movieList: movieList, year: year };
// };

export default useScrollMovieList;
