import React, { Component, Fragment } from 'react';
import { Modal } from 'reactstrap';
import DaumPostcode from 'react-daum-postcode';
import ImgPreview from './ImgPreview';
import './InfoForm.css';

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
    const { inputTextStyle, addressButtonStyle } = styles;
    let addressSelector = [];
    for (let i = 0; i < this.props.state.addressNum; i++) {
      addressSelector.push(
        <div key={i}>
          <input
            onClick={() => this.addressModalToggle(i)}
            style={{ ...inputTextStyle, width: '100%', marginBottom: '2%' }}
            type="text"
            name="address"
            id={i}
            placeholder="클릭하여 주소를 검색해주세요."
            value={
              this.props.state.addresses[i] &&
              this.props.state.addresses[i].fullAddress
            }
          />
          <input
            style={{ ...inputTextStyle, width: '80%', marginBottom: '2%' }}
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
          <div
            style={addressButtonStyle}
            onClick={() => this.props.addressRemoveHandler(i)}
          >
            삭제
          </div>
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
    const {
      containerStyle,
      labelStyle,
      inputTextStyle,
      calendarStyle,
      addressButtonStyle,
      yearMonthStyle,
      textareaStyle,
      defaultInputFileDisplayNone,
      fileAttachingContainerStyle,
      fileAttachingInputStyle,
      ImgPreviewStyle
    } = styles;

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
      <div>
        <select
          style={calendarStyle}
          name="year"
          value={userData.year}
          onChange={this.props.changeInput}
        >
          {y}
        </select>
        <select
          style={calendarStyle}
          name="month"
          value={userData.month}
          onChange={this.props.changeInput}
        >
          {m}
        </select>
        <select
          style={calendarStyle}
          name="day"
          value={userData.day}
          onChange={this.props.changeInput}
        >
          {d}
        </select>
      </div>
    );

    let cert1, cert2;
    if (userData.certImg1)
      cert1 = <ImgPreview style={ImgPreviewStyle} url={userData.certImg1} />;
    else
      cert1 = (
        <Fragment>
          <span>미용사 면허증</span>
          <span style={{ fontSize: '2rem' }}>+</span>
        </Fragment>
      );
    if (userData.certImg2)
      cert2 = <ImgPreview style={ImgPreviewStyle} url={userData.certImg2} />;
    else
      cert2 = (
        <Fragment>
          <span>미용사 자격증</span>
          <span style={{ fontSize: '2rem' }}>+</span>
        </Fragment>
      );

    return (
      <Fragment>
        <div style={containerStyle}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '70%', marginRight: '5%' }}>
              <div style={labelStyle}>성명</div>
              <input
                style={{ ...inputTextStyle, width: '100%' }}
                type="text"
                name="name"
                id="name"
                onChange={this.props.changeInput}
                value={userData.name}
              />
            </div>
            <div style={{ width: '25%' }}>
              <div style={labelStyle}>성별</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label
                  for="infoform-male"
                  className="infoform-male"
                  style={
                    this.props.state.gender === 'male'
                      ? { borderColor: '#4c91ba', fontWeight: 'bold' }
                      : { color: 'rbga(0,0,0,0.2)' }
                  }
                >
                  <input
                    style={{ display: 'none' }}
                    type="radio"
                    name="gender"
                    id="infoform-male"
                    onChange={this.props.changeInput}
                    value="male"
                  />
                  <div>남</div>
                </label>
                <label
                  for="infoform-female"
                  className="infoform-female"
                  style={
                    this.props.state.gender === 'female'
                      ? { borderColor: '#4c91ba', fontWeight: 'bold' }
                      : { color: 'rgba(0,0,0,0.2)' }
                  }
                >
                  <input
                    style={{ display: 'none' }}
                    type="radio"
                    name="gender"
                    id="infoform-female"
                    onChange={this.props.changeInput}
                    value="female"
                  />
                  <div>여</div>
                </label>
              </div>
            </div>
          </div>
          <div style={labelStyle}>이메일 주소</div>
          <input
            style={inputTextStyle}
            type="text"
            name="email"
            id="email"
            onChange={this.props.changeInput}
            value={userData.email}
          />
          <div style={labelStyle}>생년월일</div>
          {calendar}
          <div style={labelStyle}>전화번호</div>
          <div style={{ display: 'flex' }}>
            <input
              style={{ ...inputTextStyle, width: '78.7%' }}
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              onChange={this.props.changeInput}
              value={userData.phoneNumber}
            />
            {this.props.isRegister}
          </div>
          <div style={labelStyle}>샵주소</div>
          {this.addressSelector()}
          <div
            style={{
              ...addressButtonStyle,
              marginLeft: 0,
              marginTop: '0.5rem',
              width: '100%',
              backgroundColor: 'white',
              border: '1px solid #4c91ba',
              color: '#4c91ba'
            }}
            onClick={() => this.props.addressAddHandler()}
          >
            + 샵주소 추가하기
          </div>
          <div style={labelStyle}>디자이너까지 남은 기간</div>
          <div style={yearMonthStyle}>
            <input
              style={{ ...inputTextStyle, width: '30%', margin: '0 2% 0 3%' }}
              type="number"
              name="dYear"
              id="dYear"
              onChange={this.props.changeInput}
              value={Math.floor(userData.untilDesigner / 12)}
              placeholder="0"
            />
            년
            <input
              style={{ ...inputTextStyle, width: '30%', margin: '0 2% 0 3%' }}
              type="number"
              name="dMonth"
              id="dMonth"
              onChange={this.props.changeInput}
              value={userData.untilDesigner % 12}
              placeholder="0"
            />
            개월
          </div>
          <div style={labelStyle}>미용 경력</div>
          <div style={yearMonthStyle}>
            <input
              style={{ ...inputTextStyle, width: '30%', margin: '0 2% 0 3%' }}
              type="number"
              name="careerYear"
              id="careerYear"
              onChange={this.props.changeInput}
              value={Math.floor(userData.career / 12)}
              placeholder="0"
            />
            년
            <input
              style={{ ...inputTextStyle, width: '30%', margin: '0 2% 0 3%' }}
              type="number"
              name="careerMonth"
              id="careerMonth"
              onChange={this.props.changeInput}
              value={userData.career % 12}
              placeholder="0"
            />
            개월
          </div>
          <div style={labelStyle}>이력</div>
          <textarea
            style={textareaStyle}
            name="careerDetail"
            id="careerDetail"
            placeholder="최신순으로 작성해주세요.&#13;&#10;예시)&#13;&#10;- 2018/08 ㅇㅇlevel2 취득&#13;&#10;- 2017/06 미용사 면허증 취득&#13;&#10;- 2017/03 ㅇㅇ대학교 미용예술학과 졸"
            onChange={this.props.changeInput}
            value={userData.careerDetail}
          />

          <div style={labelStyle}>면허증/자격증</div>
          <div style={fileAttachingContainerStyle}>
            <label style={{ width: '47%', marginRight: '6%' }} for="cert1">
              <input
                style={defaultInputFileDisplayNone}
                id="cert1"
                type="file"
                name="cert1"
                onChange={this.props.handleImgChange}
              />
              <div style={fileAttachingInputStyle}>{cert1}</div>
            </label>
            <label style={{ width: '47%' }} for="cert2">
              <input
                style={defaultInputFileDisplayNone}
                id="cert2"
                type="file"
                name="cert2"
                onChange={this.props.handleImgChange}
              />
              <div style={fileAttachingInputStyle}>{cert2}</div>
            </label>
          </div>
          <div style={{ fontSize: '1.1rem', color: '#1f3354' }}>
            취득한것만 올려주시면 됩니다.
            <br />
            드리머리 막내 승인 여부에 사용되며 외부에 공개되지 않습니다.
          </div>
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

const styles = {
  containerStyle: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  labelStyle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#1e3354',
    marginTop: '1.5rem',
    marginBottom: '0.2rem'
  },
  inputTextStyle: {
    fontSize: '1.3rem',
    color: '#1f3354',
    padding: '0.7rem',
    borderRadius: '5px',
    border: 'solid 1px rgba(0, 0, 0, 0.1)'
  },
  calendarStyle: {
    width: '30%',
    fontSize: '1.3rem',
    color: '#1f3354',
    marginRight: '3.3%',
    padding: '0.7rem',
    paddingTop: '0.5rem',
    backgroundImage:
      'linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%)',
    backgroundPosition:
      'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)',
    backgroundSize: '5px 5px, 5px 5px',
    backgroundRepeat: 'no-repeat'
  },
  addressButtonStyle: {
    display: 'inline-block',
    width: '16%',
    marginLeft: '3.3%',
    padding: '2.3%',
    border: '1px solid #dd6866',
    backgroundColor: '#dd6866',
    borderRadius: '5px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.3rem',
    textAlign: 'center'
  },
  yearMonthStyle: {
    fontSize: '1.4rem'
  },
  textareaStyle: {
    fontSize: '1.3rem',
    height: 134,
    borderRadius: 5,
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    padding: '1rem'
  },
  defaultInputFileDisplayNone: {
    display: 'none'
  },
  fileAttachingContainerStyle: {
    display: 'flex',
    justifyContent: 'center'
  },
  fileAttachingInputStyle: {
    height: 134,
    borderRadius: 5,
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    fontSize: '1.3rem',
    color: 'rgba(0, 0, 0, 0.2',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  ImgPreviewStyle: {
    maxWidth: '100%',
    maxHeight: '100%'
  }
};

export default InfoForm;
