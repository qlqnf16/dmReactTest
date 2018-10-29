import React, { Component } from 'react';
import AdminNav from '../../components/Navigation/AdminNav/AdminNav';
import axios from 'axios';

class MakeCoupon extends Component {
  state = {
    coupons: {},
    madeRequest: false
  };

  reloadCoupon = async () => {
    const { data } = await axios.get(`http://52.79.227.227:3030/쿠폰디비`);
    this.setState({ coupons: data, madeRequest: true });
  };
  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      // this.reloadCoupon()
    }
  };

  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  makeCoupon = async () => {
    // await axios.post(`http://52.79.227.227:3030/쿠폰디비`, {
    //   point: this.state.point,
    //   number: this.state.number
    // });
    // await this.setState({ point: 0, number: 0 });

    await this.reloadCoupon();
    await alert('생성 완료');
  };
  render() {
    return (
      <div>
        <AdminNav />
        쿠폰 발행
        <div className="row">
          <div className="row col-6">
            <div className="col-2 if_head">포인트</div>
            <div className="col-3">
              <input
                type="point"
                name="point"
                id="point"
                onChange={this.inputChangeHandler}
                className="if_input"
              />
            </div>
            <div className="col-2 if_head">장수</div>
            <div className="col-3">
              <input
                type="number"
                name="number"
                id="number"
                onChange={this.inputChangeHandler}
                className="if_input"
              />
            </div>
            <div onClick={this.makeCoupon} className="btn col-2">
              만들기
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-4">포인트</div>
              <div className="col-4">번호</div>
              <div className="col-4">상태</div>
            </div>
            <div className="row">
              <div className="col-4">1000</div>
              <div className="col-4">asdfaweasdgf</div>
              <div className="col-4">사용됨</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MakeCoupon;
