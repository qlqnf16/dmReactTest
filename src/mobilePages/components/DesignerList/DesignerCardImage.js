import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import './DesignerCardImage.css';

export default class DesignerCardImage extends Component {
  state = {
    activeIndex: 0
  };

  onExiting = () => {
    this.animating = true;
  };

  onExited = () => {
    this.animating = false;
  };

  next = images => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === images.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = images => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? images.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  goToIndex = newIndex => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  };
  render() {
    const { activeIndex } = this.state;

    const slides = this.props.images.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img
            src={item}
            style={{
              width: '100%',
              height: '134px',
              objectFit: 'cover'
            }}
          />

          <CarouselCaption
            captionText={item.caption}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });

    return (
      // <Carousel
      //   activeIndex={activeIndex}
      //   next={() => this.next(this.props.images)}
      //   previous={() => this.previous(this.props.images)}
      // >
      //   {/* <CarouselIndicators
      //     items={this.props.images.map(im => {
      //       return { src: im };
      //     })}
      //     activeIndex={activeIndex}
      //     onClickHandler={() => this.goToIndex()}
      //   /> */}
      //   {slides}
      // </Carousel>

      // 대표 포트폴리오 image 한 장만 나오도록

      <img
        src={this.props.images[0]}
        style={{
          width: '100%',
          height: '134px',
          objectFit: 'cover'
        }}
      />
    );
  }
}
