import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup
} from 'reactstrap';

class CancelReasonModal extends Component {
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
      _reservation: this.props.reservationId
    };

    if (Object.values(reviewData).includes(null))
      return alert('채워지지 않은 정보가 있습니다');

    // review 생성
    const res = await axios.post(
      `http://52.79.227.227:3030/recruits/${this.props.userData._id}/reviews`,
      reviewData
    );
    // reservation에 _review 넣기
    await axios.patch(
      `http://52.79.227.227:3030/users/${this.props.userData._id}/reservation/${
        this.props.reservationId
      }`,
      { _review: res.data._id }
    );

    await alert('성공적으로 등록되었습니다');
  };
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>리뷰 등록</ModalHeader>
        <ModalBody>
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
          <FormGroup row>
            <div className="col-3">평점</div>
            <div className="col-9">
              <input
                type="range"
                name="count"
                id="count"
                min="0"
                max="5"
                step="0.5"
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
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(CancelReasonModal);
