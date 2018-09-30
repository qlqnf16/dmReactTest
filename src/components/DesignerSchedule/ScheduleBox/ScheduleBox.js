import React, { Component } from 'react';
import Schedule from './Schedule/Schedule';
import ScheduleCard from './ScheduleCard/ScheduleCard';

class ScheduleBox extends Component {
  state = {
    time: 1,
    schedules: [
      {
        date: '13(목)',
        time: '10:00-13:00',
        essential: ['커트', '염색'],
        gender: ['남자', '여자']
      },
      {
        date: '13(목)',
        time: '17:00-20:00',
        essential: ['커트', '염색'],
        gender: ['남자', '여자']
      },
      {
        date: '14(금)',
        time: '10:00-13:00',
        essential: ['커트'],
        gender: ['남자']
      }
    ]
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
      <div className="row">
        <div className="col-6">
          <Schedule
            datePick={this.timeDefault}
            time={this.state.time}
            timeAdd={this.timeAddHandler}
            submit={this.submit}
          />
        </div>
        <div className="col-6 row">
          {this.state.schedules.map((schedule, key) => (
            <ScheduleCard
              date={schedule.date}
              time={schedule.time}
              essential={schedule.essential.join(', ')}
              gender={schedule.gender.join(', ')}
              key={key}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ScheduleBox;
