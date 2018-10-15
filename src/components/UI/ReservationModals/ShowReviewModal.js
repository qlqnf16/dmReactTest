import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Moment from 'react-moment';

const ShowReviewModal = props => {
  if (props.reservation) {
    console.log(props.reservation._review);
    return (
      <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>내 리뷰</ModalHeader>
        <ModalBody>
          <h2>리뷰 보기</h2>
          <p>
            막내 :{' '}
            {props.reservation._designer && props.reservation._designer.name}
          </p>
          <p>
            <Moment format="YYYY/MM/DD">{props.reservation.createdAt}</Moment>
          </p>
          <p>{props.reservation._review && props.reservation._review.score}</p>
          <p>
            {props.reservation._review && props.reservation._review.content}
          </p>
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
