import React, { Fragment } from 'react';

const UserInfoForm = props => {
  const userData = props.userData;

  // 달력 만들기
  let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let day = [],
    year = [];
  for (let i = 1; i < 32; i++) {
    day.push(i);
  }
  for (let i = 2018; i > 1940; i--) {
    year.push(i);
  }
  if (userData && userData.month) {
    if (['4', '6', '9', '11'].includes(userData.month)) day.pop();
    else if (userData.month === '2')
      Number(userData.year) % 4 === 0 ? day.splice(29, 2) : day.splice(28, 3);
  }
  let m = month.map((m, key) => (
    <option key={key} value={m}>
      {m}월
    </option>
  ));
  let d = day.map((d, key) => (
    <option key={key} value={d}>
      {d}일
    </option>
  ));
  let y = year.map((y, key) => (
    <option key={key} value={y}>
      {y}년
    </option>
  ));

  const calendar = (
    <div className="row m-0">
      <select
        name="year"
        value={userData.year}
        onChange={props.inputChangeHandler}
      >
        {y}
      </select>
      <select
        name="month"
        value={userData.month}
        onChange={props.inputChangeHandler}
      >
        {m}
      </select>
      <select
        name="day"
        value={userData.day}
        onChange={props.inputChangeHandler}
      >
        {d}
      </select>
    </div>
  );
  return (
    <Fragment>
      <div>회원 정보 관리</div>
      <div>회원 정보 수정</div>
      성명{' '}
      <input
        type="text"
        name="name"
        id="name"
        onChange={props.inputChangeHandler}
        value={userData.name}
      />
      이메일 주소{' '}
      <input
        type="email"
        name="email"
        id="email"
        onChange={props.inputChangeHandler}
        value={userData.email}
      />
      생년월일 {calendar}
      전화번호{' '}
      <input
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        onChange={props.inputChangeHandler}
        value={userData.phoneNumber}
      />
      추천인 코드{' '}
      <input
        // 이미 입력된 추천인코드가 있다면 수정 안되도록
        onChange={userData.recommendationCode ? null : props.inputChangeHandler}
        type="text"
        name="recommendationCode"
        id="recommendationCode"
        value={userData.recommendationCode}
      />
      <div onClick={props.submitHandler}>저장하기</div>
    </Fragment>
  );
};

export default UserInfoForm;
