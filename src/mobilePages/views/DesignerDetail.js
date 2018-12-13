import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import firebase from 'firebase';
import axios from '../../config/Axios';
// import './DesignerDetail.css'; todo: how to solve modal problem

import Header from '../components/DesignerDetail/Header';
import Review from '../components/DesignerDetail/Review';
import DetailCards from '../components/DesignerDetail/DetailCards';
import MyModal from '../../components/UI/MyModal/MyModal';
import ShowLargeImage from '../../components/DesignerDetail/ShowLargeImage';

class DesignerDetail extends Component {
  state = {
    modal: false,
    madeRequest: false,
    recruit: {},
    designerData: {},
    showLargeImage: false,
    showLogin: false
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get(
        `recruits/${this.props.match.params.id}`
      );
      this.setState({
        recruit: data,
        madeRequest: true,
        isLogin: this.props.userData.uid
      });
      await this.authListener();
    }

    await firebase
      .database()
      .ref('/users/' + this.state.recruit._designer._uid)
      .on('value', async res => {
        this.setState({ designerData: res.val() });
      });
  };

  authListener() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user && firebase.auth().currentUser) {
        this.setState({ isLogin: true });
      } else {
        this.setState({ isLogin: false });
      }
    });
  }

  loginToggleHandler = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };
  offHandler = () => {
    this.setState({ showLogin: false });
  };

  timeFormat = time => {
    return `${parseInt(time / 60, 10)}시간 ${time % 60 === 0 ? '' : '30분'}`;
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
    // if (true) return alert('아직 이용하실 수 없습니다.');

    // 비로그인시 로그인 모달
    if (!this.state.isLogin && this.state.madeRequest) {
      await this.toggleModal();
      await this.loginToggleHandler();
      return;
    }

    if (this.props.userData && this.props.userData.isD)
      return alert('디자이너는 예약 할 수 없습니다.');

    if (Object.values(serviceFormat).length === 0)
      return alert('받을 서비스를 선택해 주세요');
    if (!startTime) return alert('받을 시간을 선택해 주세요');
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

  // 사진 크게보기
  showLargeImageToggle = src => {
    this.setState({
      showLargeImage: !this.state.showLargeImage,
      largeImage: src
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
      starStyle,
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

    let portfolios = [];
    if (designer.portfolios) portfolios = designer.portfolios;

    let reservable;
    if (this.state.recruit && this.state.recruit._cards) {
      reservable = this.state.recruit._cards.some(
        card => card.date > new Date().getTime() && card.reservable
      )
        ? true
        : false;
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
            <div
              style={{
                width: 64,
                height: 64,
                textAlign: 'right',
                borderRadius: '50%',
                backgroundImage: `url(${designer.profile})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }}
            />
          </div>
          <pre style={{ ...paragraphStyle, marginTop: '3rem' }}>
            {designer.introduce}
          </pre>
          <div
            style={{
              border: '1px solid rgba(76, 145, 186, 0.6)',
              borderRadius: '5px',
              padding: '1.5rem',
              marginTop: '2rem'
            }}
          >
            <div style={{ ...labelStyle, marginTop: 0 }}>요청사항</div>
            <pre style={paragraphStyle}>{recruit.requirement}</pre>
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
              <div className="row wrap">
                {portfolios.map(portfolio => (
                  <div className="col-4 px-1 my-1">
                    <div
                      key={portfolio}
                      style={{
                        height: 100,
                        backgroundImage: `url(${portfolio})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                      // style={{ padding: '0', width: '100%', height: '100%' }}
                      onClick={() => this.showLargeImageToggle(portfolio)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div style={{ ...sectionTitleStyle, marginBottom: '1rem' }}>
              예디리뷰
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
                <Review
                  key={key}
                  review={review}
                  showLargeImageToggle={this.showLargeImageToggle}
                />
              ))}
          </div>
          {/* fixed button 때문에 만들어놓은 임시 div */}
          <div style={{ height: 100 }} />
          <div
            style={{
              height: 90,
              position: 'fixed',
              left: 0,
              bottom: '0%',
              width: '100%',
              backgroundColor: 'white'
            }}
          >
            {reservable ? (
              <div
                style={{
                  ...buttonStyle,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '85%'
                }}
                onClick={this.toggleModal}
              >
                날짜/시간 선택하기
              </div>
            ) : (
              <div
                style={{
                  ...buttonStyle,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '85%',
                  backgroundColor: 'rgba(0,0,0,0.5)'
                }}
              >
                현재 예약 가능한 스케줄이 없습니다
              </div>
            )}
          </div>
        </div>
        <MyModal
          showLogin={this.state.showLogin}
          off={this.loginToggleHandler}
          type="login"
        />
        <ShowLargeImage
          isOpen={this.state.showLargeImage}
          toggle={this.showLargeImageToggle}
          src={this.state.largeImage}
        />
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModal} />
          <ModalBody>
            <DetailCards
              recruit={this.state.recruit}
              submitReservation={this.submitReservation}
            />
          </ModalBody>
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
    width: '100%',
    height: '100%',
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
    width: '40%',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1e3354',
    borderBottom: 'solid 2px #1e3354',
    marginTop: '2.7rem',
    marginBottom: '2.3rem',
    paddingBottom: '0.3rem'
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

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(DesignerDetail);
