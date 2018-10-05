import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    const Times = [];
    this.props.ableTimes.map(ableTime => {
      let time = ableTime.since;
      while (time <= ableTime.until - 90) {
        let timeFormat = `${parseInt(time / 60)} : ${
          time % 60 === 0 ? '00' : '30'
        }`;
        Times.push(timeFormat);
        time += 30;
      }
    });
    let timeButtons = null;
    timeButtons = Times.map(time => {
      let classN = 'btn btn-sm btn-light col-md-6';
      if (time === this.state.time) classN += ' btn-outline-primary';
      return (
        <div onClick={() => this.selectTime(time)} className={classN}>
          <p>{time}</p>
        </div>
      );
    });

    let cutButton = '';
    let cutClick = null;
    if (this.props.must.some(e => e === 'cut'))
      cutButton = 'btn btn-primary btn-sm col-md-4';
    else if (this.props.no.some(e => e === 'cut'))
      cutButton = 'btn btn-warning btn-sm col-md-4';
    else {
      cutButton = 'btn btn-light btn-sm col-md-4';
      cutClick = () => this.toggle('cut');
      if (this.state.cut) cutButton += ' btn-outline-primary';
    }
    let permButton = '';
    let permClick = null;
    if (this.props.must.some(e => e === 'perm'))
      permButton = 'small bg-primary col-md-4';
    else if (this.props.no.some(e => e === 'perm'))
      permButton = 'small bg-secondary col-md-4';
    else {
      permButton = 'btn btn-light btn-sm col-md-4';
      permClick = () => this.toggle('perm');
      if (this.state.cut) permButton += ' btn-outline-primary';
    }
    let dyeButton = '';
    let dyeClick = null;
    if (this.props.must.some(e => e === 'dye'))
      dyeButton = 'small bg-primary col-md-4';
    else if (this.props.no.some(e => e === 'dye'))
      dyeButton = 'small bg-secondary col-md-4';
    else {
      dyeButton = 'btn btn-light btn-sm col-md-4';
      dyeClick = () => this.toggle('dye');
      if (this.state.cut) dyeButton += ' btn-outline-primary';
    }

    let price = 0;
    if (this.state.cut) price += this.props.price.cut;
    if (this.state.perm) price += this.props.price.perm;
    if (this.state.dye) price += this.props.price.dye;

    let time = 0;
    if (this.state.cut) time += this.props.time.cut;
    if (this.state.perm) time += this.props.time.perm;
    if (this.state.dye) time += this.props.time.dye;

    console.log(price);
    return (
      <div>
        <div className="row">
          <div onClick={cutClick} className={cutButton}>
            컷트
          </div>
          <div onClick={dyeClick} className={dyeButton}>
            염색
          </div>
          <div onClick={permClick} className={permButton}>
            펌
          </div>
        </div>
        <h5 className="small row">{timeButtons}</h5>
        <h5 className="small">예상 소요시간</h5>
        <h5 className="small">
          {parseInt(time / 60)}
          시간 {time % 60}분
        </h5>
        <h5 className="small">{price}원</h5>
        <div className="btn btn-danger">
          <Link
            className="text-white"
            to={`/reservationConfirm/${this.props.id}`}
          >
            예약하기
          </Link>
        </div>
      </div>
    );
  }
}

export default CardAdd;
