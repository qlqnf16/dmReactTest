import React, { Fragment } from 'react';
import './BasicInfo.css';

const BasicInfo = props => {
  console.log(props);
  const recruit = props.recruit;

  const timeFormat = time => {
    return `${parseInt(time / 60, 10)}시간 ${time % 60 === 0 ? '' : '30분'}`;
  };
  return (
    <Fragment>
      <div>
        <div className="bi_name">이태훈</div>
        <div className="bi_title">{props.title}</div>
        <div className="bi_shop">준오헤어 청담점/서울 | 헤어웰 수내점/경기</div>
        <div className="bi_introduce">
          안녕하세요, 준오헤어 인턴 태훈입니다! 남자 여자 커트 종류 상관없이
          모델 받고 있습니다.
          <br />
          제품은 실제 저희 매장에서 사용하고 있는 제품으로 합니다. 탈색머리 2번
          이상 하신분은
          <br />
          어려우며 여자분 기장은 최소 어깨 아래기장 입니다. 충분한 상담 후
          커트/펌/컬러 진행합니다.
        </div>
        {/* <div className="bi_introduce">{recruit.introduce}</div> */}
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
          {/* 커트: 1시간 30분 | 염색: 3시간 | 펌: 3시간 */}
        </div>
      </div>
    </Fragment>
  );
};

export default BasicInfo;
