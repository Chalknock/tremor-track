import React from "react";
import TremorTextInput from "../../components/TremorTextInput";
import { Call, LocationOn, MarkEmailUnreadSharp } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";

const BuildingDescription = ({ formData, onChange }) => {
  const handleInputChange = (field) => (e) => {
    onChange("buildingDescription", field)(e);
  };
  return (
    <>
      <div className="row d-flex">
        <div className="col-md-12 col-lg-6">
          <TremorTextInput
            id={"buildingContact"}
            label={"Building Contact / Phone"}
            variant={"filled"}
            icon={<Call />}
            required={false}
            width="100%"
            value={formData.buildingDescription.contact}
            onChange={handleInputChange("contact")}
          />
        </div>
      </div>

      <Typography variant="" noWrap component="div" className="mt-4">
        Number of stories
      </Typography>
      <div className="row d-flex">
        <div className="col-md-6 col-lg-6 mb-2">
          <TremorTextInput
            id={"AboveGround"}
            label={"Above Ground"}
            placeholder={"Numeric"}
            variant={"filled"}
            required={false}
            type={"number"}
            width="100%"
          />
        </div>
        <div className="col-md-6 col-lg">
          <TremorTextInput
            id={"BelowGround"}
            label={"Below Ground"}
            placeholder={"Numeric"}
            variant={"filled"}
            required={false}
            type={"number"}
            width="100%"
          />
        </div>
      </div>

      <Typography variant="" noWrap component="div" className="mt-4">
        Approximate “Footprint Area” (square meters):
      </Typography>
      <div className="row d-flex">
        <div className="col-md-12">
          <TremorTextInput
            id={"FootprintArea"}
            label={"Footprint Area"}
            placeholder={"Numeric"}
            variant={"filled"}
            required={false}
            type={"number"}
            width="100%"
          />
        </div>
      </div>

      <Typography variant="" noWrap component="div" className="mt-4">
        Number of Residential Units
      </Typography>
      <div className="row d-flex">
        <div className="col-md-6 col-lg-6 mb-2">
          <TremorTextInput
            id={"HabitableArea"}
            label={"Habitable"}
            placeholder={"Numeric"}
            variant={"filled"}
            required={false}
            type={"number"}
            width="100%"
          />
        </div>
        <div className="col-md-6 col-lg-6">
          <TremorTextInput
            id={"NonHabitableArea"}
            label={"Non-Habitable"}
            placeholder={"Numeric"}
            variant={"filled"}
            required={false}
            type={"number"}
            width="100%"
          />
        </div>
      </div>
    </>
  );
};

export default BuildingDescription;
