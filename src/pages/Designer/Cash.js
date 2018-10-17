import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CashWant from '../../components/DesignerCash/Want';
import CashList from '../../components/DesignerCash/List';

class Cash extends Component {
  state = {
    select: 'Want'
  };

  want = () => {
    this.setState({ select: 'Want' });
  };
  list = () => {
    this.setState({ select: 'List' });
  };

  render() {
    const component =
      this.state.select === 'Want' ? <CashWant /> : <CashList />;
    return (
      <div className="container-fluid me pt-2">
        <div className="me_bg">
          <div
            style={{ color: 'rgba(0, 0, 0, 0.3)', fontSize: '1.4rem' }}
            className="u_title"
          >
            <span
              style={this.state.select === 'Want' ? { color: '#4c91ba' } : {}}
              onClick={this.want}
            >
              출금 신청
            </span>
            <span
              style={
                this.state.select === 'List'
                  ? { color: '#4c91ba', marginLeft: '4rem' }
                  : { marginLeft: '4rem' }
              }
              onClick={this.list}
            >
              출금 내역
            </span>
          </div>
          <div className="row" style={{ marginTop: '2%' }}>
            {component}
          </div>
        </div>
      </div>
    );
  }
}

export default Cash;
