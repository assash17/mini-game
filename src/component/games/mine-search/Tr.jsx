import React, { useContext } from 'react';
import { MineSearchContext } from './MineSearch';
import Td from './Td';

function Tr({ rowIndex }) {
  console.log('Tr');
  const { tableData } = useContext(MineSearchContext);
  return (
    <tr>
      {Array(tableData[rowIndex].length)
        .fill()
        .map((td, i) => (
          <Td key={i} rowIndex={rowIndex} colIndex={i}></Td>
        ))}
    </tr>
  );
}

export default React.memo(Tr);
