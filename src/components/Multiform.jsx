import { FormEvent, useState } from "react";
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
const Multiform = () => {
  const [formData, setFormData] = useState({
    inspection: {
      buildingName: "",
      lat: "",
      lon: "",
      date: null,
      time: null,
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
  });

  const handleChange = (section, field) => (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value || "",
      },
    }));
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      inspection: {
        ...prevData.inspection,
        areaInspected: value || "",
      },
    }));
  };

  const handleRadioChangePosting = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      posting: {
        ...prevData.posting,
        radioOptions: value || "",
      },
    }));
  };

  const handleMultipleRadioChangeTypeofConstruction = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      typeofConstruction: {
        ...prevData.typeofConstruction,
        radioOptions: value || "",
      },
    }));
  };

  const handleMultipleRadioChangePrimaryOccupancy = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      primaryOccupancy: {
        ...prevData.primaryOccupancy,
        radioOptions: value || "",
      },
    }));
  };
  const handleMultipleRadioChangeEvaluation = (row, column) => (event) => {
    setFormData((prev) => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        [row]: event.target.value,
      },
    }));
  };
  const handleMultipleRadioChangeestimatedBldgDmg = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      estimatedBldgDmg: {
        ...prevData.estimatedBldgDmg,
        radioOptions: value || "",
      },
    }));
  };
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      inspection: {
        ...prevData.inspection,
        date: date,
      },
    }));
  };

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStep([
      <InspectionForm
        formData={formData}
        onChange={handleChange}
        handleRadioChange={handleRadioChange}
        handleDateChange={handleDateChange}
      />,
      <BuildingDescription formData={formData} onChange={handleChange} />,
      <TypeofConstruction
        formData={formData}
        onChange={handleChange}
        handleRadioChange={handleMultipleRadioChangeTypeofConstruction}
      />,
      <PrimaryOccupancy
        formData={formData}
        onChange={handleChange}
        handleRadioChange={handleMultipleRadioChangePrimaryOccupancy}
      />,
      <Evaluation
        formData={formData}
        onChange={handleChange}
        handleRadioChange={handleMultipleRadioChangeEvaluation}
      />,
      <EstimatedBldgDmg
        formData={formData}
        onChange={handleChange}
        handleRadioChange={handleMultipleRadioChangeestimatedBldgDmg}
      />,
      <Posting
        formData={formData}
        onChange={handleChange}
        handleRadioChange={handleRadioChangePosting}
      />,
      <UseAndEntry formData={formData} onChange={handleChange} />,
      <UseAndEntryFurtherAction
        formData={formData}
        onChange={handleChange}
        handleRadioChange={handleMultipleRadioChangeTypeofConstruction}
      />,
      <OverAllHazards
        formData={formData}
        onChange={handleChange}
        handleRadioChange={handleMultipleRadioChangeEvaluation}
      />,
      <StructuralHazards
        formData={formData}
        onChange={handleChange}
        handleRadioChange={handleMultipleRadioChangeEvaluation}
      />,
      <NonStructuralHazards
        formData={formData}
        onChange={handleChange}
        handleRadioChange={handleMultipleRadioChangeEvaluation}
      />,
      <GeoTechnicalHazards
        formData={formData}
        onChange={handleChange}
        handleRadioChange={handleMultipleRadioChangeEvaluation}
      />,
      <EstimatedBldgDmgPhotos />,
    ]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isLastStep) {
      alert("Successful Account Creation");

      console.log(formData);
    } else {
      next();
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit} className="multi-step-form">
        {step}
        <div className="navigation-buttons">
          {!isFirstStep && (
            <button type="button" onClick={back} aria-label="Go back">
              Back
            </button>
          )}
          <div className="step-info">
            {currentStepIndex + 1} of {steps.length}
          </div>
          <button type="submit" aria-label={isLastStep ? "Finish" : "Next"}>
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Multiform;
