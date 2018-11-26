import React from 'react';
import DesignerCard from './DesignerCard';

class DesignerCardList extends React.Component {
  state = {
    recruits: this.props.recruits,
    recruitsSeen: this.props.recruits.slice(0, 6),
    i: 6
  };

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleOnScroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleOnScroll);
  };

  handleOnScroll = () => {
    let scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    let scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    let clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    let recruitsSeen = this.state.recruitsSeen.concat(
      this.state.recruits.slice(this.state.i, this.state.i + 6)
    );

    if (
      scrolledToBottom &&
      this.state.recruits.length > this.state.recruitsSeen.length
    ) {
      this.setState({
        ...this.state,
        recruitsSeen,
        i: this.state.i + 6
      });
    }
  };

  render() {
    return (
      <div style={containerStyle}>
        {this.state.recruitsSeen.length ? (
          this.state.recruitsSeen.map((recruit, key) => (
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
  }
}

const containerStyle = {
  width: '85%',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'space-between'
};

export default DesignerCardList;
