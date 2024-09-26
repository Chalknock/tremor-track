import { PhotoCamera } from "@mui/icons-material";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";

const EstimatedBldgDmgPhotos = () => {
  const [image, setImage] = useState([]);
  const [percentage, setPercentage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageChange = (e) => {
    const files = e.target.files;
    console.log(files);

    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage((prevImages) => [...prevImages, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleChange = (event) => {
    setPercentage(event.target.value);
  };

  const handleOpenModal = (img) => {
    setSelectedImage(img);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleRemoveImage = (index) => {
    setImage((prevImages) => prevImages.filter((_, i) => i !== index));
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
      <FormControl variant="filled" sx={{ m: 1, minWidth: "100%" }}>
        <InputLabel id="demo-simple-select-filled-label">
          Choose . . .
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={percentage}
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
        <Typography className="text-start">Sketch or Photos</Typography>
        {/* <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        /> */}
        <label
          htmlFor="file-input"
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <PhotoCamera sx={{ fontSize: "40px", marginRight: "10px" }} />
          {/* <span>Upload Image</span> */}
        </label>{" "}
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }} // Hide the default input
        />
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {image.map((img, index) => (
            <Card key={index} sx={{ width: "300px", margin: "10px" }}>
              <CardMedia
                component="img"
                height="auto"
                image={img}
                alt={`Selected ${index}`}
              />
              <CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenModal(img)}
                  sx={{ marginRight: "10px" }}
                >
                  View
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemoveImage(index)}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>View Image</DialogTitle>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EstimatedBldgDmgPhotos;
