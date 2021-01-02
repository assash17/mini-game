import React, { useCallback, useContext, useReducer } from 'react';
import { MineSearchContext, TYPE } from './MineSearch';

const CHANGE_INPUT = 'CHANGE_INPUT';
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return { ...state, [action.name]: action.value };
    default:
      return action;
  }
};

const initialState = {
  row: '',
  col: '',
  mine: '',
};
function Form() {
  console.log('Form');
  const [state, dispatch] = useReducer(reducer, initialState);
  const { row, col, mine } = state;
  const { mineSearchDispatch } = useContext(MineSearchContext);

  const handleInput = useCallback((e) => {
    dispatch({
      type: CHANGE_INPUT,
      name: e.target.name,
      value: e.target.value,
    });
  }, []);

  const handleOnClick = useCallback(() => {
    mineSearchDispatch({ type: TYPE.START_GAME, row, col, mine });
  }, [row, col, mine]);
  return (
    <div>
      <input
        name="row"
        type="number"
        placeholder="세로"
        value={row}
        onChange={handleInput}
      />
      <input
        name="col"
        type="number"
        placeholder="가로"
        value={col}
        onChange={handleInput}
      />
      <input
        name="mine"
        type="number"
        placeholder="지뢰개수"
        value={mine}
        onChange={handleInput}
      />
      <button onClick={handleOnClick}>시작</button>
    </div>
  );
}

export default React.memo(Form);
