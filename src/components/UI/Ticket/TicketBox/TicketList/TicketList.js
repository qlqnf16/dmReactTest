import React from "react";

const TicketList = (props) => {
    const tickets = props.tickets.map((ticket) => (
        <tr key={ticket.purchasedAt}>
                <td>1회이용권</td>
                <td>{ticket.purchasedAt}</td>
                <td>{ticket.price}</td>
                <td>{ticket.expiredAt ? "사용" : "미사용"}</td>
                <td>{ticket.expiredAt || "미사용입니다"}</td>
        </tr>
    ));

    return (
        <tbody>
            {tickets}
        </tbody>
    );
}

export default TicketList;