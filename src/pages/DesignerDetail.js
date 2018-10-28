import React, { Component } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import step2 from '../assets/images/step2.png';

import DetailContent from '../components/DesignerDetail/DetailContent';
import DetailCards from '../components/DesignerDetail/DetailCards';
import MyModal from '../components/UI/MyModal/MyModal';

class DesginerDetail extends Component {
  state = {
    recruit: {},
    showLogin: false,
    LoginChange: false,
    madeRequest: false,
    designerData: {}
  };

  componentDidMount = async () => {
    // DB에서 정보받아와서 넣어주는 곳
    if (!this.state.madeRequest) {
      const { data } = await axios.get(
        `http://52.79.227.227:3030/recruits/${this.props.match.params.id}`
      );
      this.setState({ recruit: data, madeRequest: true });
      console.log(this.state.recruit);
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
        console.log(res.val());
        this.setState({ designerData: res.val() });
      });
  };

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
    if (Object.values(serviceFormat).length === 0)
      return alert('받을 서비스를 선택해 주세요');
    await this.props.history.push({
      pathname: `/reservation/${this.props.id}`,
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

  render() {
    let loading = null;
    if (Object.keys(this.state.recruit).length) {
      loading = (
        <DetailContent
          recruit={this.state.recruit}
          designerData={this.state.designerData}
        />
      );
    }
    return (
      <div className="container-fluid">
        <div className="text-center my-5">
          <img alt="alt" style={{ width: '100%' }} src={step2} />
        </div>
        <div className="row align-items-start">
          {loading}
          <DetailCards
            recruit={this.state.recruit}
            loginToggle={this.loginToggleHandler}
            submitReservation={this.submitReservation}
          />
        </div>
        <MyModal
          showLogin={this.state.showLogin}
          off={this.loginToggleHandler}
          type="login"
        />
      </div>
    );
  }
}

export default DesginerDetail;
