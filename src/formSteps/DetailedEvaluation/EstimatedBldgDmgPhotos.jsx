import { Typography } from "@mui/material";
import { Button } from "bootstrap";
import React, { useState } from "react";

const EstimatedBldgDmgPhotos = () => {
  const [image, setImage] = useState([]);

  const handleImageChange = (e) => {
    // const file = e.target.files[0];
    // console.log(e.target.files);
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setImage(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // }
    const files = e.target.files; // Get the FileList
    console.log(files);

    const imageArray = []; // Array to hold image previews

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

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <Typography className="text-start">
        Estimated Building Damage (excluding contents)
      </Typography>
      <input
        type="file"
        id="docpicker"
        accept=".pdf, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />

      <div>
        <h2>Upload or Capture an Image</h2>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCapture}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        {/* {image && (
          <img
            src={image}
            alt="Selected or Captured"
            style={{ width: "300px", height: "auto" }}
          />
        )} */}
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
