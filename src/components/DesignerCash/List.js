import React, { Component, Fragment } from 'react';
import './Cash.css';
class List extends Component {
  render() {
    return (
      <Fragment>
        <div className="mx-4">
          <div className="cash_list">
            <div className="p-3 cash_list_middle">
              <p className="m-0">2018/09/15 17:24</p>
              <p className="m-0">
                <span style={{ color: '#4c91ba' }}>270,000원</span> 출금 신청
                완료
              </p>
            </div>
            <div className="p-3">
              <p className="m-0">2018/09/17 12:01</p>
              <p className="m-0" style={{ fontWeight: 'bold' }}>
                입금 완료!
              </p>
            </div>
          </div>
        </div>
        <div className="mx-4">
          <div className="cash_list">
            <div className="p-3 cash_list_middle">
              <p className="m-0">2018/09/15 17:24</p>
              <p className="m-0">
                <span style={{ color: '#4c91ba' }}>270,000원</span> 출금 신청
                완료
              </p>
            </div>
            <div className="p-3">
              <p className="m-0">2018/09/17 12:01</p>
              <p className="m-0" style={{ fontWeight: 'bold' }}>
                입금 완료!
              </p>
            </div>
          </div>
        </div>
        <div className="mx-4">
          <div className="cash_list">
            <div className="p-3 cash_list_middle">
              <p className="m-0">2018/09/15 17:24</p>
              <p className="m-0">
                <span style={{ color: '#4c91ba' }}>270,000원</span> 출금 신청
                완료
              </p>
            </div>
            <div className="p-3">
              <p className="m-0">2018/09/17 12:01</p>
              <p className="m-0" style={{ fontWeight: 'bold' }}>
                입금 완료!
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default List;
