import React, { Component } from 'react';
import DetailCard from './DetailCard';
class DetailCards extends Component {
  state = { click: false };

  addData = key => {
    console.log(key);
    this.setState({
      click: !this.state.click,
      selectedCard: key
    });
  };

  render() {
    console.log(this.props.recruit);
    let leftCards = [];
    let rightCards = [];
    if (this.props.recruit._cards) {
      console.log(this.props.recruit._cards);
      let count = 0;
      this.props.recruit._cards.forEach((card, key) => {
        if (card.reservable) {
          count % 2
            ? rightCards.push(
                <DetailCard
                  key={key}
                  number={key}
                  cardData={card}
                  recruit={this.props.recruit}
                  selectedCard={this.state.selectedCard}
                  click={this.state.click}
                  addData={() => this.addData(key)}
                />
              )
            : leftCards.push(
                <DetailCard
                  key={key}
                  number={key}
                  cardData={card}
                  recruit={this.props.recruit}
                  selectedCard={this.state.selectedCard}
                  click={this.state.click}
                  addData={() => this.addData(key)}
                />
              );
          count++;
        }
      });
    }
    return (
      <div className="col-12 col-md-5 align-items-start">
        <div className="row">
          <div className="col-6 m-0 p-2">{leftCards}</div>
          <div className="col-6 m-0 p-2">{rightCards}</div>
        </div>
      </div>
    );
  }
}

export default DetailCards;
