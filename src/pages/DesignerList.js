import React, { Component } from 'react';
import DesignerCard from '../components/DesignerCard/DesignerCard';
import Filter from '../components/DesignerCard/Filter/Filter';
import { CardDeck } from 'reactstrap';
import axios from 'axios';

class DesignerList extends Component {
  state = {
    recruits: [],
    madeRequest: false,
    filter: null
  };

  async componentDidMount() {
    if (!this.state.madeRequest) {
      const { data } = await axios.get('http://52.79.227.227:3030/recruits');
      this.setState({
        recruits: data,
        madeRequest: true
      });
    }
  }

  async getFilteredCards() {
    const { data } = await axios.get('http://52.79.227.227:3030/');
  }

  render() {
    let recruits = null;
    if (this.state.recruits.length) {
      recruits = this.state.recruits.map(recruit => (
        <DesignerCard
          id={recruit._id}
          title={recruit.title}
          name={recruit._designer.name}
          shop={recruit._designer.locations[0].shop}
          test={recruit.portfolios}
          key={recruit._id}
        />
      ));
    }
    return (
      <div className="container">
        <div className="m-5 text-center">
          <h1>1단계 : 막내 찾기(이미지)</h1>
        </div>
        <Filter />
        <CardDeck className="m-5">{recruits}</CardDeck>
      </div>
    );
  }
}

export default DesignerList;
