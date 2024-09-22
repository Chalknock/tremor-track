import { FormLabel } from '@mui/material'
import React from 'react'

const TremorFormLabel = (props) => {
    const label = props.label
  return (
    <div className="d-flex">

      <FormLabel
      className="justify-content-center align-items-center w-100"
        id="estimatedBldgDmg-radio-buttons-group"
        style={{
          background: "lightGray",
          borderRadius: "20px",
          padding: "18px",
        }}
      >
        {" "}
        {label}{" "}
      </FormLabel>
      </div>
  )
}

export default TremorFormLabel