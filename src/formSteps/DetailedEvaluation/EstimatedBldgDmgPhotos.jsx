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
} from "@mui/material";
import React, { useState } from "react";

const EstimatedBldgDmgPhotos = ({ formData, onChange }) => {
  const [images, setImages] = useState(
    formData.estimatedBldgDmgPhotos?.images || []
  );
  const [percentage, setPercentage] = useState(
    formData.estimatedBldgDmgPhotos?.percentage || ""
  );
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Handle image upload
  const handleImageChange = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const newImages = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result);
          const updatedImages = [...images, ...newImages];
          setImages(updatedImages);

          // Pass the updated images to the parent component
          onChange(
            "estimatedBldgDmgPhotos",
            "images"
          )({
            target: { value: updatedImages },
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Handle percentage change
  const handleChange = (event) => {
    const newPercentage = event.target.value;
    setPercentage(newPercentage);

    // Pass the updated percentage to the parent component
    onChange(
      "estimatedBldgDmgPhotos",
      "percentage"
    )({
      target: { value: newPercentage },
    });
  };

  // Handle modal open
  const handleOpenModal = (img) => {
    setSelectedImage(img);
    setOpenModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Remove image
  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    // Pass the updated images list to the parent component
    onChange(
      "estimatedBldgDmgPhotos",
      "images"
    )({
      target: { value: updatedImages },
    });
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
      <Typography variant="h6" className="text-start">
        Estimated Building Damage (excluding contents)
      </Typography>
      <FormControl variant="filled" sx={{ m: 1, minWidth: "100%" }}>
        <InputLabel id="damage-percentage-label">Choose . . .</InputLabel>
        <Select
          labelId="damage-percentage-label"
          id="damage-percentage-select"
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
        <label
          htmlFor="file-input"
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <PhotoCamera sx={{ fontSize: "40px", marginRight: "10px" }} />
          <span>Upload Image</span>
        </label>
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }} // Hide the default input
        />
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {images.map((img, index) => (
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
