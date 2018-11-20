import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AttentionCard from '../components/ReservationConfirm/AttentionCard';
import step3 from '../assets/images/step3.png';
import check from '../assets/images/check_lg.png';

import './PageCss.css';

class ReservationConfirm extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  showMessage = (reservationId, designerName) => {
    this.props.history.push({
      pathname: `/chat`,
      search: `?r=${reservationId}&n=${designerName}`
    });
  };
  render() {
    return (
      <div className="text-center mb-4">
        <div className="mb-5 text-center">
          <img alt="alt" style={{ width: '100%' }} src={step3} />
        </div>
        <img
          alt="alt"
          style={{ width: '6.6rem' }}
          className="m-4"
          src={check}
        />
        <div className="rc_h1">예약이 완료되었습니다.</div>
        <div className="rc_h2">
          예약번호: {this.props.match.params.reservation_id}
        </div>
        <div className="rc_h3">
          {this.props.location.state.recruit._designer.name} 예디님과의 예약이
          완료되었습니다! ^.^
        </div>
        <AttentionCard
          cardData={this.props.location.state.cardData}
          service={this.props.location.state.service}
        />
        <div className="d-block">
          <Link
            to="/reservations"
            className="rcf_button"
            style={{ marginRight: '23px' }}
          >
            예약확인/취소
          </Link>
          <div
            onClick={() =>
              this.showMessage(
                this.props.match.params.reservation_id,
                this.props.location.state.recruit._designer.name
              )
            }
            className="rcf_button d-inline"
          >
            메세지
          </div>
        </div>
      </div>
    );
  }
}

export default ReservationConfirm;
