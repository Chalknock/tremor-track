import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { Input, InputAdornment, TextField, Typography } from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TremorDateTimePicker from "../../components/TremorDateTimePicker";
import TremortMapContainer from "../../components/TremorMapContainer";
import { LocationCity, LocationOn } from "@mui/icons-material";
import TremorTextInput from "../../components/TremorTextInput";
import TremorStepTitle from "../../components/TremorStepTitle";

const InspectionForm = ({
  formData,
  onChange,
  handleRadioChange,
  handleDateChange,
  updateCoordinates,
}) => {
  const handleInputChange = (field) => (e) => {
    onChange("inspection", field)(e);
  };

  return (
    <>
      <TremorStepTitle name={"INSPECTION"} />
      <div>
        <div className="d-flex flex-wrap">
          <div className="col-md-6 d-flex mb-3 mb-md-0">
            <TremorTextInput
              id="buildingLocation"
              name="buildingLocation"
              label="Building Location"
              variant="filled"
              icon={<LocationOn />}
              required={false}
              width="inherit"
              value={formData.inspection.buildingName || ""}
              onChange={handleInputChange("buildingName")}
            />
          </div>
          <div className="col-md-6 d-flex flex-column flex-md-row align-items-end justify-content-end">
            <div className="mb-3 mb-md-0 me-md-4">
              <TremorTextInput
                id="latitude"
                name="latitude"
                label="Latitude"
                placeholder="Decimal"
                variant="filled"
                required={false}
                type="number"
                value={formData.inspection.lat || ""}
                onChange={handleInputChange("lat")}
              />
            </div>
            <div>
              <TremorTextInput
                id="longitude"
                name="longitude"
                label="Longitude"
                placeholder="Decimal"
                variant="filled"
                required={false}
                type="number"
                value={formData.inspection.lon || ""}
                onChange={handleInputChange("lon")}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="px-1">
          <TremortMapContainer
            formData={formData.inspection}
            updateCoordinates={updateCoordinates}
          />
        </div>
        <div className="row mt-4 mx-1 p-0">
          <TremorTextInput
            id="buildingName"
            name="buildingName"
            label="Building Name"
            variant="filled"
            icon={<LocationCity />}
            required={false}
            value={formData.inspection.name || ""}
            onChange={handleInputChange("name")}
          />
        </div>
        <div className="row mt-4 px-1">
          <div className="col">
            <TremorDateTimePicker
              value={formData.inspection.date}
              onChange={handleDateChange}
            />
          </div>
          <div className="col">
            <div className="d-flex justify-content-end">
              <FormControl>
                <FormLabel id="AreasInspected-radio-buttons-group">
                  Areas Inspected
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="AreasInspected-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={formData.inspection.areaInspected || "Exterior Only"}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="Exterior Only"
                    control={<Radio />}
                    label="Exterior Only"
                    required={false}
                  />
                  <FormControlLabel
                    value="Exterior and Interior"
                    control={<Radio />}
                    label="Exterior and Interior"
                    required={false}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InspectionForm;
