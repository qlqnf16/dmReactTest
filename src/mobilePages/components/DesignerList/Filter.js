import React from 'react';

const Filter = props => {
  const {
    filterOff,
    genderRadioButton,
    genderRadioButtonOn,
    filter,
    filterFlex,
    selectBox,
    serviceName,
    rangeFilter,
    filterTitle,
    serviceType,
    emoji,
    selectFilterText
  } = styles;
  return (
    <div style={props.on ? filter : filterOff}>
      <div style={{ ...filterFlex, marginBottom: '1rem' }}>
        <div style={{ flex: '1' }}>
          <div style={filterTitle}>성별</div>
          <input
            onChange={props.filterChangeHandler}
            type="radio"
            name="gender"
            id="male"
            value="male"
          />
          <label
            style={
              props.state.gender === 'male'
                ? genderRadioButtonOn
                : genderRadioButton
            }
            htmlFor="male"
          >
            남
          </label>
          <input
            onChange={props.filterChangeHandler}
            type="radio"
            name="gender"
            id="female"
            value="female"
          />
          <label
            style={
              props.state.gender === 'female'
                ? genderRadioButtonOn
                : genderRadioButton
            }
            htmlFor="female"
          >
            여
          </label>
        </div>
        <div style={{ flex: 1.2 }}>
          <div style={filterTitle}>날짜</div>
          <input
            style={selectFilterText}
            type="date"
            onChange={props.filterChangeHandler}
            name="date"
          />
        </div>
      </div>
      <div style={filterTitle}>지역</div>
      <div style={{ ...filterFlex, marginBottom: '1rem' }}>
        <select
          style={{ ...selectBox, marginRight: '1rem' }}
          name="sido"
          onChange={props.filterChangeHandler}
        >
          <option value="null">-도/시-</option>
          {props.state.filterSido &&
            props.state.filterSido.map((sd, key) => (
              <option key={key} value={sd}>
                {sd}
              </option>
            ))}
        </select>
        <select
          style={selectBox}
          name="sigungu"
          onChange={props.filterChangeHandler}
        >
          <option value="null">-시/군/구-</option>
          {props.sigungu.map((sgg, key) => (
            <option key={key} value={sgg}>
              {sgg}
            </option>
          ))}
        </select>
      </div>
      <div style={filterTitle}>서비스</div>
      <div style={filterFlex}>
        <div style={serviceType}>
          <div>싫어요</div>
          <div style={emoji}>
            <span role="img" aria-label="emoji">
              😟👎
            </span>
          </div>
        </div>
        <div style={serviceType}>
          <div>상관없어요</div>
          <div style={emoji}>
            <span role="img" aria-label="emoji">
              😐💬
            </span>
          </div>
        </div>
        <div style={serviceType}>
          <div>받을래요</div>
          <div style={emoji}>
            <span role="img" aria-label="emoji">
              😀👍
            </span>
          </div>
        </div>
      </div>
      <input
        onChange={props.filterChangeHandler}
        name="cut"
        type="range"
        className="custom-range"
        min="0"
        max="100"
        step="50"
        style={rangeFilter}
      />
      <div style={serviceName}>커트</div>
      <input
        onChange={props.filterChangeHandler}
        name="dye"
        type="range"
        className="custom-range"
        min="0"
        max="100"
        step="50"
        style={rangeFilter}
      />
      <div style={serviceName}>염색</div>
      <input
        onChange={props.filterChangeHandler}
        name="perm"
        type="range"
        className="custom-range"
        min="0"
        max="100"
        step="50"
        style={rangeFilter}
      />
      <div style={serviceName}>펌</div>
    </div>
  );
};

const styles = {
  filterOff: {
    display: 'none'
  },
  genderRadioButton: {
    width: '10vw',
    height: '10vw',
    fontSize: '1.4rem',
    lineHeight: '2',
    textAlign: 'center',
    marginRight: '3vw',
    borderRadius: '5px',
    border: 'solid 1px rgba(0, 0, 0, 0.1)'
  },
  genderRadioButtonOn: {
    width: '10vw',
    height: '10vw',
    fontSize: '1.4rem',
    lineHeight: '2.5',
    textAlign: 'center',
    marginRight: '3vw',
    borderRadius: '5px',
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  filter: {
    width: '70%',
    paddingTop: '5%'
  },
  filterFlex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  selectBox: {
    borderRadius: '5px',
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontSize: '1.3rem'
  },
  serviceName: {
    textAlign: 'center',
    color: '#1f3354',
    fontSize: '1.3rem'
  },
  rangeFilter: {
    marginTop: '2rem'
  },
  filterTitle: {
    fontSize: '1.3rem',
    marginBottom: '0.3rem',
    color: '#dd6866',
    fontWeight: 'bold'
  },
  serviceType: {
    fontSize: '1.2rem',
    color: '#1f3354',
    fontWeight: 'bold'
  },
  emoji: {
    textAlign: 'center',
    fontSize: '2rem'
  },
  selectFilterText: {
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    fontSize: '1.3rem'
  }
};

export default Filter;
