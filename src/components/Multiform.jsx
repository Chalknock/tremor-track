import { FormEvent, useState } from "react";
import { useMultiStep } from "../utilities/useMultiStep";
import InspectionForm from "../formSteps/InspectionForm";
import BuildingDescription from "../formSteps/BuildingDescription";
import TypeofConstruction from "../formSteps/TypeofConstruction";
import PrimaryOccupancy from "../formSteps/PrimaryOccupancy";

const INITIAL_DATA = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
};

const Multiform = () => {
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStep([
      <InspectionForm />,
      <BuildingDescription />,
      <TypeofConstruction />,
      <PrimaryOccupancy />,
    ]);

  function onSubmit(e) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Successful Account Creation");
  }
  return (
    <div
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "2rem auto",
        borderRadius: ".5rem",
        maxWidth: "50%",
        maxHeight: "90vh",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column", // Ensure the form content is arranged in a column
          height: "100%", // Full height of the container
        }}
      >
        {step}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {!isFirstStep && (
              <button type="button" onClick={back}>
                Back
              </button>
            )}

            <div
              style={{
                flex: 1,
                textAlign: "center",
                marginLeft: !isFirstStep ? "1rem" : "0",
                marginRight: "1rem",
              }}
            >
              {currentStepIndex + 1} of {steps.length}
            </div>

            <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Multiform;
