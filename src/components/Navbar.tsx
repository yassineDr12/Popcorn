import MovieSearchInputField from "./MovieSearchInputField";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import popcornIcon from "../icons/popcorn-icon.png";
import { INavbarProps } from "../dataTypes";
import MyAnimatedComponent from "./MyAnimatedComponent";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: theme.spacing(1),
}));

const Navbar: React.FC<INavbarProps> = ({ searchResults, movieSearchLoading, setSearchQuery, children }) => {
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchQuery(event.currentTarget.value);
    }
  };

  return (
    <MyAnimatedComponent>
      <Box sx={{ flexGrow: 1, margin: 1 }}>
        <StyledAppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img src={popcornIcon} alt="Popcorn Icon" style={{ width: 32, height: 32, marginRight: 8 }} />
              <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
                Popcorn
              </Typography>
            </Box>
            <MovieSearchInputField
              handleSearch={handleSearch}
              movieSearchLoading={movieSearchLoading}
              searchResults={searchResults}
            />
            {children}
          </Toolbar>
        </StyledAppBar>
      </Box>
    </MyAnimatedComponent>
  );
};

export default Navbar;
