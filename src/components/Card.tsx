import React from 'react';
import styles from '@styles/Card.module.css';

type CardProps = {
  suit: string;
  rank: string;
};

const Card: React.FC<CardProps> = ({ suit, rank }) => {
  return (
    <div className={styles.card}>
      {rank} of {suit}
    </div>
  );
};

export default Card;
