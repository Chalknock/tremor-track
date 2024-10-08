import jsPDF from "jspdf";
import React from "react";

export const tremorExportPlacard = ({ formData }) => {
  // Create an instance of jsPDF
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // Set the background color (e.g., green)
  doc.setFillColor(50, 205, 50); // RGB for green color
  doc.rect(
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight(),
    "F"
  ); // Draw filled rectangle

  // Define the margins
  const leftMargin = 20; // Left margin
  const rightMargin = 20; // Right margin
  const topMargin = 30; // Top margin
  const bottomMargin = 20; // Bottom margin

  // Define text lines
  const textLines = [`INSPECTED`, `LAWFUL OCCUPANCY PERMITTED`];

  // Define different font sizes for each line
  const fontSizes = [50, 30];

  // Set font to bold
  doc.setFont("helvetica", "bold");

  // Page width adjusted for margins
  const pageWidth = doc.internal.pageSize.getWidth();
  const availableWidth = pageWidth - leftMargin - rightMargin;

  // Add the text lines with adjusted font size and center alignment within margins
  textLines.forEach((line, index) => {
    doc.setFontSize(fontSizes[index]); // Set the font size for the current line
    const textWidth = doc.getTextWidth(line);
    const xCenter = (availableWidth - textWidth) / 2 + leftMargin; // Center text within margins
    const yPosition = topMargin + index * 15; // Adjust Y position for each line based on index
    doc.text(line, xCenter, yPosition); // Draw the text
  });

  // Add two columns below the main heading
  const columnTextLeft = [
    `This structure has been inspected (as indicated below) and no \
    apparent structural hazard has been found`,
    `Inspected Exterior Only`,
    `Inspected Exterior and Interior`,
    `Report any unsafe condition to local authorities; reinspection may be required`,
    `Inpector Comments:`,
    `Facility Name and Address:`,
  ];

  const columnTextRight = [
    `Column 2, Line 1`,
    `Column 2, Line 2`,
    `Column 2, Line 3`,
  ];

  doc.setFontSize(18); // Set the font size for the current line

  // Define starting Y position for the columns (below the header text)
  const columnTopMargin = topMargin + 30; // Adjust this based on the space you need between the heading and columns
  const columnGap = 20; // Space between the two columns

  // Calculate column widths and positions
  const columnWidth = (availableWidth - columnGap) / 2; // Split the available space for two columns
  const columnLeftX = leftMargin; // X position for the left column
  const columnRightX = leftMargin + columnWidth + columnGap; // X position for the right column

  // Add the text to the left column with wrapping
  columnTextLeft.forEach((line, index) => {
    const wrappedText = doc.splitTextToSize(line, columnWidth); // Wrap text based on column width
    const yPosition = columnTopMargin + index * 10; // Adjust Y position for each line
    doc.text(wrappedText, columnLeftX, yPosition); // Left column text with wrapping
  });

  // Add the text to the right column with wrapping
  columnTextRight.forEach((line, index) => {
    const wrappedText = doc.splitTextToSize(line, columnWidth); // Wrap text based on column width
    const yPosition = columnTopMargin + index * 10; // Adjust Y position for each line
    doc.text(wrappedText, columnRightX, yPosition); // Right column text with wrapping
  });

  // Save the PDF
  doc.save("inspection_report.pdf");
};
