import React from 'react'
import { FormGroup, Label, Col, Input } from 'reactstrap'

const TextInfo = () => (
    <div className='row mt-5'>
        <Col sm={6}>
            <FormGroup row>
                <Label for="title" sm={2}>제목</Label>
                <Col sm={10}>
                    <Input type="text" name="title" id="title" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="detail" sm={2}>요청사항</Label>
                <Col sm={10}>
                    <Input type="textarea" name="detail" id="detail" />
                </Col>
            </FormGroup>
        </Col>
        <Col sm={6}>
            <FormGroup row>
                <Label for="addition" sm={2}>추가금액</Label>
                <Col sm={10}>
                    <Input type="textarea" name="addition" id="addition" />
                </Col>
            </FormGroup>
        </Col>
    </div>
)

export default TextInfo