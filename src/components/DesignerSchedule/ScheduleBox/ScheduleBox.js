import React, { Component } from 'react';
import Schedule from './Schedule/Schedule';
import ScheduleCard from './ScheduleCard/ScheduleCard';
import TextInfo from '../TextInfo';
class ScheduleBox extends Component {
  state = {
    time: 1,
    must: {},
    no: {},
    sinces: [],
    untils: []
  };

  timeAddHandler = () => {
    this.setState({ time: this.state.time + 1 });
  };

  timeDefault = event => {
    this.setState({ time: 1 });
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };
  sinces = [];
  untils = [];
  handleInputChange(event) {
    const target = event.target;
    console.log(target);
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (target.type !== 'checkbox') {
      if (target.name === 'since') {
        console.log(typeof target.value);
        this.sinces[target.id] = Number(target.value);
        this.setState({
          sinces: this.sinces
        });
      } else if (target.name === 'until') {
        this.untils[target.id] = Number(target.value);
        this.setState({
          untils: this.untils
        });
      } else if (target.id === 'time') {
        const value = Number(target.value);
        this.setState({ [name]: value });
      } else {
        const value = target.value;
        this.setState({ [name]: value });
      }
    } else {
      if (target.name === 'must') {
        this.setState({
          must: {
            ...this.state.must,
            [target.id]: target.checked
          }
        });
      } else if (target.name === 'no') {
        this.setState({
          no: {
            ...this.state.no,
            [target.id]: target.checked
          }
        });
      } else {
        this.setState({ [name]: target.checked });
      }
    }
  }

  render() {
    const date = new Date(this.state.date);
    let requireGender = '';

    if (this.state.male && this.state.female) {
      requireGender = 'both';
    } else if (this.state.male) {
      requireGender = 'male';
    } else {
      requireGender = 'female';
    }

    let ableTimes = [];
    this.state.sinces.forEach((since, key) => {
      if (this.state.untils[key]) {
        const ableTime = { since: since, until: this.state.untils[key] };
        ableTimes.push(ableTime);
      }
    });

    const cardData = {
      requireTime: {
        cut: this.state.cutTime,
        perm: this.state.permTime,
        dye: this.state.dyeTime
      },
      must: this.state.must,
      no: this.state.no,
      reservable: true,
      date: date.getTime(),
      shop: this.state.shop,
      requireGender: requireGender,

      ableTimes: ableTimes,
      // 선택폼 없음
      region: '성북구',
      price: { cut: 3000, perm: 20000, dye: 30000 }
    };
    return (
      <div className="row align-items-start">
        <div className="col-6">
          <TextInfo />
          <Schedule
            datePick={e => this.timeDefault(e)}
            time={this.state.time}
            timeAdd={this.timeAddHandler}
            submit={this.submit}
            cardAddHandler={() =>
              this.props.cardAddHandler(
                cardData,
                this.props.cards[0]._recruit._id
              )
            }
            card={this.props.cards[0]}
            changeInput={e => this.handleInputChange(e)}
          />
        </div>
        <div className="col-6 row mt-5">
          {this.props.cards.map((card, key) => (
            <ScheduleCard
              cancelCardHandler={this.props.cancelCardHandler}
              card={card}
              key={key}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ScheduleBox;
