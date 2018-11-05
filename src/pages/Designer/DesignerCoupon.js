import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "../../config/Firebase";
import CouponContent from "../../components/CouponContent/CouponContent";

class DesignerCoupon extends Component {
  render() {
    return (
      <div className="container-fluid d">
        <div className="d_bg">
          <div className="d_container">
            <div className="u_title" style={{ color: "#4c91ba" }}>
              추천인 코드
            </div>
            <div className="uif_title ">추천인 코드</div>
          </div>
          <div className="row" style={{ marginBottom: "4.4rem" }}>
            <div className="col-2 if_head uif_head">추천인 코드</div>
            <div className="col-8">
              <CouponContent
                couponNumber={firebase.auth().currentUser.uid}
                isD={true}
                recommendationNum={this.props.userData.designerRecommendation}
              />{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(mapStateToProps)(DesignerCoupon);
