import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
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
                {moment(props.date).format('YYYY/MM/DD')}
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
              <label style={labelStyle}>서비스 가능 시간</label>
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
                  <div className="mb-2" style={{ color: '#1f3354' }}>
                    ✓ 적극응원
                  </div>
                  <div className="mb-3 tooltip_text">
                    사진을 촬영하며, 미래에 홍보용으로 사용될 수 있습니다.
                  </div>

                  <div className="mb-2" style={{ color: '#1f3354' }}>
                    ✓ 히든응원{' '}
                  </div>
                  <div className="mb-3 tooltip_text">
                    사진을 촬영하나 얼굴은 모자이크 처리합니다.
                  </div>

                  <div className="mb-2" style={{ color: '#1f3354' }}>
                    ✓ 매너응원
                  </div>
                  <div className="mb-3 tooltip_text">
                    사진을 촬영하나 개인소장/실습 증명용으로만 사용됩니다.
                  </div>

                  <div className="mb-2" style={{ color: '#1f3354' }}>
                    ✓ 사진촬영x
                  </div>
                  <div className="mb-3 tooltip_text">
                    사진을 촬영하지 않습니다.
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
                <option>적극응원</option>
                <option>히든응원</option>
                <option>매너응원</option>
                <option>사진촬영x</option>
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
                    id="cut-mobile"
                    onChange={props.changeInput}
                  />
                  <label for="cut-mobile">커트</label>
                  <input
                    style={{ display: 'none' }}
                    type="checkbox"
                    name="must"
                    id="perm-mobile"
                    onChange={props.changeInput}
                  />
                  <label for="perm-mobile">펌</label>
                  <input
                    style={{ display: 'none' }}
                    type="checkbox"
                    name="must"
                    id="dye-mobile"
                    onChange={props.changeInput}
                  />
                  <label for="dye-mobile">염색</label>
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
                    id="Cut-mobile"
                    onChange={props.changeInput}
                  />
                  <label for="Cut-mobile">커트</label>
                  <input
                    style={{ display: 'none' }}
                    type="checkbox"
                    name="no"
                    id="Perm-mobile"
                    onChange={props.changeInput}
                  />
                  <label for="Perm-mobile">펌</label>
                  <input
                    style={{ display: 'none' }}
                    type="checkbox"
                    name="no"
                    id="Dye-mobile"
                    onChange={props.changeInput}
                  />
                  <label for="Dye-mobile">염색</label>
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
                    id="male-mobile"
                    onChange={props.changeInput}
                  />
                  <label for="male-mobile">남자</label>
                  <input
                    style={{ display: 'none' }}
                    type="checkbox"
                    name="female"
                    id="female-mobile"
                    onChange={props.changeInput}
                  />
                  <label for="female-mobile">여자</label>
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
              <input
                style={{ ...inputTextStyle, fontSize: '1.1rem', width: '100%' }}
                type="number"
                step="1000"
                onChange={props.changeInput}
                name="permPrice"
                id="normal"
                placeholder="필수"
              />
            </div>
            <div>
              <input
                style={{ ...inputTextStyle, fontSize: '1.1rem', width: '100%' }}
                type="number"
                step="1000"
                onChange={props.changeInput}
                name="permPrice"
                id="chin"
              />
            </div>
            <div>
              <input
                style={{ ...inputTextStyle, fontSize: '1.1rem', width: '100%' }}
                type="number"
                step="1000"
                onChange={props.changeInput}
                name="permPrice"
                id="shoulder"
              />
            </div>
            <div>
              <input
                style={{ ...inputTextStyle, fontSize: '1.1rem', width: '100%' }}
                type="number"
                step="1000"
                onChange={props.changeInput}
                name="permPrice"
                id="chest"
              />
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
              <input
                style={{ ...inputTextStyle, fontSize: '1.1rem', width: '100%' }}
                type="number"
                step="1000"
                onChange={props.changeInput}
                name="dyePrice"
                id="normal"
                placeholder="필수"
              />
            </div>
            <div>
              <input
                style={{ ...inputTextStyle, fontSize: '1.1rem', width: '100%' }}
                type="number"
                step="1000"
                onChange={props.changeInput}
                name="dyePrice"
                id="chin"
              />
            </div>
            <div>
              <input
                style={{ ...inputTextStyle, fontSize: '1.1rem', width: '100%' }}
                type="number"
                step="1000"
                onChange={props.changeInput}
                name="dyePrice"
                id="shoulder"
                className="length_input text-right"
              />
            </div>
            <div>
              <input
                style={{ ...inputTextStyle, fontSize: '1.1rem', width: '100%' }}
                type="number"
                step="1000"
                onChange={props.changeInput}
                name="dyePrice"
                id="chest"
              />
            </div>
          </div>
        </div>
        <div>
          <div style={buttonStyle} onClick={props.cardAddHandler}>
            등록하기
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