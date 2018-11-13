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
    requireTime: {}
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest && this.props.userData._recruit) {
      const { data } = await axios.get(
        `recruits/${this.props.userData._recruit}`
      );
      this.setState({
        cards: data._cards,
        madeRequest: true,
        newCards: [],
        requireTime: data.requireTime
      });
    }
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
    await this.setState({ cards: data._cards, madeRequest: true });
  };

  cancelCardHandler = async (cardId, recruitId) => {
    await axios.delete(`recruits/${recruitId}/cards/${cardId}`);
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
    if (!cardData.picture) return alert('시간 촬영 여부를 선택해주세요');
    if (!cardData.requireGender) return alert('희망 모델 성별을 선택해주세요');

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
    if (
      Object.values(recruitData).includes('') ||
      Object.values(recruitData).includes(null) ||
      Object.values(recruitData.requireTime).length !== 3 ||
      Object.values(recruitData.requireTime).includes('null') ||
      Object.values(recruitData.requireTime).includes(null)
    )
      return alert('채워지지 않은 정보가 있습니다');
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
                    fontSize: '1.6rem',
                    marginLeft: '2rem'
                  }}
                >
                  {this.props.userData.expiredAt &&
                  this.props.userData.expiredAt > new Date().getTime()
                    ? null
                    : '※현재 사용중인 이용권이 없습니다. '}
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
