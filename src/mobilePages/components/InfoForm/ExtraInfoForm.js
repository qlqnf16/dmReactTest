import React from 'react';
import ImgPreview from './ImgPreview';

const ExtraInfoForm = props => {
  const userData = props.state;
  return (
    <div>
      <div>프로필사진</div>
      <ImgPreview url={userData.profileImg} />
      <input type="file" name="profileImg" onChange={props.handleImgChange} />
      <div>자기소개</div>
      <textarea
        name="introduce"
        id="introduce"
        onChange={props.changeInput}
        value={userData.introduce}
      />
      <div>포트폴리오</div>
      {props.state.num > 0
        ? userData.portfolioImg.map((url, i) => (
            <ImgPreview
              url={url}
              key={i}
              deletePortfolio={props.deletePortfolio}
            />
          ))
        : null}
      <input type="file" name="portfolio" onChange={props.handleImgChange} />
    </div>
  );
};

export default ExtraInfoForm;
