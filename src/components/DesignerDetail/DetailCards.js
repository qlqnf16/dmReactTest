import React, { Component } from 'react';
import DetailCard from './DetailCard';
class DetailCards extends Component {
  state = { click: false };

  addData = () => {
    this.setState({ click: !this.state.click });
  };

  render() {
    let Cards = null;
    if (this.props.cards) {
      Cards = this.props.cards.map(card => <DetailCard cardData={card} />);
    }
    return (
      <div className="col-3 align-items-start">
        <div className="border row">
          <div className="col-6 m-0 p-0">{Cards}</div>
          <div className="col-6 m-0 p-0">
            {/* <DetailCard />
            <DetailCard /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default DetailCards;
