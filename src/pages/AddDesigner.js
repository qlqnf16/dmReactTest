import React, { Component } from "react";
import { Form, FormGroup } from "reactstrap";
import axios from "axios";
import fd from "form-data";
import InfoForm from "../components/InfoForm/InfoForm";
import { connect } from "react-redux";
import firebase from "../config/Firebase";
import check_sm from "../assets/images/check_sm.png";
import "./PageCss.css";

class AddDesigner extends Component {
  constructor(props) {
    super(props);

    let {
      name,
      gender,
      birthday,
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      addresses,
      designerRecommendationCode,
      cert_mh,
      cert_jg,
      isRegister
    } = this.props.userData;
    if (!addresses) addresses = [];
    this.state = {
      name,
      gender,
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      year: birthday && birthday.year,
      month: birthday && birthday.month,
      day: birthday && birthday.day,
      certImg1: cert_mh,
      certFile1: null,
      certImg2: cert_jg,
      certFile2: null,
      addressNum: addresses.length + 1,
      addresses,
      designerRecommendationCode,
      isRegister
    };
  }

  componentDidMount = async () => {
    if (this.props.userData.isApproval === false && !this.props.userData.isD)
      alert("예비디자이너 승인 대기중입니다.");

    // iamport 사용하기 위한 inline script 작성
    let links = [
      "https://code.jquery.com/jquery-1.12.4.min.js",
      "https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
    ];

    for (let link of links) {
      const script = document.createElement("script");

      script.src = link;
      script.async = true;
      document.body.appendChild(script);
    }
  };

  addressAddHandler = () => {
    this.setState({
      addressNum: this.state.addressNum + 1
    });
  };

  addressRemoveHandler = i => {
    let addresses = this.state.addresses;
    addresses.splice(i, 1);
    this.setState({
      addressNum: this.state.addressNum - 1,
      addresses
    });
  };

  handleImgChange = e => {
    let file = e.target.files[0];
    switch (e.target.name) {
      case "cert1":
        this.setState({ certImg1: URL.createObjectURL(file) });
        this.setState({ certFile1: file });
        break;
      case "cert2":
        this.setState({ certImg2: URL.createObjectURL(file) });
        this.setState({ certFile2: file });
        break;
      default:
        console.log("something wrong in [AddDesigner.js]");
    }
  };

  dYear = 0;
  dMonth = 0;
  careerYear = 0;
  careerMonth = 0;
  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (target.id === "dYear" || target.id === "dMonth") {
      if (target.id === "dYear") {
        this.dYear = Number(value);
      } else if (target.id === "dMonth") {
        this.dMonth = Number(value);
      }
      this.setState({ untilDesigner: this.dYear * 12 + this.dMonth });
    } else if (target.id === "careerYear" || target.id === "careerMonth") {
      if (target.id === "careerYear") {
        this.careerYear = Number(value);
      } else if (target.id === "careerMonth") {
        this.careerMonth = Number(value);
      }
      this.setState({ career: this.careerYear * 12 + this.careerMonth });
    } else if (target.name === "extraAddress") {
      let addresses = this.state.addresses;
      let address = addresses[target.id];
      addresses[target.id] = { ...address, extraAddress: target.value };
      this.setState({ addresses });
    } else {
      this.setState({ [name]: value });
    }
  }

  handleAddress = (data, fullAddress, num) => {
    const { sido, sigungu } = data;
    const address = { sido, sigungu, fullAddress };
    let addresses = this.state.addresses;
    addresses[num] = address;
    this.setState({ addresses });
  };

  submitHandler = async () => {
    const {
      name,
      gender,
      year,
      month,
      day,
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      addresses,
      designerRecommendationCode,
      isRegister
    } = this.state;

    let firebaseUserData = {
      name,
      gender,
      birthday: { year, month, day },
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      addresses,
      isApproval: false,
      isRegister
    };
    // if (
    //   Object.values(firebaseUserData).includes(undefined) ||
    //   Object.values(firebaseUserData.birthday).includes('null') ||
    //   addresses.length === 0
    // )
    //   return alert('채워지지 않은 정보가 있습니다');
    console.log(firebaseUserData);
    if (!firebaseUserData.name) return alert("이름을 작성해주세요");
    if (!firebaseUserData.gender) return alert("성별을 작성해주세요");
    if (!firebaseUserData.email) return alert("이메일을 작성해주세요");
    if (
      Object.values(firebaseUserData.birthday).includes("null") ||
      Object.values(firebaseUserData.birthday).includes(undefined)
    )
      return alert("생년월일을 작성해주세요");
    if (!firebaseUserData.phoneNumber)
      return alert("휴대폰 번호를 작성해주세요");
    if (firebaseUserData.phoneNumber.length !== 11)
      return alert("정확한 휴대폰 번호를 입력해주세요");
    if (!this.state.isRegister) return alert("휴대폰 인증을 먼저 해주세요");
    if (!Object.values(firebaseUserData.addresses).length)
      return alert("지역/샵주소를 작성해주세요");
    if (
      !firebaseUserData.addresses[0].fullAddress ||
      !firebaseUserData.addresses[0].extraAddress
    )
      return alert("지역/샵주소를 작성해주세요");
    if (!firebaseUserData.untilDesigner)
      return alert("디자이너까지 남은 기간을 작성해주세요");
    if (!firebaseUserData.career) return alert("미용 경력을 작성해주세요");

    if (
      designerRecommendationCode &&
      !this.props.userData.designerRecommendationCode
    ) {
      let count = 0;
      let result = null;
      const fbPromise = new Promise(resolve => {
        firebase
          .database()
          .ref("users/" + designerRecommendationCode)
          .on("value", res => {
            resolve(res);
          });
      });

      result = await fbPromise;
      if (!result || designerRecommendationCode === this.props.userData.uid) {
        alert("유효하지 않은 추천인 코드 입니다.");
      } else {
        let { designerRecommendation, _id } = result.val();
        if (designerRecommendation) count = designerRecommendation;
        firebaseUserData = { ...firebaseUserData, designerRecommendationCode };
        count += 1;

        if (count === 2) {
          count = 0;
          await axios.post(`users/${_id}/tickets`, {
            price: 10000
          });
        }

        await firebase
          .database()
          .ref("users/" + designerRecommendationCode)
          .update({ designerRecommendation: count });
      }
    }

    await firebase
      .database()
      .ref("users/" + this.props.userData.uid)
      .update(firebaseUserData);
    alert(
      "성공적으로 신청되었습니다. \n관리자의 승인을 거친 후 정상적으로 스케줄을 등록하실 수 있습니다."
    );

    const formData = new fd();
    formData.append("cert_mh", this.state.certFile1);
    formData.append("cert_jg", this.state.certFile2);
    await axios.post(
      `firebase/upload?uid=${this.props.userData.uid}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    this.props.history.push("/");
  };

  phoneCert = () => {
    if (!this.state.phoneNumber) return alert("휴대폰 번호를 먼저 입력하세요");

    const { IMP } = window;
    IMP.init("imp06037656");
    IMP.certification(
      {
        merchant_uid: "merchant_" + new Date().getTime()
      },
      rsp => {
        if (rsp.success) {
          // 인증성공
          this.setState({ isRegister: true });
          alert("인증되었습니다");
        } else {
          // 인증취소 또는 인증실패
          var msg = "인증에 실패하였습니다.";
          msg += "에러내용 : " + rsp.error_msg;
          alert(msg);
        }
      }
    );
  };

  render() {
    let isRegister = "";
    if (!this.state.isRegister) {
      isRegister = (
        <div
          className="btn uif_button uif_phone col-1"
          onClick={() => this.phoneCert()}
        >
          인증
        </div>
      );
    } else {
      isRegister = (
        <div className="uif_registered col-1">
          <img style={{ width: "1.4rem" }} src={check_sm} alt="alt" />
          인증됨
        </div>
      );
    }

    return (
      <div className="container-fluid ad">
        <Form className="m-5">
          <div className="ad_title">
            <p
              style={{
                fontWeight: "normal",
                fontSize: "1.3rem",
                marginBottom: "0.5rem"
              }}
            >
              예비디자이너 등록
            </p>
            드리머리 예디가 되어 <br /> 모델을 구해보세요
          </div>
          <InfoForm
            state={this.state}
            checked={!this.state.gender ? null : this.state.gender}
            certImg1={this.state.certImg1}
            certFile1={this.state.certFile1}
            certImg2={this.state.certImg2}
            certFile2={this.state.certFile2}
            imgChange={e => this.handleImgChange(e)}
            changeInput={e => this.handleInputChange(e)}
            handleAddress={this.handleAddress}
            addressAddHandler={this.addressAddHandler}
            addressRemoveHandler={this.addressRemoveHandler}
            isRegister={isRegister}
          />
          <FormGroup row>
            <div className="col-3 if_head">추천인 코드</div>
            <div className="col-9 d-flex justify-content-left">
              <input
                type="text"
                name="designerRecommendationCode"
                id="designerRecommendationCode"
                value={this.state.designerRecommendationCode}
                onChange={
                  this.props.userData.designerRecommendationCode
                    ? null
                    : e => this.handleInputChange(e)
                }
                className="if_input"
                placeholder="선택사항"
              />
            </div>
          </FormGroup>
          <FormGroup row>
            <div className="col-3" />
            <div className="text-center col-9">
              <div className="ad_button" onClick={this.submitHandler}>
                예디 등록하기
              </div>
            </div>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(mapStateToProps)(AddDesigner);
