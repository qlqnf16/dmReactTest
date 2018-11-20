import React, { Component } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import Calendar from 'rc-calendar';
import koKR from 'rc-calendar/lib/locale/ko_KR';
import 'rc-calendar/assets/index.css';
import moment from 'moment';
import './Schedule.css';
import questionMark from '../../../../assets/images/question_navy.png';
import womanBack from '../../../../assets/images/woman_back.png';
import ReactTooltip from 'react-tooltip';

class Schedule extends Component {
  timeSelector = () => {
    let timeSelector = [];
    for (let i = 0; i < this.props.time; i++) {
      let times = [];
      let startTime = 540;
      if (i > 0) {
        startTime = this.props.untils[i - 1];
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
      for (let j = this.props.sinces[i]; j < 1560; j = j + 60) {
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
            name="since"
            id={i}
            onChange={this.props.changeInput}
            className=""
            selected="null"
          >
            <option value="null" selected>
              -시작시간-
            </option>
            {ts}
          </select>
          <span className="mx-2" style={{ lineHeight: '2.3' }}>
            ~
          </span>
          <Input
            type="select"
            name="until"
            id={i}
            onChange={this.props.changeInput}
            className=""
            style={this.props.fixStart ? { display: 'none' } : {}}
          >
            <option value="null">-종료시간-</option>
            {finishts}
          </Input>
        </div>
      );
    }
    return timeSelector;
  };

  render() {
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
        this.props.dates.includes(current.valueOf()) ||
        this.props.newDates.includes(current.valueOf())
      );
    };
    return (
      <div className="schedule_border">
        <div className="row">
          <FormGroup className="col-6">
            <Calendar
              name="date"
              type="date"
              onChange={this.props.datePick}
              disabledDate={disabledDate}
              showDateInput="false"
              locale={koKR}
              defaultValue={null}
              style={{ color: '#1f3354', width: '90%' }}
            />
          </FormGroup>
          <div
            className="col-6"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0',
              marginLeft: '-4rem',
              marginTop: '-2.5rem'
            }}
          >
            <div className="row">
              <Label
                xs={5}
                style={{
                  textAlign: 'right',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#1f3354'
                }}
              >
                날짜
              </Label>
              <div
                style={{
                  lineHeight: '2.3',
                  color: '#1f3354',
                  fontSize: '1.1rem'
                }}
              >
                {!this.props.date ? (
                  <div className="text-danger">날짜를 선택해주세요</div>
                ) : (
                  moment(this.props.date).format('YYYY/MM/DD')
                )}
              </div>
            </div>
            <FormGroup row>
              <Label
                xs={5}
                style={{
                  textAlign: 'right',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#1f3354'
                }}
              >
                장소
              </Label>
              <Input
                name="shop"
                id="shop"
                onChange={this.props.changeInput}
                type="select"
                className="col-7"
              >
                <option value="null">-헤어샵-</option>
                {this.props.addresses.map((address, key) => (
                  <option key={key}>{address.extraAddress}</option>
                ))}
              </Input>
            </FormGroup>
            <div>
              <label
                style={
                  this.props.fixStart
                    ? {
                        display: 'block',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        color: 'rgb(31, 51, 84)',
                        border: '0.5px solid rgb(31, 51, 84)',
                        padding: '0.5rem',
                        margin: '1rem',
                        textAlign: 'center',
                        transform: 'translateX(2rem)',
                        borderRadius: '5px',
                        width: '100%'
                      }
                    : {
                        display: 'block',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        color: 'rgba(0,0,0,0.2)',
                        border: '0.5px solid rgba(0,0,0,0.2)',
                        padding: '0.5rem',
                        margin: '1rem',
                        textAlign: 'center',
                        transform: 'translateX(2rem)',
                        borderRadius: '5px',
                        width: '100%'
                      }
                }
              >
                <input
                  style={{ display: 'none' }}
                  type="checkbox"
                  name="fixStart"
                  id="fixStart"
                  onChange={this.props.changeInput}
                  checked={this.props.fixStart}
                />
                시작시간이 꼭 정해져 있으면 체크 (아카데미 웍 등)
              </label>
            </div>
            <FormGroup row>
              <Label
                xs={5}
                style={{
                  textAlign: 'right',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#1f3354'
                }}
              >
                서비스 가능 시간
                <br />
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
              </Label>
              <div className="col-7 p-0">
                {this.timeSelector()}
                {/* 바뀐것: 시간선택 안내 */}
                {this.props.timeValidation ? (
                  <div className="text-danger">
                    {this.props.fixStart
                      ? '시작시간을 선택해주세요'
                      : '시작과 종료시간을 모두 선택해주세요'}
                  </div>
                ) : null}
                <Button
                  color="light"
                  onClick={this.props.timeAdd}
                  style={{ fontSize: '1.1rem', background: 'none', border: 0 }}
                >
                  + 시간 추가
                </Button>
                <Button
                  color="light"
                  onClick={this.props.timeDelete}
                  style={{ fontSize: '1.1rem', background: 'none', border: 0 }}
                >
                  - 시간 지우기
                </Button>
              </div>
            </FormGroup>
            <FormGroup row>
              <Label
                xs={5}
                style={{
                  textAlign: 'right',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#1f3354'
                }}
              >
                사진촬영 여부
                <br />
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
                  className="card_tooltip tooltip_pic"
                >
                  <div className="mb-2" style={{ color: '#DD6866' }}>
                    ✓ 사진촬영 X
                  </div>
                  <div className="mb-3 tooltip_text">
                    사진을 촬영하지 않습니다.
                  </div>

                  <div className="mb-2" style={{ color: '#DD6866' }}>
                    ✓ 사진촬영 O 모자이크 가능
                  </div>
                  <div className="mb-3 tooltip_text">
                    사진을 촬영하며 얼굴은 모자이크 처리할 수 있습니다. (사진
                    촬영이 필요하시다면 이 옵션을 추천합니다.)
                  </div>

                  <div className="mb-2" style={{ color: '#DD6866' }}>
                    ✓ 사진촬영 O 모자이크 불가
                  </div>
                  <div className="mb-3 tooltip_text">
                    사진을 촬영하며 모자이크 처리하지 않습니다. (이 경우
                    고객들이 예약할 확률이 낮습니다.)
                  </div>
                </ReactTooltip>
              </Label>
              <Input
                name="picture"
                id="picture"
                onChange={this.props.changeInput}
                type="select"
                className="col-7"
              >
                <option value="null">-종류-</option>
                <option>사진촬영 X</option>
                <option>사진촬영 O 모자이크 가능</option>
                <option>사진촬영 O 모자이크 불가</option>
              </Input>
            </FormGroup>
            <div>
              <Label
                xs={5}
                style={{
                  textAlign: 'right',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#1f3354'
                }}
              >
                필수 서비스
              </Label>
              <FormGroup check inline>
                <div>
                  <input
                    type="checkbox"
                    name="must"
                    id="cut"
                    onChange={this.props.changeInput}
                  />
                  <label className="mb-0" htmlFor="cut" /> 커트
                </div>
              </FormGroup>
              <FormGroup check inline>
                <div>
                  <input
                    type="checkbox"
                    name="must"
                    id="perm"
                    onChange={this.props.changeInput}
                  />
                  <label className="mb-0" htmlFor="perm" /> 펌
                </div>
              </FormGroup>
              <FormGroup check inline>
                <div>
                  <input
                    type="checkbox"
                    name="must"
                    id="dye"
                    onChange={this.props.changeInput}
                  />
                  <label className="mb-0" htmlFor="dye" /> 염색
                </div>
              </FormGroup>
            </div>
            <div>
              <Label
                xs={5}
                style={{
                  textAlign: 'right',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#1f3354'
                }}
              >
                불가 서비스
              </Label>
              <FormGroup check inline>
                <div>
                  <input
                    type="checkbox"
                    name="no"
                    id="Cut"
                    onChange={this.props.changeInput}
                  />
                  <label className="mb-0" htmlFor="Cut" /> 커트
                </div>
              </FormGroup>
              <FormGroup check inline>
                <div>
                  <input
                    type="checkbox"
                    name="no"
                    id="Perm"
                    onChange={this.props.changeInput}
                  />
                  <label className="mb-0" htmlFor="Perm" /> 펌
                </div>
              </FormGroup>
              <FormGroup check inline>
                <div>
                  <input
                    type="checkbox"
                    name="no"
                    id="Dye"
                    onChange={this.props.changeInput}
                  />
                  <label className="mb-0" htmlFor="Dye" /> 염색
                </div>
              </FormGroup>
            </div>
            <div>
              <Label
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
              </Label>
              <FormGroup check inline>
                <div>
                  <input
                    type="checkbox"
                    name="male"
                    id="male"
                    onChange={this.props.changeInput}
                  />
                  <label className="mb-0" htmlFor="male" /> 남자
                </div>
              </FormGroup>
              <FormGroup check inline>
                <div>
                  <input
                    type="checkbox"
                    name="female"
                    id="female"
                    onChange={this.props.changeInput}
                  />
                  <label className="mb-0" htmlFor="female" /> 여자
                </div>
              </FormGroup>
            </div>
          </div>
        </div>
        <div style={{ color: '#1f3354' }}>
          구체적인 가격을 표기하지 않은 경우 소비자에게는 ‘미정’이라는 문구와
          함께 드리머리의 평균가 예상금액으로 표시됩니다. 하지만 이 경우
          매칭률이 현저히 저하될 수 있으므로 예상금액을 표기하는 것을
          권고드립니다.
        </div>
        <div
          className="p-3 mx-auto"
          style={{
            color: '#4c91ba',
            fontSize: '1.1rem',
            backgroundColor: 'transparent'
          }}
        >
          <div className="row">
            <div className="col-4 text-center font-weight-bold"> 펌</div>
            <div className="col-4">
              <img src={womanBack} alt="alt" className="woman_back" />
            </div>

            <div className="col-4 text-center font-weight-bold"> 염색</div>
          </div>
          <div className="length_price row">
            <div className="col-4 text-right">
              기본{' '}
              <input
                type="number"
                step="1000"
                onChange={this.props.changeInput}
                name="permPrice"
                id="normal"
                className="length_input text-right"
                value={this.props.permPrice.normal}
              />
              원
            </div>
            <div className="col-4" />
            <div className="col-4 text-left" style={{ paddingLeft: '3.8rem' }}>
              기본{' '}
              <input
                type="number"
                step="1000"
                onChange={this.props.changeInput}
                name="dyePrice"
                id="normal"
                className="length_input text-right"
                value={this.props.dyePrice.normal}
              />
              원
            </div>
          </div>
          <div className="length_price row">
            <div className="col-4 text-right">
              턱아래{' '}
              <input
                type="number"
                step="1000"
                onChange={this.props.changeInput}
                name="permPrice"
                id="chin"
                className="length_input text-right"
                value={this.props.permPrice.chin}
              />
              원<span style={plus}>+</span>
            </div>
            <div className="col-4" />

            <div className="col-4 text-left" style={{ paddingLeft: '2.7rem' }}>
              턱아래{' '}
              <input
                type="number"
                step="1000"
                onChange={this.props.changeInput}
                name="dyePrice"
                id="chin"
                className="length_input text-right"
                value={this.props.dyePrice.chin}
              />
              원<span style={{ ...plus, left: '41%' }}>+</span>
            </div>
          </div>
          <div className="length_price row">
            <div className="col-4 text-right">
              어깨아래{' '}
              <input
                type="number"
                step="1000"
                onChange={this.props.changeInput}
                name="permPrice"
                id="shoulder"
                className="length_input text-right"
                value={this.props.permPrice.shoulder}
              />
              원<span style={plus}>+</span>
            </div>
            <div className="col-4" />

            <div className="col-4 text-left">
              어깨아래{' '}
              <input
                type="number"
                step="1000"
                onChange={this.props.changeInput}
                name="dyePrice"
                id="shoulder"
                className="length_input text-right"
                value={this.props.dyePrice.shoulder}
              />
              원<span style={{ ...plus, left: '41%' }}>+</span>
            </div>
          </div>
          <div className="length_price row no-border">
            <div className="col-4 text-right">
              가슴아래{' '}
              <input
                type="number"
                step="1000"
                onChange={this.props.changeInput}
                name="permPrice"
                id="chest"
                className="length_input text-right"
                value={this.props.permPrice.chest}
              />
              원<span style={plus}>+</span>
            </div>
            <div className="col-4" />

            <div className="col-4 text-left">
              가슴아래{' '}
              <input
                type="number"
                step="1000"
                onChange={this.props.changeInput}
                name="dyePrice"
                id="chest"
                className="length_input text-right"
                value={this.props.dyePrice.chest}
              />
              원<span style={{ ...plus, left: '41%' }}>+</span>
            </div>
          </div>
          {/* 바뀐것: 등록버튼 필수필드 안 채워지면 disaled 만듦 */}
          <div
            onClick={this.props.cardAddHandler}
            className="btn btn-light w-50 schedule_button"
            style={
              this.props.finalValidation
                ? { backgroundColor: 'rgba(0,0,0,0.3)', cursor: 'default' }
                : { backgroundColor: '#4c91ba' }
            }
          >
            스케줄 추가
          </div>
          <div>
            스케줄 추가가 끝난 후 반드시 우측 상단의 ‘스케줄 게시하기’ 버튼을
            클릭하셔야 최종 등록완료됩니다.
          </div>
        </div>
      </div>
    );
  }
}

const plus = {
  position: 'absolute',
  fontSize: '1.5rem',
  left: '45%',
  top: '-8%'
};
export default Schedule;
