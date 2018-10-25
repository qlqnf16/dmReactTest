import React, { Component } from 'react';
import axios from 'axios';

import Header from '../components/DesignerList/Header';
import FilterButton from '../components/DesignerList/FilterButton';
import Filter from '../components/DesignerList/Filter';
import DesignerCardList from '../components/DesignerList/DesignerCardList';

import './Pages.css';

class DesignerList extends Component {
  state = {
    recruits: [],
    madeRequest: false,
    filterOn: false
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get('http://52.79.227.227:3030/recruits');
      this.setState({ recruits: data, madeRequest: true });
      console.log(data);
    }
  };

  filterToggle = () => {
    this.setState({ filterOn: !this.state.filterOn });
  };

  filterChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  getFilteredCards = async () => {
    let must,
      no,
      gender = '';

    if (this.state.gender) gender = `gender=${this.state.gender}`;

    if (this.state.cut === '100') must += 'cut=1&';
    else if (this.state.cut === '0') no += 'cut=2&';
    if (this.state.perm === '100') must += 'perm=1&';
    else if (this.state.perm === '0') no += 'perm=2&';
    if (this.state.dye === '100') must += 'dye=1&';
    else if (this.state.dye === '0') no += 'dye=2&';

    const { data } = await axios.get(
      'http://52.79.227.227:3030/cards?' + must + no + gender
    );
    let recruits = data.map(d => d._recruit);

    let uniqueRecruits = [];
    const counter = {};
    recruits.forEach(recruit => {
      if (!counter[recruit._id]) {
        uniqueRecruits.push(recruit);
        counter[recruit._id] = true;
      }
    });

    this.setState({ recruits: uniqueRecruits });
    this.filterToggle();
  };

  render() {
    return (
      <div className="m_containerStyle">
        <Header />
        <FilterButton
          getFilteredCards={this.getFilteredCards}
          on={this.state.filterOn}
        />
        <Filter
          on={this.state.filterOn}
          filterChangeHandler={this.filterChangeHandler}
        />
        <DesignerCardList recruits={this.state.recruits} />
      </div>
    );
  }
}

export default DesignerList;
