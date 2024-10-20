import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInspection } from "../components/provider/InspectionProvider";
import "../assets/css/inspectorList.css";
import { Typography } from "@mui/material";

export const TremorInspectorList = ({ formData, handleInspectorClick }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://chalknock.online/api/inspectorAll"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const { setInspectionId } = useInspection();
  const handleInspectionClick = (inspector) => {
    // Set inspector details in parent component's formData state
    handleInspectorClick("firstname")(inspector.firstname);
    handleInspectorClick("lastname")(inspector.lastname);
    handleInspectorClick("affiliation")(inspector.affiliation);
    handleInspectorClick("inspectorID")(inspector.inspectorsId);

    // Navigate to the next step (or wherever necessary)
    // navigate("/evaluate");

    {
      formData.inspection.buildingName === ""
        ? navigate("/evaluate")
        : navigate("/reevaluate");
    }
  };

  // Filter the data based on the search term
  const filteredData = data.filter((inspector) =>
    inspector.firstname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="test-inspector-container">
      <input
        type="text"
        placeholder="Search by Inspector Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <Typography
        variant="h6"
        noWrap
        component="div"
        className="row justify-content-start "
      >
        Select Inspector
      </Typography>
      <div className="scrollable-list">
        {filteredData.length > 0 ? (
          <ul className="inspection-list">
            {filteredData.map((inspector) => (
              <li key={inspector.id} className="inspection-item">
                <div className="button-group mx-auto">
                  <button
                    className="view-button"
                    onClick={() => handleInspectionClick(inspector)}
                  >
                    {inspector.firstname} {inspector.lastname}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Inspector data available.</p>
        )}
      </div>
    </div>
  );
};

export default TremorInspectorList;
