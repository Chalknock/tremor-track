import React, { useEffect, useState } from "react";
import axios from "axios";

export const TestInspection = () => {
  const [data, setData] = useState([]);
  const [names, setNames] = useState([]);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/inspections"
        );

        // Update data state
        setData(response.data);

        // Update names and emails
        const newNames = response.data.map((user) => user.building_name);
        const newEmails = response.data.map((user) => user.building_location);

        setNames(newNames);
        setEmails(newEmails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="form-container">
      Inspection page
      <div>this is where all the inspected building are consolidated</div>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <h2>Emails</h2>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
};
