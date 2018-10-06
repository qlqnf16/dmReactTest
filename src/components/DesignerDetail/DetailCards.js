import React, { Component } from 'react';
import DetailCard from './DetailCard';
class DetailCards extends Component {
  state = { click: false };

  addData = () => {
    this.setState({ click: !this.state.click });
  };

  render() {
    let leftCards = [];
    let rightCards = [];
    if (this.props.cards) {
      this.props.cards.forEach((card, key) => {
        //TODO: card.reservable false인 것은 안뜨도록
        console.log(card.reservable);
        key % 2
          ? rightCards.push(<DetailCard key={key} cardData={card} />)
          : leftCards.push(<DetailCard key={key} cardData={card} />);
      });
    }
    return (
      <div className="col-3 align-items-start">
        <div className="border row">
          <div className="col-6 m-0 p-0">{leftCards}</div>
          <div className="col-6 m-0 p-0">{rightCards}</div>
        </div>
      </div>
    );
  }
}

export default DetailCards;
