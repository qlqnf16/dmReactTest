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
  <Col className="m-0 p-0" xs="3">
    <Card className="m-0">
      <CardHeader className="p-0">
        <DesignerCarousel test={props.test} />
      </CardHeader>
      <CardBody>
        <CardSubtitle>{props.shop}</CardSubtitle>
        <CardTitle>{props.title}</CardTitle>
        <CardSubtitle>
          {props.name}
          {'  별 별 별 별 별  '}
        </CardSubtitle>
        <Link to={`/designerdetail/${props.id}`}>상세 보기</Link>
      </CardBody>
    </Card>
  </Col>
);

export default DesginerCard;
