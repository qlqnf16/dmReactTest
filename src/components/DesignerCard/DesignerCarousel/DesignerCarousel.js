import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';

const items = [
  {
    src: 'https://picsum.photos/300/200/?image=2',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: 'https://picsum.photos/300/200/?image=23',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: 'https://picsum.photos/300/200/?image=29',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

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

    const slides = this.props.images.map(image => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={image}
        >
          <img
            src={image}
            alt="alt"
            style={{ maxWidth: '100%', height: 200 }}
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
          items={this.props.images}
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
