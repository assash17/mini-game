import React, { useState, useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

// action type
export const SET_WINNER = `SET_WINNER`;
export const CLICK_CELL = `CLICK_CELL`;
export const CHANGE_TURN = `CHANGE_TURN`;

const reducer = (state, action) => {
  // winner가 결정된 상태
  if (state.winner !== '') {
    return state;
  }

  console.log('reducer', action);
  switch (action.type) {
    case SET_WINNER:
      return { ...state, winner: action.winner };
    case CLICK_CELL:
      if (state.tableData[action.row][action.col] !== '') {
        // 이미 클릭한 cell 클릭 시
        return state;
      }
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.col] = state.turn;
      return { ...state, tableData, recentCell: [action.row, action.col] };
    case CHANGE_TURN:
      return { ...state, turn: state.turn === 'O' ? 'X' : 'O' };
  }
};

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

function Tic() {
  console.log('Tic');
  const [state, dispatch] = useReducer(reducer, initialState);
  const { winner, turn, tableData, recentCell } = state;

  useEffect(() => {
    console.log('Tic useEffect');
    const [row, col] = recentCell;
    if (row < 0) {
      console.log('시작');
      return;
    }

    console.log('승자 체크');
    let win = false;
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][col] === turn &&
      tableData[1][col] === turn &&
      tableData[2][col] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }
    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
    } else {
      //무승부 검사
      let all = true;
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        // 무승부
        dispatch({ type: SET_WINNER, winner: '무승부입니다.' });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }

    return () => {};
  }, [recentCell]);

  return (
    <div>
      <Table tableData={tableData} dispatch={dispatch}></Table>
      {winner && <div>승리자 : {winner}</div>}
    </div>
  );
}

export default Tic;
