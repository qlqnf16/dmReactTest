import React, { Component } from 'react';
import AskNav from '../../components/Navigation/AskNav/AskNav';

class FAQ extends Component {
  state = {
    toggle: true
  };
  toggleD = () => {
    this.setState({
      toggle: true
    });
  };
  toggleU = () => {
    this.setState({
      toggle: false
    });
  };

  designerFAQ = (
    <div className="m-4">
      <div className="p-2">
        <h1>1 디자이너들은 뭐가 궁금할까</h1>
        <h2 className="ml-2">여기다가 답을 하면 된단다</h2>
      </div>
      <div className="p-2">
        <h1>2 질문이 뭐니</h1>
        <h2 className="ml-2">여기다가 답을 하면 된단다</h2>
      </div>
      <div className="p-2">
        <h1>3 질문이 뭐니</h1>
        <h2 className="ml-2">여기다가 답을 하면 된단다</h2>
      </div>
    </div>
  );
  userFAQ = (
    <div className="m-4">
      <div className="p-2">
        <h1>1 유저들은 뭐가 궁금할까</h1>
        <h2 className="ml-2">여기다가 답을 하면 된단다</h2>
      </div>
      <div className="p-2">
        <h1>2 질문이 뭐니</h1>
        <h2 className="ml-2">여기다가 답을 하면 된단다</h2>
      </div>
      <div className="p-2">
        <h1>3 질문이 뭐니</h1>
        <h2 className="ml-2">여기다가 답을 하면 된단다</h2>
      </div>
    </div>
  );

  render() {
    return (
      <div>
        <AskNav />
        <h1>FAQ</h1>
        <button onClick={this.toggleD}>예비 디자이너</button>
        <button onClick={this.toggleU}>유저</button>
        <div>{this.state.toggle ? this.designerFAQ : this.userFAQ}</div>
      </div>
    );
  }
}

export default FAQ;
