import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import TremorStepTitle from "../../components/TremorStepTitle";
import TremorFormLabel from "../../components/TremorFormLabel";

export const AdditionalPosting = ({
  formData,
  onChange,
  handleRadioChange,
}) => {
  return (
    <div>
      <TremorStepTitle name={"POSTING"} />
      {/* <FormLabel
      id="estimatedBldgDmg-radio-buttons-group"
      style={{
        background: "lightGray",
        borderRadius: "20px",
        padding: "18px",
      }}
    >
      Choose a posting based on the evaluation and team judgment. Severe
      conditions endangering the overall building are grounds for an Unsafe
      posting. Localized Severe and overall Moderate conditions may allow a
      Restricted Use posting.
    </FormLabel> */}
      <TremorFormLabel
        label={
          "If necessary, revise the previous posting based on the \
          new evaluation and team judgment.Record any use and entry restrictions exactly as written on placard.\
          Severe conditions endangering the overall building are grounds for an Unsafe posting. Local Severe and overall\
          Moderate conditions may allow a Restricted Use posting."
        }
      />
      <FormControl className="">
        <RadioGroup
          aria-labelledby="AreasInspected-radio-buttons-group"
          name="controlled-radio-buttons-group"
          className="row mt-4"
          value={formData.additionalPosting.radioOptions || ""}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="INSPECTED"
            control={<Radio />}
            label="INSPECTED"
            required={true}
            style={{
              background: "green",
              marginBottom: "20px",
              marginLeft: "20px",
              borderRadius: "10px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
            }}
            sx={{
              ".MuiFormControlLabel-label": {
                fontWeight: "bold",
                fontSize: "18px",
              },
            }}
          />
          <FormControlLabel
            value="RESTRICTED USE"
            control={<Radio />}
            label="RESTRICTED USE"
            required={true}
            style={{
              background: "yellow",
              marginBottom: "20px",
              marginLeft: "20px",
              borderRadius: "10px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
            }}
            sx={{
              ".MuiFormControlLabel-label": {
                fontWeight: "bold",
                fontSize: "18px",
              },
            }}
          />
          <FormControlLabel
            value="UNSAFE"
            control={<Radio />}
            label="UNSAFE"
            required={true}
            style={{
              background: "red",
              marginBottom: "20px",
              marginLeft: "20px",
              borderRadius: "10px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
            }}
            sx={{
              ".MuiFormControlLabel-label": {
                fontWeight: "bold",
                fontSize: "18px",
              },
            }}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
