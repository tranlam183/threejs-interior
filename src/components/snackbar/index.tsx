import { memo } from "react";
import { useSnackbar } from "store/app";
import Alert from "./Alert";
import { Stack } from "@mui/material";

const Snackbar = () => {
  const { snackbarList } = useSnackbar();

  if (!snackbarList.length) return null;

  return (
    <Stack
      spacing={1}
      position="fixed"
      zIndex={99999}
      top={24}
      left="50%"
      sx={{ transform: "translateX(-50%)" }}
    >
      <>
        {snackbarList.map((item) => (
          <Alert key={item.id} {...item} />
        ))}
      </>
    </Stack>
  );
};

export default memo(Snackbar);
