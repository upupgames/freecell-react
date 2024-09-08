import React from "react";
import Cell from "@components/Cell";
import { Suit } from "@components/Card";
import styles from "@styles/Cell.module.css";

interface HomecellProps {
  id: string;
  suit: Suit;
}

const Homecell: React.FC<HomecellProps> = ({ id, suit }) => {
  const suitSymbol = {
    [Suit.Hearts]: "♥",
    [Suit.Diamonds]: "♦",
    [Suit.Clubs]: "♣",
    [Suit.Spades]: "♠",
  }[suit];

  return (
    <Cell id={id} className={styles.home}>
      <span className={styles.suit}>{suitSymbol}</span>
    </Cell>
  );
};

export default Homecell;
