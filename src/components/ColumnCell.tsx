import React from 'react';
import { Suit } from '@components/Card';
import Cell from '@components/Cell';
import Column from '@components/Column';
import styles from '@styles/Cell.module.css';

interface ColumnCellProps {
  cards: { suit: Suit; rank: number }[];
}

const ColumnCell: React.FC<ColumnCellProps> = ({ cards }) => {
  return (
    <Cell className={styles.column}>
      <Column cards={cards} />
    </Cell>
  );
};

export default ColumnCell;
