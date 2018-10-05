import React, { Component } from 'react';
import CardAdd from './CardAdd';

class DetailCard extends Component {
  state = {
    click: false
  };

  addData = () => {
    this.setState({ click: !this.state.click });
  };

  render() {
    console.log(this.props.cardData);
    let addData = null;
    let must = '';
    let no = '';
    if (this.props.cardData) {
      Object.entries(this.props.cardData.must).map(entry => {
        if (entry[1] === true) must += entry[0];
      });
      Object.entries(this.props.cardData.no).map(entry => {
        if (entry[1] === true) no += entry[0];
      });
    }
    if (this.state.click) {
      addData = (
        <CardAdd
          must={must}
          no={no}
          ableTimes={this.props.cardData.ableTimes}
        />
      );
    }
    return (
      <div className="border">
        <div className="m-1" onClick={() => this.addData()}>
          <h4>날짜</h4>
          <h5 className="small">
            필수 : {must} | 불가 : {no}
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
