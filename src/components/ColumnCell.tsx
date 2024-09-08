import React from "react";
import { Suit } from "@components/Card";
import Cell from "@components/Cell";
import Column from "@components/Column";
import styles from "@styles/Cell.module.css";

interface ColumnCellProps {
  id: string;
  cards: { id: string, suit: Suit; rank: number }[];
}

const ColumnCell: React.FC<ColumnCellProps> = ({ id, cards }) => {
  return (
    <Cell id={id} className={styles.column}>
      <Column cards={cards} />
    </Cell>
  );
};

export default ColumnCell;
