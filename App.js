import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header/Header";
import Movie from "./src/components/Movie/Movie";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
  return (
    <div className="main-app-container">
      <Header />
      <Movie />
    </div>
  );
};

root.render(<AppLayout />);
