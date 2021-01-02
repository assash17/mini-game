import React, { useContext, useCallback, useMemo } from 'react';
import { MineSearchContext, CODE, TYPE } from './MineSearch';

const getStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        backgroundColor: `#444`,
      };
    case CODE.OPENED:
      return {
        backgroundColor: `white`,
      };
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return {
        backgroundColor: `yellow`,
      };
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return {
        backgroundColor: `red`,
      };
    default:
      return {
        backgroundColor: `white`,
      };
  }
};

const getText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return '';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return '!';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?';
    default:
      return code || '';
  }
};

function Td({ rowIndex, colIndex }) {
  console.log('Td');
  const { tableData, mineSearchDispatch, halted } = useContext(
    MineSearchContext
  );
  const code = tableData[rowIndex][colIndex];

  const handleOnClick = useCallback(() => {
    console.log(`handleOnClick`);
    console.log(`code: ${code}`);
    console.log(`halted: ${halted}`);
    if (halted) return;
    switch (code) {
      case CODE.OPENED:
      case CODE.FLAG:
      case CODE.FLAG_MINE:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        mineSearchDispatch({
          type: TYPE.OPEN_CELL,
          row: rowIndex,
          col: colIndex,
        });
        return;
      case CODE.MINE:
        mineSearchDispatch({
          type: TYPE.CLICK_MINE,
          row: rowIndex,
          col: colIndex,
        });
        return;
      default:
        return;
    }
  }, [code, halted]);

  const handleRightClick = useCallback(
    (e) => {
      console.log(`handleRightClick`);
      console.log(`code: ${code}`);
      console.log(`halted: ${halted}`);
      e.preventDefault();
      if (halted) return;
      switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
          mineSearchDispatch({
            type: TYPE.FLAG_CELL,
            row: rowIndex,
            col: colIndex,
          });
          return;
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          mineSearchDispatch({
            type: TYPE.QUESTION_CELL,
            row: rowIndex,
            col: colIndex,
          });
          return;
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          mineSearchDispatch({
            type: TYPE.NOMAL_CELL,
            row: rowIndex,
            col: colIndex,
          });
          return;
        default:
          return;
      }
    },
    [code, halted]
  );
  return useMemo(() => {
    console.log(`td useMemo call`);
    return (
      <td
        style={{
          ...getStyle(code),
          border: `1px solid black`,
          width: `30px`,
          height: `30px`,
          textAlign: `center`,
        }}
        onClick={handleOnClick}
        onContextMenu={handleRightClick}
      >
        {getText(code)}
      </td>
    );
  }, [code, halted]);
}

export default Td;
