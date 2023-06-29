import { ThemeMode } from "./enum";
import { Mode } from "./types";

// @ENVIRONMENTS
export const API_URL = "/app/";
export const OG_IMAGE = process.env.OG_IMAGE as string;

// @FORMAT_DATE_TIME
export const DARK_THEME_MEDIA_SYSTEM = "(prefers-color-scheme: dark)";
export const DATE_FORMAT_SLASH = "yyyy/MM/DD";
export const DATE_FORMAT_HYPHEN = "yyyy-MM-DD";
export const LONG_TIME_FORMAT = "HH:mm:ss";
export const SHORT_TIME_FORMAT = "HH:mm";

export const AUTH_COOKIE = "auth";

export const DEFAULT_MODE: Mode = ThemeMode.DARK;

export const API_TIMEOUT = 30_000; //s

// @MESSAGE
export const AN_ERROR_TRY_RELOAD_PAGE =
  "An error occurred. Please try reload page.";
export const AN_ERROR_TRY_AGAIN = "An error occurred. Please try again!";

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 10;

// export const DEFAULT_PAGING: Paging = {
//   pageIndex: DEFAULT_PAGE_INDEX,
//   pageSize: DEFAULT_PAGE_SIZE,
// };

export const HEADER_DEFAULT = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const FORM_DATA_HEADER = {
  "Content-Type": "multipart/form-data",
};
