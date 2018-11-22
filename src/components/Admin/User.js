import React, { Component } from 'react';
import Moment from 'react-moment';
import firebase from '../../config/Firebase';
class User extends Component {
  state = {
    penalty: null,
    madeRequest: false
  };
  componentDidMount = () => {
    if (!this.state.madeRequest) {
      this.setState({
        penalty: this.props.user.penalty,
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
    const user = this.props.user;
    return (
      <tr key={this.props.key}>
        <th scope="row">
          <div>{user.name}</div>
          <div>{user._id}</div>
        </th>
        <td>{user.email}</td>
        <td>
          {user.birthday
            ? user.birthday.year +
              '/' +
              user.birthday.month +
              '/' +
              user.birthday.day
            : null}
        </td>
        <td>{user.gender}</td>
        <td>{user.phoneNumber}</td>
        <td>
          <Moment format="YYYY/MM/DD">{user.joinedDate}</Moment>
        </td>
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
            onClick={() => this.penaltySubmit(user.uid)}
            className="btn-sm"
          >
            수정
          </button>
        </td>
      </tr>
    );
  }
}

export default User;
