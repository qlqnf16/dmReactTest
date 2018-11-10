import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const ReservationForm = props => {
  return (
    <div>
      <div>
        <div>예약/결제</div>
        <div>예약결제 > 예약완료</div>
      </div>
      <div>
        <div>예약자 정보</div>
        <div>
          <div>이름</div>
          <div>{props.userData.name}</div>
        </div>
        <div>
          <div>이메일</div>
          <div>{props.userData.email}</div>
        </div>
        <div>
          <div>휴대폰 번호</div>
          <div>
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
            <span>예약 정보는 휴대폰 번호로 전송됩니다</span>
          </div>
        </div>
      </div>
      <div>
        <div>예약정보</div>
        <div>
          <div>예디 이름</div>
          <div>{props.d_name}</div>
        </div>
        <div>
          <div>날짜/시간</div>
          <div>
            <Moment unix format="YYYY/MM/DD">
              {props.date / 1000}
            </Moment>{' '}
            <span>
              {props.startTime} ~ {props.finishTime}
            </span>
          </div>
        </div>
        <div>
          <div>헤어샵</div>
          <div>{props.shop}</div>
        </div>
        <div>
          <div>서비스</div>
          <div>{props.service}</div>
        </div>
      </div>
      <div>
        <div>결제정보</div>
        <div>
          <div>총서비스가격</div>
          <div>5,000원</div>
        </div>
        <div>
          <div>Point</div>
          <div>
            <input
              onChange={e => props.handleInputChange(e)}
              type="number"
              name="point"
              id="point"
              value={props.state.point}
              step="1000"
            />
            <button onClick={props.pointSubmit}>적용</button>
            <span>
              1,000 point 단위로 사용 가능합니다. 보유포인트 :{' '}
              {props.userData.point}원
            </span>
          </div>
        </div>
        <div>
          <div>총결제금액</div>
          <div>{props.state.finalPrice}원</div>
        </div>
        <div>
          <div>결제방법</div>
          <div>
            <input
              type="radio"
              name="method"
              value="card"
              onChange={props.handleInputChange}
              checked={props.method === 'card'}
            />
            <span>신용/체크카드</span>
            <input
              type="radio"
              name="method"
              value="trans"
              onChange={props.handleInputChange}
              checked={props.method === 'trans'}
            />
            <span>실시간 계좌이체</span>
            <input
              type="radio"
              name="method"
              value="vbank"
              onChange={props.handleInputChange}
              checked={props.method === 'vbank'}
            />
            <span>가상계좌</span>
            <input
              type="radio"
              name="method"
              value="kakaopay"
              onChange={props.handleInputChange}
              checked={props.method === 'kakaopay'}
            />
            카카오페이
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(ReservationForm);
