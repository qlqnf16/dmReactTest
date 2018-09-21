import React, { Component, Fragment } from 'react'
import { FormGroup, Label, Input, Col } from 'reactstrap';
import ImgPreview from './ImgPreview'

class InfoForm extends Component {
    render() {        
        return (
            <Fragment>
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
                        <ImgPreview url={this.props.certImg1}/>
                        <ImgPreview url={this.props.certImg2}/>
                        <input type="file" name='cert1' onChange={this.props.imgChange} />
                        <input type="file" name='cert2' onChange={this.props.imgChange} />
                    </Col>
                </FormGroup>
            </Fragment>
        )
    }
}

export default InfoForm