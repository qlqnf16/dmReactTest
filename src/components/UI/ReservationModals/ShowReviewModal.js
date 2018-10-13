import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ShowReviewModal = props => {
  if (props.reservation) {
    return (
      <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>내 리뷰</ModalHeader>
        <ModalBody>
          <p>
            {props.reservation._review && props.reservation._review.content}
          </p>
          <p>{props.reservation._review && props.reservation._review.score}</p>
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

export default ShowReviewModal;
