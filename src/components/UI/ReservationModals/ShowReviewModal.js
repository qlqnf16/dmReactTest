import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Moment from 'react-moment';

const ShowReviewModal = props => {
  if (props.reservation) {
    let since = '';
    let until = '';
    let services = '';
    if (props.reservation.time) {
      since = `${parseInt(props.reservation.time.since / 60, 10)}:${
        props.reservation.time.since % 60 === 0 ? '00' : '30'
      }`;
      until = `${parseInt(props.reservation.time.until / 60, 10)}:${
        props.reservation.time.until % 60 === 0 ? '00' : '30'
      }`;
      Object.keys(props.reservation.services).forEach(service => {
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
    console.log(props.reservation._review);
    return (
      <Modal centered isOpen={props.isOpen} toggle={props.toggle}>
        <ModalBody className="m-4">
          <p className="m_title">내가 쓴 리뷰</p>
          <div className="m_content mb-5">
            <p>
              <span style={{ fontWeight: 'bold' }}>막내 :</span>{' '}
              {props.reservation._designer && props.reservation._designer.name}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>날짜/시간 :</span>{' '}
              <Moment format="YYYY/MM/DD">{props.reservation.date}</Moment>{' '}
              {since} ~ {until}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>서비스 :</span> {services}
            </p>
            <Moment format="YYYY/MM/DD">
              {props.reservation._review && props.reservation._review.createdAt}
            </Moment>
            <p>
              {props.reservation._review && props.reservation._review.score}
            </p>
            <p className="m_input p-3">
              {props.reservation._review && props.reservation._review.content}
            </p>
          </div>
          <div className="text-center">
            <div className="m_button m_button_red btn" onClick={props.toggle}>
              확인
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  } else {
    return <div />;
  }
};

export default ShowReviewModal;
