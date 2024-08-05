import React from 'react';
import Column from './Column'
import Card, {Suit} from '@components/Card';
import styles from '@styles/Board.module.css';

const Board: React.FC = () => {
  const columns = [
    [
      { suit: Suit.Hearts, rank: 1 },
      { suit: Suit.Diamonds, rank: 2 },
      { suit: Suit.Clubs, rank: 3 },
    ],
    [
      { suit: Suit.Spades, rank: 4 },
      { suit: Suit.Hearts, rank: 5 },
    ]
  ];

  return (
    <div className={styles.board}>
      {columns.map((cards,index) => (
        <Column key={index} cards={cards} />
      ))}
    </div>
  );
};

export default Board;
