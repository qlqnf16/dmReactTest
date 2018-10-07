import React, { Component } from 'react';
import Schedule from './Schedule/Schedule';
import ScheduleCard from './ScheduleCard/ScheduleCard';
import TextInfo from '../TextInfo';
class ScheduleBox extends Component {
  state = {
    time: 1
  };

  timeAddHandler = () => {
    this.setState({ time: this.state.time + 1 });
  };

  timeDefault = () => {
    this.setState({ time: 1 });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="row align-items-start">
        <div className="col-6">
          <TextInfo />
          <Schedule
            datePick={this.timeDefault}
            time={this.state.time}
            timeAdd={this.timeAddHandler}
            submit={this.submit}
            cardAddHandler={this.props.cardAddHandler}
            card={this.props.cards[0]}
          />
        </div>
        <div className="col-6 row mt-5">
          {this.props.cards.map((card, key) => (
            <ScheduleCard
              cancelCardHandler={this.props.cancelCardHandler}
              card={card}
              key={key}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ScheduleBox;
