import React, { useEffect, useReducer, useRef } from 'react';
import RSP_Image from './rsp.png';

const COORD = {
  R: '0',
  S: '-138px',
  P: '-276px',
};

const SCORE = {
  R: 1,
  S: 0,
  P: -1,
};

const TIMER = 100;

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_IMG_COORD':
      return { ...state, imgCoord: action.imgCoord };
    case 'DRAW':
      return { ...state, result: '비겼습니다.' };
    case 'WIN':
      return { ...state, score: state.score + 1, result: '이겼습니다.' };
    case 'LOSE':
      return { ...state, score: state.score - 1, result: '졌습니다.' };
  }
};
const initState = {
  result: '',
  imgCoord: '0',
  score: 0,
};

const RSP = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const interval = useRef(null);

  const startChangeHand = () => {
    if (state.imgCoord === COORD.R) {
      console.log('바위');
      dispatch({
        type: 'CHANGE_IMG_COORD',
        imgCoord: COORD.S,
      });
    } else if (state.imgCoord === COORD.S) {
      console.log('가위');
      dispatch({
        type: 'CHANGE_IMG_COORD',
        imgCoord: COORD.P,
      });
    } else if (state.imgCoord === COORD.P) {
      console.log('보');
      dispatch({
        type: 'CHANGE_IMG_COORD',
        imgCoord: COORD.R,
      });
    }
  };

  const handleClick = (choice) => {
    if (!interval.current) {
      console.log('게임을 시작해주세요');
      return;
    }
    interval.current = clearInterval(interval.current);
    const myScore = SCORE[choice];
    const computerChoice = Object.entries(COORD).find((entry) => {
      // entry: ["R", "0"]/["S", "-138px"]/["P", "-276px"]
      return entry[1] === state.imgCoord;
    })[0];
    const computerScore = SCORE[computerChoice];
    console.log(myScore, computerScore);

    if (myScore === computerScore) {
      dispatch({
        type: 'DRAW',
      });
    } else if ([1, -2].includes(myScore - computerScore)) {
      dispatch({
        type: 'WIN',
      });
    } else {
      dispatch({
        type: 'LOSE',
      });
    }
  };

  useEffect(() => {
    console.log('useEffect start');
    interval.current = setInterval(startChangeHand, TIMER);

    return () => {
      console.log('useEffect end');
      interval.current = clearInterval(interval.current);
    };
  }, [state.imgCoord]);

  return (
    <div>
      <div>컴퓨터 선택</div>
      <div
        style={{
          width: '150px',
          height: '155px',
          background: `url(${RSP_Image}) ${state.imgCoord} 0`,
        }}
      ></div>
      <div>내 선택</div>
      <button
        onClick={() => {
          handleClick('R');
        }}
      >
        바위
      </button>
      <button
        onClick={() => {
          handleClick('S');
        }}
      >
        가위
      </button>
      <button
        onClick={() => {
          handleClick('P');
        }}
      >
        보
      </button>
      <button
        onClick={() => {
          interval.current = setInterval(startChangeHand, TIMER);
        }}
      >
        재시작
      </button>
      <div>{state.result}</div>
      <div>점수 : {state.score}</div>
    </div>
  );
};

export default RSP;
