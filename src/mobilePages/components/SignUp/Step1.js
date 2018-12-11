import React from 'react';

const Step1 = props => {
  return (
    <div>
      {/* <div className="h2 row mb-5" style={{ fontSize: '25px' }}>
        <div
          className="col-5 text-right"
          style={{ color: '#1f3354', fontWeight: 'bold' }}
        >
          STEP 1
        </div>
        <div className="col-2 text-center">></div>
        <div className="col-5 text-left" style={{ color: 'rgba(0,0,0,0.5)' }}>
          STEP 2
        </div>
      </div> */}
      <div className="if_detail d-flex mb-3">
        <input
          type="checkbox"
          id="phoneNumberAgree"
          name="phoneNumberAgree"
          onChange={e => props.inputChangeHandler(e)}
        />
        <label
          style={{ fontSize: 12, color: 'black', marginLeft: 5 }}
          htmlFor="phoneNumberAgree"
        >
          휴대폰 번호 수집에 대한 개인정보 제공에 동의합니다.
        </label>
      </div>
      <div className="d-block text-center">
        <div
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
          onClick={() => props.phoneCert()}
        >
          휴대폰 인증
        </div>
      </div>
    </div>
  );
};

export default Step1;
