import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Calendar from 'rc-calendar';
import koKR from 'rc-calendar/lib/locale/ko_KR';
import 'rc-calendar/assets/index.css';
import moment from 'moment';
import questionMark from '../../../assets/images/question_navy.png';
import womanBack from '../../../assets/images/m_woman_back.png';
import ReactTooltip from 'react-tooltip';
import './AddCardModal.css';

const AddCardModal = props => {
  const timeSelector = () => {
    console.log(props.fixStart);
    let timeSelector = [];
    for (let i = 0; i < props.time; i++) {
      let times = [];
      let startTime = 540;
      if (i > 0) {
        startTime = props.untils[i - 1];
      }
      for (let j = startTime; j < 1560; j = j + 60) {
        times.push(j);
      }
      let ts = times.map((time, key) => (
        <option key={key} value={time}>
          {time / 60 > 23 ? time / 60 - 24 : time / 60}
          :00 부터
        </option>
      ));
      let finishTimes = [];
      for (let j = props.sinces[i]; j < 1560; j = j + 60) {
        finishTimes.push(j);
      }
      let finishts = finishTimes.map((ftime, key) => (
        <option key={key} value={ftime}>
          {ftime / 60 > 23 ? ftime / 60 - 24 : ftime / 60}
          :00 까지
        </option>
      ));
      timeSelector.push(
        <div key={i}>
          <select
            style={{ ...selectStyle, marginBottom: '2%' }}
            type="select"
            name="since"
            id={i}
            onChange={props.changeInput}
          >
            <option value="null">시작시간을 설정해주세요.</option>
            {ts}
          </select>
          <select
            style={{ ...selectStyle, marginBottom: '5%' }}
            type="select"
            name="until"
            id={i}
            onChange={props.changeInput}
            style={props.fixStart ? { display: 'none' } : {}}
          >
            <option value="null">종료시간을 설정해주세요.</option>
            {finishts}
          </select>
        </div>
      );
    }
    return timeSelector;
  };

  const disabledDate = current => {
    if (!current) {
      return false;
    }
    const nowTime = moment();
    const oneMonthAfter = moment().add(1, 'month');
    nowTime.hour(0);
    nowTime.minute(0);
    nowTime.second(0);
    oneMonthAfter.hour(0);
    oneMonthAfter.minute(0);
    oneMonthAfter.second(0);
    current
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
    current.add(9, 'hour');
    return (
      // TODO: 일단은 과거날짜도 선택가능하게 변경, 나중에 주석해제 하기
      // current.valueOf() < nowTime.valueOf() ||
      current.valueOf() > oneMonthAfter.valueOf() ||
      props.dates.includes(current.valueOf())
    );
  };
  return (
    <Modal fade={false} centered isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>
        <span
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'rgb(30, 51, 84)'
          }}
        >
          카드 추가하기
        </span>
      </ModalHeader>
      <ModalBody>
        <div>
          <div>
            <Calendar
              name="date"
              type="date"
              onChange={props.datePick}
              disabledDate={disabledDate}
              showDateInput="false"
              locale={koKR}
              defaultValue={null}
              style={{ color: '#1f3354', width: '100%' }}
            />
          </div>
          <div>
            <div>
              <label style={labelStyle}>날짜</label>
              <div style={inputTextStyle}>
                {!props.date ? (
                  <div className="text-danger">날짜를 선택해주세요</div>
                ) : (
                  moment(props.date).format('YYYY/MM/DD')
                )}
              </div>
            </div>
            <div row>
              <label style={labelStyle}>장소</label>
              <select
                name="shop"
                id="shop"
                onChange={props.changeInput}
                style={selectStyle}
              >
                <option value="null">헤어샵을 선택해주세요.</option>
                {props.addresses.map((address, key) => (
                  <option key={key}>{address.extraAddress}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>정해진 시간이 있나요?</label>
              <input
                type="checkbox"
                name="fixStart"
                id="fixStart"
                onChange={props.changeInput}
                checked={props.fixStart}
              />
            </div>
            <div>
              <label style={labelStyle}>
                <span>서비스 가능 시간</span>
                <img
                  alt="alt"
                  className="question"
                  src={questionMark}
                  data-tip
                  data-for="time"
                />
                <ReactTooltip
                  id="time"
                  place="left"
                  type="light"
                  effect="solid"
                  delayHide={500}
                  className="card_tooltip tooltip_pic"
                >
                  <div className="mb-3 tooltip_text">
                    한 시술의 시작시간과 끝시간을 의미하는 것이 아니라,
                    '하루동안 서비스가 가능한 전체 시간범위'를 의미합니다.
                  </div>
                  <div className="mb-2" style={{ color: '#1f3354' }}>
                    예시)
                  </div>
                  <div className="mb-3 tooltip_text">
                    - 저녁 7시 이후부터 시간이 가능하고, 11시에는 마무리 하고
                    싶으시다면 19:00 ~ 23:00로 표기해주세요.
                  </div>
                  <div className="mb-3 tooltip_text">
                    - 휴무라서 연습을 많이 하고 싶으시면 09:00 ~ 21:00 등으로
                    표기해주시면 됩니다.
                  </div>
                  <div className="mb-3 tooltip_text">
                    시간 추가/지우기 버튼으로 스케줄 세부 조정도 가능합니다.
                  </div>
                  <div className="mb-3 tooltip_text">
                    앞서 작성한 예상 시술 소요 시간에 따라 서비스 시간은
                    자동으로 조율됩니다!
                  </div>
                </ReactTooltip>
              </label>
              {props.timeValidation ? (
                <span className="text-danger ml-4">
                  시작과 종료시간을 모두 선택해주세요
                </span>
              ) : null}
              <div>
                {timeSelector()}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '0 0 5% 0'
                  }}
                >
                  <button
                    style={addDeleteButtonStyle}
                    onClick={props.timeDelete}
                  >
                    - 시간 삭제
                  </button>
                  <button
                    style={{
                      ...addDeleteButtonStyle,
                      backgroundColor: '#66ce82',
                      borderColor: '#66ce82'
                    }}
                    color="light"
                    onClick={props.timeAdd}
                  >
                    + 시간 추가
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label>
                <span style={labelStyle}>사진촬영 여부</span>
                <img
                  alt="alt"
                  className="question"
                  src={questionMark}
                  data-tip
                  data-for="pic"
                />
                <ReactTooltip
                  id="pic"
                  place="right"
                  type="light"
                  effect="solid"
                  delayHide={500}
                >
                  <div className="mb-2" style={{ color: '#DD6866' }}>
                    ✓ 사진촬영 X
                  </div>
                  <div className="mb-3 tooltip_text">
                    사진촬영을 하지 않습니다.
                  </div>

                  <div className="mb-2" style={{ color: '#DD6866' }}>
                    ✓ 사진촬영 O 모자이크 가능
                  </div>
                  <div className="mb-3 tooltip_text">
                    사진을 촬영하며 모자이크 처리할 수 있습니다. (사진 촬영이
                    필요하시다면 이 옵션을 추천합니다.)
                  </div>

                  <div className="mb-2" style={{ color: '#DD6866' }}>
                    ✓ 사진촬영 O 모자이크 불가
                  </div>
                  <div className="mb-3 tooltip_text">
                    사진을 촬영하며 모자이크 처리하지 않습니다. (이 경우
                    고객들이 예약할 확률이 낮습니다.)
                  </div>
                </ReactTooltip>
              </label>
              <select
                style={selectStyle}
                name="picture"
                id="picture"
                onChange={props.changeInput}
              >
                <option value="null">사진촬영 여부를 선택해주세요.</option>
                <option>사진촬영 X</option>
                <option>사진촬영 O 모자이크 가능</option>
                <option>사진촬영 O 모자이크 불가</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>
                시술 필수인 서비스를 선택해주세요. (선택)
              </label>
              <div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <input
                    style={{ display: 'none' }}
                    type="checkbox"
                    name="must"
                    id="cut"
                    onChange={props.changeInput}
                  />
                  <label htmlFor="cut">커트</label>
                  <input
                    style={{ display: 'none' }}
                    type="checkbox"
                    name="must"
                    id="perm"
                    onChange={props.changeInput}
                  />
                  <label htmlFor="perm">펌</label>
                  <input
                    style={{ display: 'none' }}
                    type="checkbox"
                    name="must"
                    id="dye"
                    onChange={props.changeInput}
                  />
                  <label htmlFor="dye">염색</label>
                </div>
              </div>
            </div>
            <div>
              <label style={labelStyle}>
                시술 불가한 서비스를 선택해주세요. (선택)
              </label>
              <div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <input
                    style={{ display: 'none' }}
                    type="checkbox"
                    name="no"
                    id="Cut"
                    onChange={props.changeInput}
                  />
                  <label htmlFor="Cut">커트</label>
                  <input
                    style={{ display: 'none' }}
                    type="checkbox"
                    name="no"
                    id="Perm"
                    onChange={props.changeInput}
                  />
                  <label htmlFor="Perm">펌</label>
                  <input
                    style={{ display: 'none' }}
                    type="checkbox"
                    name="no"
                    id="Dye"
                    onChange={props.changeInput}
                  />
                  <label htmlFor="Dye">염색</label>
                </div>
              </div>
            </div>
            <div>
              <label style={labelStyle}>
                시술 가능한 모델 성별을 선택해주세요.
              </label>
              <div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <input
                    style={{ display: 'none' }}
                    type="checkbox"
                    name="male"
                    id="male"
                    onChange={props.changeInput}
                  />
                  <label htmlFor="male">남자</label>
                  <input
                    style={{ display: 'none' }}
                    type="checkbox"
                    name="female"
                    id="female"
                    onChange={props.changeInput}
                  />
                  <label htmlFor="female">여자</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <label style={labelStyle}>시술 및 기장별 가격을 설정해주세요.</label>
        <div>
          구체적인 가격을 표기하지 않은 경우 소비자에게는 ‘미정’이라는 문구와
          함께 드리머리의 평균가 예상금액으로 표시됩니다. 하지만 이 경우
          매칭률이 현저히 저하될 수 있으므로 예상금액을 표기하는 것을
          권고드립니다.
        </div>
        <div className="row" style={{ margin: '2% 0 10% 0' }}>
          <div className="col-3 p-0">
            <img
              style={{ width: '100%', transform: 'translateY(14%)' }}
              src={womanBack}
              alt="alt"
            />
          </div>
          <div
            className="col-3 pr-0"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around'
            }}
          >
            <span style={{ ...labelStyle, margin: 0, color: 'transparent' }}>
              .
            </span>
            <span style={{ ...labelStyle, margin: 0, padding: '0.7rem' }}>
              기본
            </span>
            <span style={{ ...labelStyle, margin: 0, padding: '0.7rem' }}>
              턱아래
            </span>
            <span style={{ ...labelStyle, margin: 0, padding: '0.7rem' }}>
              어깨아래
            </span>
            <span style={{ ...labelStyle, margin: 0, padding: '0.7rem' }}>
              가슴아래
            </span>
          </div>
          <div
            className="col-3 pl-0 text-center"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around'
            }}
          >
            <div style={{ ...labelStyle, margin: 0 }}>펌</div>
            <div>
              <div className="addingPrice">
                <input
                  style={{
                    ...inputTextStyle,
                    fontSize: '1.1rem',
                    width: '75%',
                    textAlign: 'right',
                    border: 0
                  }}
                  type="number"
                  step="1000"
                  onChange={props.changeInput}
                  name="permPrice"
                  id="normal"
                  value={props.permPrice.normal}
                />
                원
              </div>
            </div>
            <div>
              <div className="addingPrice">
                +
                <input
                  style={{
                    ...inputTextStyle,
                    fontSize: '1.1rem',
                    width: '75%',
                    textAlign: 'right',
                    border: 0
                  }}
                  type="number"
                  step="1000"
                  onChange={props.changeInput}
                  name="permPrice"
                  id="chin"
                  value={props.permPrice.chin}
                />
                원
              </div>
            </div>
            <div>
              <div className="addingPrice">
                +
                <input
                  style={{
                    ...inputTextStyle,
                    fontSize: '1.1rem',
                    width: '75%',
                    textAlign: 'right',
                    border: 0
                  }}
                  type="number"
                  step="1000"
                  onChange={props.changeInput}
                  name="permPrice"
                  id="shoulder"
                  value={props.permPrice.shoulder}
                />
                원
              </div>
            </div>
            <div>
              <div className="addingPrice">
                +
                <input
                  style={{
                    ...inputTextStyle,
                    fontSize: '1.1rem',
                    width: '75%',
                    textAlign: 'right',
                    border: 0
                  }}
                  type="number"
                  step="1000"
                  onChange={props.changeInput}
                  name="permPrice"
                  id="chest"
                  value={props.permPrice.chest}
                />
                원
              </div>
            </div>
          </div>
          <div
            className="col-3 pl-0 text-center"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around'
            }}
          >
            <div style={{ ...labelStyle, margin: 0 }}>염색</div>
            <div>
              <div className="addingPrice">
                <input
                  style={{
                    ...inputTextStyle,
                    fontSize: '1.1rem',
                    width: '75%',
                    textAlign: 'right',
                    border: 0
                  }}
                  type="number"
                  step="1000"
                  onChange={props.changeInput}
                  name="dyePrice"
                  id="normal"
                  value={props.dyePrice.normal}
                />
                원
              </div>
            </div>
            <div>
              <div className="addingPrice">
                +
                <input
                  style={{
                    ...inputTextStyle,
                    fontSize: '1.1rem',
                    width: '75%',
                    textAlign: 'right',
                    border: 0
                  }}
                  type="number"
                  step="1000"
                  onChange={props.changeInput}
                  name="dyePrice"
                  id="chin"
                  value={props.dyePrice.chin}
                />
                원
              </div>
            </div>
            <div>
              <div className="addingPrice">
                +
                <input
                  style={{
                    ...inputTextStyle,
                    fontSize: '1.1rem',
                    width: '75%',
                    textAlign: 'right',
                    border: 0
                  }}
                  type="number"
                  step="1000"
                  onChange={props.changeInput}
                  name="dyePrice"
                  id="shoulder"
                  value={props.dyePrice.shoulder}
                />
                원
              </div>
            </div>
            <div>
              <div className="addingPrice">
                +
                <input
                  style={{
                    ...inputTextStyle,
                    fontSize: '1.1rem',
                    width: '75%',
                    textAlign: 'right',
                    border: 0
                  }}
                  type="number"
                  step="1000"
                  onChange={props.changeInput}
                  name="dyePrice"
                  id="chest"
                  value={props.dyePrice.chest}
                />
                원
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            style={
              props.finalValidation
                ? {
                    ...buttonStyle,
                    backgroundColor: 'rgba(0,0,0,0.3',
                    cursor: 'default'
                  }
                : buttonStyle
            }
            onClick={props.cardAddHandler}
          >
            스케줄 추가
          </div>
          <div
            style={{
              textAlign: 'center',
              fontSize: '1.2rem',
              color: 'rgb(76, 145, 186)'
            }}
          >
            스케줄 추가가 끝난 후 반드시{' '}
          </div>
          <div
            style={{
              textAlign: 'center',
              fontSize: '1.2rem',
              color: 'rgb(76, 145, 186)'
            }}
          >
            ‘스케줄 저장하기’ 버튼을 클릭하셔야 최종 등록완료됩니다
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

const styles = {
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
    border: 'dotted 1px rgba(0, 0, 0, 0.1)'
  },
  buttonStyle: {
    height: '3.9rem',
    color: 'white',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginTop: '4rem',
    marginBottom: '2rem',
    borderRadius: 6,
    backgroundColor: '#4c91ba',
    textAlign: 'center',
    lineHeight: '3.9rem'
  },
  selectStyle: {
    width: '100%',
    fontSize: '1.3rem',
    color: '#1f3354',
    marginRight: '3.3%',
    padding: '0.7rem',
    paddingTop: '0.5rem'
  },
  addDeleteButtonStyle: {
    display: 'inline-block',
    width: '49%',
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

const {
  labelStyle,
  inputTextStyle,
  buttonStyle,
  selectStyle,
  addDeleteButtonStyle
} = styles;

export default AddCardModal;
