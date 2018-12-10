import React from 'react';

const Step1 = props => {
  return (
    <div>
      <div className="h2">회원가입</div>
      <div className="h2">STEP 1</div>
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
        className="btn uif_button uif_phone"
        onClick={() => props.phoneCert()}
      >
        인증
      </div>
    </div>
  );
};

export default Step1;
