import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

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
  </div>
);

export default TextInfo;
