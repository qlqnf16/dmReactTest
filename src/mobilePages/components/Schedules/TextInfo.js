import React from 'react';

const styles = {
  titleStyle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#4c91ba',
    textAlign: 'left',
    margin: '33.5px 0 20px 0',
    paddingBottom: 6.9,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
  },
  labelStyle: {
    fontSize: '13px',
    fontFamily: 'Nanum Square',
    fontWeight: 'bold',
    color: '#1f3354'
  },
  selectStyle: {
    display: 'block',
    fontSize: '1.3rem',
    color: '#1f3354',
    padding: '0.7rem',
    paddingTop: '0.5rem'
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
  },
  inputTextStyle: {
    fontSize: '1.3rem',
    color: '#1f3354',
    padding: '0.7rem',
    borderRadius: '5px',
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    width: '100%',
    marginBottom: '1rem'
  }
};

const TextInfo = props => (
  <div>
    <div>
      <label htmlFor="title" style={styles.labelStyle}>
        제목
      </label>
      <input
        style={styles.inputTextStyle}
        value={props.state.title}
        onChange={props.changeInput}
        type="text"
        name="title"
        id="title"
      />
    </div>
    <div>
      <label htmlFor="requirement" style={styles.labelStyle}>
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
      </label>
      <input
        style={styles.inputTextStyle}
        value={props.state.requirement}
        onChange={props.changeInput}
        type="textarea"
        name="requirement"
        id="requirement"
        height="20"
      />
    </div>
    <div>
      <p style={styles.titleStyle}>
        예상 시술 소요 시간
        <span
          style={{
            color: '#1f3354',
            fontSize: '1rem',
            fontWeight: 'normal',
            marginLeft: '8px'
          }}
        >
          최대한 정확하게 입력해주세요 :)
        </span>
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <label htmlFor="cut" style={styles.labelStyle}>
            커트
          </label>
          <select
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
          </select>
        </div>
        <div>
          <label htmlFor="perm" style={styles.labelStyle}>
            펌
          </label>
          <select
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
          </select>
        </div>
        <div>
          <label htmlFor="dye" style={styles.labelStyle}>
            염색
          </label>
          <select
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
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default TextInfo;
