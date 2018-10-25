import React, { Component } from "react";
import DesignerCard from "../components/DesignerCard/DesignerCard";
import Filter from "../components/DesignerCard/Filter/Filter";
import { CardDeck } from "reactstrap";
import axios from "axios";
import firebase from "../config/Firebase";
import step1 from "../assets/images/step1.png";

import "./PageCss.css";

class DesignerList extends Component {
  constructor() {
    super();
    this.state = {
      recruits: [],
      madeRequest: false,
      filter: null
    };
  }

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get("http://52.79.227.227:3030/recruits");
      data.sort((a, b) => {
        if (a.score < b.score) return 1;
        else if (a.score > b.score) return -1;
        else return 0;
      });
      this.setState({
        recruits: data,
        madeRequest: true
      });
    }

    //시/도
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

  getFilteredCards = async () => {
    let must = "";
    let no = "";
    let gender = "";

    if (this.state.gender) gender = `gender=${this.state.gender}`;

    if (this.state.cut === "100") must += "cut=1&";
    else if (this.state.cut === "0") no += "cut=2&";
    if (this.state.perm === "100") must += "perm=1&";
    else if (this.state.perm === "0") no += "perm=2&";
    if (this.state.dye === "100") must += "dye=1&";
    else if (this.state.dye === "0") no += "dye=2&";

    const { data } = await axios.get(
      "http://52.79.227.227:3030/cards?" + must + no + gender
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

    this.setState({
      recruits: uniqueRecruits
    });
  };

  filterChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
    console.log(this.state);
  };

  render() {
    console.log(this.state.sido);
    let recruits = null;
    if (this.state.recruits.length) {
      console.log(this.state.recruits);
      recruits = this.state.recruits.map(recruit => (
        <DesignerCard key={recruit._id} recruit={recruit} />
      ));
    }

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
      <div className="container-fluid dl">
        <div className="my-5 text-center">
          <img alt="alt" style={{ width: "100%" }} src={step1} />
        </div>
        <div className="row">
          <Filter
            getFilteredCards={this.getFilteredCards}
            filterChangeHandler={e => this.filterChangeHandler(e)}
            checked={!this.state.gender ? "male" : this.state.gender}
            state={this.state}
            sigungu={sigungu}
          />
          <div className="col-9">
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
