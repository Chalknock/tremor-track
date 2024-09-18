import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import TremorStepTitle from "../../components/TremorStepTitle";

const PrimaryOccupancy = ({ formData, onChange, handleRadioChange }) => {
  const handleInputChange = (field) => (e) => {
    onChange("primaryOccupancy", field)(e);
  };

  const radioOptions = [
    "Dwelling",
    "Government",
    "Other Residential",
    "Historic",
    "Public Assembly",
    "School",
    "Emergency Services",
    "Commercial",
    "Offices",
    "Industrial",
  ];
  return (
    <div className="col">
      <TremorStepTitle name={"BUILDING DESCRIPTION"} />
      <FormControl>
        <FormLabel id="primaryOccupancy-radio-buttons-group">
          Primary Occupancy
        </FormLabel>
        <RadioGroup
          aria-labelledby="primaryOccupancy-radio-buttons-group"
          name="primaryOccupancy"
          value={formData.primaryOccupancy.radioOptions || ""}
          onChange={handleRadioChange}
        >
          {radioOptions.map((option) => (
            <FormControlLabel
              name="primaryOccupancyRadio"
              key={option}
              value={option}
              control={<Radio />}
              label={option}
              required={false}
            />
          ))}
          <FormControlLabel
            name="primaryOccupancyRadio"
            value="Others"
            control={<Radio />}
            label="Others"
            required={false}
          />
          {formData.primaryOccupancy.radioOptions === "Others" && (
            <div className="col mt-2">
              <TextField
                name="primaryOccupancyRadioSpecify"
                fullWidth
                label="Specify"
                variant="outlined"
                required
                value={formData.primaryOccupancy.specify || ""}
                onChange={handleInputChange("specify")}
              />
            </div>
          )}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default PrimaryOccupancy;
