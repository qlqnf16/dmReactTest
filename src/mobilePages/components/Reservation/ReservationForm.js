import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const ReservationForm = props => {
  return (
    <div style={containerStyle}>
      <div style={titleStyle}>예약/결제</div>
      <div style={subtitleStyle}>예약자 정보</div>
      <div>
        <div className="row">
          <div
            className="col-4 text-right border-right py-3"
            style={labelStyle}
          >
            이름
          </div>
          <div className="col-8 py-3" style={valueStyle}>
            {props.userData.name}
          </div>
        </div>
        <div className="row">
          <div
            className="col-4 text-right border-right py-3"
            style={labelStyle}
          >
            이메일
          </div>
          <div className="col-8 py-3" style={valueStyle}>
            {props.userData.email}
          </div>
        </div>
        <div className="row">
          <div
            className="col-4 text-right border-right py-3"
            style={labelStyle}
          >
            휴대폰 번호
          </div>
          <div className="col-8 py-3" style={valueStyle}>
            <span>
              {typeof props.userData.phoneNumber === 'undefined'
                ? null
                : `${props.userData.phoneNumber.slice(
                    0,
                    3
                  )}-${props.userData.phoneNumber.slice(
                    3,
                    7
                  )}-${props.userData.phoneNumber.slice(7, 11)}`}
            </span>
            <br />
            <span>(예약 정보는 휴대폰 번호로 전송됩니다)</span>
          </div>
        </div>
      </div>
      <div style={subtitleStyle}>예약정보</div>
      <div className="row">
        <div
          className="col-4 text-right border-right py-3"
          style={labelStyle}
          style={labelStyle}
        >
          예디 이름
        </div>
        <div className="col-8 py-3" style={valueStyle}>
          {props.d_name}
        </div>
      </div>
      <div className="row">
        <div className="col-4 text-right border-right py-3" style={labelStyle}>
          날짜/시간
        </div>
        <div className="col-8 py-3" style={valueStyle}>
          <Moment unix format="YYYY/MM/DD">
            {props.date / 1000}
          </Moment>{' '}
          <span>
            {props.startTime} ~ {props.finishTime}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-4 text-right border-right py-3" style={labelStyle}>
          헤어샵
        </div>
        <div className="col-8 py-3" style={valueStyle}>
          {props.shop}
        </div>
      </div>
      <div className="row">
        <div className="col-4 text-right border-right py-3" style={labelStyle}>
          서비스
        </div>
        <div className="col-8 py-3" style={valueStyle}>
          {props.service}
        </div>
      </div>
      <div style={subtitleStyle}>결제정보</div>
      <div className="row">
        <div className="col-4 text-right border-right py-3" style={labelStyle}>
          총서비스가격
        </div>
        <div className="col-8 py-3" style={valueStyle}>
          5,000원
        </div>
      </div>
      <div className="row wrap">
        <div
          className="col-4 text-right border-right py-4"
          style={{ ...labelStyle, lineHeight: '2rem' }}
        >
          Point
        </div>
        <div className="col-8 py-3" style={valueStyle}>
          <input
            className="border p-2 col-9"
            onChange={e => props.handleInputChange(e)}
            type="number"
            name="point"
            id="point"
            value={props.state.point}
            step="1000"
            style={{ ...valueStyle, width: '60%' }}
          />
          <div
            className="col-3 p-2 text-center"
            onClick={props.pointSubmit}
            style={{
              ...valueStyle,
              fontWeight: 'bold',
              borderRadius: 6,
              backgroundColor: '#dd6866',
              color: 'white',
              lineHeight: '2rem',
              display: 'inline-block',
              marginLeft: '5%',
              height: '3rem'
            }}
          >
            적용
          </div>
          <div className="mt-2">
            1,000 point 단위로 사용 가능합니다.
            <br />
            (보유포인트 : {props.userData.point}
            원)
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4 text-right border-right py-3" style={labelStyle}>
          총결제금액
        </div>
        <div className="col-8 py-3" style={valueStyle}>
          {props.state.finalPrice}원
        </div>
      </div>
      <div style={subtitleStyle}>결제방법</div>

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
            props.method === 'card'
              ? { borderColor: '#dd6866', fontWeight: 'bold' }
              : { color: 'rgba(0,0,0,0.2)' }
          }
        >
          <input
            style={{ display: 'none' }}
            type="radio"
            name="method"
            id="card"
            onChange={props.handleInputChange}
            value="card"
          />
          <div>신용/체크카드</div>
        </label>
        <label
          for="trans"
          className="purchase_type"
          style={
            props.method === 'trans'
              ? { borderColor: '#dd6866', fontWeight: 'bold' }
              : { color: 'rgba(0,0,0,0.2)' }
          }
        >
          <input
            style={{ display: 'none' }}
            type="radio"
            name="method"
            id="trans"
            onChange={props.handleInputChange}
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
            props.method === 'vbank'
              ? { borderColor: '#dd6866', fontWeight: 'bold' }
              : { color: 'rgba(0,0,0,0.2)' }
          }
        >
          <input
            style={{ display: 'none' }}
            type="radio"
            name="method"
            id="vbank"
            onChange={props.handleInputChange}
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
            props.method === 'kakao'
              ? { borderColor: '#dd6866', fontWeight: 'bold' }
              : { color: 'rgba(0,0,0,0.2)' }
          }
        >
          <input
            style={{ display: 'none' }}
            type="radio"
            name="method"
            id="kakao"
            onChange={props.handleInputChange}
            value="kakao"
            disabled
            onClick={() => alert('준비 중입니다.')}
          />
          <div>카카오페이</div>
        </label>
      </div>
    </div>
  );
};

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
    color: '#dd6866',
    textAlign: 'left',
    margin: '33.5px 0',
    paddingBottom: '6.9px',
    borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)'
  },
  subtitleStyle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1f3354',
    margin: '1rem 0'
  },
  labelStyle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: 'black'
  },
  valueStyle: {
    fontSize: '1.1rem',
    color: 'black'
  }
};

const {
  containerStyle,
  titleStyle,
  subtitleStyle,
  labelStyle,
  valueStyle
} = styles;

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(ReservationForm);
