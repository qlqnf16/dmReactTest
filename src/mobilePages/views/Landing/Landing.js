import React, { Component } from 'react';
import temporaryLanding from '../../../assets/images/temp-landing.jpg';
import './Landing.css';

export default class Landing extends Component {
  render() {
    return (
      <img
        id="temporary-landing"
        src={temporaryLanding}
        alt="temporary landing image"
      />
    );
  }
}
