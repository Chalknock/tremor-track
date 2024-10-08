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

  const handleImageChange = (e) => {
    const files = e.target.files;
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const acceptedTypes = ["image/jpeg", "image/png"];

    if (files.length > 0) {
      const newImages = [];
      Array.from(files).forEach((file) => {
        if (file.size > MAX_FILE_SIZE) {
          alert("File is too large. Max size is 10MB.");
          return;
        }

        if (!acceptedTypes.includes(file.type)) {
          alert("Unsupported file type. Only JPEG and PNG are allowed.");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result);
          const updatedImages = [...images, ...newImages];
          setImages(updatedImages);

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

  const handleChange = (event) => {
    const newPercentage = event.target.value;
    setPercentage(newPercentage);
    onChange(
      "estimatedBldgDmgPhotos",
      "percentage"
    )({
      target: { value: newPercentage },
    });
  };

  const handleOpenModal = (img) => {
    setSelectedImage(img);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
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
            style={{ width: "100%", height: "auto", maxHeight: "80vh" }}
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
