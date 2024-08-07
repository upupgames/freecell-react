import React from 'react';
import ColumnCell from '@components/ColumnCell';
import Freecell from '@components/Freecell';
import Homecell from '@components/Homecell';
import styles from '@styles/Board.module.css';
import { Suit } from '@components/Card';

const Board: React.FC = () => {
  const columns = [
    [
      { suit: Suit.Hearts, rank: 1 },
      { suit: Suit.Clubs, rank: 2 },
      { suit: Suit.Spades, rank: 3 },
      { suit: Suit.Diamonds, rank: 4 },
    ],
    [{ suit: Suit.Diamonds, rank: 2 }],
    [{ suit: Suit.Clubs, rank: 3 }],
    [{ suit: Suit.Spades, rank: 4 }],
    [{ suit: Suit.Hearts, rank: 5 }],
    [{ suit: Suit.Diamonds, rank: 6 }],
    [{ suit: Suit.Clubs, rank: 7 }],
    [{ suit: Suit.Spades, rank: 8 }],
  ];

  return (
    <div className={styles.board}>
      <div className={styles.topRow}>
        {[...Array(4)].map((_, index) => (
          <Freecell key={index} />
        ))}
        {[Suit.Hearts, Suit.Diamonds, Suit.Clubs, Suit.Spades].map((suit, index) => (
          <Homecell key={index} suit={suit} />
        ))}
      </div>
      <div className={styles.columns}>
        {columns.map((cards, index) => (
          <ColumnCell key={index} cards={cards} />
        ))}
      </div>
    </div>
  );
};

export default Board;
