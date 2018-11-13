import React from "react";
import StarRatings from "react-star-ratings";

const DesignerCardContent = props => {
  const {
    containerStyle,
    locationStyle,
    titleStyle,
    nameStyle,
    starStyle
  } = styles;
  if (props.recruit && props.recruit._designer) {
    const recruit = props.recruit;

    let shops = "";
    recruit.shops.forEach(shop => {
      shops += `/ ${shop}`;
    });
    shops = shops.substring(1);
    return (
      <div style={containerStyle}>
        <div style={locationStyle}>{shops}</div>
        <div style={titleStyle}>{recruit.title}</div>
        <div style={nameStyle}>
          {recruit._designer.name}{" "}
          <span style={starStyle}>
            <StarRatings
              rating={recruit.score}
              starDimension="1.1rem"
              starSpacing="1px"
              starRatedColor="#dd6866"
              starEmptycolor="#ffffff"
            />
          </span>
          <span style={{ color: "gray" }}>({recruit.score})</span>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

const styles = {
  containerStyle: {
    paddingTop: "5%"
  },
  locationStyle: {
    fontSize: "1.1rem",
    color: "#2b2e34",
    marginBottom: 4
  },
  titleStyle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#1e3354",
    marginBottom: 4
  },
  nameStyle: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#2b2e34",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  starStyle: {
    marginLeft: "2%",
    color: "#dd6866",
    fontSize: "1.1rem"
  }
};

export default DesignerCardContent;
