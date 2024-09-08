import React from "react";
import { CardProps, Suit } from "@components/Card";
import Cell from "@components/Cell";
import Column from "@components/Column";
import styles from "@styles/Cell.module.css";

interface ColumnCellProps {
  id: string;
  cards: CardProps[];
}

const ColumnCell: React.FC<ColumnCellProps> = ({ id, cards }) => {
  return (
    <Cell id={id} className={styles.column}>
      <Column cards={cards} />
    </Cell>
  );
};

export default ColumnCell;
