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

const DesginerCard = props => (
  <Col xs="3">
    <Card>
      <CardHeader>
        <DesignerCarousel test={props.test} />
      </CardHeader>
      <CardBody>
        <CardSubtitle>{props.shop}</CardSubtitle>
        <CardTitle>{props.title}</CardTitle>
        <CardSubtitle>{props.name}</CardSubtitle>
        <Link to={`/designerdetail/${props.id}`}>상세 보기</Link>
      </CardBody>
    </Card>
  </Col>
);

export default DesginerCard;
