import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
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
      <Modal centered isOpen={props.isOpen} toggle={props.toggle}>
        <ModalBody className="m-4">
          <p className={props.isD ? 'm_title m_designer' : 'm_title'}>
            취소된 서비스 정보
          </p>
          <div className="m_content mb-5">
            <p>
              <span style={{ fontWeight: 'bold' }}>
                {props.isD ? '고객' : '막내'} :
              </span>{' '}
              {props.isD
                ? props.reservation._user && props.reservation._user.name
                : props.reservation._designer &&
                  props.reservation._designer.name}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>날짜/시간 :</span>{' '}
              <Moment format="YYYY/MM/DD">{props.reservation.date}</Moment>{' '}
              {since} ~ {until}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>서비스 :</span> {services}
            </p>
          </div>
          <p className={props.isD ? 'm_title m_designer' : 'm_title'}>
            서비스 취소 사유
          </p>
          <div className="m_input p-3" name="cancelReason" id="cancelReason">
            {props.reservation.cancelReason}
          </div>
          <div className="text-center">
            <div
              className={
                props.isD
                  ? 'm_button btn m_button_blue'
                  : 'm_button btn m_button_red'
              }
              onClick={props.toggle}
            >
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

export default CancelReasonModal;
