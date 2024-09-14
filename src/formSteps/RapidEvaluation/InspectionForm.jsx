import React from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { Input, InputAdornment, TextField } from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TremorDateTimePicker from "../../components/TremorDateTimePicker";
import TremortMapContainer from "../../components/TremortMapContainer";
import { LocationCity, LocationOn } from "@mui/icons-material";
import TremorTextInput from "../../components/TremorTextInput";
const InspectionForm = () => {
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <div className="row mt-2 mx-1 p-0">
        <TremorTextInput
          id={"buildingLocation"}
          label={"Building Location"}
          variant={"filled"}
          icon={<LocationOn />}
          required={false}
        />
      </div>
      <br />

      <div className="px-1">
        <TremortMapContainer />
      </div>
      <div className="row mt-4 mx-1 p-0">
        <TremorTextInput
          id={"buildingName"}
          label={"Building Name"}
          variant={"filled"}
          icon={<LocationCity />}
          required={true}
        />
      </div>

      <div className="row mt-4 px-1">
        <TremorDateTimePicker />
      </div>
      <div className="row mt-4 mx-2">
        <FormControl>
          <FormLabel id="AreasInspected-radio-buttons-group">
            Areas Inspected
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="AreasInspected-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Exterior Only"
              control={<Radio />}
              label="Exterior Only"
              required
            />
            <FormControlLabel
              value="Exterior and Interior"
              control={<Radio />}
              label="Exterior and Interior"
              required
            />
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
};

export default InspectionForm;
