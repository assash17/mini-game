import React, { useReducer, useRef } from 'react';
import './ResponseCheck.scss';

const reducer = (state, action) => {
  switch (action.type) {
    case 'READY':
      return {
        ...state,
        status: 'ready',
        message: '초록색이 되면 클릭하세요.',
      };
    case 'NOW':
      return { ...state, status: 'now', message: '지금 클릭' };
    case 'WAITING':
      return {
        ...state,
        ...action.data,
      };
  }
};

const initState = {
  status: 'waiting',
  message: '클릭해서 시작하세요',
  result: [],
};

const ResponseCheckHookv = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const timeout = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);

  const { status, message, result } = state;
  const onClickScreen = (e) => {
    if (status === 'waiting') {
      dispatch({ type: 'READY' });
      timeout.current = setTimeout(() => {
        dispatch({ type: 'NOW' });
        startTime.current = new Date();
      }, Math.floor(Math.random() * 3000));
    } else if (status === 'ready') {
      clearTimeout(timeout.current);
      dispatch({
        type: 'WAITING',
        data: {
          status: 'waiting',
          message: '초록색이 된 후에 클릭하셔야 합니다.',
        },
      });
    } else if (status === 'now') {
      endTime.current = new Date();
      dispatch({
        type: 'WAITING',
        data: {
          status: 'waiting',
          message: '클릭해서 시작하세요',
          result: [...result, endTime.current - startTime.current],
        },
      });
    }
  };
  return (
    <>
      <div id="screen" className={status} onClick={onClickScreen}>
        {message}
      </div>
      <div>
        <ol>
          {result.length !== 0 &&
            result.map((r, idx) => {
              return (
                <li key={idx}>
                  <b>반응속도 : {r}ms</b>
                </li>
              );
            })}
        </ol>
      </div>
      <div>
        {result.length !== 0 && (
          <div>
            평균 반응 속도 : {result.reduce((a, c) => a + c) / result.length}
            ms
          </div>
        )}
      </div>
    </>
  );
};

export default ResponseCheckHookv;
