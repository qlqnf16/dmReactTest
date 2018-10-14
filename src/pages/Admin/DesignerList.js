import React, { Component } from 'react';
import firebase from '../../config/Firebase';
import Designer from '../../components/Admin/Designer';

class DesignerList extends Component {
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
          user => user.isD === true
        );

        await this.setState({
          designers,
          madeRequest: true
        });
      });
  };

  render() {
    if (this.state.madeRequest) {
      const DesignerList = this.state.designers.map((designer, key) => (
        <Designer
          designer={designer}
          key={key}
          handleInputChange={this.handleInputChange}
        />
      ));
      console.log(DesignerList);

      return (
        <div>
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
                <th>패널티 관리</th>
              </tr>
            </thead>
            <tbody>{DesignerList}</tbody>
          </table>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default DesignerList;
