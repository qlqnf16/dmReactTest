import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../config/Axios';
import Moment from 'react-moment';
import StarRatings from 'react-star-ratings';
import fd from 'form-data';
import ImgPreview from '../../../components/InfoForm/ImgPreview';

import { Modal, ModalBody } from 'reactstrap';

class ChangeReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      score: 3,
      reviewImg: [],
      reviewImgFile: [],
      num: 0,
      fileNum: 0,
      submitRequest: true
    };
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const isReservationChange =
      this.props.reservation !== nextProps.reservation;
    const isFinishSetstate = this.state.score !== nextState.score;
    const isImgChange = this.state.num !== nextState.num;
    const isTextChange = this.state.content !== nextState.content;
    const isSubmitRequest =
      this.state.submitRequest !== nextState.submitRequest;
    return (
      isReservationChange ||
      isFinishSetstate ||
      isImgChange ||
      isTextChange ||
      isSubmitRequest
    );
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.reservation &&
      this.props.reservation._review &&
      this.props.reservation._review.content &&
      prevProps.reservation !== this.props.reservation
    ) {
      const { content, score, images } = this.props.reservation._review;
      this.setState({
        score,
        content,
        reviewImg: images,
        num: images.length,
        madeRequest: true
      });
    }
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
    this.setState({ num: this.state.num + 1, fileNum: this.state.fileNum + 1 });
  };

  deleteImg = e => {
    if (
      !window.confirm('사진이 바로 삭제됩니다. 삭제하시려면 확인을 눌러주세요.')
    )
      return;
    const fakeImg = this.state.num - this.state.fileNum;
    let foundFile = this.state.reviewImg.findIndex(url => url === e.target.src);
    this.state.reviewImg.splice(foundFile, 1);
    this.setState({ num: this.state.num - 1 });
    // 실제 파일을 지운 경우
    if (foundFile >= fakeImg) {
      this.state.reviewImgFile.splice(foundFile - fakeImg, 1);
      this.setState({ fileNum: this.state.fileNum - 1 });
    } else {
      axios.delete(
        `recruits/${this.props.reservation._designer._recruit._id}/reviews/${
          this.props.reservation._review._id
        }/images/${foundFile}`
      );
    }
  };

  toggle = () => {
    this.setState({ score: 0 });
    this.props.toggle();
  };

  reviewSubmit = async () => {
    this.setState({ submitRequest: false });
    const reviewData = {
      content: this.state.content,
      score: this.state.score,
      _user: this.props.userData._id,
      _reservation: this.props.reservation._id
    };

    if (Object.values(reviewData).includes(null) || this.state.content === '')
      return alert('채워지지 않은 정보가 있습니다');

    // review 생성
    const { data } = await axios.patch(
      `recruits/${this.props.reservation._designer._recruit._id}/reviews/${
        this.props.reservation._review._id
      }`,
      reviewData
    );

    // // 사진 업로드
    const formData = new fd();
    this.state.reviewImgFile.forEach((p, index) => {
      formData.append(`review${index}`, p);
    });
    await axios.patch(
      `recruits/${this.props.reservation._designer._recruit._id}/reviews/${
        data._id
      }/images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    this.setState({ submitRequest: true });
    alert('성공적으로 등록되었습니다');
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
              services += '/ 커트 ';
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
        <Modal isOpen={this.props.isOpen} centered toggle={this.toggle}>
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
              </div>
            </div>
            <textarea
              className="m_input"
              name="content"
              id="content"
              onChange={this.inputChangeHandler}
              value={this.state.content}
            />
            <div className="text-center">
              <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                {this.state.num > 0
                  ? this.state.reviewImg.map((url, i) => (
                      <div style={{ width: '50%', padding: '1px' }} key={i}>
                        <ImgPreview
                          url={url}
                          key={i}
                          deletePortfolio={this.deleteImg}
                          style={{ width: '100%' }}
                        />
                      </div>
                    ))
                  : null}
              </div>
              <div
                style={{
                  marginTop: '3rem',
                  display: 'grid',
                  gridTemplateColumns: '78% 20%',
                  gridGap: '2%'
                }}
              >
                <div>
                  <label style={{ display: 'block' }}>
                    <div className="m_file">
                      [사진 등록]해서 적극적으로 응원하기!
                    </div>
                    <input
                      style={{ display: 'none' }}
                      type="file"
                      name="reviewImg"
                      onChange={e => this.handleImgChange(e)}
                    />
                  </label>
                </div>
                {this.state.submitRequest ? (
                  <div
                    className="m_button m_button_green"
                    style={{ width: '100%', margin: 0, height: '30.5px' }}
                    onClick={this.reviewSubmit}
                  >
                    리뷰 수정
                  </div>
                ) : (
                  <div
                    className="m_button m_button_green"
                    style={{
                      width: '100%',
                      margin: 0,
                      height: '30.5px',
                      cursor: 'default',
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      color: 'rgb(31, 51, 84)',
                      fontWeight: 'normal'
                    }}
                  >
                    저장중
                  </div>
                )}
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

export default connect(mapStateToProps)(ChangeReviewModal);
