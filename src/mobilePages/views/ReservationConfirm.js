import React, { Component } from 'react';
import Header from '../components/ReservationConfirm/Header';
import completeIcon from '../../assets/images/check_lg.png';
import womanBack from '../../assets/images/m_woman_back.png';

class ReservationConfirm extends Component {
  render() {
    const {
      containerStyle,
      cautionSectionStyle,
      sectionTitleStyle,
      pricingStyle,
      buttonStyle,
      labelStyle
    } = styles;

    return (
      <div className="m_containerStyle">
        <Header />
        <div style={containerStyle}>
          <div style={{ textAlign: 'center' }}>
            <img
              style={{ width: '20%', margin: '2rem 0 1.5rem 0' }}
              src={completeIcon}
            />
            <div
              style={{ color: '#1e3354', fontSize: '3rem', fontWeight: 'bold' }}
            >
              예약이 완료되었습니다.
            </div>
            <div
              style={{
                color: '#4c91ba',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}
            >
              예약번호: M7187722556
            </div>
            <div
              style={{
                margin: '2rem 0 3rem 0',
                fontSize: '1.3rem',
                color: '#1e3354'
              }}
            >
              박지윤님께 최선을 다해서 노력하는 <br />
              이태훈 막내! 예쁘게 봐주세요~ ^.^
            </div>
          </div>
          <div style={cautionSectionStyle}>
            <div style={sectionTitleStyle}>※ 유의사항</div>
            <div>
              <p>
                우리 막내는 프로 헤어디자이너가 아닌 예비 헤어디자이너 입니다.
                막내의 레벨에 따라 선생님들의 코칭이 있을수있으니 당황하지
                마세요! :)
              </p>
              <p>
                당일예약은 취소 및 환불이 불가능하며, 당일 예약이 아닌 경우
                표기된 취소 수수료 정책을 따릅니다. 막내 사정에 의한 취소 발생
                시 100% 환불 처리됩니다.
              </p>
              <p>
                막내 사정으로 스케줄 및 장소가 변경될 수 있습니다. 이 경우
                안내메시지를 보내드리니 확인바랍니다.
              </p>
              <p>
                염색, 펌 등 추가비용이 발생하는 서비스에 대해서는 본 플랫폼이
                아닌 현장에서 결제해주셔야 합니다.
              </p>
            </div>
            <div style={pricingStyle}>
              <div style={{ ...sectionTitleStyle, textAlign: 'center' }}>
                서비스 예상 금액
                <br />
                <span style={{ fontSize: '1.5rem' }}>30,000원(+기장)</span>
              </div>
              <div>기장별 추가금액 안내</div>
              <div className="row" style={{ margin: '2% 0 10% 0' }}>
                <div className="col-3 p-0">
                  <img
                    style={{ width: '100%', transform: 'translateY(14%)' }}
                    src={womanBack}
                    alt="alt"
                  />
                </div>
                <div
                  className="col-3 pr-0"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                  }}
                >
                  <span
                    style={{ ...labelStyle, margin: 0, color: 'transparent' }}
                  >
                    .
                  </span>
                  <span style={{ ...labelStyle, margin: 0, padding: '0.7rem' }}>
                    기본
                  </span>
                  <span style={{ ...labelStyle, margin: 0, padding: '0.7rem' }}>
                    턱아래
                  </span>
                  <span style={{ ...labelStyle, margin: 0, padding: '0.7rem' }}>
                    어깨아래
                  </span>
                  <span style={{ ...labelStyle, margin: 0, padding: '0.7rem' }}>
                    가슴아래
                  </span>
                </div>
                <div
                  className="col-3 pl-0 text-center"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                  }}
                >
                  <div style={{ ...labelStyle, margin: 0 }}>펌</div>
                  <div>
                    <div
                      className="addingPrice"
                      style={{ fontSize: '1rem', padding: '0.7rem' }}
                    >
                      + 1000 원
                    </div>
                  </div>
                  <div>
                    <div
                      className="addingPrice"
                      style={{ fontSize: '1rem', padding: '0.7rem' }}
                    >
                      + 1000 원
                    </div>
                  </div>
                  <div>
                    <div
                      className="addingPrice"
                      style={{ fontSize: '1rem', padding: '0.7rem' }}
                    >
                      + 1000 원
                    </div>
                  </div>
                  <div>
                    <div
                      className="addingPrice"
                      style={{ fontSize: '1rem', padding: '0.7rem' }}
                    >
                      + 1000 원
                    </div>
                  </div>
                </div>
                <div
                  className="col-3 pl-0 text-center"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                  }}
                >
                  <div style={{ ...labelStyle, margin: 0 }}>염색</div>
                  <div>
                    <div
                      className="addingPrice"
                      style={{ fontSize: '1rem', padding: '0.7rem' }}
                    >
                      + 1000 원
                    </div>
                  </div>
                  <div>
                    <div
                      className="addingPrice"
                      style={{ fontSize: '1rem', padding: '0.7rem' }}
                    >
                      + 1000 원
                    </div>
                  </div>
                  <div>
                    <div
                      className="addingPrice"
                      style={{ fontSize: '1rem', padding: '0.7rem' }}
                    >
                      + 1000 원
                    </div>
                  </div>
                  <div>
                    <div
                      className="addingPrice"
                      style={{ fontSize: '1rem', padding: '0.7rem' }}
                    >
                      + 1000 원
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={buttonStyle}>예약 확인/취소</div>
          <div style={buttonStyle}>예디에게 메시지</div>
          {/* 밑에 여백 주기 위해 추가함 */}
          <div style={{ height: 100 }} />
        </div>
      </div>
    );
  }
}

const styles = {
  containerStyle: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    alignItems: 'center'
  },
  cautionSectionStyle: {
    borderRadius: 25,
    border: 'solid 2px #f8cfc9',
    backgroundColor: 'rgba(221, 104, 102, 0.07)',
    padding: '5%',
    marginBottom: '3rem',
    fontSize: '1.3rem',
    color: '#2b2e34'
  },
  pricingStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '3.5rem'
  },
  sectionTitleStyle: {
    color: '#dd6866',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  buttonStyle: {
    width: '100%',
    height: '3.9rem',
    color: 'white',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    borderRadius: 6,
    backgroundColor: '#dd6866',
    textAlign: 'center',
    lineHeight: '3.9rem'
  },
  labelStyle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#1e3354',
    marginTop: '1.5rem',
    marginBottom: '0.2rem'
  }
};

export default ReservationConfirm;
