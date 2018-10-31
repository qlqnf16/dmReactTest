import React, { Component } from 'react';
import AdminNav from '../../components/Navigation/AdminNav/AdminNav';
import axios from 'axios';
import Moment from 'react-moment';

class MakeCoupon extends Component {
  state = {
    coupons: [],
    designerCoupons: [],
    madeRequest: false
  };

  reloadCoupon = async () => {
    const { data } = await axios.get(`http://52.79.227.227:3030/coupons`);
    const coupons = [];
    const designerCoupons = [];
    data.forEach(d => {
      !d.forDesigner ? coupons.push(d) : designerCoupons.push(d);
    });
    this.setState({ coupons, designerCoupons, madeRequest: true });
  };
  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      this.reloadCoupon();
    }
  };

  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  makeCoupon = async () => {
    await axios.post(`http://52.79.227.227:3030/coupons`, {
      point: this.state.point,
      number: this.state.number,
      forDesigner: false
    });
    await this.setState({ point: 0, number: 0 });

    await this.reloadCoupon();
    alert('생성 완료');
  };

  makeDesignerCoupon = async () => {
    await axios.post(`http://52.79.227.227:3030/coupons`, {
      point: this.state.month,
      number: this.state.DNumber,
      forDesigner: true
    });
    await this.setState({ month: 0, DNumber: 0 });

    await this.reloadCoupon();
    alert('생성 완료');
  };

  render() {
    let coupons, designerCoupons;
    if (this.state.coupons) {
      coupons = this.state.coupons.map((coupon, key) => (
        <div key={key} className="row">
          <div className="col-3">{coupon.point}</div>
          <div className="col-3">{coupon._id}</div>
          <div className="col-3">
            {coupon._user ? coupon._user._id : '미사용'}
          </div>
          <div className="col-3">
            <Moment format="YYYY/MM/DD HH:mm:ss">{coupon.createdAt}</Moment>
          </div>
        </div>
      ));
      designerCoupons = this.state.designerCoupons.map(
        (designerCoupon, key) => (
          <div key={key} className="row col-12">
            <div className="col-3">{designerCoupon.point}</div>
            <div className="col-3">{designerCoupon._id}</div>
            <div className="col-3">
              {designerCoupon._user ? designerCoupon._user._id : '미사용'}
            </div>
            <div className="col-3">
              <Moment format="YYYY/MM/DD HH:mm:ss">
                {designerCoupon.createdAt}
              </Moment>
            </div>
          </div>
        )
      );
    }
    return (
      <div>
        <AdminNav />
        <div className="h1 hard">쿠폰 발행</div>
        <div className="row">
          <div className="row col-6">
            <div className="col-12 h2 hard">유저용</div>
            <div className="col-2 if_head">개월수</div>
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
            <div className="col-12 h2 hard">디자이너용</div>
            <div className="col-2 if_head">포인트</div>
            <div className="col-3">
              <select
                type="month"
                name="month"
                id="month"
                onChange={this.inputChangeHandler}
                className="if_input"
              >
                <option value="10000">1개월</option>
                <option value="28000">3개월</option>
              </select>
            </div>
            <div className="col-2 if_head">장수</div>
            <div className="col-3">
              <input
                type="DNumber"
                name="DNumber"
                id="DNumber"
                onChange={this.inputChangeHandler}
                className="if_input"
              />
            </div>
            <div onClick={this.makeDesignerCoupon} className="btn col-2">
              만들기
            </div>
            <div className="h2 col-12">디자이너용 쿠폰</div>
            <div className="row col-12">
              <div className="col-3">포인트</div>
              <div className="col-3">번호</div>
              <div className="col-3">상태</div>
              <div className="col-3">발행일</div>
            </div>
            {designerCoupons}
          </div>
          <div className="col-6">
            <div className="h2">유저용 쿠폰</div>
            <div className="row">
              <div className="col-3">포인트</div>
              <div className="col-3">번호</div>
              <div className="col-3">상태</div>
              <div className="col-3">발행일</div>
            </div>
            {coupons}
          </div>
        </div>
      </div>
    );
  }
}

export default MakeCoupon;
