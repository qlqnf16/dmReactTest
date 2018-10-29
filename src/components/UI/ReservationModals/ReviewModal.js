import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Moment from 'react-moment';
import StarRatings from 'react-star-ratings';
import fd from 'form-data';
import ImgPreview from '../../../components/InfoForm/ImgPreview';

import { Modal, ModalBody } from 'reactstrap';

class ReviewModal extends Component {
  state = {
    content: null,
    score: 0.0001,
    reviewImg: [],
    reviewImgFile: [],
    num: 0
  };

  changeRating = score => {
    this.setState({ score });
  };
  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  handleImgChange = e => {
    let file = e.target.files[0];
    this.state.reviewImg.push(URL.createObjectURL(file));
    this.state.reviewImgFile.push(file);
    this.setState({ num: this.state.num + 1 });
    console.log(this.state);
  };

  deleteImg = e => {
    let foundFile = this.state.reviewImg.findIndex(url => url === e.target.src);
    this.state.reviewImg.splice(foundFile, 1);
    this.state.reviewImgFile.splice(foundFile, 1);
    this.setState({ num: this.state.num - 1 });
  };

  toggle = () => {
    this.setState({ score: 0 });
    this.props.toggle();
  };

  reviewSubmit = async () => {
    const reviewData = {
      content: this.state.content,
      score: this.state.score,
      _user: this.props.userData._id,
      _reservation: this.props.reservation._id
    };

    if (Object.values(reviewData).includes(null) || this.state.content === '')
      return alert('채워지지 않은 정보가 있습니다');

    // review 생성
    const { data } = await axios.post(
      `http://52.79.227.227:3030/recruits/${
        this.props.reservation._designer._recruit._id
      }/reviews`,
      reviewData
    );

    // 사진 업로드
    const formData = new fd();
    this.state.reviewImgFile.forEach((p, index) => {
      formData.append(`review${index}`, p);
    });
    await axios.patch(
      `http://52.79.227.227:3030/recruits/${
        this.props.reservation._designer._recruit._id
      }/reviews/${data._id}/images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    await alert('성공적으로 등록되었습니다');
    await this.props.toggle();
    await this.props.reloadData();
  };

  render() {
    if (this.props.reservation) {
      let since = '';
      let until = '';
      let services = '';
      if (this.props.reservation.time) {
        since = `${parseInt(this.props.reservation.time.since / 60, 10)}:${
          this.props.reservation.time.since % 60 === 0 ? '00' : '30'
        }`;
        until = `${parseInt(this.props.reservation.time.until / 60, 10)}:${
          this.props.reservation.time.until % 60 === 0 ? '00' : '30'
        }`;
        Object.keys(this.props.reservation.services).forEach(service => {
          switch (service) {
            case 'cut':
              services += '/ 컷트 ';
              break;
            case 'perm':
              services += '/ 펌 ';
              break;
            case 'dye':
              services += '/ 염색 ';
              break;
            default:
              break;
          }
        });
        services = services.substring(1);
      }
      return (
        <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
          <ModalBody className="m-4">
            <p className="m_title">예약 정보</p>
            <div className="m_content mb-5">
              <p>
                <span style={{ fontWeight: 'bold' }}>예디 :</span>{' '}
                {this.props.reservation._designer &&
                  this.props.reservation._designer.name}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>날짜/시간 :</span>{' '}
                <Moment format="YYYY/MM/DD">
                  {this.props.reservation.date}
                </Moment>{' '}
                {since} ~ {until}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>서비스 :</span> {services}
              </p>
            </div>
            <div className="row">
              <p className="m_title col-2">리뷰</p>
              <div className="col-9 m-0">
                <StarRatings
                  rating={this.state.score}
                  starRatedColor="#dd6866"
                  starEmptycolor="#ffffff"
                  changeRating={this.changeRating}
                  starDimension="2rem"
                  starSpacing="1px"
                />
                {/* <input
                  type="range"
                  name="score"
                  id="score"
                  min="0"
                  max="5"
                  step="0.5"
                  onChange={this.inputChangeHandler}
                /> */}
              </div>
            </div>
            <textarea
              className="m_input"
              name="content"
              id="content"
              onChange={this.inputChangeHandler}
            />
            <div className="text-center row">
              <div className="col-12">
                {this.state.num > 0
                  ? this.state.reviewImg.map((url, i) => (
                      <ImgPreview
                        url={url}
                        key={i}
                        deletePortfolio={this.deleteImg}
                      />
                    ))
                  : null}
              </div>
              <input
                className="col-8"
                type="file"
                name="reviewImg"
                onChange={e => this.handleImgChange(e)}
              />
              <div
                className="m_button m_button_green btn col-3"
                onClick={this.reviewSubmit}
              >
                리뷰 등록
              </div>
            </div>
          </ModalBody>
        </Modal>
      );
    } else {
      return <div />;
    }
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(ReviewModal);
