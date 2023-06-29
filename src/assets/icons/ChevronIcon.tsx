import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const ChevronIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  );
};

export default memo(ChevronIcon);
