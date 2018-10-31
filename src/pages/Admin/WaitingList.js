import React, { Component } from 'react';
import firebase from '../../config/Firebase';
import WaitDesigner from '../../components/Admin/WaitDesigner';
import AdminNav from '../../components/Navigation/AdminNav/AdminNav';

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
          <AdminNav />
          <h1>디자이너 관리</h1>
          <table className="table text-center">
            <thead>
              <tr>
                <th>이름</th>
                <th>e-mail</th>
                <th>지역</th>
                <th>상호</th>
                <th>수습 경력</th>
                <th>디자이너까지 남은 기간</th>
                <th>휴대폰</th>
                <th>가입일</th>
                <th>프로필 사진</th>
                <th>자격증</th>
                <th>면허증</th>
                <th>승인</th>
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
