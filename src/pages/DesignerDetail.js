import React, { Component } from 'react';
import firebase from '../config/Firebase';
import axios from '../config/Axios';
import { connect } from 'react-redux';
import * as actions from './../modules';
import step2 from '../assets/images/step2.png';

import DetailContent from '../components/DesignerDetail/DetailContent';
import DetailCards from '../components/DesignerDetail/DetailCards';
import MyModal from '../components/UI/MyModal/MyModal';
import ShowLargeImage from '../components/DesignerDetail/ShowLargeImage';

class DesginerDetail extends Component {
  state = {
    recruit: {},
    showLogin: false,
    LoginChange: false,
    madeRequest: false,
    designerData: {},
    showLargeImage: false
  };

  componentDidMount = async () => {
    // DB에서 정보받아와서 넣어주는 곳
    if (!this.state.madeRequest) {
      const { data } = await axios.get(
        `http://52.79.227.227:3030/recruits/${this.props.match.params.id}`
      );
      this.setState({
        recruit: data,
        madeRequest: true,
        isLogin: this.props.userData.uid
      });
      await this.authListener();
    }
    // firebase.auth().onAuthStateChanged(() => {
    //   this.offHandler();
    //   this.setState({
    //     ...this.state,
    //     LoginChange: !this.state.LoginChange
    //   });
    // });

    await firebase
      .database()
      .ref('/users/' + this.state.recruit._designer._uid)
      .on('value', async res => {
        this.setState({ designerData: res.val() });
      });
  };

  authListener() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user && firebase.auth().currentUser) {
        this.setState({ isLogin: true });
      } else {
        this.setState({ isLogin: false });
      }
    });
  }

  loginToggleHandler = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };
  offHandler = () => {
    this.setState({ showSignUp: false, showLogin: false });
  };

  submitReservation = async (
    price,
    time,
    service,
    serviceFormat,
    startTime,
    recruit,
    cardData
  ) => {
    // // 장막
    // if (true) return alert('아직 이용하실 수 없습니다.');

    if (!this.state.isLogin && this.state.madeRequest) {
      this.loginToggleHandler();
      return;
    }
    if (Object.values(serviceFormat).length === 0)
      return alert('받을 서비스를 선택해 주세요');
    if (!startTime) return alert('받을 시간을 선택해 주세요');
    await this.props.history.push({
      pathname: `/reservation`,
      state: {
        price,
        time,
        service,
        serviceFormat,
        startTime,
        recruit,
        cardData
      }
    });
  };

  // 사진 크게보기
  showLargeImageToggle = src => {
    this.setState({
      showLargeImage: !this.state.showLargeImage,
      largeImage: src
    });
  };

  render() {
    let loading = null;
    if (Object.keys(this.state.recruit).length) {
      loading = (
        <DetailContent
          recruit={this.state.recruit}
          designerData={this.state.designerData}
          showLargeImageToggle={this.showLargeImageToggle}
        />
      );
    }
    return (
      <div>
        <div className="text-center mb-5">
          <img alt="alt" style={{ width: '100%' }} src={step2} />
        </div>
        <div className="row align-items-start">
          {loading}
          <DetailCards
            recruit={this.state.recruit}
            loginToggle={this.loginToggleHandler}
            submitReservation={this.submitReservation}
            isLogin={this.state.isLogin}
          />
        </div>
        <MyModal
          showLogin={this.state.showLogin}
          off={this.loginToggleHandler}
          type="login"
        />
        <ShowLargeImage
          isOpen={this.state.showLargeImage}
          toggle={this.showLargeImageToggle}
          src={this.state.largeImage}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(
  mapStateToProps,
  actions
)(DesginerDetail);
