import React from "react";

export const radioButtonHandlers = (row, column) => (event) => {
  setSelectedValues((prev) => ({
    ...prev,
    [row]: event.target.value,
  }));
};
