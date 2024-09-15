import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
const TremorDateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
  };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <DateTimePicker label="Inspection Date and Time" /> */}
        <DateTimePicker
          label="Inspection Date and Time"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </div>
  );
};

export default TremorDateTimePicker;
