import React from "react";
import TicketList from "./TicketList/TicketList";

const TicketBox = (props) => (
    <div>
        <div className="d-flex justify-content-around">
            <div>종류</div>
            <div>결제일</div>
            <div>결제금액</div>
            <div>상태</div>
            <div>사용날짜</div>
        </div>
        <TicketList tickets={props.tickets} />
    </div>
);

export default TicketBox;