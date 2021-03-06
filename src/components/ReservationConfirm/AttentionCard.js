import React from "react";
import "./AttentionCard.css";
import womanBack from "../../assets/images/woman_back.png";

const AttentionCard = props => {
  let service = props.service;
  const permPrice = props.cardData.permPrice;
  const dyePrice = props.cardData.dyePrice;
  service = service.substring(1).split("/ ");
  let priceImage = null;
  let boxStyle = null;
  if (service.includes("펌") && service.includes("염색")) {
    boxStyle = { width: "1000px" };
    priceImage = (
      <div className="ml-auto p-3" style={{ width: "450px" }}>
        <div
          style={{
            color: "#dd6866",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.4rem"
          }}
        >
          <p className="m-0">서비스 예상 금액</p>
          <p className="m-0">
            {permPrice.normal + dyePrice.normal}
            원(+기장)
          </p>
          <p className="m-0" style={{ color: "#1f3354", fontWeight: "normal" }}>
            기장별 추가금액 안내
          </p>
        </div>
        <div>
          <div
            className="p-3 mx-auto"
            style={{ color: "#dd6866", fontSize: "1.1rem" }}
          >
            <div className="row">
              <div className="col-4 text-center font-weight-bold"> 펌</div>
              <div className="col-4">
                <img
                  src={womanBack}
                  alt="alt"
                  className="reservation_woman_back"
                />
              </div>

              <div className="col-4 text-center font-weight-bold"> 염색</div>
            </div>
            <div
              className="length_price row"
              style={{ borderColor: "#dd6866" }}
            >
              <div className="col-4 text-right">
                기본 <span className="ml-3">{permPrice.normal}원</span>
              </div>
              <div className="col-4" />
              <div
                className="col-4 text-left"
                style={{ paddingLeft: "3.8rem" }}
              >
                기본 <span className="ml-3">{dyePrice.normal}원</span>
              </div>
            </div>
            <div
              className="length_price row"
              style={{ borderColor: "#dd6866" }}
            >
              <div className="col-4 text-right">
                턱아래 <span className="ml-3">+{permPrice.chin}원</span>
              </div>
              <div className="col-4" />

              <div
                className="col-4 text-left"
                style={{ paddingLeft: "2.7rem" }}
              >
                턱아래 <span className="ml-3">+{dyePrice.chin}원</span>
              </div>
            </div>
            <div
              className="length_price row"
              style={{ borderColor: "#dd6866" }}
            >
              <div className="col-4 text-right">
                어깨아래 <span className="ml-3">+{permPrice.shoulder}원</span>
              </div>
              <div className="col-4" />

              <div className="col-4 text-left">
                어깨아래 <span className="ml-3">+{dyePrice.shoulder}원</span>
              </div>
            </div>
            <div
              className="length_price row"
              style={{ borderColor: "#dd6866" }}
            >
              <div className="col-4 text-right">
                가슴아래 <span className="ml-3">+{permPrice.chest}원</span>
              </div>
              <div className="col-4" />

              <div className="col-4 text-left">
                가슴아래 <span className="ml-3">+{dyePrice.chest}원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (service.includes("펌") || service.includes("염색")) {
    boxStyle = { width: "830px" };
    const isPerm = service.includes("펌") ? true : false;
    priceImage = (
      <div className="ml-auto p-3" style={{ width: "330px" }}>
        <div
          style={{
            color: "#dd6866",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.4rem"
          }}
        >
          <p className="m-0">서비스 예상 금액</p>
          <p className="m-0">
            {isPerm ? permPrice.normal : dyePrice.normal}
            원(+기장)
          </p>
          <p className="m-0" style={{ color: "#1f3354", fontWeight: "normal" }}>
            기장별 추가금액 안내
          </p>
        </div>
        <div>
          <div
            className="p-3 mx-auto"
            style={{ color: "#dd6866", fontSize: "1.1rem" }}
          >
            <div className="row">
              <div className="col-6">
                <img
                  src={womanBack}
                  alt="alt"
                  className="reservation_woman_back"
                  style={{ width: "50%" }}
                />
              </div>

              <div className="col-6 text-center font-weight-bold">
                {" "}
                {isPerm ? "펌" : "염색"}
              </div>
            </div>
            <div
              className="length_price row"
              style={{ borderColor: "#dd6866" }}
            >
              <div className="col-6" />
              <div
                className="col-6 text-left"
                style={{ paddingLeft: "3.8rem" }}
              >
                기본{" "}
                <span className="ml-3">
                  {isPerm ? permPrice.normal : dyePrice.normal}원
                </span>
              </div>
            </div>
            <div
              className="length_price row"
              style={{ borderColor: "#dd6866" }}
            >
              <div className="col-6" />

              <div
                className="col-6 text-left"
                style={{ paddingLeft: "2.7rem" }}
              >
                턱아래{" "}
                <span className="ml-3">
                  +{isPerm ? permPrice.chin : dyePrice.chin}원
                </span>
              </div>
            </div>
            <div
              className="length_price row"
              style={{ borderColor: "#dd6866" }}
            >
              <div className="col-6" />

              <div className="col-6 text-left">
                어깨아래{" "}
                <span className="ml-3">
                  +{isPerm ? permPrice.shoulder : dyePrice.shoulder}원
                </span>
              </div>
            </div>
            <div
              className="length_price row"
              style={{ borderColor: "#dd6866" }}
            >
              <div className="col-6" />

              <div className="col-6 text-left">
                가슴아래{" "}
                <span className="ml-3">
                  +{isPerm ? permPrice.chest : dyePrice.chest}원
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="ac_back text-left d-flex" style={boxStyle}>
      <div>
        <div className="ac_title">※ 유의사항</div>
        <div className="ac_body">
          우리 예디는 프로 헤어디자이너가 아닌 예비 헤어디자이너 입니다. <br />
          예디의 레벨에 따라 선생님들의 코칭이 있을수있으니 당황하지 마세요! :)
          <br /> <br />
          당일예약은 취소 및 환불이 불가능하며, 당일 예약이 아닌 경우 표기된
          취소 수수료
          <br />
          정책을 따릅니다. 예디 사정에 의한 취소 발생 시 100% 환불 처리됩니다.
          <br /> <br />
          예디 사정으로 스케줄 및 장소가 변경될 수 있습니다. 이 경우
          안내메시지를 보내드리니 확인바랍니다
          <br /> <br />
          염색, 펌 등 추가비용이 발생하는 서비스에 대해서는 본 플랫폼이 아닌
          현장에서 <br />
          결제해주셔야 합니다.
        </div>
      </div>
      {priceImage}
    </div>
  );
};

export default AttentionCard;
