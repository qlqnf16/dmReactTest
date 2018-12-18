import React, { Component } from 'react';
import AskNav from '../../components/Navigation/AskNav/AskNav';
import { FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import firebase from '../../config/Firebase';
class Withdrawal extends Component {
  state = {
    content: null
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  withdrawalSubmit = () => {
    if (!this.state.content) return alert('탈퇴 요청 사유를 작성해주세요');

    if (
      window.confirm(
        '회원 탈퇴는 즉시 처리되며, 향후 60일간 재가입이 불가능합니다. 정말 탈퇴하시겠습니까?'
      )
    ) {
      firebase
        .database()
        .ref('users/' + this.props.userData.uid)
        .update({ withdrawal: this.state.content });
      alert('처리 되었습니다.');
      //Logout
      firebase.auth().signOut();
      this.props.history.push('/');
    }
  };

  render() {
    return (
      <div className="container-fluid ask">
        <AskNav />
        <div className="ask_title">회원탈퇴</div>
        <div style={{ width: '50%', margin: 'auto' }}>
          <FormGroup row>
            <div className="col-3 if_head">탈퇴 요청 사유</div>
            <div className="col-9">
              <textarea
                name="content"
                id="content"
                onChange={this.inputChangeHandler}
                className="if_input"
                style={{ height: '262px' }}
              />
            </div>
          </FormGroup>
          <FormGroup row>
            <div className="col-3" />
            <div className="col-9">
              <div className="ask_button" onClick={this.withdrawalSubmit}>
                탈퇴 요청
              </div>
            </div>
          </FormGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Withdrawal);
