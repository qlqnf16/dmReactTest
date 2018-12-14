import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../modules';
import axios from '../../config/Axios';
import TicketBox from '../../components/UI/DesignerTicket/TicketBox/TicketBox';
import TicketPurchaseButton from '../../components/UI/DesignerTicket/TicketPurchaseButton/TicketPurchaseButton';

import ticketCover from '../../assets/images/ticketCover.png';

class DesignerTicket extends Component {
  state = {
    madeRequest: false,
    tickets: [],
    method: 'card'
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

  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  couponSubmit = async () => {
    try {
      await axios.patch(`coupons/${this.state.coupon}`, {
        _user: this.props.userData._id,
        isD: this.props.userData.isD
      });
      await this.reloadTicket();
      this.setState({ coupon: null });
      alert('쿠폰이 적용 되었습니다.');
    } catch (err) {
      alert('유효하지 않은 쿠폰번호 입니다.');
    }
  };

  reloadTicket = async () => {
    const { data } = await axios.get(
      `users/${this.props.userData._id}/tickets`
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
        amount: kind,
        buyer_name: this.props.userData.name,
        buyer_tel: this.props.userData.phoneNumber
      },
      async rsp => {
        if (rsp.success) {
          const { data } = await axios.post(
            `users/${this.props.userData._id}/tickets`,
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
      `users/${this.props.userData._id}/tickets/${ticketId}`
    );
    await this.props.updateRedux('expiredAt', data.expiredAt);
    alert('적용되었습니다.');
    await this.reloadTicket();
  };

  render() {
    const { labelStyle, onLabelStyle } = styles;
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
                {/* <div
                  style={{
                    width: '100%',
                    height: '70%',
                    backgroundColor: ' rgba(0,0,0,0.1)'
                  }}
                > */}
                {/* <img src={ticketCover} style={{ width: '100%' }} alt="img" /> */}
                <TicketPurchaseButton purchaseHandler={this.purchaseHandler} />
                <div className="row">
                  <div className="col-12 mt-5" />
                  <div
                    style={{ color: '#4c91ba', border: 'none' }}
                    className="col-12 mb-3 u_title"
                  >
                    결제방법
                    <div
                      style={{
                        fontWeight: 'normal',
                        color: 'gray',
                        fontSize: '1.1rem'
                      }}
                    >
                      * 휴대폰 소액결제가 빠른 시일 내에 가능해질 예정입니다.
                      조금만 기다려주세요!
                    </div>
                  </div>
                  <div className="col-12 px-0">
                    <label
                      style={
                        this.state.method === 'card' ? onLabelStyle : labelStyle
                      }
                    >
                      <input
                        type="radio"
                        id="card"
                        name="method"
                        value="card"
                        onChange={this.changeHandler}
                        className="genderRadio"
                      />
                      신용/체크카드
                    </label>
                    <label
                      style={
                        this.state.method === 'kakaopay'
                          ? onLabelStyle
                          : labelStyle
                      }
                    >
                      <input
                        type="radio"
                        id="kakaopay"
                        name="method"
                        value="kakaopay"
                        onChange={this.changeHandler}
                        className="genderRadio "
                      />
                      카카오페이
                    </label>
                    <label
                      style={
                        this.state.method === 'trans'
                          ? onLabelStyle
                          : labelStyle
                      }
                    >
                      <input
                        type="radio"
                        id="trans"
                        name="method"
                        value="trans"
                        onChange={this.changeHandler}
                        className="genderRadio "
                      />
                      실시간 계좌이체
                    </label>
                    <label
                      style={
                        this.state.method === 'phone'
                          ? onLabelStyle
                          : labelStyle
                      }
                      className="disabledButton"
                    >
                      <input
                        type="radio"
                        id="phone"
                        name="method"
                        value="phone"
                        onChange={this.changeHandler}
                        className="genderRadio "
                        disabled
                      />
                      휴대폰 소액결제
                    </label>
                  </div>
                  {/* </div> */}
                </div>
                <div
                  className="u_title"
                  style={{ color: '#4c91ba', marginTop: '15rem', border: 0 }}
                >
                  쿠폰 코드 입력
                </div>
                <div className="d-flex justify-content-left">
                  <input
                    onChange={e => this.inputChangeHandler(e)}
                    type="text"
                    name="coupon"
                    id="coupon"
                    className="if_input"
                  />
                  <div
                    className=" coupon_button ml-1"
                    onClick={() => this.couponSubmit()}
                  >
                    적용
                  </div>
                </div>
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

const styles = {
  labelStyle: {
    width: '50%',
    height: '100%',
    border: 'solid 2px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    color: '#1f3354',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1.08,
    fontSize: '1.7rem',
    cursor: 'pointer',
    marginBottom: '0'
  },
  onLabelStyle: {
    width: '50%',
    height: '100%',
    border: 'solid 2px #4c91ba',
    backgroundColor: 'transparent',
    color: '#1f3354',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1.08,
    fontSize: '1.7rem',
    cursor: 'pointer',
    marginBottom: '0'
  }
};
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(DesignerTicket)
);
