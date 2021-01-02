import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, NavLink, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Lotto from './component/games/lotto/Lotto';
import MineSearch from './component/games/mine-search/MineSearch';
import NumberBaseballGame from './component/games/number-base-ball/NumberBaseballGame';
import ResponseCheckHookv from './component/games/response-check/ResponseCheckHookv';
import RSP from './component/games/rsp/RSP';
import Tic from './component/games/tic-tac-toe/Tic';
import WordConnect from './component/games/word-connect/WordConnect';

const gameMetas = [
  { name: `끝말잇기`, path: `/game/word-connect`, component: WordConnect },
  {
    name: `숫자야구`,
    path: `/game/number-baseball`,
    component: NumberBaseballGame,
  },
  {
    name: `반응속도 체크`,
    path: `/game/response-check`,
    component: ResponseCheckHookv,
  },
  { name: `가위바위보`, path: `/game/rsp`, component: RSP },
  { name: `로또추첨기`, path: `/game/lotto`, component: Lotto },
  { name: `틱택토`, path: `/game/tic`, component: Tic },
  { name: `지뢰찾기`, path: `/game/mine`, component: MineSearch },
];

const Block = styled.div`
  display: flex;
  // 세로 정렬
  flex-direction: column;
  // 가로 가운데
  align-items: center;
`;

const Catogory = styled(NavLink)`
  &.active {
    color: red;
  }

  & + & {
    margin-left: 10px;
  }
`;

function App() {
  return (
    <HashRouter>
      <Block>
        <ul>
          {gameMetas.map((gameMeta) => {
            const { name, path } = gameMeta;
            return (
              <Catogory key={path} to={path} activeClassName="active">
                {name}
              </Catogory>
            );
          })}
        </ul>
        <Switch>
          {gameMetas.map((gameMeta) => {
            const { name, path, component } = gameMeta;
            return <Route key={path} path={path} component={component}></Route>;
          })}
        </Switch>
      </Block>
    </HashRouter>
  );
}

ReactDOM.render(<App></App>, document.querySelector('#root'));
