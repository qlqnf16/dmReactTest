import React, { Component } from 'react';
import UserNav from '../../components/Navigation/UserNav/UserNav';
import { CardDeck } from 'reactstrap';
import axios from 'axios';
import DesignerCard from '../../components/DesignerCard/DesignerCard';

class LikeDesigner extends Component {
  state = {
    recruits: [],
    madeRequest: false
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
        <div className="row mt-5">
          <UserNav />
          <div className="col-10">
            <h1>찜한 막내</h1>
            <div>
              <h3>찜한 막내 모아보기</h3>
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
      </div>
    );
  }
}

export default LikeDesigner;
