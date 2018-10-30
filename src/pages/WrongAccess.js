import React, { Component } from 'react';
import alart from '../assets/images/alart.png';

class WrongAccess extends Component {
  state = {
    timeOut: false
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ timeOut: true });
    }, 1000);
  };

  render() {
    if (this.state.timeOut) {
      return (
        <div>
          <div
            style={{
              height: 200,
              width: 200,
              margin: '0 auto',
              marginTop: 100,
              textAlign: 'center'
            }}
            className="d-flex justify-content-center "
          >
            <img
              alt="alt"
              style={{ height: '100%', width: '100%' }}
              src={alart}
            />
          </div>
          <div className="d-flex justify-content-center h1 mt-5 font-weight-bold">
            잘못된 접근입니다.
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
export default WrongAccess;
