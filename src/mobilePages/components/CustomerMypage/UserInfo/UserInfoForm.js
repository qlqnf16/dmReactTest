import React from 'react';

const UserInfoForm = props => {
  const userData = props.userData;
  const {
    containerStyle,
    titleStyle,
    subtitleStyle,
    labelStyle,
    inputTextStyle,
    calendarStyle,
    buttonStyle,
    phoneButtonStyle
  } = styles;

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
        style={calendarStyle}
        name="year"
        value={userData.year}
        onChange={props.inputChangeHandler}
      >
        {y}
      </select>
      <select
        style={calendarStyle}
        name="month"
        value={userData.month}
        onChange={props.inputChangeHandler}
      >
        {m}
      </select>
      <select
        style={calendarStyle}
        name="day"
        value={userData.day}
        onChange={props.inputChangeHandler}
      >
        {d}
      </select>
    </div>
  );

  let isRegister;
  if (!userData.isRegister) {
    isRegister = (
      <div onClick={props.phoneCert} style={phoneButtonStyle}>
        인증
      </div>
    );
  } else {
    isRegister = (
      <div
        style={{
          ...phoneButtonStyle,
          backgroundColor: 'transparent',
          color: '#66ce82',
          border: 'solid 1px #66ce82'
        }}
      >
        인증됨
      </div>
    );
  }
  return (
    <div style={containerStyle}>
      <div style={titleStyle}>회원 정보 관리</div>
      <div style={subtitleStyle}>회원 정보 수정</div>
      <span style={labelStyle}>성명</span>
      <input
        style={inputTextStyle}
        type="text"
        name="name"
        id="name"
        onChange={props.inputChangeHandler}
        value={userData.name}
      />
      <span style={labelStyle}>이메일 주소</span>
      <input
        style={inputTextStyle}
        type="email"
        name="email"
        id="email"
        onChange={props.inputChangeHandler}
        value={userData.email}
      />
      <span style={labelStyle}>생년월일</span> {calendar}
      <span style={labelStyle}>전화번호</span>
      <div>
        <input
          style={{ ...inputTextStyle, width: '78.7%' }}
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          onChange={props.inputChangeHandler}
          value={userData.phoneNumber}
        />
        {isRegister}
      </div>
      <span style={labelStyle}>추천인 코드</span>
      <input
        style={inputTextStyle} // 이미 입력된 추천인코드가 있다면 수정 안되도록
        onChange={userData.recommendationCode ? null : props.inputChangeHandler}
        type="text"
        name="recommendationCode"
        id="recommendationCode"
        value={userData.recommendationCode}
      />
      <div
        style={{ ...buttonStyle, backgroundColor: '#dd6866' }}
        onClick={props.submitHandler}
      >
        저장하기
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
    margin: '33.5px 0'
  },
  subtitleStyle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1f3354'
  },
  labelStyle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#1e3354',
    marginTop: '1.5rem',
    marginBottom: '0.2rem'
  },
  inputTextStyle: {
    fontSize: '1.3rem',
    color: '#1f3354',
    padding: '0.7rem',
    borderRadius: '5px',
    border: 'solid 1px rgba(0, 0, 0, 0.1)'
  },
  calendarStyle: {
    width: '30%',
    fontSize: '1.3rem',
    color: '#1f3354',
    marginRight: '3.3%',
    padding: '0.7rem',
    paddingTop: '0.5rem',
    backgroundImage:
      'linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%)',
    backgroundPosition:
      'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)',
    backgroundSize: '5px 5px, 5px 5px',
    backgroundRepeat: 'no-repeat'
  },
  buttonStyle: {
    height: '3.9rem',
    color: 'white',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginTop: '2.5rem',
    marginBottom: '4rem',
    borderRadius: 6,
    backgroundColor: '#4c91ba',
    textAlign: 'center',
    lineHeight: '3.9rem'
  },
  phoneButtonStyle: {
    display: 'inline-block',
    width: '18%',
    marginLeft: '3.3%',
    padding: '2.3%',
    border: '1px solid #dd6866',
    backgroundColor: '#dd6866',
    borderRadius: '5px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.3rem',
    textAlign: 'center'
  }
};

export default UserInfoForm;
