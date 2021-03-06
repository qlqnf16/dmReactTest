import React, { Component } from 'react';
import './CardAdd.css';
import questionMark from '../../assets/images/question_yellow.png';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

class CardAdd extends Component {
  state = {
    cut: false,
    perm: false,
    dye: false,
    time: null,
    isLogin: this.props.isLogin
  };

  componentDidMount = () => {
    if (this.props.must.some(e => e === 'cut')) {
      this.setState({ cut: true });
    }
    if (this.props.must.some(e => e === 'perm')) this.setState({ perm: true });
    if (this.props.must.some(e => e === 'dye')) this.setState({ dye: true });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    const cutChange = this.state.cut !== nextState.cut;
    const permChange = this.state.perm !== nextState.perm;
    const dyeChange = this.state.dye !== nextState.dye;
    const timeChange = this.state.time !== nextState.time;
    return cutChange || permChange || dyeChange || timeChange;
  };

  toggle = type => {
    switch (type) {
      case 'cut':
        this.setState({ cut: !this.state.cut, time: null });
        break;
      case 'perm':
        this.setState({ perm: !this.state.perm, time: null });
        break;
      case 'dye':
        this.setState({ dye: !this.state.dye, time: null });
        break;
      default:
        break;
    }
  };

  selectTime = time => {
    this.setState({ time });
  };

  render() {
    const reservedTimes = [];
    const Times = [];
    this.props.cardData.reservedTimes.forEach(reservedTime => {
      let time = reservedTime.since;
      while (time <= reservedTime.until) {
        reservedTimes.push(time);
        time += 30;
      }
    });
    this.props.ableTimes.forEach(ableTime => {
      let time = ableTime.since;
      let requireTime = 0;
      requireTime += this.state.cut && this.props.recruit.requireTime.cut;
      requireTime += this.state.perm && this.props.recruit.requireTime.perm;
      requireTime += this.state.dye && this.props.recruit.requireTime.dye;
      requireTime = requireTime || 30;
      for (let t = time; t <= ableTime.until - requireTime; t += 30) {
        let temp = true;
        for (let i = t; i <= t + requireTime - 30; i += 30) {
          if (reservedTimes.includes(i)) temp = false;
        }
        if (temp) Times.push(t);
      }
    });
    let timeButtons = null;
    timeButtons = Times.map((time, key) => {
      let classN = 'toggle_button time_button';
      if (time === this.state.time) classN += ' toggle_on';
      let timeFormat = `${parseInt(time / 60, 10)} : ${
        time % 60 === 0 ? '00' : '30'
      }`;
      return (
        <div key={key} className="col-6 p-1">
          <div onClick={() => this.selectTime(time)} className={classN}>
            <p>{timeFormat}</p>
          </div>
        </div>
      );
    });

    if (!timeButtons.length)
      timeButtons = (
        <div
          className="col-12"
          style={{
            textAlign: 'center',
            fontSize: '15px',
            padding: '20px',
            fontWeight: 'bold'
          }}
        >
          가능한 시간이 없습니다.
        </div>
      );

    let cutButton = '';
    let cutClick = null;
    if (this.props.must.some(e => e === 'cut')) cutButton = 'must_button';
    else if (this.props.no.some(e => e === 'cut')) cutButton = 'no_button';
    else {
      cutButton = 'toggle_button';
      cutClick = () => this.toggle('cut');
      if (this.state.cut) cutButton += ' toggle_on';
    }
    let permButton = '';
    let permClick = null;
    if (this.props.must.some(e => e === 'perm')) permButton = 'must_button';
    else if (this.props.no.some(e => e === 'perm')) permButton = 'no_button';
    else {
      permButton = 'toggle_button';
      permClick = () => this.toggle('perm');
      if (this.state.perm) permButton += ' toggle_on';
    }
    let dyeButton = '';
    let dyeClick = null;
    if (this.props.must.some(e => e === 'dye')) dyeButton = 'must_button';
    else if (this.props.no.some(e => e === 'dye')) dyeButton = 'no_button ';
    else {
      dyeButton = 'toggle_button';
      dyeClick = () => this.toggle('dye');
      if (this.state.dye) dyeButton += ' toggle_on';
    }

    let price = 0;
    let maxPrice = 0;
    let service = '';
    let serviceFormat = {};
    let time = 0;
    if (this.state.cut) {
      time += this.props.recruit.requireTime.cut;
      service += '/ 커트 ';
      serviceFormat['cut'] = true;
    }
    if (this.state.perm) {
      price +=
        this.props.cardData.permPrice && this.props.cardData.permPrice.normal
          ? this.props.cardData.permPrice.normal
          : 30000;
      time += this.props.recruit.requireTime.perm;
      service += '/ 펌';
      serviceFormat['perm'] = true;
      maxPrice +=
        price + Math.max(...Object.values(this.props.cardData.permPrice));
    }
    if (this.state.dye && this.state.perm) {
      maxPrice -= price;
    }
    if (this.state.dye) {
      price +=
        this.props.cardData.dyePrice && this.props.cardData.dyePrice.normal
          ? this.props.cardData.dyePrice.normal
          : 30000;
      time += this.props.recruit.requireTime.dye;
      service += '/ 염색';
      serviceFormat['dye'] = true;
      maxPrice +=
        price + Math.max(...Object.values(this.props.cardData.dyePrice));
    }
    service = service.substring(1);

    const clickButton = () =>
      this.props.submitReservation(
        price,
        time,
        service,
        serviceFormat,
        this.state.time,
        this.props.recruit,
        this.props.cardData
      );

    let captionInner = [];
    if (this.props.must.some(e => e === 'cut')) captionInner.push('커트');
    if (this.props.must.some(e => e === 'perm')) captionInner.push('펌');
    if (this.props.must.some(e => e === 'dye')) captionInner.push('염색');
    const caption = captionInner.length
      ? `* ${captionInner.join(',')}은(는) 필수입니다.`
      : null;

    return (
      <div className="">
        <div className="border-top border-bottom py-3 row m-2 ">
          <div
            style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
            className="col-12 px-1 mb-3"
          >
            1. 받으실 서비스를 선택해주세요.
          </div>
          <div className="col-4 px-1">
            <div onClick={cutClick} className={cutButton}>
              커트
            </div>
          </div>
          <div className="col-4 px-1">
            <div onClick={dyeClick} className={dyeButton}>
              염색
            </div>
          </div>
          <div className="col-4 px-1">
            <div onClick={permClick} className={permButton}>
              펌
            </div>
          </div>
          <div className="mt-2">{caption}</div>
        </div>

        <div className=" py-3 row m-2">
          <div
            style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
            className="col-12 px-1 mb-3"
          >
            2. 시간을 선택해주세요.
          </div>
          {timeButtons}
        </div>
        <div className="submit_button" onClick={clickButton}>
          <div className="row p-3">
            <div className="col-7 m-0">
              <p className="time mb-2">예상 소요시간</p>
              <p className="time" style={{ fontWeight: 'bold' }}>
                {parseInt(time / 60, 10)}
                시간 {time % 60}분
              </p>
              <div className="time mb-1">
                예상 추가 금액
                <img
                  alt="alt"
                  className="question"
                  src={questionMark}
                  data-tip
                  data-for="addPrice"
                />
                <ReactTooltip
                  id="addPrice"
                  place="left"
                  type="light"
                  effect="solid"
                  delayHide={500}
                  className="card_tooltip tooltip_pic"
                >
                  <div className="tooltip_text">
                    재료비는 현장 사정 & 기장에 따라 달라질 수 있으므로 별도로
                    현금 지참해주세요 :)
                  </div>
                </ReactTooltip>
              </div>
              <div className="time" style={{ fontWeight: 'bold' }}>
                {price}원 ~ {maxPrice}원
              </div>
            </div>
            <div className="col-5 p-0 reservation">
              <div className="price mb-2 mr-2">
                5000원
                <img
                  alt="alt"
                  className="question"
                  style={{ marginBottom: '0.8rem' }}
                  src={questionMark}
                  data-tip
                  data-for="price"
                />
                <ReactTooltip
                  id="price"
                  place="right"
                  type="light"
                  effect="solid"
                  delayHide={500}
                  className="card_tooltip"
                >
                  <p>이 금액은</p>
                  <p>✓ 예비헤어디자이너 응원비</p>
                  <p>✓ 소외계층을 위한 소셜이벤트</p>
                  <p>✓ 드리머리의 생존 </p>
                  <p>을 위하여 사용됩니다.</p>
                </ReactTooltip>
              </div>
              <div
                className="mr-3 mt-3 p-2"
                style={{ border: '1px solid white', borderRadius: 5 }}
              >
                예약하기
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(CardAdd);
