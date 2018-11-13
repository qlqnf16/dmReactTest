import React, { Component } from 'react';
import firebase from '../../../config/Firebase';
import WaitDesigner from '../../components/Admin/WaitDesigner';

class WaitingList extends Component {
  state = {
    designers: [],
    madeRequest: false
  };

  componentDidMount = async () => {
    await firebase
      .database()
      .ref(`/users`)
      .on('value', async res => {
        const designers = Object.values(res.val()).filter(
          user => user.isApproval === false
        );

        await this.setState({
          designers,
          madeRequest: true
        });
      });
  };

  render() {
    if (this.state.madeRequest) {
      const WaitDesignerList = this.state.designers.map((designer, key) => (
        <WaitDesigner
          designer={designer}
          key={key}
          handleInputChange={this.handleInputChange}
        />
      ));

      return (
        <div>
          <h1>대기 디자이너 리스트</h1>
          <table className="table text-center">
            <thead>
              <tr>
                <td>이름</td>
                <td>e-mail</td>
                <td>지역</td>
                <td>상호</td>
                <td>수습 경력</td>
                <td>디자이너까지 남은 기간</td>
                <td>휴대폰</td>
                <td>가입일</td>
                <td>자격증</td>
                <td>면허증</td>
                <td>승인</td>
                <td>미승인</td>
              </tr>
            </thead>
            <tbody>{WaitDesignerList}</tbody>
          </table>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default WaitingList;
