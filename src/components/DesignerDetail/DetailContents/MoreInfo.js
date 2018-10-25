import React from "react";
import "./MoreInfo.css";

const MoreInfo = props => (
  <div>
    <div className="dc_title">예디정보</div>
    <div className="mi_subtitle" style={{ marginTop: "27.8px" }}>
      경력 및 이력
    </div>
    <div className="mi_content">
      <pre className="mi_content">
        {props.designerData && props.designerData.careerDetail}
      </pre>
    </div>
    <div className="mi_subtitle">포트폴리오</div>
    <div className="row" style={{ margin: "13.3px 0 0 0" }}>
      {props.designerData &&
        props.recruit.portfolios.map(portfolio => (
          <img
            alt="alt"
            src={portfolio}
            className="col-4"
            style={{ padding: "0" }}
          />
        ))}
    </div>
  </div>
);
export default MoreInfo;
