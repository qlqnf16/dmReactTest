import React, { Component } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import Calendar from 'rc-calendar';
import koKR from 'rc-calendar/lib/locale/ko_KR';
import 'rc-calendar/assets/index.css';
import moment from 'moment';
import './Schedule.css';

class Schedule extends Component {
  timeSelector = () => {
    let timeSelector = [];
    for (let i = 0; i < this.props.time; i++) {
      timeSelector.push(
        <div className="row" key={i}>
          <Input
            type="select"
            name="since"
            id={i}
            onChange={this.props.changeInput}
            className="col-4"
          >
            <option value={600}>10:00</option>
            <option value={660}>11:00</option>
            <option value="720">12:00</option>
            <option value="780">13:00</option>
            <option value="840">14:00</option>
            <option value="900">15:00</option>
            <option value="960">16:00</option>
            <option value="1020">17:00</option>
            <option value="1080">18:00</option>
          </Input>
          <span className="col-2">~</span>
          <Input
            type="select"
            name="until"
            id={i}
            onChange={this.props.changeInput}
            className="col-4"
          >
            <option value="660">11:00</option>
            <option value="720">12:00</option>
            <option value="780">13:00</option>
            <option value="840">14:00</option>
            <option value="900">15:00</option>
            <option value="960">16:00</option>
            <option value="1020">17:00</option>
            <option value="1080">18:00</option>
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
      return (
        current.valueOf() < nowTime.valueOf() ||
        current.valueOf() > oneMonthAfter.valueOf()
      );
    };
    return (
      <div>
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
              style={{ color: '#1f3354' }}
            />
          </FormGroup>
          <div
            className="col-6"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <FormGroup row>
              <Label
                sm={5}
                style={{
                  textAlign: 'right',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#1f3354'
                }}
              >
                서비스 시간
              </Label>
              <div className="col-7">
                {this.timeSelector()}
                <Button
                  color="light"
                  onClick={this.props.timeAdd}
                  style={{ fontSize: '1.1rem', background: 'none', border: 0 }}
                >
                  + 시간 추가
                </Button>
              </div>
            </FormGroup>
            <FormGroup row>
              <Label
                sm={5}
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
                <option>박준뷰티랩 청담본점</option>
                <option>머리샵 일산웨스턴돔점</option>
              </Input>
            </FormGroup>
            <div>
              <Label
                sm={5}
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
                <Label check>
                  <Input
                    type="checkbox"
                    name="must"
                    id="cut"
                    onChange={this.props.changeInput}
                  />{' '}
                  커트
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="checkbox"
                    name="must"
                    id="perm"
                    onChange={this.props.changeInput}
                  />{' '}
                  펌
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="checkbox"
                    name="must"
                    id="dye"
                    onChange={this.props.changeInput}
                  />{' '}
                  염색
                </Label>
              </FormGroup>
            </div>
            <div>
              <Label
                sm={5}
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
                <Label check>
                  <Input
                    type="checkbox"
                    name="no"
                    id="cut"
                    onChange={this.props.changeInput}
                  />{' '}
                  커트
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="checkbox"
                    name="no"
                    id="perm"
                    onChange={this.props.changeInput}
                  />{' '}
                  펌
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="checkbox"
                    name="no"
                    id="dye"
                    onChange={this.props.changeInput}
                  />{' '}
                  염색
                </Label>
              </FormGroup>
            </div>
            <div>
              <Label
                sm={5}
                style={{
                  textAlign: 'right',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#1f3354'
                }}
              >
                모델 성별
              </Label>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="checkbox"
                    name="male"
                    onChange={this.props.changeInput}
                  />{' '}
                  남자
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="checkbox"
                    name="female"
                    onChange={this.props.changeInput}
                  />{' '}
                  여자
                </Label>
              </FormGroup>
            </div>
            <div
              onClick={this.props.cardAddHandler}
              className="btn btn-light w-100"
              color="light"
              style={{
                height: 28,
                lineHeight: '20px',
                borderRadius: 5,
                backgroundColor: '#4c91ba',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              등록하기
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Schedule;
