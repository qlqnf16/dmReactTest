import React, { Component } from 'react';
import DesignerNav from '../../components/NavigationBar/DesignerNav';
import { connect } from 'react-redux';
import * as actions from '../../../modules';
import axios from 'axios';
import TicketBox from '../../components/Tickets/TicketBox';
import TicketPurchaseButton from '../../components/Tickets/TicketPurchase';

class DesignerTicket extends Component {
  state = {
    madeRequest: false,
    tickets: [
      {
        price: 10000,
        createdAt: 1540795759135,
        expiredAt: null
      },
      {
        price: 28000,
        createdAt: 1540795759135,
        expiredAt: 20180811
      }
    ]
  };

  componentDidMount = async () => {
    // iamport 사용하기 위한 inline script 작성
    let links = [
      'https://code.jquery.com/jquery-1.12.4.min.js',
      'https://cdn.iamport.kr/js/iamport.payment-1.1.5.js'
    ];

    for (let link of links) {
      const script = document.createElement('script');

      script.src = link;
      script.async = true;
      document.body.appendChild(script);
    }

    if (!this.state.madeRequest) {
      this.reloadTicket();
    }
  };

  reloadTicket = async () => {
    const { data } = await axios.get(
      `http://52.79.227.227:3030/users/${this.props.userData._id}/tickets`
    );
    await this.setState({ tickets: data, madeRequest: true });
  };

  purchaseHandler = kind => {
    const { IMP } = window;
    IMP.init('imp06037656');
    IMP.request_pay(
      {
        pg: 'danal', // version 1.1.0부터 지원.
        pay_method: 'card',
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: '주문명: 디자이너 이용권',
        amount: 500,
        buyer_name: this.props.userData.name,
        buyer_tel: this.props.userData.phoneNumber
      },
      async rsp => {
        if (rsp.success) {
          const { data } = await axios.post(
            `http://52.79.227.227:3030/users/${
              this.props.userData._id
            }/tickets`,
            { price: kind }
          );
          await this.props.updateRedux('_tickets', [
            ...this.props.userData._tickets,
            data
          ]);
          await this.reloadTicket();
          alert('결제가 완료되었습니다. 결제 금액 : ' + rsp.paid_amount);
        } else {
          var errMsg = '결제에 실패하였습니다.';
          errMsg += ' 에러내용 : ' + rsp.error_msg;
          alert(errMsg);
        }
      }
    );
  };

  ticketActivate = async ticketId => {
    if (
      this.props.userData.expiredAt &&
      this.props.userData.expiredAt > new Date().getTime()
    )
      return alert('아직 사용중인 이용권이 있습니다');

    const { data } = await axios.patch(
      `http://52.79.227.227:3030/users/${
        this.props.userData._id
      }/tickets/${ticketId}`
    );
    await this.props.updateRedux('expiredAt', data.expiredAt);
    alert('적용되었습니다.');
    await this.reloadTicket();
  };

  render() {
    return (
      <div>
        <DesignerNav />
        <div className="m_containerStyle">
          <div style={containerStyle}>
            <div style={titleStyle}>이용권 관리</div>
            <div style={subtitleStyle}>보유 이용권</div>
            <TicketBox
              tickets={this.state.tickets}
              ticketActivate={this.ticketActivate}
            />
            <div style={subtitleStyle}>이용권 구매</div>
            <TicketPurchaseButton purchaseHandler={this.purchaseHandler} />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  containerStyle: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  titleStyle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#4c91ba',
    textAlign: 'left',
    margin: '33.5px 0',
    paddingBottom: 6.9,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
  },
  subtitleStyle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1f3354'
  }
};

const { containerStyle, titleStyle, subtitleStyle } = styles;

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(
  mapStateToProps,
  actions
)(DesignerTicket);
