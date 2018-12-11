import React from 'react';
import Moment from 'react-moment';

const Step2 = props => {
  return (
    <div>
      {/* <div className="h2 row mb-5" style={{ fontSize: '25px' }}>
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
      </div> */}
      <div>
        {/* <div>이름 : {props.state.name}</div>
        <div>성별 : {props.state.gender}</div>
        <div>번호 : {props.state.phoneNumber}</div>
        <div>
          생년월일 :{' '}
          <Moment format="YYYY/MM/DD">{props.state.birth * 1000}</Moment>
        </div> */}
        <div className="row">
          <div className="col-12 if_head_2 text-left">이름</div>
          <div className="col-12">
            <div
              className="if_head_2 text-left if_input"
              style={{
                textAlign: 'left',
                color: 'black',
                marginBottom: 13,
                fontWeight: 'normal',
                backgroundColor: '#ddd'
              }}
            >
              신한결
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 if_head_2 text-left">휴대폰 번호</div>
          <div className="col-12">
            <div
              className="if_head_2 text-left if_input"
              style={{
                textAlign: 'left',
                color: 'black',
                marginBottom: 13,
                fontWeight: 'normal',
                backgroundColor: '#ddd'
              }}
            >
              01036051212
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 if_head_2 text-left">이메일 주소</div>
          <div className="col-12">
            <input
              style={{ color: 'black', marginBottom: 13, fontWeight: 'normal' }}
              type="email"
              name="email"
              id="email"
              onChange={e => props.inputChangeHandler(e)}
              className="if_input"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 if_head_2 text-left">추천인 코드</div>
          <div className="col-12">
            <input
              style={{ color: 'black', marginBottom: 13, fontWeight: 'normal' }}
              type="text"
              name="recommendationCode"
              id="recommendationCode"
              onChange={e => props.inputChangeHandler(e)}
              className="if_input"
            />
          </div>
        </div>
        <div className="d-block text-center mt-5">
          <div
            // onClick={props.submitHandler}
            onClick={props.handleNext}
            className="btn"
            style={{
              textAlign: 'center',
              margin: '0 auto',
              padding: '0.3rem 2rem',
              color: 'white',
              backgroundColor: '#de6966',
              boxShadow: '2px 3px 10px rgba(0,0,0,0.5)',
              fontSize: '1.4rem',
              lineHeight: 2
            }}
          >
            저장하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
