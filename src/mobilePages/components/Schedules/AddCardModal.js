import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

import Calendar from 'rc-calendar';
import koKR from 'rc-calendar/lib/locale/ko_KR';
import 'rc-calendar/assets/index.css';
import moment from 'moment';
import questionMark from '../../../assets/images/question_navy.png';
import womanBack from '../../../assets/images/woman_back.png';
import ReactTooltip from 'react-tooltip';

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
          :00
        </option>
      ));
      let finishTimes = [];
      for (let j = props.sinces[i]; j < 1560; j = j + 60) {
        finishTimes.push(j);
      }
      let finishts = finishTimes.map((ftime, key) => (
        <option key={key} value={ftime}>
          {ftime / 60 > 23 ? ftime / 60 - 24 : ftime / 60}
          :00
        </option>
      ));
      timeSelector.push(
        <div className="d-flex" key={i}>
          <select
            type="select"
            name="since"
            id={i}
            onChange={props.changeInput}
          >
            <option value="null">-시작시간-</option>
            {ts}
          </select>
          ~
          <select
            type="select"
            name="until"
            id={i}
            onChange={props.changeInput}
          >
            <option value="null">-종료시간-</option>
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
              style={{ color: '#1f3354', width: '90%' }}
            />
          </div>
          <div>
            <div>
              <label>날짜</label>
              <div>{moment(props.date).format('YYYY/MM/DD')}</div>
            </div>
            <div row>
              <label>장소</label>
              <select name="shop" id="shop" onChange={props.changeInput}>
                <option value="null">-헤어샵-</option>
                {props.addresses.map((address, key) => (
                  <option key={key}>{address.extraAddress}</option>
                ))}
              </select>
            </div>
            <div>
              <label>서비스 가능 시간</label>
              <div>
                {timeSelector()}
                <button color="light" onClick={props.timeAdd}>
                  + 시간 추가
                </button>
                <button onClick={props.timeDelete}>- 시간 지우기</button>
              </div>
            </div>
            <div>
              <label>
                <img
                  alt="alt"
                  className="question"
                  src={questionMark}
                  data-tip
                  data-for="pic"
                />
                <ReactTooltip
                  id="pic"
                  place="left"
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
                사진촬영 여부
              </label>
              <select name="picture" id="picture" onChange={props.changeInput}>
                <option value="null">-종류-</option>
                <option>적극응원</option>
                <option>히든응원</option>
                <option>매너응원</option>
                <option>사진촬영x</option>
              </select>
            </div>
            <div>
              <label>필수 서비스</label>
              <div>
                <div>
                  <input
                    type="checkbox"
                    name="must"
                    id="cut"
                    onChange={props.changeInput}
                  />
                  <label for="cut" /> 커트
                </div>
              </div>
              <div>
                <div>
                  <input
                    type="checkbox"
                    name="must"
                    id="perm"
                    onChange={props.changeInput}
                  />
                  <label for="perm" /> 펌
                </div>
              </div>
              <div>
                <div>
                  <input
                    type="checkbox"
                    name="must"
                    id="dye"
                    onChange={props.changeInput}
                  />
                  <label for="dye" /> 염색
                </div>
              </div>
            </div>
            <div>
              <label>불가 서비스</label>
              <div>
                <div>
                  <input
                    type="checkbox"
                    name="no"
                    id="Cut"
                    onChange={props.changeInput}
                  />
                  <label for="Cut" /> 커트
                </div>
              </div>
              <div>
                <div>
                  <input
                    type="checkbox"
                    name="no"
                    id="Perm"
                    onChange={props.changeInput}
                  />
                  <label for="Perm" /> 펌
                </div>
              </div>
              <div>
                <div>
                  <input
                    type="checkbox"
                    name="no"
                    id="Dye"
                    onChange={props.changeInput}
                  />
                  <label for="Dye" /> 염색
                </div>
              </div>
            </div>
            <div>
              <label
                xs={5}
                style={{
                  textAlign: 'right',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#1f3354',
                  marginTop: '1rem'
                }}
              >
                모델 성별
              </label>
              <div>
                <div>
                  <input
                    type="checkbox"
                    name="male"
                    id="male"
                    onChange={props.changeInput}
                  />
                  <label for="male" /> 남자
                </div>
              </div>
              <div>
                <div>
                  <input
                    type="checkbox"
                    name="female"
                    id="female"
                    onChange={props.changeInput}
                  />
                  <label for="female" /> 여자
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          구체적인 가격을 표기하지 않은 경우 소비자에게는 ‘미정’이라는 문구와
          함께 드리머리의 평균가 예상금액으로 표시됩니다. 하지만 이 경우
          매칭률이 현저히 저하될 수 있으므로 예상금액을 표기하는 것을
          권고드립니다.
        </div>
        <div>
          <div> 펌</div>
          <div>
            <img src={womanBack} alt="alt" className="woman_back" />
          </div>

          <div> 염색</div>
        </div>
        <div>
          <div>
            기본{' '}
            <input
              type="number"
              step="1000"
              onChange={props.changeInput}
              name="permPrice"
              id="normal"
            />
          </div>
          <div>
            기본{' '}
            <input
              type="number"
              step="1000"
              onChange={props.changeInput}
              name="dyePrice"
              id="normal"
            />
          </div>
        </div>
        <div>
          <div>
            턱아래{' '}
            <input
              type="number"
              step="1000"
              onChange={props.changeInput}
              name="permPrice"
              id="chin"
            />
            +
          </div>

          <div>
            턱아래{' '}
            <input
              type="number"
              step="1000"
              onChange={props.changeInput}
              name="dyePrice"
              id="chin"
            />
            +
          </div>
        </div>
        <div>
          <div>
            어깨아래{' '}
            <input
              type="number"
              step="1000"
              onChange={props.changeInput}
              name="permPrice"
              id="shoulder"
            />
            +
          </div>

          <div>
            어깨아래{' '}
            <input
              type="number"
              step="1000"
              onChange={props.changeInput}
              name="dyePrice"
              id="shoulder"
              className="length_input text-right"
            />
            +
          </div>
        </div>
        <div>
          <div>
            가슴아래{' '}
            <input
              type="number"
              step="1000"
              onChange={props.changeInput}
              name="permPrice"
              id="chest"
            />
            +
          </div>

          <div>
            가슴아래{' '}
            <input
              type="number"
              step="1000"
              onChange={props.changeInput}
              name="dyePrice"
              id="chest"
            />
            +
          </div>

          <div onClick={props.cardAddHandler}>등록하기</div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddCardModal;
