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
export const AdditionalFurtherAction = ({
  formData,
  onChange,
  handleRadioChange,
}) => {
  const handleInputChange = (field) => (e) => {
    onChange("additionalUseAndEntryFurtherAction", field)(e);
  };
  const [isOtherChecked, setIsOtherChecked] = useState(
    formData.additionalUseAndEntryFurtherAction.recommendation ? true : false
  );

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
          name="additionalUseAndEntryFurtherActionRadioSpecify"
          fullWidth
          label="Specify"
          variant="outlined"
          required={false}
          value={formData.additionalUseAndEntryFurtherAction.barricade || ""}
          onChange={handleInputChange("barricade")}
        />

        <FormControl>
          <FormLabel id="type-of-construction-radio-buttons-group">
            Detailed Evaluation Recommended:
          </FormLabel>
          <RadioGroup
            aria-labelledby="type-of-construction-radio-buttons-group"
            name="additionalUseAndEntryFurtherAction"
            value={
              formData.additionalUseAndEntryFurtherAction.radioOptions || ""
            }
            onChange={handleRadioChange}
            sx={{ paddingLeft: "20px" }}
          >
            {radioOptions.map((option) => (
              <FormControlLabel
                name="additionalUseAndEntryFurtherActionRadio"
                key={option}
                value={option}
                control={<Radio />}
                label={option}
                required={false}
              />
            ))}
            <FormControlLabel
              name="additionalUseAndEntryFurtherActionRadio"
              value="Others"
              control={<Radio />}
              label="Others"
              required={false}
            />
            {formData.additionalUseAndEntryFurtherAction.radioOptions ===
              "Others" && (
              <div className="col mt-2">
                <TextField
                  name="additionalUseAndEntryFurtherActionRadioSpecify"
                  fullWidth
                  label="Specify"
                  variant="outlined"
                  required
                  value={
                    formData.additionalUseAndEntryFurtherAction.specify || ""
                  }
                  onChange={handleInputChange("specify")}
                />
              </div>
            )}
          </RadioGroup>

          <RadioGroup
            aria-labelledby="type-of-construction-radio-buttons-group"
            name="additionalUseAndEntryFurtherAction"
            // value={formData.additionalUseAndEntryFurtherAction.radioOptions || ""}
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
                  name="additionalUseAndEntryFurtherActionRadioSpecify"
                  fullWidth
                  label="Specify"
                  variant="outlined"
                  required
                  value={
                    formData.additionalUseAndEntryFurtherAction
                      .recommendation || ""
                  }
                  onChange={handleInputChange("recommendation")}
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
            value={
              formData.additionalUseAndEntryFurtherAction.mainComment || ""
            }
            onChange={handleInputChange("mainComment")}
          />
        </FormControl>
      </FormGroup>
    </div>
  );
};
