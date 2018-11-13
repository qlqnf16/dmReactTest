import React from "react";

import DesignerCard from "./DesignerCard";

const DesignerCardList = props => (
  <div style={containerStyle}>
    {props.recruits.map((recruit, key) => (
      <DesignerCard recruit={recruit} key={key} />
    ))}

    {/* 보기 좋게 X2 
    {props.recruits.map((recruit, key) => (
      <DesignerCard recruit={recruit} key={key} />
    ))} */}
  </div>
);

const containerStyle = {
  width: "85%",
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "space-between"
};

export default DesignerCardList;
