import React, { useEffect, useMemo, useRef, useState } from 'react';

const getWinNumbers = () => {
  console.log('getWinNumbers');
  const candidate = Array(45)
    .fill()
    .map((v, idx) => {
      return idx + 1;
    });
  const result = [];
  while (result.length < 7) {
    result.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }

  const winNumbers = result.splice(0, 6).sort((a, b) => a - b);
  const bonusNumber = result[0];

  return [...winNumbers, bonusNumber];
};

const Lotto = () => {
  const [shows, setShows] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);

  const idx = useRef(0);
  const timerID = useRef(null);

  const winNumbers = useMemo(() => {
    return getWinNumbers();
  }, [redo]);

  const handleRedo = () => {
    idx.current = 0;
    timerID.current = null;
    setShows([]);
    setBonus(null);
    setRedo(false);
  };

  const setTimer = () => {
    if (idx.current < 6) {
      timerID.current = setTimeout(() => {
        setShows((prevState) => {
          return [...prevState, winNumbers[idx.current]];
        });
        idx.current += 1;
      }, 1000);
    } else if (idx.current === 6) {
      timerID.current = setTimeout(() => {
        setBonus(winNumbers[idx.current]);
        idx.current += 1;
      }, 1000);
    } else {
      timerID.current = clearInterval(timerID.current);
      setRedo(true);
    }
  };

  useEffect(() => {
    console.log('-----start-----');
    console.log(idx.current);
    setTimer();
    return () => {
      console.log('return');
      timerID.current = clearInterval(timerID.current);
    };
  }, [shows, bonus]);

  return (
    <div>
      <div>당첨숫자</div>
      <div>
        <ul>
          {shows.map((s, idx) => {
            return <li key={idx}>{s}</li>;
          })}
        </ul>
      </div>
      <div>보너스숫자</div>
      <div>{bonus}</div>
      <div>{redo && <button onClick={handleRedo}>다시추첨</button>}</div>
    </div>
  );
};

export default Lotto;
