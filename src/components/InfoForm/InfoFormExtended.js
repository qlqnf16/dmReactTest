import React, { Component, Fragment } from 'react';
import { FormGroup, Label, Input, Col } from 'reactstrap';
import ImgPreview from './ImgPreview';

class InfoFormExtended extends Component {
  render() {
    return (
      <Fragment>
        <FormGroup row>
          <Label for="profile" sm={2}>
            프로필 사진
          </Label>
          <Col sm={10}>
            <div>
              <ImgPreview url={this.props.profileImg} />
            </div>
            <input
              type="file"
              name="profileImg"
              onChange={this.props.imgChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="profileDetail" sm={2}>
            자기소개
          </Label>
          <Col sm={10}>
            <Input
              type="textarea"
              name="introduce"
              id="introduce"
              onChange={this.props.changeInput}
              value={this.props.state.introduce}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="portfolio" sm={2}>
            포트폴리오
          </Label>
          <Col sm={10}>
            <div>
              {this.props.num > 0
                ? this.props.portfolioImg.map((url, i) => (
                    <ImgPreview
                      url={url}
                      key={i}
                      deletePortfolio={this.props.deletePortfolio}
                    />
                  ))
                : null}
            </div>
            <input
              type="file"
              name="portfolio"
              onChange={this.props.imgChange}
            />
          </Col>
        </FormGroup>
      </Fragment>
    );
  }
}

export default InfoFormExtended;
