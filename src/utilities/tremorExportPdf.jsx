import jsPDF from "jspdf";
import React from "react";

export const tremorExportPdf = ({ formData }) => {
  // Correct the instantiation of jsPDF
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm", // Use mm for A4 dimensions
    format: "a4", // Set format to A4
  });

  // Prepare the text to be displayed
  const textLines = [
    `Building Name: ${formData.inspection.buildingName}`,
    `Latitude: ${formData.inspection.lat}`,
    `Longitude: ${formData.inspection.lon}`,
    `Date: ${formData.inspection.date}`,
    `Time: ${formData.inspection.hour}:${formData.inspection.minute} ${formData.inspection.period}`,
    `Area Inspected: ${formData.inspection.areaInspected}`,
  ];

  // Center the first line
  const firstLine = textLines[0];
  const firstLineWidth = doc.getTextWidth(firstLine);
  const pageWidth = doc.internal.pageSize.getWidth();
  const xCenter = (pageWidth - firstLineWidth) / 2;

  // Add the first line
  doc.text(firstLine, xCenter, 10); // Centered at the top

  // Add remaining lines with left alignment
  textLines.slice(1).forEach((line, index) => {
    doc.text(line, 10, 20 + index * 10); // Adjust Y position for each line
  });

  // Save the PDF
  doc.save("inspection_report.pdf");
};
