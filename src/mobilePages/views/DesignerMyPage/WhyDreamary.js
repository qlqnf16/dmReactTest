import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './WhyDreamary.css'

import why1 from '../../../assets/images/why_1.png';
import why2 from '../../../assets/images/why_2.png';
import why3 from '../../../assets/images/why_3.png';
import why4 from '../../../assets/images/why_4.png';
import why5 from '../../../assets/images/why_5.png';
import logo from '../../../assets/images/logo.png'

class WhyDreamary extends Component {
  render() {
    return (<div className='text-center' style={{paddingTop: '18.9px'}}>

            <div className='m_why_1'>
              헤어모델,<br/>
              <span style={{color: '#dd6866', fontWeight: 'bold'}}>드리머리</span>에서 쉽고 빠르게 구해보세요.
            </div>
            <div className='m_why_back'>
            <Link to='/addDesigner'>
              <div className='m_why_button'>지금 바로 등록하기!</div>
            </Link>
              <div className='m_why_content1'>
              아무리 홍보를 해도 안구해지는 헤어모델 때문에<br/>
              혹시 스트레스 받고 계시지는 않으신가요?</div>
              <img src={why1} alt='alt' style={{width: '95%', marginTop: '14.8px'}}/>
            </div>
            <div className='m_why_content2'>헤어모델이 안구해지는데는 사실 이유가 있었습니다.</div>
            <div className='m_why_roundBack'>
              <div className='m_why_roundText'>
                “예비 헤어디자이너에게 머리를 맡기면<br/>
                머리가 망할까봐 <span style={{color: '#dd6866'}}>불안해요</span>”
              </div>
              <div className='m_why_roundText'>
              “헤어모델로 머리 자르면 싸게 가능한가요?<br/>
              근데 너무 <span style={{color: '#dd6866'}}>못잘라서</span> 그런 것 아닌가요”
              </div>
              <div className='m_why_roundText'>
              “다른사람의 후기나 포트폴리오 같은 것을<br/>
              보고 <span style={{color: '#dd6866'}}>안심</span>할 수 있으면 갈 것 같아요”
              </div>
            </div>
            <div className='m_why_content2'>
              조사결과, 검증되지 않은 이에게 서비스를 받는 것이<br/>
              불안해서 그렇다는 의견이 대부분이었습니다.
            </div>
            <div className='m_why_content2' style={{color: 'rgba(0, 0, 0, 0.1)', marginTop: 0}}>
              <s>하지만 의심은 해소시켜주면 확신이 되는 법..!</s>
            </div>
            <div className='m_why_back g'>
              <div className='m_why_1' style={{color: 'white', margin: 0}}>
                이 문제 저희가 해결해<span style={{color: '#dd6866', fontWeight: 'bold'}}>드리머리</span>입니다.
              </div>
              <img alt='alt' src={why2} style={{width: '55.5%', margin: '52px 0'}} />
              <div className='m_why_content1' style={{color: 'white'}}>
              조사 결과 예비 헤어디자이너의 소개, 경력, 포트폴리오 및<br/> 
                타인이 남긴 후기 등을 확인 할 수 있다면 머리를 맡긴다고<br/>
                응답한 사람의 비율이 <span style={{color: '#dd6866'}}>87.2%로 매우 높게</span> 집계되었습니다.</div>
            </div>
            <div className='m_why_content2' style={{textAlign: 'left'}}>
              드리머리는 예디(예비 헤어디자이너)와 대중을 연결하는 전문적인 플랫폼<br/>
              입니다. 인스타그램과 다르게 신뢰도의 핵심인 ‘리뷰’기능이 도입되며,<br/>
              포트폴리오의 체계적인 정리를 예디에게 요구합니다.
            </div>
            <img alt='alt' src={why3} style={{width: '100%'}} />
            <div className='m_why_1 p'>대신 드리머리는 약속드릴 수 있습니다.</div>
            <div className='m_why_content2' style={{textAlign: 'left', margin: '43px auto'}}>
              - 하루종일 모델을 구하느라 온 정신을 쏟고<br/>
              - 개인 인스타그램이 헤어모델 구인스타그램으로 쓰일 정도로 홍보를 하지만 모델이 잘 안구해지고<br/>
              - 모델을 문의드린다며 들어온 DM을 보고 일일이 장소, 시간, 가격 유의사항 등 이야기해드렸더니<br/>
                결국 죄송하다며 마지막에 떠나버리는 고객을 보고 현자타임을 느끼고<br/>
              - 전날 밤 갑자기 모델이 못온다고 하여 길거리캐스팅을 떠나야 하는 순간들<br/><br/>

              더 이상 경험하지 않게 도와드리겠습니다. (진지)<br/>
            </div>
            <div className='m_why_imgBack'>
              <img alt='alt' src={why4} style={{width: '100%'}} />
              <div className='m_why_imgText'>
                여러분의 서비스를 기다리는 고객들의<br/>
                꾸밈없는 목소리입니다.
              </div>
              <div className='m_why_imgText2'>*실제 설문/댓글 등에 참여한 고객의 목소리임을 법적으로 보장합니다.</div>
            </div>
            <div className='m_why_content3'>더 이상 모델 구하는 일로 혼자 스트레스 받지 마세요.</div>
            <div className='m_why_content4'>드리머리는 당신의 소중한 꿈을 응원합니다.</div>
            <div className='m_d-flex' style={{alignItems: 'center', marginLeft: '17.7%'}}>
              <div className='m_why_content2 c' style={{textAlign: 'right'}}>
                실력이 좋은<br/>
                예비 헤어디자이너에게는<br/>
                <span style={{color: '#4c91ba'}}>실습의 기회</span>를
              </div>
              <img src={why5} alt='alt' style={{width: '41.5px', height: '41.5px'}} />
              <div className='m_why_content2 c'>
                고객에게는<br/>
                <span style={{color: '#dd6866'}}>합리적인 가격의</span><br/>
                감동 <span style={{color: '#dd6866'}}>서비스</span>를
              </div>
            </div>
            <Link to='/addDesigner' style={{textDecoration: 'none'}}>
              <div className='m_why_button2'>지금 바로 등록하기!</div>
            </Link>
            <img alt='alt' src={logo} style={{width: '5%'}} />

    </div>);
  }
}

export default WhyDreamary;
