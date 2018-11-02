import React from 'react';
import ScheduleCard from './ScheduleCard';

const ScheduleCards = props => {
  const cardSort = (c1, c2) => c1.date - c2.date;

  return (
    <div>
      {props.cards.sort(cardSort).map((card, key) => (
        <ScheduleCard
          cancelCardHandler={props.cancelCardHandler}
          card={card}
          key={key}
        />
      ))}
      {props.newCards.sort(cardSort).map((newCard, key) => (
        <ScheduleCard card={newCard} key={key} />
      ))}
    </div>
  );
};
export default ScheduleCards;
