import React, { Component } from 'react'
import UserNav from '../../components/Navigation/UserNav/UserNav';
import { Form, FormGroup, Label, Input, Button, Container, Col } from 'reactstrap'

class UserInfo extends Component {
    
    render(){
        return(
            <div className="container">
                <div className="row mt-5">
                    <UserNav />
                    <Container className="col-10">
                        <h1>This is UserInfo</h1>
                        <Form className="m-5">
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>성명</Label>
                                <Col sm={10}>
                                    <Input type="text" name="name" id="name" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>이메일 주소</Label>
                                <Col sm={10}>
                                    <Input type="email" name="email" id="email" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>전화번호</Label>
                                <Col sm={10}>
                                    <Input type="text" name="phone" id="phoneNumber" />
                                </Col>
                            </FormGroup>
                            <div className='text-center'>
                                <Button className='m-5'>Submit</Button>
                            </div>
                        </Form>
                    </Container>
                </div>
            </div> 
        )
    }
}

export default UserInfo