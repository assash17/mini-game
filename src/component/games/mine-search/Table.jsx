import React, { useContext } from 'react';
import { MineSearchContext } from './MineSearch';
import Tr from './Tr';

function Table() {
  console.log('Table');
  const { tableData } = useContext(MineSearchContext);
  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <Tr key={i} rowIndex={i}></Tr>
          ))}
      </tbody>
    </table>
  );
}

export default React.memo(Table);
