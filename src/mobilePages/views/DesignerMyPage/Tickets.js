import React, { Component } from 'react';
import DesignerNav from '../../components/NavigationBar/DesignerNav';
import { connect } from 'react-redux';
import * as actions from '../../../modules';
import axios from '../../../config/Axios';
import TicketBox from '../../components/Tickets/TicketBox';
import TicketPurchaseButton from '../../components/Tickets/TicketPurchase';
import './Tickets.css';

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
        pg: 'danal', // version 1.1.0부터 지원.
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
      alert('쿠폰이 적용 되었습니다.');
    } catch (err) {
      alert('유효하지 않은 쿠폰번호 입니다.');
    }
  };

  render() {
    return (
      <div>
        <DesignerNav />
        <div className="m_containerStyle">
          <div style={containerStyle}>
            <div style={titleStyle}>이용권 관리</div>
            <div style={subtitleStyle}>보유 이용권</div>
            <TicketBox
              tickets={this.state.tickets}
              ticketActivate={this.ticketActivate}
            />
            <div style={subtitleStyle}>이용권 구매</div>

            <div
              className="m-3"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
              }}
            >
              <label
                for="card"
                className="purchase_type"
                style={
                  this.state.method === 'card'
                    ? { borderColor: '#4c91ba', fontWeight: 'bold' }
                    : { color: 'rgba(0,0,0,0.2)' }
                }
              >
                <input
                  style={{ display: 'none' }}
                  type="radio"
                  name="method"
                  id="card"
                  onChange={this.inputChangeHandler}
                  value="card"
                />
                <div>신용/체크카드</div>
              </label>
              <label
                for="trans"
                className="purchase_type"
                style={
                  this.state.method === 'trans'
                    ? { borderColor: '#4c91ba', fontWeight: 'bold' }
                    : { color: 'rgba(0,0,0,0.2)' }
                }
              >
                <input
                  style={{ display: 'none' }}
                  type="radio"
                  name="method"
                  id="trans"
                  onChange={this.inputChangeHandler}
                  value="trans"
                  disabled
                  onClick={() => alert('준비 중입니다.')}
                />
                <div>실시간 계좌이체</div>
              </label>
              <label
                for="vbank"
                className="purchase_type"
                style={
                  this.state.method === 'vbank'
                    ? { borderColor: '#4c91ba', fontWeight: 'bold' }
                    : { color: 'rgba(0,0,0,0.2)' }
                }
              >
                <input
                  style={{ display: 'none' }}
                  type="radio"
                  name="method"
                  id="vbank"
                  onChange={this.inputChangeHandler}
                  value="vbank"
                  disabled
                  onClick={() => alert('준비 중입니다.')}
                />
                <div>가상 계좌</div>
              </label>
              <label
                for="kakao"
                className="purchase_type"
                style={
                  this.state.method === 'kakao'
                    ? { borderColor: '#4c91ba', fontWeight: 'bold' }
                    : { color: 'rgba(0,0,0,0.2)' }
                }
              >
                <input
                  style={{ display: 'none' }}
                  type="radio"
                  name="method"
                  id="kakao"
                  onChange={this.inputChangeHandler}
                  value="kakao"
                  disabled
                  onClick={() => alert('준비 중입니다.')}
                />
                <div>카카오페이</div>
              </label>
            </div>

            <TicketPurchaseButton purchaseHandler={this.purchaseHandler} />
            <div style={subtitleStyle}>프로모션 코드 입력</div>
            <div>
              <input
                style={inputTextStyle}
                onChange={e => this.inputChangeHandler(e)}
                type="text"
                name="coupon"
                id="coupon"
              />
              <div style={buttonStyle} onClick={() => this.couponSubmit()}>
                포인트 적립
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  containerStyle: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  titleStyle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#4c91ba',
    textAlign: 'left',
    margin: '33.5px 0',
    paddingBottom: 6.9,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
  },
  subtitleStyle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1f3354',
    marginBottom: '1.5rem'
  },
  buttonStyle: {
    display: 'inline-block',
    marginLeft: '3.3%',
    padding: '2.3%',
    width: '30%',
    border: '1px solid #4c91ba',
    backgroundColor: '#4c91ba',
    borderRadius: '5px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.3rem',
    textAlign: 'center'
  },
  inputTextStyle: {
    fontSize: '1.3rem',
    color: '#1f3354',
    padding: '0.7rem',
    borderRadius: '5px',
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    width: '66.7%'
  }
};

const {
  containerStyle,
  titleStyle,
  subtitleStyle,
  inputTextStyle,
  buttonStyle
} = styles;

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(
  mapStateToProps,
  actions
)(DesignerTicket);
