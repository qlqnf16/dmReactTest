import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

const styles = {
  labelStyle: {
    fontSize: '13px',
    fontFamily: 'Nanum Square',
    fontWeight: 'bold',
    color: '#1f3354'
  },
  selectStyle: {
    display: 'inline-block',
    width: '70%',
    marginLeft: '5%'
  },
  saveButtonStyle: {
    position: 'absolute',
    top: '-5%',
    left: '180%',
    width: '89.3px',
    height: '21px',
    borderRadius: '5px',
    boxShadow: '2px 2px 5px 0 rgba(0, 0, 0, 0.16)',
    border: 'solid 1px #4c91ba',
    backgroundColor: '#ffffff',
    fontSize: '11px',
    fontFamily: 'Nanum Square',
    fontWeight: 'bold',
    color: '#4c91ba'
  }
};

const TextInfo = props => (
  <div className="mt-5">
    <div
      onClick={props.totalSubmitHandler}
      className="btn btn-success text-right d-inline"
      style={{ ...styles.saveButtonStyle, left: '160%' }}
    >
      <div style={{ textAlign: 'center' }}>저장</div>
    </div>
    <Link
      to={`/designerdetail/${props.id}`}
      className="btn btn-success text-right d-inline"
      style={styles.saveButtonStyle}
    >
      <div style={{ textAlign: 'center' }}>내 카드 확인</div>
    </Link>
    <FormGroup>
      <Label for="title" style={styles.labelStyle}>
        제목
      </Label>
      <Input
        value={props.state.title}
        onChange={props.changeInput}
        type="text"
        name="title"
        id="title"
      />
    </FormGroup>
    <FormGroup>
      <Label for="requirement" style={styles.labelStyle}>
        요청사항
      </Label>
      <Input
        value={props.state.requirement}
        onChange={props.changeInput}
        type="textarea"
        name="requirement"
        id="requirement"
        height="20"
      />
    </FormGroup>
    <FormGroup>
      <p style={styles.labelStyle}>예상 시술 소요 시간</p>
      <div className="row">
        <div className="col-md-4">
          <Label for="cut" style={styles.labelStyle}>
            컷트
          </Label>
          <Input
            name="cutTime"
            id="time"
            onChange={props.changeInput}
            type="select"
            value={props.state.requireTime && props.state.requireTime.cut}
            style={styles.selectStyle}
          >
            <option value>--컷트--</option>
            <option value="60">1시간</option>
            <option value="90">1시간 30분</option>
            <option value="120">2시간</option>
            <option value="150">2시간 30분</option>
          </Input>
        </div>
        <div className="col-md-4">
          <Label for="perm" style={styles.labelStyle}>
            펌
          </Label>
          <Input
            type="select"
            name="permTime"
            id="time"
            onChange={props.changeInput}
            value={props.state.requireTime && props.state.requireTime.perm}
            style={styles.selectStyle}
          >
            <option value>--펌--</option>
            <option value="60">1시간</option>
            <option value="90">1시간 30분</option>
            <option value="120">2시간</option>
            <option value="150">2시간 30분</option>
          </Input>
        </div>
        <div className="col-md-4">
          <Label for="dye" style={styles.labelStyle}>
            염색
          </Label>
          <Input
            type="select"
            name="dyeTime"
            id="time"
            onChange={props.changeInput}
            value={props.state.requireTime && props.state.requireTime.dye}
            style={styles.selectStyle}
          >
            <option value>--염색--</option>
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
