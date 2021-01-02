import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

const MAX_LENGTH = 3;
function getRandomNumber() {
  const MAX = 9;
  const MIN = 1;
  const result = [];

  while (result.length < MAX_LENGTH) {
    const number = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
    if (result.indexOf(number) === -1) {
      result.push(number);
    }
  }

  return result;
}

const Try = React.memo(({ e }) => {
  return <li>{e}</li>;
});

export default class NumberBaseballGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      answer: getRandomNumber(),
      input: '',
      result: {
        strike: 0,
        ball: 0,
      },
      tryArr: [],
    };

    this.ref = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.input.length !== 3) {
      return;
    }
    const strInput = String(this.state.input);

    let strike = 0;
    let ball = 0;
    for (let i = 0; i < strInput.length; i += 1) {
      const target = Number(strInput[i]);
      if (this.state.answer.indexOf(target) !== -1) {
        if (this.state.answer.indexOf(target) === i) {
          strike += 1;
        } else {
          ball += 1;
        }
      }
    }

    this.setState({
      input: '',
      result: {
        strike,
        ball,
      },
      tryArr: [...this.state.tryArr, this.state.input],
    });
  }

  inputHandler(e) {
    this.setState({
      input: e.target.value,
    });
  }
  handleClickRestartBtn = (e) => {
    this.setState({
      answer: getRandomNumber(),
      input: '',
      result: {
        strike: 0,
        ball: 0,
      },
      tryArr: [],
    });
  };
  render() {
    const { answer, result, tryArr } = this.state;
    return (
      <>
        {/* <div>{answer}</div> */}
        <div>
          {result.strike}S {result.ball}B ({MAX_LENGTH}자리)
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            ref={this.ref}
            type="text"
            maxLength={MAX_LENGTH}
            value={this.state.input}
            onChange={this.inputHandler}
          />
          <button type="submit">입력</button>
        </form>
        <div>
          <ul>
            {this.state.tryArr.map((e, i) => {
              return <Try key={i} e={e}></Try>;
            })}
          </ul>
        </div>
        <div>{result.strike === 3 ? '정답' : ''}</div>
        {result.strike === 3 && (
          <button onClick={this.handleClickRestartBtn}>재시작</button>
        )}
      </>
    );
  }
}

NumberBaseballGame.propTypes = {};
NumberBaseballGame.defaultProp = {};
