import { createContext, useState } from "react";

export const GenresContext = createContext();

export const GenresProvider = ({ children }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  return (
    <GenresContext.Provider value={{ selectedGenres, setSelectedGenres }}>
      {children}
    </GenresContext.Provider>
  );
};
