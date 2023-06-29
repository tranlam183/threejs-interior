import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const CheckedIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4144 4.41424L6.00015 13.8285L0.585938 8.41424L3.41436 5.58582L6.00015 8.1716L12.5859 1.58582L15.4144 4.41424Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(CheckedIcon);
