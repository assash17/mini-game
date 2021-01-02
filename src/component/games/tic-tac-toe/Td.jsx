import React, { useCallback } from 'react';
import { CLICK_CELL } from './Tic';

function Td({ rowIndex, colIndex, dispatch, data }) {
  console.log('Td', rowIndex, colIndex);
  const onClickTd = useCallback(() => {
    console.log(`clikced index`, rowIndex, colIndex, data);
    dispatch({ type: CLICK_CELL, row: rowIndex, col: colIndex });
  }, []);

  return (
    <td
      style={{
        border: `1px solid black`,
        width: `100px`,
        height: `100px`,
        textAlign: `center`,
      }}
      onClick={onClickTd}
    >
      {data}
    </td>
  );
}

export default React.memo(Td);
