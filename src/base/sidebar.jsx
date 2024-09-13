import React, { useState } from "react";
import "./sidebar.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const Sidebar = () => {
  const [currImg, setCurrImg] = useState(0);
  const images = [
    { title: "San Diego", subtitle: "This is San Diego" },
    {
      title: "Salvador, Brazil",
      subtitle: "The Best City in the World",
    },
    {
      title: "UBC (Vancouver)",
      subtitle: "The University of British Columbia",
    },
  ];
  return (
    <div className="carousel">
      <div className="carouselInner">
        asdsda
        <div
          className="left"
          onClick={() => {
            currImg > 0 && setCurrImg(currImg - 1);
          }}
        >
          <ArrowBackIosIcon style={{ fontSize: 30 }} />
        </div>
        <div className="center">
          <h1>{images[currImg].title}</h1>
          <p>{images[currImg].subtitle}</p>
        </div>
        <div
          className="right"
          onClick={() => {
            currImg < images.length - 1 && setCurrImg(currImg + 1);
          }}
        >
          <ArrowForwardIosIcon style={{ fontSize: 30 }} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
