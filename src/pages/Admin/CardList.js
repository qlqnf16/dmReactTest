import React, { Component } from 'react';
import axios from '../../config/Axios';
import Moment from 'react-moment';
import AdminNav from '../../components/Navigation/AdminNav/AdminNav';

class CardList extends Component {
  state = {
    cards: [],
    madeRequest: false
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      let { data } = await axios.get(`cards`);
      let filterdData = data.filter(d => d.date > new Date().getTime());
      data = filterdData.sort((a, b) => a.date - b.date);
      this.setState({
        cards: data,
        madeRequest: true
      });
    }
  };

  nameSortHandler = async () => {
    let { data } = await axios.get(`cards`);
    let filterdData = data.filter(d => d.date > new Date().getTime());
    data = filterdData.sort((a, b) => {
      if (a._recruit && b._recruit) {
        if (a._recruit._designer.name > b._recruit._designer.name) return 1;
        else return -1;
      }
    });
    this.setState({
      cards: data,
      madeRequest: true
    });
  };

  dateSortHandler = async () => {
    let { data } = await axios.get(`cards`);
    let filterdData = data.filter(d => d.date > new Date().getTime());
    data = filterdData.sort((a, b) => a.date - b.date);
    this.setState({
      cards: data,
      madeRequest: true
    });
  };

  render() {
    if (this.state.madeRequest) {
      const cards = this.state.cards.map((card, key) => (
        <tr key={key}>
          <td>{card._recruit && card._recruit._designer.name}</td>
          <td>
            <Moment format="YYYY/MM/DD">{card.createdAt}</Moment>{' '}
          </td>
          <td>
            <Moment format="YYYY/MM/DD">{card.date}</Moment>
          </td>
          <td>
            {card.ableTimes.map(ableTime => (
              <div>
                {Math.floor(ableTime.since / 60)}:{ableTime.since % 60} ~
                {Math.floor(ableTime.until / 60)}:{ableTime.until % 60}
              </div>
            ))}
          </td>
          <td>{card.fullAddress}</td>
          <td>{card.shop}</td>
          <td>{card.requireGender}</td>
          <td>
            {card._recruit &&
            card._recruit._designer.expiredAt &&
            card._recruit._designer.expiredAt > new Date().getTime()
              ? 'O'
              : 'X'}
          </td>
        </tr>
      ));
      return (
        <div>
          <AdminNav />
          <h1>카드 리스트</h1>
          <table className="table text-center">
            <thead>
              <tr>
                <th onClick={this.nameSortHandler}>이름</th>
                <th>카드 생성일</th>
                <th onClick={this.dateSortHandler}>날짜</th>
                <th>가능 시간</th>
                <th>주소</th>
                <th>샵</th>
                <th>모델 성별</th>
                <th>이용권 사용중</th>
              </tr>
            </thead>
            <tbody>{cards}</tbody>
          </table>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default CardList;
