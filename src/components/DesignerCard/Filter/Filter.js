import React from 'react'

const Filter = () => (
  <div className="form-row text-center justify-content-center">
    <div className="col-1">
      <select className="form-control">
        <option>남자</option>
        <option>여자</option>
      </select>
    </div>
    <div className="col-2">
      <input type="date" className="form-control" placeholder="날짜" />
    </div>
    <div className="col-1">
      <select className="form-control">
        <option>서울</option>
        <option>경기</option>
        <option>부산</option>
        <option>광주</option>
      </select>
    </div>
    <div className="col-1">
      <select className="form-control">
        <option>성북구</option>
        <option>동대문구</option>
        <option>강남구</option>
      </select>
    </div>
    <div className="col-2">
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" value="option1" />
        <label className="form-check-label">컷트</label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" value="option2" />
        <label className="form-check-label">염색</label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" value="option3"  />
        <label className="form-check-label">펌</label>
      </div>
    </div>
    <div className="col-2 btn btn-light">
      검색
    </div>
  </div>
)

export default Filter