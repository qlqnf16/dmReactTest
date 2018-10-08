import React from 'react';
import { Link } from 'react-router-dom';

const Message = () => (
  <div className="row">
    <div className="col-md-2">이태훈 막내</div>
    <div className="col-md-8">
      귀찮게 말걸지 마세요 ㅡㅡ!귀찮게 말걸지 마세요 ㅡㅡ! 귀찮게 말걸지 마세요
      ㅡㅡ!{' '}
    </div>
    <Link to="/chat">
      <div className="btn btn-outline-primary">보기</div>
    </Link>
  </div>
);

export default Message;
