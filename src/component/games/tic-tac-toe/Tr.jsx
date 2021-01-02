import React from 'react';
import Td from './Td';

function Tr({ rowData, rowIndex, dispatch }) {
  console.log('Tr', rowIndex);
  return (
    <tr>
      {rowData.map((td, i) => (
        <Td
          key={i}
          rowIndex={rowIndex}
          colIndex={i}
          dispatch={dispatch}
          data={td}
        ></Td>
      ))}
    </tr>
  );
}

export default React.memo(Tr);
