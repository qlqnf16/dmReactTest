import React from 'react';

const ReservationCard = (props) => (
    <div className="col-4">
        <div className="border p-3 m-1">
            <h5 className=" text-right">{props.state}</h5>
            <h5>{props.designerName}</h5>
            <h4>타이틀이 디비에 없네</h4>
            <p className="small">{props.date}</p>
            <p className="small">{props.location}</p>
            <p className="small">{props.type}</p>
            <button>예약 취소</button>
            <button>더보기</button>
        </div>
    </div>
);

export default ReservationCard;