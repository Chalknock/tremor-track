export const handleChange = (setFormData) => (section, field) => (e) => {
  const { value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [section]: {
      ...prevData[section],
      [field]: value || "",
    },
  }));
};

export const handleCommentChange = (setFormData) => (section, row) => (e) => {
  const { value } = e.target;

  setFormData((prevData) => ({
    ...prevData,
    [section]: {
      ...prevData[section],
      comment: {
        ...prevData[section].comment, // Spread the existing comments
        [row]: value || "", // Update the specific row comment
      },
    },
  }));
};

export const updateCoordinates = (setFormData) => (lat, lon) => {
  setFormData((prevData) => ({
    ...prevData,
    inspection: {
      ...prevData.inspection,
      lat,
      lon,
    },
  }));
};
export const handleRadioChange = (setFormData) => (e) => {
  const { value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    inspection: {
      ...prevData.inspection,
      areaInspected: value || "",
    },
  }));
};

export const handleRadioChangePosting = (setFormData) => (e) => {
  const { value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    posting: {
      ...prevData.posting,
      radioOptions: value || "",
    },
  }));
};

export const handleMultipleRadioChangeTypeofConstruction =
  (setFormData) => (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      typeofConstruction: {
        ...prevData.typeofConstruction,
        radioOptions: value || "",
      },
    }));
  };

export const handleMultipleRadioChangePrimaryOccupancy =
  (setFormData) => (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      primaryOccupancy: {
        ...prevData.primaryOccupancy,
        radioOptions: value || "",
      },
    }));
  };
export const handleMultipleRadioChangeEvaluation =
  (setFormData) => (row, column) => (event) => {
    setFormData((prev) => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        [row]: event.target.value,
      },
    }));
  };
export const handleMultipleRadioChangeOverAllHazards =
  (setFormData) => (row, column) => (event) => {
    console.log(row);
    setFormData((prev) => ({
      ...prev,
      overAllHazards: {
        ...prev.overAllHazards,
        [row]: event.target.value,
      },
    }));
  };
export const handleMultipleRadioChangeStructuralHazards =
  (setFormData) => (row, column) => (event) => {
    console.log(row);
    setFormData((prev) => ({
      ...prev,
      structuralHazards: {
        ...prev.structuralHazards,
        [row]: event.target.value,
      },
    }));
  };
export const handleMultipleRadioChangeNonStructuralHazards =
  (setFormData) => (row, column) => (event) => {
    console.log(row);
    setFormData((prev) => ({
      ...prev,
      nonStructuralHazards: {
        ...prev.nonStructuralHazards,
        [row]: event.target.value,
      },
    }));
  };
export const handleMultipleRadioChangeGeoTechnicalHazards =
  (setFormData) => (row, column) => (event) => {
    console.log(row);
    setFormData((prev) => ({
      ...prev,
      geoTechnicalHazards: {
        ...prev.geoTechnicalHazards,
        [row]: event.target.value,
      },
    }));
  };
export const handleMultipleRadioChangeUseAndEntryFurtherAction =
  (setFormData) => (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      useAndEntryFurtherAction: {
        ...prevData.useAndEntryFurtherAction,
        radioOptions: value || "",
      },
    }));
  };
export const handleMultipleRadioChangeestimatedBldgDmg =
  (setFormData) => (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      estimatedBldgDmg: {
        ...prevData.estimatedBldgDmg,
        radioOptions: value || "",
      },
    }));
  };
export const handleDateChange = (setFormData) => (date) => {
  const selectedDate = new Date(date);
  const monthName = selectedDate.toLocaleString("default", { month: "long" });
  const hours24 = selectedDate.getHours();
  const hours12 = hours24 % 12 || 12; // Converts 0 to 12 for midnight
  const isAM = hours24 < 12;
  setFormData((prevData) => ({
    ...prevData,
    inspection: {
      ...prevData.inspection,
      date: date,
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1,
      monthName: monthName,
      day: selectedDate.getDate(),
      minute: selectedDate.getMinutes(),
      hour: hours12,
      period: isAM ? "AM" : "PM", // Store AM/PM period
    },
  }));
};
// export const handleDateChange = (setFormData) => (date) => {
//   setFormData((prevData) => ({
//     ...prevData,
//     inspection: {
//       ...prevData.inspection,
//       date: date,
//     },
//   }));
// };
