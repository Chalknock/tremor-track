import { Typography } from "@mui/material";
import React from "react";

const TremorStepTitle = (props) => {
  const name = props.name;
  const background = props.background;
  const color = props.color;
  const paddingTop = props.paddingTop;
  return (
    <div>
      <Typography
        className="row text-center"
        justifyContent={"center"}
        sx={{
          fontSize: "20px",
          fontWeight: "bold",
          background: background,
          color: color,
          paddingTop: paddingTop ?? 0,
        }}
      >
        {name}
      </Typography>
    </div>
  );
};

export default TremorStepTitle;
