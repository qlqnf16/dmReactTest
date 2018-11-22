import React, { Component } from 'react';
import Moment from 'react-moment';
import firebase from '../../config/Firebase';
class Designer extends Component {
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

  penaltySubmit = async uid => {
    await firebase
      .database()
      .ref('users/' + uid)
      .update({
        penalty: this.state.penalty
      });
    alert('수정되었습니다');
  };

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  render() {
    const designer = this.props.designer;
    let addresses = [];
    let shops = [];
    designer.addresses &&
      designer.addresses.forEach(address => {
        let sido = address.sido;
        let sigungu = address.sigungu;
        addresses.push({ sido, sigungu });

        shops.push(address.extraAddress);
      });
    return (
      <tr key={this.props.key}>
        <th scope="row">
          {designer._recruit === undefined ? (
            <div>
              <div>{designer.name}</div>
              <div>{designer._id}</div>
            </div>
          ) : (
            <div>
              <a href={`/#/designerdetail/${designer._recruit}`}>
                {designer.name}
              </a>
              <div>{designer._id}</div>
            </div>
          )}
        </th>
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
          <a href={designer.profile}>프로필</a>
        </td>
        <td>
          <a href={designer.cert_jg}>자격증</a>
        </td>
        <td>
          <a href={designer.cert_mh}>면허증</a>
        </td>
        <td>
          <select
            className="w-75"
            onChange={this.handleInputChange}
            name="penalty"
            value={this.state.penalty}
          >
            <option value="0">패널티 없음</option>
            <option value="1">1회 취소</option>
            <option value="2">2회 취소</option>
            <option value="3">3회 이상 취소(이용 정지)</option>
          </select>
          <button
            onClick={() => this.penaltySubmit(designer.uid)}
            className="btn-sm"
          >
            수정
          </button>
        </td>
      </tr>
    );
  }
}

export default Designer;
