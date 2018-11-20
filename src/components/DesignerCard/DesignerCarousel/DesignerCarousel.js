import React, { Component } from 'react';
import ExifOrientationImg from 'react-exif-orientation-img';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';

class DesignerCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

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
    const slides = this.props.images.map((image, key) => {
      return (
        <CarouselItem
          key={key}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
          <ExifOrientationImg
            src={image}
            key={key}
            alt="alt"
            style={{ width: '100%', height: 200 }}
          />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={() => this.next(this.props.images)}
        previous={() => this.previous(this.props.images)}
      >
        <CarouselIndicators
          items={this.props.images.map(im => {
            return { src: im };
          })}
          activeIndex={activeIndex}
          onClickHandler={() => this.goToIndex()}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={() => this.previous(this.props.images)}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={() => this.next(this.props.images)}
        />
      </Carousel>
    );
  }
}

export default DesignerCarousel;
