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
const NonStructuralHazards = ({
  formData,
  onOthers,
  onChange,
  handleRadioChange,
}) => {
  const rowHeaders = [
    "Parapets, ornamentation",
    "Cladding, glazing",
    "Ceilings, light fixtures",
    "Interior walls, partitions",
    "Elevators",
    "Stairs, exits",
    "Electric, gas",
    "Others",
  ];
  const columns = ["Minor/None", "Moderate", "Severe"];
  const handleInputChange = (field) => (e) => {
    onOthers("nonStructuralHazards", field)(e);
  };

  const handleOthersSpecChange = (field) => (e) => {
    onChange("nonStructuralHazards", field)(e);
  };

  const [isOtherChecked, setIsOtherChecked] = useState(false);

  const handleCheckboxChange1 = (event) => {
    setIsOtherChecked(event.target.checked);
  };
  const [selectedValues, setSelectedValues] = useState(
    Object.fromEntries(rowHeaders.map((row) => [row, ""]))
  );

  const [checkedStates, setCheckedStates] = useState({});
  useEffect(() => {
    const initialCheckedStates = {};
    for (const row in formData.nonStructuralHazards.comment) {
      initialCheckedStates[row] = !!formData.nonStructuralHazards.comment[row]; // true if there's data
    }
    setCheckedStates(initialCheckedStates);
  }, [formData.nonStructuralHazards.comment]);
  const handleCheckboxChange = (row) => (event) => {
    setCheckedStates((prev) => ({
      ...prev,
      [row]: event.target.checked,
    }));
  };
  return (
    <div className="m-2">
      <TremorStepTitle name={"EVALUATION"} />

      <Typography sx={{ textDecoration: "underline", fontWeight: "bold" }}>
        NONSTRUCTURAL HAZARDS
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
                        value={formData.nonStructuralHazards.specify}
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
                          checked={
                            formData.nonStructuralHazards[row] === column
                          }
                          value={column}
                          onChange={handleRadioChange(row, column)}
                          name={row}
                        />
                      }
                    />
                    {column === "Severe" &&
                      formData.nonStructuralHazards[row] === "Severe" && (
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
                                  formData.nonStructuralHazards.comment[row] ||
                                  ""
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

export default NonStructuralHazards;
