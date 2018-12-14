import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../../config/Firebase';

import DesignerCardImage from './DesignerCardImage';
import DesignerCardContent from './DesignerCardContent';

import defaultGuy from '../../../assets/images/Default_guy-01.jpg';
import Spinner from '../../../assets/images/loading_spinner.gif';
import allFinish from '../../../assets/images/allFinish.png';

class DesignerCard extends Component {
  // console.log(props.recruit);
  constructor(props) {
    super(props);
  }

  state = {
    designerData: {},
    madeRequest: false
  };

  componentDidMount = async () => {
    await firebase
      .database()
      .ref('/users/' + this.props.recruit._designer._uid)
      .once('value', async res => {
        this.setState({ designerData: res.val(), madeRequest: true });
      });
  };

  componentDidUpdate = async () => {
    if (!this.props.recruit.isSecondTime) {
      this.props.recruit.isSecondTime = true;
      await firebase
        .database()
        .ref('/users/' + this.props.recruit._designer._uid)
        .once('value', async res => {
          this.setState({
            designerData: res.val(),
            madeRequest: true
          });
        });
    }
  };

  render() {
    if (this.state.designerData && this.state.madeRequest) {
      let { portfolios } = this.state.designerData;

      if (!portfolios || !portfolios.length) portfolios = [defaultGuy];

      let unreservable = false;
      if (
        !this.props.recruit._cards.some(card => {
          return card.reservable && card.date > new Date().getTime();
        })
      )
        unreservable = true;

      return (
        <div style={containerStyle}>
          <Link to={`designerdetail/${this.props.recruit._id}`}>
            <div style={imageStyle}>
              <div
                style={
                  unreservable && !this.props.useFilter
                    ? {
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        position: 'absolute',
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        width: '43%',
                        height: '135px'
                      }
                    : null
                }
              >
                {unreservable && !this.props.useFilter ? (
                  <img src={allFinish} style={{ width: '70%' }} />
                ) : null}
              </div>
              <DesignerCardImage images={portfolios} />
            </div>
            <DesignerCardContent recruit={this.props.recruit} />
          </Link>
        </div>
      );
    } else {
      return (
        <div
          style={{ height: '100vh', width: '100%' }}
          className="d-flex justify-content-center align-items-center"
        >
          <img alt="alt" style={{ height: '20%' }} src={Spinner} />
        </div>
      );
    }
  }
}

const styles = {
  containerStyle: {
    width: '48%',
    marginBottom: '3%'
  },
  imageStyle: {
    width: '100%',
    height: '134px'
  }
};

const { containerStyle, imageStyle } = styles;

export default DesignerCard;
