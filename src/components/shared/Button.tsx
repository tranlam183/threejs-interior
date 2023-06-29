import React, { memo, useMemo } from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from "@mui/material";
import Text, { TextProps } from "./Text";

export type ButtonProps = {
  textProps?: TextProps;
  children: string | React.ReactNode;
  variant: "primary" | "warning" | "secondary" | "tertiary" | "text" | "normal";
  size?: "small" | "medium" | "large" | number;
  fullWidth?: boolean;
  pending?: boolean;
} & Omit<MuiButtonProps, "variant" | "size">;

const Button = (props: ButtonProps) => {
  const {
    textProps,
    children,
    size = "medium",
    fullWidth,
    variant,
    sx = {},
    pending,
    disabled,
    ...rest
  } = props;

  const heightButton = useMemo(() => {
    const sizeString = typeof size === "number" ? "custom" : size;
    switch (sizeString) {
      case "small":
        return 36;
      case "large":
        return 45;
      case "custom":
        return size;
      default:
        return 40;
    }
  }, [size]);

  const defaultTextSx = useMemo(
    () =>
      variant !== "normal"
        ? {
            fontWeight: 600,
            fontSize: 15,
            color: disabled ? "action.disabled" : "common.white",
          }
        : {},
    [variant, disabled],
  );

  const defaultSize = useMemo(
    () => (fullWidth ? { width: "100%" } : {}),
    [fullWidth],
  );

  return (
    <MuiButton
      sx={
        {
          ...defaultSx,
          height: heightButton,
          ...defaultSize,
          ...sx,
        } as ButtonProps["sx"]
      }
      variant={(pending ? "warning" : variant) as MuiButtonProps["variant"]}
      endIcon={
        pending && <CircularProgress size={16} sx={{ color: "common.white" }} />
      }
      disabled={pending || disabled}
      {...rest}
    >
      {typeof children === "string" ? (
        <Text {...defaultTextSx} {...textProps}>
          {pending ? "Waiting" : children}
        </Text>
      ) : (
        children
      )}
    </MuiButton>
  );
};

export default memo(Button);

const defaultSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 1,
  px: 1.5,
  minWidth: 100,
  boxSizing: "border-box",
  border: "1px solid transparent",
  textTransform: "initial",
  "&.MuiButton-primary": {
    backgroundColor: "error.main",
    "&.Mui-disabled": {
      backgroundColor: "grey.300",
    },
  },
  "&.MuiButton-warning": {
    backgroundColor: "warning.light",
  },
  "&.MuiButton-secondary": {
    backgroundColor: "grey.400",
    borderColor: "error.main",
    "&:hover": {
      backgroundColor: "error.main",
    },
  },
  "&.MuiButton-tertiary": {
    backgroundColor: "grey.900",
    borderColor: "grey.200",
  },
};
