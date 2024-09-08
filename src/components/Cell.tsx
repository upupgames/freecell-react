import React, { ReactNode } from "react";
import styles from "@styles/Cell.module.css";

interface CellProps {
  className?: string;
  children?: ReactNode;
}

const Cell: React.FC<CellProps> = ({ className, children }) => {
  return <div className={`${styles.cell} ${className}`}>{children}</div>;
};

export default Cell;
