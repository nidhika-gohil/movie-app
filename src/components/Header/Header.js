import Genres from "../Genres/Genres";
import "./Header.css";

const Header = () => {
  return (
    <div className="header_container">
      <header className="movie_app_header">
        <h1>Movie Listing App</h1>
      </header>
      <div>
        <Genres />
      </div>
    </div>
  );
};

export default Header;
