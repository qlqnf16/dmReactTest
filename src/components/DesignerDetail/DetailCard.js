import React, { Component } from 'react';
import CardAdd from './CardAdd';
import Moment from 'react-moment';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

import questionMark from '../../assets/images/question_navy.png';

import './DetailCard.css';

class DetailCard extends Component {
  state = {
    click: false
  };

  addData = async () => {
    await this.props.addData();
    await this.setState({ click: !this.state.click });
  };

  dayOfWeek = date => {
    switch (moment(date).day()) {
      case 1:
        return '월';
      case 2:
        return '화';
      case 3:
        return '수';
      case 4:
        return '목';
      case 5:
        return '금';
      case 6:
        return '토';
      case 7:
        return '일';
      default:
        break;
    }
  };

  typeParse = type => {
    switch (type) {
      case 'cut':
        return '커트';
      case 'perm':
        return '펌';
      case 'dye':
        return '염색';
      default:
        break;
    }
  };

  genderFormat = type => {
    switch (type) {
      case 'both':
        return '남자, 여자';
      case 'male':
        return '남자';
      case 'female':
        return '여자';
      default:
        break;
    }
  };

  render() {
    let addData = null;
    let must = [];
    let no = [];
    if (this.props.cardData.must) {
      Object.entries(this.props.cardData.must).forEach(entry => {
        if (entry[1] === true) must.push(entry[0]);
      });
    }
    if (this.props.cardData.no) {
      Object.entries(this.props.cardData.no).forEach(entry => {
        if (entry[1] === true) no.push(entry[0]);
      });
    }
    let dcard = 'dcard ';
    if (this.state.click && this.props.selectedCard === this.props.number) {
      addData = (
        <CardAdd
          cardData={this.props.cardData}
          must={must}
          no={no}
          ableTimes={this.props.cardData.ableTimes}
          price={this.props.cardData.price}
          time={this.props.cardData.requireTime}
          id={this.props.cardData._id}
          recruit={this.props.recruit}
          loginToggle={this.props.loginToggle}
          submitReservation={this.props.submitReservation}
          isLogin={this.props.isLogin}
        />
      );
      dcard += 'dcard_selected';
    }
    let mustParse = String(must.map(m => this.typeParse(m)));
    let noParse = String(no.map(m => this.typeParse(m)));
    if (!mustParse.length) mustParse = '없음';
    if (!noParse.length) noParse = '없음';

    return (
      <div className={dcard}>
        <div className="p-4" onClick={this.addData}>
          <p className="dcard_date">
            <Moment format="MM/DD">
              {this.props.cardData && this.props.cardData.date}
            </Moment>{' '}
            ({this.dayOfWeek(this.props.cardData.date)})
          </p>
          <h5 className=" dcard_services">
            <span className="dcard_must">
              필수 : <span style={{ fontWeight: 'normal' }}>{mustParse}</span>
            </span>{' '}
            |{' '}
            <span className="dcard_no">
              불가 : <span style={{ fontWeight: 'normal' }}>{noParse}</span>
            </span>
          </h5>
          <h5>
            <span style={{ fontWeight: 'bold' }}>모델</span> :{' '}
            {this.genderFormat(this.props.cardData.requireGender)}
          </h5>
          <h5>
            <span style={{ fontWeight: 'bold' }}>헤어샵</span> :{' '}
            {this.props.cardData.shop}
          </h5>
          <h5 className="m-0">
            <span style={{ fontWeight: 'bold' }}>조건</span> :{' '}
            {this.props.cardData.picture}
            <img
              alt="alt"
              className="question"
              src={questionMark}
              data-tip
              data-for="pic"
              style={{
                height: '1.2rem',
                width: '1.2rem',
                marginBottom: '0.2rem'
              }}
            />
            <ReactTooltip
              id="pic"
              place="left"
              type="light"
              effect="solid"
              delayHide={500}
              className="card_tooltip tooltip_pic"
            >
              <div className="mb-2 tooltip_title">✓ 적극응원</div>
              <div className="mb-3 tooltip_text">
                사진을 촬영하며, 미래에 홍보용으로 사용될 수 있습니다.
              </div>

              <div className="mb-2 tooltip_title">✓ 히든응원 </div>
              <div className="mb-3 tooltip_text">
                사진을 촬영하나 얼굴은 모자이크 처리합니다.
              </div>

              <div className="mb-2 tooltip_title">✓ 매너응원</div>
              <div className="mb-3 tooltip_text">
                사진을 촬영하나 개인소장/실습 증명용으로만 사용됩니다.
              </div>

              <div className="mb-2 tooltip_title">✓ 사진촬영x</div>
              <div className="mb-3 tooltip_text">사진을 촬영하지 않습니다.</div>
            </ReactTooltip>
          </h5>
        </div>
        {addData}
      </div>
    );
  }
}

export default DetailCard;
