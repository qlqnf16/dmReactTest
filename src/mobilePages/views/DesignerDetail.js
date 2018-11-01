import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import firebase from 'firebase';
import axios from 'axios';
// import './DesignerDetail.css'; todo: how to solve modal problem

import Header from '../components/DesignerDetail/Header';
import Review from '../components/DesignerDetail/Review';
import DetailCards from '../components/DesignerDetail/DetailCards';

class DesignerDetail extends Component {
  state = {
    modal: false,
    madeRequest: false,
    recruit: {},
    designerData: {}
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get(
        `http://52.79.227.227:3030/recruits/${this.props.match.params.id}`
      );
      this.setState({ recruit: data, madeRequest: true });
    }

    await firebase
      .database()
      .ref('/users/' + this.state.recruit._designer._uid)
      .on('value', async res => {
        this.setState({ designerData: res.val() });
      });
  };

  timeFormat = time => {
    return `${parseInt(time / 60, 10)}시간 ${time % 60 === 0 ? '' : '30분'}`;
  };

  loginToggleHandler = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };

  submitReservation = async (
    price,
    time,
    service,
    serviceFormat,
    startTime,
    recruit,
    cardData
  ) => {
    if (Object.values(serviceFormat).length === 0)
      return alert('받을 서비스를 선택해 주세요');
    await this.props.history.push({
      pathname: `/reservation`,
      state: {
        price,
        time,
        service,
        serviceFormat,
        startTime,
        recruit,
        cardData
      }
    });
  };

  render() {
    const {
      containerStyle,
      designerIntroHeaderStyle,
      designerStyle,
      titleStyle,
      occupationStyle,
      labelStyle,
      paragraphStyle,
      sectionTitleStyle,
      reviewAuthorStyle,
      starStyle,
      designerProfileStyle,
      buttonStyle
    } = styles;
    const designer = this.state.designerData;
    const recruit = this.state.recruit;

    let shops = '';
    if (designer.addresses) {
      designer.addresses.forEach(address => {
        shops += `/ ${address.extraAddress}`;
      });
      shops = shops.substring(1);
    }

    const portfolios = [];
    for (let i = 0; designer[`portfolio${i}`]; i++) {
      portfolios.push(designer[`portfolio${i}`]);
    }
    return (
      <div className="m_containerStyle">
        <Header />
        <div style={containerStyle}>
          <div style={designerIntroHeaderStyle}>
            <div style={{ width: '75%' }}>
              <div style={designerStyle}>{designer.name}</div>
              <div style={titleStyle}>{recruit.title}</div>
              <div style={occupationStyle}>{shops}</div>
            </div>
            <div style={{ width: '25%', textAlign: 'right' }}>
              <img style={designerProfileStyle} src={designer.profile} />
            </div>
          </div>
          <div style={{ ...paragraphStyle, marginTop: '3rem' }}>
            {designer.introduce}
          </div>
          <div>
            <div style={labelStyle}>요청사항</div>
            <div style={paragraphStyle}>{recruit.requirement}</div>
            <div style={labelStyle}>예상 시술 소요시간</div>
            <div style={paragraphStyle}>
              커트:{' '}
              {this.timeFormat(recruit.requireTime && recruit.requireTime.cut)}{' '}
              | 염색:{' '}
              {this.timeFormat(recruit.requireTime && recruit.requireTime.dye)}{' '}
              | 펌:{' '}
              {this.timeFormat(recruit.requireTime && recruit.requireTime.perm)}
            </div>
          </div>
          <div>
            <div style={sectionTitleStyle}>예디정보</div>
            <div>
              <div style={labelStyle}>경력 및 이력</div>
              <pre style={paragraphStyle}>{designer.careerDetail}</pre>
            </div>
            <div>
              {/* todo: modal(big picture) show when clicked */}
              <div style={labelStyle}>포트폴리오</div>
              <div>
                {portfolios.map(portfolio => (
                  <img
                    alt="alt"
                    key={portfolio}
                    src={portfolio}
                    className="col-4"
                    style={{ padding: '0', width: '100%', height: '100%' }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <div style={{ ...sectionTitleStyle, marginBottom: '1rem' }}>
              막내리뷰
            </div>
            <div
              style={{ fontSize: '1.2rem', transform: 'translateX(-0.5rem)' }}
            >
              <span style={{ ...starStyle, fontSize: '1.2rem' }}>
                ★ {recruit.score}
              </span>
              <span
                style={{
                  color: '#2b2e34',
                  marginLeft: '1rem',
                  paddingLeft: '1rem',
                  borderLeft: 'solid 1px #b2b2b2'
                }}
              >
                리뷰 {recruit._reviews && recruit._reviews.length}
              </span>
            </div>
            {recruit._reviews &&
              recruit._reviews.map((review, key) => (
                <Review key={key} review={review} />
              ))}
          </div>
          {/* fixed button 때문에 만들어놓은 임시 div */}
          <div style={{ height: 100 }} />
          <div
            style={{
              backgroundColor: 'white',
              height: 100,
              position: 'fixed',
              bottom: '0%',
              width: '85%'
            }}
          >
            <div style={buttonStyle} onClick={this.toggleModal}>
              날짜/시간 선택하기
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModal} />
          <ModalBody>
            <DetailCards
              recruit={this.state.recruit}
              loginToggle={this.loginToggleHandler}
              submitReservation={this.submitReservation}
            />
          </ModalBody>
          <ModalFooter>
            <div
              style={{ ...buttonStyle, width: '100%' }}
              onClick={this.toggleModal}
            >
              <Link
                style={{ color: 'white' }}
                to={{ pathname: `/reservation/${this.props.id}`, state: {} }}
              >
                결제하기
              </Link>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const styles = {
  containerStyle: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  designerIntroHeaderStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '5%'
  },
  designerProfileStyle: {
    width: '80%',
    borderRadius: '50%'
  },
  labelStyle: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#dd6866',
    marginTop: '2.5rem',
    marginBottom: '1.1rem'
  },
  designerStyle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#2b2e34'
  },
  titleStyle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1e3354'
  },
  occupationStyle: {
    fontSize: '1.1rem',
    color: '#2b2e34'
  },
  paragraphStyle: {
    fontSize: '1.3rem',
    color: '#2b2e34'
  },
  sectionTitleStyle: {
    width: '23.5%',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1e3354',
    borderBottom: 'solid 2px #1e3354',
    marginTop: '2.7rem',
    marginBottom: '2.3rem',
    paddingBottom: '0.3rem'
  },
  reviewAuthorStyle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#2b2e34',
    paddingTop: '2.2rem'
  },
  starStyle: {
    fontSize: '1.1rem',
    color: '#dd6866',
    marginLeft: '0.4rem'
  },
  buttonStyle: {
    height: '3.9rem',
    color: 'white',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginTop: '2.5rem',
    marginBottom: '4rem',
    borderRadius: 6,
    backgroundColor: '#dd6866',
    textAlign: 'center',
    lineHeight: '3.9rem'
  }
};

export default DesignerDetail;
