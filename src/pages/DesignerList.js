import React, { Component } from "react";
import DesignerCard from "../components/DesignerCard/DesignerCard";
import Filter from "../components/DesignerCard/Filter/Filter";
import { CardDeck } from "reactstrap";
import axios from "axios";
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

  async componentDidMount() {
    if (!this.state.madeRequest) {
      const { data } = await axios.get("http://52.79.227.227:3030/recruits");
      this.setState({
        recruits: data,
        madeRequest: true
      });
      console.log(data);
    }
  }

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
    let recruits = null;
    if (this.state.recruits.length) {
      console.log(this.state.recruits);
      recruits = this.state.recruits.map(recruit => {
        return <DesignerCard key={recruit._id} recruit={recruit} />;
      });
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
