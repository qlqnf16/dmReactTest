import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CancelReasonModal = props => (
  <Modal isOpen={props.isOpen} toggle={props.toggle}>
    <ModalHeader toggle={props.toggle}>취소 사유</ModalHeader>
    <ModalBody>
      <p>취소자 : 고객</p>
      <p>이유 : 디자이너 싸갈스가 바갈스라 빡쳐서 취소</p>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={props.toggle}>
        확인
      </Button>
    </ModalFooter>
  </Modal>
);

export default CancelReasonModal;
