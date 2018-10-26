import React, { Component } from 'react';
import ScheduleBox from '../../components/DesignerSchedule/ScheduleBox/ScheduleBox';
import axios from 'axios';
import firebase from '../../config/Firebase';
import { connect } from 'react-redux';
class Schedule extends Component {
  state = {
    cards: [],
    madeRequest: false,
    newCards: [],
    requireTime: {}
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get(
        `http://52.79.227.227:3030/recruits/${this.props.userData._recruit}`
      );
      this.setState({
        cards: data._cards,
        madeRequest: true,
        newCards: [],
        requireTime: data.requireTime
      });
      console.log(this.state.recruitData);
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

  cancelCardHandler = async (cardId, recruitId) => {
    await axios.delete(
      `http://52.79.227.227:3030/recruits/${recruitId}/cards/${cardId}`
    );
    const { data } = await axios.get(`http://52.79.227.227:3030/cards`);
    this.setState({ cards: data, madeRequest: true });
  };

  cardAddHandler = async cardData => {
    console.log(cardData);
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
  };

  totalSubmitHandler = async recruitData => {
    console.log(recruitData);
    // 유저에 리크루트 없으면 생성
    if (!this.props.userData._recruit) {
      console.log('최초 생성');
      const res = await axios.post(
        'http://52.79.227.227:3030/recruits',
        recruitData
      );
      console.log(res);
      //firebase에 _recruit 추가
      await firebase
        .database()
        .ref('users/' + this.props.userData.uid)
        .update({
          _recruit: res.data._id
        });
      await this.state.newCards.forEach(async newCard => {
        await axios.post(
          `http://52.79.227.227:3030/recruits/${
            this.props.userData._recruit
          }/cards`,
          newCard
        );
      });
      const { data } = await axios.get(
        `http://52.79.227.227:3030/recruits/${
          this.props.userData._recruit
        }/cards`
      );
      this.setState({ cards: data, newCards: [] });
    } else {
      console.log('정보 수정');

      await axios.patch(
        `http://52.79.227.227:3030/recruits/${this.props.userData._recruit}`,
        recruitData
      );
      console.log(this.state.cards);
      this.state.newCards.forEach(async newCard => {
        await axios.post(
          `http://52.79.227.227:3030/recruits/${
            this.props.userData._recruit
          }/cards`,
          newCard
        );
      });
      const { data } = await axios.get(
        `http://52.79.227.227:3030/recruits/${this.props.userData._recruit}`
      );
      this.setState({ cards: data._cards, newCards: [] });
      console.log(data);
    }
    // TODO : 더 좋은 방법 찾기
    window.location.reload();
    alert(' 성공적으로 저장되었습니다! ');
  };

  render() {
    const dates = this.state.cards.map(card => card.date);

    return (
      <div className="container-fluid d">
        <div className="d_bg">
          <div className="d_container">
            <div style={{ color: '#4c91ba' }} className="u_title ">
              스케줄 등록
            </div>
            <ScheduleBox
              cards={this.state.cards}
              requireTime={this.state.requireTime}
              newCards={this.state.newCards}
              cancelCardHandler={this.cancelCardHandler}
              cardAddHandler={this.cardAddHandler}
              totalSubmitHandler={this.totalSubmitHandler}
              dates={dates}
            />
            {/* // changeInput= {e => this.handleInputChange(e)} */}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Schedule);
