import React from 'react';
import './MoreInfo.css';

const MoreInfo = props => (
  <div>
    <div className="dc_title">막내정보</div>
    <div className="mi_subtitle" style={{ marginTop: '27.8px' }}>
      경력 및 이력
    </div>
    <div className="mi_content">
      {/* - 서경대학교 미용예술학과 졸 | 2017.03 <br />- 미용사 면허증 | 2017.06{' '}
      <br />- 트리콜로지스트 level2 취득 | 2018.08 */}
      {props.designerData && props.designerData.careerDetail}
    </div>
    <div className="mi_subtitle">포트폴리오</div>
    <div className="row" style={{ margin: '13.3px 0 0 0' }}>
      {props.designerData &&
        props.recruit.portfolios.map(portfolio => (
          <img
            alt="alt"
            src={portfolio}
            className="col-4"
            style={{ padding: '0' }}
          />
        ))}
    </div>
  </div>
);

export default MoreInfo;
