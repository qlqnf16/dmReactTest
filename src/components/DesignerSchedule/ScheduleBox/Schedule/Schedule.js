import React, { Component } from 'react'
import { FormGroup, Label, Input, Button } from "reactstrap";

class Schedule extends Component {
	timeSelector = ( )=> {
		let timeSelector = []
		for(let i=0; i < this.props.time; i++){
			timeSelector.push(
				<div className='row' key={i}>
					<Input type="select" name={`startTime${i}`} id={`startTime${i}`} className='col-5'>
						<option>10:00</option>
						<option>11:00</option>
						<option>12:00</option>
					</Input>
					~ 
					<Input type="select" name={`endTime${i}`} id={`endTime${i}`} className='col-5'>
						<option>11:00</option>
						<option>12:00</option>
						<option>13:00</option>
					</Input>
				</div>
			)
		}
		return timeSelector
	}

	render() {
		return(
			<div className='row'>
				<FormGroup className="col-6">
					<Input type="date" name="date" id="exampleDate" placeholder="date placeholder" onChange={this.props.datePick} />
				</FormGroup>
				<div className='col-6'>
					<FormGroup row>
							<Label sm={2}>시간</Label>
							<div className='col-10'>
								{this.timeSelector()}
								<Button color='light' onClick={this.props.timeAdd}>+ 시간 추가</Button>
							</div>
					</FormGroup>
					<FormGroup row>
							<Label sm={2}>장소</Label>
							<Input type='select' className='col-8'>
								<option>박준뷰티랩 청담본점</option>
								<option>머리샵 일산웨스턴돔점</option>
							</Input>
					</FormGroup>
						<div>
							<p>꼭 해야하는 시술 (필수)</p>
							<FormGroup check inline>
								<Label check>
									<Input type="checkbox" /> 커트
								</Label>
							</FormGroup>
							<FormGroup check inline>
								<Label check>
									<Input type="checkbox" /> 펌
								</Label>
							</FormGroup>
							<FormGroup check inline>
								<Label check>
									<Input type="checkbox" /> 염색
								</Label>
							</FormGroup>
						</div>
						<div>
							<p>시술 불가한 서비스 (선택)</p>
							<FormGroup check inline>
								<Label check>
									<Input type="checkbox" /> 커트
								</Label>
							</FormGroup>
							<FormGroup check inline>
								<Label check>
									<Input type="checkbox" /> 펌
								</Label>
							</FormGroup>
							<FormGroup check inline>
								<Label check>
									<Input type="checkbox" /> 염색
								</Label>
							</FormGroup>
						</div>
						<div>
							<p>모델 성별</p>
							<FormGroup check inline>
								<Label check>
									<Input type="checkbox" /> 남자
								</Label>
							</FormGroup>
							<FormGroup check inline>
								<Label check>
									<Input type="checkbox" /> 여자
								</Label>
							</FormGroup>
						</div>
						<div className="btn btn-light" color='light'>등록하기</div>
					</div>
			</div>
		)
	}
}

export default Schedule