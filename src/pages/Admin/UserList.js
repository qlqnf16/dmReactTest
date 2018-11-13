import React, { Component } from 'react';
import firebase from '../../config/Firebase';
import User from '../../components/Admin/User';
import AdminNav from '../../components/Navigation/AdminNav/AdminNav';

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

  nameSortHandler = () => {
    firebase
      .database()
      .ref(`/users`)
      .on('value', async res => {
        let users = Object.values(res.val()).filter(user => !user.isD);
        users = users.sort((a, b) => {
          if (a.name > b.name) return 1;
          else return -1;
        });

        this.setState({
          users
        });
      });
  };

  createdAtSortHandler = () => {
    firebase
      .database()
      .ref(`/users`)
      .on('value', async res => {
        let users = Object.values(res.val()).filter(user => !user.isD);

        users = users.sort((a, b) => a.joinedDate - b.joinedDate);

        this.setState({
          users
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

      return (
        <div>
          <AdminNav />
          <h1>일반 회원 관리</h1>
          <table className="table text-center">
            <thead>
              <tr>
                <th onClick={this.nameSortHandler}>이름</th>
                <th>e-mail</th>
                <th>생년월일</th>
                <th>성별</th>
                <th>휴대폰</th>
                <th onClick={this.createdAtSortHandler}>가입일</th>
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
