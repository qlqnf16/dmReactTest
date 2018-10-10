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
    madeRequest: false
  };

  componentDidMount = async () => {
    // DB에서 정보받아와서 넣어주는 곳
    if (!this.state.madeRequest) {
      const { data } = await axios.get(
        `http://52.79.227.227:3030/recruits/${this.props.match.params.id}`
      );
      this.setState({ recruit: data, madeRequest: true });
    }
    firebase.auth().onAuthStateChanged(() => {
      this.offHandler();
      this.setState({
        ...this.state,
        LoginChange: !this.state.LoginChange
      });
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
          introduce={this.state.recruit.introduction}
          data={this.state.recruit.requirement}
          reviews={this.state.recruit._reviews}
          title={this.state.recruit.title}
          portfolios={this.state.recruit.portfolios}
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
