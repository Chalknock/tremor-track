import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import TremorStepTitle from "../../components/TremorStepTitle";

const Posting = ({ formData, onChange, handleRadioChange }) => {
  return (
    <div>
      <TremorStepTitle name={"POSTING"} />
      <FormLabel
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
      </FormLabel>
      <FormControl className="">
        <RadioGroup
          aria-labelledby="AreasInspected-radio-buttons-group"
          name="controlled-radio-buttons-group"
          className="row mt-4"
          value={formData.posting.radioOptions || ""}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="INSPECTED"
            control={<Radio />}
            label="INSPECTED"
            required={false}
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
            required={false}
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
            required={false}
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

export default Posting;
