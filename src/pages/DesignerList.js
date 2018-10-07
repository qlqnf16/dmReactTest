import React, { Component } from 'react';
import DesignerCard from '../components/DesignerCard/DesignerCard';
import Filter from '../components/DesignerCard/Filter/Filter';
import { CardDeck } from 'reactstrap';
import axios from 'axios';

class DesignerList extends Component {
  constructor() {
    super();
    this.state = {
      recruits: [],
      madeRequest: false,
      filter: null
    };
  }

  async componentDidMount() {
    if (!this.state.madeRequest) {
      const { data } = await axios.get('http://52.79.227.227:3030/recruits');
      this.setState({
        recruits: data,
        madeRequest: true
      });
    }
  }

  getFilteredCards = async () => {
    let must = '';
    let no = '';
    if (this.state.cut && this.state.cut === '2') {
      must += 'cut=1&';
    } else if (this.state.cut === '0') {
      no += 'cut=2&';
    }
    if (this.state.perm && this.state.perm === '2') {
      must += 'perm=1&';
    } else if (this.state.perm === '0') {
      no += 'perm=2&';
    }
    if (this.state.dye && this.state.dye === '2') {
      must += 'dye=1&';
    } else if (this.state.dye === '0') {
      no += 'dye=2&';
    }
    console.log(must, no);
    const { data } = await axios.get(
      'http://52.79.227.227:3030/cards?' + must + no
    );
    this.setState({
      recruits: data,
      madeRequest: true
    });
  };

  filterChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  render() {
    let recruits = null;
    if (this.state.recruits.length) {
      recruits = this.state.recruits.map(recruit => (
        <DesignerCard
          id={recruit._id}
          title={recruit.title}
          name={recruit._designer && recruit._designer.name}
          shop={recruit._designer && recruit._designer.locations[0].shop}
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
        <div className="row">
          <Filter
            getFilteredCards={this.getFilteredCards}
            filterChangeHandler={e => this.filterChangeHandler(e)}
          />
          <div className="col-md-10">
            <CardDeck className="m-5">
              {recruits}
              {recruits}
              {recruits}
              {recruits}
              {recruits}
            </CardDeck>
          </div>
        </div>
      </div>
    );
  }
}

export default DesignerList;
