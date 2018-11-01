import React, { Component, Fragment } from 'react';
import { FormGroup } from 'reactstrap';
import ImgPreview from './ImgPreview';

class InfoFormExtended extends Component {
  render() {
    let profileImg;
    if (this.props.profileImg) {
      profileImg = (
        <ImgPreview
          url={this.props.profileImg}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      );
    } else {
      profileImg = (
        <Fragment>
          <span>사진 등록</span>
          <span>+</span>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <FormGroup row>
          <div className="col-3 if_head">프로필 사진</div>
          <div className="col-9 pt-3">
            <div className="if_grid three">
              <label>
                <input
                  style={{ display: 'none' }}
                  type="file"
                  name="profileImg"
                  onChange={this.props.imgChange}
                />
                <div className="if_file">{profileImg}</div>
              </label>
            </div>
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
            <div className="if_grid three">
              {this.props.num > 0
                ? this.props.portfolioImg.map((url, i) => (
                    <div className="if_file" key={i}>
                      <ImgPreview
                        url={url}
                        key={i}
                        deletePortfolio={this.props.deletePortfolio}
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    </div>
                  ))
                : null}

              <label>
                <input
                  style={{ display: 'none' }}
                  type="file"
                  name="portfolio"
                  onChange={this.props.imgChange}
                />
                <div className="if_file">
                  <span>사진 등록</span>
                  <span>+</span>
                </div>
              </label>
            </div>
          </div>
        </FormGroup>
      </Fragment>
    );
  }
}

export default InfoFormExtended;
