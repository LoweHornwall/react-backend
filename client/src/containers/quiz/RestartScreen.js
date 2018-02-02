import React from "react";

export default (props) => {
  let onRestartClick = props.onRestartClick;

  return (
    <div>
      <button onClick={onRestartClick}>Restart</button>
    </div>
  )
}