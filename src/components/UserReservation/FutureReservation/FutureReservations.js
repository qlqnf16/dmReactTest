import React from "react";

import ReservationCard from "../ReservationCard/RervationCard";
import ReservationDetail from "../ReservationDetail/ReservationDetail";

const PreviousReservations = (props) => {
    const cards = props.reservations.map(reservation => (
        <div className="col-10 d-flex justify-content-around">
            <ReservationCard
                designerName={reservation.designer.name}
                title={reservation.title}
                date={reservation.date}
                location={`${reservation.designer.shop} / ${reservation.designer.location}`}
                type={"컷/염색"}
                ></ReservationCard>
            <ReservationDetail
                requirement={reservation.requirement}
                additionalPrice={reservation.additionalPrice}
                ></ReservationDetail>
        </div>
    ));

    return (
        <div className="m-5">
            <h2>다가오는 예약</h2>
            <div className="row">
                {cards}
            </div>
        </div>
    );
};

export default PreviousReservations;