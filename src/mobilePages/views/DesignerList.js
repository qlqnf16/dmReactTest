import React, { Component } from "react";
import axios from "../../config/Axios";
import firebase from "../../config/Firebase";

import Header from "../components/DesignerList/Header";
import FilterButton from "../components/DesignerList/FilterButton";
import Filter from "../components/DesignerList/Filter";
import DesignerCardList from "../components/DesignerList/DesignerCardList";

import "./Pages.css";

class DesignerList extends Component {
  state = {
    recruits: [],
    madeRequest: false,
    filterOn: false
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get("recruits");
      const filteredData = data.filter(
        d =>
          d._designer &&
          d._designer.expiredAt &&
          d._designer.expiredAt > new Date().getTime() &&
          d._cards.some(card => card.reservable)
      );
      filteredData.sort((a, b) => {
        if (a.score < b.score) return 1;
        else if (a.score > b.score) return -1;
        else return 0;
      });
      this.setState({ recruits: filteredData, madeRequest: true });
    }

    // 시/도
    await firebase
      .database()
      .ref(`/users`)
      .on("value", async res => {
        const filterAddresses = [];
        let filterSido = [];
        Object.values(res.val()).forEach(user => {
          if (user.addresses && user.addresses !== undefined) {
            user.addresses.forEach(address => {
              filterSido.push(address.sido);
            });
            filterAddresses.push(user.addresses);
          }
        });
        filterSido = new Set(filterSido);
        filterSido = [...filterSido].sort();
        await this.setState({ filterAddresses, filterSido, madeRequest: true });
      });
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
      gender = "";

    if (this.state.gender) gender = `gender=${this.state.gender}`;

    if (this.state.cut === "100") must += "cut=1&";
    else if (this.state.cut === "0") no += "cut=2&";
    if (this.state.perm === "100") must += "perm=1&";
    else if (this.state.perm === "0") no += "perm=2&";
    if (this.state.dye === "100") must += "dye=1&";
    else if (this.state.dye === "0") no += "dye=2&";

    const { data } = await axios.get("cards?" + must + no + gender);
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
    let sigungu = [];
    if (this.state.filterAddresses) {
      this.state.filterAddresses.forEach(address => {
        address.forEach(ad => {
          if (ad.sido === this.state.sido) sigungu.push(ad.sigungu);
        });
      });
      sigungu = new Set(sigungu);
      sigungu = [...sigungu].sort();
    }
    return (
      <div className="m_containerStyle">
        <Header />
        <Filter
          on={this.state.filterOn}
          filterChangeHandler={this.filterChangeHandler}
          state={this.state}
          sigungu={sigungu}
        />
        <FilterButton
          getFilteredCards={this.getFilteredCards}
          on={this.state.filterOn}
        />
        <DesignerCardList recruits={this.state.recruits} />
      </div>
    );
  }
}

export default DesignerList;
