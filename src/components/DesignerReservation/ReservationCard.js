import React from 'react'

const ReservationCard = props => (
    <div className="col-3" >
        <div className="card p-3 m-1">
            <h5 className="small text-right"> {props.state}</h5>
            <h5>이름 : {props.name}</h5>
            <h5 className="small">날짜 : {props.date} {props.time}</h5>
            <h5 className="small">장소 : {props.location}</h5>
            <h5 className="small">종류 : {props.style}</h5>
            <button className="btn btn-light">예약취소</button>
            <button className="btn btn-light">더보기</button>
        </div>
    </div>
)

export default ReservationCard