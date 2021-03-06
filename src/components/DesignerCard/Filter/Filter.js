import React from 'react';
import './Filter.css';

const Filter = props => {
  let today = new Date();
  let dd = today.getDate() + 1;
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();

  if (hour >= 19 && minute >= 30) dd += 1;
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  today = yyyy + '-' + mm + '-' + dd;

  return (
    <div className="col-3 form-row d-flex align-items-baseline filter-responsive">
      <div className="col-5">
        <div className="filterTitle">내 성별</div>
        <div className="d-inline">
          <label
            className={props.checked === 'male' ? 'gradio active' : 'gradio'}
          >
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={props.filterChangeHandler}
              className="genderRadio"
            />
            남
          </label>
          <label
            className={props.checked === 'female' ? 'gradio active' : 'gradio'}
          >
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={props.filterChangeHandler}
              checked={props.checked === 'female'}
              className="genderRadio"
            />
            여
          </label>
        </div>
      </div>
      <div className="col-7">
        <div className="filterTitle">날짜</div>
        <input
          type="date"
          name="date"
          id="date"
          className="form-control"
          placeholder="2018-xx-xx"
          onChange={props.filterChangeHandler}
          value={props.propsState.date}
          min={today}
        />
      </div>
      <div className="col-12 filterTitle">지역</div>
      <div className="col-6">
        <select
          name="sido"
          onChange={props.filterChangeHandler}
          value={props.propsState.sido ? props.propsState.sido : null}
        >
          <option value="null">-도/시-</option>
          {props.state.filterSido &&
            props.state.filterSido.map((sido, key) => (
              <option key={key} value={sido}>
                {sido}
              </option>
            ))}
        </select>
      </div>
      <div className="col-6">
        <select
          name="sigungu"
          onChange={props.filterChangeHandler}
          value={props.propsState.sido ? props.propsState.sigungu : null}
        >
          <option value="null">-시/군/구-</option>
          {props.sigungu.map((sgg, key) => (
            <option key={key} value={sgg}>
              {sgg}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12 filterTitle">서비스</div>
      <div className="col-11 m-auto">
        <div
          className="d-flex justify-content-between"
          style={{ marginTop: '15px' }}
        >
          <div>
            안받을래요
            <div style={{ fontSize: '2rem' }}>
              <span role="img" aria-label="emojis">
                😟👎
              </span>
            </div>
          </div>
          <div>
            상관없어요
            <div style={{ fontSize: '2rem' }}>
              <span role="img" aria-label="emojis">
                😐💬
              </span>
            </div>
          </div>
          <div>
            받을래요
            <div style={{ fontSize: '2rem' }}>
              <span role="img" aria-label="emojis">
                😀👍
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between" />
        <div className="form-group">
          <input
            onChange={props.filterChangeHandler}
            name="cut"
            type="range"
            className="custom-range"
            min="0"
            max="100"
            step="50"
            value={props.propsState.cut ? props.propsState.cut : 50}
          />
          <label>커트</label>
        </div>
        <div className="form-group">
          <input
            onChange={props.filterChangeHandler}
            name="dye"
            type="range"
            className="custom-range"
            min="0"
            max="100"
            step="50"
            value={props.propsState.dye ? props.propsState.dye : 50}
          />
          <label>염색</label>
        </div>
        <div className="form-group">
          <input
            onChange={props.filterChangeHandler}
            name="perm"
            type="range"
            className="custom-range"
            min="0"
            max="100"
            step="50"
            value={props.propsState.perm ? props.propsState.perm : 50}
          />
          <label>펌</label>
        </div>
      </div>
      <div
        onClick={() => props.getFilteredCards()}
        className="col-12 filterButton"
      >
        검색하기
      </div>
      <div
        onClick={() => props.refreshFilter()}
        // onClick={() => window.location.reload()}
        className="col-12 filterRefresh"
      >
        초기화
      </div>
    </div>
  );
};
export default Filter;
