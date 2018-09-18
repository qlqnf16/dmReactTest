import React, { Component } from 'react'
import UserNav from '../../components/Navigation/UserNav/UserNav';
import PreviousReservations from "../../components/UserReservation/PreviousReservations/PreviousReservations";
import FutureReservations from '../../components/UserReservation/FutureReservation/FutureReservations';

class Reservations extends Component {
    state = {
        reservations: [
            {
                designer: {
                    name: "이태훈",
                    location: "청담동",
                    shop: "차홍아르더"
                },
                title: "언니, 오빠 막내는 나야 나!",
                date: {
                    since: 100,
                    until: 200
                },
                isCanceled: false
            },{
                designer: {
                    name: "심건우",
                    location: "청담동",
                    shop: "차홍아르더"
                },
                title: "이 구역 에이스 막내!",
                date: {
                    since: 300,
                    until: 400
                },
                isCanceled: false
            },{
                designer: {
                    name: "박지윤",
                    location: "청담동",
                    shop: "차홍아르더"
                },
                title: "진정성있는 서비스",
                date: {
                    since: 500,
                    until: 700
                },
                isCanceled: false,
                requirement: "커트 : 여자분은 최소 어깨 아래기장이면 좋겠습니다.",
                additionalPrice: "염색/펌은 현장에서 3만원 결제해주셔야 합니다."
            },{
                designer: {
                    name: "안운장",
                    location: "청담동",
                    shop: "차홍아르더"
                },
                title: "만족스러운 헤어컷!",
                date: {
                    since: 900,
                    until: 1000
                },
                isCanceled: true
            }
        ]
    }
    
    render(){
        const futureReservations = this.state.reservations.filter((reservation) => reservation.date.until > 600 && !reservation.isCanceled); // 실제로는 현재 타임스탬프 사용
        const previousReservations = this.state.reservations.filter((reservation) => reservation.date.until <= 600 || reservation.isCanceled);

        return (
            <div className="container">
                <UserNav />
                <div className="row">
                    <h1>This is Reservations</h1>
                </div>
                <FutureReservations reservations={futureReservations}></FutureReservations>
                <PreviousReservations reservations={previousReservations}></PreviousReservations>
            </div>
        )
    }
}

export default Reservations