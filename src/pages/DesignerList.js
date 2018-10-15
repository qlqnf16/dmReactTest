import React, { Component } from "react";
import DesignerCard from "../components/DesignerCard/DesignerCard";
import Filter from "../components/DesignerCard/Filter/Filter";
import { CardDeck } from "reactstrap";
import axios from "axios";
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
    if (this.state.cut && this.state.cut === "100") {
      must += "cut=1&";
    } else if (this.state.cut === "0") {
      no += "cut=2&";
    }
    if (this.state.perm && this.state.perm === "100") {
      must += "perm=1&";
    } else if (this.state.perm === "0") {
      no += "perm=2&";
    }
    if (this.state.dye && this.state.dye === "100") {
      must += "dye=1&";
    } else if (this.state.dye === "0") {
      no += "dye=2&";
    }
    console.log(must, no);
    const { data } = await axios.get(
      "http://52.79.227.227:3030/cards?" + must + no
    );
    console.log(data);
    let recruits = data.map(d => d._recruit);

    let uniqueRecruits = [];
    const counter = {};
    recruits.forEach((recruit, i) => {
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
        <div className="m-5 text-center">
          <h1>1단계 : 막내 찾기(이미지)</h1>
        </div>
        <div className="row">
          <Filter
            getFilteredCards={this.getFilteredCards}
            filterChangeHandler={e => this.filterChangeHandler(e)}
            checked={!this.state.gender ? "male" : this.state.gender}
          />
          <div className="col-12 col-md-9">
            <CardDeck>
              {recruits}

              {/* 여기부터 fake data */}
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
