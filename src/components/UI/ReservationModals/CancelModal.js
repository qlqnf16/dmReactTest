import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Moment from 'react-moment';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup
} from 'reactstrap';

class CancelModal extends Component {
  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  cancelReasonSubmit = async () => {
    if (!this.state.cancelReason) return alert('채워지지 않은 정보가 있습니다');
    // TODO : cancelReason POST하는거 추가, 취소한 사람 정보도 넣어야함
    await axios.patch(
      `http://52.79.227.227:3030/users/${
        this.props.userData._id
      }/reservations/${this.props.reservation._id}`,
      {
        isCanceled: true,
        cancelReason: this.state.cancelReason,
        cancelByUser: true
      }
    );

    await alert('성공적으로 취소되었습니다');
    await this.props.toggle();
    await this.props.reloadData();
  };

  render() {
    if (this.props.reservation) {
      let since = '';
      let until = '';
      let services = '';
      if (this.props.reservation.time) {
        since = `${parseInt(this.props.reservation.time.since / 60, 10)}:${
          this.props.reservation.time.since % 60 === 0 ? '00' : '30'
        }`;
        until = `${parseInt(this.props.reservation.time.until / 60, 10)}:${
          this.props.reservation.time.until % 60 === 0 ? '00' : '30'
        }`;
        Object.keys(this.props.reservation.services).forEach(service => {
          switch (service) {
            case 'cut':
              services += '/ 컷트 ';
              break;
            case 'perm':
              services += '/ 펌 ';
              break;
            case 'dye':
              services += '/ 염색 ';
              break;
            default:
              break;
          }
        });
        services = services.substring(1);
      }
      return (
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>예약 취소</ModalHeader>
          <ModalBody>
            <div>
              <h2>취소할 서비스 정보</h2>
              <p>
                막내 :{' '}
                {this.props.reservation._designer &&
                  this.props.reservation._designer.name}
              </p>
              <p>
                날짜/시간 :{' '}
                <Moment format="YYYY/MM/DD">
                  {this.props.reservation.date}
                </Moment>{' '}
                {since} ~ {until}
              </p>
              <p>서비스 : {services}</p>
            </div>
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
            <Button color="warning" onClick={this.props.toggle}>
              취소
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

export default connect(mapStateToProps)(CancelModal);
