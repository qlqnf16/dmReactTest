import React, { Component } from 'react';
import AskNavigationBar from '../../components/AskNavigationBar/AskNavigationBar';
import firebase from '../../../config/Firebase';
import { connect } from 'react-redux';

class Withdrawal extends Component {
  state = {
    content: null
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

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
        .update({
          withdrawal: this.state.content
        });
      alert('처리 되었습니다.');
      //Logout
      firebase.auth().signOut();
      this.props.history.push('/');
    }
  };

  render() {
    return (
      <div>
        <AskNavigationBar pathname={this.props.location.pathname} />
        <div className="container-fluid m_ask" style={{ width: '93.8%' }}>
          <div className="m_ask_title">회원 탈퇴</div>
          <div className="m_ask_form">
            <div className="m_ask_formTitle">탈퇴 요청 사유</div>
            <textarea
              name="content"
              id="content"
              placeholder="탈퇴 사유를 입력해주세요"
              onChange={this.inputChangeHandler}
              className="m_ask_input"
              style={{ height: '166px' }}
            />
          </div>
          <div onClick={this.withdrawalSubmit} className="m_ask_button">
            탈퇴 요청
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Withdrawal);
