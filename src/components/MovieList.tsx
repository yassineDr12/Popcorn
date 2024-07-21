import React from "react";
import { Divider, CircularProgress, Box, ListItem, ListItemText, ButtonBase, Typography } from "@mui/material";
import { IMovieListProps } from "../dataTypes";
import MyAnimatedComponent from "./MyAnimatedComponent";

const MovieList: React.FC<IMovieListProps> = ({ searchResults, movieSearchLoading, handleMovieClick }) => {
  return movieSearchLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh", // Set height of the container to full viewport height
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <MyAnimatedComponent>
      {searchResults?.map((movie, index) => (
        <React.Fragment key={index}>
          <ButtonBase
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              textTransform: "none",
              padding: "8px 16px",
            }}
            onClick={() => handleMovieClick(movie)}
          >
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
            </ListItem>
          </ButtonBase>
          {index !== searchResults.length - 1 && <Divider sx={{ margin: "8px 0" }} />}
        </React.Fragment>
      ))}
    </MyAnimatedComponent>
  );
};

export default MovieList;
