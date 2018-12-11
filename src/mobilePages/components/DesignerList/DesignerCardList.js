import React from 'react';
import DesignerCard from './DesignerCard';

const DesignerCardList = props => {
  return (
    <div style={containerStyle}>
      {props.recruitsSeen && props.recruitsSeen.length !== 0 ? (
        props.recruitsSeen.map((recruit, key) => (
          <DesignerCard recruit={recruit} key={key} />
        ))
      ) : (
        <div
          style={{
            fontSize: '20px',
            width: '100%',
            textAlign: 'center',
            padding: '20px',
            color: 'rgba(0,0,0,0.5)',
            height: '200px',
            lineHeight: '300px',
            borderRadius: '5px'
          }}
        >
          검색 결과가 없습니다.
        </div>
      )}

      {/* 보기 좋게 X2 
        {props.recruits.map((recruit, key) => (
          <DesignerCard recruit={recruit} key={key} />
        ))} */}
    </div>
  );
};

const containerStyle = {
  width: '85%',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'space-between'
};

export default DesignerCardList;
