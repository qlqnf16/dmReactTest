import React, { Component } from "react";
import { Link } from "react-router-dom";
import AttentionCard from "../components/ReservationConfirm/AttentionCard";
import step3 from "../assets/images/step3.png";
import check from "../assets/images/check_lg.png";
import Moment from "react-moment";
import firebase from "../config/Firebase";
import "./PageCss.css";

class ReservationConfirm extends Component {
  state = {
    madeRequest: false
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);

    firebase
      .database()
      .ref(`users/${this.props.location.state.recruit._designer._uid}`)
      .on("value", res => {
        this.setState({ designerData: res.val(), madeRequest: true });
      });
  };

  showMessage = (reservationId, designerName) => {
    this.props.history.push({
      pathname: `/chat`,
      search: `?r=${reservationId}&n=${designerName}`
    });
  };
  render() {
    const startTime = this.props.location.state.startTime;
    const time = this.props.location.state.time;
    let startTimeFormat = `${parseInt(startTime / 60, 10)}:${
      startTime % 60 === 0 ? "00" : "30"
    }`;
    let finishTimeFormat = `${parseInt((startTime + time) / 60, 10)}:${
      (startTime + time) % 60 === 0 ? "00" : "30"
    }`;
    if (this.state.madeRequest) {
      let fullAddress;
      this.state.designerData.addresses.forEach(address => {
        if (address.extraAddress === this.props.location.state.cardData.shop) {
          fullAddress = address.fullAddress + " " + address.extraAddress;
        }
      });
      return (
        <div className="text-center mb-4">
          <div className="mb-5 text-center">
            <img alt="alt" style={{ width: "100%" }} src={step3} />
          </div>
          <img
            alt="alt"
            style={{ width: "6.6rem" }}
            className="m-4"
            src={check}
          />
          <div className="rc_h1">예약이 완료되었습니다.</div>
          <div className="rc_h2">
            예약번호: {this.props.match.params.reservation_id}
          </div>
          <div className="rc_h3" style={{ marginBottom: "0px" }}>
            {this.props.location.state.recruit._designer.name} 예디님과의 예약이
            완료되었습니다! ^.^
          </div>
          <div
            className="rc_h3"
            style={{ marginTop: "20px", marginBottom: "0px" }}
          >
            일시 :{" "}
            <Moment unix format="YYYY/MM/DD">
              {this.props.location.state.cardData.date / 1000}
            </Moment>{" "}
            <span className="ml-2">
              {startTimeFormat} ~ {finishTimeFormat}
            </span>
          </div>
          <div className="rc_h3" style={{ marginTop: "20px" }}>
            장소 : {fullAddress}
          </div>
          <AttentionCard
            cardData={this.props.location.state.cardData}
            service={this.props.location.state.service}
          />
          <div className="d-block">
            <Link
              to="/reservations"
              className="rcf_button"
              style={{ marginRight: "23px" }}
            >
              예약확인/취소
            </Link>
            <div
              onClick={() =>
                this.showMessage(
                  this.props.match.params.reservation_id,
                  this.props.location.state.recruit._designer.name
                )
              }
              className="rcf_button d-inline"
            >
              메세지
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default ReservationConfirm;
