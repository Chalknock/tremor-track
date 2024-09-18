import { Typography } from "@mui/material";
import React from "react";

const TremorStepTitle = (props) => {
  const name = props.name;
  return (
    <div>
      <Typography
        className="row"
        justifyContent={"center"}
        sx={{ fontSize: "20px", fontWeight: "bold" }}
      >
        {name}
      </Typography>
    </div>
  );
};

export default TremorStepTitle;
