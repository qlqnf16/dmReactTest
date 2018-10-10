import React from 'react';
import './Filter.css';

const Filter = props => (
  <div
    style={{ height: 200 }}
    className="col-md-3 form-row d-flex align-items-baseline"
  >
    <div className="col-md-5">
      <div className="filterTitle">성별</div>
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
          />
          여
        </label>
      </div>
    </div>
    <div className="col-md-7">
      <div className="filterTitle">날짜</div>
      <input type="date" className="form-control" placeholder="날짜" />
    </div>
    <div className="col-md-12 filterTitle">지역</div>
    <div className="col-md-6">
      <select>
        <option>서울</option>
        <option>경기</option>
        <option>부산</option>
        <option>광주</option>
      </select>
    </div>
    <div className="col-md-6">
      <select>
        <option>성북구</option>
        <option>동대문구</option>
        <option>강남구</option>
      </select>
    </div>
    <div className="col-md-12 filterTitle">서비스</div>
    <div className="col-md-11 m-auto">
      <div
        className="d-flex justify-content-between"
        style={{ marginTop: '15px' }}
      >
        <div>싫어요</div>
        <div>상관없어요</div>
        <div>받을래요</div>
      </div>
      <div className="form-group">
        <input
          onChange={props.filterChangeHandler}
          name="cut"
          type="range"
          className="custom-range"
          min="0"
          max="100"
          step="50"
        />
        <label>컷트</label>
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
        />
        <label>펌</label>
      </div>
    </div>
    <div
      onClick={() => props.getFilteredCards()}
      className="col-md-12 filterButton"
    >
      검색하기
    </div>
  </div>
);

export default Filter;
