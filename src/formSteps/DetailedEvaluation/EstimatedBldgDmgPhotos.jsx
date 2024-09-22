import { Typography } from "@mui/material";
import { Button } from "bootstrap";
import React from "react";

const EstimatedBldgDmgPhotos = () => {
  return <div>
    <Typography className="text-start">
    Estimated Building Damage (excluding contents)
    </Typography>
    <input
  type="file"
  id="docpicker"
  accept=".pdf, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />

  </div>;
};

export default EstimatedBldgDmgPhotos;
