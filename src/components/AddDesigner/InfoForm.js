import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Container, Col } from 'reactstrap'

class InfoForm extends Component {
    render() {
        return (
            <Container>
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
                <FormGroup row>
                    <Label for="exampleSelect" sm={2}>지역/샵주소</Label>
                    <Col sm={10}>
                        <Input type="select" name="address" id="address" className="d-inline col-3">
                            <option>무슨동</option>
                            <option>무슨동</option>
                            <option>무슨동</option>
                            <option>무슨동</option>
                            <option>무슨동</option>
                        </Input>
                        <Input type="text" name="phone" id="phoneNumber" className="d-inline col-9"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleEmail" sm={2}>디자이너까지 남은 기간</Label>
                    <Col sm={10}>
                        <Input type="number" name="dYear" id="dYear" className="d-inline col-2"/> 년 
                        <Input type="number" name="dMonth" id="dMonth" className="d-inline col-2"/> 개월
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleEmail" sm={2}>미용경력</Label>
                    <Col sm={10}>
                        <Input type="number" name="careerYear" id="careerYear" className="d-inline col-2"/> 년
                        <Input type="number" name="careerMonth" id="careerMonth" className="d-inline col-2"/> 개월
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleEmail" sm={2}>이력</Label>
                    <Col sm={10}>
                        <Input type="textarea" name="careerDetail" id="careerDetail" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleFile" sm={2}>면허증/자격증</Label>
                    <Col sm={10}>
                        <Input type="file" name="cert1" id="cert1" />
                        <Input type="file" name="cert2" id="cert2" />
                    </Col>
                </FormGroup>
                <div className='text-center'>
                    <Button className='m-5'>Submit</Button>
                </div>
            </Form>
            </Container>
        )
    }
}

export default InfoForm