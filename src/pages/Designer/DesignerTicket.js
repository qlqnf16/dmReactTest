import React, { Component } from 'react';
import TicketBox from '../../components/UI/DesignerTicket/TicketBox/TicketBox';
import TicketCounter from '../../components/UI/DesignerTicket/TicketCounter/TicketCounter';
import TicketPurchaseButton from '../../components/UI/DesignerTicket/TicketPurchaseButton/TicketPurchaseButton';

class DesignerTicket extends Component {
  state = {
    tickets: [
      {
        price: 10000,
        purchasedAt: 201809015,
        expiredAt: null
      },
      {
        price: 28000,
        purchasedAt: 20180810,
        expiredAt: 20180811
      }
    ]
  };

  render() {
    return (
      <div className="container-fluid d">
        <div className="d_bg">
          <div className="d_container">
            <h1 className="mt-5">이용권 관리</h1>
            <div className="row">
              <div className="col-4 py-2">
                <TicketCounter
                  count={this.state.tickets.reduce(
                    (accu, pres) => (!pres.expiredAt ? accu + 1 : accu),
                    0
                  )}
                />
                <TicketPurchaseButton />
              </div>
              <div className="col-8">
                <TicketBox tickets={this.state.tickets} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DesignerTicket;
