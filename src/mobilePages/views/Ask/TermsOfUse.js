import React, { Component, Fragment } from 'react';
import AskNavigationBar from '../../components/AskNavigationBar/AskNavigationBar';

import './Ask.css';

class TermsOfUse extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Fragment>
        <AskNavigationBar pathname={this.props.location.pathname} />
        <div className="container-fluid m_ask">
          <div className="m_ask_title">이용약관</div>
          <pre className="m_ask_content">
            {
              '제1조(목적)\n\n이 약관은 주식회사 드리머리(이하 “회사”라고 합니다)가 운영하는 온라인 플랫폼(http://www.dreamary.net, 이하 “플랫폼”이라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 플랫폼과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.\n\n※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」\n\n제2조(정의)\n\n① “플랫폼”이란 (주)드리머리가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버플랫폼을 운영하는 사업자의 의미로도 사용합니다.\n\n② “이용자”란 “플랫폼”에 접속하여 이 약관에 따라 “플랫폼”이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.\n\n③ ‘회원‘이라 함은 “플랫폼”에 회원등록을 한 자로서, 계속적으로 “플랫폼”이 제공하는 서비스를 이용할 수 있는 자를 말합니다.\n\n④ ‘비회원’이라 함은 회원에 가입하지 않고 “플랫폼”이 제공하는 서비스를 이용하는 자를 말합니다.\n\n⑤ ‘예디’라 함은 헤어 서비스를 제공하는 예비 헤어디자이너로서, “플랫폼”을 채널로 삼아 서비스를 제공할 가능성이 있는 자를 말합니다.\n\n⑥ ‘고객’이라 함은 예디로부터 “플랫폼”을 통해 헤어 서비스를 제공받았거나 미래에 받을 의향이 있는 자를 말합니다. \n\n⑦ ‘이용권’이라 함은 예디의 월간 이용권을 의미합니다.\n\n제3조 (약관 등의 명시와 설명 및 개정) \n\n① “플랫폼”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호,전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보관리책임자등을 이용자가 쉽게 알 수 있도록 플랫폼의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.\n\n② “플랫폼은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회, 배송책임, 환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.\n\n③ “플랫폼”은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.\n\n④ “플랫폼”이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 플랫폼의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 “플랫폼“은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다. \n\n⑤ “플랫폼”이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간 내에 “플랫폼”에 송신하여 “플랫폼”의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.\n\n⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침 및 관계법령 또는 상관례에 따릅니다.\n\n제4조(서비스의 제공 및 변경) \n\n① “플랫폼”은 다음과 같은 업무를 수행합니다.\n\n1. 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결\n2. 예디의 미용사 자격증의 유무 및 해당 예디의 용역 제공 허용 여부 판별\n3. 기타 “플랫폼”이 정하는 업무\n\n② “플랫폼”내에서 예디와 고객이 체결한 서비스에 대해서 예디의 탈퇴 또는 고객의 변심 등의 사유로 그 내용이 변경될 경우에는 그 사유를 서비스를 체결한 상대 예디 또는 고객에게 통지 가능한 주소로 즉시 통지합니다\n\n제5조(서비스의 중단) \n\n① “플랫폼”은 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.\n\n② “플랫폼”은 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, “플랫폼”이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.\n\n③ 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 “플랫폼”은 제8조에 정한 방법으로 이용자에게 통지하고 당초 “플랫폼”에서 제시한 조건에 따라 소비자에게 보상합니다. \n\n제6조(회원가입) \n\n① 이용자는 “플랫폼”이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.\n\n② “플랫폼”은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.\n1. 가입신청자가 이 약관 제7조제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 제7조제3항에 의한 회원자격 상실 후 6개월이 경과한 자로서 “플랫폼”의 회원재가입 승낙을 얻은 경우에는 예외로 한다.\n2. 등록 내용에 허위, 기재누락, 오기가 있는 경우\n3. 기타 회원으로 등록하는 것이 “플랫폼”의 기술상 현저히 지장이 있다고 판단되는 경우\n\n③ 회원가입계약의 성립 시기는 “플랫폼”의 승낙이 회원에게 도달한 시점으로 합니다.\n\n④ 회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 “플랫폼”에 대하여 회원정보 수정 등의 방법으로 그 변경사항을 알려야 합니다.\n\n제7조(회원 탈퇴 및 자격 상실 등) \n\n① 회원은 “플랫폼”에 언제든지 탈퇴를 요청할 수 있으며 “플랫폼”은 접수된 이후 3일 내로 회원탈퇴를 처리합니다.\n\n② 회원이 다음 각 호의 사유에 해당하는 경우, “플랫폼”은 회원자격을 제한 및 정지시킬 수 있습니다.\n\n1. 가입 신청 시에 허위 내용을 등록한 경우\n2. 다른 사람의 “플랫폼” 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우\n3. “플랫폼”을 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우\n\n③ 회원이 7-2에서 정하는 사유로 인해 “플랫폼”에 대한 회원자격을 상실할 경우에는 “플랫폼”에 대한 모든 사용 경로 차단을 원칙으로 합니다.\n\n④ 탈퇴 시 보유 중인 이용권은 복구가 불가하며, 탈퇴 후 60일 이내에 재가입이 불가능합니다. 탈퇴 전 리뷰하신 글은 탈퇴 후 삭제가 불가합니다.\n\n제8조(회원에 대한 통지)\n\n① “플랫폼”이 회원에 대한 통지를 하는 경우, 회원이 “플랫폼”과 미리 약정하여 지정한 전자우편 주소로 할 수 있습니다.\n\n② “플랫폼”은 불특정다수 회원에 대한 통지의 경우 1주일이상 “플랫폼” 게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다.\n\n제9조(구매신청 및 개인정보 제공 동의 등) \n\n① “플랫폼”이용자는 “플랫폼”상에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며, “플랫폼”은 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다. \n1. 예디 등의 검색 및 선택\n2. 약관내용, 청약철회권이 제한되는 서비스 등의 비용부담과 관련한 내용에 대한 확인\n3. 이 약관에 동의하고 위 2.호의 사항을 확인하거나 거부하는 표시\n(예, 마우스 클릭)\n4. 서비스의 이용신청 및 이에 관한 확인 또는 “플랫폼”의 확인에 대한 동의\n5. 결제방법의 선택\n\n② “플랫폼”이 제3자에게 구매자 개인정보를 제공할 필요가 있는 경우 1) 개인정보를 제공받는 자, 2)개인정보를 제공받는 자의 개인정보 이용목적, 3) 제공하는 개인정보의 항목, 4) 개인정보를 제공받는 자의 개인정보 보유 및 이용기간을 구매자에게 알리고 동의를 받아야 합니다. (동의를 받은 사항이 변경되는 경우에도 같습니다.)\n\n③ “플랫폼”이 제3자에게 구매자의 개인정보를 취급할 수 있도록 업무를 위탁하는 경우에는 1) 개인정보 취급위탁을 받는 자, 2) 개인정보 취급위탁을 하는 업무의 내용을 구매자에게 알리고 동의를 받아야 합니다. (동의를 받은 사항이 변경되는 경우에도 같습니다.) 다만, 서비스제공에 관한 계약이행을 위해 필요하고 구매자의 편의증진과 관련된 경우에는 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」에서 정하고 있는 방법으로 개인정보 취급방침을 통해 알림으로써 고지절차와 동의절차를 거치지 않아도 됩니다.\n\n제10조 (계약의 성립)\n\n① “플랫폼”은 제9조와 같은 구매신청에 대하여 다음 각 호에 해당하면 승낙하지 않을 수 있습니다. 다만, 미성년자와 계약을 체결하는 경우에는 법정대리인의 동의를 얻지 못하면 미성년자 본인 또는 법정대리인이 계약을 취소할 수 있다는 내용을 고지하여야 합니다.\n\n1. 신청 내용에 허위, 기재누락, 오기가 있는 경우\n2. 기타 구매신청에 승낙하는 것이 “플랫폼” 기술상 현저히 지장이 있다고 판단하는 경우\n\n② “플랫폼”의 승낙이 제12조제1항의 수신확인통지형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다.\n\n③ “플랫폼”의 승낙의 의사표시에는 이용자의 구매 신청에 대한 확인 및 판매가능 여부, 구매신청의 정정 취소 등에 관한 정보 등을 포함하여야 합니다.\n\n제11조(지급방법) \n\n“플랫폼”에서 구매한 이용권에 대한 대금지급방법은 다음 각 호의 방법 중 가용한 방법으로 할 수 있습니다. \n\n1. 선불카드, 직불카드, 신용카드 등의 각종 카드 결제\n2. 온라인 무통장입금\n3. 쿠폰 등 “플랫폼”이 지급한 수단에 의한 결제\n4. “플랫폼”과 계약을 맺었거나 “플랫폼”이 인정한 상품권에 의한 결제 \n5. “플랫폼”과 계약이 맺어진 카카오페이 등의 간편 결제 시스템\n6. 기타 전자적 지급 방법에 의한 대금 지급 등\n\n제12조(수신확인통지․구매신청 변경 및 취소)\n\n① “플랫폼”은 이용자의 구매신청이 있는 경우 이용자에게 수신확인통지를 합니다.\n\n② 수신확인통지를 받은 이용자는 의사표시의 불일치 등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있고 “플랫폼”은 서비스 진행 전에 이용자의 요청이 있는 경우에는 지체 없이 그 요청에 따라 처리하여야 합니다. 자세한 사항에 대해서는 제15조의 청약철회 등에 관한 규정에 따릅니다.\n\n제13조(서비스 등의 제공)\n\n① “플랫폼”은 이용자와 서비스 등의 공급시기에 관하여 별도의 약정이 없는 이상, 이용자가 서비스 구매를 한 날부터 15일 이내에 서비스가 이루어질 수 있도록 필요한 조치를 취합니다. \n\n제14조(고객 포인트 환급) \n\n① 포인트 환급은 서비스 진행 전 예디나 고객의 변심, 개인사정 등의 이유로 서비스가 불가해짐에 따라 포인트가 이용자에게 제공되는 프로세스를 의미합니다. 이는 서비스 진행 이후 고객의 불만족에 따라 발생하는 “포인트 복구”과 구분됩니다.\n\n② 포인트 환급에 대한 구체적인 지침은 다음과 같습니다.\n1. 서비스 시작 24시간 이전에 고객이 포인트 환급을 요청한 경우 포인트가 환급되며, 이는 현금으로 환불이 되지는 않습니다. \n2. 서비스가 24시간이 남지 않은 상태에서의 예약 취소에 대해서는 포인트 환급이 불가능하며 이 때 포인트는 소멸됩니다.\n3. 예디의 사정으로 인하여 예약이 파기된 경우 필히 고객에게 포인트를 환급합니다. 예디 또는 고객의 타당한 이유 없는 환급 요청이 잦을 경우에는 해당 이용자의 서비스 이용이 제한될 수 있습니다. \n4. 예디는 월 정기권 형태의 이용권이 운영되는 특징상 이용권의 환급이 불가합니다. 한 번 이용권을 사용하게 되면 중도에 이용권을 보류 또는 폐기할 수 없습니다.\n\n제15조(포인트 복구)\n\n① 포인트 복구는 고객이 서비스를 받은 후 그 품질에 대해 불만족하거나 서비스가 예정대로 이행되지 않았을 경우 당사에게 요청할 수 있습니다. 당사는 본 요청에 대해 내부 위원회의 검토 후 최대한 빠른 시일 내에 포인트를 환급/소멸 조치합니다.\n\n② 고객은 다음 각 호의 1에 해당하는 경우에는 포인트 복구를 도와드리기 어렵습니다.\n\n1. 서비스 예약 후 고객 스스로에게 책임 있는 사유로 서비스가 제공되지 못한 경우\n2. 고객의 과실 또는 책임으로 인해 예디의 영업 또는 평판 상 중대한 손실이 발생하거나 예상되는 경우 \n3. 금전적 이익을 목적으로 고의로 이용권을 환급할 것을 당사에게 요청하는 것으로 판단되는 경우\n\n제16조(포인트 복구 등의 효과)\n\n① “플랫폼”은 고객의 포인트 복구 요구 시 위원회 내에서 검토 후 복구 절차를 진행합니다. 포인트 복구 시 포인트를 고객의 계정에 복구합니다.\n\n② “플랫폼”은 이용자에게 포인트 복구 등을 이유로 위약금 또는 손해배상을 청구하지 않습니다. 다만 서비스 등의 내용이 표시·광고 내용과 다르거나 계약내용과 다르게 이행되어 청약철회 등을 하는 경우 포인트 복구에 필요한 비용은 “플랫폼”이 부담합니다.\n\n제17조(개인정보보호)\n\n① “플랫폼”은 이용자의 개인정보 수집 시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다. \n\n② “플랫폼”은 회원가입 시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다. 다만, 관련 법령상 의무이행을 위하여 구매계약 이전에 본인확인이 필요한 경우로서 최소한의 특정 개인정보를 수집하는 경우에는 그러하지 아니합니다.\n\n③ “플랫폼”은 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다. \n\n④ “플랫폼”은 수집된 개인정보를 목적 외의 용도로 이용할 수 없으며, 새로운 이용목적이 발생한 경우 또는 제3자에게 제공하는 경우에는 이용·제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다. 다만, 관련 법령에 달리 정함이 있는 경우에는 예외로 합니다.\n\n⑤ “플랫폼”이 제2항과 제3항에 의해 이용자의 동의를 받아야 하는 경우에는 개인정보관리 책임자의 신원(소속, 성명 및 전화번호, 기타 연락처), 정보의 수집목적 및 이용목적, 제3자에 대한 정보제공 관련사항(제공받은자, 제공목적 및 제공할 정보의 내용) 등 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제22조제2항이 규정한 사항을 미리 명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할 수 있습니다.\n\n⑥ 이용자는 언제든지 “플랫폼”이 가지고 있는 자신의 개인정보에 대해 열람 및 오류정정을 요구할 수 있으며 “플랫폼”은 이에 대해 지체 없이 필요한 조치를 취할 의무를 집니다. 이용자가 오류의 정정을 요구한 경우에는 “플랫폼”은 그 오류를 정정할 때까지 당해 개인정보를 이용하지 않습니다.\n\n⑦ “플랫폼”은 개인정보 보호를 위하여 이용자의 개인정보를 취급하는 자를 최소한으로 제한하여야 하며 신용카드, 은행계좌 등을 포함한 이용자의 개인정보의 분실, 도난, 유출, 동의 없는 제3자 제공, 변조 등으로 인한 이용자의 손해에 대하여 모든 책임을 집니다.\n\n⑧ “플랫폼” 또는 그로부터 개인정보를 제공받은 제3자는 개인정보의 수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체 없이 파기합니다.\n\n⑨ “플랫폼”은 개인정보의 수집·이용·제공에 관한 동의 란을 미리 선택한 것으로 설정해두지 않습니다. 또한 개인정보의 수집·이용·제공에 관한 이용자의 동의거절시 제한되는 서비스를 구체적으로 명시하고, 필수수집항목이 아닌 개인정보의 수집·이용·제공에 관한 이용자의 동의 거절을 이유로 회원가입 등 서비스 제공을 제한하거나 거절하지 않습니다.\n\n제18조(“플랫폼“의 의무)\n\n① “플랫폼”은 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를 제공하는데 최선을 다하여야 합니다.\n\n② “플랫폼”은 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추어야 합니다.\n\n③ “플랫폼”이 상품이나 용역에 대하여 「표시․광고의 공정화에 관한 법률」 제3조 소정의 부당한 표시․광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다.\n\n제19조(회원의 ID 및 비밀번호에 대한 의무)\n\n① 제17조의 경우를 제외한 ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.\n\n② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.\n\n③ 회원이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 “플랫폼”에 통보하고 “플랫폼”의 안내가 있는 경우에는 그에 따라야 합니다.\n\n제20조(이용자의 의무 및 제재) 이용자는 다음 행위를 하여서는 안 됩니다.\n\n① 다음 각 호에 해당하는 경우 사전 통보 없이 강제탈퇴 하거나, 이용을 중지할 수 있습니다. \n\n1. 신청 또는 변경 시 허위 내용의 등록\n2. 타인의 정보 도용\n3. “플랫폼”에 게시된 정보의 변경\n4. “플랫폼”이 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시\n5. “플랫폼” 기타 제3자의 저작권 등 지적재산권에 대한 침해\n6. “플랫폼” 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위\n7. 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 플랫폼에 공개 또는 게시하는 행위\n8. 공공질서 및 미풍양속에 반하는 경우\n9. 범죄적 행위에 관련되는 경우\n10. 국익 또는 사회적 공익을 저해할 목적으로 서비스 이용을 계획 또는 실행할 경우\n11. 타인의 계정 및 비밀번호를 도용한 경우\n12. 회사 직원 및 운영자 등을 포함한 타인을 사칭하기 위해 등록을 한 경우\n13. 기타 관련 법령이나 회사가 정한 이용조건에 위배되는 경우\n\n② 예디가 서비스를 정상적으로 이행하지 않고 일방적으로 계약을 파기하고 이용자에게 고지하지 않을 경우, 당사는 해당 예디의 회원자격을 박탈함과 동시에 관계법령에 의해 예디를 고소, 고발하는 등의 조치를 취할 수 있으며, 피해자가 고소, 고발 조치를 취한 경우 당사는 적극 협조합니다. 고객이 서비스 장소에 무단으로 불참하고 이를 고지하지 않을 경우 또한 동일합니다.\n\n③ 플랫폼은 예디와 고객 간의 모델 구인 및 연결 목적으로만 이용이 가능하며, 사헤어샵이 홍보 등을 위하여 플랫폼을 상업적으로 이용할 경우 예고 없이 회원자격을 박탈할 수 있습니다. \n\n④ 타인에게 계정 공유, 기타 상업 및 비상업적으로 서비스 이용 시 회원등록 취소 및 강제탈퇴 처리되며, 당사의 운영상의 영업방해 및 이미지 훼손에 대한 손해배상과 개인정보 무단수집에 대한 모든 민/형사적 책임을 집니다.\n\n⑤ 지속적인 당일 취소 또는 서비스 무단 불참이 확인될 경우 플랫폼은 다음과 같은 조치를 취할 수 있습니다. 고객 – 현재 체결된 예약까지만 이행 가능, 이후 추가적인 예약 불가 또는 강제탈퇴. 예디 – 공고정지 또는 강제탈퇴. 예디의 경우 공고가 정지 되었을 경우에도 사전에 예약이 완료된 서비스에 대해서는 해당 일자에 서비스를 진행해야합니다.\n\n⑥ 이용자의 책임 있는 이유로 이용권 박탈 또는 공고 정지 등의 조치가 가해졌을 경우, 소명의 기회가 부여됩니다. 본 내용은 당사 내부 위원회에서 검토 후 이용자의 이용권 또는 공고 복구의 여부를 결정합니다.\n\n제21조(연결“플랫폼”과 피연결“플랫폼” 간의 관계)\n\n① 상위 “플랫폼”과 하위 “플랫폼”이 하이퍼링크(예: 하이퍼링크의 대상에는 문자, 그림 및 동화상 등이 포함됨)방식 등으로 연결된 경우, 전자를 연결 “플랫폼”(웹 사이트)이라고 하고 후자를 피연결 “플랫폼”(웹사이트)이라고 합니다.\n\n② 연결 “플랫폼”은 피연결“플랫폼”이 독자적으로 제공하는 서비스 등에 의하여 이용자와 행하는 거래에 대해서 일절 보증 책임을 지지 않습니다.\n\n제22조(저작권의 귀속 및 이용제한)\n\n① “플랫폼“이 작성한 저작물에 대한 저작권 기타 지적재산권은 ”플랫폼“에 귀속합니다.\n\n② 이용자는 “플랫폼”을 이용함으로써 얻은 정보 중 “플랫폼”에게 지적재산권이 귀속된 정보를 “플랫폼”의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.\n\n③ “플랫폼”은 약정에 따라 이용자에게 귀속된 저작권을 사용하는 경우 당해 이용자에게 통보하여야 합니다.\n\n제23조(분쟁해결)\n\n① “플랫폼”은 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치, 운영합니다.\n\n② “플랫폼”은 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.\n\n③ “플랫폼”과 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.\n\n제24조(재판권 및 준거법)\n\n① “플랫폼”과 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다.\n\n② “플랫폼”과 이용자 간에 제기된 전자상거래 소송에는 한국법을 적용합니다.\n\n\n'
            }
          </pre>
        </div>
      </Fragment>
    );
  }
}

export default TermsOfUse;
