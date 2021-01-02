import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

WordConnect.propTypes = {};
WordConnect.defaultProp = {};
function WordConnect() {
  const [target, setTarget] = useState('시작');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const ref = useRef(null);
  const timer = useRef(null);

  const inputHandler = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const lastWord = target.slice(target.length - 1, target.length);
      const firstWord = input.slice(0, 1);
      if (lastWord === firstWord) {
        setResult('딩동댕');
        setTarget(input);
      } else {
        setResult('땡');
      }
      setInput('');

      // 마지막 입력한 것으로 부터 2초 보장 (debounce)
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        console.log('debounce');
        setResult(``);
      }, 2000);

      ref.current.focus();
    },
    [target, input]
  );

  useEffect(() => {
    ref.current.focus();
    return () => {};
  }, []);

  return (
    <>
      <div>{target}</div>
      <form onSubmit={handleSubmit}>
        <input
          ref={ref}
          type="text"
          value={input}
          onChange={inputHandler}
        ></input>
        <button type="submit">입력</button>
      </form>
      <div>{result}</div>
    </>
  );
}

export default WordConnect;
