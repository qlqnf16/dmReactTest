import React, { Component, Fragment } from 'react';
import { FormGroup } from 'reactstrap';
import ImgPreview from './ImgPreview';

class InfoFormExtended extends Component {
  render() {
    return (
      <Fragment>
        <FormGroup row>
          <div className="col-3 if_head">프로필 사진</div>
          <div className="col-9 pt-3">
            <ImgPreview url={this.props.profileImg} />
            <input
              type="file"
              name="profileImg"
              onChange={this.props.imgChange}
            />
          </div>
        </FormGroup>
        <FormGroup row>
          <div className="col-3 if_head">자기소개</div>
          <div className="col-9">
            <textarea
              name="introduce"
              id="introduce"
              onChange={this.props.changeInput}
              value={this.props.state.introduce}
              className="if_input"
              style={{ height: '7rem' }}
            />
          </div>
        </FormGroup>
        <FormGroup row>
          <div className="col-3 if_head">포트폴리오</div>
          <div className="col-9 pt-3">
            {this.props.num > 0
              ? this.props.portfolioImg.map((url, i) => (
                  <ImgPreview
                    url={url}
                    key={i}
                    deletePortfolio={this.props.deletePortfolio}
                  />
                ))
              : null}
            <input
              type="file"
              name="portfolio"
              onChange={this.props.imgChange}
            />
          </div>
        </FormGroup>
        {/* <FormGroup row>
          <Label for="portfolio" xs={2}>
            포트폴리오
          </Label>
          <Col xs={10}>
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
        </FormGroup> */}
      </Fragment>
    );
  }
}

export default InfoFormExtended;
