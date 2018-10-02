import React, { Component } from 'react';
import firebase from '../config/Firebase';

class Landing extends Component {
  certification() {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      .update({ isD: true });
  }
  noCertification() {
    console.log('ADSfadfas');
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      .update({ isD: false });
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
export default Landing;
