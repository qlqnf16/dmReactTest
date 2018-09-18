import React from "react";

import ReservationCard from "../ReservationCard/RervationCard";

const PreviousReservations = (props) => {
    const cards = props.reservations.map(reservation => (
        <div className="col-4">
            <ReservationCard
                designerName={reservation.designer.name}
                title={reservation.title}
                date={reservation.date}
                location={`${reservation.designer.shop} / ${reservation.designer.location}`}
                type={"컷/염색"}
                ></ReservationCard>
        </div>
    ));

    return (
        <div className="m-5">
            <h2>지난 예약</h2>
            <div className="row">
                {cards}
            </div>
        </div>
    );
};

export default PreviousReservations;