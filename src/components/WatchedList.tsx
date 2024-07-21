import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ListItem, Divider, ListItemText, AccordionDetails, Typography, Box, IconButton } from "@mui/material";
import { IMovie, IWatchedListProps } from "../dataTypes";
import MyAnimatedComponent from "./MyAnimatedComponent";

function calculateTotalDuration(watchedList: IMovie[]): string {
  const durations = watchedList.map((movie) => movie.Length!);
  const totalMinutes = durations.reduce((acc, duration) => {
    const [minutes] = duration.split(" ").map(Number);
    return acc + minutes;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}min`;
}

const WatchedList: React.FC<IWatchedListProps> = ({ watchedList, watchedListAvgRating, handleRemoveMovie }) => {
  let summary;

  if (watchedList.length > 0) {
    summary = {
      movies: watchedList.length,
      averageRating: (
        watchedList.map((movie) => movie.imdbRating!).reduce((acc, rating) => acc + rating) / watchedList.length
      ).toFixed(2),
      watchTime: calculateTotalDuration(watchedList),
    };
  }

  return watchedList.length ? (
    <MyAnimatedComponent>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "background.default",
          backdropFilter: "blur(5px)",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center", marginTop: 2 }}>
          MOVIES YOU WATCHED
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: 3 }}>
          <Typography variant="caption" display="block" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
            {`🎬${summary?.movies} movie${summary?.movies !== 1 ? "s" : ""}`}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
            {`🌟${watchedListAvgRating?.toFixed(1)}`}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
            {`⭐ ${Number(summary?.averageRating).toFixed(1)}`}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
            {`⌛ ${summary?.watchTime}`}
          </Typography>
        </Box>
      </Box>
      <AccordionDetails sx={{ marginTop: 1 }}>
        {watchedList?.map((movie, index) => (
          <React.Fragment key={movie.imdbID}>
            <ListItem alignItems="flex-start" sx={{ width: "100%" }}>
              <img
                src={movie.Poster}
                alt={movie.Title}
                style={{
                  marginRight: "20px",
                  width: "100px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <ListItemText
                  primary={movie.Title}
                  secondary={`${movie.Year} - ${movie.Length}`}
                  sx={{ marginBottom: "8px" }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "4px" }}>
                  {movie.Genre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ⭐ {movie.imdbRating} IMDb rating
                </Typography>
              </Box>
              <IconButton aria-label="close" size="large" onClick={() => handleRemoveMovie(movie.imdbID)}>
                <HighlightOffIcon fontSize="inherit" />
              </IconButton>
            </ListItem>
            {index !== watchedList.length - 1 && <Divider sx={{ margin: "8px 0" }} />}
          </React.Fragment>
        ))}
      </AccordionDetails>
    </MyAnimatedComponent>
  ) : null;
};

export default WatchedList;
