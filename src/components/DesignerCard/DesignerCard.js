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

const DesginerCard = props => {
  const recruit = props.recruit;
  console.log(recruit);
  if (recruit) {
    return (
      <Col className="m-0 p-1 " xs="3">
        <Link to={`/designerdetail/${recruit._id}`}>
          <Card className="m-0 border-0" style={{ textDecoration: 'none' }}>
            <CardHeader className="p-0">
              <DesignerCarousel test={recruit.portfolios} />
            </CardHeader>
            <CardBody className="text-dark">
              <CardSubtitle>샵 이름 넣자</CardSubtitle>
              {/* <CardSubtitle>{recruit.shop}</CardSubtitle> */}
              <CardTitle>{recruit.title}</CardTitle>
              <CardSubtitle>
                {recruit._designer.name}
                <StarRatings
                  rating={recruit.score}
                  starDimension="13px"
                  starSpacing="1px"
                  starRatedColor="#dd6866"
                  starEmptycolor="#ffffff"
                />
                {recruit.score}
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
