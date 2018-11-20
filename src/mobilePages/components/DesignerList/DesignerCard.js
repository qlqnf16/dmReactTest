import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../../config/Firebase";

import DesignerCardImage from "./DesignerCardImage";
import DesignerCardContent from "./DesignerCardContent";

import defaultGuy from "../../../assets/images/Default_guy-01.jpg";

class DesignerCard extends Component {
  // console.log(props.recruit);
  constructor(props) {
    super(props);
  }

  state = {
    designerData: {},
    madeRequest: false
  };

  componentDidMount = async () => {
    await firebase
      .database()
      .ref("/users/" + this.props.recruit._designer._uid)
      .once("value", async res => {
        this.setState({ designerData: res.val(), madeRequest: true });
      });
  };

  componentDidUpdate = async () => {
    if (!this.props.recruit.isSecondTime) {
      this.props.recruit.isSecondTime = true;
      await firebase
        .database()
        .ref("/users/" + this.props.recruit._designer._uid)
        .once("value", async res => {
          this.setState({
            designerData: res.val(),
            madeRequest: true
          });
        });
    }
  };

  render() {
    if (this.state.designerData) {
      let { portfolios } = this.state.designerData;

      if (!portfolios || !portfolios.length) portfolios = [defaultGuy];

      return (
        <div style={containerStyle}>
          <Link to={`designerdetail/${this.props.recruit._id}`}>
            <div style={imageStyle}>
              <DesignerCardImage images={portfolios} />
            </div>
            <DesignerCardContent recruit={this.props.recruit} />
          </Link>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const styles = {
  containerStyle: {
    width: "48%",
    marginBottom: "3%"
  },
  imageStyle: {
    width: "100%",
    height: "134px"
  }
};

const { containerStyle, imageStyle } = styles;

export default DesignerCard;
