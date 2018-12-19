import React, { Component } from 'react';
import firebase from '../../config/Firebase';
import User from '../../components/Admin/User';
import AdminNav from '../../components/Navigation/AdminNav/AdminNav';
import Moment from 'react-moment';

class Yeinbub extends Component {
  state = {
    users: [],
    madeRequest: false
  };

  componentDidMount = async () => {
    await firebase
      .database()
      .ref(`/users`)
      .on('value', async res => {
        const users = Object.values(res.val()).filter(user => user.yeinbub);
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
          <td>{user.yeinbub}</td>
          <td>
            <Moment format="YYYY/MM/DD">{user.joinedDate}</Moment>
          </td>
        </tr>
      ));

      return (
        <div>
          <AdminNav />
          <h1>헤어팟 이벤트 관리</h1>
          <table className="table text-center">
            <thead>
              <tr>
                <th>작성자</th>
                <th>헤어팟 이벤트</th>
                <th>가입일</th>
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

export default Yeinbub;
