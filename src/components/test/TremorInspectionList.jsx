import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInspection } from "../provider/InspectionProvider";
import "../../assets/css/testInspection.css"; // Import the CSS file for styling
import { tremorExportPdf } from "../../utilities/tremorExportPdf";
import { tremorExportDetailedPdf } from "../../utilities/tremorExportDetailedPdf";
import dayjs from "dayjs";

export const TremorInspectionList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    inspector: {
      firstname: "",
      lastname: "",
      affiliation: "",
      inspectorID: "",
    },
    inspection: {
      buildingName: "",
      buildingLocation: "",
      lat: NaN,
      lon: NaN,
      date: null,
      time: null,
      year: "",
      month: "",
      monthName: "",
      day: "",
      hour: "",
      minute: "",
      period: "",
      areaInspected: "",
    },
    buildingDescription: {
      contact: "",
      aboveGround: "",
      belowGround: "",
      footprintArea: "",
      habitable: "",
      nonHabitable: "",
    },
    typeofConstruction: {
      radioOptions: "",
      barricade: "",
      recommendation: "",
      specify: "",
    },
    primaryOccupancy: {
      radioOptions: "",
      specify: "",
    },
    evaluation: {
      specify: "",
    },
    estimatedBldgDmg: {
      radioOptions: "",
      comment: "",
    },
    posting: {
      radioOptions: "",
    },
    useAndEntry: {
      specify: "",
    },
    useAndEntryFurtherAction: {
      radioOptions: "",
      barricade: "",
      recommendation: "",
      specify: "",
      mainComment: "",
    },
    overAllHazards: {
      radioOptions: "",
      specify: "",
      comment: {},
    },
    structuralHazards: {
      radioOptions: "",
      specify: "",
      comment: {},
    },
    nonStructuralHazards: {
      radioOptions: "",
      specify: "",
      comment: {},
    },
    geoTechnicalHazards: {
      radioOptions: "",
      specify: "",
      comment: {},
      mainComment: "",
    },
    estimatedBldgDmgPhotos: {
      percentage: "",
      images: [],
    },
    additionalPosting: {
      radioOptions: "",
    },
    additionalUseAndEntry: {
      specify: "",
    },
    additionalUseAndEntryFurtherAction: {
      radioOptions: "",
      barricade: "",
      recommendation: "",
      specify: "",
      mainComment: "",
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://chalknock.online/api/inspectionsAll"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [dataLoaded, setDataLoaded] = useState(false);
  const { setInspectionId } = useInspection();
  const handleInspectionClick = (id) => {
    setInspectionId(id);
    navigate("/reevaluate");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://chalknock.online/api/delete/${id}`);
      setData(data.filter((inspection) => inspection.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const filteredData = data.filter((inspection) =>
    inspection.building_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRestore = async (inspectionId) => {
    try {
      const response = await axios.get(
        `https://chalknock.online/api/inspections/${inspectionId}`
      );

      const [restoredData] = response.data;
      if (restoredData) {
        const mappings = {
          firstname: restoredData.firstname || "",
          lastname: restoredData.lastname || "",
          affiliation: restoredData.affiliation || "",
          inspectorID: restoredData.inspectorID || "",
          buildingLocation: restoredData.building_location || "",
          lat: restoredData.latitude || null,
          lon: restoredData.longitude || null,
          buildingName: restoredData.building_name || "",
          date: restoredData.date ? dayjs(restoredData.date) : null,
          areaInspected: restoredData.area_inspected || "",

          time: restoredData.time || "",
          year: restoredData.year || "",
          month: restoredData.month || "",
          monthName: restoredData.month_name || "",
          day: restoredData.day || "",
          hour: restoredData.hour || "",
          minute: restoredData.minute || "",
          period: restoredData.period || "",

          images: restoredData.images || [],
          contact: restoredData.contact || "",
          aboveGround: restoredData.above_ground || "",
          belowGround: restoredData.below_ground || "",
          footprintArea: restoredData.footprint_area || "",
          habitable: restoredData.habitable || "",
          nonHabitable: restoredData.non_habitable || "",
          constructionTypeRadio: restoredData.constructionTypeRadio || "",
          constructionTypeSpecify: restoredData.constructionTypeSpecify || "",
          primaryOccupancyRadio: restoredData.primaryOccupancyRadio || "",
          primaryOccupancySpecify: restoredData.primaryOccupancySpecify || "",
          estimatedDamageRadioOptions:
            restoredData.estimated_damage_radio_options || "",
          estimatedDamageComment: restoredData.estimated_damage_comment || "",
          estimatedDamagePercentage:
            restoredData.estimated_damage_percentage || "",
          useEntrySpecify: restoredData.use_entry_specify || "",
          useEntryActionRadioOptions:
            restoredData.use_entry_action_radio_options || "",
          useEntryActionBarricade:
            restoredData.use_entry_action_barricade || "",
          useEntryActionRecommendation:
            restoredData.use_entry_action_recommendation || "",
          useEntryActionMainComment:
            restoredData.use_entry_action_main_comment || "",
          overallHazardsSpecify: restoredData.overall_hazards_specify || "",
          structuralHazardsSpecify:
            restoredData.structural_hazards_specify || "",
          nonStructuralHazardsSpecify:
            restoredData.non_structural_hazards_specify || "",
          geotechnicalHazardsSpecify:
            restoredData.geotechnical_hazards_specify || "",
          geotechnicalHazardsMainComment:
            restoredData.geotechnical_hazards_main_comment || "",
          additionalPostingRadioOptions:
            restoredData.additional_posting_radio_options || "",
          additionalUseEntrySpecify:
            restoredData.additional_use_entry_specify || "",
          additionalUseEntryActionBarricade:
            restoredData.additional_use_entry_action_barricade || "",
          additionalUseEntryActionRecommendation:
            restoredData.additional_use_entry_action_recommendation || "",
          additionalUseEntryActionMainComment:
            restoredData.additional_use_entry_action_main_comment || "",
          evalSpecify: restoredData.evalSpecify || "",
          evalCollapse: restoredData.evalCollapse || "",
          evalBuilding: restoredData.evalBuilding || "",
          evalRacking: restoredData.evalRacking || "",
          evalGround: restoredData.evalGround || "",
          evalOthers: restoredData.evalOthers || "",
          evalChimney: restoredData.evalChimney || "",
          postingRadio: restoredData.postingRadio || "",
          useEntryActionMain_comment:
            restoredData.use_entry_action_main_comment || "",
          useEntryActionRadio_options:
            restoredData.use_entry_action_radio_options || "",
          overallCollapse: restoredData.overallCollapse || "",
          overallBuilding: restoredData.overallBuilding || "",
          overallSpecify: restoredData.overallSpecify || "",
          overallOthers: restoredData.overallOthers || "",
          overallCollapseComment: restoredData.overallCollapseComment || "",
          overallBuildingComment: restoredData.overallBuildingComment || "",
          overallOthersComent: restoredData.overallOthersComent || "",
          foundationsStructuralHazards: restoredData.shfoundations || "",
          precastStructuralHazards: restoredData.shPrecast || "",
          roofsStructuralHazards: restoredData.shRoofs || "",
          columnsStructuralHazards: restoredData.shcColumns || "",
          diaphragmsStructuralHazards: restoredData.shDiaphragms || "",
          wallsStructuralHazards: restoredData.shWalls || "",
          specifyStructuralHazards: restoredData.shSpecify || "",
          othersStructuralHazards: restoredData.shOthers || "",
          foundationsCommentStructuralHazards:
            restoredData.shFoundationsComment || "",
          precastCommentStructuralHazards: restoredData.shPrecastComment || "",
          roofsCommentStructuralHazards: restoredData.shRoofsComment || "",
          columnsCommentStructuralHazards: restoredData.shColumnsComment || "",
          diaphragmsCommentStructuralHazards:
            restoredData.shDiaphragmsComment || "",
          wallsCommentStructuralHazards: restoredData.shWallsComment || "",
          othersCommentStructuralHazards: restoredData.shOthersComment || "",

          parapetsNonStructuralHazards:
            restoredData.parapetsNonStructuralHazards || "",
          ceilingsNonStructuralHazards:
            restoredData.ceilingsNonStructuralHazards || "",
          claddingNonStructuralHazards:
            restoredData.claddingNonStructuralHazards || "",
          interiorNonStructuralHazards:
            restoredData.interiorNonStructuralHazards || "",
          stairsNonStructuralHazards:
            restoredData.stairsNonStructuralHazards || "",
          elevatorsNonStructuralHazards:
            restoredData.elevatorsNonStructuralHazards || "",
          electricNonStructuralHazards:
            restoredData.electricNonStructuralHazards || "",
          specifyNonStructuralHazards:
            restoredData.specifyNonStructuralHazards || "",
          othersNonStructuralHazards:
            restoredData.othersNonStructuralHazards || "",
          parapetsCommentNonStructuralHazards:
            restoredData.parapetsCommentNonStructuralHazards || "",
          ceilingsCommentNonStructuralHazards:
            restoredData.ceilingsCommentNonStructuralHazards || "",
          claddingCommentNonStructuralHazards:
            restoredData.claddingCommentNonStructuralHazards || "",
          interiorCommentNonStructuralHazards:
            restoredData.interiorCommentNonStructuralHazards || "",
          stairsCommentNonStructuralHazards:
            restoredData.stairsCommentNonStructuralHazards || "",
          elevatorsCommentNonStructuralHazards:
            restoredData.elevatorsCommentNonStructuralHazards || "",
          electricCommentNonStructuralHazards:
            restoredData.electricCommentNonStructuralHazards || "",
          specifyNCommentNonStructuralHazards:
            restoredData.specifyNCommentNonStructuralHazards || "",
          othersCommentNonStructuralHazards:
            restoredData.othersCommentNonStructuralHazards || "",
          slopeGeoTechnicalHazards: restoredData.slopeGeoTechnicalHazards || "",
          groundGeoTechnicalHazards:
            restoredData.groundGeoTechnicalHazards || "",
          specifyGeoTechnicalHazards:
            restoredData.specifyGeoTechnicalHazards || "",
          othersGeoTechnicalHazards:
            restoredData.othersGeoTechnicalHazards || "",
          mainCommentGeoTechnicalHazards:
            restoredData.mainCommentGeoTechnicalHazards || "",
          slopeCommentGeoTechnicalHazards:
            restoredData.slopeCommentGeoTechnicalHazards || "",
          groundCommentGeoTechnicalHazards:
            restoredData.groundCommentGeoTechnicalHazards || "",
          othersCommentGeoTechnicalHazards:
            restoredData.othersCommentGeoTechnicalHazards || "",
        };

        // Batch updating formData using setFormData
        setFormData((prevFormData) => ({
          ...prevFormData,
          inspector: {
            firstname: mappings.firstname,
            lastname: mappings.lastname,
            affiliation: mappings.affiliation,
            inspectorID: mappings.inspectorID,
          },
          inspection: {
            buildingName: mappings.buildingName,
            buildingLocation: mappings.buildingLocation,
            lat: mappings.lat,
            lon: mappings.lon,
            date: mappings.date,
            time: mappings.time,
            year: mappings.year,
            month: mappings.month,
            monthName: mappings.monthName,
            day: mappings.day,
            hour: mappings.hour,
            minute: mappings.minute,
            period: mappings.period,
            areaInspected: mappings.areaInspected,
          },
          buildingDescription: {
            ...prevFormData.buildingDescription,
            contact: mappings.contact,
            aboveGround: mappings.aboveGround,
            belowGround: mappings.belowGround,
            footprintArea: mappings.footprintArea,
            habitable: mappings.habitable,
            nonHabitable: mappings.nonHabitable,
          },
          typeofConstruction: {
            radioOptions: mappings.constructionTypeRadio,
            specify: mappings.constructionTypeSpecify,
          },
          primaryOccupancy: {
            radioOptions: mappings.primaryOccupancyRadio,
            specify: mappings.primaryOccupancySpecify,
          },
          evaluation: {
            specify: mappings.evalSpecify,
            "Collapse, partial collapse, or building off foundation":
              mappings.evalCollapse,
            "Building  or story leaning": mappings.evalBuilding,
            "Racking damage to walls, other structural damage":
              mappings.evalRacking,
            "Chimney, parapet, or other falling hazards": mappings.evalChimney,
            "Ground slope movement or cracking ": mappings.evalGround,
            Others: mappings.evalOthers,
          },
          estimatedBldgDmg: {
            radioOptions: mappings.estimatedDamageRadioOptions,
            comment: mappings.estimatedDamageComment,
          },
          posting: {
            radioOptions: mappings.postingRadio,
          },
          useAndEntry: {
            specify: mappings.useEntrySpecify,
          },
          useAndEntryFurtherAction: {
            barricade: mappings.useEntryActionBarricade,
            mainComment: mappings.useEntryActionMain_comment,
            radioOptions: mappings.useEntryActionRadio_options,
            specify: mappings.useEntrySpecify,
            recommendation: mappings.useEntryActionRecommendation,
          },
          overAllHazards: {
            "Collapse or partial collapse": mappings.overallCollapse,
            "Building  or story leaning": mappings.overallBuilding,
            specify: mappings.overallSpecify,
            Others: mappings.overallOthers,
            comment: {
              "Collapse or partial collapse": mappings.overallCollapseComment,
              "Building  or story leaning": mappings.overallBuildingComment,
              Others: mappings.overallOthersComent,
            },
          },
          structuralHazards: {
            Foundations: mappings.foundationsStructuralHazards,
            "Precast connections": mappings.precastStructuralHazards,
            "Roofs, floors (vertical loads)": mappings.roofsStructuralHazards,
            "Columns, pilasters, corbels": mappings.columnsStructuralHazards,
            "Diaphragms, horizontal bracing":
              mappings.diaphragmsStructuralHazards,
            "Walls, vertical bracing": mappings.wallsStructuralHazards,
            specify: mappings.specifyStructuralHazards,
            Others: mappings.othersStructuralHazards,
            comment: {
              Foundations: mappings.foundationsCommentStructuralHazards,
              "Precast connections": mappings.precastCommentStructuralHazards,
              "Roofs, floors (vertical loads)":
                mappings.roofsCommentStructuralHazards,
              "Columns, pilasters, corbels":
                mappings.columnsCommentStructuralHazards,
              "Diaphragms, horizontal bracing":
                mappings.diaphragmsCommentStructuralHazards,
              "Walls, vertical bracing": mappings.wallsCommentStructuralHazards,
              Others: mappings.othersCommentStructuralHazards,
            },
          },
          nonStructuralHazards: {
            "Parapets, ornamentation": mappings.parapetsNonStructuralHazards,
            "Ceilings, light fixtures": mappings.ceilingsNonStructuralHazards,
            "Cladding, glazing": mappings.claddingNonStructuralHazards,
            "Interior walls, partitions": mappings.interiorNonStructuralHazards,
            "Stairs, exits": mappings.stairsNonStructuralHazards,
            Elevators: mappings.elevatorsNonStructuralHazards,
            "Electric, gas": mappings.electricNonStructuralHazards,
            specify: mappings.specifyNonStructuralHazards,
            Others: mappings.othersNonStructuralHazards,
            comment: {
              "Parapets, ornamentation":
                mappings.parapetsCommentNonStructuralHazards,
              "Ceilings, light fixtures":
                mappings.ceilingsCommentNonStructuralHazards,
              "Cladding, glazing": mappings.claddingCommentNonStructuralHazards,
              "Interior walls, partitions":
                mappings.interiorCommentNonStructuralHazards,
              "Stairs, exits": mappings.stairsCommentNonStructuralHazards,
              Elevators: mappings.elevatorsCommentNonStructuralHazards,
              "Electric, gas": mappings.electricCommentNonStructuralHazards,
              specify: mappings.specifyNCommentNonStructuralHazards,
              Others: mappings.othersCommentNonStructuralHazards,
            },
          },

          geoTechnicalHazards: {
            "Slope failure, debris": mappings.slopeGeoTechnicalHazards,
            "Ground movement, fissures": mappings.groundGeoTechnicalHazards,
            specify: mappings.specifyGeoTechnicalHazards,
            Others: mappings.othersGeoTechnicalHazards,
            mainComment: mappings.mainCommentGeoTechnicalHazards,
            comment: {
              "Slope failure, debris": mappings.slopeCommentGeoTechnicalHazards,
              "Ground movement, fissures":
                mappings.groundCommentGeoTechnicalHazards,
              Others: mappings.othersCommentGeoTechnicalHazards,
            },
          },
          estimatedBldgDmgPhotos: {
            percentage: mappings.estimatedDamagePercentage,
            images: [],
          },
          additionalPosting: {
            radioOptions: mappings.additionalPostingRadioOptions,
          },
          additionalUseAndEntry: {
            specify: mappings.additionalUseEntrySpecify,
          },
          additionalUseAndEntryFurtherAction: {
            barricade: mappings.additionalUseEntryActionBarricade,
            recommendation: mappings.additionalUseEntryActionRecommendation,
            specify: mappings.additionalUseEntrySpecify,
            mainComment: mappings.additionalUseEntryActionMainComment,
          },
        }));
        setDataLoaded(true);
      } else {
        console.error("No data found for the given inspection ID.");
      }
    } catch (error) {
      console.error("Error restoring data:", error);
      if (error.response) {
        console.error(
          `Error: ${error.response.status} - ${error.response.data}`
        );
      }
    }
  };

  useEffect(() => {
    if (dataLoaded) {
      tremorExportPdf({ formData });
      tremorExportDetailedPdf({ formData });
      setDataLoaded(false);
    }
  }, [dataLoaded, formData]);
  return (
    <div className="test-inspection-container">
      <input
        type="text"
        placeholder="Search by Building Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="scrollable-content">
        <table className="inspection-table">
          <thead>
            <tr>
              <th>Building Name</th>
              <th>Location</th>
              <th>Mark</th>
              <th>Inspected by</th>
              <th>Date Inspected</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((inspection) => (
                <tr key={inspection.id}>
                  <td data-label="Building Name">{inspection.building_name}</td>
                  <td data-label="Location">{inspection.building_location}</td>
                  <td data-label="Mark">
                    {inspection.postingRadio !== "RESTRICTED USE"
                      ? `${
                          inspection.postingRadio === "INSPECTED"
                            ? "SAFE"
                            : "UNSAFE"
                        }`
                      : `${inspection.postingRadio}: 
                ${
                  inspection.additional_posting_radio_options !==
                  "RESTRICTED USE"
                    ? `${
                        inspection.additional_posting_radio_options ===
                        "INSPECTED"
                          ? "SAFE"
                          : "UNSAFE"
                      }`
                    : `${inspection.additional_posting_radio_options}`
                }`}
                  </td>
                  <td data-label="Inspected by">
                    {inspection.firstname} {inspection.lastname} (
                    {inspection.inspector_id})
                  </td>
                  <td data-label="Date Inspected">
                    {inspection.date
                      ? dayjs(inspection.date).format("MM/DD/YYYY")
                      : "N/A"}
                  </td>
                  <td data-label="Actions">
                    <button
                      className="inspection-download-button"
                      onClick={async () => await handleRestore(inspection.id)}
                    >
                      Download
                    </button>
                    <button
                      className="inspection-view-button"
                      onClick={() => handleInspectionClick(inspection.id)}
                    >
                      Inspect
                    </button>
                    <button
                      className="inspection-delete-button"
                      onClick={() => handleDelete(inspection.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No inspection data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TremorInspectionList;
