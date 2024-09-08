import React, { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import styles from "@styles/Cell.module.css";

interface CellProps {
  id: string;
  className?: string;
  children?: ReactNode;
}

const Cell: React.FC<CellProps> = ({ id, className, children }) => {
  // Set up droppable logic.
  const { isOver, setNodeRef } = useDroppable({
    id, // Unique identifier for the droppable area
  });

  return (
    <div
      ref={setNodeRef} // Register this div as a droppable area
      className={`${styles.cell} ${className}`}
    >
      {children}
    </div>
  );
};

export default Cell;
