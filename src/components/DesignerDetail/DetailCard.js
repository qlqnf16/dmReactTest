import React, { Component } from 'react';
import CardAdd from './CardAdd';
import Moment from 'react-moment';
import moment from 'moment';

class DetailCard extends Component {
  state = {
    click: false
  };

  addData = () => {
    this.setState({ click: !this.state.click });
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
        return '컷트';
      case 'perm':
        return '펌';
      case 'dye':
        return '염색';
      default:
        break;
    }
  };

  render() {
    console.log(this.props.cardData);
    let addData = null;
    let must = [];
    let no = [];
    if (this.props.cardData) {
      Object.entries(this.props.cardData.must).forEach(entry => {
        if (entry[1] === true) must.push(entry[0]);
      });
      Object.entries(this.props.cardData.no).forEach(entry => {
        if (entry[1] === true) no.push(entry[0]);
      });
    }
    if (this.state.click) {
      addData = (
        <CardAdd
          must={must}
          no={no}
          ableTimes={this.props.cardData.ableTimes}
          price={this.props.cardData.price}
          time={this.props.cardData.requireTime}
          id={this.props.cardData._id}
        />
      );
    }
    const mustParse = must.map((m, key) => this.typeParse(m));
    const noParse = no.map((m, key) => this.typeParse(m));

    return (
      <div className="border">
        <div className="m-1" onClick={() => this.addData()}>
          <h4>
            <Moment format="MM/DD">
              {this.props.cardData && this.props.cardData.date}
            </Moment>{' '}
            ({this.dayOfWeek(this.props.cardData.date)})
          </h4>
          <h5 className="small">
            필수 : {mustParse} | 불가 : {noParse}
          </h5>
          <h5 className="small">모델 : </h5>
          <h5 className="small">헤어샵 : </h5>
        </div>
        {addData}
      </div>
    );
  }
}

export default DetailCard;
