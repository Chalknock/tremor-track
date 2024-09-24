import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "lightGray",
  borderRadius: 2,
  boxShadow: 24,
};

const TremorInspectedModal = ({
  open,
  onClose,
  onSave,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <Box sx={style}>
        <Typography
          className="text-center py-2"
          id="confirm-modal-title"
          variant="h6"
          sx={{
            background: "var(--bs-primary)",
            color: "white",
            fontWeight: "bold",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            padding: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          id="confirm-modal-description"
          sx={{ background: "transparent" }}
        >
          {" "}
          {message}
        </Typography>
        <div
          className="row m-auto"
          style={{
            background: "lightGray",
          }}
        >
          <Button
            className="col"
            onClick={onConfirm}
            color="primary"
            sx={{ border: "1px solid black", borderRadius: 0 }}
          >
            Add Restrictions & Further Actions
          </Button>
          <Button
            className="col"
            onClick={onSave}
            color="primary"
            sx={{ border: "1px solid black", borderRadius: 0 }}
          >
            Continue
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default TremorInspectedModal;
