import React from "react";
import Board from "@components/Board";
import styles from "@styles/FreecellGame.module.css";

const FreecellGame: React.FC = () => {
  return (
    <div className={styles.game}>
      <h1 className={styles.title}>Freecell Game</h1>
      <Board />
    </div>
  );
};

export default FreecellGame;
