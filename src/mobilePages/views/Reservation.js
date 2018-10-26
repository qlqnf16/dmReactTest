import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Reservation extends Component {
  state = {};

  render() {
    return (
      <div>
        {' '}
        Reservation
        <Link
          to={{
            pathname: `/reservationConfirm/${this.state.reservationId}`,
            state: {}
          }}
        >
          <div>예약확인 페이지로</div>
        </Link>
      </div>
    );
  }
}

export default Reservation;
