import React, { Component } from 'react'
import { Container, Form } from 'reactstrap'
import TextInfo from '../../components/DesignerSchedule/TextInfo';
import ScheduleBox from '../../components/DesignerSchedule/ScheduleBox/ScheduleBox';

class Schedule extends Component {
	render(){
		return(
			<Container>
				<Form>
					<TextInfo />
					<ScheduleBox />
				</Form>
			</Container>
		)
	}
}
 
export default Schedule