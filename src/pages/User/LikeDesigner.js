import React, { Component } from 'react';
import UserNav from '../../components/Navigation/UserNav/UserNav';
import { CardDeck } from 'reactstrap';
import axios from '../../config/Axios';
import DesignerCard from '../../components/DesignerCard/DesignerCard';

class LikeDesigner extends Component {
  state = {
    recruits: [],
    madeRequest: false
  };

  async componentDidMount() {
    if (!this.state.madeRequest) {
      const { data } = await axios.get('recruits');
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
        <div className="d-flex" style={{ minHeight: '70vh' }}>
          <UserNav />
          <div className="u_bg">
            <div className="u_container">
              <div className="u_title">찜한 예디</div>
              <div className="uif_title">찜한 예디 모아보기</div>
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
