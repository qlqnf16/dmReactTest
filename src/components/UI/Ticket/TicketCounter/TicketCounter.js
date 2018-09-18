import React from "react";

const TicketCounter = (props) => (
    <div>
        {/* <img /> 티켓이미지 */}
        <span>{props.count}개</span>
    </div>
)

export default TicketCounter;