import React, { Component } from "react";
import ScheduleBox from "../../components/DesignerSchedule/ScheduleBox/ScheduleBox";
import axios from "axios";
import firebase from "../../config/Firebase";
import { connect } from "react-redux";
class Schedule extends Component {
  state = {
    cards: [],
    madeRequest: false,
    newCards: [],
    requireTime: {}
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get(
        `http://52.79.227.227:3030/recruits/${this.props.userData._recruit}`
      );
      this.setState({
        cards: data._cards,
        madeRequest: true,
        newCards: [],
        requireTime: data.requireTime
      });
      console.log(this.state.cards);
    }
  };

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  reloadCardData = async () => {
    const { data } = await axios.get(
      `http://52.79.227.227:3030/recruits/${this.props.userData._recruit}`
    );
    await this.setState({ cards: data._cards, madeRequest: true });
  };

  cancelCardHandler = async (cardId, recruitId) => {
    await axios.delete(
      `http://52.79.227.227:3030/recruits/${recruitId}/cards/${cardId}`
    );
    await this.reloadCardData();
  };

  cardAddHandler = async cardData => {
    console.log(cardData);
    Object.values(cardData.must).forEach(must => {
      if (Object.values(cardData.no).some(no => no === must))
        return alert("필수 서비스와 불가 서비스는 같을 수 없습니다");
    });
    if (
      Object.values(cardData).includes(undefined) ||
      Object.values(cardData).includes("null") ||
      Object.values(cardData).includes(NaN) ||
      cardData.ableTimes.length === 0
    )
      return alert("채워지지 않은 정보가 있습니다");

    let newCards = this.state.newCards;
    let nCards = [];
    newCards.push(cardData);
    nCards = [...newCards];

    this.setState({ newCards: nCards });
  };

  totalSubmitHandler = async recruitData => {
    console.log(recruitData);
    let shops;
    shops = this.props.userData.addresses.map(address => address.extraAddress);
    console.log(shops);
    recruitData["shops"] = shops;
    if (
      !this.props.userData.expiredAt ||
      this.props.userData.expiredAt < new Date().getTime()
    )
      return alert("사용중인 이용권이 없습니다.");
    //안 채워진 정보 검증
    if (
      Object.values(recruitData).includes("") ||
      Object.values(recruitData).includes(null) ||
      Object.values(recruitData.requireTime).length !== 3 ||
      Object.values(recruitData.requireTime).includes("null")
    )
      return alert("채워지지 않은 정보가 있습니다");
    // 유저에 리크루트 없으면 생성
    if (!this.props.userData._recruit) {
      console.log("최초 생성");
      const res = await axios.post(
        "http://52.79.227.227:3030/recruits",
        recruitData
      );
      console.log(res);
      //firebase에 _recruit 추가
      await firebase
        .database()
        .ref("users/" + this.props.userData.uid)
        .update({
          _recruit: res.data._id
        });
      for (const newCard of this.state.newCards) {
        await axios.post(
          `http://52.79.227.227:3030/recruits/${
            this.props.userData._recruit
          }/cards`,
          newCard
        );
      }
      await this.reloadCardData();
      await this.setState({ newCards: [] });

      // 유저가 이미 리크루트 있으면 수정
    } else {
      console.log("정보 수정");

      await axios.patch(
        `http://52.79.227.227:3030/recruits/${this.props.userData._recruit}`,
        recruitData
      );
      console.log(this.state.newCards);
      for (const newCard of this.state.newCards) {
        console.log(`시작`);
        await axios.post(
          `http://52.79.227.227:3030/recruits/${
            this.props.userData._recruit
          }/cards`,
          newCard
        );
        console.log(`끝`);
      }
      await this.reloadCardData();
    }
    // TODO : 더 좋은 방법 찾기
    // window.location.reload();
    alert(" 성공적으로 저장되었습니다! ");
  };

  render() {
    const dates = this.state.cards.map(card => card.date);

    return (
      <div className="container-fluid d">
        <div className="d_bg">
          <div className="d_container">
            <div style={{ color: "#4c91ba" }} className="u_title ">
              스케줄 등록
            </div>
            <ScheduleBox
              cards={this.state.cards}
              requireTime={this.state.requireTime}
              newCards={this.state.newCards}
              cancelCardHandler={this.cancelCardHandler}
              cardAddHandler={this.cardAddHandler}
              totalSubmitHandler={this.totalSubmitHandler}
              dates={dates}
            />
            {/* // changeInput= {e => this.handleInputChange(e)} */}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Schedule);
