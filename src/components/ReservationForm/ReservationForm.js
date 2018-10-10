import React, { Component } from 'react';
import './ReservationForm.css';

class ReservationForm extends Component {
  render() {
    return (
      <div className="container rf">
        <div className="row rf-title">
          <div className="col-9 rf-title-text1">예약/결제</div>
          {/* {예약번호: {this.props.match.params.card_id}} */}
          <div className="col-3 text-right rf-title-text2">
            예약결제 > <span style={{ color: '#bcbab7' }}>예약완료</span>
          </div>
        </div>
        <div>
          <div className="rf-tableTitle">예약자 정보</div>
          <div className="row">
            <div className="col-2  text-right rf-tableHead align-middle">
              이름
            </div>
            <div className="col-10">{this.props.name}</div>
          </div>
          <div className="row">
            <div className="col-2 text-right rf-tableHead align-middle">
              이메일
            </div>
            <div className="col-10">{this.props.email}</div>
          </div>
          <div className="row">
            <div className="col-2 text-right rf-tableHead">휴대폰 번호</div>
            <div className="col-10 d-inline">
              <input type="text" name="phonenumber" id="phonenumber" />
              <button>수정</button>
              예약 정보는 휴대폰 번호로 전송됩니다
            </div>
          </div>
        </div>
        <div>
          <div className="rf-tableTitle">예약정보</div>
          <div className="row">
            <div className="col-2  text-right rf-tableHead">막내 이름</div>
            <div className="col-10">{this.props.d_name}</div>
          </div>
          <div className="row">
            <div className="col-2  text-right rf-tableHead">날짜/시간</div>
            <div className="col-10">
              2018/00/00 {this.props.startTime} ~ {this.props.finishTime}
            </div>
          </div>
          <div className="row">
            <div className="col-2  text-right rf-tableHead">헤어샵</div>
            <div className="col-10">{this.props.shop}</div>
          </div>
          <div className="row">
            <div className="col-2  text-right rf-tableHead">서비스</div>
            <div className="col-10">{this.props.service}</div>
          </div>
        </div>
        <div>
          <div className="rf-tableTitle">결제정보</div>
          <div className="row">
            <div className="col-2  text-right rf-tableHead">총서비스가격</div>
            <div className="col-10">{this.props.price}원</div>
          </div>
          <div className="row">
            <div className="col-2 text-right rf-tableHead">Point</div>
            <div className="col-10 d-inline">
              <input type="text" name="phonenumber" id="phonenumber" />
              <button>적용</button>
              1,000 point 단위로 사용 가능합니다.
            </div>
          </div>
          <div className="row">
            <div className="col-2 text-right rf-tableHead">총결제금액</div>
            <div className="col-10">원</div>
          </div>
          <div className="row">
            <div className="col-2 text-right rf-tableHead">결제방법</div>
            <div className="col-10">
              <input type="radio" />
              신용/체크카드
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReservationForm;
