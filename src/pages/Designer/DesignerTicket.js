import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../modules';
import axios from 'axios';
import TicketBox from '../../components/UI/DesignerTicket/TicketBox/TicketBox';
import TicketCounter from '../../components/UI/DesignerTicket/TicketCounter/TicketCounter';
import TicketPurchaseButton from '../../components/UI/DesignerTicket/TicketPurchaseButton/TicketPurchaseButton';

class DesignerTicket extends Component {
  state = {
    madeRequest: false,
    tickets: [
      {
        price: 10000,
        createdAt: 1540795759135,
        expiredAt: null
      },
      {
        price: 28000,
        createdAt: 1540795759135,
        expiredAt: 20180811
      }
    ],
    method: null
  };

  componentDidMount = async () => {
    // iamport 사용하기 위한 inline script 작성
    let links = [
      'https://code.jquery.com/jquery-1.12.4.min.js',
      'https://cdn.iamport.kr/js/iamport.payment-1.1.5.js'
    ];

    for (let link of links) {
      const script = document.createElement('script');

      script.src = link;
      script.async = true;
      document.body.appendChild(script);
    }

    if (!this.state.madeRequest) {
      this.reloadTicket();
    }
  };

  reloadTicket = async () => {
    const { data } = await axios.get(
      `http://52.79.227.227:3030/users/${this.props.userData._id}/tickets`
    );
    await this.setState({ tickets: data, madeRequest: true });
  };

  purchaseHandler = kind => {
    const { IMP } = window;
    IMP.init('imp06037656');
    IMP.request_pay(
      {
        pg: this.state.method === 'kakaopay' ? 'kakaopay' : 'danal', // version 1.1.0부터 지원.
        pay_method: this.state.method,
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: '주문명: 디자이너 이용권',
        amount: 500,
        buyer_name: this.props.userData.name,
        buyer_tel: this.props.userData.phoneNumber
      },
      async rsp => {
        if (rsp.success) {
          const { data } = await axios.post(
            `http://52.79.227.227:3030/users/${
              this.props.userData._id
            }/tickets`,
            { price: kind }
          );
          await this.props.updateRedux('_tickets', [
            ...this.props.userData._tickets,
            data
          ]);
          await this.reloadTicket();
          alert('결제가 완료되었습니다. 결제 금액 : ' + rsp.paid_amount);
        } else {
          var errMsg = '결제에 실패하였습니다.';
          errMsg += ' 에러내용 : ' + rsp.error_msg;
          alert(errMsg);
        }
      }
    );
  };

  changeHandler = e => {
    this.setState({ method: e.target.value });
  };

  ticketActivate = async ticketId => {
    if (
      this.props.userData.expiredAt &&
      this.props.userData.expiredAt > new Date().getTime()
    )
      return alert('아직 사용중인 이용권이 있습니다');

    const { data } = await axios.patch(
      `http://52.79.227.227:3030/users/${
        this.props.userData._id
      }/tickets/${ticketId}`
    );
    await this.props.updateRedux('expiredAt', data.expiredAt);
    alert('적용되었습니다.');
    await this.reloadTicket();
  };

  render() {
    return (
      <div className="container-fluid d">
        <div className="d_bg">
          <div className="d_container">
            <div style={{ color: '#4c91ba' }} className="u_title ">
              이용권 관리
            </div>
            <div className="dr_title mb-2">보유 이용권</div>
            <div className="row" style={{ marginTop: '50px' }}>
              <div
                className="col-4 py-2 mx-auto"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <TicketPurchaseButton purchaseHandler={this.purchaseHandler} />
                <div className="row">
                  <div
                    className="col-12 rf-tableBody"
                    style={{ fontFamily: 'NanumSquareEB' }}
                  />
                  <div className="col-12 text-right rf-tableHead mb-3">
                    결제방법
                  </div>
                  <div className="col-6">
                    <input
                      id="card"
                      type="radio"
                      name="method"
                      value="card"
                      onChange={this.changeHandler}
                      checked={this.state.method === 'card'}
                      style={{ marginRight: '3.5px', transform: 'scale(1.3)' }}
                    />
                    <label
                      for="card"
                      style={{ marginRight: '21.5px', fontSize: '1.5rem' }}
                    >
                      신용/체크카드
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      id="trans"
                      type="radio"
                      name="method"
                      value="trans"
                      onChange={this.changeHandler}
                      checked={this.state.method === 'trans'}
                      style={{ marginRight: '3.5px', transform: 'scale(1.3)' }}
                    />
                    <label
                      for="trans"
                      style={{ marginRight: '21.5px', fontSize: '1.5rem' }}
                    >
                      실시간 계좌이체
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      id="vbank"
                      type="radio"
                      name="method"
                      value="vbank"
                      onChange={this.changeHandler}
                      checked={this.state.method === 'vbank'}
                      style={{ marginRight: '3.5px', transform: 'scale(1.3)' }}
                    />
                    <label
                      for="vbank"
                      style={{ marginRight: '21.5px', fontSize: '1.5rem' }}
                    >
                      가상계좌
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      id="kakao"
                      type="radio"
                      name="method"
                      value="kakaopay"
                      onChange={this.changeHandler}
                      checked={this.state.method === 'kakaopay'}
                      style={{ marginRight: '3.5px', transform: 'scale(1.3)' }}
                    />
                    <label
                      for="kakao"
                      style={{ marginRight: '21.5px', fontSize: '1.5rem' }}
                    >
                      카카오페이
                    </label>
                  </div>
                </div>
                {/* <TicketCounter
                  count={this.state.tickets.reduce(
                    (accu, pres) => (!pres.expiredAt ? accu + 1 : accu),
                    0
                  )}
                /> */}
              </div>
              <TicketBox
                tickets={this.state.tickets}
                ticketActivate={this.ticketActivate}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(DesignerTicket)
);
