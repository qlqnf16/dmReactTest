import React, { Component } from 'react';
import DesignerNav from '../../components/NavigationBar/DesignerNav';
import axios from '../../../config/Axios';

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
    addCardModal: false,
    fixStart: false
  };

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

  addCardModalToggle = () => {
    this.setState({
      addCardModal: !this.state.addCardModal,
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
      date: null
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
      } else if (target.name === 'fixStart') {
        this.setState({ fixStart: target.checked });
      } else {
        this.setState({ [name]: target.checked });
      }
    }
  };

  reloadCardData = async () => {
    await this.setState({ cards: null });
    const { data } = await axios.get(
      `recruits/${this.props.userData._recruit}`
    );
    await this.setState({ cards: data._cards, madeRequest: true });
  };

  cancelCardHandler = async (cardId, recruitId) => {
    await axios.delete(`recruits/${recruitId}/cards/${cardId}`);
    await this.reloadCardData();
  };

  cardAddHandler = async cardData => {
    let addTime = 0;
    let must = cardData.must;
    let mustList = [];
    let no = cardData.no;
    let noList = [];
    Object.keys(must).forEach(m => {
      if (must[m]) mustList.push(m);
      addTime += cardData.requireTime[m];
    });
    Object.keys(no).forEach(m => {
      if (no[m]) noList.push(m);
    });
    for (let i = 0; i < mustList.length; i++) {
      if (noList.some(n => mustList[i] === n))
        return alert('필수 서비스와 불가 서비스는 같을 수 없습니다');
    }

    if (!cardData.date) return alert('날짜를 선택해주세요');
    if (!cardData.shop) return alert('장소를 선택해주세요');
    if (!cardData.ableTimes.length)
      return alert('가능한 시간대를 선택해주세요');
    if (!cardData.picture) return alert('시간 촬영 여부를 선택해주세요');
    if (!cardData.requireGender) return alert('희망 모델 성별을 선택해주세요');
    if (cardData.fixStart && mustList.length + noList.length < 3)
      return alert(
        '시작시간이 정해져있는 예약의 경우(아카데미 웍 등), 각 서비스의 필수/불가 여부를 꼭 선택해주셔야합니다.'
      );
    if (cardData.fixStart) {
      cardData.ableTimes = cardData.ableTimes.map(ableTime => {
        return { ...ableTime, until: ableTime.since + addTime };
      });
    }
    let newCards = this.state.newCards;
    let nCards = [];
    newCards.push(cardData);
    nCards = [...newCards];

    this.setState({
      newCards: nCards
      // time: 1,
      // sinces: [],
      // untils: [],
      // date: null
    });
    this.sinces = [];
    this.untils = [];
    this.addCardModalToggle();
  };

  totalSubmitHandler = async recruitData => {
    let shops;
    shops = this.props.userData.addresses.map(address => address.extraAddress);
    recruitData['shops'] = shops;

    //안 채워진 정보 검증
    // if (
    //   Object.values(recruitData).includes('') ||
    //   Object.values(recruitData).includes(null) ||
    //   Object.values(recruitData.requireTime).length !== 3 ||
    //   Object.values(recruitData.requireTime).includes('null') ||
    //   Object.values(recruitData.requireTime).includes(null)
    // )
    //   return alert('채워지지 않은 정보가 있습니다');
    if (!recruitData.title) return alert('제목을 작성해주세요');
    if (!recruitData.requirement) return alert('요청사항을 작성해주세요');
    if (
      Object.values(recruitData.requireTime).length !== 3 ||
      Object.values(recruitData.requireTime).includes('null') ||
      Object.values(recruitData.requireTime).includes(null)
    )
      return alert('예상 시술 소요 시간을 전부 작성해주세요');
    if (!this.state.newCards.length && !this.state.cards.length)
      return alert(
        '스케줄을 먼저 추가한 후 스케줄 게시하기 버튼을 클릭해주세요'
      );
    // 유저에 리크루트 없으면 생성
    if (!this.props.userData._recruit) {
      const res = await axios.post('recruits', recruitData);
      //firebase에 _recruit 추가
      await firebase
        .database()
        .ref('users/' + this.props.userData.uid)
        .update({
          _recruit: res.data._id
        });
      for (const newCard of this.state.newCards) {
        await axios.post(
          `recruits/${this.props.userData._recruit}/cards`,
          newCard
        );
      }
      await this.reloadCardData();
      await this.setState({ newCards: [] });

      // 유저가 이미 리크루트 있으면 수정
    } else {
      await axios.patch(
        `recruits/${this.props.userData._recruit}`,
        recruitData
      );
      for (const newCard of this.state.newCards) {
        await axios.post(
          `recruits/${this.props.userData._recruit}/cards`,
          newCard
        );
      }
      await this.reloadCardData();
      await this.setState({ newCards: [] });
    }
    alert(' 성공적으로 저장되었습니다! ');
  };

  cancelCardHandler = async (cardId, recruitId) => {
    await axios.delete(`recruits/${recruitId}/cards/${cardId}`);
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
        if (this.state.fixStart || this.state.untils[key]) {
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
        picture: this.state.picture,
        requireTime: this.state.requireTime,
        fixStart: this.state.fixStart
      };

      // 바뀐것: 종료시간 선택 안 했을 때에만 '시작시간 종료시간 다 선택해주세요' 글씨 나오게
      let timeValidation =
        this.state.sinces.length !== this.state.untils.length ||
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
        <div>
          <DesignerNav />
          <div className="m_containerStyle">
            <div style={containerStyle}>
              <div style={titleStyle}>
                기본정보
                <span
                  style={{
                    marginLeft: '1rem',
                    fontSize: '1.3rem',
                    color: '#dd6866'
                  }}
                >
                  {this.props.userData.expiredAt &&
                  this.props.userData.expiredAt > new Date().getTime()
                    ? null
                    : '※현재 사용중인 이용권이 없습니다. '}
                </span>
              </div>
              <TextInfo
                state={this.state}
                changeInput={e => this.handleInputChange(e)}
              />
              <div style={titleStyle}>스케줄 카드</div>
              <div
                style={fileAttachingInputStyle}
                onClick={this.addCardModalToggle}
              >
                + 카드 추가하기
              </div>
              <ScheduleCards
                cards={this.state.cards}
                newCards={this.state.newCards}
                cancelCardHandler={this.cancelCardHandler}
              />
              <div
                style={buttonStyle}
                onClick={() => this.totalSubmitHandler(recruitData)}
              >
                스케줄 저장하기
              </div>
              <div
                style={{
                  ...buttonStyle,
                  marginTop: 0,
                  color: 'rgb(76,145,186)',
                  border: '2px solid rgb(76,145,186)',
                  backgroundColor: 'white'
                }}
                onClick={
                  this.props.userData._recruit
                    ? () =>
                        this.props.history.push(
                          `/designerdetail/${this.props.userData._recruit}`
                        )
                    : () => alert('스케줄 등록을 먼저 진행해주세요')
                }
              >
                내 카드 확인
              </div>
            </div>
          </div>
          <AddCardModal
            isOpen={this.state.addCardModal}
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
            permPrice={this.state.permPrice}
            dyePrice={this.state.dyePrice}
            fixStart={this.state.fixStart}
            // 바뀐것: validation들
            timeValidation={timeValidation}
            finalValidation={finalValidation}
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
    justifyContent: 'center',
    marginBottom: '2rem',
    fontWeight: 'bold'
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
  }
};

const {
  titleStyle,
  containerStyle,
  fileAttachingInputStyle,
  buttonStyle
} = styles;

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Schedule);
