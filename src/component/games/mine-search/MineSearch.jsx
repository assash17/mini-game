import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Form from './Form';
import Table from './Table';

export const CODE = {
  OPENED: 0, // 0이상이면 다 opened
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  MINE: -7,
};

export const TYPE = {
  START_GAME: 'START_GAME',
  INCREMENT_TIMER: `INCREMENT_TIMER`,
  OPEN_CELL: 'OPEN_CELL',
  CLICK_MINE: 'CLICK_MINE',
  FLAG_CELL: `FLAG_CELL`,
  QUESTION_CELL: `QUESTION_CELL`,
  NOMAL_CELL: `NOMAL_CELL`,
};

export const MineSearchContext = createContext({});
const initialState = {
  tableData: [],
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0,
  minCnt: 0,
};

const reducer = (state, action) => {
  let tableData = null;
  switch (action.type) {
    case TYPE.INCREMENT_TIMER:
      return {
        ...state,
        timer: state.timer + 1,
      };
    case TYPE.START_GAME:
      return {
        ...state,
        tableData: makeGameBoard(action.row, action.col, action.mine),
        timer: 0,
        result: '',
        halted: false,
        openedCount: 0,
        minCnt: action.mine,
      };
    case TYPE.OPEN_CELL:
      tableData = copyTableData(state, action);

      tableData.forEach((row, i) => {
        tableData[i] = [...state.tableData[i]];
      });
      const checked = [];
      const checkAround = (row, col) => {
        checked.push(`${row}/${col}`);
        // console.log(`방문: ${row},${col}`);

        //주변 마인 개수 탐지
        let around = [];
        if (tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][col - 1],
            tableData[row - 1][col],
            tableData[row - 1][col + 1]
          );
        }
        around = around.concat(tableData[row][col - 1]);
        around = around.concat(tableData[row][col + 1]);
        if (tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][col - 1],
            tableData[row + 1][col],
            tableData[row + 1][col + 1]
          );
        }
        const count = around.filter((v) => {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        }).length;
        tableData[row][col] = count;

        // 주변 지뢰가 0개인경우
        // 재귀적으로 주변 오픈
        if (count === 0) {
          const eightDirectionData = [
            [row - 1, col - 1],
            [row - 1, col],
            [row - 1, col + 1],
            [row, col - 1],
            [row, col + 1],
            [row + 1, col - 1],
            [row + 1, col],
            [row + 1, col + 1],
          ];

          for (let i = 0; i < eightDirectionData.length; i += 1) {
            const [row, col] = eightDirectionData[i];

            // 유효하지 않은 인덱스
            if (
              row < 0 ||
              row >= tableData.length ||
              col < 0 ||
              col >= tableData[0].length
            ) {
              // console.log(`유효하지 않은 인덱스: ${row},${col}`);
              continue;
            }

            if (checked.includes(`${row}/${col}`)) {
              // console.log(`이미 방문한 곳: ${row},${col}`);
              continue;
            }
            if (
              [
                CODE.OPENED,
                CODE.FLAG,
                CODE.FLAG_MINE,
                CODE.QUESTION_MINE,
                CODE.QUESTION,
              ].includes(tableData[row][col])
            ) {
              // console.log(`이미 처리 된 곳: ${row},${col}`);
              continue;
            }
            if (tableData[row][col] === CODE.NORMAL) {
              checkAround(row, col);
            }
          }
        }
      };

      checkAround(action.row, action.col);

      let halted = false;
      let result = '';
      console.log(checked.length);
      if (
        state.openedCount + checked.length ===
        tableData.length * tableData[0].length - state.minCnt
      ) {
        result = `승리하셨습니다.(걸린시간:${state.timer})`;
        halted = true;
      }
      return {
        ...state,
        tableData,
        result,
        halted,
        openedCount: state.openedCount + checked.length,
      };
    case TYPE.CLICK_MINE:
      tableData = copyTableData(state, action);
      tableData[action.row][action.col] = CODE.CLICKED_MINE;
      return { ...state, tableData, halted: true };
    case TYPE.FLAG_CELL:
      tableData = copyTableData(state, action);
      if (tableData[action.row][action.col] === CODE.MINE) {
        tableData[action.row][action.col] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.col] = CODE.FLAG;
      }
      return { ...state, tableData };
    case TYPE.QUESTION_CELL:
      tableData = copyTableData(state, action);
      if (tableData[action.row][action.col] === CODE.FLAG_MINE) {
        tableData[action.row][action.col] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.col] = CODE.QUESTION;
      }
      return { ...state, tableData };
    case TYPE.NOMAL_CELL:
      tableData = copyTableData(state, action);
      if (tableData[action.row][action.col] === CODE.QUESTION_MINE) {
        tableData[action.row][action.col] = CODE.MINE;
      } else {
        tableData[action.row][action.col] = CODE.NORMAL;
      }
      return { ...state, tableData };
    default:
      return state;
  }
};

const makeGameBoard = (row, col, mine) => {
  console.log('makeGameBoard', row, col, mine);

  // shuffle에 지뢰 개수 만큼 index뽑아서 저장
  const candidate = Array(row * col)
    .fill()
    .map((n, i) => i);
  const shuffle = [];
  while (candidate.length > row * col - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }

  const data = [];
  // 일단 normal로 모두 세팅
  for (let i = 0; i < row; i += 1) {
    data.push([]);
    for (let j = 0; j < col; j += 1) {
      data[i].push(CODE.NORMAL);
    }
  }

  // 지뢰 세팅
  for (let i = 0; i < shuffle.length; i += 1) {
    const v = Math.floor(shuffle[i] / col);
    const h = shuffle[i] % col;
    data[v][h] = CODE.MINE;
  }

  console.log('after data setting', data);
  return data;
};

const copyTableData = (state, action) => {
  const tableData = [...state.tableData];
  tableData[action.row] = [...state.tableData[action.row]];
  return tableData;
};

function MineSearch() {
  console.log('MineSearch');
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, timer, result, halted } = state;

  useEffect(() => {
    if (halted === true) {
      return;
    }
    const timer = setInterval(() => {
      dispatch({ type: TYPE.INCREMENT_TIMER });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [halted]);

  const value = useMemo(
    () => ({
      tableData,
      halted,
      mineSearchDispatch: dispatch,
    }),
    [tableData, halted]
  );
  return (
    <MineSearchContext.Provider value={value}>
      <Form></Form>
      <div>{timer}</div>
      <Table></Table>
      <div>{result}</div>
    </MineSearchContext.Provider>
  );
}

export default MineSearch;
