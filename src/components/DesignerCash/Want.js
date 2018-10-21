import React, { Component, Fragment } from 'react';
import './Cash.css';
import { FormGroup } from 'reactstrap';
class Want extends Component {
  render() {
    return (
      <Fragment>
        <div className="col-lg-5 ">
          <div className="cash_want_table">
            <div className="cash_want_title">출금 금액</div>
            <div className="cash_want_content">
              <div className="cash_want_row">
                <div className="px-0 col-6">2018/10/01 11:00~13:00</div>
                <div className="px-0 col-3">커트 / 염색</div>
                <div style={{ textAlign: 'center' }} className="px-0 col-3">
                  30,000원
                </div>
              </div>
              <div className="cash_want_row">
                <div className="px-0 col-6">2018/10/01 11:00~13:00</div>
                <div className="px-0 col-3">커트 / 염색</div>
                <div style={{ textAlign: 'center' }} className="px-0 col-3">
                  30,000원
                </div>
              </div>
              <div className="cash_want_row">
                <div className="px-0 col-6">2018/10/01 11:00~13:00</div>
                <div className="px-0 col-3">커트 / 염색</div>
                <div style={{ textAlign: 'center' }} className="px-0 col-3">
                  30,000원
                </div>
              </div>
            </div>
            <div className="cash_want_result">
              <div className="col-6 px-0">세금</div>
              <div className="col-6 px-0 text-right">0원</div>
              <div className="col-6 px-0 cash_result_price">최종 출금 금액</div>
              <div className="col-6 px-0 cash_result_price text-right">
                270,000원
              </div>
            </div>
            <div className="cash_want_final">수고하셨습니다!</div>
          </div>
        </div>
        <div className="col-lg-7 cash_form_body">
          <div style={{ marginTop: '1rem' }} className="cash_want_title">
            신청 정보
          </div>
          <div className="p-2">
            <FormGroup className="my-2" row>
              <div className="col-2 if_head">성명</div>
              <div className="col-10">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="성명"
                  className="if_input"
                />
              </div>
            </FormGroup>
            <FormGroup className="my-2" row>
              <div className="col-2 if_head">정보1</div>
              <div className="col-10">
                <input
                  type="text"
                  name="info"
                  id="info"
                  placeholder="정보"
                  className="if_input"
                />
              </div>
            </FormGroup>
            <FormGroup className="my-2" row>
              <div className="col-2 if_head">예금주명</div>
              <div className="col-10">
                <input
                  type="text"
                  name="account_name"
                  id="account_name"
                  placeholder="예금주명"
                  className="if_input"
                />
              </div>
            </FormGroup>
            <FormGroup className="my-2" row>
              <div className="col-2 if_head">계좌정보</div>
              <div className="col-3">
                <select className="if_input ">
                  <option>국민은행</option>
                  <option>하나은행</option>
                  <option>기업은행</option>
                </select>
              </div>
              <div className="col-7 pl-0">
                <input
                  type="number"
                  name="account"
                  id="account"
                  placeholder="계좌정보"
                  className="if_input"
                />
              </div>
            </FormGroup>
            <FormGroup className="my-2" row>
              <div className="col-2 if_head">신청금액</div>
              <div className="col-10">
                <input
                  type="number"
                  name="cash"
                  id="cash"
                  placeholder="신청금액"
                  className="if_input"
                />
              </div>
            </FormGroup>
            <div className="row mt-5">
              <div className="col-md-2" />
              <div className="col-md-10 col-12 ">
                <div className="row mx-0">
                  <div>
                    <input type="checkbox" id="read" name="read" value="read" />
                    <label for="read" />
                  </div>
                  <div
                    style={{
                      fontSize: '1.1rem',
                      color: '#1f3354',
                      lineHeight: '2',
                      marginLeft: '0.5rem'
                    }}
                  >
                    아래 출금 안내 및 주의사항을 읽고 동의합니다
                  </div>
                </div>
                <div className="cash_want_warning">
                  <p className="mb-0">
                    * 드리머리 특성상 출금 신청이 완료되면 취소할 수 없습니다.
                    소득세법 제 129조에 따라 5만원 초과 시 상금의 22%에 해당하는
                    제세공과금(10원 미만 단위 절삭)을 제외한 금액이 지금됩니다.
                    뭐 이러한 법적인 것들 동의할 것들 넣으시면 될 것 같습니다.{' '}
                  </p>
                  <p className="mb-0">
                    * 지급전 서비스 탈퇴 시, 신청 정보가 삭제되어 지급이 되지
                    않습니다.
                  </p>
                  <p className="mb-0">
                    * 출금 신청에 어려움을 겪으실 경우 문의하기를 이용해주세요.
                  </p>
                </div>
                <div className="cash_want_button">출금 신청</div>
                <div className="py-1" style={{ color: '#1f3354' }}>
                  최대 7일 이내 입금됩니다. 신청 정보가 부정확한 경우, 신청이
                  반려되며 재신청 하셔야 합니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Want;
