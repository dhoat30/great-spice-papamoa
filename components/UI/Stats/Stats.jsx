import styled from "@emotion/styled";
import React from "react";
import Typography from "@mui/material/Typography";
export default function Stats({ className, label, value }) {
  return (
    <Div className={className}>
      <Typography variant="subtitle1" component="span" className={"value"}>
        {value}
      </Typography>
      <Typography variant="subtitle1" component="span" className={"label"} color={"#1D1D1D"}>
        {label}
      </Typography>
    </Div>
  );
}
const Div = styled.div`
  display: flex;
  align-items: center;
  max-width: 400px;
text-align: left;
   @media (max-width: 500px) {
  max-width: 300px;
    }
   
  .value {
    width: 160px;
    font-size: 4rem;
    color: #1D1D1D;
    font-weight: 600;
    line-height: 120%;

  }
  .label {
    width: 200px;
    @media (max-width: 500px) {
      width: 120px;
    }
  }
`;
