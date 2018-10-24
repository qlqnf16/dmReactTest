import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import fd from 'form-data';
import firebase from '../../config/Firebase';

import InfoForm from '../components/InfoForm/InfoForm';

class AddDesigner extends Component {
  constructor(props) {
    super(props);

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

  handleInputChange = e => {
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
  };

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
      addresses
    };

    if (
      Object.values(firebaseUserData).includes(undefined) ||
      addresses.length === 0
    )
      return alert('채워지지 않은 정보가 있습니다');

    if (
      designerRecommendationCode &&
      !this.props.userData.designerRecommendationCode
    ) {
      let count = 0;
      let result = null;
      await firebase
        .database()
        .ref('users/' + designerRecommendationCode)
        .on('value', res => {
          result = res;
        });
      if (!result) {
        alert('유효하지 않은 추천인 코드 입니다.');
      } else {
        let { designerRecommendation, _id } = result.val();
        if (designerRecommendation) count = designerRecommendation;
        firebaseUserData = { ...firebaseUserData, designerRecommendationCode };
        count += 1;

        // TODO : 추천2회면 티켓 추가
        // TODO : 본인은 추천 안되게.
        if (count === 2) {
          count = 0;
          // await axios.patch(
          //   `http://52.79.227.227:3030/users/${_id}`,
          //   {
          //     ticket: 더하기(백에서 하는게 나을듯)
          //   }
          // );
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
    alert('성공적으로 신청되었습니다');

    // TODO: 첨부 안했을때 오류가 나는듯...?
    const formData = new fd();
    formData.append('cert_mh', this.state.certFile1);
    formData.append('cert_jg', this.state.certFile2);
    await axios.post(
      `http://localhost:3030/firebase/upload?uid=${this.props.userData.uid}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    // await this.props.history.push('/designer/whydreamary');
  };

  render() {
    return (
      <div className="m_containerStyle">
        <InfoForm
          state={this.state}
          changeInput={e => this.handleInputChange(e)}
          handleAddress={this.handleAddress}
          addressAddHandler={this.addressAddHandler}
          addressRemoveHandler={this.addressRemoveHandler}
        />
        <div onClick={this.submitHandler}>예디 등록하기</div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(mapStateToProps)(AddDesigner);
