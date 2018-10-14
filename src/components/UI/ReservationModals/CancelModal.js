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

class CancelModal extends Component {
  state = {
    content: null
  };
  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  cancelReasonSubmit = async () => {
    if (!this.state.cancelReason) return alert('채워지지 않은 정보가 있습니다');
    // TODO : cancelReason POST하는거 추가, 취소한 사람 정보도 넣어야함
    // await axios.patch(
    //   `http://52.79.227.227:3030/users/${
    //     this.props.userData._id
    //   }/reservations/${this.state.reservation._id}`,
    //   {
    //     isCanceled: true,
    //     cancelReason,
    //   }
    // );

    await alert('성공적으로 취소되었습니다');
    await this.props.toggle();
    await this.props.reloadData();
  };
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>예약 취소</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <div className="col-3">사유</div>
            <div className="col-9">
              <input
                type="text"
                name="cancelReason"
                id="cancelReason"
                onChange={this.inputChangeHandler}
              />
            </div>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.cancelReasonSubmit}>
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

export default connect(mapStateToProps)(CancelModal);
