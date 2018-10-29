import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import fd from 'form-data';
import firebase from '../../config/Firebase';

import InfoForm from '../components/InfoForm/InfoForm';

class AddDesigner extends Component {
  constructor(props) {
    super(props);
    // redux에서 유저 정보 추출 후, state에 담기
    let {
      name,
      birthday,
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      addresses,
      designerRecommendationCode
    } = this.props.userData;
    if (!addresses) addresses = [];
    this.state = {
      name,
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      year: birthday && birthday.year,
      month: birthday && birthday.month,
      day: birthday && birthday.day,
      certImg1: null,
      certFile1: null,
      certImg2: null,
      certFile2: null,
      addressNum: addresses.length + 1,
      addresses,
      designerRecommendationCode
    };
  }

  // 주소 입력받기
  addressAddHandler = () => {
    this.setState({ addressNum: this.state.addressNum + 1 });
  };
  addressRemoveHandler = i => {
    let { addresses } = this.state;
    addresses.splice(i, 1);
    this.setState({ addressNum: this.state.addressNum - 1, addresses });
  };
  handleAddress = (data, fullAddress, num) => {
    const { sido, sigungu } = data;
    const address = { sido, sigungu, fullAddress };
    let { addresses } = this.state;
    addresses[num] = address;
    this.setState({ addresses });
  };

  // input
  handleInputChange = e => {
    const { value, name, id } = e.target;

    if (id === 'dYear' || id === 'dMonth') {
      if (id === 'dYear') this.dYear = Number(value);
      else if (id === 'dMonth') this.dMonth = Number(value);

      this.setState({ untilDesigner: this.dYear * 12 + this.dMonth });
    } else if (id === 'careerYear' || id === 'careerMonth') {
      if (id === 'careerYear') this.careerYear = Number(value);
      else if (id === 'careerMonth') this.careerMonth = Number(value);

      this.setState({ career: this.careerYear * 12 + this.careerMonth });
    } else if (name === 'extraAddress') {
      let { addresses } = this.state;
      let address = addresses[id];
      addresses[id] = { ...address, extraAddress: value };

      this.setState({ addresses });
    } else {
      this.setState({ [name]: value });
    }
  };

  // image입력받기
  handleImgChange = e => {
    let file = e.target.files[0];
    switch (e.target.name) {
      case 'cert1':
        this.setState({ certImg1: URL.createObjectURL(file) });
        this.setState({ certFile1: file });
        break;
      case 'cert2':
        this.setState({ certImg2: URL.createObjectURL(file) });
        this.setState({ certFile2: file });
        break;
      default:
        console.log('something wrong in [DesignerInfo.js]');
    }
    console.log(this.state);
  };

  // 최종 제출
  submitHandler = async () => {
    const {
      name,
      year,
      month,
      day,
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      addresses,
      designerRecommendationCode
    } = this.state;

    let firebaseUserData = {
      name,
      birthday: { year, month, day },
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      addresses,
      isApproval: false
    };

    if (
      Object.values(firebaseUserData).includes(undefined) ||
      addresses.length === 0
    )
      return alert('채워지지 않은 정보가 있습니다');

    // 추천인 로직
    // 전에 추천인을 입력한 적이 없고, 추천인을 작성했을 때,
    if (
      designerRecommendationCode &&
      !this.props.userData.designerRecommendationCode
    ) {
      let count = 0;
      let result = null;

      // 유효한 추천인 코드인지 확인
      await firebase
        .database()
        .ref('users/' + designerRecommendationCode)
        .on('value', res => {
          result = res;
        });

      // 유효하지 않은 추천인 코드일 때,
      if (!result || designerRecommendationCode === this.props.userData.uid)
        alert('유효하지 않은 추천인 코드 입니다.');
      // 유효한 추천인 코드일 때,
      else {
        let { designerRecommendation, _id } = result.val();
        if (designerRecommendation) count = designerRecommendation;
        firebaseUserData = { ...firebaseUserData, designerRecommendationCode };
        count += 1;

        // TODO : 추천2회면 티켓 추가
        if (count === 2) {
          count = 0;
          // await axios.patch(
          //   `http://52.79.227.227:3030/users/${_id}`,
          //   {
          //     ticket: 더하기(백에서 하는게 나을듯)
          //   }
          // );
        }

        // 추천받은 횟수 저장
        await firebase
          .database()
          .ref('users/' + designerRecommendationCode)
          .update({ designerRecommendation: count });
      }
    }
    // 최종 유저정보 저장
    await firebase
      .database()
      .ref('users/' + this.props.userData.uid)
      .update(firebaseUserData);
    alert('성공적으로 신청되었습니다');

    // img 업로드
    const formData = new fd();
    formData.append('cert_mh', this.state.certFile1);
    formData.append('cert_jg', this.state.certFile2);
    await axios.post(
      `http://localhost:3030/firebase/upload?uid=${this.props.userData.uid}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    // await this.props.history.push('/designer/whydreamary');
  };

  render() {
    const {
      subtitleStyle,
      titleStyle,
      containerStyle,
      labelStyle,
      inputTextStyle,
      buttonStyle
    } = styles;
    return (
      <Fragment>
        <div className="m_containerStyle">
          <div style={containerStyle}>
            <div style={subtitleStyle}>예비 디자이너 등록</div>
            <div style={titleStyle}>
              드리머리 막내가 되어
              <br />
              모델을 구해보세요
            </div>
          </div>
          <InfoForm
            state={this.state}
            changeInput={e => this.handleInputChange(e)}
            handleAddress={this.handleAddress}
            addressAddHandler={this.addressAddHandler}
            addressRemoveHandler={this.addressRemoveHandler}
            handleImgChange={e => this.handleImgChange(e)}
          />
          <div style={containerStyle}>
            <div style={labelStyle}>추천인 코드 </div>
            <input
              style={inputTextStyle}
              type="text"
              name="designerRecommendationCode"
              id="designerRecommendationCode"
              value={this.state.designerRecommendationCode}
              onChange={
                this.props.userData.designerRecommendationCode
                  ? null
                  : e => this.handleInputChange(e)
              }
            />
            <div style={buttonStyle} onClick={this.submitHandler}>
              예디 등록하기
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const styles = {
  subtitleStyle: {
    fontSize: '1.3rem',
    color: '#4c91ba',
    marginTop: '5%'
  },
  titleStyle: {
    fontSize: '2.3rem',
    fontWeight: 'bold',
    color: '#4c91ba',
    marginBottom: '5%'
  },
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
  buttonStyle: {
    height: '3.9rem',
    color: 'white',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginTop: '2.5rem',
    marginBottom: '4rem',
    borderRadius: 6,
    backgroundColor: '#4c91ba',
    textAlign: 'center',
    lineHeight: '3.9rem'
  }
};

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(mapStateToProps)(AddDesigner);
