import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'
import AttentionCard from '../components/ReservationConfirm/AttentionCard'

class ReservationConfirm extends Component {
  state = {
    user : "",
    designer : "",
    date : "",
    time : "",
    location : "",
    style : ""
  }

  componentWillMount = () => {
    // url로 넘겨받은 {this.props.match.params.reservation_id} 를 이용해서 db에서 정보 추출해서 넣기
    const reservation = {
      user : "오상우",
      designer : "안운장",
      date : "2018/12/32",
      time : "25:00",
      location : "안암/스스",
      style : "컷트"
    }
    this.setState(reservation)
  }
  


  render() {
    return (
        <div className="container">
            <div className="m-5 text-center">
              <h1>3단계 : 서비스 받기 (이미지)</h1>
            </div>
            <div className="m-5 text-center">
              <h1>예약이 완료되었습니다.</h1>
              <h2>예약 번호 : {this.props.match.params.reservation_id}</h2>
            </div>
            <div className="row">
              <div className="col-6">
                <h4 className="m-4">예약자 : {this.state.user } </h4>
                <h4 className="m-4">막내 : {this.state.designer }</h4>
                <h4 className="m-4">날짜/시간 : {this.state.date +" "+ this.state.time}</h4>
                <h4 className="m-4">장소 : {this.state.location}</h4>
                <h4 className="m-4">스타일 : {this.state.style}</h4>
              </div>
              <AttentionCard />
            </div>
            <div className="d-block text-center">
              <Link to='/reservations'><Button color="primary">예약확인 / 취소</Button></Link>
            </div>
        </div>
    )
  }
}

export default ReservationConfirm