import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

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
        <Link to="/infoPolicy">
          <div className="content">개인정보취급방침</div>
        </Link>
        <Link to="/termsofuse">
          <div className="content">이용약관</div>
        </Link>
      </div>
      <div style={{ whiteSpace: 'nowrap' }}>
        <div className="title">SUPPORT</div>
        <Link to="/FAQ">
          <div className="content">FAQ</div>
        </Link>
        <Link to="/QnA">
          <div className="content">관리자문의</div>
        </Link>
      </div>
    </div>
  </div>
);

export default Footer;
