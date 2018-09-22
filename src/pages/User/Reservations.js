import React, { Component } from 'react'
import UserNav from '../../components/Navigation/UserNav/UserNav';
import axios from "axios";
import ReservationCards from '../../components/UserReservation/ReservationCards/ReservationCards'

class Reservations extends Component {
    state = {
        reservations: null,
        madeRequest: false
    }

    componentDidMount = async () => {
        if(!this.state.madeRequest) {
            // 일단은 더미유저 아이디를 가져와서 사용. 이후 현재 로그인 유저의 아이디로 요청을 보내면 됨.
            const users = (await axios.get(`http://52.79.227.227:3030/users`)).data;

            const {data} = await axios.get(`http://52.79.227.227:3030/reservations/${users[0]._id}`);
            this.setState({
                reservations: data,
                madeRequest: true
            });
        }
    }
    
    render(){
        console.log(this.state);
        let futureReservations =[];
        let previousReservations=[];
        if(this.state.reservations) {
            futureReservations = this.state.reservations.filter((reservation) => reservation.time.until > 600 && !reservation.isCanceled); // 실제로는 현재 타임스탬프 사용
            previousReservations = this.state.reservations.filter((reservation) => reservation.time.until <= 600 || reservation.isCanceled);
        }
        console.log(futureReservations)

        return (
            <div className="container">
                <div className="row">
                    <UserNav />
                    <ReservationCards
                        futureReservations={futureReservations}
                        previousReservations={previousReservations}
                    />
                </div>
            </div>
        )
    }
}

export default Reservations