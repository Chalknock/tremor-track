import { LocationOn } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import TremorTextInput from "../../components/TremorTextInput";

const TypeofConstruction = () => {
  const [value, setValue] = useState("Wood Frame");
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value);
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <>
      <div className="col">
        <FormControl>
          <FormLabel id="AreasInspected-radio-buttons-group">
            Areas Inspected
          </FormLabel>
          <RadioGroup
            aria-labelledby="AreasInspected-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Wood Frame"
              control={
                <Radio
                  checked={selectedValue === "Wood Frame"}
                  onChange={handleRadioChange}
                />
              }
              label="Wood Frame"
              required={false}
            />
            <FormControlLabel
              value="Steel Frame"
              control={
                <Radio
                  checked={selectedValue === "Steel Frame"}
                  onChange={handleRadioChange}
                />
              }
              label="Steel Frame"
              required={false}
            />
            <FormControlLabel
              value="Tilt-up Concrete"
              control={
                <Radio
                  checked={selectedValue === "Tilt-up Concrete"}
                  onChange={handleRadioChange}
                />
              }
              label="Tilt-up Concrete"
              required={false}
            />
            <FormControlLabel
              value="Concrete Frame"
              control={
                <Radio
                  checked={selectedValue === "Concrete Frame"}
                  onChange={handleRadioChange}
                />
              }
              label="Concrete Frame"
              required={false}
            />
            <FormControlLabel
              value="Concrete Sheer Wall"
              control={
                <Radio
                  checked={selectedValue === "Concrete Sheer Wall"}
                  onChange={handleRadioChange}
                />
              }
              label="Concrete Sheer Wall"
              required={false}
            />
            <FormControlLabel
              value="Unreinforced Masonry"
              control={
                <Radio
                  checked={selectedValue === "Unreinforced Masonry"}
                  onChange={handleRadioChange}
                />
              }
              label="Unreinforced Masonry"
              required={false}
            />

            <FormControlLabel
              value="Reinforced Masonry"
              control={
                <Radio
                  checked={selectedValue === "Reinforced Masonry"}
                  onChange={handleRadioChange}
                />
              }
              label="Reinforced Masonry"
              required={false}
            />

            <div className="row align-items-center mb-3">
              <div className="col-auto">
                <FormControlLabel
                  value="Others"
                  control={
                    <Radio
                      checked={selectedValue === "Others"}
                      onChange={handleRadioChange}
                    />
                  }
                  label="Others"
                  required={false}
                />
              </div>
              {selectedValue === "Others" && (
                <div className="col">
                  <TextField
                    fullWidth
                    label="Specify"
                    variant="outlined"
                    required
                  />
                </div>
              )}
            </div>
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
};

export default TypeofConstruction;
