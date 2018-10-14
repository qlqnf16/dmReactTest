import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Moment from 'react-moment';

const CancelReasonModal = props => {
  if (props.reservation) {
    console.log(props.reservation);
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
    return (
      <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>취소 사유</ModalHeader>
        <ModalBody>
          <div>
            <h2>취소할 서비스 정보</h2>
            <p>
              막내 :{' '}
              {props.reservation._designer && props.reservation._designer.name}
            </p>
            <p>
              날짜/시간 :{' '}
              <Moment format="YYYY/MM/DD">{props.reservation.date}</Moment>{' '}
              {since} ~ {until}
            </p>
            <p>서비스 : {services}</p>
            <p>
              취소자 : {props.reservation.cancelByUser ? '고객' : '디자이너'}
            </p>
          </div>
          <h2>서비스 취소 사유</h2>
          <p>{props.reservation.cancelReason}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>
            확인
          </Button>
        </ModalFooter>
      </Modal>
    );
  } else {
    return <div />;
  }
};

export default CancelReasonModal;
