import React, { Fragment } from 'react';
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
    <div
      className="d-flex align-items-center py-3 px-3 my-2 border rounded"
      style={props.finished ? { backgroundColor: 'rgba(0,0,0,0.1)' } : null}
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
      <div style={{ width: '15%', color: '#1f3354' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
          {props.name}
        </div>
        <div>
          <Moment format="MM/DD">{props.date}</Moment>
        </div>
      </div>
      <div
        style={{ width: '60%', margin: '0 5%', fontSize: '1.1rem' }}
        onClick={
          props.finished
            ? () => {
                alert('완료된 예약입니다.');
              }
            : () => props.showChat(props.reservationId)
        }
      >
        {props.finished
          ? '완료된 예약입니다.'
          : (props.latest && props.latest.content) ||
            '새로운 대화방이 생성되었습니다. 지금 바로 대화를 시작해보세요!'}
      </div>
      <div style={{ marginLeft: 'auto', textAlign: 'right' }}>{date}</div>
    </div>
  );
};
export default ChatPreview;
