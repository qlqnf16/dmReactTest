import React, { Fragment } from 'react';
import './BasicInfo.css';

const BasicInfo = props => {
  console.log(props);
  const recruit = props.recruit;
  const designer = props.designerData;

  const timeFormat = time => {
    return `${parseInt(time / 60, 10)}시간 ${time % 60 === 0 ? '' : '30분'}`;
  };
  return (
    <Fragment>
      <div>
        <div className="bi_name">{designer && designer.name}</div>
        <div className="bi_title">{recruit.title}</div>
        <div className="bi_shop">준오헤어 청담점/서울 | 헤어웰 수내점/경기</div>
        <div className="bi_introduce">
          <pre className="bi_introduce">{designer && designer.introduce}</pre>
        </div>
      </div>
      <div className="bi_box">
        <div className="bi_boxTitle">요청사항</div>
        <div className="bi_introduce">{recruit.requirement}</div>
        <div className="bi_boxTitle" style={{ marginTop: '21.6px' }}>
          예상 시술 소요시간
        </div>
        <div className="bi_introduce">
          커트: {timeFormat(recruit.requireTime.cut)} | 염색:{' '}
          {timeFormat(recruit.requireTime.dye)} | 펌:{' '}
          {timeFormat(recruit.requireTime.perm)}
        </div>
      </div>
    </Fragment>
  );
};

export default BasicInfo;
