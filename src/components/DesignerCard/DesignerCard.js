import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/Firebase';

import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
// import DesignerCarousel from './DesignerCarousel/DesignerCarousel';
import StarRatings from 'react-star-ratings';
import defaultGuy from '../../assets/images/Default_guy-01.jpg';
import allFinish from '../../assets/images/allFinish.png';
import './DesignerCard.css';

class DesginerCard extends Component {
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
    const recruit = this.props.recruit;
    if (recruit && this.state.madeRequest) {
      let shops = '';
      recruit.shops.forEach(shop => {
        shops += `/ ${shop}`;
      });
      shops = shops.substring(1);

      let { portfolios } = this.state.designerData;

      if (!portfolios || !portfolios.length) portfolios = [defaultGuy];

      let unreservable = false;
      if (
        !recruit._cards.some(card => {
          return card.reservable && card.date > new Date().getTime();
        })
      )
        unreservable = true;
      return (
        <Col className="m-0 p-1 " xs="3">
          <Link to={`/designerdetail/${recruit._id}`} className="hover-effect">
            <Card className="m-0 border-0" style={{ textDecoration: 'none' }}>
              <CardHeader className="p-0">
                <div
                  style={
                    unreservable && !this.props.useFilter
                      ? {
                          position: 'absolute',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          zIndex: '1',
                          width: '100%',
                          height: '210px',
                          top: 0,
                          left: 0,
                          backgroundColor: 'rgba(255,255,255,0.7)'
                        }
                      : null
                  }
                >
                  {unreservable && !this.props.useFilter ? (
                    <img src={allFinish} alt="alt" style={{ width: '70%' }} />
                  ) : null}
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} />
                {/* <DesignerCarousel images={portfolios} /> */}
                <img
                  src={portfolios[0] + '_thump'}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = portfolios[0];
                  }}
                  alt="alt"
                  style={{ width: '100%', height: 200 }}
                />
              </CardHeader>
              <CardBody className="pl-0 text-dark">
                <CardSubtitle>
                  <span style={{ fontSize: '1.1rem', color: '#2b2e34' }}>
                    {shops}
                  </span>
                </CardSubtitle>
                <CardTitle>
                  <span
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 'bold',
                      color: '#1e3354'
                    }}
                  >
                    {recruit.title}
                  </span>
                </CardTitle>
                <CardSubtitle className="d-flex align-items-center">
                  <span
                    style={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      marginRight: '6.5px',
                      maxWidth: '50%'
                    }}
                  >
                    {recruit._designer.name}
                  </span>
                  <StarRatings
                    rating={recruit.score}
                    starDimension="1.1rem"
                    starSpacing="1px"
                    starRatedColor="#dd6866"
                    starEmptycolor="#ffffff"
                  />
                  <span style={{ color: 'gray' }}>({recruit.score})</span>
                </CardSubtitle>
              </CardBody>
            </Card>
          </Link>
        </Col>
      );
    } else {
      return <div />;
    }
  }
}

export default DesginerCard;
