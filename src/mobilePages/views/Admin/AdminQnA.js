import React, { Component } from 'react';
import axios from '../../../config/Axios';
import './Admin.css'

class AdminQnA extends Component {
  state = {
    QnAs: [],
    madeRequest: false
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get(`inquiries`);
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
          <td>{QnA.email}</td>
          <td>{QnA.title}</td>
          <td>{QnA.content}</td>
        </tr>
      ));

      return (
        <div>
          <h1>QnA</h1>
          <table className="table text-center admin">
            <thead>
              <tr>
                <th>이름</th>
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
