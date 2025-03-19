import React, { useState } from "react";
import axios from "axios";
import "../assets/css/inspectorForm.css"; // Import the CSS file

const InspectorForm = () => {
  const [inspectors, setInspectors] = useState([
    { firstname: "", lastname: "", affiliation: "", inspectorsId: "" },
  ]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newInspectors = [...inspectors];
    newInspectors[index][name] = value;
    setInspectors(newInspectors);
  };

  const handleAddInspector = () => {
    setInspectors([
      ...inspectors,
      { firstname: "", lastname: "", affiliation: "", inspectorsId: "" },
    ]);
  };

  const handleRemoveInspector = (index) => {
    if (inspectors.length > 1) {
      // Ensure at least one inspector remains
      const newInspectors = inspectors.filter((_, i) => i !== index);
      setInspectors(newInspectors);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Simple validation
      const isEmpty = inspectors.some(
        (inspector) =>
          !inspector.firstname ||
          !inspector.lastname ||
          !inspector.affiliation ||
          !inspector.inspectorsId
      );
      if (isEmpty) {
        alert("Please fill out all fields.");
        return;
      }

      await Promise.all(
        inspectors.map(async (inspector) => {
          await axios.post("https://localhost/api/inspectors", inspector);
        })
      );

      alert("Inspectors added successfully!");
      setInspectors([
        { firstname: "", lastname: "", affiliation: "", inspectorsId: "" },
      ]); // Reset form with one inspector
    } catch (error) {
      console.error("Error adding inspectors:", error);
      alert("An error occurred while adding inspectors.");
    }
  };

  return (
    <div className="inspector-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Create Profile</h2>
        {inspectors.map((inspector, index) => (
          <div key={index} className="inspector-input-group">
            <input
              type="text"
              name="firstname"
              value={inspector.firstname}
              placeholder="First Name"
              onChange={(event) => handleChange(index, event)}
              required
              className="text-input"
            />
            <input
              type="text"
              name="lastname"
              value={inspector.lastname}
              placeholder="Last Name"
              onChange={(event) => handleChange(index, event)}
              required
              className="text-input"
            />
            <input
              type="text"
              name="affiliation"
              value={inspector.affiliation}
              placeholder="Affiliation"
              onChange={(event) => handleChange(index, event)}
              required
              className="text-input"
            />
            <input
              type="text"
              name="inspectorsId"
              value={inspector.inspectorsId}
              placeholder="Inspector ID"
              onChange={(event) => handleChange(index, event)}
              required
              className="text-input"
            />
            {inspectors.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveInspector(index)}
                className="remove-button"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddInspector}
          className="add-button"
        >
          Add Inspector
        </button>
        <button type="submit" className="submit-button">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default InspectorForm;
