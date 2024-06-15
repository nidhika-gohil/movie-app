import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header/Header";
import Movie from "./src/components/Movie/Movie";
import { GenresProvider } from "./src/utils/GenresContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
  return (
    <div className="main-app-container">
      <GenresProvider>
        <Header />
        <Movie />
      </GenresProvider>
    </div>
  );
};

root.render(<AppLayout />);
