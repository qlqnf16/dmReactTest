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
    let count = 0;
    if (this.props.recruit._cards) {
      const filteredCards = this.props.recruit._cards.filter(
        card => card.date > new Date().getTime()
      );
      const cards = filteredCards.sort((a, b) => a.date - b.date);
      cards.forEach((card, key) => {
        if (card.reservable) {
          // if (true) {
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
                  isLogin={this.props.isLogin}
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
                  isLogin={this.props.isLogin}
                />
              );
          count++;
        }
      });
    }
    return (
      <div className=" col-5 align-items-start p-4">
        <div className="row mx-4">
          {count ? null : (
            <div
              className="col-12 m-0"
              style={{
                fontWeight: 'bold',
                color: '#1e3354',
                borderRadius: '5px',
                fontSize: '2rem',
                border: 'solid 3px rgba(0,0,0,0.1)',
                padding: '10rem 2rem',
                textAlign: 'center'
              }}
            >
              현재 예약 가능한 스케줄이 없습니다
            </div>
          )}
          <div className="col-6 m-0 p-2">{leftCards}</div>
          <div className="col-6 m-0 p-2">{rightCards}</div>
        </div>
      </div>
    );
  }
}

export default DetailCards;
