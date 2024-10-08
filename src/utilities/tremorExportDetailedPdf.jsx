import jsPDF from "jspdf";
import "jspdf-autotable"; // If you're also using autoTable
import React from "react";

export const tremorExportDetailedPdf = ({ formData }) => {
  console.log(formData);

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Define the margins
  const leftMargin = 20; // Left margin
  const rightMargin = 20; // Right margin
  const topMargin = 15; // Top margin

  // Set the background color
  doc.setFillColor(255, 255, 255); // Light blue background
  doc.rect(
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight(),
    "F"
  );

  // Prepare the text to be displayed
  const textLines = [
    `ATC-20 DETAILED EVALUATION SAFETY ASSESSMENT SUMMARY`,
    `${formData.inspection.buildingName}`,
  ];

  // Set the font size for the first line (header)
  doc.setFontSize(12); // Header font size
  const firstLine = textLines[0];
  const firstLineWidth = doc.getTextWidth(firstLine);
  const pageWidth = doc.internal.pageSize.getWidth();
  const xCenter = (pageWidth - firstLineWidth) / 2;

  // Set text color and add the first line
  doc.setFont("helvetica", "bold"); // Set font to bold
  doc.text(firstLine, xCenter, topMargin); // Centered at the top

  // Set the font size for remaining lines
  doc.setFontSize(11); // Smaller font size for the other lines
  doc.setFont("helvetica", "bold"); // Reset font to normal

  // Aligning latitude on both ends of the line
  const leftText = `${formData.inspection.buildingName}`;
  const rightText = `${formData.posting.radioOptions}: ${
    formData.additionalPosting.radioOptions != "INSPECTED"
      ? formData.additionalPosting.radioOptions
      : "SAFE"
  }`; // This could be any label you want to add to the right

  // Calculate positions
  const leftTextWidth = doc.getTextWidth(leftText);
  const rightTextWidth = doc.getTextWidth(rightText);

  const leftX = leftMargin; // Start position for left-aligned text
  const rightX =
    doc.internal.pageSize.getWidth() - rightTextWidth - rightMargin; // Position for right-aligned text

  // Add the text to the PDF
  doc.text(leftText, leftX, topMargin + 10); // Add left-aligned text

  // Draw a border around the right text
  const borderX = rightX - 2; // Adjust for border thickness
  const borderY = topMargin + 5; // Y position for border
  const borderWidth = rightTextWidth + 4; // Width of border
  const borderHeight = 10; // Height of border

  // Draw the border
  doc.setDrawColor(0, 0, 0); // Set border color (black)
  doc.rect(borderX, borderY, borderWidth, borderHeight); // Draw the border

  // Calculate center position for rightText within the border
  const textX = borderX + (borderWidth - rightTextWidth) / 2; // Centering text horizontally
  const textY = borderY + borderHeight / 2; // Centering text vertically

  // Add the right-aligned text centered within the border
  doc.text(rightText, textX, textY, { baseline: "middle" }); // Add right-aligned text centered vertically

  doc.setFont("helvetica", "normal"); // Reset font to normal
  doc.setFontSize(8); // Smaller font size for the other lines

  const buildingInfo = [
    `Address: ${formData.inspection.buildingLocation}`,
    `Building Contact/Phone: ${formData.buildingDescription.contact}`,
    `Number of Residential Units Habitable: ${formData.buildingDescription.habitable}`,
    `Number of Residential Units Not Habitable: ${formData.buildingDescription.nonHabitable}`,
    `Area Inspected: ${formData.inspection.areaInspected}`,
    `Type of Construction: ${
      formData.typeofConstruction.radioOptions === "Others"
        ? formData.typeofConstruction.specify
        : formData.typeofConstruction.radioOptions
    }`,
    `Occupancy: ${
      formData.primaryOccupancy.radioOptions === "Others"
        ? formData.primaryOccupancy.specify
        : formData.primaryOccupancy.radioOptions
    }`,
    `Stories Above: ${formData.buildingDescription.aboveGround}`,
    `Stories Below: ${formData.buildingDescription.belowGround}`,
  ];

  // Split buildingInfo into two halves
  const half = Math.ceil(buildingInfo.length / 2);
  const leftColumn = buildingInfo.slice(0, half); // First half
  const rightColumn = buildingInfo.slice(half); // Second half

  // Calculate Y positions for the top and bottom borders
  const startY = topMargin + 25; // Starting Y position for the top border
  const lineSpacing = 5; // Spacing between lines
  const columnGap = 100; // Horizontal gap between the two columns
  const textHeight =
    Math.max(leftColumn.length, rightColumn.length) * lineSpacing; // Total height based on the longer column

  const endY = startY + textHeight; // Y position for the bottom border

  // Draw the top border line (before the loop)
  doc.line(leftMargin, startY - 5, pageWidth - rightMargin, startY - 5); // Line 5 units above the text

  // Loop through the left column and add text
  leftColumn.forEach((line, index) => {
    const yPosition = startY + index * lineSpacing; // Y position for each line in the left column
    doc.text(line, leftMargin, yPosition); // Add text in the left column (starting from leftMargin)
  });

  // Loop through the right column and add text
  rightColumn.forEach((line, index) => {
    const yPosition = startY + index * lineSpacing; // Y position for each line in the right column
    doc.text(line, leftMargin + columnGap, yPosition); // Add text in the right column (shifted by columnGap)
  });

  // Draw the bottom border line (after the loop)
  doc.line(leftMargin, endY, pageWidth - rightMargin, endY); // Line 5 units below the last line of text

  // Evaluation section using autoTable
  const evaluationData = [
    ["Evaluation", " "], // for header
    [
      "Collapse, partial collapse, or building off foundation",
      formData.evaluation[
        "Collapse, partial collapse, or building off foundation"
      ],
    ],
    [
      "Building or story leaning",
      formData.evaluation["Building  or story leaning"],
    ],
    [
      "Racking damage to walls, other structural damage",
      formData.evaluation["Racking damage to walls, other structural damage"],
    ],
    [
      "Chimney, parapet, or other falling hazards",
      formData.evaluation["Chimney, parapet, or other falling hazards"],
    ],
    [
      "Ground slope movement or cracking",
      formData.evaluation["Ground slope movement or cracking "],
    ],
    [
      `Others (${formData.evaluation["specify"]})`,
      `${formData.evaluation["Others"]}`,
    ],
  ];

  // Calculate Y position for the evaluation table
  const evalOffset = 8; // Adjust as needed
  const evalStartY = endY + evalOffset; // Start Y position for evaluation
  doc.setFont("helvetica", "bold"); // Reset font to normal
  doc.setFontSize(10);
  doc.text(`Evaluation`, leftMargin, evalStartY - 3);
  doc.setFont("helvetica", "normal"); // Reset font to normal
  // Set font size for evaluation
  doc.setFontSize(8);
  // doc.line(leftMargin, evalStartY + 5, pageWidth - rightMargin, evalStartY + 5); // Line above the table

  const columns = ["Hazard", "Damage", "Comment"];
  const rows = [
    [{ content: "   Overall Hazards", colSpan: 3 }], // Hazards in the third row
    [
      "       Collapse or partial collapse",
      `${formData.overAllHazards["Collapse or partial collapse"]}`,
      `${formData.overAllHazards.comment["Collapse or partial collapse"]}`,
    ],
    [
      "       Building  or story leaning",
      `${formData.overAllHazards["Building  or story leaning"]}`,
      `${formData.overAllHazards.comment["Building  or story leaning"]}`,
    ],
    [
      `       Others: ${formData.overAllHazards["specify"]}`,
      `${formData.overAllHazards["Others"]}`,
      `${formData.overAllHazards.comment["Others"]}`,
    ],

    [{ content: "   Structural Hazards", colSpan: 3 }],
    [
      "       Precast connections",
      `${formData.structuralHazards["Precast connections"]}`,
      `${formData.structuralHazards.comment["Precast connections"]}`,
    ],
    [
      "       Roofs, floors (vertical loads)",
      `${formData.structuralHazards["Roofs, floors (vertical loads)"]}`,
      `${formData.structuralHazards.comment["Roofs, floors (vertical loads)"]}`,
    ],
    [
      "       Columns, pilasters, corbels",
      `${formData.structuralHazards["Columns, pilasters, corbels"]}`,
      `${formData.structuralHazards.comment["Columns, pilasters, corbels"]}`,
    ],
    [
      "       Diaphragms, horizontal bracing",
      `${formData.structuralHazards["Diaphragms, horizontal bracing"]}`,
      `${formData.structuralHazards.comment["Diaphragms, horizontal bracing"]}`,
    ],
    [
      "       Walls, vertical bracing",
      `${formData.structuralHazards["Walls, vertical bracing"]}`,
      `${formData.structuralHazards.comment["Walls, vertical bracing"]}`,
    ],
    [
      `       Others: ${formData.structuralHazards["specify"]}`,
      `${formData.structuralHazards["Others"]}`,
      `${formData.structuralHazards.comment["Others"]}`,
    ],
    [{ content: "   Nonstructural Hazards", colSpan: 3 }], // Hazards in the third row
    [
      "       Parapets, ornamentation",
      `${formData.nonStructuralHazards["Parapets, ornamentation"]}`,
      `${formData.nonStructuralHazards.comment["Parapets, ornamentation"]}`,
    ],
    [
      "       Ceilings, light fixtures",
      `${formData.nonStructuralHazards["Ceilings, light fixtures"]}`,
      `${formData.nonStructuralHazards.comment["Ceilings, light fixtures"]}`,
    ],
    [
      "       Cladding, glazing",
      `${formData.nonStructuralHazards["Cladding, glazing"]}`,
      `${formData.nonStructuralHazards.comment["Cladding, glazing"]}`,
    ],
    [
      "       Interior walls, partitions",
      `${formData.nonStructuralHazards["Interior walls, partitions"]}`,
      `${formData.nonStructuralHazards.comment["Interior walls, partitions"]}`,
    ],
    [
      "       Stairs, exits",
      `${formData.nonStructuralHazards["Stairs, exits"]}`,
      `${formData.nonStructuralHazards.comment["Stairs, exits"]}`,
    ],
    [
      "       Elevators",
      `${formData.nonStructuralHazards["Elevators"]}`,
      `${formData.nonStructuralHazards.comment["Elevators"]}`,
    ],
    [
      "       Electric, gas",
      `${formData.nonStructuralHazards["Electric, gas"]}`,
      `${formData.nonStructuralHazards.comment["Electric, gas"]}`,
    ],
    [
      `       Others: ${formData.nonStructuralHazards["specify"]}`,
      `${formData.nonStructuralHazards["Others"]}`,
      `${formData.nonStructuralHazards.comment["Others"]}`,
    ],
    [{ content: "   Geotechnical Hazards", colSpan: 3 }], // Hazards in the third row
    [
      "       Slope failure, debris",
      `${formData.geoTechnicalHazards["Slope failure, debris"]}`,
      `${formData.geoTechnicalHazards.comment["Slope failure, debris"]}`,
    ],
    [
      "       Ground movement, fissures",
      `${formData.geoTechnicalHazards["Ground movement, fissures"]}`,
      `${formData.geoTechnicalHazards.comment["Ground movement, fissures"]}`,
    ],
    [
      `       Others: ${formData.geoTechnicalHazards["specify"]}`,
      `${formData.geoTechnicalHazards["Others"]}`,
      `${formData.geoTechnicalHazards.comment["Others"]}`,
    ],
  ];
  // Add evaluation table
  doc.autoTable({
    head: [columns], // Table header
    body: rows, // Table rows
    startY: evalStartY, // Start position for the table
    styles: {
      cellPadding: 0,
      fontSize: 8,
      fillColor: null,

      lineWidth: 0.3,
      lineColor: [0, 0, 0],
      // lineWidth: 0, // Remove borders
      // drawCell: false,
      textColor: [0, 0, 0],
    },
    headStyles: {
      fillColor: null, // Remove background color from header
      textColor: [0, 0, 0], // Black text for header
      // lineWidth: 0, // Remove borders from header
      // drawCell: false,
      fontSize: 10,
      halign: "center",
      overflow: "linebreak",
    },
    theme: "plain",
    margin: { left: leftMargin, right: rightMargin },
    // columnStyles: {
    //   0: { cellWidth: 100 }, // Width of the first column (Evaluation Category)
    //   1: { cellWidth: 70 }, // Width of the second column (Assessment)
    // },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { halign: "center", cellWidth: 40 }, // Center the text in the second column (damage column)
      2: { cellPadding: { left: 4, right: 2 }, cellWidth: 70 },
    },
  });

  const tableEndY = evalStartY + evaluationData.length * 5; // Approximate height based on number of rows
  // doc.line(leftMargin, tableEndY + 64, pageWidth - rightMargin, tableEndY + 64); // Line below the table

  const textBelowTable = "Thank you for your assessment!";
  const textBelowY = tableEndY + 53; // Positioning text 10 units below the bottom border
  // doc.setFontSize(10); // Set font size for the below text
  doc.text(
    `Estimated Building Damage: ${formData.estimatedBldgDmg.radioOptions}`,
    leftMargin,
    textBelowY
  );
  const maxWidth = doc.internal.pageSize.getWidth() - 50; // Subtract margins

  // Use splitTextToSize to wrap the text
  const wrappedTextCommentUseEntry = doc.splitTextToSize(
    `${formData.estimatedBldgDmg.comment}`,
    maxWidth
  );

  // Add the wrapped text to the document
  const yStart = 20; // Starting Y position
  doc.text(`Comments: `, leftMargin, textBelowY + 8);
  wrappedTextCommentUseEntry.forEach((line, index) => {
    doc.text(line, 25, textBelowY + 12 + index * 5); // Adjust Y position for each line
  });
  // doc.text(
  //   `${formData.estimatedBldgDmg.comment}`,
  //   leftMargin + 5,
  //   textBelowY + 12
  // );

  doc.text(
    `Use and Entry Restrictions written on placard: `,
    leftMargin,
    textBelowY + 50
  );
  doc.text(`${formData.useAndEntry.specify}`, leftMargin + 5, textBelowY + 54);

  const useEntryOffset = 75;
  doc.text(`Further Actions: `, leftMargin, textBelowY + useEntryOffset);
  doc.text(
    `Barricades needed in the following areas: ${formData.useAndEntryFurtherAction.barricade}`,
    leftMargin + 5,
    textBelowY + useEntryOffset + 4
  );
  doc.text(
    `Detailed Evaluation Recommended: ${
      formData.useAndEntryFurtherAction.radioOptions != "Others"
        ? formData.useAndEntryFurtherAction.radioOptions
        : formData.useAndEntryFurtherAction.specify
    }`,
    leftMargin + 5,
    textBelowY + useEntryOffset + 8
  );
  doc.text(
    `Other Recommendations: ${formData.useAndEntryFurtherAction.recommendation}`,
    leftMargin + 5,
    textBelowY + useEntryOffset + 12
  );
  const wrappedTextCommentUseEntryFurther = doc.splitTextToSize(
    `${formData.useAndEntryFurtherAction.mainComment}`,
    maxWidth - 15
  );

  // Add the wrapped text to the document
  doc.text(`Comments: `, leftMargin + 5, useEntryOffset + 177);
  wrappedTextCommentUseEntryFurther.forEach((line, index) => {
    doc.text(line, 40, useEntryOffset + 177 + index * 5); // Adjust Y position for each line
  });
  // doc.text(
  //   `Comment: ${formData.useAndEntryFurtherAction.mainComment}`,
  //   leftMargin + 5,
  //   textBelowY + useEntryOffset + 16
  // );

  const inspectedByOffset = 110;
  doc.text(`Inspected By: `, leftMargin, textBelowY + inspectedByOffset);
  doc.text(
    `${formData.inspector.inspectorID}`,
    leftMargin + 5,
    textBelowY + inspectedByOffset + 4
  );
  doc.text(
    `${formData.inspector.affiliation}`,
    leftMargin + 5,
    textBelowY + inspectedByOffset + 8
  );
  doc.text(
    `${formData.inspection.monthName} ${formData.inspection.day}, ${formData.inspection.year}`,
    leftMargin + 5,
    textBelowY + inspectedByOffset + 12
  );
  // Save the PDF
  doc.save(
    `${formData.inspection.buildingName}_${formData.inspection.monthName}-${formData.inspection.day}-${formData.inspection.year}_detailed.pdf`
  );
};
