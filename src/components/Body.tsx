import React, { useEffect, useState } from "react";
import { IBodyProps, IMovie, IRatings } from "../dataTypes";
import { Grid } from "@mui/material";
import MovieList from "./MovieList";
import WatchedList from "./WatchedList";
import StyledCard from "./StyledCard";
import PersonalRating from "./PersonalRating";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

// a function that saves the watchedList to local storage
const persistWatchedList = (watchedList: IMovie[]) => {
  localStorage.setItem("watchedList", JSON.stringify(watchedList));
};

// a function that loads watchedList from local storage and returns it
const loadWatchedList = (): IMovie[] => {
  return JSON.parse(localStorage.getItem("watchedList") || "[]");
};

const persistRatings = (ratings: IRatings[]) => {
  localStorage.setItem("ratings", JSON.stringify(ratings));
};

const loadRatings = (): IRatings[] => {
  return JSON.parse(localStorage.getItem("ratings") || "[]");
};

const Body: React.FC<IBodyProps> = ({ searchResults, movieSearchLoading }) => {
  const [watchedList, setWatchedList] = useState<IMovie[]>(loadWatchedList);
  const [watchedListRating, setWatchedListRating] = useState<IRatings[]>(loadRatings);
  let watchedListAvgRating = watchedListRating.reduce((acc, curr) => acc + curr.rating, 0) / watchedListRating.length;

  const [selectedMovie, setSelectedMovie] = useState<IMovie | undefined>(undefined);
  const [snackbar, setSnackbar] = React.useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState("second");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "warning" | "info" | "error" | undefined>(undefined);

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    setSnackbar(false);
  };

  useEffect(() => {
    persistRatings(watchedListRating);
  }, [watchedListRating]);

  useEffect(() => {
    if (watchedList.length > 0) {
      setAlertSeverity("success");
      setSnackbarMessage("Watch List updated!");
      setSnackbar((prev) => !prev);
      setSelectedMovie(undefined);
    }
    persistWatchedList(watchedList);
  }, [watchedList]);

  const handleMovieClick = (movie: IMovie) => {
    setSelectedMovie(movie);
  };

  const handleAddMovie = (movie: IMovie, ratingValue: number) => {
    // Check if the movie already exists in watchedList
    if (!watchedList.some((m) => m.imdbID === movie.imdbID)) {
      // Calculate the new average rating
      const sum = watchedListRating.reduce((acc, curr) => acc + curr.rating, 0) + ratingValue;
      const newRating = sum / (watchedListRating.length + 1);

      // Update watchedListRating, watchedListAvgRating, watchedList and persist to local storage
      watchedListAvgRating = newRating;
      setWatchedListRating((prevRating) => [...prevRating, { rating: ratingValue, imdbID: movie.imdbID }]);
      setWatchedList((prevWatchedList) => [...prevWatchedList, movie]);
    } else {
      // Movie already exists in the list
      setAlertSeverity("warning");
      setSnackbarMessage("Already in the Watch List!");
      setSnackbar(true);
    }
  };

  const handleRemoveMovie = (imdbID: string) => {
    // Remove the movie from watchedList and update watchedListRating, watchedListAvgRating
    setWatchedList((prevWatchedList) => prevWatchedList.filter((m) => m.imdbID !== imdbID));
    setWatchedListRating((prevRating) => prevRating.filter((m) => m.imdbID !== imdbID));
    watchedListAvgRating = watchedListRating.reduce((acc, curr) => acc + curr.rating, 0) / watchedListRating.length;
  };

  return (
    <Grid container spacing={2} marginTop={1} justifyContent="center">
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message=""
      >
        <Alert onClose={handleSnackbarClose} severity={alertSeverity} variant="filled" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <StyledCard>
        <MovieList
          searchResults={searchResults}
          movieSearchLoading={movieSearchLoading}
          handleMovieClick={handleMovieClick}
        />
      </StyledCard>
      <StyledCard>
        {!selectedMovie ? (
          <WatchedList
            watchedList={watchedList}
            watchedListAvgRating={watchedListAvgRating}
            handleRemoveMovie={handleRemoveMovie}
          />
        ) : (
          <PersonalRating
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
            handleAddMovie={handleAddMovie}
          />
        )}
      </StyledCard>
    </Grid>
  );
};

export default Body;
