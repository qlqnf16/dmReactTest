import React, { Component } from 'react';
import firebase from '../config/Firebase';
import { connect } from 'react-redux';
import landing from '../assets/images/landing.jpeg';

class Landing extends Component {
  // 디자이너 등록 임시 토글

  certification() {
    if (true) {
      firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid)
        .update({ isD: true });
    } else {
      alert('로그인부터 하세요');
    }
  }
  noCertification() {
    if (true) {
      firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid)
        .update({ isD: false });
    } else {
      alert('로그인부터 하세요');
    }
  }
  admin() {
    if (true) {
      firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid)
        .update({ isAdmin: true });
      this.props.history.push('/admin/userlist');
    } else {
      alert('로그인부터 하세요');
    }
  }
  noAdmin() {
    if (true) {
      firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid)
        .update({ isAdmin: false });
    } else {
      alert('로그인부터 하세요');
    }
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: 'inline-block',
            marginTop: '20px',
            marginBottom: '20px'
          }}
        >
          <span
            style={{
              fontSize: '15px',
              fontWeight: 'bold',
              marginRight: '20px'
            }}
          >
            디자이너 권한
          </span>
          <div
            className="btn btn-lg btn-primary"
            onClick={() => this.certification()}
          >
            등록
          </div>
          <div
            className="btn btn-lg btn-warning"
            onClick={() => this.noCertification()}
          >
            해제
          </div>
        </div>
        <div style={{ display: 'inline' }}>
          <span
            style={{
              fontSize: '15px',
              fontWeight: 'bold',
              marginRight: '20px',
              marginLeft: '20px'
            }}
          >
            관리자 권한
          </span>
          <div className="btn btn-lg btn-success" onClick={() => this.admin()}>
            등록
          </div>
          <div
            className="btn btn-lg btn-warning"
            onClick={() => this.noAdmin()}
          >
            해제
          </div>
        </div>
        <div>
          <img src={landing} alt="landing" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Landing);
