import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AttentionCard from '../components/ReservationConfirm/AttentionCard';
import './PageCss.css';

class ReservationConfirm extends Component {
  render() {
    return (
      <div className="text-center">
        <div className="m-5 text-center">
          <h1>3단계 : 서비스 받기 (이미지)</h1>
        </div>
        <div className="rc_h1">예약이 완료되었습니다.</div>
        <div className="rc_h2">
          예약번호: {this.props.match.params.reservation_id}
        </div>
        <div className="rc_h3">
          {this.props.location.state.userName}
          님께 최선을 다해서 노력하는 {this.props.location.state.userName} 막내!
          예쁘게 봐주세요~ ^.^
        </div>
        <AttentionCard />
        <div className="d-block">
          <Link
            to="/reservations"
            className="rc_button"
            style={{ marginRight: '23px' }}
          >
            예약확인/취소
          </Link>
          <Link to="/message" className="rc_button">
            메세지
          </Link>
        </div>
      </div>
    );
  }
}

export default ReservationConfirm;
