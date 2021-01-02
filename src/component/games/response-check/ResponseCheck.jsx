import React, { Component } from 'react';
import './ResponseCheck.scss';

class ResponseCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: 'waiting',
      message: '클릭해서 시작하세요',
      result: [],
    };
  }

  timeout = null;
  startTime = null;
  endTime = null;

  onClickScreen = (e) => {
    const { state, message, result } = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요.',
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 클릭',
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 3000));
    } else if (state === 'ready') {
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '초록색이 된 후에 클릭하셔야 합니다.',
      });
    } else if (state === 'now') {
      this.endTime = new Date();
      this.setState({
        state: 'waiting',
        message: '클릭해서 시작하세요',
        result: [...result, this.endTime - this.startTime],
      });
    }
  };
  render() {
    const { state, message, result } = this.state;

    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
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
  }
}

export default ResponseCheck;
