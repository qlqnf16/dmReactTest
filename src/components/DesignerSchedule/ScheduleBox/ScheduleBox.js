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
      permPrice: {
        normal: 30000,
        chin: 30000,
        shoulder: 30000,
        chest: 30000
      },
      dyePrice: {
        normal: 30000,
        chin: 30000,
        shoulder: 30000,
        chest: 30000
      },
      title: '',
      requirement: '',
      requireTime: {},
      madeRequest: false,
      reviews: []
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
        madeRequest: true,
        reviews: data._reviews
      });
      console.log(this.state);
      console.log(data._cards);
      console.log(this.props.userData._recruit);
    }
  };

  timeAddHandler = () => {
    this.setState({ time: this.state.time + 1 });
  };

  timeDeleteHandler = () => {
    if (this.state.time > 1) this.setState({ time: this.state.time - 1 });
  };

  timeDefault = event => {
    // const target = event.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;
    const time = event._d.getTime();
    // this.setState({ [name]: value });
    this.setState({ time: 1, date: time });
  };
  sinces = [];
  untils = [];
  permPrice = {};
  dyePrice = {};
  handleInputChange = event => {
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
        console.log(name, value);
        let requireTime = {
          ...this.state.requireTime,
          [name]: value
        };
        this.setState({ requireTime });
      } else if (target.name === 'permPrice') {
        this.permPrice[target.id] = Number(target.value);
        this.setState({
          permPrice: this.permPrice
        });
      } else if (target.name === 'dyePrice') {
        this.dyePrice[target.id] = Number(target.value);
        this.setState({
          dyePrice: this.dyePrice
        });
      } else {
        const value = target.value;
        this.setState({ [name]: value });
      }
    } else {
      if (target.name === 'must') {
        target.id = target.id.toLowerCase();
        this.setState({
          must: {
            ...this.state.must,
            [target.id]: target.checked
          }
        });
      } else if (target.name === 'no') {
        target.id = target.id.toLowerCase();
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
  };

  cardSort = (c1, c2) => c1.date - c2.date;

  render() {
    const date = Math.floor(this.state.date / 86400000) * 86400000;
    let requireGender = undefined;

    if (this.state.male && this.state.female) {
      requireGender = 'both';
    } else if (this.state.male) {
      requireGender = 'male';
    } else if (this.state.female) {
      requireGender = 'female';
    }

    let ableTimes = [];
    this.state.sinces.forEach((since, key) => {
      if (this.state.untils[key]) {
        const ableTime = { since: since, until: this.state.untils[key] };
        ableTimes.push(ableTime);
      }
    });
    let sido, sigungu;
    this.props.userData.addresses.forEach(address => {
      if (address.extraAddress === this.state.shop) {
        sido = address.sido;
        sigungu = address.sigungu;
      }
    });
    const cardData = {
      must: this.state.must,
      no: this.state.no,
      reservable: true,
      date,
      shop: this.state.shop,
      requireGender,
      permPrice: this.state.permPrice,
      dyePrice: this.state.dyePrice,
      ableTimes,
      sido,
      sigungu
    };
    console.log(cardData);
    let requireTime = null;

    const recruitData = {
      title: this.state.title,
      requirement: this.state.requirement,
      _designer: this.props.userData._id,
      designerName: this.props.userData.name,
      _cards: this.state.cards,
      _reviews: this.state.reviews,
      portfolios: [],
      requireTime: this.state.requireTime
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
            id={this.props.userData._recruit}
          />
          <Schedule
            datePick={e => this.timeDefault(e)}
            time={this.state.time}
            timeAdd={this.timeAddHandler}
            timeDelete={this.timeDeleteHandler}
            submit={this.submit}
            cardAddHandler={() => this.props.cardAddHandler(cardData)}
            changeInput={e => this.handleInputChange(e)}
            date={this.state.date}
            addresses={this.props.userData.addresses}
            dates={this.props.dates}
            sinces={this.state.sinces}
            untils={this.state.untils}
          />
        </div>
        <div className="col-6 mt-5">
          <div
            className="bg-light row"
            style={{
              padding: '1.5rem'
            }}
          >
            {this.state.cards.sort(this.cardSort).map((card, key) => (
              <ScheduleCard
                cancelCardHandler={this.props.cancelCardHandler}
                card={card}
                key={key}
              />
            ))}
            {this.props.newCards.sort(this.cardSort).map((newCard, key) => (
              <ScheduleCard card={newCard} key={key} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(mapStateToProps)(ScheduleBox);
