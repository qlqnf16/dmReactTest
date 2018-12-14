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
    let cardList = [];
    if (this.props.recruit._cards) {
      const filteredCards = this.props.recruit._cards.filter(
        card => card.date > new Date().getTime()
      );
      const cards = filteredCards.sort((a, b) => a.date - b.date);
      cards.forEach((card, key) => {
        // if (card.reservable) {
        if (true) {
          cardList.push(
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
        }
      });
    }
    return <div>{cardList}</div>;
  }
}

export default DetailCards;
