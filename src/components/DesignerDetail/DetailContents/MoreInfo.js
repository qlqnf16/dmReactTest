import React from 'react';
import './MoreInfo.css';

const MoreInfo = props => {
  let portfolios = [];
  if (props.designerData.portfolios) portfolios = props.designerData.portfolios;
  // for (let i = 0; props.designerData[`portfolio${i}`]; i++) {
  //   portfolios.push(props.designerData[`portfolio${i}`]);
  // }

  return (
    <div>
      <div className="dc_title">예디정보</div>
      <div className="mi_subtitle" style={{ marginTop: '27.8px' }}>
        경력 및 이력
      </div>
      <div className="mi_content">
        <pre className="mi_content">
          {props.designerData && props.designerData.careerDetail}
        </pre>
      </div>
      <div className="mi_subtitle">포트폴리오</div>
      <div className="row" style={{ margin: '13.3px 0 0 0' }}>
        {portfolios.map((portfolio, key) => (
          <img
            key={key}
            alt="alt"
            src={portfolio}
            className="col-4"
            style={{ padding: '0', width: '100%', height: '100%' }}
            onClick={() => props.showLargeImageToggle(portfolio)}
          />
        ))}
      </div>
    </div>
  );
};
export default MoreInfo;
