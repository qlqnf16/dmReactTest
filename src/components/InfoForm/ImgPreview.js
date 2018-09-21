import React from 'react'

const ImgPreview = (props) => (
    <img src={props.url} className="col-4" onClick={props.deletePortfolio} alt={props.url}/>
)

export default ImgPreview