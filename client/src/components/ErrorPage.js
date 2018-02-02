import React from "react";
export default (props) => {
  console.log(props.statusCode);
  return(
    <h3>Error: {props.statusCode}</h3>
  );
}