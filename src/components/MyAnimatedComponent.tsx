import { ReactNode, useEffect, useState } from "react";
import { Fade, Box } from "@mui/material";

const MyAnimatedComponent = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Fade in={show} timeout={1000}>
      <Box>{children}</Box>
    </Fade>
  );
};

export default MyAnimatedComponent;
