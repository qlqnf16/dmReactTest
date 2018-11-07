import React from 'react';
import Ticket from '../../../assets/images/ticket.png';
const TicketPurchaseButton = props => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <div style={containerStyle} onClick={() => props.purchaseHandler(10000)}>
      <img src={Ticket} style={{ width: '40%' }} />
      <div style={textStyle}>1개월 이용권</div>
      <div style={puchaseButtonStyle}>10,000원</div>
    </div>
    <div style={containerStyle} onClick={() => props.purchaseHandler(28000)}>
      <img src={Ticket} style={{ width: '40%' }} />
      <div style={textStyle}>3개월 이용권</div>
      <div style={puchaseButtonStyle}>28,000원</div>
    </div>
  </div>
);

const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    boxShadow: '1px 2px 15px 0 rgba(0, 0, 0, 0.1)',
    width: '40%',
    height: 150,
    marginBottom: '5%'
  },
  textStyle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#4c91ba'
  },
  puchaseButtonStyle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#4c91ba',
    width: '100%',
    textAlign: 'center',
    marginTop: '16%',
    fontSize: '2rem',
    padding: '7% 0'
  }
};

const { containerStyle, textStyle, puchaseButtonStyle } = styles;

export default TicketPurchaseButton;
