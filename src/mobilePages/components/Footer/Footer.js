import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => (
  <div className='m_footer_back'>
    <div className='m_footer_title'>
    ⓒ Dreamary
    </div>
    <div style={{marginBottom: '20px'}}>
    (주)드리머리<br/>
    사업자 등록번호 : 416-88-00896<br/>
    대표: 이태훈, 심건우<br/>
    위치: 서울 성북구 안암로 145 경영본관 215<br/>
    메일: official@dreamary.net<br/>
    카카오톡: @드리머리
    </div>
    <div>
      <Link to='/infoPolicy' style={{textDecoration: 'none', color: '#2b2e34'}}>
        <div>개인정보취급방침</div>
      </Link>
      <Link to='/termsofuse' style={{textDecoration: 'none', color: '#2b2e34'}}>
        <div>이용약관</div>
      </Link>
      <Link to='/FAQ' style={{textDecoration: 'none', color: '#2b2e34'}}>
        <div>FAQ</div>
      </Link>
      <Link to='/QnA' style={{textDecoration: 'none', color: '#2b2e34'}}>
        <div>관리자문의</div>
      </Link>
    </div>

  </div>
)

export default Footer;