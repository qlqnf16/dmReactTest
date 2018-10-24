import React from 'react';
import attach from '../../assets/images/attach.png';
import default_people from '../../assets/images/Default_guy-01.jpg';
import alart from '../../assets/images/alart.png';

const ChatBox = props => (
  <div className="chat_box">
    <div className="chat_title row m-0">
      <div className="col-1 px-0">
        <img src={default_people} alt="alt" className="chat_profile" />
      </div>
      <div className="col-8 px-0">
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          이태훈 예디
        </div>
        <div> 서비스날짜: 2018/09/14 10:30~15:00</div>
      </div>
      <div className="mr-3 ml-auto ">
        <div className="chat_report row px-2 pt-2">
          <div>
            <img src={alart} alt="alt" style={{ width: '2rem' }} />
          </div>
          <div style={{ padding: '0.5rem' }}>직거래 신고하기</div>
        </div>
      </div>
    </div>
    <div className="chat_content">
      <div className="d-flex flex-column">
        <div className="chat_bubble_1">
          안녕하세요! 9월 14일에 준오헤어 청담점에서 뵙겠습니다! 3층으로
          올라오셔서 제 이름 말씀하시면 바로 준비 도와드릴게요. 위치 찾는데 불편
          있으시면 메시지 주세요! :) 그때 뵙겠습니다~~{' '}
        </div>
        <div className="chat_time">2018/09/12 16:47</div>
      </div>
      <div className="d-flex flex-column">
        <div className="chat_bubble_2">넹~ 잘부탁드립니다!</div>
        <div className="chat_time" style={{ marginLeft: 'auto' }}>
          2018/09/12 16:54
        </div>
      </div>
    </div>
    <div className="chat_bottom row m-0">
      <div className="col-9 px-0">
        <input
          type="text"
          placeholder="안전한 거래를 위해 연락처 공개 및 직거래(유도) 시 사이트 이용이 제한될 수 있습니다."
          className="if_input rounded"
        />
      </div>
      <div className="col-1 pr-0">
        <img src={attach} alt="alt" className="chat_attach" />
      </div>
      <div className="col-2 pl-0">
        <div className="chat_button">전송</div>
      </div>
    </div>
  </div>
);
export default ChatBox;
