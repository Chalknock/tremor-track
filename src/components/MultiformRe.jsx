import { FormEvent, useEffect, useState } from "react";
import { useMultiStep } from "../utilities/useMultiStep";
import InspectionForm from "../formSteps/RapidEvaluation/InspectionForm";
import BuildingDescription from "../formSteps/RapidEvaluation/BuildingDescription";
import TypeofConstruction from "../formSteps/RapidEvaluation/TypeofConstruction";
import PrimaryOccupancy from "../formSteps/RapidEvaluation/PrimaryOccupancy";
import Evaluation from "../formSteps/RapidEvaluation/Evaluation";
import EstimatedBldgDmg from "../formSteps/RapidEvaluation/EstimatedBldgDmg";
import Posting from "../formSteps/RapidEvaluation/Posting";
import UseAndEntry from "../formSteps/RapidEvaluation/UseAndEntry";
import UseAndEntryFurtherAction from "../formSteps/RapidEvaluation/UseAndEntryFurtherAction";
import OverAllHazards from "../formSteps/DetailedEvaluation/OverAllHazards";
import StructuralHazards from "../formSteps/DetailedEvaluation/StructuralHazards";
import NonStructuralHazards from "../formSteps/DetailedEvaluation/NonStructuralHazards";
import GeoTechnicalHazards from "../formSteps/DetailedEvaluation/GeoTechnicalHazards";
import EstimatedBldgDmgPhotos from "../formSteps/DetailedEvaluation/EstimatedBldgDmgPhotos";
import "../assets/css/multiStepForm.css";
import jsPDF from "jspdf";
import TremorInspectedModal from "./modal/posting/TremorInspectedModal";

import axios from "axios";
import dayjs from "dayjs";

import {
  handleChange,
  handleCommentChange,
  updateCoordinates,
  handleRadioChange,
  handleRadioChangePosting,
  handleMultipleRadioChangeTypeofConstruction,
  handleMultipleRadioChangePrimaryOccupancy,
  handleMultipleRadioChangeEvaluation,
  handleMultipleRadioChangeestimatedBldgDmg,
  handleDateChange,
  handleMultipleRadioChangeStructuralHazards,
  handleMultipleRadioChangeOverAllHazards,
  handleMultipleRadioChangeNonStructuralHazards,
  handleMultipleRadioChangeGeoTechnicalHazards,
  handleMultipleRadioChangeUseAndEntryFurtherAction,
  handleRadioChangeAdditionalPosting,
  handleMultipleRadioChangeAdditionalUseAndEntryFurtherAction,
  handleInspectorClick,
} from "../utilities/handlers";
import { tremorExportPdf } from "../utilities/tremorExportPdf";
import TremorPostingAdditionalStepsModal from "./modal/posting/TremorPostingAdditionalStepsModal";
import TremorStepTitle from "./TremorStepTitle";
import { AdditionalPosting } from "../formSteps/AdditionalPostingEvalutaion/AdditionalPosting";
import { AdditionalUseAndEntryEvaluation } from "../formSteps/AdditionalPostingEvalutaion/AdditionalUseAndEntryEvaluation";
import { AdditionalFurtherAction } from "../formSteps/AdditionalPostingEvalutaion/AdditionalFurtherAction";
import { useParams } from "react-router-dom";
import { useInspection } from "./provider/InspectionProvider";
import { tremorExportDetailedPdf } from "../utilities/tremorExportDetailedPdf";
import { tremorExportPlacard } from "../utilities/tremorExportPlacard";
import TremorInspectorList from "./TremorInspectorList";

const MultiformRe = () => {
  // const abs = useParams();
  const { inspectionId, setInspectionId } = useInspection();
  const [formData, setFormData] = useState({
    inspector: {
      firstname: "",
      lastname: "",
      affiliation: "",
      inspectorID: "",
    },
    inspection: {
      buildingName: "",
      buildingLocation: "",
      lat: NaN,
      lon: NaN,
      date: null,
      time: null,
      year: "",
      month: "",
      monthName: "",
      day: "",
      hour: "",
      minute: "",
      period: "",
      areaInspected: "",
    },
    buildingDescription: {
      contact: "",
      aboveGround: "",
      belowGround: "",
      footprintArea: "",
      habitable: "",
      nonHabitable: "",
    },
    typeofConstruction: {
      radioOptions: "",
      barricade: "",
      recommendation: "",
      specify: "",
    },
    primaryOccupancy: {
      radioOptions: "",
      specify: "",
    },
    evaluation: {
      specify: "",
    },
    estimatedBldgDmg: {
      radioOptions: "",
      comment: "",
    },
    posting: {
      radioOptions: "",
    },
    useAndEntry: {
      specify: "",
    },
    useAndEntryFurtherAction: {
      radioOptions: "",
      barricade: "",
      recommendation: "",
      specify: "",
      mainComment: "",
    },
    overAllHazards: {
      radioOptions: "",
      specify: "",
      comment: {},
    },
    structuralHazards: {
      radioOptions: "",
      specify: "",
      comment: {},
    },
    nonStructuralHazards: {
      radioOptions: "",
      specify: "",
      comment: {},
    },
    geoTechnicalHazards: {
      radioOptions: "",
      specify: "",
      comment: {},
      mainComment: "",
    },
    estimatedBldgDmgPhotos: {
      percentage: "",
      images: [],
    },
    additionalPosting: {
      radioOptions: "",
    },
    additionalUseAndEntry: {
      specify: "",
    },
    additionalUseAndEntryFurtherAction: {
      radioOptions: "",
      barricade: "",
      recommendation: "",
      specify: "",
      mainComment: "",
    },
  });

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStep([
      <TremorInspectorList
        formData={formData}
        handleInspectorClick={handleInspectorClick(setFormData)}
      />,
      <InspectionForm
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleRadioChange(setFormData)}
        handleDateChange={handleDateChange(setFormData)}
        updateCoordinates={updateCoordinates(setFormData)}
      />,
      <BuildingDescription
        formData={formData}
        onChange={handleChange(setFormData)}
      />,
      <TypeofConstruction
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeTypeofConstruction(
          setFormData
        )}
      />,
      <PrimaryOccupancy
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangePrimaryOccupancy(
          setFormData
        )}
      />,
      <Evaluation
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeEvaluation(setFormData)}
      />,
      <EstimatedBldgDmg
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeestimatedBldgDmg(
          setFormData
        )}
      />,
      <Posting
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleRadioChangePosting(setFormData)}
      />,
      <UseAndEntry formData={formData} onChange={handleChange(setFormData)} />,
      <UseAndEntryFurtherAction
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeUseAndEntryFurtherAction(
          setFormData
        )}
      />,
      <OverAllHazards
        formData={formData}
        onOthers={handleChange(setFormData)}
        onChange={handleCommentChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeOverAllHazards(setFormData)}
      />,
      <StructuralHazards
        formData={formData}
        onOthers={handleChange(setFormData)}
        onChange={handleCommentChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeStructuralHazards(
          setFormData
        )}
      />,
      <NonStructuralHazards
        formData={formData}
        onOthers={handleChange(setFormData)}
        onChange={handleCommentChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeNonStructuralHazards(
          setFormData
        )}
      />,
      <GeoTechnicalHazards
        formData={formData}
        onOthers={handleChange(setFormData)}
        onChange={handleCommentChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeGeoTechnicalHazards(
          setFormData
        )}
      />,
      <EstimatedBldgDmgPhotos
        formData={formData}
        onChange={handleChange(setFormData)}
      />,
      <AdditionalPosting
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleRadioChangeAdditionalPosting(setFormData)}
      />,
      <AdditionalUseAndEntryEvaluation
        formData={formData}
        onChange={handleChange(setFormData)}
      />,
      <AdditionalFurtherAction
        formData={formData}
        onChange={handleChange(setFormData)}
        handleRadioChange={handleMultipleRadioChangeAdditionalUseAndEntryFurtherAction(
          setFormData
        )}
      />,
    ]);
  const [confirmOpenOptional, setConfirmOpenOptional] = useState(false);
  const [postingOptionalmessage, setPostingOptionalmessage] = useState("");
  const [postingOptionaltitle, setPostingOptionaltitle] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (inspectionId) {
      handleRestore(inspectionId);
    } else {
      setFormData({
        inspection: {
          buildingName: "",
          buildingLocation: "",
          lat: NaN,
          lon: NaN,
          date: null,
          time: null,
          year: "",
          month: "",
          monthName: "",
          day: "",
          hour: "",
          minute: "",
          period: "",
          areaInspected: "",
        },
        buildingDescription: {
          contact: "",
          aboveGround: "",
          belowGround: "",
          footprintArea: "",
          habitable: "",
          nonHabitable: "",
        },
        typeofConstruction: {
          radioOptions: "",
          specify: "",
        },
        primaryOccupancy: {
          radioOptions: "",
          specify: "",
        },
        evaluation: {
          specify: "",
          "Collapse, partial collapse, or building off foundation": "",
          "Building  or story leaning": "",
          "Racking damage to walls, other structural damage": "",
          "Chimney, parapet, or other falling hazards": "",
          "Ground slope movement or cracking ": "",
          Others: "",
        },
        estimatedBldgDmg: {
          radioOptions: "",
          comment: "",
        },
        posting: {
          radioOptions: "",
        },
        useAndEntry: {
          specify: "",
        },
        useAndEntryFurtherAction: {
          barricade: "",
          mainComment: "",
          radioOptions: "",
          recommendation: "",
        },
        overAllHazards: {
          "Collapse or partial collapse": "",
          "Building  or story leaning": "",
          specify: "",
          Others: "",
          comment: {
            "Collapse or partial collapse": "",
            "Building  or story leaning": "",
            Others: "",
          },
        },
        structuralHazards: {
          Foundations: "",
          "Precast connections": "",
          "Roofs, floors (vertical loads)": "",
          "Columns, pilasters, corbels": "",
          "Diaphragms, horizontal bracing": "",
          "Walls, vertical bracing": "",
          specify: "",
          Others: "",
          comment: {
            Foundations: "",
            "Precast connections": "",
            "Roofs, floors (vertical loads)": "",
            "Columns, pilasters, corbels": "",
            "Diaphragms, horizontal bracing": "",
            "Walls, vertical bracing": "",
            Others: "",
          },
        },
        nonStructuralHazards: {
          "Parapets, ornamentation": "",
          "Ceilings, light fixtures": "",
          "Cladding, glazing": "",
          "Interior walls, partitions": "",
          "Stairs, exits": "",
          Elevators: "",
          "Electric, gas": "",
          specify: "",
          Others: "",
          comment: {
            "Parapets, ornamentation": "",
            "Ceilings, light fixtures": "",
            "Cladding, glazing": "",
            "Interior walls, partitions": "",
            "Stairs, exits": "",
            Elevators: "",
            "Electric, gas": "",
            specify: "",
            Others: "",
          },
        },

        geoTechnicalHazards: {
          "Slope failure, debris": "",
          "Ground movement, fissures": "",
          specify: "",
          Others: "",
          mainComment: "",
          comment: {
            "Slope failure, debris": "",
            "Ground movement, fissures": "",
            Others: "",
          },
        },
        estimatedBldgDmgPhotos: {
          percentage: "",
          images: [],
        },
        additionalPosting: {
          radioOptions: "",
        },
        additionalUseAndEntry: {
          specify: "",
        },
        additionalUseAndEntryFurtherAction: {
          barricade: "",
          recommendation: "",
          specify: "",
          mainComment: "",
        },
      });
    }
  }, [inspectionId]);
  const handleRestore = async (inspectionId) => {
    try {
      const response = await axios.get(
        `https://chalknock.online/api/inspections/${inspectionId}`
      );

      const [restoredData] = response.data;
      console.log(formData.inspector);
      if (restoredData) {
        const mappings = {
          firstname: restoredData.firstname || "",
          lastname: restoredData.lastname || "",
          affiliation: restoredData.affiliation || "",
          inspectorID: restoredData.inspectorID || "",
          buildingLocation: restoredData.building_location || "",
          lat: restoredData.latitude || null,
          lon: restoredData.longitude || null,
          buildingName: restoredData.building_name || "",
          date: restoredData.date ? dayjs(restoredData.date) : null,
          areaInspected: restoredData.area_inspected || "",

          time: restoredData.time || "",
          year: restoredData.year || "",
          month: restoredData.month || "",
          monthName: restoredData.month_name || "",
          day: restoredData.day || "",
          hour: restoredData.hour || "",
          minute: restoredData.minute || "",
          period: restoredData.period || "",

          images: restoredData.images || [],
          contact: restoredData.contact || "",
          aboveGround: restoredData.above_ground || "",
          belowGround: restoredData.below_ground || "",
          footprintArea: restoredData.footprint_area || "",
          habitable: restoredData.habitable || "",
          nonHabitable: restoredData.non_habitable || "",
          constructionTypeRadio: restoredData.constructionTypeRadio || "",
          constructionTypeSpecify: restoredData.constructionTypeSpecify || "",
          primaryOccupancyRadio: restoredData.primaryOccupancyRadio || "",
          primaryOccupancySpecify: restoredData.primaryOccupancySpecify || "",
          estimatedDamageRadioOptions:
            restoredData.estimated_damage_radio_options || "",
          estimatedDamageComment: restoredData.estimated_damage_comment || "",
          estimatedDamagePercentage:
            restoredData.estimated_damage_percentage || "",
          useEntrySpecify: restoredData.use_entry_specify || "",
          useEntryActionRadioOptions:
            restoredData.use_entry_action_radio_options || "",
          useEntryActionBarricade:
            restoredData.use_entry_action_barricade || "",
          useEntryActionRecommendation:
            restoredData.use_entry_action_recommendation || "",
          useEntryActionMainComment:
            restoredData.use_entry_action_main_comment || "",
          overallHazardsSpecify: restoredData.overall_hazards_specify || "",
          structuralHazardsSpecify:
            restoredData.structural_hazards_specify || "",
          nonStructuralHazardsSpecify:
            restoredData.non_structural_hazards_specify || "",
          geotechnicalHazardsSpecify:
            restoredData.geotechnical_hazards_specify || "",
          geotechnicalHazardsMainComment:
            restoredData.geotechnical_hazards_main_comment || "",
          additionalPostingRadioOptions:
            restoredData.additional_posting_radio_options || "",
          additionalUseEntrySpecify:
            restoredData.additional_use_entry_specify || "",
          additionalUseEntryActionBarricade:
            restoredData.additional_use_entry_action_barricade || "",
          additionalUseEntryActionRecommendation:
            restoredData.additional_use_entry_action_recommendation || "",
          additionalUseEntryActionMainComment:
            restoredData.additional_use_entry_action_main_comment || "",
          evalSpecify: restoredData.evalSpecify || "",
          evalCollapse: restoredData.evalCollapse || "",
          evalBuilding: restoredData.evalBuilding || "",
          evalRacking: restoredData.evalRacking || "",
          evalGround: restoredData.evalGround || "",
          evalOthers: restoredData.evalOthers || "",
          evalChimney: restoredData.evalChimney || "",
          postingRadio: restoredData.postingRadio || "",
          useEntryActionMain_comment:
            restoredData.use_entry_action_main_comment || "",
          useEntryActionRadio_options:
            restoredData.use_entry_action_radio_options || "",
          overallCollapse: restoredData.overallCollapse || "",
          overallBuilding: restoredData.overallBuilding || "",
          overallSpecify: restoredData.overallSpecify || "",
          overallOthers: restoredData.overallOthers || "",
          overallCollapseComment: restoredData.overallCollapseComment || "",
          overallBuildingComment: restoredData.overallBuildingComment || "",
          overallOthersComent: restoredData.overallOthersComent || "",
          foundationsStructuralHazards: restoredData.shfoundations || "",
          precastStructuralHazards: restoredData.shPrecast || "",
          roofsStructuralHazards: restoredData.shRoofs || "",
          columnsStructuralHazards: restoredData.shcColumns || "",
          diaphragmsStructuralHazards: restoredData.shDiaphragms || "",
          wallsStructuralHazards: restoredData.shWalls || "",
          specifyStructuralHazards: restoredData.shSpecify || "",
          othersStructuralHazards: restoredData.shOthers || "",
          foundationsCommentStructuralHazards:
            restoredData.shFoundationsComment || "",
          precastCommentStructuralHazards: restoredData.shPrecastComment || "",
          roofsCommentStructuralHazards: restoredData.shRoofsComment || "",
          columnsCommentStructuralHazards: restoredData.shColumnsComment || "",
          diaphragmsCommentStructuralHazards:
            restoredData.shDiaphragmsComment || "",
          wallsCommentStructuralHazards: restoredData.shWallsComment || "",
          othersCommentStructuralHazards: restoredData.shOthersComment || "",

          parapetsNonStructuralHazards:
            restoredData.parapetsNonStructuralHazards || "",
          ceilingsNonStructuralHazards:
            restoredData.ceilingsNonStructuralHazards || "",
          claddingNonStructuralHazards:
            restoredData.claddingNonStructuralHazards || "",
          interiorNonStructuralHazards:
            restoredData.interiorNonStructuralHazards || "",
          stairsNonStructuralHazards:
            restoredData.stairsNonStructuralHazards || "",
          elevatorsNonStructuralHazards:
            restoredData.elevatorsNonStructuralHazards || "",
          electricNonStructuralHazards:
            restoredData.electricNonStructuralHazards || "",
          specifyNonStructuralHazards:
            restoredData.specifyNonStructuralHazards || "",
          othersNonStructuralHazards:
            restoredData.othersNonStructuralHazards || "",
          parapetsCommentNonStructuralHazards:
            restoredData.parapetsCommentNonStructuralHazards || "",
          ceilingsCommentNonStructuralHazards:
            restoredData.ceilingsCommentNonStructuralHazards || "",
          claddingCommentNonStructuralHazards:
            restoredData.claddingCommentNonStructuralHazards || "",
          interiorCommentNonStructuralHazards:
            restoredData.interiorCommentNonStructuralHazards || "",
          stairsCommentNonStructuralHazards:
            restoredData.stairsCommentNonStructuralHazards || "",
          elevatorsCommentNonStructuralHazards:
            restoredData.elevatorsCommentNonStructuralHazards || "",
          electricCommentNonStructuralHazards:
            restoredData.electricCommentNonStructuralHazards || "",
          specifyNCommentNonStructuralHazards:
            restoredData.specifyNCommentNonStructuralHazards || "",
          othersCommentNonStructuralHazards:
            restoredData.othersCommentNonStructuralHazards || "",
          slopeGeoTechnicalHazards: restoredData.slopeGeoTechnicalHazards || "",
          groundGeoTechnicalHazards:
            restoredData.groundGeoTechnicalHazards || "",
          specifyGeoTechnicalHazards:
            restoredData.specifyGeoTechnicalHazards || "",
          othersGeoTechnicalHazards:
            restoredData.othersGeoTechnicalHazards || "",
          mainCommentGeoTechnicalHazards:
            restoredData.mainCommentGeoTechnicalHazards || "",
          slopeCommentGeoTechnicalHazards:
            restoredData.slopeCommentGeoTechnicalHazards || "",
          groundCommentGeoTechnicalHazards:
            restoredData.groundCommentGeoTechnicalHazards || "",
          othersCommentGeoTechnicalHazards:
            restoredData.othersCommentGeoTechnicalHazards || "",
        };

        // Batch updating formData using setFormData
        setFormData((prevFormData) => ({
          ...prevFormData,
          inspector: {
            firstname: mappings.firstname,
            lastname: mappings.lastname,
            affiliation: mappings.affiliation,
            inspectorID: mappings.inspectorID,
          },
          inspection: {
            buildingName: mappings.buildingName,
            buildingLocation: mappings.buildingLocation,
            lat: mappings.lat,
            lon: mappings.lon,
            date: mappings.date,
            time: mappings.time,
            year: mappings.year,
            month: mappings.month,
            monthName: mappings.monthName,
            day: mappings.day,
            hour: mappings.hour,
            minute: mappings.minute,
            period: mappings.period,
            areaInspected: mappings.areaInspected,
          },
          buildingDescription: {
            ...prevFormData.buildingDescription,
            contact: mappings.contact,
            aboveGround: mappings.aboveGround,
            belowGround: mappings.belowGround,
            footprintArea: mappings.footprintArea,
            habitable: mappings.habitable,
            nonHabitable: mappings.nonHabitable,
          },
          typeofConstruction: {
            radioOptions: mappings.constructionTypeRadio,
            specify: mappings.constructionTypeSpecify,
          },
          primaryOccupancy: {
            radioOptions: mappings.primaryOccupancyRadio,
            specify: mappings.primaryOccupancySpecify,
          },
          evaluation: {
            specify: mappings.evalSpecify,
            "Collapse, partial collapse, or building off foundation":
              mappings.evalCollapse,
            "Building  or story leaning": mappings.evalBuilding,
            "Racking damage to walls, other structural damage":
              mappings.evalRacking,
            "Chimney, parapet, or other falling hazards": mappings.evalChimney,
            "Ground slope movement or cracking ": mappings.evalGround,
            Others: mappings.evalOthers,
          },
          estimatedBldgDmg: {
            radioOptions: mappings.estimatedDamageRadioOptions,
            comment: mappings.estimatedDamageComment,
          },
          posting: {
            radioOptions: mappings.postingRadio,
          },
          useAndEntry: {
            specify: mappings.useEntrySpecify,
          },
          useAndEntryFurtherAction: {
            barricade: mappings.useEntryActionBarricade,
            mainComment: mappings.useEntryActionMain_comment,
            radioOptions: mappings.useEntryActionRadio_options,
            specify: mappings.useEntrySpecify,
            recommendation: mappings.useEntryActionRecommendation,
          },
          overAllHazards: {
            "Collapse or partial collapse": mappings.overallCollapse,
            "Building  or story leaning": mappings.overallBuilding,
            specify: mappings.overallSpecify,
            Others: mappings.overallOthers,
            comment: {
              "Collapse or partial collapse": mappings.overallCollapseComment,
              "Building  or story leaning": mappings.overallBuildingComment,
              Others: mappings.overallOthersComent,
            },
          },
          structuralHazards: {
            Foundations: mappings.foundationsStructuralHazards,
            "Precast connections": mappings.precastStructuralHazards,
            "Roofs, floors (vertical loads)": mappings.roofsStructuralHazards,
            "Columns, pilasters, corbels": mappings.columnsStructuralHazards,
            "Diaphragms, horizontal bracing":
              mappings.diaphragmsStructuralHazards,
            "Walls, vertical bracing": mappings.wallsStructuralHazards,
            specify: mappings.specifyStructuralHazards,
            Others: mappings.othersStructuralHazards,
            comment: {
              Foundations: mappings.foundationsCommentStructuralHazards,
              "Precast connections": mappings.precastCommentStructuralHazards,
              "Roofs, floors (vertical loads)":
                mappings.roofsCommentStructuralHazards,
              "Columns, pilasters, corbels":
                mappings.columnsCommentStructuralHazards,
              "Diaphragms, horizontal bracing":
                mappings.diaphragmsCommentStructuralHazards,
              "Walls, vertical bracing": mappings.wallsCommentStructuralHazards,
              Others: mappings.othersCommentStructuralHazards,
            },
          },
          nonStructuralHazards: {
            "Parapets, ornamentation": mappings.parapetsNonStructuralHazards,
            "Ceilings, light fixtures": mappings.ceilingsNonStructuralHazards,
            "Cladding, glazing": mappings.claddingNonStructuralHazards,
            "Interior walls, partitions": mappings.interiorNonStructuralHazards,
            "Stairs, exits": mappings.stairsNonStructuralHazards,
            Elevators: mappings.elevatorsNonStructuralHazards,
            "Electric, gas": mappings.electricNonStructuralHazards,
            specify: mappings.specifyNonStructuralHazards,
            Others: mappings.othersNonStructuralHazards,
            comment: {
              "Parapets, ornamentation":
                mappings.parapetsCommentNonStructuralHazards,
              "Ceilings, light fixtures":
                mappings.ceilingsCommentNonStructuralHazards,
              "Cladding, glazing": mappings.claddingCommentNonStructuralHazards,
              "Interior walls, partitions":
                mappings.interiorCommentNonStructuralHazards,
              "Stairs, exits": mappings.stairsCommentNonStructuralHazards,
              Elevators: mappings.elevatorsCommentNonStructuralHazards,
              "Electric, gas": mappings.electricCommentNonStructuralHazards,
              specify: mappings.specifyNCommentNonStructuralHazards,
              Others: mappings.othersCommentNonStructuralHazards,
            },
          },

          geoTechnicalHazards: {
            "Slope failure, debris": mappings.slopeGeoTechnicalHazards,
            "Ground movement, fissures": mappings.groundGeoTechnicalHazards,
            specify: mappings.specifyGeoTechnicalHazards,
            Others: mappings.othersGeoTechnicalHazards,
            mainComment: mappings.mainCommentGeoTechnicalHazards,
            comment: {
              "Slope failure, debris": mappings.slopeCommentGeoTechnicalHazards,
              "Ground movement, fissures":
                mappings.groundCommentGeoTechnicalHazards,
              Others: mappings.othersCommentGeoTechnicalHazards,
            },
          },
          estimatedBldgDmgPhotos: {
            percentage: mappings.estimatedDamagePercentage,
            images: [],
          },
          additionalPosting: {
            radioOptions: mappings.additionalPostingRadioOptions,
          },
          additionalUseAndEntry: {
            specify: mappings.additionalUseEntrySpecify,
          },
          additionalUseAndEntryFurtherAction: {
            barricade: mappings.additionalUseEntryActionBarricade,
            recommendation: mappings.additionalUseEntryActionRecommendation,
            specify: mappings.additionalUseEntrySpecify,
            mainComment: mappings.additionalUseEntryActionMainComment,
          },
        }));

        console.log(formData.inspector);
      } else {
        console.error("No data found for the given inspection ID.");
      }
    } catch (error) {
      console.error("Error restoring data:", error);
      if (error.response) {
        // Handle specific http error statuses
        console.error(
          `Error: ${error.response.status} - ${error.response.data}`
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "https://chalknock.online/api/inspections",
        formData
      );
    } catch (error) {
      console.error("Error sending data: submit", error);
    }
  };

  const handleInsertData = async (e) => {
    try {
      const response = await axios.post(
        "https://chalknock.online/api/inspections",
        formData
      );

      if (response.data.message === "Data inserted successfully") {
        alert("Data inserted successfully");
      } else {
        alert("tukmol");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isLastStep) {
      alert("Successful Account Creation");

      console.log("LAST STEP DONE");
      // console.log(formData);
      handleInsertData();
    } else {
      // next();
      // console.log("formData");
      // setStepIndex(currentStepIndex);
      if (currentStepIndex + 2 === 9) {
        let postingRadioState = formData.posting.radioOptions;
        switch (postingRadioState) {
          case "INSPECTED":
            setConfirmOpen(true);
            setTitle("BUILDING IS MARKED AS SAFE");
            setMessage(
              "There is no longer a requirement to complete the subsequent pages.Tap Continue to save inspection"
            );
            break;
          case "RESTRICTED USE":
            next();
            break;
          case "UNSAFE":
            next();
            break;
        }
      } else if (
        currentStepIndex + 2 > 10 &&
        formData.posting.radioOptions != "RESTRICTED USE"
      ) {
        console.log("final of rapid");
        handleSubmit();
        handleInsertData();
      } else if (currentStepIndex + 2 === 11) {
        let postingRadioState = formData.posting.radioOptions;
        switch (postingRadioState) {
          case "RESTRICTED USE":
            next();
            break;
          case "UNSAFE":
            setConfirmOpenOptional(true);
            setPostingOptionaltitle("BUILDING IS MARKED AS UNSAFE");
            setPostingOptionalmessage(
              "There is no longer a requirement to complete the subsequent pages.Tap Continue to save inspection"
            );
            next();
            break;
        }
      } else {
        console.log(formData);
        next();
      }
    }
  };

  return (
    <>
      {currentStepIndex + 1 <= 11 ? (
        <div>
          <TremorStepTitle
            name={"ATC 20 RAPID EVALUATION SAFETY ASSESSMENT FORM"}
            background="var(--bs-primary)"
            color="white"
            paddingTop={3}
          />
        </div>
      ) : (
        <TremorStepTitle
          name={"ATC 20 DETAILED EVALUATION SAFETY ASSESSMENT FORM"}
          background="var(--bs-primary)"
          color="white"
          paddingTop={3}
        />
      )}
      <div className="form-container">
        <form onSubmit={onSubmit} className="multi-step-form">
          {step}
          <div className="navigation-buttons">
            {!isFirstStep && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={back}
                aria-label="Go back"
              >
                Back
              </button>
            )}
            <div className="step-info">
              {currentStepIndex + 1} of {steps.length}
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              aria-label={isLastStep ? "Finish" : "Next"}
            >
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
        {confirmOpen && (
          <TremorInspectedModal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={() => {
              // Handle confirmation logic
              setConfirmOpen(false);
              next();
            }}
            onSave={() => {
              tremorExportPdf({ formData });
              tremorExportDetailedPdf({ formData });
              // tremorExportPlacard({ formData });
            }}
            message={message}
            title={title}
          />
        )}
        {confirmOpenOptional && (
          <TremorPostingAdditionalStepsModal
            open={confirmOpenOptional}
            onClose={() => setConfirmOpenOptional(false)}
            onConfirm={() => {
              // Handle confirmation logic
              setConfirmOpenOptional(false);
              next();
            }}
            onSave={() => {
              tremorExportPdf({ formData });
              // tremorExportDetailedPdf({ formData });
            }}
            message={postingOptionalmessage}
            title={postingOptionaltitle}
          />
        )}
      </div>
    </>
  );
};

export default MultiformRe;
