import React from 'react';
import { Link } from 'react-router-dom';
import './chatPreview.css';

const Message = props => (
  <div className="cp_bg">
    <div style={{ width: '3.3%' }}>
      <img
        src="https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-1/p320x320/41919264_1877230375677448_1271242630931415040_n.jpg?_nc_cat=109&oh=ae32b92623fca50f7b7eddd0d84cf4b7&oe=5C6297D7"
        style={{ borderRadius: '50%', width: '100%' }}
      />
    </div>

    <div style={{ width: '12%' }} className="font-weight-bold">
      {props.name}
    </div>
    <div style={{ width: '72.5%' }}>
      <Link to={`/chat?r=${props.reservationId}`} className="cp_link">
        <div className="cp_content">
          {(props.latest && props.latest.content) ||
            '새로운 대화방이 생성되었습니다. 지금 바로 대화를 시작해보세요!'}
        </div>
      </Link>
    </div>
    <div style={{ width: '10%' }} className="cp_content text-right">
      1개월 전
    </div>
  </div>
);

export default Message;
