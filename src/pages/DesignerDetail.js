import React, { Component } from 'react';
import { Button } from 'reactstrap';
import firebase from 'firebase';
import axios from 'axios';

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

    //TODO : Db에 uid와 연동 되면 불러와서 정보 채우기
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
      <div>
        <div className="container">
          <h1 className="text-center m-5 ">2단계 : 예약하기(이미지로)</h1>
          <div className="row align-items-start">
            {loading}
            <DetailCards recruit={this.state.recruit} />
          </div>

          <Button
            onClick={this.loginToggleHandler}
            className="btn-light float-right"
          >
            예약하기
          </Button>
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
