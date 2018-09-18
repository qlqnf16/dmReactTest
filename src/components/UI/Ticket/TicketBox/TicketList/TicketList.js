import React from "react";

const TicketList = (props) => {
    const tickets = props.tickets.map((ticket) => (
        <div key={ticket.purchasedAt} className="d-flex justify-content-around">
            <div>1회이용권</div>
            <div>{ticket.purchasedAt}</div>
            <div>{ticket.price}</div>
            <div>{ticket.expiredAt ? "사용" : "미사용"}</div>
            <div>{ticket.expiredAt || "미사용입니다"}</div>
        </div>
    ));

    return (
        <div>
            {tickets}
        </div>
    );
}

export default TicketList;