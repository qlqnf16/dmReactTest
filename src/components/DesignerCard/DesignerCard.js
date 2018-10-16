import React from 'react';
import { Link } from 'react-router-dom';
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
import './DesignerCard.css';

const DesginerCard = props => {
  const recruit = props.recruit;
  console.log(recruit);
  if (recruit) {
    return (
      <Col className="m-0 p-1 " xs="3">
        <Link to={`/designerdetail/${recruit._id}`} className="hover-effect">
          <Card className="m-0 border-0" style={{ textDecoration: 'none' }}>
            <CardHeader className="p-0">
              <DesignerCarousel test={recruit.portfolios} />
            </CardHeader>
            <CardBody className="pl-0 text-dark">
              <CardSubtitle>
                <span style={{ fontSize: '1.1rem', color: '#2b2e34' }}>
                  샵 이름 넣자
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
};

export default DesginerCard;
