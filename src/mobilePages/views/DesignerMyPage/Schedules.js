import React, { Component } from 'react';
import DesignerNav from '../../components/NavigationBar/DesignerNav';
import axios from 'axios';

import firebase from '../../../config/Firebase';
import { connect } from 'react-redux';
import Spinner from '../../../assets/images/loading_spinner.gif';

import TextInfo from '../../components/Schedules/TextInfo';
import ScheduleCards from '../../components/Schedules/ScheduleCards';
import AddCardModal from '../../components/Schedules/AddCardModal';
class Schedule extends Component {
  state = {
    cards: [],
    madeRequest: false,
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
    newCards: [],
    requireTime: {},
    title: '',
    requirement: '',
    reviews: [],
    addCardModal: false
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get(
        `http://52.79.227.227:3030/recruits/${this.props.userData._recruit}`
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

  addCardModalToggle = () => {
    this.setState({
      addCardModal: !this.state.addCardModal
    });
  };

  timeAddHandler = () => {
    this.setState({ time: this.state.time + 1 });
  };

  timeDeleteHandler = () => {
    if (this.state.time > 1) this.setState({ time: this.state.time - 1 });
  };

  timeDefault = event => {
    const time = event._d.getTime();
    this.setState({ time: 1, date: time });
  };

  sinces = [];
  untils = [];
  permPrice = {};
  dyePrice = {};
  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    console.log('inputChange');
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
        let id = target.id.toLowerCase();
        this.setState({
          no: {
            ...this.state.no,
            [id]: target.checked
          }
        });
      } else {
        this.setState({ [name]: target.checked });
      }
    }
  };

  reloadCardData = async () => {
    await this.setState({ cards: null });
    const { data } = await axios.get(
      `http://52.79.227.227:3030/recruits/${this.props.userData._recruit}`
    );
    await this.setState({ cards: data._cards, madeRequest: true });
  };

  cancelCardHandler = async (cardId, recruitId) => {
    await axios.delete(
      `http://52.79.227.227:3030/recruits/${recruitId}/cards/${cardId}`
    );
    await this.reloadCardData();
  };

  cardAddHandler = async cardData => {
    let must = cardData.must;
    let mustList = [];
    let no = cardData.no;
    let noList = [];
    Object.keys(must).forEach(m => {
      if (must[m]) mustList.push(m);
    });
    Object.keys(no).forEach(m => {
      if (no[m]) noList.push(m);
    });
    for (let i = 0; i < mustList.length; i++) {
      if (noList.some(n => mustList[i] === n))
        return alert('필수 서비스와 불가 서비스는 같을 수 없습니다');
    }

    if (
      Object.values(cardData).includes(undefined) ||
      Object.values(cardData).includes('null') ||
      Object.values(cardData).includes(NaN) ||
      cardData.ableTimes.length === 0
    )
      return alert('채워지지 않은 정보가 있습니다');

    let newCards = this.state.newCards;
    let nCards = [];
    newCards.push(cardData);
    nCards = [...newCards];

    this.setState({ newCards: nCards });
    this.addCardModalToggle();
  };

  totalSubmitHandler = async recruitData => {
    let shops;
    shops = this.props.userData.addresses.map(address => address.extraAddress);
    recruitData['shops'] = shops;
    if (
      !this.props.userData.expiredAt ||
      this.props.userData.expiredAt < new Date().getTime()
    )
      return alert('사용중인 이용권이 없습니다.');
    //안 채워진 정보 검증
    if (
      Object.values(recruitData).includes('') ||
      Object.values(recruitData).includes(null) ||
      Object.values(recruitData.requireTime).length !== 3 ||
      Object.values(recruitData.requireTime).includes('null')
    )
      return alert('채워지지 않은 정보가 있습니다');
    // 유저에 리크루트 없으면 생성
    if (!this.props.userData._recruit) {
      const res = await axios.post(
        'http://52.79.227.227:3030/recruits',
        recruitData
      );
      //firebase에 _recruit 추가
      await firebase
        .database()
        .ref('users/' + this.props.userData.uid)
        .update({
          _recruit: res.data._id
        });
      for (const newCard of this.state.newCards) {
        await axios.post(
          `http://52.79.227.227:3030/recruits/${
            this.props.userData._recruit
          }/cards`,
          newCard
        );
      }
      await this.reloadCardData();
      await this.setState({ newCards: [] });

      // 유저가 이미 리크루트 있으면 수정
    } else {
      await axios.patch(
        `http://52.79.227.227:3030/recruits/${this.props.userData._recruit}`,
        recruitData
      );
      for (const newCard of this.state.newCards) {
        await axios.post(
          `http://52.79.227.227:3030/recruits/${
            this.props.userData._recruit
          }/cards`,
          newCard
        );
      }
      await this.reloadCardData();
      await this.setState({ newCards: [] });
    }
    alert(' 성공적으로 저장되었습니다! ');
  };

  cancelCardHandler = async (cardId, recruitId) => {
    await axios.delete(
      `http://52.79.227.227:3030/recruits/${recruitId}/cards/${cardId}`
    );
    await this.reloadCardData();
  };

  render() {
    if (this.state.cards) {
      const dates = this.state.cards.map(card => card.date);

      const recruitData = {
        title: this.state.title,
        requirement: this.state.requirement,
        _designer: this.props.userData._id,
        designerName: this.props.userData.name,
        _cards: this.state.cards,
        _reviews: this.state.reviews,
        requireTime: this.state.requireTime
      };

      let requireTime = null;

      if (this.state.cutTime && this.state.permTime && this.state.dyeTime) {
        requireTime = {
          cut: this.state.cutTime,
          perm: this.state.permTime,
          dye: this.state.dyeTime
        };
        recruitData['requireTime'] = requireTime;
      }
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
        sigungu,
        picture: this.state.picture
      };

      return (
        <div>
          <DesignerNav />
          <div className="m_containerStyle">
            <div style={containerStyle}>
              <div onClick={() => this.totalSubmitHandler(recruitData)}>
                저장
              </div>
              <div style={titleStyle}>기본정보</div>
              <TextInfo
                state={this.state}
                changeInput={e => this.handleInputChange(e)}
              />
              <div style={titleStyle}>스케줄 카드</div>
              <ScheduleCards
                cards={this.state.cards}
                newCards={this.state.newCards}
                cancelCardHandler={this.cancelCardHandler}
              />
              <div
                style={fileAttachingInputStyle}
                onClick={this.addCardModalToggle}
              >
                + 카드 추가하기
              </div>
            </div>
          </div>
          <AddCardModal
            // isOpen={this.state.addCardModal}
            isOpen // 임시
            toggle={this.addCardModalToggle}
            datePick={e => this.timeDefault(e)}
            time={this.state.time}
            timeAdd={this.timeAddHandler}
            timeDelete={this.timeDeleteHandler}
            cardAddHandler={() => this.cardAddHandler(cardData)}
            changeInput={e => this.handleInputChange(e)}
            date={this.state.date}
            addresses={this.props.userData.addresses}
            dates={dates}
            sinces={this.state.sinces}
            untils={this.state.untils}
          />
        </div>
      );
    } else {
      return (
        <div
          style={{ height: '100vh', width: '100%' }}
          className="d-flex justify-content-center align-items-center"
        >
          <img alt="alt" style={{ height: '20%' }} src={Spinner} />
        </div>
      );
    }
  }
}

const styles = {
  titleStyle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#4c91ba',
    textAlign: 'left',
    margin: '33.5px 0 20px 0',
    paddingBottom: 6.9,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
  },
  containerStyle: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  fileAttachingInputStyle: {
    height: 48,
    borderRadius: 5,
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    fontSize: '1.3rem',
    color: 'rgba(0, 0, 0, 0.2',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
};

const { titleStyle, containerStyle, fileAttachingInputStyle } = styles;

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Schedule);
