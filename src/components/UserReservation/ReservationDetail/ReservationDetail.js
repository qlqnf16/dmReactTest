import React from 'react';

const ReservationDetail = (props) => (
    <div>
        <h4>요청사항</h4>
        <div>{props.requirement}</div>
        <h4>추가금액</h4>
        <div>{props.additionalPrice}</div>
    </div>
)

export default ReservationDetail;