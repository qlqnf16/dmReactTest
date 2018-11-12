import React, { Component } from 'react';
import axios from '../../../config/Axios';
import Moment from 'react-moment';
import firebase from '../../../config/Firebase';

class NoShow extends Component {
  state = {
    penalty: null,
    reservations: [],
    madeRequest: false
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get(
        `users/5bc213a5f4376e579d2c18f6/reservations/all`
      );

      const filteredData = data.filter(d => d.cancelReason === '노쇼dreamary');
      this.setState({
        filteredData,
        madeRequest: true
      });
    }
  };

  penaltySubmit = async uid => {
    await firebase
      .database()
      .ref('users/' + uid)
      .update({
        penalty: this.state.penalty
      });
    alert('수정되었습니다');
  };

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };
  render() {
    if (this.state.madeRequest) {
      const reservations = this.state.filteredData.map((reservation, key) => (
        <tr key={key}>
          <td>{Object.keys(reservation.services)}</td>
          <td>{reservation._designer.name}</td>
          <td>{reservation._user.name}</td>
          <td>
            <Moment format="YYYY/MM/DD">{reservation.createdAt}</Moment>{' '}
          </td>
          <td>
            <Moment format="YYYY/MM/DD">{reservation.date}</Moment>
          </td>
          <td>{reservation.cancelByUser ? '일반 유저' : '디자이너'}</td>
          <td>
            <select
              className="w-75"
              onChange={this.handleInputChange}
              name="penalty"
              value={this.state.penalty}
            >
              <option value="0">패널티 없음</option>
              <option value="1">1회 취소</option>
              <option value="2">2회 취소</option>
              <option value="3">3회 이상 취소(이용 정지)</option>
            </select>
            <button
              onClick={() => this.penaltySubmit(reservation._user._uid)}
              className="btn-sm"
            >
              수정
            </button>
          </td>
        </tr>
      ));
      return (
        <div>
          <h1>노쇼 관리</h1>
          <table className="table text-center">
            <thead>
              <tr>
                <th>서비스 종류</th>
                <th>예비 디자이너</th>
                <th>일반 회원</th>
                <th>예약 체결일</th>
                <th>예약일</th>
                <th>취소자</th>
                <th>패널티 주기</th>
              </tr>
            </thead>
            <tbody>{reservations}</tbody>
          </table>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default NoShow;
