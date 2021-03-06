import React, { Component } from 'react';
import axios from '../../config/Axios';
import firebase from '../../config/Firebase';

import Header from '../components/DesignerList/Header';
import FilterButton from '../components/DesignerList/FilterButton';
import Filter from '../components/DesignerList/Filter';
import DesignerCardList from '../components/DesignerList/DesignerCardList';

import Spinner from '../../assets/images/loading_spinner.gif';

import './Pages.css';

class DesignerList extends Component {
  state = {
    recruits: [],
    madeRequest: false,
    filterOn: false,
    i: 6
    // recruitsSeen: this.recruits.slice(0, 6)
  };

  // componentDidMount = () => {
  //   window.addEventListener('scroll', this.handleOnScroll);
  // };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleOnScroll);
  };

  handleOnScroll = () => {
    let scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    let scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    let clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    let scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) + 300 >= scrollHeight;

    let recruitsSeen = this.state.recruitsSeen.concat(
      this.state.recruits.slice(this.state.i, this.state.i + 6)
    );

    if (
      scrolledToBottom &&
      this.state.recruits.length > this.state.recruitsSeen.length
    ) {
      this.setState({
        recruitsSeen,
        i: this.state.i + 6
      });
    }
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      // const { data } = await axios.get('recruits');
      // console.log(data);
      // const filteredData = data.filter(
      //   d =>
      //     d._designer &&
      //     d._designer.expiredAt &&
      //     d._designer.expiredAt > new Date().getTime() &&
      //     d._cards.some(card => card.reservable)
      // );

      // const { data } = await axios.get('cards');
      let filteredData = [];
      const state = this.props.state;
      if (
        state.gender ||
        state.date ||
        state.sido ||
        state.sigungu ||
        state.cut ||
        state.perm ||
        state.dye
      ) {
        let must = '';
        let gender = '';
        let no = '';
        let date = '';
        let sido = '';
        let sigungu = '';

        if (state.sido) sido = `sido=${state.sido}&`;
        if (state.sigungu) sigungu = `sigungu=${state.sigungu}&`;

        if (state.date) date = `date=${new Date(state.date).getTime()}&`;

        if (state.gender) gender = `gender=${state.gender}&`;

        if (state.cut === '100') must += 'cut=1&';
        else if (state.cut === '0') no += 'cut=2&';
        if (state.perm === '100') must += 'perm=1&';
        else if (state.perm === '0') no += 'perm=2&';
        if (state.dye === '100') must += 'dye=1&';
        else if (state.dye === '0') no += 'dye=2&';
        if (no === 'cut=2&perm=2&dye=2&')
          return alert('받으실 서비스를 선택해주세요');

        const { data } = await axios.get(
          'cards?' + must + no + gender + date + sido + sigungu
        );

        let recruits = data.map(d => d._recruit);
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
      } else {
        const { data } = await axios.get('recruits');
        filteredData = data.filter(
          d =>
            d._designer &&
            d._designer.expiredAt &&
            d._designer.expiredAt > new Date().getTime()
        );
      }

      filteredData.sort((a, b) => {
        if (a.score < b.score) return 1;
        else if (a.score > b.score) return -1;
        else {
          if (a._reviews.length < b._reviews.length) return 1;
          else if (a._reviews.length > b._reviews.length) return -1;
          else return 0;
        }
      });
      this.setState({ recruits: filteredData });
    }

    // 시/도
    await firebase
      .database()
      .ref(`/users`)
      .on('value', async res => {
        const filterAddresses = [];
        let filterSido = [];
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
        this.setState({ filterAddresses, filterSido, madeRequest: true });
      });
    this.setState({ recruitsSeen: this.state.recruits.slice(0, 6) });
    window.addEventListener('scroll', this.handleOnScroll);
  };

  filterToggle = () => {
    this.setState({ filterOn: !this.state.filterOn });
  };

  filterChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  getFilteredCards = async () => {
    const state = this.props.state;
    let must = '';
    let gender = '';
    let no = '';
    let date = '';
    let sido = '';
    let sigungu = '';

    if (state.sido) sido = `sido=${state.sido}&`;
    if (state.sigungu) sigungu = `sigungu=${state.sigungu}&`;

    if (state.date) date = `date=${new Date(state.date).getTime()}&`;

    if (state.gender) gender = `gender=${state.gender}&`;

    if (state.cut === '100') must += 'cut=1&';
    else if (state.cut === '0') no += 'cut=2&';
    if (state.perm === '100') must += 'perm=1&';
    else if (state.perm === '0') no += 'perm=2&';
    if (state.dye === '100') must += 'dye=1&';
    else if (state.dye === '0') no += 'dye=2&';
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
        recruit._designer &&
        recruit._designer.expiredAt &&
        recruit._designer.expiredAt > new Date().getTime()
      ) {
        uniqueRecruits.push(recruit);
        counter[recruit._id] = true;
      }
    });
    uniqueRecruits.sort((a, b) => {
      if (a.score < b.score) return 1;
      else if (a.score > b.score) return -1;
      else {
        if (a._reviews.length < b._reviews.length) return 1;
        else if (a._reviews.length > b._reviews.length) return -1;
        else return 0;
      }
    });

    this.setState({
      recruits: uniqueRecruits,
      recruitsSeen: uniqueRecruits.slice(0, 6)
    });
    this.props.useFilter();
    this.filterToggle();
  };

  refreshFilter = async () => {
    await this.props.refreshFilter();
    await this.getFilteredCards();
  };

  render() {
    let sigungu = [];
    if (this.state.filterAddresses) {
      this.state.filterAddresses.forEach(address => {
        address.forEach(ad => {
          if (ad.sido === this.props.state.sido) sigungu.push(ad.sigungu);
        });
      });
      sigungu = new Set(sigungu);
      sigungu = [...sigungu].sort();
    }
    const refreshButton = (
      <div
        onClick={() => this.refreshFilter()}
        // onClick={() => window.location.reload()}
        style={{
          width: '85%',
          height: '33px',
          borderRadius: '5px',
          boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
          border: 'solid 1px #dd6866',
          color: '#dd6866',
          fontWeight: 'bold',
          fontSize: '1.3rem',
          textAlign: 'center',
          lineHeight: '33px',
          margin: '2% 0 4% 0'
        }}
      >
        초기화
      </div>
    );
    if (this.state.madeRequest) {
      return (
        <div className="m_containerStyle">
          <Header />
          <Filter
            on={this.state.filterOn}
            filterChangeHandler={this.props.filterChangeHandler}
            state={this.state}
            propsState={this.props.state}
            sigungu={sigungu}
          />
          <FilterButton
            getFilteredCards={this.getFilteredCards}
            on={this.state.filterOn}
          />
          {this.state.filterOn ? refreshButton : null}
          <DesignerCardList
            recruits={this.state.recruits}
            recruitsSeen={this.state.recruitsSeen}
            useFilter={this.props.state.useFilter}
          />
        </div>
      );
    } else {
      return (
        <div
          style={{ height: '100vh', width: '100%' }}
          className="d-flex justify-content-center align-items-center"
        >
          <img alt="alt" style={{ height: '20%' }} src={Spinner} />
        </div>
      );
    }
  }
}

export default DesignerList;
