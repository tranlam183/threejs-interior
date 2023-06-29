import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const CopyIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0  14 15" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.2388 5.625H6.18147C5.56078 5.625 5.05762 6.18464 5.05762 6.875V12.5C5.05762 13.1904 5.56078 13.75 6.18147 13.75H11.2388C11.8595 13.75 12.3627 13.1904 12.3627 12.5V6.875C12.3627 6.18464 11.8595 5.625 11.2388 5.625Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <path
        d="M2.8098 9.375H2.24788C1.94981 9.375 1.66396 9.2433 1.45319 9.00888C1.24243 8.77446 1.12402 8.45652 1.12402 8.125V2.5C1.12402 2.16848 1.24243 1.85054 1.45319 1.61612C1.66396 1.3817 1.94981 1.25 2.24788 1.25H7.30522C7.60328 1.25 7.88914 1.3817 8.0999 1.61612C8.31066 1.85054 8.42907 2.16848 8.42907 2.5V3.125"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  );
};

export default memo(CopyIcon);
