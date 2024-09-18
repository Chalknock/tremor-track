import { LocationOn } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import TremorTextInput from "../../components/TremorTextInput";
import TremorStepTitle from "../../components/TremorStepTitle";

const TypeofConstruction = ({ formData, onChange, handleRadioChange }) => {
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
    <>
      <TremorStepTitle name={"BUILDING DESCRIPTION"} />
      <div className="col">
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
    </>
  );
};

export default TypeofConstruction;
