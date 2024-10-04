import { FormEvent, useEffect, useState } from "react";
import { useMultiStep } from "../utilities/useMultiStep";
import InspectionForm from "../formSteps/RapidEvaluation/InspectionForm";
import BuildingDescription from "../formSteps/RapidEvaluation/BuildingDescription";
import TypeofConstruction from "../formSteps/RapidEvaluation/TypeofConstruction";
import PrimaryOccupancy from "../formSteps/RapidEvaluation/PrimaryOccupancy";
import Evaluation from "../formSteps/RapidEvaluation/Evaluation";
import EstimatedBldgDmg from "../formSteps/RapidEvaluation/EstimatedBldgDmg";
import Posting from "../formSteps/RapidEvaluation/Posting";
import UseAndEntry from "../formSteps/RapidEvaluation/UseAndEntry";
import UseAndEntryFurtherAction from "../formSteps/RapidEvaluation/UseAndEntryFurtherAction";
import OverAllHazards from "../formSteps/DetailedEvaluation/OverAllHazards";
import StructuralHazards from "../formSteps/DetailedEvaluation/StructuralHazards";
import NonStructuralHazards from "../formSteps/DetailedEvaluation/NonStructuralHazards";
import GeoTechnicalHazards from "../formSteps/DetailedEvaluation/GeoTechnicalHazards";
import EstimatedBldgDmgPhotos from "../formSteps/DetailedEvaluation/EstimatedBldgDmgPhotos";
import "../assets/css/multiStepForm.css";
import jsPDF from "jspdf";
import TremorInspectedModal from "./modal/posting/TremorInspectedModal";

import axios from "axios";
import dayjs from "dayjs";

import {
  handleChange,
  handleCommentChange,
  updateCoordinates,
  handleRadioChange,
  handleRadioChangePosting,
  handleMultipleRadioChangeTypeofConstruction,
  handleMultipleRadioChangePrimaryOccupancy,
  handleMultipleRadioChangeEvaluation,
  handleMultipleRadioChangeestimatedBldgDmg,
  handleDateChange,
  handleMultipleRadioChangeStructuralHazards,
  handleMultipleRadioChangeOverAllHazards,
  handleMultipleRadioChangeNonStructuralHazards,
  handleMultipleRadioChangeGeoTechnicalHazards,
  handleMultipleRadioChangeUseAndEntryFurtherAction,
  handleRadioChangeAdditionalPosting,
  handleMultipleRadioChangeAdditionalUseAndEntryFurtherAction,
} from "../utilities/handlers";
import { tremorExportPdf } from "../utilities/tremorExportPdf";
import TremorPostingAdditionalStepsModal from "./modal/posting/TremorPostingAdditionalStepsModal";
import TremorStepTitle from "./TremorStepTitle";
import { AdditionalPosting } from "../formSteps/AdditionalPostingEvalutaion/AdditionalPosting";
import { AdditionalUseAndEntryEvaluation } from "../formSteps/AdditionalPostingEvalutaion/AdditionalUseAndEntryEvaluation";
import { AdditionalFurtherAction } from "../formSteps/AdditionalPostingEvalutaion/AdditionalFurtherAction";

const Multiform = ({ setStepIndex }) => {
  const [formData, setFormData] = useState({
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

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStep([
      <InspectionForm
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleRadioChange(setFormData)}
        handleDateChange={handleDateChange(setFormData)}
        updateCoordinates={updateCoordinates(setFormData)}
      />,
      <BuildingDescription
        formData={formData}
        onChange={handleChange(setFormData)}
      />,
      <TypeofConstruction
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeTypeofConstruction(
          setFormData
        )}
      />,
      <PrimaryOccupancy
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangePrimaryOccupancy(
          setFormData
        )}
      />,
      <Evaluation
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeEvaluation(setFormData)}
      />,
      <EstimatedBldgDmg
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeestimatedBldgDmg(
          setFormData
        )}
      />,
      <Posting
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleRadioChangePosting(setFormData)}
      />,
      <UseAndEntry formData={formData} onChange={handleChange(setFormData)} />,
      <UseAndEntryFurtherAction
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeUseAndEntryFurtherAction(
          setFormData
        )}
      />,
      <OverAllHazards
        formData={formData}
        onOthers={handleChange(setFormData)}
        onChange={handleCommentChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeOverAllHazards(setFormData)}
      />,
      <StructuralHazards
        formData={formData}
        onOthers={handleChange(setFormData)}
        onChange={handleCommentChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeStructuralHazards(
          setFormData
        )}
      />,
      <NonStructuralHazards
        formData={formData}
        onOthers={handleChange(setFormData)}
        onChange={handleCommentChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeNonStructuralHazards(
          setFormData
        )}
      />,
      <GeoTechnicalHazards
        formData={formData}
        onOthers={handleChange(setFormData)}
        onChange={handleCommentChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeGeoTechnicalHazards(
          setFormData
        )}
      />,
      <EstimatedBldgDmgPhotos
        formData={formData}
        onChange={handleChange(setFormData)}
      />,
      <AdditionalPosting
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleRadioChangeAdditionalPosting(setFormData)}
      />,
      <AdditionalUseAndEntryEvaluation
        formData={formData}
        onChange={handleChange(setFormData)}
      />,
      <AdditionalFurtherAction
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeAdditionalUseAndEntryFurtherAction(
          setFormData
        )}
      />,
    ]);
  const [confirmOpenOptional, setConfirmOpenOptional] = useState(false);
  const [postingOptionalmessage, setPostingOptionalmessage] = useState("");
  const [postingOptionaltitle, setPostingOptionaltitle] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let didRun = false;

    if (!didRun) {
      // Your effect logic here

      handleRestore(99);
      didRun = true;
    }

    return () => {
      didRun = false;
    };
  }, []);
  const handleRestore = async (inspectionId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/inspections/${inspectionId}`
      );

      console.log(response);
      const [restoredData] = response.data;
      // console.log(Object.keys(restoredData));

      if (restoredData) {
        // Update the formData state with restored data
        const mappings = {
          buildingLocation: restoredData.building_location || "",
          lat: restoredData.latitude || null,
          lon: restoredData.longitude || null,
          buildingName: restoredData.building_name || "",
          date: restoredData.date ? dayjs(restoredData.date) : null,
          areaInspected: restoredData.area_inspected || "",
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
          inspection: {
            ...prevFormData.inspection,
            ...mappings,
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
          // You can map additional fields here as necessary
        }));
      } else {
        console.error("No data found for the given inspection ID.");
      }
    } catch (error) {
      console.error("Error restoring data:", error);
      if (error.response) {
        // Handle specific HTTP error statuses
        console.error(
          `Error: ${error.response.status} - ${error.response.data}`
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/data",
        formData
      );
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleInsertData = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/inspections",
        formData
      );
      console.log("Response from backend:", response.data);
      if (response.data.message === "Data inserted successfully") {
        alert("Data inserted successfully");
      } else {
        alert("tukmol");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isLastStep) {
      alert("Successful Account Creation");

      // tremorExportPdf({ formData });
      console.log("LAST STEP DONE");
      console.log(formData);
      handleInsertData();
    } else {
      // next();
      // console.log("formData");
      // setStepIndex(currentStepIndex);
      if (currentStepIndex + 2 === 8) {
        let postingRadioState = formData.posting.radioOptions;
        switch (postingRadioState) {
          case "INSPECTED":
            setConfirmOpen(true);
            setTitle("BUILDING IS MARKED AS SAFE");
            setMessage(
              "There is no longer a requirement to complete the subsequent pages.Tap Continue to save inspection"
            );
            break;
          case "RESTRICTED USE":
            next();
            break;
          case "UNSAFE":
            next();
            break;
        }
      } else if (
        currentStepIndex + 2 > 9 &&
        formData.posting.radioOptions != "RESTRICTED USE"
      ) {
        console.log("final of rapid");
        handleSubmit();
        handleInsertData();
      } else if (currentStepIndex + 2 === 10) {
        let postingRadioState = formData.posting.radioOptions;
        switch (postingRadioState) {
          case "RESTRICTED USE":
            next();
            break;
          case "UNSAFE":
            setConfirmOpenOptional(true);
            setPostingOptionaltitle("BUILDING IS MARKED AS UNSAFE");
            setPostingOptionalmessage(
              "There is no longer a requirement to complete the subsequent pages.Tap Continue to save inspection"
            );
            next();
            break;
        }
      } else {
        console.log(formData);
        next();
      }
    }
  };

  return (
    <>
      {currentStepIndex + 1 <= 10 ? (
        <div
          style={
            {
              // position: "fixed",
              // top: "70px",
              // left: "265px",
              // right: "25px",
              // zIndex: 1000,
            }
          }
        >
          <TremorStepTitle
            name={"ATC 20 RAPID EVALUATION SAFETY ASSESSMENT FORM"}
            background="var(--bs-primary)"
            color="white"
            paddingTop={3}
          />
        </div>
      ) : (
        <TremorStepTitle
          name={"ATC 20 DETAILED EVALUATION SAFETY ASSESSMENT FORM"}
          background="var(--bs-primary)"
          color="white"
        />
      )}
      <div className="form-container">
        <form onSubmit={onSubmit} className="multi-step-form">
          {step}
          <div className="navigation-buttons">
            {!isFirstStep && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={back}
                aria-label="Go back"
              >
                Back
              </button>
            )}
            <div className="step-info">
              {currentStepIndex + 1} of {steps.length}
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              aria-label={isLastStep ? "Finish" : "Next"}
            >
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
        {confirmOpen && (
          <TremorInspectedModal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={() => {
              // Handle confirmation logic
              setConfirmOpen(false);
              next();
            }}
            onSave={() => {
              tremorExportPdf({ formData });
            }}
            message={message}
            title={title}
          />
        )}
        {confirmOpenOptional && (
          <TremorPostingAdditionalStepsModal
            open={confirmOpenOptional}
            onClose={() => setConfirmOpenOptional(false)}
            onConfirm={() => {
              // Handle confirmation logic
              setConfirmOpenOptional(false);
              next();
            }}
            onSave={() => {
              tremorExportPdf({ formData });
            }}
            message={postingOptionalmessage}
            title={postingOptionaltitle}
          />
        )}
      </div>
    </>
  );
};

export default Multiform;
