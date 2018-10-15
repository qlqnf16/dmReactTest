import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Moment from "react-moment";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup
} from "reactstrap";

class ReviewModal extends Component {
  state = {
    content: null,
    score: null
  };
  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  reviewSubmit = async () => {
    const reviewData = {
      content: this.state.content,
      score: this.state.score,
      _user: this.props.userData._id,
      _reservation: this.props.reservation._id
    };

    if (Object.values(reviewData).includes(null))
      return alert("채워지지 않은 정보가 있습니다");

    // review 생성
    const res = await axios.post(
      `http://52.79.227.227:3030/recruits/${
        this.props.reservation._designer._recruit._id
      }/reviews`,
      reviewData
    );

    await alert("성공적으로 등록되었습니다");
    await this.props.toggle();
    await this.props.reloadData();
  };
  render() {
    if (this.props.reservation) {
      let since = "";
      let until = "";
      let services = "";
      if (this.props.reservation.time) {
        since = `${parseInt(this.props.reservation.time.since / 60, 10)}:${
          this.props.reservation.time.since % 60 === 0 ? "00" : "30"
        }`;
        until = `${parseInt(this.props.reservation.time.until / 60, 10)}:${
          this.props.reservation.time.until % 60 === 0 ? "00" : "30"
        }`;
        Object.keys(this.props.reservation.services).forEach(service => {
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
      return (
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>리뷰 등록</ModalHeader>
          <ModalBody>
            <div>
              <h2>서비스 정보</h2>
              <p>
                막내 :{" "}
                {this.props.reservation._designer &&
                  this.props.reservation._designer.name}
              </p>
              <p>
                날짜/시간 :{" "}
                <Moment format="YYYY/MM/DD">
                  {this.props.reservation.date}
                </Moment>{" "}
                {since} ~ {until}
              </p>
              <p>서비스 : {services}</p>
            </div>
            <FormGroup row>
              <div className="col-3">평점</div>
              <div className="col-9">
                <input
                  type="range"
                  name="score"
                  id="score"
                  min="0"
                  max="5"
                  step="0.5"
                  onChange={this.inputChangeHandler}
                />
              </div>
            </FormGroup>
            <FormGroup row>
              <div className="col-3">내용</div>
              <div className="col-9">
                <input
                  type="text"
                  name="content"
                  id="content"
                  onChange={this.inputChangeHandler}
                />
              </div>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.reviewSubmit}>
              작성
            </Button>
          </ModalFooter>
        </Modal>
      );
    } else {
      return <div />;
    }
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(ReviewModal);
