import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CardAdd.css';
import questionMark from '../../assets/images/question_yellow.png';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

class CardAdd extends Component {
  state = {
    cut: false,
    perm: false,
    dye: false,
    time: ''
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
        this.setState({ cut: !this.state.cut });
        break;
      case 'perm':
        this.setState({ perm: !this.state.perm });
        break;
      case 'dye':
        this.setState({ dye: !this.state.dye });
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
      while (time <= reservedTime.until - 30) {
        reservedTimes.push(time);
        time += 30;
      }
    });
    this.props.ableTimes.forEach(ableTime => {
      let time = ableTime.since;
      while (time <= ableTime.until - 90) {
        if (!reservedTimes.includes(time)) Times.push(time);
        time += 30;
      }
    });
    console.log(reservedTimes);
    console.log(Times);
    let timeButtons = null;
    timeButtons = Times.map((time, key) => {
      let classN = 'toggle_button time_button';
      if (time === this.state.time) classN += ' toggle_on';
      let timeFormat = `${parseInt(time / 60, 10)} : ${
        time % 60 === 0 ? '00' : '30'
      }`;
      return (
        <div className="col-6 p-1">
          <div
            key={key}
            onClick={() => this.selectTime(time)}
            className={classN}
          >
            <p>{timeFormat}</p>
          </div>
        </div>
      );
    });

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
    let service = '';
    let serviceFormat = {};
    let time = 0;
    if (this.state.cut) {
      price += this.props.price.cut;
      time += this.props.recruit.requireTime.cut;
      service += '/ 컷트 ';
      serviceFormat['cut'] = this.props.price.cut;
    }
    if (this.state.perm) {
      price += this.props.price.perm;
      time += this.props.recruit.requireTime.perm;
      service += '/ 펌';
      serviceFormat['perm'] = this.props.price.perm;
    }
    if (this.state.dye) {
      price += this.props.price.dye;
      time += this.props.recruit.requireTime.dye;
      service += '/ 염색';
      serviceFormat['dye'] = this.props.price.dye;
    }
    service = service.substring(1);

    console.log(this.props);
    return (
      <div className="">
        <div className="border-top border-bottom py-3 row m-2 ">
          <div className="col-4 px-1">
            <div onClick={cutClick} className={cutButton}>
              컷트
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
        </div>
        <div className=" py-3 row m-2">{timeButtons}</div>
        <div
          className="submit_button"
          onClick={!this.props.userData.name ? this.props.loginToggle : null}
        >
          <Link
            className="link"
            to={
              this.props.userData.name
                ? {
                    pathname: `/reservation/${
                      this.props.id // to={`/reservation/${this.props.id}`}
                    }`,
                    state: {
                      price,
                      time,
                      service,
                      serviceFormat,
                      startTime: this.state.time,
                      recruit: this.props.recruit,
                      cardData: this.props.cardData
                    }
                  }
                : {}
            }
          >
            <div className="row p-3" style={{ alignItems: 'flex-end' }}>
              <div className="col-7 m-0">
                <p className="time mb-2">예상 소요시간</p>
                <p className="time" style={{ fontWeight: 'bold' }}>
                  {parseInt(time / 60, 10)}
                  시간 {time % 60}분
                </p>
                <p className="time mb-1">
                  예상 금액
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
                      재료비는 현장 사정에 따라 달라질 수 있으므로 별도로 현금
                      지참해주세요 :)
                    </div>
                  </ReactTooltip>
                </p>
                <p className="time" style={{ fontWeight: 'bold' }}>
                  {parseInt(time / 60, 10)}
                  12345원
                </p>
              </div>
              <div className="col-5 p-0 reservation">
                <p className="price mb-2 mr-2">
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
                </p>
                <div className="pr-2 mr-2">예약하기</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(CardAdd);
