import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AttentionCard from '../components/ReservationConfirm/AttentionCard';

class ReservationConfirm extends Component {
  render() {
    return (
      <div className="container">
        <div className="m-5 text-center">
          <h1>3단계 : 서비스 받기 (이미지)</h1>
        </div>
        <div className="m-5 text-center">
          <h1>예약이 완료되었습니다.</h1>
          <h2>예약 번호 : {this.props.match.params.reservation_id}</h2>
          <h4>
            {this.props.location.state.userName}
            님께 최선을 다해서 노력하는 {
              this.props.location.state.userName
            }{' '}
            막내! 예쁘게 봐주세요~ ^_^
          </h4>
        </div>
        <AttentionCard />
        <div className="d-block text-center">
          <Link to="/reservations">
            <div className="btn btn-outline-primary mx-5">예약확인 / 취소</div>
          </Link>
          <Link to="/message">
            <div className="btn btn-outline-primary mx-5">메세지</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default ReservationConfirm;
