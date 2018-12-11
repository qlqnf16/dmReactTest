import React from 'react';
import Moment from 'react-moment';

const Step1 = props => {
  return (
    <div>
      <div className="h2">회원가입</div>
      <div className="h2">STEP 2</div>
      <div>
        <div>이름 : {props.state.name}</div>
        <div>성별 : {props.state.gender}</div>
        <div>번호 : {props.state.phoneNumber}</div>
        <div>
          생년월일 :{' '}
          <Moment format="YYYY/MM/DD">{props.state.birth * 1000}</Moment>
        </div>
        <div className="row">
          <div className="col-2 if_head uif_head">이메일 주소</div>
          <div className="col-10">
            <input
              type="email"
              name="email"
              id="email"
              onChange={e => props.inputChangeHandler(e)}
              className="if_input"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-2 if_head uif_head">추천인 코드</div>
          <div className="col-10">
            <input
              type="text"
              name="recommendationCode"
              id="recommendationCode"
              onChange={e => props.inputChangeHandler(e)}
              className="if_input"
            />
          </div>
        </div>
        <div className="text-center">
          <div onClick={props.submitHandler} className=" btn uif_button">
            <span style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
              저장하기
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
