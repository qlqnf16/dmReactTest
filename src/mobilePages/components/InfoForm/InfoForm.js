import React, { Component, Fragment } from 'react';
import { Modal } from 'reactstrap';
import DaumPostcode from 'react-daum-postcode';

class InfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressModal: false,
      addressNum: 0
    };
  }

  addressModalToggle = i => {
    this.setState({
      addressModal: !this.state.addressModal,
      addressNum: i
    });
  };

  addressSelector = () => {
    let addressSelector = [];
    for (let i = 0; i < this.props.state.addressNum; i++) {
      addressSelector.push(
        <div key={i}>
          <div onClick={() => this.addressModalToggle(i)}>검색</div>
          <input
            type="text"
            name="address"
            id={i}
            placeholder="샵 주소"
            value={
              this.props.state.addresses[i] &&
              this.props.state.addresses[i].fullAddress
            }
          />
          <input
            type="text"
            name="extraAddress"
            id={i}
            placeholder="샵 상세주소(ex. 준오헤어 청담점)"
            value={
              this.props.state.addresses[i] &&
              this.props.state.addresses[i].extraAddress
            }
            onChange={this.props.changeInput}
          />
          <div onClick={() => this.props.addressRemoveHandler(i)}>-</div>
        </div>
      );
    }
    return addressSelector;
  };

  handleAddress = data => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    this.props.handleAddress(data, fullAddress, this.state.addressNum);
    this.addressModalToggle(this.state.addressNum);
  };

  render() {
    const userData = this.props.state;

    let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let day = [];
    let year = [];
    for (let i = 1; i < 32; i++) {
      day.push(i);
    }
    for (let i = 2018; i > 1920; i--) {
      year.push(i);
    }
    if (userData && userData.month) {
      if (['4', '6', '9', '11'].includes(userData.month)) {
        day.pop();
      } else if (userData.month === '2') {
        if (Number(userData.year) % 4 === 0) {
          day.splice(29, 2);
        } else {
          day.splice(28, 3);
        }
      }
    }
    let m = month.map((m, key) => (
      <option key={key} value={m}>
        {m}월
      </option>
    ));
    let d = day.map((d, key) => (
      <option key={key} value={d}>
        {d}일
      </option>
    ));
    let y = year.map((y, key) => (
      <option key={key} value={y}>
        {y}년
      </option>
    ));

    let calendar = (
      <div className="row m-0">
        <select
          name="year"
          value={userData.year}
          onChange={this.props.changeInput}
        >
          {y}
        </select>
        <select
          name="month"
          value={userData.month}
          onChange={this.props.changeInput}
        >
          {m}
        </select>
        <select
          name="day"
          value={userData.day}
          onChange={this.props.changeInput}
        >
          {d}
        </select>
      </div>
    );

    return (
      <Fragment>
        <div>
          <div>성명</div>
          <input
            type="text"
            name="name"
            id="name"
            onChange={this.props.changeInput}
            value={userData.name}
          />
          <div>이메일 주소</div>
          <input
            type="text"
            name="email"
            id="email"
            onChange={this.props.changeInput}
            value={userData.email}
          />
          <div>생년월일</div>
          {calendar}
          <div>전화번호</div>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            onChange={this.props.changeInput}
            value={userData.phoneNumber}
          />
          <div>샵주소</div>
          {this.addressSelector()}
          <div onClick={() => this.props.addressAddHandler()}>주소 추가</div>
          <div>디자이너까지 남은 기간</div>
          <input
            type="number"
            name="dYear"
            id="dYear"
            onChange={this.props.changeInput}
            value={Math.floor(userData.untilDesigner / 12)}
            placeholder="0"
          />
          년
          <input
            type="number"
            name="dMonth"
            id="dMonth"
            onChange={this.props.changeInput}
            value={userData.untilDesigner % 12}
            placeholder="0"
          />{' '}
          개월
          <div>미용 경력</div>
          <input
            type="number"
            name="careerYear"
            id="careerYear"
            onChange={this.props.changeInput}
            value={Math.floor(userData.career / 12)}
            placeholder="0"
          />{' '}
          년
          <input
            type="number"
            name="careerMonth"
            id="careerMonth"
            onChange={this.props.changeInput}
            value={userData.career % 12}
            placeholder="0"
          />{' '}
          개월
          <div>이력</div>
          <textarea
            name="careerDetail"
            id="careerDetail"
            placeholder="줄바꿈을 해야하는데 줄바꿈이 안되네&#13;&#10;
            운장이가 해주겠지"
            onChange={this.props.changeInput}
            value={userData.careerDetail}
          />
          <div>면허증/자격증</div>
          <input type="file" name="cert1" />
          <input type="file" name="cert2" />
        </div>
        <Modal
          centered
          isOpen={this.state.addressModal}
          toggle={() => this.addressModalToggle(this.state.addressNum)}
        >
          <DaumPostcode onComplete={this.handleAddress} autoClose={true} />
        </Modal>
      </Fragment>
    );
  }
}

export default InfoForm;
