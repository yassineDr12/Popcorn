import MyAnimatedComponent from "./MyAnimatedComponent";
import { Box, SxProps, Theme, useTheme } from "@mui/material";
import backgroundImage from "../assets/background.png";

const Background = ({ children, sx }: { children: React.ReactNode; sx?: SxProps<Theme> | undefined }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const backgroundGradient = isDarkMode ? "rgb(8,8,8, 0.5)" : "rgb(25,118,210, 0.5)";

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(${backgroundGradient}, rgb(0,0,0, 0)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        position: "relative",

        ...sx,
      }}
    >
      <MyAnimatedComponent>{children}</MyAnimatedComponent>
    </Box>
  );
};
export default Background;
