import { memo, useState, MouseEvent, useMemo } from "react";
import {
  Menu,
  MenuItem,
  menuItemClasses,
  MenuProps,
  Palette,
  Stack,
  menuClasses,
  IconProps,
  Theme,
  SxProps,
} from "@mui/material";
import { Option } from "constant/types";
import Button, { ButtonProps } from "./Button";
import Text, { TextProps } from "./Text";
import { ChevronIcon } from "assets/icons";

export type DropdownProps = {
  label: string;
  onChange: (option: Option) => void;
  options: Option[];
  buttonProps?: ButtonProps;
  labelProps?: TextProps;
  sxIconProps?: IconProps["sx"];
  menuProps?: Omit<MenuProps, "open">;
  value?: string | number;
  keyLabel?: string;
};

const Dropdown = (props: DropdownProps) => {
  const {
    label,
    onChange,
    options,
    buttonProps = {},
    menuProps = {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sxIconProps = {},
    value,
    keyLabel = "label",
    ...rest
  } = props;

  const { sx = {}, ...restButtonProps } = buttonProps as ButtonProps;
  const { sx: sxMenu, ...restMenuProps } = menuProps;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const optionSelected = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  const onOpenDropdown = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onChangeOption = (option: Option) => {
    return () => {
      onChange(option);
      onClose();
    };
  };

  return (
    <Stack {...rest}>
      <Button
        id={BUTTON_MENU_ID}
        sx={
          {
            ...sxConfigs.button,
            ...sx,
          } as SxProps<Theme>
        }
        disableRipple
        endIcon={<ChevronIcon />}
        onClick={onOpenDropdown}
        {...restButtonProps}
        variant="normal"
        textProps={{ variant: "body2" }}
      >
        {optionSelected?.label ?? label}
      </Button>
      <Menu
        MenuListProps={{
          "aria-labelledby": BUTTON_MENU_ID,
        }}
        id={MENU_ID}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        sx={{ ...sxConfigs.menu, ...sxMenu }}
        {...restMenuProps}
      >
        {options.map((option) => (
          <MenuItem
            sx={sxConfigs.menuItem}
            key={option.value}
            onClick={onChangeOption(option)}
          >
            <Text variant="body2" fontWeight="600" color="common.white">
              {option[keyLabel]}
            </Text>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default memo(Dropdown);

export const sxConfigs = {
  button: {
    width: "100%",
    borderRadius: 1,
    height: "100%",
    maxHeight: 40,
    border: "1px solid",
    borderColor: "grey.100",
    backgroundColor: "grey.A700",
    py: 1.5,
    px: 2,
    justifyContent: "space-between",
    color: "text.primary",
    fontSize: 14,
    textTransform: "initial",
    "&:hover": {
      borderColor: "secondary.main",
      backgroundColor: "grey.700",
    },
  },
  menu: {
    [`& .${menuClasses.paper}`]: {
      width: 194,
      backgroundImage: "none",
      backgroundColor: "grey.A700",
      borderRadius: 2,
    },
  },
  menuItem: {
    py: 1,
    px: 2,
    [`&.${menuItemClasses.focusVisible}`]: {
      backgroundColor: "transparent",
    },
    "&:hover": {
      backgroundColor: ({ palette }: { palette: Palette }) => palette.grey.A400,
    },
  },
  menuItemLabel: {},
};

const BUTTON_MENU_ID = "button__Menu";
const MENU_ID = "menu__";
