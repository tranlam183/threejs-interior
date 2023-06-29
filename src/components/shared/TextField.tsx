import { memo, useState, useEffect, InputHTMLAttributes, useMemo } from "react";
import {
  TextField as MuiTextField,
  BaseTextFieldProps,
  InputBaseProps,
  styled,
} from "@mui/material";

export type TextFieldProps = BaseTextFieldProps & {
  InputProps?: InputBaseProps;
  clearForm?: boolean;
  onChangeText?: (text?: string | number) => void;
  numberType?: "integer" | "float";
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  value?: string | number;
};

const TextField = (props: TextFieldProps) => {
  const {
    placeholder = props?.multiline ? "Jot something down..." : "Message...",
    defaultValue = "",
    InputProps,
    onChangeText,
    fullWidth = true,
    maxRows = 5,
    minRows = 2,
    clearForm = false,
    numberType,
    type,
    value = "",
    size = "medium",
    ...rest
  } = props;

  const [text, setText] = useState<string | number>(defaultValue as string);

  const valueFormatted = useMemo(() => {
    if (type !== "number") return text;
    const valueParsed =
      text === null ? "" : typeof text === "number" ? text.toString() : text;
    const arraySplit = valueParsed.split(".");
    const integer = arraySplit[0];
    const decimal = arraySplit[1] ?? "";
    return (
      valueWithCommas(integer) + (arraySplit.length === 2 ? "." : "") + decimal
    );
  }, [type, text]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    if (
      newValue &&
      type === "number" &&
      (numberType !== "integer" || !newValue.includes("."))
    ) {
      newValue = newValue.replace(/,/g, "");
      if (!isNaN(newValue as unknown as number)) {
        if (newValue?.slice(0, 2) === "00") {
          // Avoid 000.x
          newValue = newValue.slice(1);
        }
        if (Number(newValue) >= 1 && (newValue[0] ?? "") === "0") {
          // Remove 0 to avoid 0123.444 => 123.444
          newValue = newValue?.slice(1);
        }
        if (Number(text) === Infinity) {
          newValue = "";
        }
        onChangeText && onChangeText(newValue);
        setText(newValue);
      }
    } else if (type !== "number" || !newValue) {
      onChangeText && onChangeText(newValue);
      setText(newValue);
    }
  };

  const onBlur = () => {
    if (type === "number") {
      setText(text ? Number(text) : "");
      onChangeText && onChangeText(text ? Number(text) : undefined);
    }
  };

  useEffect(() => {
    setText((prevValue) => (prevValue === value ? prevValue : value));
  }, [value]);

  useEffect(() => {
    if (clearForm) {
      setText("");
    }
  }, [clearForm]);

  return (
    <TextFieldStyled
      placeholder={placeholder}
      value={valueFormatted}
      InputProps={{
        onChange,
        onBlur,
        ...InputProps,
      }}
      fullWidth={fullWidth}
      minRows={minRows}
      maxRows={maxRows}
      size={size}
      type={type === "number" ? "text" : type}
      {...rest}
    />
  );
};

export default memo(TextField);

const TextFieldStyled = styled(MuiTextField)(
  ({ multiline, theme: { palette, spacing } }) => ({
    "& .MuiInputBase-root": {
      height: !multiline && 40,
      borderRadius: spacing(0.5),
      backgroundColor: palette.grey.A700,
      overflow: "hidden",
      "& input, & textarea": {
        borderRadius: 1,
        height: "unset",
        paddingTop: spacing(1.25),
        paddingBottom: spacing(1.25),
        backgroundColor: palette.grey.A700,
        "&:disabled": {
          color: palette.text.secondary,
          WebkitTextFillColor: "unset",
        },
        fontSize: 15,
        color: palette.common.white,
        "&::placeholder": {
          color: palette.grey[200],
        },
        "&:autofill": {
          boxShadow: "none",
          backgroundColor: palette.grey.A700,
          WebkitTextFillColor: "unset",
          height: "100%",
          boxSizing: "border-box",
        },
      },
      "&.MuiInputBase-sizeSmall": {
        height: !multiline && 36,
        "& input, & textarea": {
          height: "unset",
          paddingTop: spacing(1),
          paddingBottom: spacing(1),
          fontSize: 14,
        },
      },
      "& fieldset": {
        borderColor: palette.grey[100],
      },
      "&.Mui-focused fieldset, &:hover fieldset": {
        borderWidth: 1,
        borderColor: palette.secondary.main,
      },
    },
  }),
);

const valueWithCommas = (value: string | number) => {
  value = typeof value === "number" ? value.toString() : value;
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
