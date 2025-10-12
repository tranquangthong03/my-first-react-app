import React, { useState, useEffect } from "react";
import Search from "./components/Search";
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]); // State to hold the list of movies
  const [loading, setLoading] = useState(false); // State to indicate loading status
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const fetchMovies = async () => {
    setLoading(true); // Set loading to true before fetching
    setErrorMessage(""); // Clear any previous error messages
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        // if response is not ok, throw an error
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      console.log(data);
      if (data.Response === "False") {
        // Return if API returns an error
        throw new Error("Failed to fetch movies");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []); // Update state with fetched movies
    } catch (error) {
      console.log(`Error: ${error}`);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span>You'll Love
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2>All Movies</h2>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>
      </div>
    </main>
  );
};
export default App;
