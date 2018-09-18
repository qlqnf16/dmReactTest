import React from 'react';

const ReservationCard = (props) => (
    <div>
        <h3>{props.designerName}</h3>
        <span>D - 2</span>
        <h2>{props.title}</h2>
        <div>{props.date.since}</div>
        <div>{props.location}</div>
        <div>{props.type}</div>
        <button>예약 취소</button>
        <button>더보기</button>
    </div>
);

export default ReservationCard;