import { Box, InputBase, Typography, alpha, styled } from "@mui/material";
import React, { useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IMovieSearchInputFieldProps } from "../dataTypes";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const MovieSearchInputField: React.FC<IMovieSearchInputFieldProps> = ({
  handleSearch,
  movieSearchLoading,
  searchResults,
}) => {
  const inputFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        inputFieldRef.current?.focus();
      }
    };
    window.addEventListener("keydown", callback);

    return () => {
      window.removeEventListener("keydown", callback);
    };
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Search sx={{ width: 150 }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onKeyDown={handleSearch}
          name="search movie"
          placeholder="Search movies…"
          inputProps={{
            "aria-label": "search",
          }}
          inputRef={inputFieldRef}
        />
      </Search>
      <Typography
        variant="caption"
        sx={{
          width: 100,
          opacity: 0.5,
        }}
      >
        {movieSearchLoading ? (
          <div>Loading...</div>
        ) : (
          <div>{searchResults?.length > 0 ? `${searchResults.length} results found` : "No results found"}</div>
        )}
      </Typography>
    </Box>
  );
};

export default MovieSearchInputField;
