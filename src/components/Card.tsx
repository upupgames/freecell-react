import React from "react";
import { useDraggable } from "@dnd-kit/core";
import styles from "@styles/Card.module.css";

enum Suit {
  Clubs = 0,
  Diamonds = 1,
  Hearts = 2,
  Spades = 3,
}

type CardProps = {
  id: string;
  suit: Suit;
  rank: number;
};

const Card: React.FC<CardProps> = ({ id, suit, rank }) => {
  // Setup draggable logic.
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  // Apply the drag transformation if the card is being dragged
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 1000 : "auto",
  };
  
  const rankDisplay = () => {
    switch (rank) {
      case 1:
        return "A";
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
      default:
        return rank.toString();
    }
  };

  const suitDisplay = () => {
    switch (suit) {
      case Suit.Clubs:
        return "♣";
      case Suit.Diamonds:
        return "♦";
      case Suit.Hearts:
        return "♥";
      case Suit.Spades:
        return "♠";
      default:
        return "";
    }
  };

  const suitClass = () => {
    switch (suit) {
      case Suit.Diamonds:
      case Suit.Hearts:
        return styles.cardSuitRed;
      case Suit.Clubs:
      case Suit.Spades:
        return styles.cardSuitBlack;
      default:
        return "";
    }
  };

  return (
    <div
      ref={setNodeRef} // Register this div as draggable.
      style={style}    // Apply drag transformations
      {...listeners}   // Add drag listeners
      {...attributes}  // Add drag attributes
      className={styles.card}
    >
      <div className={styles.topLeft}>
        <div className={styles.cardRank}>{rankDisplay()}</div>
      </div>
      <div className={styles.topRight}>
        <div className={suitClass()}>{suitDisplay()}</div>
      </div>
    </div>
  );
};

export default Card;

export { Suit };  export type { CardProps };
