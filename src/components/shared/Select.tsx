import { memo, useEffect, useMemo, useState } from "react";
import {
  buttonClasses,
  menuClasses,
  TypographyProps,
  StackProps,
  MenuProps,
} from "@mui/material";
import { Option } from "constant/types";
import { Dropdown } from "components/shared";
import { ButtonProps } from "./Button";

export type SelectProps = {
  labelProps?: TypographyProps;
  value?: Option["value"];
  options: Option[];
  onChange: (newOption: Option) => void;
  buttonProps?: ButtonProps;
  menuProps?: Omit<MenuProps, "open" | "onClose">;
  hasAll?: boolean;
} & Omit<StackProps, "onChange">;

const Select = (props: SelectProps) => {
  const {
    options: optionsProps,
    onChange,
    value,
    menuProps = {},
    hasAll,
    ...rest
  } = props;

  const { sx, ...restMenuProps } = menuProps as MenuProps;
  const [selected, setSelected] = useState<Option | undefined>();

  const options = useMemo(() => {
    if (hasAll) return [{ label: "All", value: "" }, ...optionsProps];
    return optionsProps;
  }, [optionsProps, hasAll]);

  const onChangeSelect = (newOption: Option) => {
    onChange(newOption);
    setSelected(newOption);
  };

  useEffect(() => {
    const selected = options.find(
      (option) => option.value.toString() === value?.toString(),
    ) as Option;
    setSelected(selected);
  }, [options, value]);

  return (
    <Dropdown
      buttonProps={
        {
          sx: sxConfigs.buttonDropdown,
        } as ButtonProps
      }
      sxIconProps={{
        color: "common.white",
        mt: -0.5,
      }}
      label={selected?.label ?? "All"}
      options={options}
      onChange={onChangeSelect}
      value={selected?.value}
      menuProps={{
        transformOrigin: {
          horizontal: "center",
          vertical: "top",
        },
        anchorOrigin: {
          horizontal: "center",
          vertical: "bottom",
        },
        sx: {
          [`& .${menuClasses.paper}`]: {
            width: 160,
            backgroundColor: "grey.A700",
            borderRadius: 2,
          },
          ...sx,
        },
        ...restMenuProps,
      }}
      {...rest}
    />
  );
};

export default memo(Select);

const sxConfigs = {
  buttonDropdown: {
    height: 44,
    px: 2,
    justifyContent: "space-between",
    width: 160,
    [`& .${buttonClasses.endIcon}`]: {
      ml: { xs: 0, lg: 1 },
    },
  },
};
