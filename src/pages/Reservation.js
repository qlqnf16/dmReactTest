import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import axios from '../config/Axios';
import ReservationForm from '../components/ReservationForm/ReservationForm';
import step2 from '../assets/images/step2.png';
import * as actions from '../modules';

import './PageCss.css';

class Reservation extends Component {
  state = {
    point: 0,
    finalPrice: 5000,
    method: null,
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

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  pointSubmit = () => {
    if (this.state.point % 1000 === 0) {
      if (this.state.point > this.props.userData.point) {
        alert('보유 포인트보다 많이 사용할 수 없습니다');
      } else {
        this.setState({
          finalPrice: 5000 - Number(this.state.point)
        });
      }
    } else {
      alert('1,000 point 단위로 사용 가능합니다.');
    }
  };

  purchaseHandler = async kind => {
    if (kind >= 1000) {
      const { IMP } = window;
      IMP.init('imp06037656');
      IMP.request_pay(
        {
          pg: `${this.state.method === 'kakaopay' ? 'kakaopay' : 'danal'}`, // version 1.1.0부터 지원.
          pay_method: this.state.method,
          merchant_uid: 'merchant_' + new Date().getTime(),
          name: '주문명: 예약',
          amount: kind,
          buyer_email: this.props.userData.email,
          buyer_name: this.props.userData.name,
          buyer_tel: this.props.userData.phoneNumber
        },
        async rsp => {
          if (rsp.success) {
            //포인트 차감
            const {
              data: { point }
            } = await axios.patch(`users/${this.props.userData._id}/addpoint`, {
              point: this.state.finalPrice - 5000
            });
            await this.props.updateRedux('point', point);

            const { data } = await axios.post(
              `users/${this.props.userData._id}/reservations`,
              this.state.reservationData
            );
            await this.props.history.push({
              pathname: `/reservationConfirm/${data._id}`,
              state: {
                userName: this.props.userData.name,
                recruit: this.props.location.state.recruit,
                cardData: this.props.location.state.cardData,
                service: this.props.location.state.service,
                startTime: this.props.location.state.startTime,
                time: this.props.location.state.time
              }
            });

            alert('결제가 완료되었습니다. 결제 금액 : ' + rsp.paid_amount);
          } else {
            var errMsg = '결제에 실패하였습니다.';
            errMsg += ' 에러내용 : ' + rsp.error_msg;
            alert(errMsg);
          }
        }
      );
    } else {
      // 포인트 차감
      const {
        data: { point }
      } = await axios.patch(`users/${this.props.userData._id}/addpoint`, {
        point: this.state.finalPrice - 5000
      });
      await this.props.updateRedux('point', point);

      const { data } = await axios.post(
        `users/${this.props.userData._id}/reservations`,
        this.state.reservationData
      );
      await this.props.history.push({
        pathname: `/reservationConfirm/${data._id}`,
        state: {
          userName: this.props.userData.name,
          recruit: this.props.location.state.recruit,
          cardData: this.props.location.state.cardData,
          service: this.props.location.state.service,
          startTime: this.props.location.state.startTime,
          time: this.props.location.state.time
        }
      });
    }
  };
  reservationSubmit = async () => {
    const { data } = await axios.post(
      `users/${this.props.userData._id}/reservations`,
      this.state.reservationData
    );
    this.setState({
      reservationId: data._id
    });
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
    return (
      <div className="mb-5">
        <div className="mb-5 text-center">
          <img alt="alt" style={{ width: '100%' }} src={step2} />
        </div>
        <div className="container">
          <ReservationForm
            d_name={recruit._designer.name}
            startTime={startTimeFormat}
            finishTime={finishTimeFormat}
            shop={cardData.shop}
            service={this.props.location.state.service}
            price={this.props.location.state.price}
            date={cardData.date}
            method={this.state.method}
            state={this.state}
            handleInputChange={this.handleInputChange}
            pointSubmit={this.pointSubmit}
          />
          <div>
            <div
              className="r_button"
              onClick={() => this.purchaseHandler(this.state.finalPrice)}
            >
              결제하기
            </div>
            <Link
              to={{
                pathname: `/reservationConfirm/${this.state.reservationId}`,
                state: {
                  userName: this.props.userData.name,
                  recruit,
                  cardData,
                  service: this.props.location.state.service
                }
              }}
            >
              <Button onClick={this.reservationSubmit} color="primary">
                결제 성공한 척 하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(
  mapStateToProps,
  actions
)(Reservation);
