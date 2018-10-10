import React from 'react';
import './AttentionCard.css';

const AttentionCard = () => (
  <div className="ac_back text-left">
    <h3 className="ac_title">※ 유의사항</h3>
    <div className="ac_content">
      우리 막내는 프로 헤어디자이너가 아닌 예비 헤어디자이너 입니다. <br />
      막내의 레벨에 따라 선생님들의 코칭이 있을수있으니 당황하지 마세요! :)
      <br /> <br />
      당일예약은 취소 및 환불이 불가능하며, 당일 예약이 아닌 경우 표기된 취소
      수수료
      <br />
      정책을 따릅니다. 막내 사정에 의한 취소 발생 시 100% 환불 처리됩니다.
      <br /> <br />
      막내 사정으로 스케줄 및 장소가 변경될 수 있습니다. 이 경우 안내메시지를
      보내드리니 확인바랍니다
      <br /> <br />
      염색, 펌 등 추가비용이 발생하는 서비스에 대해서는 본 플랫폼이 아닌
      현장에서 <br />
      결제해주셔야 합니다.
    </div>
  </div>
);

export default AttentionCard;
