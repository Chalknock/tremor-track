import {
  FormControl,
  InputLabel,
  MenuItem,
  MenuList,
  Select,
  Typography,
} from "@mui/material";
import { Button } from "bootstrap";
import React, { useState } from "react";

const EstimatedBldgDmgPhotos = () => {
  const [image, setImage] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    console.log(files);

    const imageArray = [];

    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          imageArray.push(reader.result);
          setImage((prevImages) => [...prevImages, reader.result]); // Update state
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const dropDownOptions = [
    "None",
    "0-1%",
    "1-10%",
    "10-30%",
    "30-60%",
    "60-100%",
    "100%",
  ];
  return (
    <div>
      <Typography className="text-start">
        Estimated Building Damage (excluding contents)
      </Typography>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={age}
          onChange={handleChange}
        >
          {dropDownOptions.map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        <h2>Upload or Capture an Image</h2>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        {image.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Selected ${index}`}
            style={{ width: "300px", height: "auto" }}
          />
        ))}
      </div>
    </div>
  );
};

export default EstimatedBldgDmgPhotos;
