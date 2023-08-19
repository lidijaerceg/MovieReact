import { useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import { landingPageDTO } from "./movies.model";
import axios, { AxiosResponse } from "axios";
import { urlMovies } from "../endpoints";
import AlertContext from "../utils/AlertContext";

export default function LandingPage() {
  const [movies, setMovies] = useState<landingPageDTO>({});

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    axios.get(urlMovies).then((response: AxiosResponse<landingPageDTO>) => {
      setMovies(response.data);
    });
  }

  return (
    <AlertContext.Provider
      value={() => {
        loadData();
      }}
    >

      <h3>Movies</h3>
      <MoviesList movies={movies.movie} />
    </AlertContext.Provider>
  );
}
