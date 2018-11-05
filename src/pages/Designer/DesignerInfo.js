import React, { Component } from 'react';
import { Form, FormGroup } from 'reactstrap';
import InfoForm from '../../components/InfoForm/InfoForm';
import InfoFormExtended from '../../components/InfoForm/InfoFormExtended';
import { connect } from 'react-redux';
import firebase from '../../config/Firebase';
import check_sm from '../../assets/images/check_sm.png';

import fd from 'form-data';
import axios from 'axios';

class DesignerInfo extends Component {
  constructor(props) {
    super(props);
    const portfolios = [];
    for (let i = 0; this.props.userData[`portfolio${i}`]; i++) {
      portfolios.push(this.props.userData[`portfolio${i}`]);
    }

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
      cert_jg
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
      portfolioImg: portfolios,
      portfolioFile: [],
      num: portfolios.length,
      addressNum: addresses.length + 1,
      portfoliosNum: portfolios.length,
      designerRecommendationCode
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
        if (!file) return this.setState({ certImg1: null, certFile1: null });
        this.setState({ certImg1: URL.createObjectURL(file), certFile1: file });
        break;
      case 'cert2':
        if (!file) return this.setState({ certImg2: null, certFile2: null });
        this.setState({ certImg2: URL.createObjectURL(file), certFile2: file });
        break;
      case 'profileImg':
        if (!file)
          return this.setState({ profileImg: null, profileFile: null });
        this.setState({
          profileImg: URL.createObjectURL(file),
          profileFile: file
        });
        break;
      case 'portfolio':
        if (!file) this.setState({ portfolioImg: null, portfolioFile: null });
        this.state.portfolioImg.push(URL.createObjectURL(file));
        this.state.portfolioFile.push(file);
        this.setState({ num: this.state.num + 1 });
        break;
      default:
        console.log('something wrong in [DesignerInfo.js]');
    }
  };

  deletePortfolio = e => {
    let foundFile = this.state.portfolioImg.findIndex(
      url => url === e.target.src
    );
    this.state.portfolioImg.splice(foundFile, 1);
    this.state.portfolioFile.splice(foundFile, 1);
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
      introduce
    };

    if (
      Object.values(firebaseUserData).includes(undefined) ||
      Object.values(firebaseUserData.birthday).includes(undefined) ||
      Object.values(firebaseUserData.birthday).includes('null') ||
      addresses.length === 0
    )
      return alert('채워지지 않은 정보가 있습니다');
    if (
      designerRecommendationCode &&
      !this.props.userData.designerRecommendationCode
    ) {
      let count = 0;
      let result = null;
      const fbPromise = new Promise(resolve => {
        firebase
          .database()
          .ref('users/' + designerRecommendationCode)
          .on('value', res => {
            resolve(res);
          });
      });

      result = await fbPromise;
      if (!result || designerRecommendationCode === this.props.userData.uid) {
        alert('유효하지 않은 추천인 코드 입니다.');
      } else {
        let { designerRecommendation, _id } = result.val();
        if (designerRecommendation) count = designerRecommendation;
        firebaseUserData = { ...firebaseUserData, designerRecommendationCode };
        count += 1;

        if (count === 2) {
          count = 0;

          await axios.post(`http://52.79.227.227:3030/users/${_id}/tickets`, {
            price: 10000
          });
        }
        await firebase
          .database()
          .ref('users/' + designerRecommendationCode)
          .update({ designerRecommendation: count });
      }
    }

    await firebase
      .database()
      .ref('users/' + this.props.userData.uid)
      .update(firebaseUserData);

    const formData = new fd();
    formData.append('cert_mh', this.state.certFile1);
    formData.append('cert_jg', this.state.certFile2);
    formData.append('profile', this.state.profileFile);
    this.state.portfolioFile.forEach((p, index) => {
      formData.append(`portfolio${index + this.state.portfoliosNum}`, p);
    });
    await axios.post(
      `http://52.79.227.227:3030/firebase/upload?uid=${
        this.props.userData.uid
      }`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    alert('성공적으로 신청되었습니다');
    this.props.history.push('/designer/schedule');
  };

  render() {
    const isRegister = (
      <div className="uif_registered col-1">
        <img style={{ width: '1.4rem' }} src={check_sm} alt="alt" />
        인증됨
      </div>
    );
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
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(mapStateToProps)(DesignerInfo);
