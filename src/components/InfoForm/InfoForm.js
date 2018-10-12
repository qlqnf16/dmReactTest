import React, { Component, Fragment } from 'react';
import { FormGroup } from 'reactstrap';
import ImgPreview from './ImgPreview';
import './InfoForm.css';

class InfoForm extends Component {
  render() {
    const userData = this.props.state;
    console.log(userData);
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
                className="genderRadio"
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
            <div className="d-flex justify-content-left">
              <select>
                <option>4월</option>
                <option>10월</option>
                <option>12월</option>
              </select>
              <select>
                <option>21일</option>
                <option>27일</option>
                <option>10일</option>
              </select>
              <select>
                <option>1994</option>
                <option>1995</option>
                <option>1996</option>
              </select>
            </div>
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
              type="number"
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
            <input
              type="text"
              name="region"
              id="region"
              placeholder="지역"
              onChange={this.props.changeInput}
              className="if_input"
              style={{ width: '27%' }}
            />
            <input
              type="text"
              name="shopName"
              id="shopName"
              placeholder="샵이름"
              onChange={this.props.changeInput}
              className="if_input"
              style={{ width: '27%' }}
            />
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
          <div className="col-9">
            <ImgPreview url={this.props.certImg1} />
            <ImgPreview url={this.props.certImg2} />
            <div className="d-flex">
              <input type="file" name="cert1" onChange={this.props.imgChange} />
              <input type="file" name="cert2" onChange={this.props.imgChange} />
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
