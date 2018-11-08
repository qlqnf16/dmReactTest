import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
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
      const cards = this.props.recruit._cards.sort((a, b) => a.date - b.date);
      cards.forEach((card, key) => {
        if (card.reservable) {
          cardList.push(
            // <div>
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
            // </div>
          );
        }
      });
    }
    return (
      <div>
        {/* <ReactSwipe className="carousel" swipeOptions={{ continuous: false }}> */}
        {cardList}
        {/* </ReactSwipe> */}
      </div>
    );
  }
}

export default DetailCards;
