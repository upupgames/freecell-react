import React from 'react';
import Cell from '@components/Cell';
import Card, { Suit } from '@components/Card';
import styles from '@styles/Cell.module.css';

interface ColumnCellProps {
  cards: { suit: Suit; rank: number }[];
}

const ColumnCell: React.FC<ColumnCellProps> = ({ cards = [] }) => {
  return (
    <Cell className={styles.column}>
      {cards.map((card, index) => (
        <Card key={index} suit={card.suit} rank={card.rank} />
      ))}
    </Cell>
  );
};

export default ColumnCell;