import React, { Fragment } from 'react';
import './chatPreview.css';
import Moment from 'react-moment';

const Message = props => {
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
    <div
      className="cp_bg"
      style={props.finished ? { backgroundColor: 'rgba(0,0,0,0.05)' } : null}
    >
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
      <div style={{ width: '13.1%' }} className="font-weight-bold">
        {props.name}
        <div style={{ fontWeight: 'normal', fontSize: '1.1rem' }}>
          {' '}
          <Moment format="MM/DD">{props.date}</Moment>
        </div>
      </div>
      <div style={{ width: '73.6%' }} className="cp_link">
        {/* <Link to={`/chat?r=${props.reservationId}`} className="cp_link"> */}
        <div
          className="cp_content"
          onClick={
            props.finished
              ? () => {
                  alert('완료된 예약입니다.');
                }
              : () => props.showChat(props.reservationId)
          }
          style={{ cursor: 'pointer' }}
        >
          {(props.latest && props.latest.content) ||
            '새로운 대화방이 생성되었습니다. 지금 바로 대화를 시작해보세요!'}
        </div>
        {/* </Link> */}
      </div>
      <div style={{ width: '11.1%' }} className="cp_content text-right">
        {date}
      </div>
    </div>
  );
};
export default Message;
