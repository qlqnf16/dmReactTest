import React, { Component } from 'react';
import axios from '../../config/Axios';
import AdminNav from '../../components/Navigation/AdminNav/AdminNav';
import Moment from 'react-moment';

class AdminQnA extends Component {
  state = {
    QnAs: [],
    madeRequest: false
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get(`inquiries`);
      console.log(data);
      this.setState({
        QnAs: data,
        madeRequest: true
      });
    }
  };

  render() {
    if (this.state.madeRequest) {
      const QnAs = this.state.QnAs.map((QnA, key) => (
        <tr key={key}>
          <td>{QnA.name}</td>
          <td>
            <Moment format="MM/DD HH:mm">{QnA.createdAt}</Moment>
          </td>
          <td>{QnA.email}</td>
          <td>{QnA.title}</td>
          <td style={{ whiteSpace: 'inherit' }}>{QnA.content}</td>
        </tr>
      ));

      return (
        <div>
          <AdminNav />
          <h1>QnA</h1>
          <table className="table text-center">
            <thead>
              <tr>
                <th>이름</th>
                <th>날짜</th>
                <th>e-mail</th>
                <th>제목</th>
                <th>내용</th>
              </tr>
            </thead>
            <tbody>{QnAs}</tbody>
          </table>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
export default AdminQnA;
