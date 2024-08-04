import React from 'react';
import Card from '@components/Card';
import styles from '@styles/Board.module.css';

const Board: React.FC = () => {
  return (
    <div className={styles.board}>
        <Card suit="Hearts" rank="A" />
        <Card suit="Diamonds" rank="2" />
        <Card suit="Clubs" rank="3" />
        <Card suit="Spades" rank="4" />
    </div>
  );
};

export default Board;
