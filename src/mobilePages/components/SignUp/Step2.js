import React from 'react';
import Moment from 'react-moment';

const Step2 = props => {
  return (
    <div style={{ marginTop: '7rem' }}>
      <div className="h2 row mb-5" style={{ fontSize: '25px' }}>
        <div className="col-5 text-right" style={{ color: 'rgba(0,0,0,0.5)' }}>
          STEP 1
        </div>
        <div className="col-2 text-center">></div>
        <div
          className="col-5 text-left"
          style={{ color: '#1f3354', fontWeight: 'bold' }}
        >
          STEP 2
        </div>
      </div>
      <div>
        {/* <div>이름 : {props.state.name}</div>
        <div>성별 : {props.state.gender}</div>
        <div>번호 : {props.state.phoneNumber}</div>
        <div>
          생년월일 :{' '}
          <Moment format="YYYY/MM/DD">{props.state.birth * 1000}</Moment>
        </div> */}
        <div className="row">
          <div className="col-3 if_head uif_head">이름</div>
          <div className="col-9">
            <div className="if_head uif_head" style={{ textAlign: 'left' }}>
              {' '}
              : 신한결
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3 if_head uif_head">휴대폰 번호</div>
          <div className="col-9">
            <div className="if_head uif_head" style={{ textAlign: 'left' }}>
              {' '}
              : 01036051212
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3 if_head uif_head">이메일 주소</div>
          <div className="col-9">
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
          <div className="col-3 if_head uif_head">추천인 코드</div>
          <div className="col-9">
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

export default Step2;
