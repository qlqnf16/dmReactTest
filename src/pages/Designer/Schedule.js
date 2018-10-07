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
      console.log(data);
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

  render() {
    console.log(this.state.cards);
    return (
      <Container>
        <h1 className="mt-5">스케줄 등록</h1>
        <Form>
          <ScheduleBox
            cards={this.state.cards}
            cancelCardHandler={this.cancelCardHandler}
          />
        </Form>
      </Container>
    );
  }
}

export default Schedule;
