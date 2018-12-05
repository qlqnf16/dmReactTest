import React, { Component } from 'react';
import Schedule from './Schedule/Schedule';
import ScheduleCard from './ScheduleCard/ScheduleCard';
import TextInfo from '../TextInfo';
import NoContent from '../../UI/NoContent/NoContent';
import axios from '../../../config/Axios';

import { connect } from 'react-redux';

class ScheduleBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards,
      time: 1,
      must: {},
      no: {},
      sinces: [],
      untils: [],
      permPrice: {
        normal: 30000,
        chin: 0,
        shoulder: 0,
        chest: 0
      },
      dyePrice: {
        normal: 30000,
        chin: 0,
        shoulder: 0,
        chest: 0
      },
      title: '',
      requirement: '',
      requireTime: {},
      madeRequest: false,
      reviews: [],
      fixStart: false
    };
  }

  componentDidMount = async () => {
    if (!this.state.madeRequest && this.props.userData._recruit) {
      const { data } = await axios.get(
        `recruits/${this.props.userData._recruit}`
      );
      this.setState({
        cards: data._cards,
        title: data.title,
        requirement: data.requirement,
        requireTime: data.requireTime,
        madeRequest: true,
        reviews: data._reviews
      });
    }
  };

  timeAddHandler = () => {
    this.setState({ time: this.state.time + 1 });
  };

  timeDeleteHandler = () => {
    if (this.state.time > 1) this.setState({ time: this.state.time - 1 });
  };

  timeDefault = event => {
    const time = event._d.getTime();
    this.setState({ date: time });
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
        let requireTime = {
          ...this.state.requireTime,
          [name]: value
        };
        this.setState({ requireTime });
      } else if (target.name === 'permPrice') {
        // this.permPrice[target.id] = Number(target.value);
        this.setState({
          permPrice: {
            ...this.state.permPrice,
            [target.id]: Number(target.value)
          }
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
        let id = target.id.toLowerCase();
        this.setState({
          no: {
            ...this.state.no,
            [id]: target.checked
          }
        });
      } else if (target.name === 'fixStart') {
        this.setState({ fixStart: target.checked });
      } else {
        this.setState({ [name]: target.checked });
      }
    }
  };

  cardAddHandler = async cardData => {
    const res = this.props.cardAddHandler(cardData);
    if (res) {
      this.setState({ date: null });
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
      if (this.state.fixStart || this.state.untils[key]) {
        const ableTime = { since: since, until: this.state.untils[key] };
        ableTimes.push(ableTime);
      }
    });
    let sido, sigungu, fullAddress;
    this.props.userData.addresses.forEach(address => {
      if (address.extraAddress === this.state.shop) {
        sido = address.sido;
        sigungu = address.sigungu;
        fullAddress = address.fullAddress;
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
      sigungu,
      fullAddress,
      picture: this.state.picture,
      requireTime: this.state.requireTime,
      fixStart: this.state.fixStart
    };
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

    // 바뀐것: 종료시간 선택 안 했을 때에만 '시작시간 종료시간 다 선택해주세요' 글씨 나오게
    let timeValidation =
      (!this.state.fixStart &&
        this.state.sinces.length !== this.state.untils.length) ||
      this.state.sinces.length === 0
        ? true
        : false;

    // 바뀐것: 필수필드 validation, 없는거 하나라도 있으면 true 보내서 등록버튼 disabled 만듦
    let finalValidation =
      timeValidation ||
      !cardData.date ||
      !cardData.shop ||
      !cardData.picture ||
      !cardData.requireGender;

    return (
      <div className="row align-items-start">
        <div className="col-6">
          <TextInfo
            state={this.state}
            changeInput={e => this.handleInputChange(e)}
            totalSubmitHandler={() =>
              this.props.totalSubmitHandler(recruitData)
            }
            showMyCard={this.props.showMyCard}
          />
          <Schedule
            datePick={e => this.timeDefault(e)}
            time={this.state.time}
            timeAdd={this.timeAddHandler}
            timeDelete={this.timeDeleteHandler}
            submit={this.submit}
            cardAddHandler={() => this.cardAddHandler(cardData)}
            changeInput={e => this.handleInputChange(e)}
            date={this.state.date}
            addresses={this.props.userData.addresses}
            dates={this.props.dates}
            newDates={this.props.newDates}
            sinces={this.state.sinces}
            untils={this.state.untils}
            permPrice={this.state.permPrice}
            dyePrice={this.state.dyePrice}
            fixStart={this.state.fixStart}
            // 바뀐것: validation들
            timeValidation={timeValidation}
            finalValidation={finalValidation}
          />
        </div>
        <div className="col-6 mt-5">
          <div
            className="bg-light row"
            style={{
              padding: '1.5rem'
            }}
          >
            {this.state.cards.length === 0 &&
            this.props.newCards.length === 0 ? (
              <NoContent />
            ) : null}
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
