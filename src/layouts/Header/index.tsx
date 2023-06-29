import React, { memo } from "react";
import { Stack } from "@mui/material";

const Header = () => {
  return (
    <Stack
      height={HEADER_HEIGHT}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={3}
      sx={{
        backgroundColor: "grey.A700",
        boxShadow: "0px 4px 20px rgba(9, 0, 4, 0.63)",
      }}
    >
      Header
    </Stack>
  );
};

export default memo(Header);

export const HEADER_HEIGHT = 60;
