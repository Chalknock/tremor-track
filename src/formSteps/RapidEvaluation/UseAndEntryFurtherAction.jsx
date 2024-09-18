import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const UseAndEntryFurtherAction = ({
  formData,
  onChange,
  handleRadioChange,
}) => {
  const handleInputChange = (field) => (e) => {
    onChange("typeofConstruction", field)(e);
  };
  const radioOptions = [
    "Wood Frame",
    "Steel Frame",
    "Tilt-up Concrete",
    "Concrete Frame",
    "Concrete Sheer Wall",
    "Unreinforced Masonry",
    "Reinforced Masonry",
  ];
  return (
    <div>
      <Typography className="row" justifyContent={"center"}>
        FURTHER ACTIONS
      </Typography>
      <FormControl>
        <FormLabel id="type-of-construction-radio-buttons-group">
          Type of Construction
        </FormLabel>
        <RadioGroup
          aria-labelledby="type-of-construction-radio-buttons-group"
          name="typeOfConstruction"
          value={formData.typeofConstruction.radioOptions || ""}
          onChange={handleRadioChange}
        >
          {radioOptions.map((option) => (
            <FormControlLabel
              name="typeOfConstructionRadio"
              key={option}
              value={option}
              control={<Radio />}
              label={option}
              required={false}
            />
          ))}
          <FormControlLabel
            name="typeOfConstructionRadio"
            value="Others"
            control={<Radio />}
            label="Others"
            required={false}
          />
          {formData.typeofConstruction.radioOptions === "Others" && (
            <div className="col mt-2">
              <TextField
                name="typeOfConstructionRadioSpecify"
                fullWidth
                label="Specify"
                variant="outlined"
                required
                value={formData.typeofConstruction.specify || ""}
                onChange={handleInputChange("specify")}
              />
            </div>
          )}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default UseAndEntryFurtherAction;
