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
      date: "",
      time: "",
      areaInspected: "",
    },
    buildingDescription: {
      contact: "",
    },
  });

  const handleChange1 = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

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
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStep([
      <InspectionForm
        formData={formData}
        onChange={handleChange}
        handleRadioChange={handleRadioChange}
      />,
      <BuildingDescription formData={formData} onChange={handleChange} />,
      <TypeofConstruction />,
      <PrimaryOccupancy />,
      <Evaluation />,
      <EstimatedBldgDmg />,
      <Posting />,
      <UseAndEntry />,
      <UseAndEntryFurtherAction />,
      <OverAllHazards />,
      <StructuralHazards />,
      <NonStructuralHazards />,
      <GeoTechnicalHazards />,
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
