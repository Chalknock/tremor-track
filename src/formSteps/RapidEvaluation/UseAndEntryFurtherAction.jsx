import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import TremorStepTitle from "../../components/TremorStepTitle";

const UseAndEntryFurtherAction = ({
  formData,
  onChange,
  handleRadioChange,
}) => {
  const handleInputChange = (field) => (e) => {
    onChange("typeofConstruction", field)(e);
  };
  const [isOtherChecked, setIsOtherChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsOtherChecked(event.target.checked);
  };
  const radioOptions = ["Structural", "Geotechnical"];
  return (
    <div>
      <TremorStepTitle name={"FURTHER ACTIONS"} />
      <FormGroup>
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={isOtherChecked}
              onChange={handleCheckboxChange}
              defaultChecked={false}
            />
          }
          label="Barricades needed in the following areas: "
        /> */}
        <FormLabel id="type-of-construction-radio-buttons-group">
          Barricades needed in the following areas:
        </FormLabel>
        <TextField
          margin="normal"
          name="typeOfConstructionRadioSpecify"
          fullWidth
          label="Specify"
          variant="outlined"
          required={false}
          value={formData.typeofConstruction.specify || ""}
          onChange={handleInputChange("specify")}
        />

        <FormControl>
          <FormLabel id="type-of-construction-radio-buttons-group">
            Detailed Evaluation Recommended:
          </FormLabel>
          <RadioGroup
            aria-labelledby="type-of-construction-radio-buttons-group"
            name="typeOfConstruction"
            value={formData.typeofConstruction.radioOptions || ""}
            onChange={handleRadioChange}
            sx={{ paddingLeft: "20px" }}
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

          <RadioGroup
            aria-labelledby="type-of-construction-radio-buttons-group"
            name="typeOfConstruction"
            // value={formData.typeofConstruction.radioOptions || ""}
            // onChange={handleRadioChange}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={isOtherChecked}
                  onChange={handleCheckboxChange}
                />
              }
              label="Other Recommendations: "
            />
            {isOtherChecked && (
              <div className="col mt-2 ps-4">
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

          <TextField
            id="outlined-multiline-flexible"
            label="Comment"
            name="buildingDamageComment"
            multiline
            maxRows={10}
            style={{ marginTop: "20px" }}
            // value={formData.estimatedBldgDmg.comment || ""}
            // onChange={handleInputChange("comment")}
          />
        </FormControl>
      </FormGroup>
    </div>
  );
};

export default UseAndEntryFurtherAction;
