import React, { Component } from 'react';
import firebase from '../config/Firebase';
import { connect } from 'react-redux';

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

  render() {
    return (
      <div>
        <div>
          <h1>This is Landing</h1>
        </div>
        <div className="btn btn-primary" onClick={() => this.certification()}>
          디자이너 임시 등록
        </div>
        <div className="btn btn-warning" onClick={() => this.noCertification()}>
          등록 해제
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { userData: state.userData };
};

export default connect(mapStateToProps)(Landing);
