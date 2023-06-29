import { memo } from "react";
import {
  Tooltip,
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  TooltipProps,
  Zoom,
  tooltipClasses,
} from "@mui/material";

export type IconButtonProps = {
  textTooltip?: string;
  tooltipProps?: TooltipProps;
} & MuiIconButtonProps;

const IconButton = (props: IconButtonProps) => {
  const { textTooltip, tooltipProps = {}, ...rest } = props;

  const renderIconButton = () => {
    return (
      <MuiIconButton
        sx={{
          width: "fit-content",
          ...rest?.sx,
        }}
        aria-label="iconbutton"
        {...rest}
      />
    );
  };

  if (textTooltip !== undefined) {
    return (
      <Tooltip
        title={textTooltip as string}
        placement="top-end"
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
        {...tooltipProps}
      >
        {renderIconButton()}
      </Tooltip>
    );
  }

  return renderIconButton();
};

export default memo(IconButton);
