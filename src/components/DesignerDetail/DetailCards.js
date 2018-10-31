import React, { Component } from 'react';
import DetailCard from './DetailCard';
class DetailCards extends Component {
  state = { click: false };

  addData = key => {
    this.setState({
      click: !this.state.click,
      selectedCard: key
    });
  };

  render() {
    let leftCards = [];
    let rightCards = [];
    if (this.props.recruit._cards) {
      const cards = this.props.recruit._cards.sort((a, b) => a.date - b.date);
      let count = 0;
      cards.forEach((card, key) => {
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
                  loginToggle={this.props.loginToggle}
                  submitReservation={this.props.submitReservation}
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
                  loginToggle={this.props.loginToggle}
                  submitReservation={this.props.submitReservation}
                />
              );
          count++;
        }
      });
    }
    return (
      <div className=" col-5 align-items-start p-4">
        <div className="row mx-4">
          <div className="col-6 m-0 p-2">{leftCards}</div>
          <div className="col-6 m-0 p-2">{rightCards}</div>
        </div>
      </div>
    );
  }
}

export default DetailCards;
