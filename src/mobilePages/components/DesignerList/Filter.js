import React from 'react';

const Filter = props => {
  const { filterOff } = styles;
  return (
    <div style={props.on ? null : filterOff}>
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
