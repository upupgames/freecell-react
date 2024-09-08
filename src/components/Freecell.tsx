import React from "react";
import Cell from "@components/Cell";

interface FreecellProps {
  id: string;
}

const Freecell: React.FC<FreecellProps> = ({ id }) => {
  return <Cell id={id} />;
};

export default Freecell;
