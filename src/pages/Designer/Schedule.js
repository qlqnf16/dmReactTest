import React, { Component } from 'react';
import { Container, Form } from 'reactstrap';
import ScheduleBox from '../../components/DesignerSchedule/ScheduleBox/ScheduleBox';
import axios from 'axios';

class Schedule extends Component {
  state = {
    cards: [],
    madeRequest: false
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get(`http://52.79.227.227:3030/cards`);
      this.setState({ cards: data, madeRequest: true });
    }
  };

  cancelCardHandler = async (cardId, recruitId) => {
    await axios.delete(
      `http://52.79.227.227:3030/recruits/${recruitId}/cards/${cardId}`
    );
    const { data } = await axios.get(`http://52.79.227.227:3030/cards`);
    this.setState({ cards: data, madeRequest: true });
  };

  cardAddHandler = async recruitId => {
    const cardData = {
      price: { cut: 3000, perm: 20000, dye: 30000 },
      requireTime: { cut: 90, perm: 180, dye: 120 },
      must: { cut: false, perm: true, dye: false },
      no: { cut: false, perm: false, dye: true },
      reservable: true,
      date: 1539064800000,
      ableTimes: [{ since: 480, until: 840 }, { since: 1200, until: 1320 }],
      reservedTimes: [{ since: 540, until: 630 }, { since: 1200, until: 1290 }],
      region: '성북구',
      shop: '준오헤어',
      requireGender: 'male'
    };
    await axios.post(
      `http://52.79.227.227:3030/recruits/${recruitId}/cards`,
      cardData
    );
    const { data } = await axios.get(`http://52.79.227.227:3030/cards`);
    this.setState({ cards: data, madeRequest: true });
  };

  render() {
    console.log(this.state.cards);
    return (
      <Container>
        <h1 className="mt-5">스케줄 등록</h1>
        <Form>
          <ScheduleBox
            cards={this.state.cards}
            cancelCardHandler={this.cancelCardHandler}
            cardAddHandler={this.cardAddHandler}
          />
        </Form>
      </Container>
    );
  }
}

export default Schedule;
