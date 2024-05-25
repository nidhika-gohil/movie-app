import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
  return (
    <div className="main-app-container">
      <Header />
    </div>
  );
};

root.render(<AppLayout />);
