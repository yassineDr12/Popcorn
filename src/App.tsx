import { createContext, useContext, useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Body from "./components/Body";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { CssBaseline } from "@mui/material";
import useMovies from "./hooks/useMovies";
import Background from "./components/Background";

const ColorModeContext = createContext({ App: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { searchResults, movieSearchLoading, searchQuery, setSearchResults, setMovieSearchLoading, setSearchQuery } =
    useMovies();

  return (
    <Background>
      <Navbar
        searchQuery={searchQuery}
        searchResults={searchResults}
        movieSearchLoading={movieSearchLoading}
        setSearchQuery={setSearchQuery}
        setSearchResults={setSearchResults}
        setMovieSearchLoading={setMovieSearchLoading}
      >
        <IconButton sx={{ ml: 1 }} onClick={colorMode.App} color="inherit">
          {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Navbar>
      <Body
        searchResults={searchResults}
        movieSearchLoading={movieSearchLoading}
        setMovieSearchLoading={setMovieSearchLoading}
      />
    </Background>
  );
}

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      App: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
