import React, { useEffect, useState } from "react";
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
const StructuralHazards = ({
  formData,
  onOthers,
  onChange,
  handleRadioChange,
}) => {
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
  const handleInputChangeold = (field) => (e) => {
    onChange(field)(e);
  };
  const handleInputChange = (field) => (e) => {
    onOthers("structuralHazards", field)(e);
  };

  const handleOthersSpecChange = (field) => (e) => {
    onChange("structuralHazards", field)(e);
  };

  const [isOtherChecked, setIsOtherChecked] = useState(false);

  const handleCheckboxChange1 = (event) => {
    setIsOtherChecked(event.target.checked);
  };
  const [selectedValues, setSelectedValues] = useState(
    Object.fromEntries(rowHeaders.map((row) => [row, ""]))
  );

  const [checkedStates, setCheckedStates] = useState({});

  // Effect to initialize checked states based on formData
  useEffect(() => {
    const initialCheckedStates = {};
    for (const row in formData.structuralHazards.comment) {
      initialCheckedStates[row] = !!formData.structuralHazards.comment[row]; // true if there's data
    }
    setCheckedStates(initialCheckedStates);
  }, [formData.structuralHazards.comment]);

  const handleCheckboxChange = (row) => (event) => {
    setCheckedStates((prev) => ({
      ...prev,
      [row]: event.target.checked,
    }));
  };
  return (
    // <div className="mb-4">
    <div className="m-2">
      <TremorStepTitle name={"EVALUATION"} />

      <Typography
        sx={{ textDecoration: "underline", fontWeight: "bold" }}
        className="mb-0 pb-0"
      >
        STRUCTURAL HAZARDS
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
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
                      style={{ display: "block", alignItems: "center" }}
                      className="row"
                    >
                      <span className="mb-2">{row}</span>
                      <TextField
                        style={{
                          marginLeft: "8px",
                          flex: 1,
                          marginTop: "10px",
                        }}
                        label="Specify"
                        variant="outlined"
                        value={formData.structuralHazards.specify}
                        onChange={handleInputChange("specify")}
                      />
                    </div>
                  ) : (
                    row
                  )}
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={`${row}-${column}`} align="center">
                    <FormControlLabel
                      control={
                        <Radio
                          checked={formData.structuralHazards[row] === column}
                          value={column}
                          onChange={handleRadioChange(row, column)}
                          name={row}
                        />
                      }
                    />
                    {column === "Severe" &&
                      formData.structuralHazards[row] === "Severe" && (
                        <div className="d-flex row justify-content-center align-items-center">
                          <FormControlLabel
                            className="row"
                            control={
                              <Checkbox
                                className="d-none"
                                checked={checkedStates[row] || false}
                                onChange={handleCheckboxChange(row)}
                              />
                            }
                            label="Add comment"
                          />
                          {checkedStates[row] && (
                            <div className="mt-2">
                              <TextField
                                name="typeOfConstructionRadioSpecify"
                                fullWidth
                                label="Specify"
                                variant="outlined"
                                required
                                value={
                                  formData.structuralHazards.comment[row] || ""
                                }
                                multiline
                                onChange={handleOthersSpecChange(row)}
                              />
                            </div>
                          )}
                        </div>
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
