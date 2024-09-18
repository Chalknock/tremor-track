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

const EstimatedBldgDmg = ({ formData, onChange, handleRadioChange }) => {
  const handleInputChange = (field) => (e) => {
    onChange("estimatedBldgDmg", field)(e);
  };

  const radioOptions = [
    "None",
    "0-1%",
    "1-10%",
    "10-30%",
    "30-60%",
    "60-100%",
    "100%",
  ];
  return (
    <div className="col">
      <TremorStepTitle name={"EVALUATION"} />
      <FormControl>
        <FormLabel id="estimatedBldgDmg-radio-buttons-group">
          Estimated Building Damage (excluding contents)
        </FormLabel>
        <RadioGroup
          aria-labelledby="estimatedBldgDmg-radio-buttons-group"
          name="estimatedBldgDmg"
          value={formData.estimatedBldgDmg.radioOptions || ""}
          onChange={handleRadioChange}
        >
          {radioOptions.map((option) => (
            <FormControlLabel
              name="estimatedBldgDmgRadio"
              key={option}
              value={option}
              control={<Radio />}
              label={option}
              required={false}
            />
          ))}
          <TextField
            id="outlined-multiline-flexible"
            label="Comment"
            name="buildingDamageComment"
            multiline
            maxRows={10}
            style={{ width: "50vw", margin: "auto" }}
            value={formData.estimatedBldgDmg.comment || ""}
            onChange={handleInputChange("comment")}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default EstimatedBldgDmg;
