import React from 'react';
import { FormGroup, Label, Col, Input } from 'reactstrap';

const TextInfo = () => (
  <div className="mt-5">
    <FormGroup>
      <Label for="title">제목</Label>
      <Input type="text" name="title" id="title" />
    </FormGroup>
    <FormGroup>
      <Label for="detail">요청사항</Label>
      <Input type="textarea" name="detail" id="detail" />
    </FormGroup>
    <FormGroup>
      <p>예상 시술 소요 시간</p>
      <div className="row">
        <div className="col-md-4">
          <Label for="cut">컷트</Label>
          <Input type="select">
            <option>1시간</option>
            <option>1시간 30분</option>
          </Input>
        </div>
        <div className="col-md-4">
          <Label for="cut">펌</Label>
          <Input type="select">
            <option>1시간</option>
            <option>1시간 30분</option>
          </Input>
        </div>
        <div className="col-md-4">
          <Label for="cut">염색</Label>
          <Input type="select">
            <option>1시간</option>
            <option>1시간 30분</option>
          </Input>
        </div>
      </div>
    </FormGroup>
  </div>
);

export default TextInfo;
