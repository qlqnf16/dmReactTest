import React, { Component, Fragment } from 'react';

// 개발용, 삭제하기
import { connect } from 'react-redux';
import firebase from '../../config/Firebase';
//

import temporaryLanding from '../../assets/images/temp-landing.jpg';
import './Landing.css';

class Landing extends Component {
  // 개발용
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
      <Fragment>
        <div
          style={{
            display: 'inline-block',
            marginTop: '20px',
            marginBottom: '20px'
          }}
        >
          <span
            style={{
              fontSize: '10px',
              fontWeight: 'bold',
              marginRight: '20px'
            }}
          >
            디자이너 권한
          </span>
          <div className="btn btn-primary" onClick={() => this.certification()}>
            등록
          </div>
          <div
            className="btn btn-warning"
            onClick={() => this.noCertification()}
          >
            해제
          </div>
        </div>
        <div style={{ display: 'inline' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 'bold',
              marginRight: '20px',
              marginLeft: '20px'
            }}
          >
            관리자 권한
          </span>
          <div className="btn btn-success" onClick={() => this.admin()}>
            등록
          </div>
          <div className="btn btn-warning" onClick={() => this.noAdmin()}>
            해제
          </div>
        </div>
        <img
          id="temporary-landing"
          src={temporaryLanding}
          alt="temporary landing image"
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Landing);
