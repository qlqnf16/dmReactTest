import React, { Component } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import Header from '../components/DesignerDetail/Header';

class DesignerDetail extends Component {
  state = {
    madeRequest: false,
    recruit: {},
    desingerData: {}
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get(
        `http://52.79.227.227:3030/recruits/${this.props.match.params.id}`
      );
      this.setState({ recruit: data, madeRequest: true });
      console.log(this.state.recruit);
    }

    await firebase
      .database()
      .ref('/users/' + this.state.recruit._designer._uid)
      .on('value', async res => {
        console.log(res.val());
        this.setState({ designerData: res.val() });
      });
  };

  render() {
    return (
      <div className="m_containerStyle">
        <Header />
        {this.state.recruit.title}
      </div>
    );
  }
}

export default DesignerDetail;
