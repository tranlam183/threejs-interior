import { ThemeMode } from "constant/enum";

// Create a theme instance.
const colorSchemes = {
  [ThemeMode.LIGHT]: {
    palette: {
      common: {
        black: "#000000",
        white: "#FFFFFF",
      },
      primary: {
        main: "rgba(38, 46, 67, 0.9)", //ok
        light: "#262E43", //ok
        dark: "#ED271E", //ok
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#22B1FF", //ok
        light: "#1D8DCF", //ok
        dark: "#263B56", //ok
        contrastText: "#FFFFFF",
      },
      error: {
        main: "#CF0911", //ok
        light: "#F8483E", //ok
        dark: "#392323", //ok
        contrastText: "#FFFFFF",
      },
      warning: {
        main: "#ED6C02",
        light: "#FFAA00", //ok
        dark: "#37342D", //ok
        contrastText: "#FFFFFF",
      },
      info: {
        main: "#0288D1",
        light: "#03A9F4",
        dark: "#01579B",
        contrastText: "#FFFFFF",
      },
      success: {
        main: "#00D181", //ok
        light: "#15FF9D", //ok
        dark: "#23404C", //ok
        contrastText: "#FFFFFF",
      },
      grey: {
        50: "#FAFAFA",
        100: "#3F3D61", //ok
        200: "#868AA6", //ok
        300: "#34344F", //ok
        400: "#281B28", // ok
        500: "#262E43", //ok
        600: "#2A2854", //ok
        700: "#171431", //ok
        800: "#131722", //ok
        900: "#151D2B", //ok
        A100: "#F5F5F5",
        A200: "#212B4D", //ok
        A400: "#282447", // ok
        A700: "#040215", //ok
      },
      text: {
        primary: "#C3C0DB", // ok
        secondary: "#868AA6", //ok
        disabled: "#50507A", //ok
      },
      divider: "rgba(0, 0, 0, .12)",
      background: {
        paper: "#111111",
        default: "#111111",
      },
      gradient: {
        main: "radial-gradient(62.68% 62.68% at 50% 100%, #2A2854 0%, #1D193D 67.06%)", //ok
        light:
          "linear-gradient(180deg, rgba(29, 141, 207, 0) 46.88%, rgba(29, 141, 207, 0.5) 100%)", //ok
        dark: "linear-gradient(127.72deg, rgba(0, 0, 0, 0) 72.08%, rgba(207, 9, 17, 0.2) 99.19%), #262E43", //ok
        contrastText: "#FFFFFF",
      },
      action: {
        active: "rgba(0, 0, 0, .54)",
        hover: "#868AA6",
        hoverOpacity: 0.04,
        selected: "rgba(0, 0, 0, .08)",
        selectedOpacity: 0.08,
        disabled: "#797F94", // ok
        disabledBackground: "rgba(0, 0, 0, .12)",
        disabledOpacity: 0.12,
        focus: "rgba(0, 0, 0, .38)",
        focusOpacity: 0.12,
        activatedOpacity: 0.12,
      },
    },
  },
  [ThemeMode.DARK]: {
    palette: {
      common: {
        black: "#000000",
        white: "#FFFFFF",
      },
      primary: {
        main: "rgba(38, 46, 67, 0.9)", //ok
        light: "#262E43", //ok
        dark: "#ED271E", //ok
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#22B1FF", //ok
        light: "#1D8DCF", //ok
        dark: "#263B56", //ok
        contrastText: "#FFFFFF",
      },
      error: {
        main: "#CF0911", //ok
        light: "#F8483E", //ok
        dark: "#392323", //ok
        contrastText: "#FFFFFF",
      },
      warning: {
        main: "#ED6C02",
        light: "#FFAA00", //ok
        dark: "#37342D", //ok
        contrastText: "#FFFFFF",
      },
      info: {
        main: "#0288D1",
        light: "#03A9F4",
        dark: "#01579B",
        contrastText: "#FFFFFF",
      },
      success: {
        main: "#00D181", //ok
        light: "#15FF9D", //ok
        dark: "#23404C", //ok
        contrastText: "#FFFFFF",
      },
      grey: {
        50: "#FAFAFA",
        100: "#3F3D61", //ok
        200: "#868AA6", //ok
        300: "#34344F", //ok
        400: "#281B28", // ok
        500: "#262E43", //ok
        600: "#2A2854", //ok
        700: "#171431", //ok
        800: "#131722", //ok
        900: "#151D2B", //ok
        A100: "#F5F5F5",
        A200: "#212B4D", //ok
        A400: "#282447", // ok
        A700: "#040215", //ok
      },
      text: {
        primary: "#C3C0DB", // ok
        secondary: "#868AA6", //ok
        disabled: "#50507A", //ok
      },
      divider: "rgba(0, 0, 0, .12)",
      background: {
        paper: "#111111",
        default: "#111111",
      },
      gradient: {
        main: "radial-gradient(62.68% 62.68% at 50% 100%, #2A2854 0%, #1D193D 67.06%)", //ok
        light:
          "linear-gradient(180deg, rgba(29, 141, 207, 0) 46.88%, rgba(29, 141, 207, 0.5) 100%)", //ok
        dark: "linear-gradient(127.72deg, rgba(0, 0, 0, 0) 72.08%, rgba(207, 9, 17, 0.2) 99.19%), #262E43", //ok
        contrastText: "#FFFFFF",
      },
      action: {
        active: "rgba(0, 0, 0, .54)",
        hover: "#868AA6",
        hoverOpacity: 0.04,
        selected: "rgba(0, 0, 0, .08)",
        selectedOpacity: 0.08,
        disabled: "#797F94", // ok
        disabledBackground: "rgba(0, 0, 0, .12)",
        disabledOpacity: 0.12,
        focus: "rgba(0, 0, 0, .38)",
        focusOpacity: 0.12,
        activatedOpacity: 0.12,
      },
    },
  },
};

export default colorSchemes;
