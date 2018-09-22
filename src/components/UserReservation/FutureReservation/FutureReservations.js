import React from "react";

import ReservationCard from "../ReservationCard/RervationCard";
import ReservationDetail from "../ReservationDetail/ReservationDetail";

const PreviousReservations = (props) => {
    const cards = props.reservations.map(reservation => (
        <div className="col-10 d-flex justify-content-around" key={reservation._id}>
            <ReservationCard
                designerName={reservation._designer.name}
                title={"타이틀없"}
                date={reservation.time}
                location={`${reservation._designer.locations[0].region} / ${reservation._designer.locations[0].shop}`}
                type={"컷/염색"}
            />
            <ReservationDetail
                requirement={reservation.requirement}
                additionalPrice={reservation.additionalPrice}
            />
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