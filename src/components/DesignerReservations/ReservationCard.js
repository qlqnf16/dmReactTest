import React from "react";
import Moment from "react-moment";

const ReservationCard = props => {
  console.log(props);
  let since = "";
  let until = "";
  let services = "";
  if (props.reservation) {
    since = `${parseInt(props.reservation.time.since / 60, 10)}:${
      props.reservation.time.since % 60 === 0 ? "00" : "30"
    }`;
    until = `${parseInt(props.reservation.time.until / 60, 10)}:${
      props.reservation.time.until % 60 === 0 ? "00" : "30"
    }`;
    Object.keys(props.reservation.services).forEach(service => {
      switch (service) {
        case "cut":
          services += "/ 컷트 ";
          break;
        case "perm":
          services += "/ 펌 ";
          break;
        case "dye":
          services += "/ 염색 ";
          break;
        default:
          break;
      }
    });
    services = services.substring(1);
  }

  let button = null;
  let type = null;
  if (props.reservation.isCanceled) {
    button = (
      <button
        className="col-md-6 btn btn-danger"
        onClick={() => props.cancelReasonModalToggle(props.reservation)}
      >
        취소 사유 보기
      </button>
    );
    type = "취소";
  } else if (props.type === "soon") {
    button = (
      <button
        className="col-md-6 btn btn-light"
        onClick={() => props.cancelModalToggle(props.reservation)}
      >
        예약 취소
      </button>
    );
    type = (
      <div className="rc_type">
        D-
        <Moment unit="days" diff={new Date()}>
          {props.reservation.date}
        </Moment>
      </div>
    );
    let date = new Date(props.reservation.date);
<<<<<<< HEAD
    if (new Date().getDate() === date.getDate()) {
      type = "D-day";
      addButton = (
        <div className="col-md-4">
          <button className="small"> 서비스 완료 </button>
          <button className="small"> 노쇼 신고</button>
        </div>
=======
    if (new Date().getDate() !== date.getDate()) {
      type = 'D-day';
      button = (
        <button
          className="col-md-6 btn btn-light"
          onClick={() => props.completeModalToggle(props.reservation)}
        >
          서비스 완료
        </button>
>>>>>>> bfd391b77973c8a3f2d1a50d34766defe6ec4f49
      );
    }
  } else if (props.type === "finish") {
    if (props.reservation._review) {
      button = (
        <button
          className="col-md-6 btn btn-success"
          onClick={() => props.showReviewModalToggle(props.reservation)}
        >
          리뷰 보기
        </button>
      );
    } else {
      button = <button className="col-md-6 btn btn-light">리뷰 등록 전</button>;
    }
    type = "완료";
  }
  return (
    <div className="col-3">
      <div className="card p-3 m-1">
        <h5 className="small text-right">{type}</h5>
        <h5>이름 : {props.reservation._user.name}</h5>
        {/* <h5>이름 : </h5> */}
        <div className="row">
          <div className="col-md-8">
            <h5 className="small">
              <Moment unix format="YYYY/MM/DD">
                {props.reservation.date / 1000}
              </Moment>{" "}
              {since} ~ {until}
            </h5>
            <h5 className="small">
              장소 : {props.reservation._card && props.reservation._card.shop}
            </h5>
            <h5 className="small">종류 : {services}</h5>
          </div>
        </div>
        <div className="row">
          {button}
          <button className="col-md-6 btn btn-light">더보기</button>
        </div>
        <h5 className="small">
          {props.type === "soon" ? `예약번호 : ${props.reservation._id}` : null}
        </h5>
      </div>
    </div>
  );
};

export default ReservationCard;
