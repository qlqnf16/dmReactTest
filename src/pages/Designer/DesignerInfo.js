import React, { Component } from 'react';
import { Form, FormGroup } from 'reactstrap';
import InfoForm from '../../components/InfoForm/InfoForm';
import InfoFormExtended from '../../components/InfoForm/InfoFormExtended';
import { connect } from 'react-redux';
import firebase from '../../config/Firebase';
import check_sm from '../../assets/images/check_sm.png';
import Spinner from '../../assets/images/loading_spinner.gif';

import fd from 'form-data';
import axios from '../../config/Axios';

class DesignerInfo extends Component {
  constructor(props) {
    super(props);

    let {
      name,
      birthday,
      email,
      gender,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      addresses,
      introduce,
      designerRecommendationCode,
      profile,
      cert_mh,
      cert_jg,
      isRegister,
      portfolios
    } = this.props.userData;
    if (!addresses) addresses = [];
    this.state = {
      name,
      year: birthday && birthday.year,
      month: birthday && birthday.month,
      day: birthday && birthday.day,
      email,
      gender,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      addresses,
      introduce,
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
      portfoliosNum: portfolios ? portfolios.length : 0,
      designerRecommendationCode,
      isRegister,
      submitLoading: true
    };
  }

  addressAddHandler = () => {
    this.setState({
      addressNum: this.state.addressNum + 1
    });
  };
  addressRemoveHandler = i => {
    let addresses = this.state.addresses;
    addresses.splice(i, 1);
    this.setState({
      addressNum: this.state.addressNum - 1,
      addresses
    });
  };

  handleAddress = (data, fullAddress, num) => {
    const { sido, sigungu } = data;
    const address = { sido, sigungu, fullAddress };
    let addresses = this.state.addresses;
    addresses[num] = address;
    this.setState({ addresses });
  };

  handleImgChange = e => {
    let file = e.target.files[0];
    switch (e.target.name) {
      case 'cert1':
        this.setState({ certImg1: URL.createObjectURL(file), certFile1: file });
        break;
      case 'cert2':
        this.setState({ certImg2: URL.createObjectURL(file), certFile2: file });
        break;
      case 'profileImg':
        this.setState({
          profileImg: URL.createObjectURL(file),
          profileFile: file
        });
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
  dYear = 0;
  dMonth = 0;
  careerYear = 0;
  careerMonth = 0;
  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (target.id === 'dYear' || target.id === 'dMonth') {
      if (target.id === 'dYear') {
        this.dYear = Number(value);
      } else if (target.id === 'dMonth') {
        this.dMonth = Number(value);
      }
      this.setState({ untilDesigner: this.dYear * 12 + this.dMonth });
    } else if (target.id === 'careerYear' || target.id === 'careerMonth') {
      if (target.id === 'careerYear') {
        this.careerYear = Number(value);
      } else if (target.id === 'careerMonth') {
        this.careerMonth = Number(value);
      }
      this.setState({ career: this.careerYear * 12 + this.careerMonth });
    } else if (target.name === 'extraAddress') {
      let addresses = this.state.addresses;
      let address = addresses[target.id];
      addresses[target.id] = { ...address, extraAddress: target.value };
      this.setState({ addresses });
    } else {
      this.setState({ [name]: value });
    }
  }

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
    //   Object.values(firebaseUserData.birthday).includes(undefined) ||
    //   Object.values(firebaseUserData.birthday).includes('null') ||
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
      return alert('지역/샵주소를 작성해주세요');
    if (!firebaseUserData.untilDesigner)
      return alert('디자이너까지 남은 기간을 작성해주세요');
    if (!firebaseUserData.career) return alert('미용 경력을 작성해주세요');
    if (!firebaseUserData.introduce) return alert('자기 소개를 작성해주세요');

    this.setState({ submitLoading: false });
    window.scrollTo(0, 0);
    if (
      designerRecommendationCode &&
      !this.props.userData.designerRecommendationCode
    ) {
      let count = 0;
      let result = null;
      const fbPromise = new Promise((resolve, reject) => {
        firebase
          .database()
          .ref('users/' + designerRecommendationCode)
          .on('value', res => {
            if (res.val()) resolve(res);
            else resolve(false);
          });
      });

      result = await fbPromise;

      if (!result || designerRecommendationCode == this.props.userData.uid) {
        alert('유효하지 않은 추천인 코드 입니다.');
      } else {
        let { designerRecommendation, _id } = result.val();

        if (designerRecommendation) count = designerRecommendation;
        firebaseUserData = {
          ...firebaseUserData,
          designerRecommendationCode
        };
        count += 1;

        if (count !== 0 && count % 5 === 0) {
          await axios.post(`users/${_id}/tickets`, {
            price: 10000
          });
          alert('쿠폰이 지급되었습니다.');
        }
        await firebase
          .database()
          .ref('users/' + designerRecommendationCode)
          .update({ designerRecommendation: count });
      }
    }
    try {
      await firebase
        .database()
        .ref('users/' + this.props.userData.uid)
        .update(firebaseUserData);

      await axios.patch(`users/${this.props.userData._id}`, { name });

      const formData = new fd();
      formData.append('cert_mh', this.state.certFile1);
      formData.append('cert_jg', this.state.certFile2);
      formData.append('profile', this.state.profileFile);
      this.state.portfolioFile.forEach((p, index) => {
        formData.append(`portfolio${index + this.state.portfoliosNum}`, p);
      });

      console.log(
        await axios.post(
          `firebase/upload?uid=${this.props.userData.uid}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
      );
      alert('성공적으로 저장되었습니다. \n스케줄 등록으로 이동합니다.');
      this.setState({ submitLoading: true });
      this.props.history.push('/designer/schedule');
    } catch (err) {
      alert('문제가 발생했습니다. 잠시 뒤에 다시 시도해주세요.');
    }
  };

  render() {
    const isRegister = (
      <div className="uif_registered col-1">
        <img style={{ width: '1.4rem' }} src={check_sm} alt="alt" />
        인증됨
      </div>
    );

    if (this.state.submitLoading) {
      return (
        <div className="container-fluid d">
          <div className="d_bg">
            <div className="d_container">
              <div style={{ color: '#4c91ba' }} className="u_title ">
                회원정보 수정
              </div>
              <Form className="m-5 d_info">
                <InfoForm
                  state={this.state}
                  certImg1={this.state.certImg1}
                  certFile1={this.state.certFile1}
                  certImg2={this.state.certImg2}
                  certFile2={this.state.certFile2}
                  imgChange={e => this.handleImgChange(e)}
                  changeInput={e => this.handleInputChange(e)}
                  checked={!this.state.gender ? null : this.state.gender}
                  handleAddress={this.handleAddress}
                  addressAddHandler={this.addressAddHandler}
                  addressRemoveHandler={this.addressRemoveHandler}
                  isRegister={isRegister}
                />
                <InfoFormExtended
                  state={this.state}
                  profileImg={this.state.profileImg}
                  profileFile={this.state.profileFile}
                  portfolioImg={this.state.portfolioImg}
                  portfolioFile={this.state.portfolioFile}
                  num={this.state.num}
                  imgChange={e => this.handleImgChange(e)}
                  deletePortfolio={e => this.deletePortfolio(e)}
                  changeInput={e => this.handleInputChange(e)}
                />
                <FormGroup row>
                  <div className="col-3 if_head">추천인 코드</div>
                  <div className="col-9 d-flex justify-content-left">
                    <input
                      type="text"
                      name="designerRecommendationCode"
                      id="designerRecommendationCode"
                      value={this.state.designerRecommendationCode}
                      onChange={
                        this.props.userData.designerRecommendationCode
                          ? () => {}
                          : e => this.handleInputChange(e)
                      }
                      className="if_input"
                      placeholder="선택사항"
                      style={
                        this.props.userData.designerRecommendationCode
                          ? {
                              backgroundColor: 'rgba(0,0,0,0.1)',
                              color: 'rgba(0,0,0,0.5)'
                            }
                          : null
                      }
                    />
                  </div>
                </FormGroup>
                <div className="text-center">
                  <div className="btn dif_button" onClick={this.submitHandler}>
                    등록하기
                  </div>
                </div>
              </Form>
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

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(mapStateToProps)(DesignerInfo);
