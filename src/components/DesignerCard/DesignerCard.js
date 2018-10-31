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
import DesignerCarousel from './DesignerCarousel/DesignerCarousel';
import StarRatings from 'react-star-ratings';
import defaultGuy from '../../assets/images/Default_guy-01.jpg';
import './DesignerCard.css';

class DesginerCard extends Component {
  state = {
    designerData: {},
    madeRequest: false
  };

  componentDidMount = async () => {
    await firebase
      .database()
      .ref('/users/' + this.props.recruit._designer._uid)
      .on('value', async res => {
        this.setState({ designerData: res.val(), madeRequest: true });
      });
  };

  render() {
    const recruit = this.props.recruit;
    if (recruit && this.state.madeRequest) {
      let shops = '';
      recruit.shops.forEach(shop => {
        shops += `/ ${shop}`;
      });
      shops = shops.substring(1);

      let portfolios = [];
      for (let i = 0; this.state.designerData[`portfolio${i}`]; i++) {
        portfolios.push(this.state.designerData[`portfolio${i}`]);
      }
      if (!portfolios.length) portfolios = [defaultGuy];

      return (
        <Col className="m-0 p-1 " xs="3">
          <Link to={`/designerdetail/${recruit._id}`} className="hover-effect">
            <Card className="m-0 border-0" style={{ textDecoration: 'none' }}>
              <CardHeader className="p-0">
                <DesignerCarousel images={portfolios} />
              </CardHeader>
              <CardBody className="pl-0 text-dark">
                <CardSubtitle>
                  <span style={{ fontSize: '1.1rem', color: '#2b2e34' }}>
                    {shops}
                  </span>
                </CardSubtitle>
                {/* <CardSubtitle>{recruit.shop}</CardSubtitle> */}
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
                      marginRight: '6.5px'
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
                {/* <Link to={`/designerdetail/${recruit.id}`}>상세 보기</Link> */}
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
