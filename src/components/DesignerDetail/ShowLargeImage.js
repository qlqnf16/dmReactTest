import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

const ShowLargeImage = props => {
  if (props.src) {
    return (
      <Modal fade={false} centered isOpen={props.isOpen} toggle={props.toggle}>
        <ModalBody className="m-0 p-0">
          <img
            src={props.src}
            alt="alt"
            style={{ width: '100%', height: '100%' }}
          />
        </ModalBody>
      </Modal>
    );
  } else {
    return <div />;
  }
};

export default ShowLargeImage;
