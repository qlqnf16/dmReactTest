import React, { Component } from 'react';
import './ReservationForm.css';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class ReservationForm extends Component {
  state = {
    point: 0,
    finalPrice: 5000
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

  render() {
    return (
      <div className="container-fluid rf">
        <div className="row rf-title d-flex justify-content-between">
          <div className="rf-title-text1">예약/결제</div>
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
            <div className="col-10 rf-tableBody mx-0">
              <span className="p-1 mr-3">
                {typeof this.props.userData.phoneNumber === 'undefined'
                  ? null
                  : `${this.props.userData.phoneNumber.slice(
                      0,
                      3
                    )}-${this.props.userData.phoneNumber.slice(
                      3,
                      7
                    )}-${this.props.userData.phoneNumber.slice(7, 11)}`}
              </span>
              <span className=" font-weight-light p-1">
                예약 정보는 휴대폰 번호로 전송됩니다
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="rf-tableTitle">예약정보</div>
          <div className="row">
            <div className="col-2  text-right rf-tableHead rf-tableTop">
              예디 이름
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
              5,000원
            </div>
          </div>
          <div className="row">
            <div className="col-2 text-right rf-tableHead">Point</div>
            <div className="col-10 rf-tableBody m-0">
              <input
                onChange={e => this.props.handleInputChange(e)}
                type="number"
                name="point"
                id="point"
                className="rf-input mx-0"
                value={this.props.state.point}
                step="1000"
              />
              <button onClick={this.props.pointSubmit} className="rf-button">
                적용
              </button>
              <span className="font-weight-light">
                1,000 point 단위로 사용 가능합니다. 보유포인트 :{' '}
                {this.props.userData.point} point
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-2 text-right rf-tableHead">총결제금액</div>
            <div
              className="col-10 rf-tableBody"
              style={{ fontFamily: 'NanumSquareEB', color: '#dd6866' }}
            >
              {this.props.state.finalPrice}원
            </div>
          </div>
          <div className="row">
            <div className="col-2 text-right rf-tableHead">결제방법</div>
            <div
              className="col-10 rf-tableBody"
              style={{ fontFamily: 'NanumSquareEB' }}
            >
              <label className="rf-hideinput">
                <input
                  type="radio"
                  name="method"
                  value="card"
                  onChange={this.props.handleInputChange}
                  checked={this.props.method === 'card'}
                  style={{ marginRight: '3.5px' }}
                />
                <span className="rf-radiobutton" />
                <span style={{ marginRight: '21.5px' }}>신용/체크카드</span>
              </label>
              <label className="rf-hideinput">
                <input
                  type="radio"
                  name="method"
                  value="kakaopay"
                  onChange={this.props.handleInputChange}
                  checked={this.props.method === 'kakaopay'}
                  style={{ marginRight: '3.5px' }}
                />
                <span className="rf-radiobutton" />
                <span style={{ marginRight: '21.5px' }}>카카오페이</span>
              </label>
              {/* <span style={{ fontSize: "1.1rem", color: "gray" }}>
                * 실시간 계좌이체, 가상계좌 결제가 빠른 시일 내에 가능해질
                예정입니다. 조금만 기다려주세요!
              </span> */}
              <label className="rf-hideinput">
                <input
                  type="radio"
                  name="method"
                  value="trans"
                  onChange={this.props.handleInputChange}
                  checked={this.props.method === 'trans'}
                  style={{ marginRight: '3.5px' }}
                />
                <span className="rf-radiobutton" />
                <span style={{ marginRight: '21.5px' }}>실시간 계좌이체</span>
              </label>
              <label className="rf-hideinput">
                <input
                  type="radio"
                  name="method"
                  value="phone"
                  onChange={this.props.handleInputChange}
                  checked={this.props.method === 'phone'}
                  style={{ marginRight: '3.5px' }}
                />
                <span className="rf-radiobutton" />
                <span style={{ marginRight: '21.5px' }}>휴대폰 소액결제</span>
              </label>
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
