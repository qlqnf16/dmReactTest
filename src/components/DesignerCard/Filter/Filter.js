import React from "react";
import "./Filter.css";

const Filter = props => {
  return (
    <div
      // style={{ height: 200 }}
      className="col-3 form-row d-flex align-items-baseline filter-responsive"
    >
      <div className="col-5">
        <div className="filterTitle">성별</div>
        <div className="d-inline">
          <label
            className={props.checked === "male" ? "gradio active" : "gradio"}
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
            className={props.checked === "female" ? "gradio active" : "gradio"}
          >
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={props.filterChangeHandler}
              checked={props.checked === "female"}
              className="genderRadio"
            />
            여
          </label>
        </div>
      </div>
      <div className="col-7">
        <div className="filterTitle">날짜</div>
        <input type="date" className="form-control" placeholder="날짜" />
      </div>
      <div className="col-12 filterTitle">지역</div>
      <div className="col-6">
        <select name="sido" onChange={props.filterChangeHandler}>
          <option value="null">-도/시-</option>
          {props.state.filterSido &&
            props.state.filterSido.map((sd, key) => (
              <option key={key} value={sd}>
                {sd}
              </option>
            ))}
        </select>
      </div>
      <div className="col-6">
        <select name="sigungu" onChange={props.filterChangeHandler}>
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
          style={{ marginTop: "15px" }}
        >
          <div>
            싫어요
            <div style={{ fontSize: "2rem" }}>😟👎</div>
          </div>
          <div>
            상관없어요
            <div style={{ fontSize: "2rem" }}>😐💬</div>
          </div>
          <div>
            받을래요
            <div style={{ fontSize: "2rem" }}>😀👍</div>
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
        className="col-12 filterButton"
      >
        검색하기
      </div>
    </div>
  );
};
export default Filter;
