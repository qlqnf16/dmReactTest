import React, { Component } from 'react'
import ReservationCard from '../../components/DesignerReservation/ReservationCard';

class DesignerReservations extends Component {

    state = {
        reservations : []
    }

    componentWillMount = () => {
        // 디자이너 정보 이용해서 예약 조회
        const reservations = [
            {
                name: "오상우",
                date: 20180910,
                time: "25:00",
                location: "안암/스스",
                style: "컷트",
                cancel: false
            },
            {
                name: "이정민",
                date: 20180911,
                time: "25:00",
                location: "안암/스스",
                style: "염색",
                cancel: false
            },
            {
                name: "안운장",
                date: 20180908,
                time: "25:00",
                location: "안암/스스",
                style: "염색",
                cancel: false
            },
            {
                name: "심건우",
                date: 20180907,
                time: "25:00",
                location: "안암/스스",
                style: "염색",
                cancel: true
            },
            {
                name: "이태훈",
                date: 20180906,
                time: "25:00",
                location: "안암/스스",
                style: "염색",
                cancel: true
            },
            {
                name: "주기현",
                date: 20180917,
                time: "25:00",
                location: "안암/스스",
                style: "염색",
                cancel: false
            },
            {
                name: "성인규",
                date: 20180916,
                time: "25:00",
                location: "안암/스스",
                style: "컷트",
                cancel: false
            }
        ]
        this.setState({ reservations })
    }
    


    render(){
        return(
            <div className="container">
                <h1 className="my-5">예약 관리</h1>
                <div className="m-4">
                    <h4>다가오는 예약</h4>
                    <div className="row">
                        {
                            this.state.reservations.filter(reservation=>{
                                return reservation.cancel === false && reservation.date > 20180909
                                }
                            ).map((reservation, key)=> (
                                <ReservationCard 
                                    name={reservation.name}
                                    date={reservation.date}
                                    time={reservation.time}
                                    location={reservation.location}
                                    style={reservation.style}
                                    key={key}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="m-4">
                    <h4>완료된 예약</h4>
                    <div className="row">
                        {
                            this.state.reservations.filter(reservation=>{
                                return reservation.cancel === false && reservation.date <= 20180909
                                }
                            ).map((reservation, key)=> (
                                <ReservationCard 
                                    name={reservation.name}
                                    date={reservation.date}
                                    time={reservation.time}
                                    location={reservation.location}
                                    style={reservation.style}
                                    key={key}
                                    state="완료"
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="m-4">
                    <h4>취소된 예약</h4>
                    <div className="row card-group">
                        {
                            this.state.reservations.filter(reservation=>{
                                return reservation.cancel === true
                                }
                            ).map((reservation, key)=> (
                                <ReservationCard 
                                    name={reservation.name}
                                    date={reservation.date}
                                    time={reservation.time}
                                    location={reservation.location}
                                    style={reservation.style}
                                    key={key}
                                    state="취소"
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
   
export default DesignerReservations