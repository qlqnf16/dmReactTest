import React from 'react';

const Filter = props => (
  <div
    style={{ height: 200 }}
    className="col-md-2 form-row text-center d-flex align-items-baseline"
  >
    <div className="col-md-6">
      <select className="form-control">
        <option>남자</option>
        <option>여자</option>
      </select>
    </div>
    <div className="col-md-6">
      <input type="date" className="form-control" placeholder="날짜" />
    </div>
    <div className="col-md-6">
      <select className="form-control">
        <option>서울</option>
        <option>경기</option>
        <option>부산</option>
        <option>광주</option>
      </select>
    </div>
    <div className="col-md-6">
      <select className="form-control">
        <option>성북구</option>
        <option>동대문구</option>
        <option>강남구</option>
      </select>
    </div>
    <div className="col-md-12">
      <div>
        <label>싫어요 상관없어요 받을래요</label>
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
      className="col-md-12 btn btn-light"
    >
      검색
    </div>
  </div>
);

export default Filter;
