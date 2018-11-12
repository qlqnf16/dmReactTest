import React, { Component } from 'react';
import AskNav from '../../components/Navigation/AskNav/AskNav';
import './Ask.css';

class FAQ extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

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
            모델은 몇 명까지 구인할 수 있나요?
          </div>
          <div />
          <div className="ask_question">
            이용권 활성기간동안은 몇 명의 모델을 구하셔도 상관없습니다 :)
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">2</div>
          <div className="ask_question font-weight-bold">
            염료비는 무슨 기준으로 올려야 하나요?
          </div>
          <div />
          <div className="ask_question">
            염료비는 매장, 그리고 디자이너님의 원칙에 따라 설정해주시면 됩니다.
            미설정시 표준금액인 3만원으로 설정됩니다. 다만 기장에 따라 발생할 수
            있는 차이를 꼭 명시해주세요! 공고카드에 따라 가격을 다르게 설정
            하시는 것도 가능합니다.
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">3</div>
          <div className="ask_question font-weight-bold">
            합당하지 않은 평가를 받았습니다. 어떻게 해야할까요?
          </div>
          <div />
          <div className="ask_question">
            사실의 왜곡 또는 고의적인 악플은 드리머리 고객센터측의 면밀한 검토를
            통해 처리할 수 있도록 하겠습니다. 관련 내용을 페이지 우측 하단에
            위치한 '관리자 문의' 페이지에서 보고해주세요
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">4</div>
          <div className="ask_question font-weight-bold">
            드리머리에서의 포트폴리오를 의미있게 활용할 수 있는 방안이 있을까요?
          </div>
          <div />
          <div className="ask_question">
            드리머리팀은 여러분이 드리머리에서 쌓은 포트폴리오를 향후 디자이너가
            되었을 때에도 손쉽게 사용할 수 있도록 정리해드리는 여러 방안을
            마련하고 있습니다. 여러분들이 스스로의 가치를 증명할 수 있도록
            도와드리겠습니다 :)
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">5</div>
          <div className="ask_question font-weight-bold">
            아무나 예디로 등록할 수 있나요?
          </div>
          <div />
          <div className="ask_question">
            미용 면허/자격을 소지하신 분에 한하여 예디 가입을 승인하고 있습니다.
            경력, 승급까지 남은 기간 등 종합적인 요소를 고려하여 뚜렷한
            결격사유가 없으신 분이라면 승인 절차를 거친 후 스케줄을 등록하실 수
            있습니다.
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">6</div>
          <div className="ask_question font-weight-bold">
            작업 진행은 어디에서 하면 되나요?
          </div>
          <div />
          <div className="ask_question">
            공중위생보건법에 의거하여 작업은 반드시 예디님이 속한 헤어샵 /
            아카데미에서 진행해주셔야 합니다.
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">7</div>
          <div className="ask_question font-weight-bold">
            제가 사는 지역이 아직 없어요. 어떻게 등록하나요?
          </div>
          <div />
          <div className="ask_question">
            드리머리는 서울 및 수도권에서 서비스를 시작하였으나, 빠른 안정화를
            거쳐 전국 각 지역으로 확장할 계획을 가지고 있습니다. 지역별
            입점문의는 help@dreamary.net 으로 부탁드립니다!
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">8</div>
          <div className="ask_question font-weight-bold">
            고객들은 어떻게 저희를 찾나요?
          </div>
          <div />
          <div className="ask_question">
            고객들은 드리머리의 다양한 온,오프라인 홍보를 통해 유입됩니다.
            유입된 고객님들은 필터 검색을 통해 예디님께서 올리신 글을 찾을 수
            있습니다. 한 번만 스케줄을 등록해놓으시면 앞으로 고객분들께 일일이
            가능한 날짜와 스케줄을 설명하는 수고를 하지 않으셔도 되므로 매우
            편리합니다.
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
            어떻게 5천원에 헤어커트를 받을 수 있는건가요?
          </div>
          <div />
          <div className="ask_question">
            예비 헤어디자이너들은 그들의 내공을 쌓기위해서, 그리고 샵이 요구하는
            승급요건을 충족하기 위해서 수많은 모델실습을 진행하게 됩니다. 따라서
            대부분 헤어커트는 무료, 염색 또는 펌은 재료값만 받고 시술을
            진행합니다. 5천원은 소비자가 드리머리에 지불하는 비용으로,
            예비헤어디자이너 응원비, 소외계층을 위한 소셜이벤트, 그리고
            드리머리의 생존을 위하여 사용됩니다. 프로 헤어디자이너가 아니라
            예비헤어디자이너인 만큼 숙련도는 조금 부족할순 있어도, 실력과 열정은
            실제 디자이너와 비교해보아도 손색이 없을 것입니다.
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">2</div>
          <div className="ask_question font-weight-bold">
            어떻게 5천원에 안심할 수 있나요?
          </div>
          <div />
          <div className="ask_question">
            드리머리에는 국가기술자격증을 보유하고 있는 예비 헤어디자이너 분들에
            한해 가입을 승인해드리고 있습니다. 드리머리 소속 예비
            헤어디자이너분들은 대부분 경력이 3~4년 이상이고 디자이너로의 승급이
            얼마 남지 않은 경우가 많습니다. 예디님들의 포트폴리오, 그리고
            다른사람이 남긴 리뷰와 평점 등을 보고 가장 마음에 드는 예디분께
            머리를 맡겨보세요 :)
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">3</div>
          <div className="ask_question font-weight-bold">
            예비디자이너의 정보 검증을 어떻게 하나요?
          </div>
          <div />
          <div className="ask_question">
            예디 가입시 면허증/자격증을 검토한 후에 드리머리 가입승인이
            이루어집니다. 추가적인 검증이 필요하다고 판단되는 경우, 사전에
            예디들을 방문하여 실사를 진행하기도 합니다.
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">4</div>
          <div className="ask_question font-weight-bold">
            서비스 이용 방법이 어떻게 되나요?
          </div>
          <div />
          <div className="ask_question">
            1. 받고 싶은 서비스를 필터를 통해 검색한다. 2. 공고카드를 클릭하고
            가능한 시간에 예약을 한다. 3. 결제를 하고 지정된 시간에 가서
            기분좋게 드리머리한다. 4. 예디에 대한 응원으로 리뷰를 남긴다.
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">5</div>
          <div className="ask_question font-weight-bold">
            예비디자이너의 정보 검증을 어떻게 하나요?
          </div>
          <div />
          <div className="ask_question">
            예디 가입시 면허증/자격증을 검토한 후에 드리머리 가입승인이
            이루어집니다. 추가적인 검증이 필요하다고 판단되는 경우, 사전에
            예디들을 방문하여 실사를 진행하기도 합니다.
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">6</div>
          <div className="ask_question font-weight-bold">
            추천인 코드는 무엇인가요?
          </div>
          <div />
          <div className="ask_question">
            친구가 드리머리 서비스 가입시 내 추천인 코드를 기입할 경우 나에게 한
            명 당 1000의 포인트가 주어집니다. 포인트는 플랫폼 내에서 현금과 같이
            사용하실 수 있습니다.
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">7</div>
          <div className="ask_question font-weight-bold">
            문의나 불만사항은 어디로 연락을 해야 하나요?
          </div>
          <div />
          <div className="ask_question">
            드리머리 홈페이지 우측 하단의 '관리자 문의' 탭에서 문의를 하거나
            help@dreamary.net 으로 직접 문의해주시면 됩니다.
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">8</div>
          <div className="ask_question font-weight-bold">
            갑작스럽게 취소를 하게 되었어요. 환불은 어떻게 해야 하나요?
          </div>
          <div />
          <div className="ask_question">
            예약 후 24시간 전까지 예약취소를 하시는 경우 즉시 포인트로 금액을
            환불해드립니다. 이 경우 결제된 금액이 환불되지는 않습니다. 예약
            24시간 내로는 취소는 가능하나, 환불이 불가합니다.
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">9</div>
          <div className="ask_question font-weight-bold">
            텀블벅에서 구매한 '친구와 함께 구매이용권'은 친구와 함께 사용할 수
            있나요?
          </div>
          <div />
          <div className="ask_question">
            드리머리는 예비헤어디자이너와 대중을 연결하는 중개플랫폼이고
            헤어서비스의 직접제공자가 아니기 때문에 친구와 함께 머리를 자르는
            것을 담보드리기는 어렵습니다. 하지만 특정 브랜드의 경우
            예비헤어디자이너들이 같은 시각, 같은 장소에서 동시에 여러명의
            디자이너가 모델실습을 하기 때문에 이런 경우에 친구와 함께 머리를
            받으실 수 있습니다 :)
          </div>
        </div>
      </div>
      <div className="ask_list">
        <div className="ask_grid">
          <div className="ask_qnum">10</div>
          <div className="ask_question font-weight-bold">
            쿠폰의 유효기간은 어떻게 되나요?
          </div>
          <div />
          <div className="ask_question">
            특별한 사유가 없는 한 쿠폰에는 유효기간이 없습니다.
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
