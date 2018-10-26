import React from 'react';

const Filter = props => {
  const { filterOff } = styles;
  return (
    <div style={props.on ? null : filterOff}>
      <input
        onChange={props.filterChangeHandler}
        type="radio"
        name="gender"
        id="male"
        value="male"
      />
      <label for="male">남</label>
      <input
        onChange={props.filterChangeHandler}
        type="radio"
        name="gender"
        id="female"
        value="female"
      />
      <label for="female">여</label>
      <label>날짜</label>
      <input type="date" onChange={props.filterChangeHandler} name="date" />
      <div>지역</div>
      <select name="sido" onChange={props.filterChangeHandler}>
        <option value="null">-도/시-</option>
        {props.state.filterSido &&
          props.state.filterSido.map((sd, key) => (
            <option key={key} value={sd}>
              {sd}
            </option>
          ))}
      </select>
      <select name="sigungu" onChange={props.filterChangeHandler}>
        <option value="null">-시/군/구-</option>
        {props.sigungu.map((sgg, key) => (
          <option key={key} value={sgg}>
            {sgg}
          </option>
        ))}
      </select>
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
  );
};

const styles = {
  filterOff: {
    display: 'none'
  }
};

export default Filter;
