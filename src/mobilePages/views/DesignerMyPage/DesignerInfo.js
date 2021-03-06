import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../config/Axios';
import fd from 'form-data';
import firebase from '../../../config/Firebase';

import InfoForm from '../../components/InfoForm/InfoForm';
import ExtraInfoForm from '../../components/InfoForm/ExtraInfoForm';
import DesignerNav from '../../components/NavigationBar/DesignerNav';

import Spinner from '../../../assets/images/loading_spinner.gif';

class DesignerInfo extends Component {
  constructor(props) {
    super(props);
    // redux에서 유저 정보 추출 후, state에 담기
    // const { portfolios } = this.props.userData;
    // for (let i = 0; this.props.userData[`portfolio${i}`]; i++) {
    //   portfolios.push(this.props.userData[`portfolio${i}`]);
    // }
    let {
      name,
      gender,
      birthday,
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      addresses,
      designerRecommendationCode,
      profile,
      cert_mh,
      cert_jg,
      isRegister,
      introduce,
      portfolios
    } = this.props.userData;
    if (!addresses) addresses = [];
    this.state = {
      name,
      gender,
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      year: birthday && birthday.year,
      month: birthday && birthday.month,
      day: birthday && birthday.day,
      profileImg: profile,
      profileFile: null,
      certImg1: cert_mh,
      certFile1: null,
      certImg2: cert_jg,
      certFile2: null,
      portfolioImg: portfolios || [],
      portfolioFile: [],
      num: portfolios ? portfolios.length : 0,
      realFileNum: 0,
      addressNum: addresses.length + 1,
      addresses,
      designerRecommendationCode,
      portfoliosNum: portfolios ? portfolios.length : 0,
      isRegister,
      portfolios: portfolios || [],
      introduce,
      submitLoading: true
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
  dYear = 0;
  dMonth = 0;
  careerYear = 0;
  careerMonth = 0;
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
      case 'profileImg':
        this.setState({ profileImg: URL.createObjectURL(file) });
        this.setState({ profileFile: file });
        break;
      case 'portfolio':
        this.state.portfolioImg.push(URL.createObjectURL(file));
        this.state.portfolioFile.push(file);
        this.setState({
          num: this.state.num + 1,
          realFileNum: this.state.realFileNum + 1
        });
        break;
      default:
        console.log('something wrong in [DesignerInfo.js]');
    }
  };
  deletePortfolio = async e => {
    let foundFile = this.state.portfolioImg.findIndex(
      url => url === e.target.src
    );

    let tempIndex = foundFile - (this.state.num - this.state.realFileNum);
    if (tempIndex >= 0) {
      this.state.portfolioImg.splice(foundFile, 1);
      this.state.portfolioFile.splice(tempIndex, 1);
      this.setState({ realFileNum: this.state.realFileNum - 1 });
    } else {
      if (window.confirm('해당 포트폴리오가 바로 삭제됩니다!!')) {
        const remove = this.state.portfolioImg.splice(foundFile, 1)[0];
        try {
          firebase
            .database()
            .ref(`/users/${this.props.userData.uid}`)
            .once('value')
            .then(snapshot => {
              let { portfolios } = snapshot.val();
              portfolios = portfolios.filter(url => url !== remove);
              firebase
                .database()
                .ref(`/users/${this.props.userData.uid}`)
                .update({ portfolios });
            });
        } catch (e) {
          console.log(e);
        }
      }
    }
    this.setState({ num: this.state.num - 1 });
  };

  // 최종 제출
  submitHandler = async () => {
    const {
      name,
      gender,
      year,
      month,
      day,
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      addresses,
      introduce,
      designerRecommendationCode,
      isRegister
    } = this.state;

    let firebaseUserData = {
      name,
      gender,
      birthday: { year, month, day },
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      addresses,
      introduce,
      isRegister
    };

    // if (
    //   Object.values(firebaseUserData).includes(undefined) ||
    //   addresses.length === 0
    // )
    //   return alert('채워지지 않은 정보가 있습니다');

    if (!firebaseUserData.name) return alert('이름을 작성해주세요');
    if (!firebaseUserData.gender) return alert('성별을 작성해주세요');
    if (!firebaseUserData.email) return alert('이메일을 작성해주세요');
    if (
      Object.values(firebaseUserData.birthday).includes('null') ||
      Object.values(firebaseUserData.birthday).includes(undefined)
    )
      return alert('생년월일을 작성해주세요');
    if (!firebaseUserData.phoneNumber)
      return alert('휴대폰 번호를 작성해주세요');
    if (firebaseUserData.phoneNumber.length !== 11)
      return alert('정확한 휴대폰 번호를 입력해주세요');
    if (!this.state.isRegister) return alert('휴대폰 인증을 먼저 해주세요');
    if (!Object.values(firebaseUserData.addresses).length)
      return alert('지역/샵주소를 작성해주세요');
    if (
      !firebaseUserData.addresses[0].fullAddress ||
      !firebaseUserData.addresses[0].extraAddress
    )
      if (!firebaseUserData.untilDesigner)
        return alert('디자이너까지 남은 기간을 작성해주세요');
    if (!firebaseUserData.career) return alert('미용 경력을 작성해주세요');
    if (!firebaseUserData.introduce) return alert('자기 소개를 작성해주세요');

    this.setState({ submitLoading: false });
    window.scrollTo(0, 0);
    // 추천인 로직
    // 전에 추천인을 입력한 적이 없고, 추천인을 작성했을 때,
    if (
      designerRecommendationCode &&
      !this.props.userData.designerRecommendationCode
    ) {
      let count = 0;
      let result = null;

      // 유효한 추천인 코드인지 확인
      const fbPromise = new Promise(resolve => {
        firebase
          .database()
          .ref('users/' + designerRecommendationCode)
          .on('value', res => {
            if (res.val()) resolve(res);
            else resolve(false);
          });
      });
      result = await fbPromise;
      // 유효하지 않은 추천인 코드일 때,
      if (!result || designerRecommendationCode == this.props.userData.uid)
        alert('유효하지 않은 추천인 코드 입니다.');
      // 유효한 추천인 코드일 때,
      else {
        let { designerRecommendation, _id, isD } = result.val();
        if (!isD)
          return alert(
            '예비 디자이너는 일반 유저를 추천인으로 작성할 수 없습니다!'
          );
        if (designerRecommendation) count = designerRecommendation;
        firebaseUserData = { ...firebaseUserData, designerRecommendationCode };
        count += 1;

        if (count !== 0 && count % 2 === 0) {
          await axios.post(`users/${_id}/tickets`, {
            price: 10000
          });
        }

        // 추천받은 횟수 저장
        await firebase
          .database()
          .ref('users/' + designerRecommendationCode)
          .update({ designerRecommendation: count });
      }
    }
    // else if (
    //   designerRecommendationCode &&
    //   this.props.userData.designerRecommendationCode
    // ) {
    //   alert('추천인 코드는 한번만 작성할 수 있습니다.');
    // }

    try {
      // 최종 유저정보 저장
      await firebase
        .database()
        .ref('users/' + this.props.userData.uid)
        .update(firebaseUserData);

      await axios.patch(`users/${this.props.userData._id}`, { name });

      //img 업로드
      const formData = new fd();
      formData.append('cert_mh', this.state.certFile1);
      formData.append('cert_jg', this.state.certFile2);
      formData.append('profile', this.state.profileFile);
      this.state.portfolioFile.forEach((p, index) => {
        formData.append(`portfolio${index + this.state.portfoliosNum}`, p);
      });
      await axios.post(
        `firebase/upload?uid=${this.props.userData.uid}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      alert('성공적으로 신청되었습니다. \n스케줄 등록으로 이동합니다.');
      this.props.history.push('schedule');
    } catch (err) {
      alert('문제가 발생했습니다. 잠시 뒤에 다시 시도해주세요.');
    }
    this.setState({ submitLoading: true });
  };

  render() {
    const {
      subtitleStyle,
      titleStyle,
      containerStyle,
      labelStyle,
      inputTextStyle,
      buttonStyle,
      phoneButtonStyle
    } = styles;

    let isRegister;
    if (!this.state.isRegister) {
      isRegister = (
        <div onClick={this.phoneCert} style={phoneButtonStyle}>
          인증
        </div>
      );
    } else {
      isRegister = (
        <div
          style={{
            ...phoneButtonStyle,
            backgroundColor: 'transparent',
            color: '#66ce82',
            border: 'solid 1px #66ce82'
          }}
        >
          인증됨
        </div>
      );
    }

    if (this.state.submitLoading) {
      return (
        <div className="m_containerStyle">
          <DesignerNav />
          <div style={containerStyle}>
            <div style={titleStyle}>회원 정보 관리</div>
            <div style={subtitleStyle}>회원 정보 수정</div>
          </div>
          <InfoForm
            state={this.state}
            changeInput={e => this.handleInputChange(e)}
            handleAddress={this.handleAddress}
            addressAddHandler={this.addressAddHandler}
            addressRemoveHandler={this.addressRemoveHandler}
            handleImgChange={this.handleImgChange}
            isRegister={isRegister}
          />
          <ExtraInfoForm
            state={this.state}
            changeInput={e => this.handleInputChange(e)}
            handleImgChange={e => this.handleImgChange(e)}
            deletePortfolio={e => this.deletePortfolio(e)}
          />
          <div style={containerStyle}>
            <div style={labelStyle}>인 코드</div>
            <input
              style={
                this.props.userData.designerRecommendationCode
                  ? {
                      ...inputTextStyle,
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      color: 'rgba(0,0,0,0.5)'
                    }
                  : inputTextStyle
              }
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
            <div
              style={{
                ...labelStyle,
                fontWeight: 'normal',
                marginTop: '0.3rem'
              }}
            >
              친구 2명이 내 추천인 코드 입력할 때마다 1달 이용권 무료 지급!
              주변에 내 추천인 코드를 알리세요.
            </div>
            <div
              style={{
                ...labelStyle,
                fontWeight: 'normal',
                marginTop: '0.3rem'
              }}
            >
              내 추천인 코드: {this.props.userData.uid}
            </div>
            <div style={buttonStyle} onClick={this.submitHandler}>
              예디 정보 수정하기
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{ height: '100vh', width: '100%' }}
          className="d-flex justify-content-center align-items-center"
        >
          <img alt="alt" style={{ height: '20%' }} src={Spinner} />
        </div>
      );
    }
  }
}

const styles = {
  titleStyle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#4c91ba',
    textAlign: 'left',
    margin: '33.5px 0',
    paddingBottom: '6.9px',
    borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)'
  },
  subtitleStyle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1f3354'
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
  },
  phoneButtonStyle: {
    display: 'inline-block',
    width: '18%',
    marginLeft: '3.3%',
    padding: '2.3%',
    border: '1px solid #dd6866',
    backgroundColor: '#dd6866',
    borderRadius: '5px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.3rem',
    textAlign: 'center'
  }
};

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(mapStateToProps)(DesignerInfo);
