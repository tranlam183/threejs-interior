import { ThemeMode } from "./enum";

export interface Option {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

// export interface Paging {
//   pageIndex: number;
//   pageSize: number;
//   totalPages?: number;
//   totalItems?: number;
// }

export interface Size {
  width?: number;
  height?: number;
}

export type Mode = ThemeMode.LIGHT | ThemeMode.DARK | "system";

export type Params = { [key: string]: string | number | string[] | number[] };

// export type ItemListResponse = Paging & {
//   totalPages: number;
//   totalItems: number;
//   items: unknown[];
// };

// export interface BaseQueries {
//   pageIndex: number;
//   pageSize: number;
//   search?: string;
// }

// export type BaseFilters = {
//   search?: string;

// };

export type OptionFormatNumber = {
  numberOfFixed?: number;
  emptyText?: string;
  localeOption?: Intl.NumberFormatOptions;
  suffix?: string;
  space?: boolean;
} & Intl.NumberFormatOptions;
