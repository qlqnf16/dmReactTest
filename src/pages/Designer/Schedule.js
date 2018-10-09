import React, { Component } from 'react';
import { Container, Form } from 'reactstrap';
import ScheduleBox from '../../components/DesignerSchedule/ScheduleBox/ScheduleBox';
import axios from 'axios';
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

  handleInputChange(e) {
    console.log('Adsfasd');
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  cancelCardHandler = async (cardId, recruitId) => {
    await axios.delete(
      `http://52.79.227.227:3030/recruits/${recruitId}/cards/${cardId}`
    );
    const { data } = await axios.get(`http://52.79.227.227:3030/cards`);
    this.setState({ cards: data, madeRequest: true });
  };

  cardAddHandler = async cardData => {
    let newCards = this.state.newCards;
    let nCards = [];
    newCards.push(cardData);
    nCards = [...newCards];

    this.setState({ newCards: nCards });
  };

  totalSubmitHandler = async recruitData => {
    console.log(recruitData);
    if (!this.props.userData._recruit) {
      console.log('최초 생성');
      const res = await axios.post(
        'http://52.79.227.227:3030/recruits',
        recruitData
      );
      console.log(res);
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
      await alert('생성되었습니다');
    } else {
      console.log('정보 수정');

      //TODO : 특정부분 그대로 하고 새로고침...
      const res = await axios.patch(
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
    return (
      <Container>
        <h1 className="mt-5">스케줄 등록</h1>
        <Form>
          <ScheduleBox
            cards={this.state.cards}
            requireTime={this.state.requireTime}
            newCards={this.state.newCards}
            cancelCardHandler={this.cancelCardHandler}
            cardAddHandler={this.cardAddHandler}
            totalSubmitHandler={this.totalSubmitHandler}
          />
          {/* // changeInput= {e => this.handleInputChange(e)} */}
        </Form>
      </Container>
    );
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Schedule);
