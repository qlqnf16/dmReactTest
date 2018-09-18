import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'

class MyModal extends Component {
    render() {
        let switchModal
        switchModal = this.props.modalTitle === 'Login' ? 'Sign up' : 'Login'
        
        return (
            <div>
                <Modal isOpen={this.props.showLogin} fade={false} toggle={this.props.off} className={this.props.className}>
                    <ModalHeader toggle={this.props.off}>{this.props.modalTitle}</ModalHeader>
                    <ModalBody>
                        {this.props.modalText}
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Link to='/infoDetail'><Button color="primary" onClick={this.props.off}>{this.props.modalTitle}</Button></Link>
                        <Button color="secondary" onClick={this.props.toggle}>{switchModal}</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default MyModal