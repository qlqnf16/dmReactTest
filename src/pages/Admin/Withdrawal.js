import React, { Component } from 'react';
import firebase from '../../config/Firebase';
import AdminNav from '../../components/Navigation/AdminNav/AdminNav';
import Moment from 'react-moment';

class Withdrawal extends Component {
  state = {
    users: [],
    madeRequest: false
  };

  componentDidMount = async () => {
    await firebase
      .database()
      .ref(`/users`)
      .on('value', async res => {
        const users = Object.values(res.val()).filter(user => user.withdrawal);
        await this.setState({
          users,
          madeRequest: true
        });
      });
  };

  render() {
    if (this.state.madeRequest) {
      const userList = this.state.users.map((
        user,
        key // <User
      ) => (
        //   user={user}
        //   key={key}
        //   handleInputChange={this.handleInputChange}
        // />
        <tr key={key}>
          <td>{user.name}</td>
          <td>{user._id}</td>
          <td>{user.withdrawal}</td>
        </tr>
      ));

      return (
        <div>
          <AdminNav />
          <h1>회원 탈퇴 관리</h1>
          <table className="table text-center">
            <thead>
              <tr>
                <th>유저</th>
                <th>id</th>
                <th>사유</th>
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

export default Withdrawal;
