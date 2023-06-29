import React,{ memo, useEffect } from "react";
import { Box, Stack, Button, ButtonProps } from "@mui/material";
import { useToggle } from "hooks";
import { Text, TextProps } from "components/shared";
import { CheckedIcon } from "assets/icons";

export enum OptionType {
  CHECKBOX = 1,
  RADIO,
}

type CheckboxProps = {
  checked: boolean;
  label: string;
  onChange: () => void;
  type?: OptionType;
  textProps?: TextProps;
} & ButtonProps;

const Checkbox = (props: CheckboxProps) => {
  const {
    label,
    checked,
    onChange,
    type = OptionType.CHECKBOX,
    sx,
    textProps = {},
    ...rest
  } = props;

  const [isChecked, , , onToggleChecked, setToggle] = useToggle(checked);

  const onChangeCheckbox = () => {
    onChange();
    onToggleChecked();
  };

  useEffect(() => {
    setToggle(checked);
  }, [checked, setToggle]);

  return (
    <Button
      sx={{
        width: "fit-content",
        justifyContent: "flex-start",
        p: 0,
        "&:hover": {
          backgroundColor: "transparent",
        },
        ...sx,
      }}
      onClick={onChangeCheckbox}
      disableRipple
      disableFocusRipple
      {...rest}
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            border: "1px solid",
            borderColor: "grey.200",
            width: 18,
            height: 18,
            borderRadius: type === OptionType.CHECKBOX ? 0.5 : "50%",
            boxSizing: "border-box",
          }}
        >
          {type === OptionType.CHECKBOX ? (
            isChecked && (
              <CheckedIcon sx={{ fontSize: 15, color: "secondary.main" }} />
            )
          ) : (
            <Stack
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: isChecked ? "grey.200" : "transparent",
              }}
            />
          )}
        </Stack>
        <Text
          textTransform="capitalize"
          variant="body2"
          color="common.white"
          {...textProps}
        >
          {label}
        </Text>
      </Stack>
    </Button>
  );
};

export default memo(Checkbox);
