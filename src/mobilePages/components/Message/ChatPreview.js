import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const ChatPreview = props => {
  const lastTime = props.latest && props.latest.createdAt;
  const nowDate = new Date();
  let date =
    (lastTime && (nowDate.getTime() - lastTime < 60000 && '방금 전')) ||
    ((nowDate.getTime() - lastTime < 3600000 && (
      <Fragment>
        <Moment diff={lastTime} unit="minutes">
          {nowDate}
        </Moment>
        분 전
      </Fragment>
    )) ||
      (nowDate.getTime() - lastTime < 86400000 && (
        <Fragment>
          <Moment diff={lastTime} unit="hours">
            {nowDate}
          </Moment>
          시간 전
        </Fragment>
      )) || <Moment format="MM/DD">{lastTime}</Moment>) ||
    '';
  return (
    <div className="d-flex">
      {props.redDot ? (
        <div
          style={{
            position: 'absolute',
            width: '7px',
            top: '8.5px',
            left: '23px',
            height: '7px',
            borderRadius: '100%',
            backgroundColor: '#dd6866'
          }}
        />
      ) : null}
      <div>{props.name}</div>
      <div>
        <Link to={`/chat?r=${props.reservationId}`}>
          <div>
            {(props.latest && props.latest.content) ||
              '새로운 대화방이 생성되었습니다. 지금 바로 대화를 시작해보세요!'}
          </div>
        </Link>
      </div>
      <div>{date}</div>
    </div>
  );
};
export default ChatPreview;
