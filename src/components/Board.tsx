"use client"; // Add this line at the top

import React, { useState, useEffect } from 'react';
import ColumnCell from '@components/ColumnCell';
import Freecell from '@components/Freecell';
import Homecell from '@components/Homecell';
import styles from '@styles/Board.module.css';
import { Suit } from '@components/Card';

import { deal_ms_fc_board } from '@utils/dealMsFcBoard';

const Board: React.FC = () => {
  const [columns, setColumns] = useState<{ suit: Suit; rank: number }[][]>([]);

  useEffect(() => {
    const initialColumns = deal_ms_fc_board('1'); // Change '1' to any game number you want to initialize
    setColumns(initialColumns);
  }, []);

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
