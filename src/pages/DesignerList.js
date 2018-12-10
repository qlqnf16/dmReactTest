import React, { Component } from 'react';
import DesignerCard from '../components/DesignerCard/DesignerCard';
import Filter from '../components/DesignerCard/Filter/Filter';
import { CardDeck } from 'reactstrap';
import axios from '../config/Axios';
import firebase from '../config/Firebase';
import step1 from '../assets/images/step1.png';

import './PageCss.css';

class DesignerList extends Component {
  constructor() {
    super();
    this.state = {
      recruits: [],
      madeRequest: false,
      filter: null
    };
  }

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      // const { data } = await axios.get('recruits');
      // const filteredData = data.filter(
      //   d =>
      //     d._designer &&
      //     d._designer.expiredAt &&
      //     d._designer.expiredAt > new Date().getTime() &&
      //     d._cards.some(card => card.reservable)
      // );

      const { data } = await axios.get('cards');

      let recruits = data.map(d => d._recruit);
      let filteredData = [];
      const counter = {};
      recruits.forEach(recruit => {
        if (
          recruit &&
          !counter[recruit._id] &&
          recruit._designer &&
          recruit._designer.expiredAt &&
          recruit._designer.expiredAt > new Date().getTime()
        ) {
          filteredData.push(recruit);
          counter[recruit._id] = true;
        }
      });

      filteredData.sort((a, b) => {
        if (a.score < b.score) return 1;
        else if (a.score > b.score) return -1;
        else return 0;
      });
      this.setState({
        recruits: filteredData,
        madeRequest: true
      });
    }

    //시/도
    await firebase
      .database()
      .ref(`/users`)
      .on('value', async res => {
        const filterAddresses = [];
        let filterSido = [];
        if (res.val()) {
          Object.values(res.val()).forEach(user => {
            if (user.addresses && user.addresses !== undefined) {
              user.addresses.forEach(address => {
                filterSido.push(address.sido);
              });
              filterAddresses.push(user.addresses);
            }
          });
          filterSido = new Set(filterSido);
          filterSido = [...filterSido].sort();
          await this.setState({
            filterAddresses,
            filterSido,
            madeRequest: true
          });
        }
      });
  };

  getFilteredCards = async () => {
    let must = '';
    let gender = '';
    let no = '';
    let date = '';
    let sido = '';
    let sigungu = '';
    console.log(this.state.date);
    if (this.state.sido) sido = `sido=${this.state.sido}&`;
    if (this.state.sigungu) sigungu = `sigungu=${this.state.sigungu}&`;

    if (this.state.date) date = `date=${new Date(this.state.date).getTime()}&`;

    if (this.state.gender) gender = `gender=${this.state.gender}&`;

    if (this.state.cut === '100') must += 'cut=1&';
    else if (this.state.cut === '0') no += 'cut=2&';
    if (this.state.perm === '100') must += 'perm=1&';
    else if (this.state.perm === '0') no += 'perm=2&';
    if (this.state.dye === '100') must += 'dye=1&';
    else if (this.state.dye === '0') no += 'dye=2&';
    if (no === 'cut=2&perm=2&dye=2&')
      return alert('받으실 서비스를 선택해주세요');
    const { data } = await axios.get(
      'cards?' + must + no + gender + date + sido + sigungu
    );

    let recruits = data.map(d => d._recruit);

    let uniqueRecruits = [];
    const counter = {};
    recruits.forEach(recruit => {
      if (
        recruit &&
        !counter[recruit._id] &&
        recruit._designer.expiredAt &&
        recruit._designer.expiredAt > new Date().getTime()

        // recruit._cards.some(card => card.reservable)
      ) {
        uniqueRecruits.push(recruit);
        counter[recruit._id] = true;
      }
    });

    this.setState({
      recruits: uniqueRecruits
    });
  };

  filterChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  render() {
    let recruits = (
      <div
        className="col-12"
        style={{
          textAlign: 'center',
          marignTop: '20px',
          height: '450px',
          lineHeight: '430px',
          fontSize: '40px',
          color: 'rgba(0,0,0,0.5)',
          border: 'solid 1px rgba(0,0,0,0.2)',
          padding: '10px',
          borderRadius: '5px'
        }}
      >
        검색 결과가 없습니다.
      </div>
    );
    if (this.state.recruits.length) {
      recruits = this.state.recruits.map((recruit, key) => (
        <DesignerCard key={key} recruit={recruit} />
      ));
    }

    let sigungu = [];
    if (this.state.filterAddresses) {
      this.state.filterAddresses.forEach(address => {
        address.forEach(ad => {
          if (ad.sido === this.state.sido) sigungu.push(ad.sigungu);
        });
      });
      sigungu = new Set(sigungu);
      sigungu = [...sigungu].sort();
    }
    return (
      <div>
        <div className="mb-5 text-center">
          <img alt="alt" style={{ width: '100%' }} src={step1} />
        </div>
        <div className="row" style={{ width: '92%', margin: 'auto' }}>
          <Filter
            getFilteredCards={this.getFilteredCards}
            filterChangeHandler={e => this.filterChangeHandler(e)}
            checked={this.state.gender}
            state={this.state}
            sigungu={sigungu}
          />
          <div className="col-9">
            <CardDeck style={{ marginLeft: '1%' }}>{recruits}</CardDeck>
          </div>
        </div>
      </div>
    );
  }
}

export default DesignerList;
