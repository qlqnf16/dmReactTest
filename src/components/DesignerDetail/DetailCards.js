import React, { Component } from 'react';
import DetailCard from './DetailCard';
class DetailCards extends Component {
  state = { click: false };

  addData = () => {
    this.setState({ click: !this.state.click });
  };

  render() {
    console.log(this.props.recruit);
    let leftCards = [];
    let rightCards = [];
    if (this.props.recruit._cards) {
      console.log(this.props.recruit._cards);
      this.props.recruit._cards.forEach((card, key) => {
        if (card.reservable) {
          key % 2
            ? rightCards.push(
                <DetailCard
                  key={key}
                  cardData={card}
                  recruit={this.props.recruit}
                />
              )
            : leftCards.push(
                <DetailCard
                  key={key}
                  cardData={card}
                  recruit={this.props.recruit}
                />
              );
        }
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
