import React, { Component } from "react";
import Moment from "react-moment";
import firebase from "../../config/Firebase";
class WaitDesigner extends Component {
  state = {
    penalty: null,
    madeRequest: false
  };
  componentDidMount = () => {
    if (!this.state.madeRequest) {
      this.setState({
        penalty: this.props.designer.penalty,
        madeRequest: true
      });
    }
  };

  approvalSubmit = async uid => {
    await firebase
      .database()
      .ref("users/" + uid)
      .update({
        isD: true,
        isApproval: true
      });
    await alert("승인되었습니다");
  };

  render() {
    const designer = this.props.designer;
    return (
      <tr key={this.props.key}>
        <th scope="row">{designer.name}</th>
        <td>{designer.email}</td>
        <td>{designer.region}</td>
        <td>{designer.shop}</td>
        <td>
          {Math.floor(designer.career / 12) === 0
            ? ""
            : `${Math.floor(designer.career / 12)}년`}
          {designer.career % 12 === 0 ? "" : `${designer.career % 12}개월`}
        </td>
        <td>
          {Math.floor(designer.untilDesigner / 12) === 0
            ? ""
            : `${Math.floor(designer.untilDesigner / 12)}년`}
          {designer.untilDesigner % 12 === 0
            ? ""
            : `${designer.untilDesigner % 12}개월`}
        </td>
        <td>{designer.phoneNumber}</td>
        <td>
          <Moment format="YYYY/MM/DD">{designer.joinedDate}</Moment>
        </td>
        <td>
          <a href={designer.cert_mh}>프로필</a>
        </td>
        <td>
          <a href={designer.cert_jg}>자격증</a>
        </td>
        <td>
          <button
            onClick={() => this.approvalSubmit(designer.uid)}
            className="btn-sm"
          >
            승인
          </button>
        </td>
      </tr>
    );
  }
}

export default WaitDesigner;
