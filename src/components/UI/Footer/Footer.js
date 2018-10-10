import React from 'react';
import './Footer.css';

const Footer = () => (
  <div className="background">
    <div>
      <div className="title">(주)드리머리 사업자 정보</div>
      <div className="content" style={{ marginBottom: '17.7px' }}>
        (주)드리머리 | 서울특별시 성북구 안암로 145, 경영본관 215호
        <br />
        대표자명: 이태훈, 심건우
        <br />
        사업자등록번호: 416-88-00896
        <br />
        help@dreamary.net
      </div>
      <div className="content">
        Copyright ⓒ dreamary Co., Ltd. All rights reserved.
      </div>
    </div>
    <div className="d-flex">
      <div style={{ marginRight: '14%' }}>
        <div className="title">COMPANY</div>
        <div className="content">서비스 소개</div>
      </div>
      <div style={{ marginRight: '7%', whiteSpace: 'nowrap' }}>
        <div className="title">POLICIES</div>
        <div className="content">개인정보취급방침</div>
        <div className="content">결제서비스약관</div>
      </div>
      <div>
        <div className="title">SUPPORT</div>
        <div className="content">FAQ</div>
        <div className="content">관리자문의</div>
      </div>
    </div>
  </div>
);

export default Footer;
