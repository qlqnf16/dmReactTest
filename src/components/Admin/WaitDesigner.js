import React, { Component } from 'react';
import Moment from 'react-moment';
import firebase from '../../config/Firebase';
import axios from '../../config/Axios';
class WaitDesigner extends Component {
  approvalSubmit = async uid => {
    await axios.post(`users/${this.props.designer._id}/tickets`, {
      price: 28000
    });
    await firebase
      .database()
      .ref('users/' + uid)
      .update({
        isD: true,
        isApproval: true
      });

    alert('승인되었습니다');
  };
  noApprovalSubmit = async uid => {
    await firebase
      .database()
      .ref('users/' + uid)
      .update({
        isApproval: '미승인'
      });

    alert('미승인되었습니다');
  };

  render() {
    const designer = this.props.designer;
    let addresses = [];
    let shops = [];
    designer.addresses.forEach(address => {
      let sido = address.sido;
      let sigungu = address.sigungu;
      addresses.push({ sido, sigungu });

      shops.push(address.extraAddress);
    });
    return (
      <tr key={this.props.key}>
        <th scope="row">{designer.name}</th>
        <td>{designer.email}</td>
        <td>
          {addresses.map((address, key) => (
            <p key={key}>
              {address.sido} / {address.sigungu}
            </p>
          ))}
        </td>

        <td>
          {shops.map((shop, key) => (
            <p key={key}>{shop}</p>
          ))}
        </td>
        <td>
          {Math.floor(designer.career / 12) === 0
            ? ''
            : `${Math.floor(designer.career / 12)}년`}
          {designer.career % 12 === 0 ? '' : `${designer.career % 12}개월`}
        </td>
        <td>
          {Math.floor(designer.untilDesigner / 12) === 0
            ? ''
            : `${Math.floor(designer.untilDesigner / 12)}년`}
          {designer.untilDesigner % 12 === 0
            ? ''
            : `${designer.untilDesigner % 12}개월`}
        </td>
        <td>{designer.phoneNumber}</td>
        <td>
          <Moment format="YYYY/MM/DD">{designer.joinedDate}</Moment>
        </td>
        <td>
          <a href={designer.cert_jg}>자격증</a>
        </td>
        <td>
          <a href={designer.cert_mh}>면허증</a>
        </td>
        <td>
          <button
            onClick={() => this.approvalSubmit(designer.uid)}
            className="btn-sm"
          >
            승인
          </button>
        </td>
        <td>
          <button
            onClick={() => this.noAprovalSubmit(designer.uid)}
            className="btn-sm"
          >
            미승인
          </button>
        </td>
      </tr>
    );
  }
}

export default WaitDesigner;
