import { Breakpoint } from "@mui/material";
import { DARK_THEME_MEDIA_SYSTEM, DEFAULT_MODE, OG_IMAGE } from "constant";
import { BreakpointsOptions, ThemeMode } from "constant/enum";
import { clientStorage } from "./storage";
import { OptionFormatNumber } from "constant/types";

export const getTheme = (key: string, fallback: ThemeMode): ThemeMode => {
  if (typeof window === "undefined") return fallback;
  try {
    const theme = (clientStorage.get(key) as ThemeMode) || getThemeSystem();
    return theme || fallback;
  } catch (error) {
    // Unsupported
    console.error(error);
  }
  return fallback;
};

export const getThemeSystem = (e?: MediaQueryList): ThemeMode => {
  if (!e) {
    e = window.matchMedia(DARK_THEME_MEDIA_SYSTEM);
  }

  const isDark = e.matches;

  const themeSystem = isDark ? ThemeMode.DARK : ThemeMode.LIGHT;
  return themeSystem;
};

export const parseJSON = (
  data: string | undefined,
  defaultData: unknown,
): unknown => {
  try {
    if (!data) return defaultData;
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return defaultData;
  }
};

export const formatNumber = (
  number?: number | null,
  options: OptionFormatNumber = {},
) => {
  const {
    numberOfFixed = 4,
    emptyText = "--",
    suffix,
    space = true,
    ...localeOption
  } = options;
  const suffixParsed = suffix ? `${space ? " " : ""}${suffix}` : "";
  if (!number && number !== 0) return emptyText + suffixParsed;
  const num = Number(number || 0);
  const maximumFractionDigits = Number.isInteger(num) ? 0 : numberOfFixed;
  return (
    num.toLocaleString("en-US", {
      maximumFractionDigits,
      ...localeOption,
    }) + suffixParsed
  );
};

export const cleanObject = (paramsObject, ignoreKeys: string[] = []) => {
  const cloneParamsObject = { ...paramsObject };
  for (const keyParam in paramsObject) {
    if (
      !ignoreKeys.includes(keyParam) &&
      (cloneParamsObject[keyParam] === null ||
        cloneParamsObject[keyParam] === "" ||
        cloneParamsObject[keyParam] === undefined)
    ) {
      delete cloneParamsObject[keyParam];
    }
  }
  return cloneParamsObject;
};

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number,
) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

export const parseURLSearchParams = (searchParams: URLSearchParams | null) => {
  if (!searchParams) return {};
  const params: { [key: string]: string | string[] | undefined } | {} = {};
  searchParams.forEach((value, key) => {
    params[key] = params[key]
      ? Array.isArray(params[key])
        ? [...params[key], value]
        : [params[key], value]
      : value;
  });
  return params;
};

export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/g, "");
};

export const getActiveBreakpoint = (
  currentRatio: Breakpoint,
  options: { [key: string]: string },
) => {
  switch (currentRatio) {
    case BreakpointsOptions.XL:
      return (
        options[BreakpointsOptions.XL] ??
        options[BreakpointsOptions.LG] ??
        options[BreakpointsOptions.MD] ??
        options[BreakpointsOptions.SM] ??
        options[BreakpointsOptions.XS]
      );
    case BreakpointsOptions.LG:
      return (
        options[BreakpointsOptions.LG] ??
        options[BreakpointsOptions.MD] ??
        options[BreakpointsOptions.SM] ??
        options[BreakpointsOptions.XS]
      );
    case BreakpointsOptions.MD:
      return (
        options[BreakpointsOptions.MD] ??
        options[BreakpointsOptions.SM] ??
        options[BreakpointsOptions.XS]
      );
    case BreakpointsOptions.SM:
      return options[BreakpointsOptions.SM] ?? options[BreakpointsOptions.XS];
    case BreakpointsOptions.XS:
      return options[BreakpointsOptions.XS];
    default:
      return;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeDuplicateItem = (data: any[], key = "_id") => {
  return data.reduce((outArr, currentItem) => {
    const isExisted = outArr.some((item) => item[key] === currentItem[key]);
    if (isExisted) {
      return outArr;
    }
    outArr.push(currentItem);
    return outArr;
  }, []);
};

export const stringifyURLSearchParams = (data) => {
  data = cleanObject(data);
  if (!Object.keys(data).length) return "";
  return (
    "?" +
    Object.entries(data)
      .reduce((out: string[], [key, value]) => {
        if (Array.isArray(value)) {
          out = [...out, ...value.map((valueItem) => `${key}=${valueItem}`)];
        } else {
          out.push(`${key}=${value}`);
        }
        return out;
      }, [])
      .join("&")
  );
};

// export const setCookie = (key: string, data, options = {}) => {
//   cookieCutter.set(key, data ? JSON.stringify(data) : data, {
//     path: "/",
//     ...options,
//   });
// };

export const formatUSDCurrency = (
  number?: number,
  maximumFractionDigits?: number,
  fallback?: string,
) => {
  return formatNumber(number, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    emptyText: fallback ?? "$ --",
    numberOfFixed: maximumFractionDigits,
  });
};

export const formatCash = (
  value?: number,
  maximumFractionDigits = 1,
  tinyNumber = 0,
  prefix = "",
) => {
  if (value === undefined) return prefix + formatNumber(value);
  const options = {
    numberOfFixed: maximumFractionDigits,
  };
  if (value < 1e3 - tinyNumber) {
    return prefix + formatNumber(value, options);
  } else if (value < 1e6 - tinyNumber) {
    return prefix + formatNumber(+(value / 1e3), options) + "K";
  } else if (value < 1e9 - tinyNumber) {
    return prefix + formatNumber(+(value / 1e6), options) + "M";
  } else if (value < 1e12 - tinyNumber) {
    return prefix + formatNumber(+(value / 1e9), options) + "B";
  } else {
    return prefix + formatNumber(+(value / 1e12), options) + "T";
  }
};
