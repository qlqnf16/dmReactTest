import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'

class MyModal extends Component {
    render() {
        let switchModal
        switchModal = this.props.modalType === 'Login' ? 'Sign up' : 'Login'
        
        return (
            <div>
                <Modal isOpen={this.props.showLogin} fade={false} toggle={this.props.off} className={this.props.className}>
                    <ModalHeader>
                        <p className="h2">{this.props.modalTitle}</p>
                        <p className="small mb-0">{this.props.modalSubtitle}</p>
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <p className="h2">구글 버튼</p>
                        </div>
                        <div>
                            <p className="h2">페이스북 버튼</p>
                        </div>
                        <div>
                            <p className="h2">카카오톡 버튼</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <p>{this.props.modalText}</p>
                        {/* <Link to='/infoDetail'><Button color="primary" onClick={this.props.off}>{this.props.modalType}</Button></Link> */}
                        <p className="btn btn-light" onClick={this.props.toggle}>{switchModal}</p>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default MyModal