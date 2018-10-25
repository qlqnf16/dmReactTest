import React, { Component } from "react";
import UserNav from "../../components/Navigation/UserNav/UserNav";
import { CardDeck } from "reactstrap";
import axios from "axios";
import DesignerCard from "../../components/DesignerCard/DesignerCard";

class LikeDesigner extends Component {
  state = {
    recruits: [],
    madeRequest: false
  };

  async componentDidMount() {
    if (!this.state.madeRequest) {
      const { data } = await axios.get("http://52.79.227.227:3030/recruits");
      this.setState({
        recruits: data,
        madeRequest: true
      });
    }
  }
  render() {
    let recruits = null;
    if (this.state.recruits.length) {
      recruits = this.state.recruits.map(recruit => (
        <DesignerCard key={recruit._id} recruit={recruit} />
      ));
    }
    return (
      <div className="container-fluid u">
        <div className="d-flex" style={{ minHeight: "70vh" }}>
          <UserNav />
          <div className="u_bg">
            <div className="u_container">
              <div className="u_title">찜한예디</div>
              <h3>찜한 예디 모아보기</h3>
              <CardDeck className="m-5">
                {recruits}
                {recruits}
              </CardDeck>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LikeDesigner;
