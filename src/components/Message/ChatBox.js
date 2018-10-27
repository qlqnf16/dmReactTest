import React from 'react';
import attach from '../../assets/images/attach.png';
import default_people from '../../assets/images/Default_guy-01.jpg';
import alart from '../../assets/images/alart.png';

const ChatBox = props => {
  let messages = '로딩중';
  if (props.messages) {
    messages = props.messages.map(message => (
      <div className="d-flex flex-column">
        <div className={`chat_bubble_${message.from === props.name ? 1 : 2}`}>
          {message.content}
        </div>
        <div className="chat_time">{message.createdAt}</div>
      </div>
    ));
  }

  return (
    <div className="chat_box">
      <div className="chat_title row m-0">
        <div className="col-1 px-0">
          <img src={default_people} alt="alt" className="chat_profile" />
        </div>
        <div className="col-8 px-0">
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            {props.name}
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
      <div className="chat_content">{messages}</div>
      <div className="chat_bottom row m-0">
        <div className="col-9 px-0">
          <input
            type="text"
            placeholder="안전한 거래를 위해 연락처 공개 및 직거래(유도) 시 사이트 이용이 제한될 수 있습니다."
            className="if_input rounded"
            onChange={props.change}
            value={props.textfield}
          />
        </div>
        <div className="col-1 pr-0">
          <img src={attach} alt="alt" className="chat_attach" />
        </div>
        <div className="col-2 pl-0">
          <div className="chat_button" onClick={props.sendMessage}>
            전송
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
