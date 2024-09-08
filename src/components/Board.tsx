"use client";

import React, { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";

import ColumnCell from "@components/ColumnCell";
import Freecell from "@components/Freecell";
import Homecell from "@components/Homecell";

import { CardProps, Suit } from "@components/Card";
import { deal_ms_fc_board } from "@utils/dealMsFcBoard";

import styles from "@styles/Board.module.css";

// The Board component encapsulate all components of a Freecell board.
const Board: React.FC = () => {
  // Declare and initialize column values.
  const [columns, setColumns] = useState<CardProps[][]>([]);
  useEffect(() => {
    const initialColumns = deal_ms_fc_board("1"); // Deal the board for game '1' (you can change the game number).
    setColumns(initialColumns);
  }, []);

  return (
    <DndContext>
      <div className={styles.board}>
        {/* Render the top row of 4 freecells and 4 homecells. */}
        <div className={styles.topRow}>
          {[...Array(4)].map((_, index) => (
            <Freecell key={index} id={`free-${index}`} />
          ))}
          {[Suit.Hearts, Suit.Diamonds, Suit.Clubs, Suit.Spades].map(
            (suit, index) => (
              <Homecell key={index} id={`home-${index}`} suit={suit} />
            ),
          )}
        </div>

        {/* Render the columns of cards. */}
        <div className={styles.columns}>
          {columns.map((cards, index) => (
            <ColumnCell key={index} id={`column-${index}`} cards={cards} />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default Board; // Export the Board component as the default export.
