import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Moment from 'react-moment';
import './Modal.css';

import { Modal, ModalBody } from 'reactstrap';

class CancelModal extends Component {
  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  cancelReasonSubmit = async () => {
    if (!this.state.cancelReason || this.state.cancelReason === '')
      return alert('채워지지 않은 정보가 있습니다');
    // TODO : cancelReason POST하는거 추가, 취소한 사람 정보도 넣어야함
    await axios.patch(
      `http://52.79.227.227:3030/users/${
        this.props.userData._id
      }/reservations/${this.props.reservation._id}`,
      {
        isCanceled: true,
        cancelReason: this.state.cancelReason,
        cancelByUser: !this.props.isD
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
        <Modal centered isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalBody className="m-4">
            <p className={this.props.isD ? 'm_title m_designer' : 'm_title'}>
              취소할 서비스 정보
            </p>
            <div className="m_content mb-5">
              <p>
                <span style={{ fontWeight: 'bold' }}>
                  {this.props.isD ? '고객' : '막내'} :
                </span>{' '}
                {this.props.isD
                  ? this.props.reservation._user &&
                    this.props.reservation._user.name
                  : this.props.reservation._designer &&
                    this.props.reservation._designer.name}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>날짜/시간 :</span>{' '}
                <Moment format="YYYY/MM/DD">
                  {this.props.reservation.date}
                </Moment>{' '}
                {since} ~ {until}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>서비스 :</span> {services}
              </p>
            </div>
            <p className={this.props.isD ? 'm_title m_designer' : 'm_title'}>
              서비스 취소 사유
            </p>
            <textarea
              className="m_input"
              name="cancelReason"
              id="cancelReason"
              placeholder="서비스를 취소하는 사유를 적어주세요"
              onChange={this.inputChangeHandler}
            />
            <div className="text-center">
              <div
                className={
                  this.props.isD
                    ? 'm_button m_button_blue btn'
                    : 'm_button m_button_red btn'
                }
                onClick={this.cancelReasonSubmit}
              >
                예약취소
              </div>
              <div className="m_button btn" onClick={this.props.toggle}>
                취소
              </div>
            </div>
          </ModalBody>
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
