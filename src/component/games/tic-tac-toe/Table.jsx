import React from 'react';
import Tr from './Tr';

function Table({ tableData, dispatch }) {
  console.log('Table');
  return (
    <table>
      <tbody>
        {tableData.map((tr, i) => (
          <Tr key={i} rowData={tr} rowIndex={i} dispatch={dispatch}></Tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
