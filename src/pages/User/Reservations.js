import React, { Component } from 'react'
import UserNav from '../../components/Navigation/UserNav/UserNav';
import PreviousReservations from "../../components/UserReservation/PreviousReservations/PreviousReservations";
import FutureReservations from '../../components/UserReservation/FutureReservation/FutureReservations';
import axios from "axios";

class Reservations extends Component {
    state = {
        reservations: null,
        madeRequest: false
    }

    componentDidMount = async () => {
        if(!this.state.madeRequest) {
            // 일단은 더미유저 아이디를 가져와서 사용. 이후 현재 로그인 유저의 아이디로 요청을 보내면 됨.
            const users = (await axios.get(`http://localhost:3030/users`)).data;

            const {data} = await axios.get(`http://localhost:3030/reservations/${users[0]._id}`);
            this.setState({
                reservations: data,
                madeRequest: true
            });
        }
    }
    
    render(){
        console.log(this.state);
        let futureReservationsEle;
        let previousReservationsEle;
        if(this.state.reservations) {
            const futureReservations = this.state.reservations.filter((reservation) => reservation.time.until > 600 && !reservation.isCanceled); // 실제로는 현재 타임스탬프 사용
            const previousReservations = this.state.reservations.filter((reservation) => reservation.time.until <= 600 || reservation.isCanceled);
            futureReservationsEle = (<FutureReservations reservations={futureReservations}></FutureReservations>);
            previousReservationsEle = (<PreviousReservations reservations={previousReservations}></PreviousReservations>);
        }

        return (
            <div className="container">
                <UserNav />
                <div className="row">
                    <h1>This is Reservations</h1>
                </div>
                {futureReservationsEle}
                {previousReservationsEle}
            </div>
        )
    }
}

export default Reservations