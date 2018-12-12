import React from 'react';

const Step2 = props => {
  return (
    <div>
      <div>
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
              {props.state.name}
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
              {props.state.phoneNumber}
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
              value={props.state.email}
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
            onClick={() => props.submitHandler()}
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
