import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import './DesignerCardImage.css';

const items = [
  {
    src:
      'https://pbs.twimg.com/profile_images/2478846238/qtsl75yedbc7vymcmq78.jpeg',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROpgffp3yGdyg7fQBzQ2SbbV1VDW9T-b1Aggl0yFh9dOdyjcssAw',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh7SqF4efc09ygq4WvMqfQBSE7TKpcyErb9OadLe0P7kVqluff',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

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

  next = () => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  goToIndex = newIndex => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  };
  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <div
            style={{
              width: '100%',
              height: '134px',
              backgroundImage: `url(${item.src})`,
              backgroundSize: 'cover'
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
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
      </Carousel>
    );
  }
}