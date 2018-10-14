import React, { Component } from 'react';
import firebase from '../../config/Firebase';
import Moment from 'react-moment';
import User from '../../components/Admin/User';

class UserList extends Component {
  state = {
    users: [],
    madeRequest: false
  };

  componentDidMount = async () => {
    await firebase
      .database()
      .ref(`/users`)
      .on('value', async res => {
        const users = Object.values(res.val()).filter(user => !user.isD);
        await this.setState({
          users,
          madeRequest: true
        });
      });
  };

  render() {
    if (this.state.madeRequest) {
      const userList = this.state.users.map((user, key) => (
        <User
          user={user}
          key={key}
          handleInputChange={this.handleInputChange}
        />
      ));
      console.log(userList);

      return (
        <div>
          <h1>일반 회원 관리</h1>
          <table className="table text-center">
            <thead>
              <tr>
                <th>이름</th>
                <th>e-mail</th>
                <th>생년월일</th>
                <th>성별</th>
                <th>휴대폰</th>
                <th>가입일</th>
                <th>패널티 관리</th>
              </tr>
            </thead>
            <tbody>{userList}</tbody>
          </table>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default UserList;
