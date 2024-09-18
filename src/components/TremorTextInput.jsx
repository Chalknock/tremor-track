import React from "react";
import { Input, InputAdornment, TextField } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

const TremorTextInput = (props) => {
  const id = props.id;
  const name = props.name;
  const label = props.label;
  const variant = props.variant;
  const icon = props.icon;
  const inputRequired = props.required;
  const placeholder = props.placeholder;
  const type = props.type;
  const width = props.width;
  const value = props.value;
  const onChange = props.onChange;
  const maxRows = props.maxRows;
  const multiline = props.multiline;
  return (
    <TextField
      id={id}
      name={name}
      label={label}
      variant={variant}
      required={inputRequired}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      multiline={multiline}
      maxRows={maxRows}
      slotProps={{
        inputLabel: { required: false },
        input: {
          startAdornment: (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
          sx: { borderRadius: 1.5 },
          disableUnderline: true,
        },
      }}
      sx={{
        "& .MuiFilledInput-root": {
          backgroundColor: "lightgray",
        },
        "& .MuiInputLabel-root": {
          color: "black",
        },
        width: { width },
      }}
    />
  );
};

export default TremorTextInput;
