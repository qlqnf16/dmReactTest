import React, { Component } from 'react';
import { Container, Form } from 'reactstrap';
import TextInfo from '../../components/DesignerSchedule/TextInfo';
import ScheduleBox from '../../components/DesignerSchedule/ScheduleBox/ScheduleBox';

class Schedule extends Component {
  render() {
    return (
      <Container>
        <h1 className="mt-5">스케줄 등록</h1>
        <Form>
          <TextInfo />
          <ScheduleBox />
        </Form>
      </Container>
    );
  }
}

export default Schedule;
