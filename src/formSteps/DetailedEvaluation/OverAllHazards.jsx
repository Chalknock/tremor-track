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

const OverAllHazards = ({ formData, onChange, handleRadioChange }) => {
  const rowHeaders = [
    "Collapse or partial collapse",
    "Building  or story leaning",
    "Others",
  ];
  const columns = ["Minor/None", "Moderate", "Severe"];
  const handleInputChange = (field) => (e) => {
    onChange(field)(e);
  };

  const handleChange = (row, column) => (event) => {
    setSelectedValues((prev) => ({
      ...prev,
      [row]: event.target.value,
    }));
    handleRadioChange(row, column)(event);
  };

  const handleOthersSpecChange = (field) => (e) => {
    onChange("overAllHazards", field)(e);
  };

  const [isOtherChecked, setIsOtherChecked] = useState(false);

  const handleCheckboxChange1 = (event) => {
    setIsOtherChecked(event.target.checked);
  };
  const [selectedValues, setSelectedValues] = useState(
    Object.fromEntries(rowHeaders.map((row) => [row, ""]))
  );

  const [checkedStates, setCheckedStates] = useState({});

  const handleCheckboxChange = (row) => (event) => {
    setCheckedStates((prev) => ({
      ...prev,
      [row]: event.target.checked,
    }));
  };
  return (
    <div>
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
                  {row}
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={`${row}-${column}`} align="center">
                    <FormControlLabel
                      control={
                        <Radio
                          checked={formData.overAllHazards[row] === column}
                          value={column}
                          onChange={handleRadioChange(row, column)}
                          name={row}
                        />
                      }
                      label={column}
                    />
                    {column === "Severe" && (
                      <>
                        <FormControlLabel
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
                              value={formData.overAllHazards.comment[row] || ""}
                              onChange={handleOthersSpecChange(row)}
                            />
                          </div>
                        )}
                      </>
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

export default OverAllHazards;
