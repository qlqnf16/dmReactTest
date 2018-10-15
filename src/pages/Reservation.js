import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import ReservationForm from '../components/ReservationForm/ReservationForm';
import step2 from '../assets/images/step2.png';

import './PageCss.css';

class ReservationConfirm extends Component {
  state = {
    point: 0,
    reservationData: {
      time: {
        since: this.props.location.state.startTime,
        until:
          this.props.location.state.startTime + this.props.location.state.time
      },
      services: this.props.location.state.serviceFormat,
      _user: this.props.userData._id,
      _designer: this.props.location.state.recruit._designer._id,
      _card: this.props.location.state.cardData._id,
      date: this.props.location.state.cardData.date
    }
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
          errMsg += ' 에러내용 : ' + rsp.error_msg;
          alert(errMsg);
        }
      }
    );
  }
  reservationSubmit = async () => {
    const { data } = await axios.post(
      `http://52.79.227.227:3030/users/${this.props.userData._id}/reservations`,
      this.state.reservationData
    );
    this.setState({
      reservationId: data._id
    });
    console.log(data);
    alert('성공적으로 예약되었습니다');
  };

  render() {
    const startTime = this.props.location.state.startTime;
    const time = this.props.location.state.time;
    let startTimeFormat = `${parseInt(startTime / 60, 10)}:${
      startTime % 60 === 0 ? '00' : '30'
    }`;
    let finishTimeFormat = `${parseInt((startTime + time) / 60, 10)}:${
      (startTime + time) % 60 === 0 ? '00' : '30'
    }`;

    const recruit = this.props.location.state.recruit;
    const cardData = this.props.location.state.cardData;
    console.log(recruit);
    console.log(cardData);
    return (
      <div className="container-fluid mb-5">
        <div className="my-5 text-center">
          <img alt="alt" style={{ width: '100%' }} src={step2} />
        </div>
        <ReservationForm
          d_name={recruit._designer.name}
          startTime={startTimeFormat}
          finishTime={finishTimeFormat}
          shop={cardData.shop}
          service={this.props.location.state.service}
          price={this.props.location.state.price}
          date={cardData.date}
        />
        {/* // changeInput=
        {e => this.handleInputChange(e)} */}
        <div>
          <div
            className="r_button"
            onClick={() =>
              this.purchaseHandler(this.props.location.state.price)
            }
          >
            결제하기
          </div>
          <Link
            to={{
              pathname: `/reservationConfirm/${this.state.reservationId}`,
              state: {
                userName: this.props.userData.name,
                designerName: '디자이너 이름'
              }
            }}
          >
            <Button onClick={this.reservationSubmit} color="primary">
              결제 성공한 척 하기
            </Button>
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
