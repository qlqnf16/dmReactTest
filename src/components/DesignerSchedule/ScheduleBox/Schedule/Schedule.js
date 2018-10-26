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
      let startTime = 600;
      if (i > 0) {
        startTime = this.props.untils[i - 1];
      }
      for (let j = startTime; j < 1200; j = j + 60) {
        times.push(j);
      }
      let ts = times.map((time, key) => (
        <option key={key} value={time}>
          {time / 60}
          :00
        </option>
      ));
      let finishTimes = [];
      for (let j = this.props.sinces[i]; j < 1200; j = j + 60) {
        finishTimes.push(j);
      }
      let finishts = finishTimes.map((ftime, key) => (
        <option key={key} value={ftime}>
          {ftime / 60}
          :00
        </option>
      ));
      console.log(times);
      timeSelector.push(
        <div className="d-flex" key={i}>
          <Input
            type="select"
            name="since"
            id={i}
            onChange={this.props.changeInput}
            className=""
          >
            <option value="null">-시작시간-</option>
            {ts}
          </Input>
          <span className="mx-2" style={{ lineHeight: '2.3' }}>
            ~
          </span>
          <Input
            type="select"
            name="until"
            id={i}
            onChange={this.props.changeInput}
            className=""
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
    console.log(moment().add(1, 'month'));
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
        current.valueOf() < nowTime.valueOf() ||
        current.valueOf() > oneMonthAfter.valueOf() ||
        this.props.dates.includes(current.valueOf())
      );
    };
    return (
      <div className="schedule_border">
        <div className="row">
          <FormGroup className="col-6">
            {/* <Input
              type="date"
              name="date"
              placeholder="date placeholder"
              onChange={this.props.datePick}
            /> */}
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
                {moment(this.props.date).format('YYYY/MM/DD')}
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
              </Label>
              <div className="col-7 p-0">
                {this.timeSelector()}
                <Button
                  color="light"
                  onClick={this.props.timeAdd}
                  style={{
                    fontSize: '1.1rem',
                    background: 'none',
                    border: 0
                  }}
                >
                  + 시간 추가
                </Button>
                <Button
                  color="light"
                  onClick={this.props.timeDelete}
                  style={{
                    fontSize: '1.1rem',
                    background: 'none',
                    border: 0
                  }}
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
                  className="card_tooltip tooltip_time"
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
              </Label>
              <Input
                name="picture"
                id="picture"
                onChange={this.props.changeInput}
                type="select"
                className="col-7"
              >
                <option value="null">-종류-</option>
                <option>적극응원</option>
                <option>히든응원</option>
                <option>매너응원</option>
                <option>사진촬영x</option>
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
                  <label className="mb-0" for="cut" /> 커트
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
                  <label className="mb-0" for="perm" /> 펌
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
                  <label className="mb-0" for="dye" /> 염색
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
                  <label className="mb-0" for="Cut" /> 커트
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
                  <label className="mb-0" for="Perm" /> 펌
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
                  <label className="mb-0" for="Dye" /> 염색
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
                  <label className="mb-0" for="male" /> 남자
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
                  <label className="mb-0" for="female" /> 여자
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
                className="length_input"
              />
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
                className="length_input"
              />
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
                className="length_input"
              />
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
                className="length_input"
              />
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
                className="length_input"
              />
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
                className="length_input"
              />
            </div>
          </div>
          <div className="length_price row">
            <div className="col-4 text-right">
              가슴아래{' '}
              <input
                type="number"
                step="1000"
                onChange={this.props.changeInput}
                name="permPrice"
                id="chest"
                className="length_input"
              />
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
                className="length_input"
              />
            </div>
          </div>

          <div
            onClick={this.props.cardAddHandler}
            className="btn btn-light w-50 "
            style={{
              height: 28,
              lineHeight: '20px',
              borderRadius: 5,
              backgroundColor: '#4c91ba',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginLeft: '25%',
              marginTop: '2rem'
            }}
          >
            등록하기
          </div>
        </div>
      </div>
    );
  }
}

export default Schedule;
