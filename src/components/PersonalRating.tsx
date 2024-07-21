import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Card, CardContent, Typography, Rating, Button, Grid, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MyAnimatedComponent from "./MyAnimatedComponent";
import { IPersonalRatingProps } from "../dataTypes";
import useKey from "../hooks/useKey";

export const PersonalRating: React.FC<IPersonalRatingProps> = ({ selectedMovie, setSelectedMovie, handleAddMovie }) => {
  const [ratingValue, setRatingValue] = useState<number>(0);
  const selectedRatingsCount = useRef(0);

  const ratingHandler = (event: SyntheticEvent<Element, Event>, value: number | null) => {
    selectedRatingsCount.current += 1;
    console.log(selectedRatingsCount.current);
    setRatingValue(value as number);
  };

  useKey("Escape", () => setSelectedMovie(undefined));

  useEffect(() => {
    document.title = selectedMovie?.Title || "Popcorn";

    return () => {
      document.title = "Popcorn";
    };
  }, [selectedMovie]);

  return (
    <MyAnimatedComponent>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <img src={selectedMovie?.Poster} alt={selectedMovie?.Title} style={{ width: "100%", height: "100%" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography gutterBottom variant="h5" component="div">
                {selectedMovie?.Title}
              </Typography>
              <IconButton aria-label="close" size="large" onClick={() => setSelectedMovie(undefined)}>
                <HighlightOffIcon fontSize="inherit" />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {selectedMovie?.Year} - {selectedMovie?.Length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedMovie?.Genre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ⭐ {selectedMovie?.imdbRating} IMDb rating
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedMovie?.Plot}
            </Typography>
          </CardContent>
          <Card sx={{ borderRadius: 1, margin: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Rating name="half-rating" value={ratingValue} precision={0.5} max={10} onChange={ratingHandler} />
                <Typography sx={{ ml: 2 }}>{ratingValue}</Typography>
              </Box>
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => selectedMovie && handleAddMovie(selectedMovie, ratingValue)}
              >
                Add to list
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MyAnimatedComponent>
  );
};

export default PersonalRating;
