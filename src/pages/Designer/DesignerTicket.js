import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    ]
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
    console.log('hello', kind);
    const { IMP } = window;
    IMP.init('imp06037656');
    IMP.request_pay(
      {
        pg: 'danal', // version 1.1.0부터 지원.
        pay_method: 'card',
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: '주문명:결제테스트',
        amount: 100,
        buyer_email: 'user@email.com',
        buyer_name: '유저이름',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
        m_redirect_url: 'http://localhost:3000'
      },
      async rsp => {
        if (rsp.success) {
          var msg = '결제가 완료되었습니다.';
          msg += '고유ID : ' + rsp.imp_uid;
          msg += '상점 거래ID : ' + rsp.merchant_uid;
          msg += '결제 금액 : ' + rsp.paid_amount;
          msg += '카드 승인번호 : ' + rsp.apply_num;

          const { data } = await axios.post(
            `http://52.79.227.227:3030/users/${
              this.props.userData._id
            }/tickets`,
            { price: kind }
          );

          await this.reloadTicket();

          alert(msg);
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

    await axios.patch(
      `http://52.79.227.227:3030/users/${
        this.props.userData._id
      }/tickets/${ticketId}`
    );
    await alert('적용되었습니다.');
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
            <div className="row">
              <div className="col-4 py-2 mx-auto">
                {/* <TicketCounter
                  count={this.state.tickets.reduce(
                    (accu, pres) => (!pres.expiredAt ? accu + 1 : accu),
                    0
                  )}
                /> */}
                <TicketPurchaseButton purchaseHandler={this.purchaseHandler} />
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

export default connect(mapStateToProps)(DesignerTicket);
