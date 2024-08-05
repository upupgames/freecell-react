import React from 'react';
import Card, {Suit} from '@components/Card';
import styles from '@styles/Board.module.css';

const Board: React.FC = () => {
  return (
    <div className={styles.board}>
        <Card suit={Suit.Hearts} rank={1} />
        <Card suit={Suit.Diamonds} rank={2} />
        <Card suit={Suit.Clubs} rank={3}/>
        <Card suit={Suit.Spades} rank={4} />
    </div>
  );
};

export default Board;
