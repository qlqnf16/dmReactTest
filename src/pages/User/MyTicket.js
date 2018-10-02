import React, { Component } from 'react';
import UserNav from '../../components/Navigation/UserNav/UserNav';
import TicketBox from '../../components/UI/Ticket/TicketBox/TicketBox';
import TicketCounter from '../../components/UI/Ticket/TicketCounter/TicketCounter';
import TicketPurchaseButton from '../../components/UI/Ticket/TicketPurchaseButton/TicketPurchaseButton';

class MyTicket extends Component {
  state = {
    tickets: [
      {
        price: 3000,
        purchasedAt: 201809015,
        expiredAt: null
      },
      {
        price: 5000,
        purchasedAt: 20180810,
        expiredAt: 20180811
      }
    ]
  };

  componentDidMount = () => {
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
  };

  purchaseHandler(kind) {
    console.log('hello', kind);
    const { IMP } = window;
    IMP.init('imp38067773');
    IMP.request_pay(
      {
        pg: 'inicis', // version 1.1.0부터 지원.
        pay_method: 'card',
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: '주문명:결제테스트',
        amount: kind,
        buyer_email: 'user@email.com',
        buyer_name: '유저이름',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
        m_redirect_url: 'http://localhost:3000'
      },
      function(rsp) {
        if (rsp.success) {
          var msg = '결제가 완료되었습니다.';
          msg += '고유ID : ' + rsp.imp_uid;
          msg += '상점 거래ID : ' + rsp.merchant_uid;
          msg += '결제 금액 : ' + rsp.paid_amount;
          msg += '카드 승인번호 : ' + rsp.apply_num;
          alert(msg);
        } else {
          var errMsg = '결제에 실패하였습니다.';
          errMsg += '에러내용 : ' + rsp.error_msg;
          alert(errMsg);
        }
      }
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <UserNav />
          <div className="col-10 my-5">
            <h1>이용권 관리</h1>
            <div className="row">
              <div className="col-4  py-2">
                <TicketCounter
                  count={this.state.tickets.reduce(
                    (accu, pres) => (!pres.expiredAt ? accu + 1 : accu),
                    0
                  )}
                />
                <TicketPurchaseButton purchase={this.purchaseHandler} />
              </div>
              <div className="col-8">
                <TicketBox tickets={this.state.tickets} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyTicket;
