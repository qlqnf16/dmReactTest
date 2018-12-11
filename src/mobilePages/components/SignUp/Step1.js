import React from 'react';

const Step1 = props => {
  return (
    <div style={{ marginTop: '7rem' }}>
      <div className="h2 row mb-5" style={{ fontSize: '25px' }}>
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
      </div>
      <div className="if_detail">
        <input
          type="checkbox"
          id="phoneNumberAgree"
          name="phoneNumberAgree"
          onChange={e => props.inputChangeHandler(e)}
        />
        <label htmlFor="phoneNumberAgree">
          휴대폰 번호 수집에 대한 개인정보 제공에 동의합니다.
        </label>
      </div>
      <div
        className="btn"
        style={{
          width: '20rem',
          height: '5rem',
          color: '#dd6866',
          border: 'solid 1px #dd6866',
          fontSize: '2rem',
          lineHeight: 2
        }}
        onClick={() => props.phoneCert()}
      >
        인증
      </div>
    </div>
  );
};

export default Step1;
