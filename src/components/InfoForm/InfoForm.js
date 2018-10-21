import React, { Component, Fragment } from 'react';
import { FormGroup } from 'reactstrap';
import ImgPreview from './ImgPreview';
import './InfoForm.css';

class InfoForm extends Component {
  // state = {
  //   year: this.props.state.birthday.year,
  //   month: this.props.state.birthday.month,
  //   day: this.props.state.birthday.day
  // };
  render() {
    const userData = this.props.state;
    console.log(userData);

    // 달력 만들기
    let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let day = [];
    let year = [];
    for (let i = 1; i < 32; i++) {
      day.push(i);
    }
    for (let i = 2018; i > 1920; i--) {
      year.push(i);
    }
    if (['4', '6', '9', '11'].includes(this.props.state.month)) {
      day.pop();
    } else if (this.props.state.month === '2') {
      if (Number(this.props.state.year) % 4 === 0) {
        day.splice(29, 2);
      } else {
        day.splice(28, 3);
      }
    }
    let m = month.map(m => <option value={m}>{m}월</option>);
    let d = day.map(d => <option value={d}>{d}일</option>);
    let y = year.map(y => <option value={y}>{y}년</option>);

    let calendar = (
      <div className="row m-0">
        <select
          className="if_input col-lg-2 col-md-3"
          name="year"
          value={this.props.state.year}
          onChange={this.props.changeInput}
        >
          {y}
        </select>
        <select
          className="if_input col-lg-2 col-md-3"
          name="month"
          value={this.props.state.month}
          onChange={this.props.changeInput}
        >
          {m}
        </select>
        <select
          className="if_input col-lg-2 col-md-3"
          name="day"
          value={this.props.state.day}
          onChange={this.props.changeInput}
        >
          {d}
        </select>
      </div>
    );
    return (
      <Fragment>
        <FormGroup row>
          <div className="col-3 if_head">성명</div>
          <div className="col-9 d-flex justify-content-left">
            <input
              type="text"
              name="name"
              id="name"
              onChange={this.props.changeInput}
              value={userData.name}
              className="if_input"
            />
            <label
              className={
                this.props.checked === 'male' ? 'if_gradio active' : 'if_gradio'
              }
            >
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={this.props.changeInput}
                className="genderRadio"
              />
              남
            </label>
            <label
              className={
                this.props.checked === 'female'
                  ? 'if_gradio active'
                  : 'if_gradio'
              }
            >
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={this.props.changeInput}
                className="genderRadio if_input"
              />
              여
            </label>
          </div>
        </FormGroup>
        <FormGroup row>
          <div className="col-3 if_head">이메일 주소</div>
          <div className="col-9">
            <input
              type="email"
              name="email"
              id="email"
              onChange={this.props.changeInput}
              value={userData.email}
              className="if_input"
            />
          </div>
        </FormGroup>
        <FormGroup row>
          <div className="col-3 if_head">생년월일</div>
          <div className="col-9">
            {calendar}
            {/* <input
              type="date"
              name="birthday"
              id="birthday"
              onChange={this.props.changeInput}
              value={userData.birthday}
            /> */}
            <div className="if_detail" style={{ marginTop: '8.3px' }}>
              이 정보는 통계 목적으로 사용되며 외부에 공개되지 않습니다.
            </div>
          </div>
        </FormGroup>
        <FormGroup row>
          <div className="col-3 if_head">전화번호</div>
          <div className="col-9">
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              onChange={this.props.changeInput}
              value={userData.phoneNumber}
              className="if_input"
            />
          </div>
        </FormGroup>
        <FormGroup row>
          <div className="col-3 if_head">지역/샵주소</div>
          <div className="col-9 d-flex justify-content-left">
            <select
              name="city"
              id="city"
              className="if_input"
              style={{ width: '27%' }}
              onChange={this.props.changeInput}
            >
              <option>-도/시</option>
              <option>서울</option>
              <option>경기</option>
              <option>인천</option>
            </select>
            <select
              name="region"
              id="region"
              className="if_input"
              style={{ width: '27%' }}
              onChange={this.props.changeInput}
            >
              <option>-시/구-</option>
              <option>강남구</option>
              <option>강서구</option>
              <option>성북구</option>
            </select>
            <input
              type="text"
              name="shop"
              id="shop"
              placeholder="샵 상세주소"
              onChange={this.props.changeInput}
              className="if_input"
              style={{ marginRight: '0' }}
            />
          </div>
        </FormGroup>
        <FormGroup row>
          <div className="col-3 if_head">디자이너까지 남은 기간</div>
          <div className="col-9 if_makeFlex">
            <input
              type="number"
              name="dYear"
              id="dYear"
              onChange={this.props.changeInput}
              value={Math.floor(userData.untilDesigner / 12)}
              className="if_input"
              style={{ width: '17.7%', textAlign: 'center' }}
              placeholder="0"
            />
            <span
              className="if_detail"
              style={{ fontSize: '1.3rem', margin: '0 3px' }}
            >
              년
            </span>
            <input
              type="number"
              name="dMonth"
              id="dMonth"
              onChange={this.props.changeInput}
              value={userData.untilDesigner % 12}
              className="if_input"
              style={{ width: '17.7%', textAlign: 'center', marginLeft: '3px' }}
              placeholder="0"
            />{' '}
            <span
              className="if_detail"
              style={{ fontSize: '1.3rem', margin: '0 3px' }}
            >
              개월
            </span>
          </div>
        </FormGroup>
        <FormGroup row>
          <div className="col-3 if_head">미용경력</div>
          <div className="col-9 if_makeFlex">
            <input
              type="number"
              name="careerYear"
              id="careerYear"
              onChange={this.props.changeInput}
              value={Math.floor(userData.career / 12)}
              className="if_input"
              style={{ width: '17.7%', textAlign: 'center' }}
              placeholder="0"
            />{' '}
            <span
              className="if_detail"
              style={{ fontSize: '1.3rem', margin: '0 3px' }}
            >
              년
            </span>
            <input
              type="number"
              name="careerMonth"
              id="careerMonth"
              onChange={this.props.changeInput}
              className="if_input"
              style={{ width: '17.7%', textAlign: 'center', marginLeft: '3px' }}
              value={userData.career % 12}
              placeholder="0"
            />{' '}
            <span
              className="if_detail"
              style={{ fontSize: '1.3rem', margin: '0 3px' }}
            >
              개월
            </span>
          </div>
        </FormGroup>
        <FormGroup row>
          <div className="col-3 if_head">이력</div>
          <div className="col-9">
            <textarea
              name="careerDetail"
              id="careerDetail"
              placeholder="줄바꿈을 해야하는데 줄바꿈이 안되네&#13;&#10;
            운장이가 해주겠지"
              onChange={this.props.changeInput}
              value={userData.careerDetail}
              className="if_input"
              style={{ height: '136px' }}
            />
            <div className="if_detail" style={{ marginTop: '8.3px' }}>
              모델들이 참고할 수 있는 경력/이력들을 적어주세요.
            </div>
          </div>
        </FormGroup>
        <FormGroup row>
          <div className="col-3 if_head">면허증/자격증</div>
          <div className="col-9 pt-3">
            <ImgPreview url={this.props.certImg1} />
            <ImgPreview url={this.props.certImg2} />
            <div className="row">
              <input
                className="col-12 col-md-6"
                type="file"
                name="cert1"
                onChange={this.props.imgChange}
              />
              <input
                className="col-12 col-md-6"
                type="file"
                name="cert2"
                onChange={this.props.imgChange}
              />
            </div>
            <div className="if_detail" style={{ marginTop: '8.3px' }}>
              취득한것만 올려주시면 됩니다. 드리머리 막내 승인 여부에 사용되며
              외부에 공개되지 않습니다.
            </div>
          </div>
        </FormGroup>
      </Fragment>
    );
  }
}

export default InfoForm;
