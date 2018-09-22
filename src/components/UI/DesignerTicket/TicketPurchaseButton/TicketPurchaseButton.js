import React from "react";

const TicketPurchaseButton = () => (
    <div className="row mt-5">
        <div className="col-6">
            {/* <img /> 티켓 이미지 필요 */}
            <div>1개월 이용권</div>
            <div>10000원</div>
            <button className="btn btn-light"><span className="small">이용권 구매</span></button>
        </div>
        <div className="col-6">
            {/* <img /> 티켓 이미지 필요 */}
            <div>3개월 이용권</div>
            <div>28,000원</div>
            <button className="btn btn-light"><span className="small">이용권 구매</span></button>
        </div>
    </div>
);

export default TicketPurchaseButton;