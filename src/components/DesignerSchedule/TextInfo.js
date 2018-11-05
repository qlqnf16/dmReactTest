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

const TextInfo = props => {
  const showMyCard = props.id
    ? () => this.props.history.push(`/designerdetail/${props.id}`)
    : () => alert('스케줄 등록을 먼저 진행해주세요');
  return (
    <div className="mt-5">
      <div
        onClick={props.totalSubmitHandler}
        className="btn btn-success text-right d-inline"
        style={{ ...styles.saveButtonStyle, left: '160%' }}
      >
        <div style={{ textAlign: 'center' }}>저장</div>
      </div>
      <div
        className="btn btn-success text-right d-inline"
        style={styles.saveButtonStyle}
        onClick={showMyCard}
      >
        <div style={{ textAlign: 'center' }}>내 카드 확인</div>
      </div>
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
          요청사항{' '}
          <span
            style={{
              color: '#1f3354',
              fontSize: '1rem',
              fontWeight: 'normal',
              marginLeft: '8px'
            }}
          >
            모델들에게 필요한 부분을 자세하게 설명해주세요
          </span>
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
        <p style={styles.labelStyle}>
          예상 시술 소요 시간
          <span
            style={{
              color: '#1f3354',
              fontSize: '1rem',
              fontWeight: 'normal',
              marginLeft: '8px'
            }}
          >
            예약에 관련된 부분인 만큼 최대한 정확하게 입력해주세요 :)
          </span>
        </p>
        <div className="row">
          <div className="col-4">
            <Label for="cut" style={styles.labelStyle}>
              커트
            </Label>
            <Input
              name="cut"
              id="time"
              onChange={e => props.changeInput(e)}
              type="select"
              value={props.state.requireTime && props.state.requireTime.cut}
              style={styles.selectStyle}
            >
              <option value="null">--커트--</option>
              <option value="30">30분</option>
              <option value="60">1시간</option>
              <option value="90">1시간 30분</option>
              <option value="120">2시간</option>
              <option value="150">2시간 30분</option>
              <option value="180">3시간</option>
              <option value="210">3시간 30분</option>
              <option value="240">4시간</option>
              <option value="270">4시간 30분</option>
              <option value="300">5시간</option>
              <option value="330">5시간 30분</option>
              <option value="360">6시간</option>
              <option value="390">6시간 30분</option>
              <option value="420">7시간</option>
              <option value="450">7시간 30분</option>
              <option value="480">8시간</option>
            </Input>
          </div>
          <div className="col-4">
            <Label for="perm" style={styles.labelStyle}>
              펌
            </Label>
            <Input
              type="select"
              name="perm"
              id="time"
              onChange={e => props.changeInput(e)}
              value={props.state.requireTime && props.state.requireTime.perm}
              style={styles.selectStyle}
            >
              <option value="null">--펌--</option>
              <option value="30">30분</option>
              <option value="60">1시간</option>
              <option value="90">1시간 30분</option>
              <option value="120">2시간</option>
              <option value="150">2시간 30분</option>
              <option value="180">3시간</option>
              <option value="210">3시간 30분</option>
              <option value="240">4시간</option>
              <option value="270">4시간 30분</option>
              <option value="300">5시간</option>
              <option value="330">5시간 30분</option>
              <option value="360">6시간</option>
              <option value="390">6시간 30분</option>
              <option value="420">7시간</option>
              <option value="450">7시간 30분</option>
              <option value="480">8시간</option>
            </Input>
          </div>
          <div className="col-4">
            <Label for="dye" style={styles.labelStyle}>
              염색
            </Label>
            <Input
              type="select"
              name="dye"
              id="time"
              onChange={e => props.changeInput(e)}
              value={props.state.requireTime && props.state.requireTime.dye}
              style={styles.selectStyle}
            >
              <option value="null">--염색--</option>
              <option value="30">30분</option>
              <option value="60">1시간</option>
              <option value="90">1시간 30분</option>
              <option value="120">2시간</option>
              <option value="150">2시간 30분</option>
              <option value="180">3시간</option>
              <option value="210">3시간 30분</option>
              <option value="240">4시간</option>
              <option value="270">4시간 30분</option>
              <option value="300">5시간</option>
              <option value="330">5시간 30분</option>
              <option value="360">6시간</option>
              <option value="390">6시간 30분</option>
              <option value="420">7시간</option>
              <option value="450">7시간 30분</option>
              <option value="480">8시간</option>
            </Input>
          </div>
        </div>
      </FormGroup>
    </div>
  );
};
export default TextInfo;
