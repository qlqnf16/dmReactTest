import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Moment from 'react-moment';

import { Modal, ModalBody } from 'reactstrap';

class CompleteModal extends Component {
  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  completeSubmit = async () => {
    await axios.patch(
      `http://52.79.227.227:3030/users/${
        this.props.userData._id
      }/reservations/${this.props.reservation._id}`,
      {
        isDone: true
      }
    );

    await alert('성공적으로 완료되었습니다');
    await this.props.toggle();
    await this.props.reloadData();
  };

  noShowSubmit = async () => {
    await axios.patch(
      `http://52.79.227.227:3030/users/${
        this.props.userData._id
      }/reservations/${this.props.reservation._id}`,
      {
        isCanceled: true,
        cancelReason: '노쇼dreamary',
        cancelByUser: true
      }
    );

    await alert('신고가 완료되었습니다');
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
        <Modal
          style={{ maxWidth: '20%' }}
          centered
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
        >
          <ModalBody className="m-4">
            <p className="m_title">
              {this.props.reservation._user &&
                this.props.reservation._user.name}
            </p>
            <div className="m_content mb-5">
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

            <div
              onClick={this.completeSubmit}
              className="m_button m_button_finish m_button_green"
            >
              서비스완료
            </div>
            <div
              onClick={this.noShowSubmit}
              className="m_button m_button_report "
            >
              노쇼 신고
            </div>
          </ModalBody>
          {/* <ModalFooter>
            <Button color="primary" onClick={this.cancelReasonSubmit}>
              작성
            </Button>
            <Button color="warning" onClick={this.props.toggle}>
              취소
            </Button>
          </ModalFooter> */}
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

export default connect(mapStateToProps)(CompleteModal);
