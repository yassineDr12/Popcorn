import { Card, Grid } from "@mui/material";
import { IStyledCardProps } from "../dataTypes";

const StyledCard: React.FC<IStyledCardProps> = ({ children }) => {
  return (
    <Grid item xs={5}>
      <Card
        sx={{
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          maxHeight: "85vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "0 !important", // Hide the scrollbar in WebKit browsers
          },
        }}
      >
        {children}
      </Card>
    </Grid>
  );
};

export default StyledCard;
