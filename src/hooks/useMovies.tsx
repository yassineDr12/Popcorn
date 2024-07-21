import { useEffect, useState } from "react";
import { IMovie } from "../dataTypes";
import axios from "axios";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const useMovies = () => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const [movieSearchLoading, setMovieSearchLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        setMovieSearchLoading(true);
        try {
          const response = await axios.get(`https://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`);
          const movieList = response.data.Search;

          if (movieList) {
            const detailedMovieList: IMovie[] = await Promise.all(
              movieList.map(async (movie: IMovie) => {
                const response = await axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`);
                const movieData = response.data;

                return {
                  Title: movieData.Title,
                  Year: movieData.Year,
                  imdbID: movieData.imdbID,
                  Type: movieData.Type,
                  Poster: movieData.Poster,
                  Genre: movieData.Genre,
                  Plot: movieData.Plot,
                  Length: movieData.Runtime,
                  imdbRating: parseFloat(movieData.imdbRating),
                };
              })
            );

            setSearchResults(detailedMovieList);
          }
        } catch (error) {
          console.error("Error fetching movie data:", error);
        }

        setMovieSearchLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  return { searchResults, movieSearchLoading, searchQuery, setSearchResults, setMovieSearchLoading, setSearchQuery };
};

export default useMovies;
