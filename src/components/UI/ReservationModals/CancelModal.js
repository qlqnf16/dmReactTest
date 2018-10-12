import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CancelModal = props => (
  <Modal isOpen={props.isOpen} toggle={props.toggle}>
    <ModalHeader toggle={props.toggle}>취소 사유</ModalHeader>
    <ModalBody>
      <p>사유</p>
      <p>적자</p>
    </ModalBody>
    <ModalFooter>
      <Button
        onClick={props.cancelReservationHandler}
        className="btn btn-light"
      >
        제출
      </Button>
      <Button color="primary" onClick={props.toggle}>
        취소
      </Button>
    </ModalFooter>
  </Modal>
);

export default CancelModal;
