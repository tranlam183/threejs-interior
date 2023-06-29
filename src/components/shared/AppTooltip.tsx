import { memo } from "react";
import { Tooltip, tooltipClasses, TooltipProps, Zoom } from "@mui/material";

const AppTooltip = (props: TooltipProps) => {
  const { children, ...rest } = props;
  return (
    <Tooltip
      placement="top"
      arrow
      TransitionComponent={Zoom}
      PopperProps={{
        sx: {
          [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: "grey.400",
          },
          [`& .${tooltipClasses.arrow}`]: {
            color: "grey.400",
          },
        },
      }}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

export default memo(AppTooltip);
