import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  addSnackbar,
  removeSnackbar,
  Snackbar,
  toggleAppReady,
} from "./reducer";

export const useSnackbar = () => {
  const dispatch = useAppDispatch();

  const snackbarList = useAppSelector((state) => state.app.snackbarList);

  const onAddSnackbar = useCallback(
    (
      message: Snackbar["message"],
      severity?: Snackbar["severity"],
      expiredIn?: Snackbar["expiredIn"],
    ) => {
      dispatch(addSnackbar({ message, severity, expiredIn }));
    },
    [dispatch],
  );

  const onRemoveSnackbar = useCallback(
    (snackbarId: string) => {
      dispatch(removeSnackbar(snackbarId));
    },
    [dispatch],
  );

  return {
    snackbarList,
    onAddSnackbar,
    onRemoveSnackbar,
  };
};

export const useAppReady = () => {
  const dispatch = useAppDispatch();

  const appReady = useAppSelector((state) => state.app.appReady);

  const onToggleAppReady = useCallback(
    (newStatus?: boolean) => {
      dispatch(toggleAppReady(newStatus));
    },
    [dispatch],
  );

  return { appReady, onToggleAppReady };
};
