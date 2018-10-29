import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import firebase from 'firebase';
import axios from 'axios';
import './DesignerDetail.css';

import Header from '../components/DesignerDetail/Header';

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
      console.log(this.state.recruit);
    }

    await firebase
      .database()
      .ref('/users/' + this.state.recruit._designer._uid)
      .on('value', async res => {
        console.log(res.val());
        this.setState({ designerData: res.val() });
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
    return (
      <div className="m_containerStyle">
        <Header />
        <div style={containerStyle}>
          <div style={designerIntroHeaderStyle}>
            <div style={{ width: '75%' }}>
              <div style={designerStyle}>일태훈</div>
              <div style={titleStyle}>{this.state.recruit.title}</div>
              <div style={occupationStyle}>00헤어 청담본점 / 서울</div>
            </div>
            <div style={{ width: '25%', textAlign: 'right' }}>
              <img
                style={designerProfileStyle}
                src={this.state.designerData.profile}
              />
            </div>
          </div>
          <div style={{ ...paragraphStyle, marginTop: '3rem' }}>
            안녕하세요, ㅇㅇ 인턴 태훈입니다! 남자 여자 커트 종류 상관없이 모델
            받고 있습니다. 제품은 실제 저희 매장에서 사용하고 있는 제품으로
            합니다. 탈색 머리 2번 이상 하신분은 어려우며 여자분 기장은 최소 어깨
            아래기장 입니다. 충분한 상담 후 커트/펌/컬러 진행합니다.
          </div>
          <div>
            <div style={labelStyle}>요청사항</div>
            <div style={paragraphStyle}>
              커트: 여자분은 최소 어깨 아래기장이면 좋겠습니다. 염색: 머릿결
              손상이 너무 심하시면 어렵습니다. 양해 부탁드립니다. 그 외 다른
              부분은 모델분께 맞춰드리겠습니다! :)
            </div>
            <div style={labelStyle}>예상 시술 소요시간</div>
            <div style={paragraphStyle}>
              커트: 1시간 30분 | 염색: 3시간 | 펌: 3시간
            </div>
          </div>
          <div>
            <div style={sectionTitleStyle}>예디정보</div>
            <div>
              <div style={labelStyle}>경력 및 이력</div>
              <div style={paragraphStyle}>
                - 서경대학교 미용예술학과 졸 | 2017.03
              </div>
              <div style={paragraphStyle}>
                - 서경대학교 미용예술학과 졸 | 2017.03
              </div>
              <div style={paragraphStyle}>
                - 서경대학교 미용예술학과 졸 | 2017.03
              </div>
            </div>
            <div>
              <div style={labelStyle}>포트폴리오</div>
              <div>image</div>
            </div>
          </div>
          <div>
            <div style={{ ...sectionTitleStyle, marginBottom: '1rem' }}>
              막내리뷰
            </div>
            <div
              style={{ fontSize: '1.2rem', transform: 'translateX(-0.5rem)' }}
            >
              <span style={{ ...starStyle, fontSize: '1.2rem' }}>★ 4.3</span>
              <span
                style={{
                  color: '#2b2e34',
                  marginLeft: '1rem',
                  paddingLeft: '1rem',
                  borderLeft: 'solid 1px #b2b2b2'
                }}
              >
                리뷰 8
              </span>
            </div>
            <div>
              <div style={reviewAuthorStyle}>
                양소정
                <span style={starStyle}>★★★★★</span>
              </div>
              <div style={paragraphStyle}>2018/08/27</div>
              <div style={{ ...paragraphStyle, margin: '1rem 0' }}>
                생각보다 프로패셔널하게 서비스 받아서 좋았어요! 머리도 이쁘구
                태훈쌤이 너무 친절하게 잘 해주셔서 너무 좋았습니다. 진짜
                대만족입니다!! 너무 감사해요ㅎㅎ
              </div>
            </div>
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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
