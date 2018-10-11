import React, { Component } from 'react';
import './ReservationForm.css';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class ReservationForm extends Component {
  state = {
    point: 0,
    finalPrice: this.props.price
  };

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  pointSubmit = () => {
    if (this.state.point % 1000 === 0) {
      this.setState({
        finalPrice: this.props.price - Number(this.state.point)
      });
    } else {
      alert('1,000 point 단위로 사용 가능합니다.');
    }
  };

  render() {
    console.log(this.props.userData);
    return (
      <div className="container rf">
        <div className="row rf-title d-flex justify-content-between">
          <div className="rf-title-text1">예약/결제</div>
          {/* {예약번호: {this.props.match.params.card_id}} */}
          <div className="text-right rf-title-text2">
            예약결제 > <span style={{ color: '#bcbab7' }}>예약완료</span>
          </div>
        </div>
        <div>
          <div className="rf-tableTitle">예약자 정보</div>
          <div className="row">
            <div className="col-2  text-right rf-tableHead rf-tableTop">
              이름
            </div>
            <div className="col-10 rf-tableBody rf-tableTop">
              {this.props.userData.name}
            </div>
          </div>
          <div className="row">
            <div className="col-2 text-right rf-tableHead align-middle">
              이메일
            </div>
            <div className="col-10 rf-tableBody">
              {this.props.userData.email}
            </div>
          </div>
          <div className="row">
            <div className="col-2 text-right rf-tableHead">휴대폰 번호</div>
            <div className="col-10 rf-tableBody">
              {typeof this.props.userData.phoneNumber === 'undefined'
                ? null
                : `${this.props.userData.phoneNumber.slice(
                    0,
                    3
                  )}-${this.props.userData.phoneNumber.slice(
                    3,
                    7
                  )}-${this.props.userData.phoneNumber.slice(7, 10)}`}
              <span className="ml-5 font-weight-light">
                예약 정보는 휴대폰 번호로 전송됩니다
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="rf-tableTitle">예약정보</div>
          <div className="row">
            <div className="col-2  text-right rf-tableHead rf-tableTop">
              막내 이름
            </div>
            <div className="col-10 rf-tableBody rf-tableTop">
              {this.props.d_name}
            </div>
          </div>
          <div className="row">
            <div className="col-2  text-right rf-tableHead">날짜/시간</div>
            <div className="col-10 rf-tableBody">
              <Moment unix format="YYYY/MM/DD">
                {this.props.date / 1000}
              </Moment>{' '}
              <span className="ml-2">
                {this.props.startTime} ~ {this.props.finishTime}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-2  text-right rf-tableHead">헤어샵</div>
            <div className="col-10 rf-tableBody">{this.props.shop}</div>
            {/* <div className="col-10 rf-tableBody" /> */}
          </div>
          <div className="row">
            <div className="col-2  text-right rf-tableHead">서비스</div>
            <div className="col-10 rf-tableBody">{this.props.service}</div>
          </div>
        </div>
        <div>
          <div className="rf-tableTitle">결제정보</div>
          <div className="row">
            <div className="col-2  text-right rf-tableHead rf-tableTop">
              총서비스가격
            </div>
            <div
              className="col-10 rf-tableBody rf-tableTop"
              style={{ fontFamily: 'NanumSquareEB' }}
            >
              {this.props.price}원
            </div>
          </div>
          <div className="row">
            <div className="col-2 text-right rf-tableHead">Point</div>
            <div className="col-10 rf-tableBody">
              <input
                onChange={this.handleInputChange}
                type="number"
                name="point"
                id="point"
                className="rf-input"
                value={this.state.point}
                step="1000"
              />
              <button onClick={this.pointSubmit} className="rf-button">
                적용
              </button>
              <span className="font-weight-light">
                1,000 point 단위로 사용 가능합니다.
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-2 text-right rf-tableHead">총결제금액</div>
            <div
              className="col-10 rf-tableBody"
              style={{ fontFamily: 'NanumSquareEB', color: '#dd6866' }}
            >
              {this.state.finalPrice}원
            </div>
          </div>
          <div className="row">
            <div className="col-2 text-right rf-tableHead">결제방법</div>
            <div
              className="col-10 rf-tableBody"
              style={{ fontFamily: 'NanumSquareEB' }}
            >
              <input
                type="radio"
                name="payment"
                style={{ marginRight: '3.5px' }}
              />
              <span style={{ marginRight: '21.5px' }}>신용/체크카드</span>
              <input
                type="radio"
                name="payment"
                style={{ marginRight: '3.5px' }}
              />
              휴대폰
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

export default connect(mapStateToProps)(ReservationForm);
