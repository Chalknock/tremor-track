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
  handleInspectorClick,
} from "../utilities/handlers";
import { tremorExportPdf } from "../utilities/tremorExportPdf";
import TremorPostingAdditionalStepsModal from "./modal/posting/TremorPostingAdditionalStepsModal";
import TremorStepTitle from "./TremorStepTitle";
import { AdditionalPosting } from "../formSteps/AdditionalPostingEvalutaion/AdditionalPosting";
import { AdditionalUseAndEntryEvaluation } from "../formSteps/AdditionalPostingEvalutaion/AdditionalUseAndEntryEvaluation";
import { AdditionalFurtherAction } from "../formSteps/AdditionalPostingEvalutaion/AdditionalFurtherAction";
import { useParams } from "react-router-dom";
import { useInspection } from "./provider/InspectionProvider";
import TremorInspectorList from "./TremorInspectorList";

const Multiform = () => {
  // const abs = useParams();
  const { inspectionId, setInspectionId } = useInspection();
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

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStep([
      <TremorInspectorList
        formData={formData}
        handleInspectorClick={handleInspectorClick(setFormData)}
      />,
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

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "https://tremor.chalknock.online/api/inspections",
        formData
      );
      console.log("Response from backend:dasdas", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleInsertData = async (e) => {
    try {
      const response = await axios.post(
        "https://tremor.chalknock.online/api/inspections",
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

      console.log("LAST STEP DONE");
      console.log(formData);
      handleInsertData();
    } else {
      // next();
      // console.log("formData");
      // setStepIndex(currentStepIndex);
      if (currentStepIndex + 2 === 9) {
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
        currentStepIndex + 2 > 10 &&
        formData.posting.radioOptions != "RESTRICTED USE"
      ) {
        console.log("final of rapid");
        handleSubmit();
        handleInsertData();
      } else if (currentStepIndex + 2 === 11) {
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
      {currentStepIndex + 1 <= 11 ? (
        <div>
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
          paddingTop={3}
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
            {!isFirstStep && (
              <button
                className="btn btn-primary"
                type="submit"
                aria-label={isLastStep ? "Finish" : "Next"}
              >
                {isLastStep ? "Finish" : "Next"}
              </button>
            )}
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
