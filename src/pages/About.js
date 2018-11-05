import React, { Component } from 'react';

import icon1 from '../assets/images/9.png';
import icon2 from '../assets/images/DM_Icon-03.png';
import icon3 from '../assets/images/DM_Icon-05.png';
import backimg from '../assets/images/8.png';
import profile1 from '../assets/images/7.png';
import profile2 from '../assets/images/6.png';
import profile3 from '../assets/images/5.png';
import profile4 from '../assets/images/4.png';
import profile5 from '../assets/images/3.png';
import profile6 from '../assets/images/2.png';
import profile7 from '../assets/images/1.png';
import logo from '../assets/images/logo.png';

class About extends Component {
  render() {
    return (
      <div className="container-fluid text-center p-0">
        <iframe
          width="1280"
          height="720"
          src="https://www.youtube.com/embed/jepipiX0KN8?autohide=1&autoplay=1&loop=1&rel=0&controls=0&modestbranding=0&showinfo=0"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style={{ marginBottom: '30px' }}
        />
        <div className="about_1">
          꿈꾸는 이에게는 기회를,
          <br />
          꿈의 헤어스타일을 원하는 이에게는 기쁨을.
        </div>
        <div className="about_bar" />
        <div className="about_2">
          <span style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>
            여러분에게는 꿈을 위한 기회가 충분히 주어졌었나요?
          </span>
          <br />
          <br />
          전문가만을 원하는 이 사회에서,
          <br />
          <span style={{ backgroundColor: '#ffe8e5' }}>
            꿈꾸는 이에게 충분한 기회를 주기 위해
            <br />
            드리머리가 첫 번째 따뜻한 도전을 시작합니다.
          </span>
          <br />
          <br />
          <br />
          <br />
          <span style={{ color: '#dd6866' }}>
            드리머리의 첫 번째 꿈은{' '}
            <span style={{ fontWeight: 'bold' }}>예비헤어디자이너</span>의
            꿈입니다.
          </span>
          <br />
          <br />
          <br />
          <br />
          예비헤어디자이너가 승급을 하기 위해서는 <br />
          실력과 별개로 수많은 연습모델을 필요로하지만
          <br />
          그들의 실력을 증명할 방법이 없어 모델을 구하지 못합니다.
          <br />
          <br />
          <br />
          <br />
          그래서 드리머리는
          <br />
          공인자격증 검증, 다른 사람들의 리뷰, 헤어디자이너의 포트폴리오, 환불
          시스템을 통해
          <br />
          <span style={{ backgroundColor: '#ffe8e5' }}>
            안심하고 예약할 수 있는 서비스
          </span>
          를 만들었습니다.
        </div>
        <div className="about_bar" />
        <div
          className="about_1"
          style={{ fontSize: '2rem', marginBottom: '56px' }}
        >
          드리머리는 이래서 특별합니다.
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ margin: '0 95px' }}
        >
          <div>
            <img
              alt="alt"
              src={icon1}
              style={{ width: '33%', marginBottom: '36.9px' }}
            />
            <div className="about_2" style={{ fontSize: '1.5rem' }}>
              <span className="about_highlight">
                대중이 인정한, 실패 없는 헤어서비스
              </span>
              <br />
              <br />
              자격증은 물론 수년의 견습경력을 갖춘
              <br />
              예비헤어디자이너들이기 때문에 검증된 품질의
              <br />
              서비스를 받으실 수 있습니다. 다른사람들이 남긴
              <br />
              생생한 후기, 포트폴리오 등을 통해 직접 확인하고
              <br />
              믿고 예약할 수 있습니다.
            </div>
          </div>
          <div>
            <img
              alt="alt"
              src={icon2}
              style={{ width: '33%', marginBottom: '36.9px' }}
            />
            <div className="about_2" style={{ fontSize: '1.5rem' }}>
              <span className="about_highlight">
                커피 한 잔 가격의 헤어서비스
              </span>
              <br />
              <br />
              컷트: <span style={{ fontWeight: 'bold' }}>5,000원</span>
              <br />
              염색 / 펌 평균:{' '}
              <span style={{ fontWeight: 'bold' }}>35,000원</span>
              <br />
              <br />
              누구에게는 부담스러울 수 있었던 헤어서비스를
              <br />
              누구든지 누릴 수 있는 가격으로 제공해 드립니다.
            </div>
          </div>
          <div>
            <img
              alt="alt"
              src={icon3}
              style={{ width: '33%', marginBottom: '36.9px' }}
            />
            <div className="about_2" style={{ fontSize: '1.5rem' }}>
              <span className="about_highlight">
                디자이너의 꿈을 응원하는 서비스
              </span>
              <br />
              <br />곧 프로 헤어디자이너로 승급 할<br />
              예비헤어디자이너들에게 서비스를 받음으로써
              <br />
              그들이 꿈에 한 발자국 다가갈 수 있게
              <br />
              든든한 조력자의 역할이 됩니다.
            </div>
          </div>
        </div>
        <div className="about_bar" />
        <div className="about_1">드리머리의 시작</div>
        <div style={{ position: 'relative' }}>
          <img alt="alt" src={backimg} className="about_backImg" />
          <div className="about_textBack">
            <div className="about_textOnImg">
              두 대표는 ‘멋쟁이 사자처럼' 이라는 프로그래밍 교육 동아리에서
              만났습니다. <br />
              함께 밤새 코딩하고 동고동락 하며 공동창업을 결심하게 되었습니다.
              <br />
              <br />
              <span style={{ fontSize: '3.3rem', lineHeight: '1.48' }}>
                “우리와 같은 사회초년생들이 <br />
                마음껏 꿈을 꿀 수 있는 환경을 만들어보자”
                <br />
                <br />
                <br />
              </span>
              이를 이루기 위해 드리머리는 각 분야 최고의 능력자들을
              납치했습니다.
            </div>
          </div>
          <div style={{ margin: '0 auto', width: 'fit-content' }}>
            <div className="about_profileBack">
              <img alt="alt" src={profile1} style={{ width: '53px' }} />
              <div className="about_profile">
                <span style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>
                  심건우 (CEO)
                </span>
                <br />
                그간 패배한적 없는 인생을 살았으나, 이태훈과의 스타크래프트를
                통해 본인을 낮추는 법을 배우기 시작.
              </div>
            </div>
            <div className="about_profileBack">
              <img alt="alt" src={profile2} style={{ width: '53px' }} />
              <div className="about_profile">
                <span style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>
                  이태훈 (CEO)
                </span>
                <br />
                먹을 걸 보면 입부터 튀어나가는 동물적 감각의 소유자. 그런 그가
                수저가 아닌 가위를 들었으니, 그게 바로 드리머리.
              </div>
            </div>
            <div className="about_profileBack">
              <img alt="alt" src={profile3} style={{ width: '53px' }} />
              <div className="about_profile">
                <span style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>
                  박지윤 (Designer)
                </span>
                <br />
                유학 9년차 미국 명문 디자인스쿨 출신이나, 트럼프의 벽에
                가로막혀(?) 드리머리 입단.
              </div>
            </div>
            <div className="about_profileBack">
              <img alt="alt" src={profile4} style={{ width: '53px' }} />
              <div className="about_profile">
                <span style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>
                  안운장 (Developer)
                </span>
                <br />별 이상한 것 다 만들어버림 ex) 안드로이드 커스텀룸, 공군
                관우시계......읍읍
              </div>
            </div>
            <div className="about_profileBack">
              <img alt="alt" src={profile5} style={{ width: '53px' }} />
              <div className="about_profile">
                <span style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>
                  오상우 (Developer)
                </span>
                <br />
                심리학과를 전공했으나 자신의 심리는 읽지 못해서 드리머리 입단.
              </div>
            </div>
            <div className="about_profileBack">
              <img alt="alt" src={profile6} style={{ width: '53px' }} />
              <div className="about_profile">
                <span style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>
                  신한결 (Developer)
                </span>
                <br />
                “야 그걸 언제 다해?” 라고 하면서 이미 다 해놓음. 전형적인
                츤데레.
              </div>
            </div>
            <div className="about_profileBack">
              <img alt="alt" src={profile7} style={{ width: '53px' }} />
              <div className="about_profile">
                <span style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>
                  이정민 (Developer)
                </span>
                <br />
                워너원 마지막 콘서트 값을 벌기 위해 드리머리 입단.
              </div>
            </div>
          </div>
        </div>
        <div className="about_bar" />
        <div
          className="about_1"
          style={{ fontSize: '2.2rem', marginBottom: '65.8px' }}
        >
          개인이 브랜드가 되는 문화
        </div>
        <div className="about_2">
          첫 번째 꿈은 예비헤어디자이너의 꿈이지만, 계속해서 <br />
          사회 다양한 분야의 예비전문가에게 기회를 제공하려고 합니다.
          <br />
          <br />
          개인의 실제 능력이 그 사람의 간판이 되고, 개인 브랜딩을 통해 <br />
          누구나 스스로를 증명할 수 있는 문화를 만들겠습니다.
          <br />
          <br />
          <br />
          <span style={{ fontWeight: 'bold' }}>
            드리머리에서 꿈을 이루는 사람은 Dreamer입니다.
          </span>
          <br />
          <br />
          <span style={{ fontWeight: 'bold' }}>
            드리머리에서 꿈을 응원하는 사람은 Believer입니다.
          </span>
          <br />
          <br />
          <span style={{ fontWeight: 'bold', backgroundColor: '#ffe8e5' }}>
            여러분은 오늘은 Believer지만, 내일의 Dreamer 일 수 있습니다.
          </span>
        </div>
        <div className="about_bar" />
        <div
          className="about_1"
          style={{
            color: '#dd6866',
            fontSize: '3.2rem',
            letterSpacing: '3.2px',
            margin: '149px 0 125px 0'
          }}
        >
          이 세상 모든 사회 초년생들의 꿈을 응원합니다.
        </div>
        <img alt="alt" src={logo} style={{ width: '5%' }} />
      </div>
    );
  }
}

export default About;
