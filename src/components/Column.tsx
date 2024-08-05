import React from 'react';
import Card, {Suit} from './Card';
import styles from './Column.module.css'

interface ColumnProps {
    cards: {suit: Suit; rank: number }[];
}

const Column: React.FC<ColumnProps> = ({ cards }) => {
    return (
        <div className={styles.column}>
            {cards.map((card,index) => (
                <div key={index} className={styles.cardWrapper}>
                    <Card suit={card.suit} rank={card.rank} />
                </div>
            ))}
        </div>
    );
};

export default Column;