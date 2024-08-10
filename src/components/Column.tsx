import React from 'react';
import Card, { Suit } from '@components/Card';
import styles from '@styles/Cell.module.css';

interface ColumnProps {
  cards: { suit: Suit; rank: number }[];
}

const Column: React.FC<ColumnProps> = ({ cards = [] }) => {
  return (
    <div className={styles.flexbox}>
      {cards.map((card, index) => (
        <Card key={index} suit={card.suit} rank={card.rank} />
      ))}
    </div>
  );
};

export default Column;