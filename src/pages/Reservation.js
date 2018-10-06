import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

class ReservationConfirm extends Component {
  state = {
    madeRequest: false
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

    if (!this.state.madeRequest) {
      // TODO: url로 넘겨받은 {this.props.match.params.card_id} 를 이용해서 db에서 정보 추출해서 넣기

      this.setState({ madeRequest: true });
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
          errMsg += ' 에러내용 : ' + rsp.error_msg;
          alert(errMsg);
        }
      }
    );
  }

  render() {
    const startTime = this.props.location.state.startTime;
    const time = this.props.location.state.time;
    let startTimeFormat = `${parseInt(startTime / 60, 10)} : ${
      startTime % 60 === 0 ? '00' : '30'
    }`;
    let finishTimeFormat = `${parseInt((startTime + time) / 60, 10)} : ${
      (startTime + time) % 60 === 0 ? '00' : '30'
    }`;
    return (
      <div className="container mb-5">
        <div className="m-5 text-center">
          <h1>2단계 예약하기 </h1>
        </div>
        <div className="m-5">
          <h2>예약/결제</h2>
          {/* <h2>예약 번호 : {this.props.match.params.card_id}</h2> */}
        </div>
        <div>
          <h4>예약자 정보</h4>
          <h5 className="m-4">이름 : {this.props.userData.name} </h5>
          <h5 className="m-4">이메일 : {this.props.userData.email} </h5>
          <h5 className="m-4">휴대폰 번호 : </h5>
        </div>
        <div>
          <h4>예약 정보</h4>
          <h5 className="m-4">막내 이름 : </h5>
          <h5 className="m-4">
            날짜 / 시간 : 2018/00/00 {startTimeFormat} ~ {finishTimeFormat}
          </h5>
          <h5 className="m-4">헤어샵 : </h5>
          <h5 className="m-4">서비스 : </h5>
        </div>
        <div>
          <h4>결제 정보</h4>
          <h5 className="m-4">
            총 서비스 가격 : {this.props.location.state.price}원
          </h5>
          <h5 className="m-4">Point : </h5>
          <h5 className="m-4">총 결제 금액 : </h5>
          <h5 className="m-4">결제 방법 : </h5>

          <div
            className="btn btn-danger"
            onClick={() =>
              this.purchaseHandler(this.props.location.state.price)
            }
          >
            결제하기
          </div>
          <Link
            to={{
              pathname: `/reservationConfirm/${'reservation_id'}`,
              state: {
                userName: this.props.userData.name,
                designerName: '디자이너 이름'
              }
            }}
          >
            <Button color="primary">결제 성공한 척 하기</Button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(ReservationConfirm);
