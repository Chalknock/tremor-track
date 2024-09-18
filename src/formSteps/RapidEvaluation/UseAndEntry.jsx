import { LocationOn } from "@mui/icons-material";
import { FormLabel, TextField } from "@mui/material";
import React from "react";
import TremorTextInput from "../../components/TremorTextInput";
import TremorStepTitle from "../../components/TremorStepTitle";

const UseAndEntry = ({ formData, onChange }) => {
  const handleInputChange = (field) => (e) => {
    onChange("useAndEntry", field)(e);
  };
  return (
    <div>
      <TremorStepTitle name={"USE AND ENTRY RESTRICTION"} />
      <FormLabel id="useAndEntry-radio-buttons-group">
        Record any use and entry restrictions exactly as written on placard.
      </FormLabel>
      <div className="row w-100 m-auto mt-4">
        <TremorTextInput
          id="useAndEntry"
          name="useAndEntry"
          label="Specify"
          variant="filled"
          multiline={true}
          maxRows={10}
          style={{ width: "100%", margin: "auto" }}
          width={"inherit"}
          value={formData.useAndEntry.specify || ""}
          onChange={handleInputChange("specify")}
        />
      </div>
    </div>
  );
};

export default UseAndEntry;
