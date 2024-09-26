import React, { useState } from "react";
import TremorStepTitle from "../../components/TremorStepTitle";
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TremorFormLabel from "../../components/TremorFormLabel";
const StructuralHazards = ({ formData, onChange, handleRadioChange }) => {
  const rowHeaders = [
    "Foundations",
    "Roofs, floors (vertical loads)",
    "Columns, pilasters, corbels",
    "Diaphragms, horizontal bracing",
    "Walls, vertical bracing",
    "Precast connections",
    "Others",
  ];
  const columns = ["Minor/None", "Moderate", "Severe"];
  const handleInputChange = (field) => (e) => {
    onChange(field)(e);
  };

  const handleOthersSpecChange = (field) => (e) => {
    onChange("structuralHazards", field)(e);
  };

  const [isOtherChecked, setIsOtherChecked] = useState(false);

  const handleCheckboxChange1 = (event) => {
    setIsOtherChecked(event.target.checked);
  };

  const [checkedStates, setCheckedStates] = useState({});

  const handleCheckboxChange = (row) => (event) => {
    setCheckedStates((prev) => ({
      ...prev,
      [row]: event.target.checked,
    }));
  };
  return (
    <div className="mb-4">
      <TremorStepTitle name={"EVALUATION"} />

      <TremorFormLabel
        label={
          "Investigate the building for the conditions below and click on the appropriate column."
        }
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {columns.map((column) => (
                <TableCell key={column} align="center">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowHeaders.map((row) => (
              <TableRow key={row}>
                <TableCell component="th" scope="row">
                  {row === "Others" ? (
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      className="row"
                    >
                      <span className="mb-2">{row}</span>
                      <TextField
                        style={{
                          marginLeft: "8px",
                          flex: 1,
                        }}
                        label="Specify"
                        variant="outlined"
                        value={formData.structuralHazards.specify}
                        onChange={handleOthersSpecChange("specify")}
                      />
                    </div>
                  ) : (
                    row
                  )}
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={`${row}-${column}`} align="center">
                    {column === "Severe" ? (
                      <>
                        <FormControlLabel
                          control={
                            <Radio
                              checked={
                                formData.structuralHazards[row] === column
                              }
                              value={column}
                              onChange={handleRadioChange(row, column)}
                              name={row}
                            />
                          }
                          label=""
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              className="d-none"
                              checked={checkedStates[row] || false}
                              onChange={handleCheckboxChange(row)}
                            />
                          }
                          label="Add comment "
                        />
                        {isOtherChecked && (
                          <div className="col mt-2 ps-4">
                            <TextField
                              name="typeOfConstructionRadioSpecify"
                              fullWidth
                              label="Specify"
                              variant="outlined"
                              required
                              value={formData.structuralHazards.specify || ""}
                              onChange={handleInputChange("specify")}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <FormControlLabel
                        control={
                          <Radio
                            checked={formData.structuralHazards[row] === column}
                            value={column}
                            onChange={handleRadioChange(row, column)}
                            name={row}
                          />
                        }
                        label=""
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StructuralHazards;
