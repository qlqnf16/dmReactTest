import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const TextInfo = props => (
  <div className="mt-5">
    <div
      onClick={props.totalSubmitHandler}
      className="btn btn-success text-right"
    >
      저장
    </div>
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
          <Input
            name="cutTime"
            id="time"
            // onChange={this.props.changeInput}
            type="select"
          >
            <option value="60">1시간</option>
            <option value="90">1시간 30분</option>
            <option value="120">2시간</option>
            <option value="150">2시간 30분</option>
          </Input>
        </div>
        <div className="col-md-4">
          <Label for="perm">펌</Label>
          <Input
            type="select"
            name="permTime"
            id="time"
            // onChange={this.props.changeInput}
          >
            <option value="60">1시간</option>
            <option value="90">1시간 30분</option>
            <option value="120">2시간</option>
            <option value="150">2시간 30분</option>
          </Input>
        </div>
        <div className="col-md-4">
          <Label for="dye">염색</Label>
          <Input
            type="select"
            name="dyeTime"
            id="time"
            // onChange={this.props.changeInput}
          >
            <option value="60">1시간</option>
            <option value="90">1시간 30분</option>
            <option value="120">2시간</option>
            <option value="150">2시간 30분</option>
          </Input>
        </div>
      </div>
    </FormGroup>
  </div>
);

export default TextInfo;
