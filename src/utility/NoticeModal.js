import React from "react";
import { Modal, ModalBody } from "reactstrap";
import Notice from "../assets/images/notice.jpeg";

const NoticeModal = () => {
  return (
    <Modal fade={true} centered isOpen={true}>
      <ModalBody
        className="m-0 p-0"
        style={{
          backgroundImage: `url(${Notice})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "50vh",
          backgroundPosition: "center center"
        }}
      >
        <div
          style={{
            height: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            fontSize: "20px"
          }}
        >
          <div className="py-3 px-5">
            <span
              style={{
                fontSize: "30px",
                display: "block",
                marginBottom: "30px"
              }}
            >
              공지 사항
            </span>
            공지사항이 있습니다. 서버가 다운되어 버렸어요. 잠시 뒤에 다시
            시도해주세요.
          </div>
        </div>
        {/* <img src={Notice} alt="alt" style={{ width: "100%", height: "100%" }} /> */}
      </ModalBody>
    </Modal>
  );
};

export default NoticeModal;
