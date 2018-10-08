import React, { Component } from 'react';
import { Container, Form } from 'reactstrap';
import ScheduleBox from '../../components/DesignerSchedule/ScheduleBox/ScheduleBox';
import axios from 'axios';

class Schedule extends Component {
  state = {
    cards: [],
    madeRequest: false,
    newCards: []
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get(`http://52.79.227.227:3030/cards`);
      this.setState({ cards: data, madeRequest: true });
      console.log(this.state.cards);
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
    newCards.push(cardData);

    this.setState({ newCards });
  };

  totalSubmitHandler = async recruitId => {
    console.log('total');
    this.state.newCards.forEach(newCard => {
      console.log('카드 하나');
      axios.post(
        `http://52.79.227.227:3030/recruits/${recruitId}/cards`,
        newCard
      );
    });
    const { data } = await axios.get(`http://52.79.227.227:3030/cards`);
    this.setState({ cards: data, madeRequest: true });
    alert(' 성공적으로 저장되었습니다! ');
  };

  render() {
    return (
      <Container>
        <h1 className="mt-5">스케줄 등록</h1>
        <Form>
          <ScheduleBox
            cards={this.state.cards}
            newCards={this.state.newCards}
            cancelCardHandler={this.cancelCardHandler}
            cardAddHandler={this.cardAddHandler}
            totalSubmitHandler={this.totalSubmitHandler}
            // changeInput={e => this.handleInputChange(e)}
          />
        </Form>
      </Container>
    );
  }
}

export default Schedule;
