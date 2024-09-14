import React from "react";
import { Input, InputAdornment, TextField } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

const TremorTextInput = (props) => {
  const id = props.id;
  const label = props.label;
  const variant = props.variant;
  const icon = props.icon;
  const inputRequired = props.required;
  return (
    <TextField
      id={id}
      label={label}
      variant={variant}
      required={inputRequired}
      slotProps={{
        inputLabel: { required: false },
        input: {
          startAdornment: (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
        },
      }}
      sx={{
        "& .MuiFilledInput-root": {
          backgroundColor: "lightgray",
        },
        "& .MuiInputLabel-root": {
          color: "black",
        },
      }}
    />
  );
};

export default TremorTextInput;
