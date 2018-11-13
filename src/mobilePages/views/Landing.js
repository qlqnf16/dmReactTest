import React, { Component, Fragment } from 'react';
import { Carousel, CarouselItem, CarouselCaption } from 'reactstrap';

import landing1 from '../../assets/images/mobile_landing1.png';
import landing2 from '../../assets/images/mobile_landing2.png';
import landing3 from '../../assets/images/mobile_landing3.png';
import icon1 from '../../assets/images/DM_Icon-03.png';
import icon2 from '../../assets/images/DM_Icon-04.png';
import icon3 from '../../assets/images/DM_Icon-05.png';
import howTo from '../../assets/images/htu.png';
import quat1 from '../../assets/images/Group2005.png';
import quat2 from '../../assets/images/Group2006.png';
import partners from '../../assets/images/partners.png';

// 개발용, 삭제하기
import { connect } from 'react-redux';
import firebase from '../../config/Firebase';
//

import './Landing.css';

const items = [
  {
    src: landing1,
    altText: 'Slide 1',
    caption: `대중이 인정한\n예비헤어디자이너에게\n안심하고 서비스를 받아보세요`
  },
  {
    src: landing3,
    altText: 'Slide 2',
    caption: '승급을 꿈꾸는 예디들의\n꿈과 가능성에 힘이 되어주세요'
  },
  {
    src: landing2,
    altText: 'Slide 3',
    caption: '커피 한 잔 가격에\n맞춤 헤어서비스를 받아보세요'
  }
];

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  // 개발용
  certification() {
    if (true) {
      firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid)
        .update({ isD: true });
    } else {
      alert('로그인부터 하세요');
    }
  }
  noCertification() {
    if (true) {
      firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid)
        .update({ isD: false });
    } else {
      alert('로그인부터 하세요');
    }
  }
  admin() {
    if (true) {
      firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid)
        .update({ isAdmin: true });
      this.props.history.push('/admin/userlist');
    } else {
      alert('로그인부터 하세요');
    }
  }
  noAdmin() {
    if (true) {
      firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid)
        .update({ isAdmin: false });
    } else {
      alert('로그인부터 하세요');
    }
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img
            src={item.src}
            alt={item.altText}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'left'
            }}
          />
          <CarouselCaption
            className="d-block m_landing_caption"
            captionHeader={item.caption.split('\n').map((line, key) => {
              return (
                <span key={key}>
                  {line}
                  <br />
                </span>
              );
            })}
            captionText=""
          />
        </CarouselItem>
      );
    });

    return (
      <Fragment>
        {/* <div
          style={{
            display: 'inline-block',
            marginTop: '20px',
            marginBottom: '20px'
          }}
        >
          <span
            style={{
              fontSize: '10px',
              fontWeight: 'bold',
              marginRight: '20px'
            }}
          >
            디자이너 권한
          </span>
          <div className="btn btn-primary" onClick={() => this.certification()}>
            등록
          </div>
          <div
            className="btn btn-warning"
            onClick={() => this.noCertification()}
          >
            해제
          </div>
        </div>
        <div style={{ display: 'inline' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 'bold',
              marginRight: '20px',
              marginLeft: '20px'
            }}
          >
            관리자 권한
          </span>
          <div className="btn btn-success" onClick={() => this.admin()}>
            등록
          </div>
          <div className="btn btn-warning" onClick={() => this.noAdmin()}>
            해제
          </div>
        </div> */}
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <div
            className="m_landing_imgback"
            style={{ background: 'transparent' }}
          >
            <div className="m_landing_ctext">
              드리머리 - 대한민국 최초 예비헤어디자이너 & 대중 연결 플랫폼
            </div>
            <div
              className="m_landing_ctext"
              style={{
                fontSize: '0.8rem',
                fontWeight: 'normal',
                color: 'white'
              }}
            >
              *드리머리에 속해있는 예비헤어디자이너들을 우리는{' '}
              <span style={{ color: '#fffae3' }}>예디</span>
              라고 부릅니다
            </div>
          </div>
          {slides}
        </Carousel>

        <div className="m_landing_back">
          <img src={icon1} alt="icon1" style={{ width: '34%' }} />
          <div className="text-left">
            <div className="m_landing_title">
              드리머리는
              <br />
              <span style={{ borderBottom: 'solid 3px #dd6866' }}>
                합리적인 가격
              </span>
              을 제시합니다
            </div>
            <div className="m_landing_content">
              다듬기만 하는데도 만원이 훌쩍 넘는 가격, 부담되셨죠? <br />
              드리머리에서 5,000원에 헤어 서비스를 받아보세요.
            </div>
          </div>
        </div>
        <div className="m_landing_back" style={{ backgroundColor: 'white' }}>
          <img src={icon2} alt="icon2" style={{ width: '34%' }} />
          <div className="text-left">
            <div className="m_landing_title">
              드리머리는
              <br />
              <span style={{ borderBottom: 'solid 3px #4c91ba' }}>
                확실한 실력
              </span>
              을 보장합니다
            </div>
            <div className="m_landing_content">
              드리머리 예디들은 자격증은 물론 수년의 견습실력을
              <br />
              갖췄습니다. 다른 사람들이 남긴 리뷰와 별점을 보고
              <br />
              내게 맞는 예디를 직접 찾아보세요.
            </div>
          </div>
        </div>
        <div className="m_landing_back">
          <img src={icon3} alt="icon3" style={{ width: '34%' }} />
          <div className="text-left">
            <div className="m_landing_title">
              드리머리는
              <br />
              <span style={{ borderBottom: 'solid 3px #dd6866' }}>
                건강한 소비
              </span>
              를 지향합니다
            </div>
            <div className="m_landing_content">
              곧 프로 헤어디자이너로 승급 할 예디들에게
              <br />
              서비스를 받을 수 있는 마지막 기회입니다.
              <br />
              예디들의 꿈과 가능성에 힘이 되어주세요.
            </div>
          </div>
        </div>
        <div
          className="m_landing_back"
          style={{ backgroundColor: 'white', padding: '0 10%' }}
        >
          <div
            className="m_landing_title"
            style={{ margin: '0 0 70px 0px', alignSelf: 'start' }}
          >
            드리머리는
            <br />
            <span style={{ borderBottom: 'solid 3px #4c91ba' }}>
              이용이 간편
            </span>
            합니다
          </div>
          <img src={howTo} alt="howTo" style={{ width: '98.7%' }} />
        </div>
        <div className="m_landing_back" style={{ backgroundColor: '#393939' }}>
          <img src={quat1} alt="quat1" style={{ width: '16.7%' }} />
          <div className="m_landing_content2">
            드리머리는 예비 전문가가 전문가로 나아가기 위해
            <br />
            필요한 것과 문제점을 찾고 해결하고자 하는{' '}
            <span style={{ fontWeight: 'bold', color: '#fffae3' }}>
              소셜벤처
            </span>
            로,
            <br />각 분야 사회 초년생{' '}
            <span style={{ fontWeight: 'bold', color: '#fffae3' }}>
              개개인의 가치를 발굴
            </span>
            하고
            <br />
            합리적 소비를 꿈꾸는{' '}
            <span style={{ fontWeight: 'bold', color: '#fffae3' }}>
              대중과 연결
            </span>
            하는 플랫폼입니다.
          </div>
          <img src={quat2} alt="quat2" style={{ width: '16.7%' }} />
        </div>
        <div className="m_landing_back" style={{ backgroundColor: '#ffffff' }}>
          <img
            src={partners}
            alt="partners"
            style={{ width: '88%', margin: '89.4px auto 0 auto' }}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Landing);
