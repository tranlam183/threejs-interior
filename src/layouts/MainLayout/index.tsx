"use client";

import { Stack } from "@mui/material";
import { Text } from "components/shared";
import Header, { HEADER_HEIGHT } from "layouts/Header";
import { memo, useEffect } from "react";
import { useAppReady } from "store/app";
import Snackbar from "components/snackbar";
import MyThreeComponent from "components/sn-room/MyThreeComponent";

type MainLayoutProps = {
  children?: React.ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  const { appReady } = useAppReady();

  if (!appReady)
    return (
      <Text variant="body2" p={3}>
        Loading...
      </Text>
    );

  return (
    <Stack >
      {/* <Header /> */}
      <MyThreeComponent />
      <Stack
        direction="row"
        height={`calc(100vh - ${HEADER_HEIGHT}px)`}
        flex={1}
        overflow="hidden"
      >
        {children}
      </Stack>
      <Snackbar />
    </Stack>
  );
};

export default memo(MainLayout);
