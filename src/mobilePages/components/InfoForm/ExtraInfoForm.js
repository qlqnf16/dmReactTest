import React, { Fragment } from 'react';
import ImgPreview from './ImgPreview';

const ExtraInfoForm = props => {
  const {
    containerStyle,
    labelStyle,
    ImgPreviewStyle,
    defaultInputFileDisplayNone,
    fileAttachingContainerStyle,
    portfolioContainerStyle,
    fileAttachingInputStyle,
    textareaStyle
  } = styles;
  const userData = props.state;
  let profileImg;

  if (userData.profileImg)
    profileImg = (
      <ImgPreview style={ImgPreviewStyle} url={userData.profileImg} />
    );
  else
    profileImg = (
      <Fragment>
        <span>프로필사진</span>
        <span style={{ fontSize: '2rem' }}>+</span>
      </Fragment>
    );

  // let portfolio =
  //   props.state.num > 0 ? (
  //     userData.portfolioImg.map((url, i) => (
  //       <ImgPreview
  //         style={ImgPreviewStyle}
  //         url={url}
  //         key={i}
  //         deletePortfolio={props.deletePortfolio}
  //       />
  //     ))
  //   ) : (
  //     <Fragment>
  //       <span>포트폴리오</span>
  //       <span style={{ fontSize: '2rem' }}>+</span>
  //     </Fragment>
  //   );
  return (
    <div style={containerStyle}>
      <div style={labelStyle}>프로필/자기소개</div>
      <div style={fileAttachingContainerStyle}>
        <label style={{ width: '47.5%', marginRight: '4%' }} for="profileImg">
          <input
            style={defaultInputFileDisplayNone}
            id="profileImg"
            type="file"
            name="profileImg"
            onChange={props.handleImgChange}
          />
          <div style={fileAttachingInputStyle}>{profileImg}</div>
        </label>
        <textarea
          style={textareaStyle}
          name="introduce"
          id="introduce"
          placeholder="자기소개를 입력해주세요."
          onChange={props.changeInput}
          value={userData.introduce}
        />
      </div>
      <div style={labelStyle}>포트폴리오</div>
      <div style={portfolioContainerStyle}>
        {props.state.num > 0
          ? userData.portfolioImg.map((url, i) => (
              <div
                style={{
                  ...fileAttachingInputStyle,
                  width: '47.5%'
                }}
              >
                <ImgPreview
                  style={{ ...ImgPreviewStyle }}
                  url={url}
                  key={i}
                  deletePortfolio={props.deletePortfolio}
                />
              </div>
            ))
          : null}
        <label style={{ width: '47.5%', marginRight: '4%' }} for="portfolio">
          <input
            style={defaultInputFileDisplayNone}
            id="portfolio"
            type="file"
            name="portfolio"
            onChange={props.handleImgChange}
          />
          <div style={fileAttachingInputStyle}>
            <span>포트폴리오</span>
            <span style={{ fontSize: '2rem' }}>+</span>
          </div>
        </label>
      </div>
    </div>
  );
};

const styles = {
  containerStyle: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  labelStyle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#1e3354',
    marginTop: '1.5rem',
    marginBottom: '0.2rem'
  },
  ImgPreviewStyle: {
    width: '100%',
    height: '100%'
  },
  defaultInputFileDisplayNone: {
    display: 'none'
  },
  fileAttachingContainerStyle: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  fileAttachingInputStyle: {
    width: '100%',
    height: 134,
    borderRadius: 5,
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    fontSize: '1.3rem',
    color: 'rgba(0, 0, 0, 0.2',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textareaStyle: {
    width: '100%',
    fontSize: '1.3rem',
    height: 134,
    borderRadius: 5,
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    padding: '1rem'
  },
  portfolioContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
};

export default ExtraInfoForm;
