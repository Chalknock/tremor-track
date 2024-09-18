import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TremorStepTitle from "../../components/TremorStepTitle";

const Evaluation = ({ formData, onChange, handleRadioChange }) => {
  const rowHeaders = [
    "Collapse, partial collapse, or building off foundation",
    "Building  or story leaning",
    "Racking damage to walls, other structural damage",
    "Chimney, parapet, or other falling hazards",
    "Ground slope movement or cracking ",
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
    onChange("evaluation", field)(e);
  };

  return (
    <div>
      <TremorStepTitle name={"EVALUATION"} />
      <Typography>
        {" "}
        Investigate the building for the conditions below and click on the
        appropriate column.{" "}
      </Typography>
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
                        value={formData.evaluation.specify}
                        onChange={handleOthersSpecChange("specify")}
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
                          checked={formData.evaluation[row] === column}
                          value={column}
                          onChange={handleRadioChange(row, column)}
                          name={row}
                        />
                      }
                      label=""
                    />
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

export default Evaluation;
