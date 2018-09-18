import React from 'react'

const Review = props => {
    return(
        <div className="border m-2">
            <h5>작성자 : {props.name}</h5>
            <h5>날짜 : {props.date}</h5>
            <h5>별점 : {props.star}</h5>
            <h5>내용 : {props.content}</h5>
        </div>
    )
}

export default Review