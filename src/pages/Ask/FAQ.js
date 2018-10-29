import React, { Component } from 'react';
import AskNav from '../../components/Navigation/AskNav/AskNav';
import './Ask.css';

class FAQ extends Component {
  state = {
    toggle: true
  };
  toggleD = () => {
    this.setState({
      toggle: true
    });
  };
  toggleU = () => {
    this.setState({
      toggle: false
    });
  };

  designerFAQ = (
    <div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">1</div>
          <div className="ask_question font-weight-bold">
            질문이 무엇일까요?
          </div>
          <div />
          <div className="ask_question">
            이것은 대답입니다. 대답을 입력해주세요^^ 우리 예비디자이너가 무엇이
            궁금할까요.
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">2</div>
          <div className="ask_question font-weight-bold">
            질문이 왜 이런것 밖에 없는거죠?
          </div>
          <div />
          <div className="ask_question">
            그것은 저에게 물어보시면 안되구여 저희 팀원들과의 상의를 통해
            질문/대답 형식을 작성해야합니다. (이런 괄호에 넣어서 하는것도 넣으면
            좋겠네요)
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">3</div>
          <div className="ask_question font-weight-bold">
            그냥 만약을 위해 두줄 이상짜리 글을 쓰기위해 질문을 하겠습니다?
          </div>
          <div />
          <div className="ask_question">
            두줄짜리의 글은 어떻게 해야 될까요 로렘입섬의 도움을 받아봅시다.
            언덕 다하지 이런 추억과 마리아 아침이 오면 가난한 봅니다. 그러나
            쉬이 가을 무엇인지 헤는 강아지, 가을로 봄이 있습니다. 사랑과 별 풀이
            벌레는 어머니 어머니, 내린 버리었습니다. 별 하늘에는 위에
            버리었습니다. 하나의 별을 별 까닭이요, 언덕 이네들은 새워 북간도에
            봅니다. 대충 이정도로 합시다
          </div>
        </div>
      </div>
    </div>
  );
  userFAQ = (
    <div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">1</div>
          <div className="ask_question font-weight-bold">
            이것은 유저~! 질문이 무엇일까요?
          </div>
          <div />
          <div className="ask_question">
            이것은 대답입니다. 대답을 입력해주세요^^ 우리 예비디자이너가 무엇이
            궁금할까요.
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">2</div>
          <div className="ask_question font-weight-bold">
            질문이 왜 이런것 밖에 없는거죠?
          </div>
          <div />
          <div className="ask_question">
            그것은 저에게 물어보시면 안되구여 저희 팀원들과의 상의를 통해
            질문/대답 형식을 작성해야합니다. (이런 괄호에 넣어서 하는것도 넣으면
            좋겠네요)
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">3</div>
          <div className="ask_question font-weight-bold">
            그냥 만약을 위해 두줄 이상짜리 글을 쓰기위해 질문을 하겠습니다?
          </div>
          <div />
          <div className="ask_question">
            두줄짜리의 글은 어떻게 해야 될까요 로렘입섬의 도움을 받아봅시다.
            언덕 다하지 이런 추억과 마리아 아침이 오면 가난한 봅니다. 그러나
            쉬이 가을 무엇인지 헤는 강아지, 가을로 봄이 있습니다. 사랑과 별 풀이
            벌레는 어머니 어머니, 내린 버리었습니다. 별 하늘에는 위에
            버리었습니다. 하나의 별을 별 까닭이요, 언덕 이네들은 새워 북간도에
            봅니다. 대충 이정도로 합시다
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <div className="container-fluid ask">
        <AskNav />
        <div className="ask_title">FAQ</div>
        <div style={{ marginBottom: '35px' }}>
          <div
            className={this.state.toggle ? 'ask_nav toggle' : 'ask_nav'}
            onClick={this.toggleD}
          >
            예비 디자이너
          </div>
          <div
            className={this.state.toggle ? 'ask_nav' : 'ask_nav toggle'}
            onClick={this.toggleU}
          >
            유저
          </div>
        </div>
        <div>{this.state.toggle ? this.designerFAQ : this.userFAQ}</div>
      </div>
    );
  }
}

export default FAQ;
