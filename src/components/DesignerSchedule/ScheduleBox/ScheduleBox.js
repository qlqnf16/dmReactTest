import React, { Component } from 'react';
import Schedule from './Schedule/Schedule';
import ScheduleCard from './ScheduleCard/ScheduleCard';
import TextInfo from '../TextInfo';
import axios from 'axios';

import { connect } from 'react-redux';

class ScheduleBox extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      cards: this.props.cards,
      time: 1,
      must: {},
      no: {},
      sinces: [],
      untils: [],
      title: '',
      requirement: '',
      requireTime: {},
      madeRequest: false
    };
  }

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get(
        `http://52.79.227.227:3030/recruits/${this.props.userData._recruit}`
      );
      console.log(data);
      this.setState({
        cards: data._cards,
        title: data.title,
        requirement: data.requirement,
        requireTime: data.requireTime,
        madeRequest: true
      });
      console.log(this.state);
      console.log(data._cards);
    }
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
    console.log(this.state);
    let requireTime = null;

    const recruitData = {
      title: this.state.title,
      requirement: this.state.requirement,
      _designer: this.props.userData._id,
      designerName: this.props.userData,
      _cards: this.state.cards,
      _reviews: [],
      portfolios: [],
      requireTime: this.props.requireTime
    };
    if (this.state.cutTime && this.state.permTime && this.state.dyeTime) {
      requireTime = {
        cut: this.state.cutTime,
        perm: this.state.permTime,
        dye: this.state.dyeTime
      };
      recruitData['requireTime'] = requireTime;
    }
    console.log(recruitData);
    return (
      <div className="row align-items-start">
        <div className="col-6">
          <TextInfo
            state={this.state}
            changeInput={e => this.handleInputChange(e)}
            totalSubmitHandler={() =>
              this.props.totalSubmitHandler(recruitData)
            }
          />
          <Schedule
            datePick={e => this.timeDefault(e)}
            time={this.state.time}
            timeAdd={this.timeAddHandler}
            submit={this.submit}
            cardAddHandler={() => this.props.cardAddHandler(cardData)}
            card={this.props.cards[0]}
            changeInput={e => this.handleInputChange(e)}
          />
        </div>
        <div className="col-6 row mt-5">
          {this.state.cards.map((card, key) => (
            <ScheduleCard
              cancelCardHandler={this.props.cancelCardHandler}
              card={card}
              key={key}
            />
          ))}
          {this.props.newCards.map((newCard, key) => (
            <ScheduleCard card={newCard} key={key} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(mapStateToProps)(ScheduleBox);
