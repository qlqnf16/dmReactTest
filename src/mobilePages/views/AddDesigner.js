import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from '../../config/Axios';
import fd from 'form-data';
import firebase from '../../config/Firebase';

import InfoForm from '../components/InfoForm/InfoForm';
import ExtraInfoForm from '../components/InfoForm/ExtraInfoForm';

import Spinner from '../../assets/images/loading_spinner.gif';

class AddDesigner extends Component {
  constructor(props) {
    super(props);
    // redux에서 유저 정보 추출 후, state에 담기
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
      cert_mh,
      cert_jg,
      isRegister,
      profile,
      introduce,
      portfolios,
      yeinbub
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
      certImg1: cert_mh,
      certFile1: null,
      certImg2: cert_jg,
      certFile2: null,
      addressNum: addresses.length + 1,
      addresses,
      designerRecommendationCode,
      isRegister,
      profileImg: profile,
      profileFile: null,
      portfolioImg: portfolios || [],
      portfolioFile: [],
      num: portfolios ? portfolios.length : 0,
      realFileNum: 0,
      portfolios,
      portfoliosNum: portfolios ? portfolios.length : 0,
      introduce,
      submitLoading: true,
      yeinbub
    };
  }
  componentDidMount = async () => {
    if (this.props.userData.isApproval === false && !this.props.userData.isD)
      alert('예비디자이너 승인 대기중입니다.');

    // iamport 사용하기 위한 inline script 작성
    let links = [
      'https://code.jquery.com/jquery-1.12.4.min.js',
      'https://cdn.iamport.kr/js/iamport.payment-1.1.5.js'
    ];

    for (let link of links) {
      const script = document.createElement('script');

      script.src = link;
      script.async = true;
      document.body.appendChild(script);
    }
  };

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
    const { value, name, id, type } = e.target;

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
    } else if (type === 'checkbox') {
      this.setState({ [name]: e.target.checked });
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
      designerRecommendationCode,
      isRegister,
      introduce,
      yeinbub
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
      isApproval: false,
      isRegister,
      introduce,
      yeinbub
    };

    if (!careerDetail) return alert('이력을 작성해주세요');
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
      return alert('지역/샵주소를 작성해주세요');
    if (!firebaseUserData.untilDesigner)
      return alert('디자이너까지 남은 기간을 작성해주세요');
    if (!firebaseUserData.career) return alert('미용 경력을 작성해주세요');
    if (!firebaseUserData.introduce) return alert('자기소개를 작성해주세요!');

    this.setState({ submitLoading: false });

    window.scrollTo(0, 0);

    try {
      // 최종 유저정보 저장
      await firebase
        .database()
        .ref('users/' + this.props.userData.uid)
        .update(firebaseUserData);

      await axios.patch(`users/${this.props.userData._id}`, { name });

      // img 업로드
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

      alert(
        '성공적으로 신청되었습니다. \n관리자의 승인을 거친 후 정상적으로 스케줄을 등록하실 수 있습니다.'
      );
      this.setState({ submitLoading: true });
      this.props.history.push('/');
    } catch (err) {
      alert('문제가 발생했습니다. 잠시 뒤에 다시 시도해주세요.');
    }
  };

  phoneCert = () => {
    if (!this.state.phoneNumber) return alert('휴대폰 번호를 먼저 입력하세요');
    if (!this.state.phoneNumberAgree)
      return alert('먼저 개인정보 제공에 동의해주세요');

    const { IMP } = window;
    IMP.init('imp06037656');
    IMP.certification(
      {
        merchant_uid: 'merchant_' + new Date().getTime()
      },
      rsp => {
        if (rsp.success) {
          // 인증성공
          this.setState({ isRegister: true });
          alert('인증되었습니다');
        } else {
          // 인증취소 또는 인증실패
          var msg = '인증에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;
          alert(msg);
        }
      }
    );
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
        <Fragment>
          <div className="m_containerStyle">
            <div style={containerStyle}>
              <div style={subtitleStyle}>예비 디자이너 등록</div>
              <div style={titleStyle}>
                드리머리 예디가 되어
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
              isRegister={isRegister}
            />
            <ExtraInfoForm
              state={this.state}
              changeInput={e => this.handleInputChange(e)}
              handleImgChange={e => this.handleImgChange(e)}
              deletePortfolio={e => this.deletePortfolio(e)}
            />
            <div style={labelStyle}>예인법 이벤트</div>
            <input
              style={inputTextStyle}
              type="text"
              name="yeinbub"
              id="yeinbub"
              onChange={e => this.handleInputChange(e)}
              value={this.state.yeinbub}
            />
            <div style={containerStyle}>
              <div style={buttonStyle} onClick={this.submitHandler}>
                예디 등록하기
              </div>
            </div>
          </div>
        </Fragment>
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
    marginBottom: '0.2rem',
    width: '85%'
  },
  inputTextStyle: {
    fontSize: '1.3rem',
    color: '#1f3354',
    padding: '0.7rem',
    borderRadius: '5px',
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    width: '85%'
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
export default connect(mapStateToProps)(AddDesigner);
