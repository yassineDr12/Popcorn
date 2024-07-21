import React, { Dispatch, SetStateAction } from "react";

export type IMovie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre: string[] | undefined;
  Plot: string | undefined;
  Length: string | undefined;
  imdbRating: number | undefined;
};

export type IMovieListProps = {
  searchResults: IMovie[];
  movieSearchLoading: boolean;
  handleMovieClick: (movie: IMovie) => void;
};

export type IBodyProps = {
  searchResults: IMovie[];
  movieSearchLoading: boolean;
  setMovieSearchLoading: Dispatch<SetStateAction<boolean>>;
};
export interface INavbarProps {
  searchQuery: string | undefined;
  searchResults: IMovie[];
  movieSearchLoading: boolean;
  setSearchQuery: Dispatch<SetStateAction<string | undefined>>;
  setSearchResults: Dispatch<SetStateAction<IMovie[]>>;
  setMovieSearchLoading: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

export type IWatchedListProps = {
  watchedList: IMovie[];
  watchedListAvgRating: number | undefined;
  handleRemoveMovie: (imdbID: string) => void;
};

export type IStyledCardProps = {
  children: React.ReactNode;
};

export type IPersonalRatingProps = {
  selectedMovie: IMovie | undefined;
  setSelectedMovie: Dispatch<React.SetStateAction<IMovie | undefined>>;
  handleAddMovie: (movie: IMovie, ratingValue: number) => void;
};

export type IRatings = {
  imdbID: string;
  rating: number;
};

export type IMovieSearchInputFieldProps = {
  handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  movieSearchLoading: boolean;
  searchResults: IMovie[];
};
