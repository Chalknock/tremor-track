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
const GeoTechnicalHazards = ({ formData, onChange, handleRadioChange }) => {
  const rowHeaders = [
    "Slope failure, debris",
    "Ground movement, fissures",
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

  const [isOtherChecked, setIsOtherChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsOtherChecked(event.target.checked);
  };
  return (
    <div>
      <TremorStepTitle name={"EVALUATION"} />
      <Typography>GEOTECHNICAL HAZARDS</Typography>
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
                    {column === "Severe" ? (
                      <>
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
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isOtherChecked}
                              onChange={handleCheckboxChange}
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
                              value={formData.typeofConstruction.specify || ""}
                              onChange={handleInputChange("specify")}
                            />
                          </div>
                        )}
                      </>
                    ) : (
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
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="row mx-2">
        <TextField
          id="outlined-multiline-flexible"
          label="Comment"
          name="buildingDamageComment"
          multiline
          maxRows={10}
          style={{ marginTop: "20px" }}
          // value={formData.estimatedBldgDmg.comment || ""}
          // onChange={handleInputChange("comment")}
        />
      </div>
    </div>
  );
};

export default GeoTechnicalHazards;
