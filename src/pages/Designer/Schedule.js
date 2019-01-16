import React, { Component } from 'react';
import axios from '../../config/Axios';
import firebase from '../../config/Firebase';
import { connect } from 'react-redux';

import ScheduleBox from '../../components/DesignerSchedule/ScheduleBox/ScheduleBox';
import Spinner from '../../assets/images/loading_spinner.gif';

class Schedule extends Component {
  state = {
    cards: [],
    madeRequest: false,
    newCards: [],
    requireTime: {},
    tickets: []
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest && this.props.userData._recruit) {
      const { data } = await axios.get(
        `recruits/${this.props.userData._recruit}`
      );
      let cards;
      if (data._cards) {
        cards = data._cards.filter(
          card => card.reservable && card.date > new Date().getTime()
        );
      } else {
        cards = [];
      }
      this.setState({
        cards,
        madeRequest: true,
        newCards: [],
        requireTime: data.requireTime
      });
    }

    // 디자이너 티켓을 몇 개 보유중인지 표시하기 위해 state의 tickets를 불러서 length를 계산할 것
    const { data } = await axios.get(
      `users/${this.props.userData._id}/tickets`
    );
    await this.setState({ tickets: data, madeRequest: true });
  };

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  reloadCardData = async () => {
    await this.setState({ cards: null });
    const { data } = await axios.get(
      `recruits/${this.props.userData._recruit}`
    );

    const cards = data._cards.filter(
      card => card.reservable && card.date > new Date().getTime()
    );

    await this.setState({ cards, madeRequest: true });
  };

  cancelCardHandler = async (cardId, recruitId) => {
    await axios.patch(`recruits/${recruitId}/cards/${cardId}`);
    // await axios.delete(`recruits/${recruitId}/cards/${cardId}`);
    await this.reloadCardData();
  };

  cardAddHandler = cardData => {
    let addTime = 0;
    let must = cardData.must;
    let mustList = [];
    let no = cardData.no;
    let noList = [];
    Object.keys(must).forEach(m => {
      if (must[m]) {
        mustList.push(m);
        addTime += cardData.requireTime[m];
      }
    });
    Object.keys(no).forEach(m => {
      if (no[m]) noList.push(m);
    });
    for (let i = 0; i < mustList.length; i++) {
      if (noList.some(n => mustList[i] === n))
        return alert('필수 서비스와 불가 서비스는 같을 수 없습니다');
    }

    // if (
    //   Object.values(cardData).includes(undefined) ||
    //   Object.values(cardData).includes('null') ||
    //   Object.values(cardData).includes(NaN) ||
    //   cardData.ableTimes.length === 0
    // )
    //   return alert('채워지지 않은 정보가 있습니다');
    if (!cardData.date) return alert('날짜를 선택해주세요');
    if (!cardData.shop) return alert('장소를 선택해주세요');
    if (!cardData.ableTimes.length)
      return alert('가능한 시간대를 선택해주세요');
    if (!cardData.picture || cardData.picture === 'null')
      return alert('시간 촬영 여부를 선택해주세요');
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

    this.setState({ newCards: nCards });
    alert(
      "스케줄이 추가되었습니다. \n반드시 우측 상단의 '스케줄 게시하기' 버튼을 클릭하셔야 최종 등록완료됩니다."
    );

    return true;
  };

  totalSubmitHandler = async recruitData => {
    let shops;
    shops = this.props.userData.addresses.map(address => address.extraAddress);
    recruitData['shops'] = shops;

    //안 채워진 정보 검증
    if (!recruitData.title) return alert('제목을 작성해주세요');
    if (!recruitData.requirement) return alert('요청사항을 작성해주세요');
    if (
      Object.values(recruitData.requireTime).length !== 3 ||
      Object.values(recruitData.requireTime).includes('null') ||
      Object.values(recruitData.requireTime).includes(null) ||
      Object.values(recruitData.requireTime).includes(NaN)
    )
      return alert('예상 시술 소요 시간을 모두 채워주세요');
    if (!this.state.newCards.length && !this.state.cards.length)
      return alert(
        '스케줄을 먼저 추가한 후 스케줄 게시하기 버튼을 클릭해주세요'
      );
    if (!this.props.userData._recruit) {
      // 유저에 리크루트 없으면 생성
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

  render() {
    if (this.state.cards) {
      const dates = this.state.cards.map(card => card.date);
      const newDates = this.state.newCards.map(card => card.date);

      const showMyCard = this.props.userData._recruit
        ? () =>
            this.props.history.push(
              `/designerdetail/${this.props.userData._recruit}`
            )
        : () => alert('스케줄 등록을 먼저 진행해주세요');

      return (
        <div className="container-fluid d">
          <div className="d_bg">
            <div className="d_container">
              <div style={{ color: '#4c91ba' }} className="u_title ">
                스케줄 등록
                <span
                  style={{
                    color: '#dd6866',
                    fontSize: '1.2rem',
                    marginLeft: '2rem'
                  }}
                >
                  {this.props.userData.expiredAt &&
                  this.props.userData.expiredAt > new Date().getTime()
                    ? null
                    : this.state.tickets.length > 0
                    ? `※ 사용가능한 이용권이 있습니다. 이용권 관리 탭에 가서 ‘사용하기’를 누르면 게시물이 활성화됩니다.`
                    : `※ 사용가능한 이용권이 없습니다. 스케줄 등록 후 게시를 위해서 이용권을 구매해주세요.`}
                </span>
              </div>
              <ScheduleBox
                cards={this.state.cards}
                requireTime={this.state.requireTime}
                newCards={this.state.newCards}
                cancelCardHandler={this.cancelCardHandler}
                cardAddHandler={this.cardAddHandler}
                totalSubmitHandler={this.totalSubmitHandler}
                dates={dates}
                newDates={newDates}
                showMyCard={showMyCard}
              />
            </div>
          </div>
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
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Schedule);
