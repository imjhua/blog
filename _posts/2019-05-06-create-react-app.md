---
layout: post
title: create-react-app로 redux 프로젝트 시작하기
tags:
 - create-react-app
categories: React
---

## 소개
create-react-app 보일러플레이트(boilerplate)를 사용하여 간단한 애플리케이션을 시작 해 봅시다. 보일러플레이트란 반복되지만 자주쓰이는 형태를 자동해 놓은 것으로 다음고 같이 정의됩니다.

- 최소한의 변경으로 재사용할 수 있는 것
- 적은 수정만으로 여러 곳에 활용 가능한 코드, 문구
- 각종 문서에서 반복적으로 인용되는 문서의 한 부분

javaScript나 html에서의 보일러플레이트라고 하면 보통 크로스 브라우징과 호환성을 위한 Modernizr, polyfill, Normalize 등이 
적용되어 있는 템플릿 같은 형태로 많이 사용됩니다. 따라서 직접 webpack을 정의하여 애플리케이션 시작 코드를 작성하여도 되지만 페이스북에서 만든 리엑트 생성도구인 create-react-app 을 사용하면 복잡한 설정 없이 쉽게 프로젝트를 시작 할 수 있습니다.

## 설치

### create-react-app 설치 및 프로젝트 생성
글로벌로 설치 해 줍니다. 관련 문서는 https://facebook.github.io/create-react-app/docs/getting-started 를 참고 합니다. 
```sh
$ npm install -g create-react-app
```

바벨(babel)이나 웹팩(webpack) 설정을 자동으로 해줍니다. 설정을 오버라이드 할때는 직접 설정파일을 추가 하여야 하는데 이떄에는 eject 모듈을 이용히여 추가 하는 것을 권장하며 서버 포트는 기본으로 3000입니다.
```sh
$ create-react-app [PROJECT_NAME]
```

### redux패키지 설치 
view redux바인딩으로 컴포넌트에서 리덕스를 쉽게 연결 할 수 있습니다.
```sh
$ npm install -D redux react-redux
```


### 기본 디렉토리 구조
사용하지 않는 디렉토리는 정리하여도 좋습니다.

```
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

### redux 사용에 필요한 디렉토리 추가
다음 디렉토리를 추가 해 줍니다.

```sh
$ mkdir components # 컴포넌트 파일들
$ mkdir actions # 액션 파일들
$ mkdir reducers # 리듀서 파일들
```

## 코딩

카운팅을 할 수 있는 기능을 가진 프로젝트를 만들어 봅니다.

### 컴포넌트

#### 컴포넌트 생성
기본적으로 src/index.js 와 src/components/App.js 를 생성해 줍니다.

- src/index.js: ReactDOM.render
- src/components/App.js: class App extends Component


#### 필요한 컴포넌트 정리
다음 문서를 참고하여 컴포넌트를 나누어 봅니다. https://dobbit.github.io/redux/basics/UsageWithReact.html

- Vlue.js: 버튼에 따라 값이 감소 하거나 증가 해서 디스플레이되는 영역 (버튼과 텍스트)
- Control.js: 배경화면 색상을 렌덤하게 만드는 영역 
- Counter.js: 전체 컴포넌트를 담는 영역 (똑똑한 컴포넌트-redux와 연결되어 있다.)


| 영민한(똑똑한) 컴포넌트	| 우직한 컴포넌트 |
|-------------------|-------------|
| 위치 |	최상위, 라우트 핸들러 |	중간과 말단 컴포넌트 |
| Redux와 연관됨 |	예 |	아니오 |
| 데이터를 읽기 위해 |	Redux 상태를 구독 |	props에서 데이터를 읽음 |
| 데이터를 바꾸기 위해 |	Redux 액션을 보냄 |	props에서 콜백을 부름 |


#### 컴포넌트 이벤트 추가
화면을 구성하고 이벤트가 동작하는 컴포넌트(아마도 우직한 컴포넌트)에서는 이벤트가 실행될 함수들을 전체 컴포넌트를 담고 있는(똑똑한 컴포넌트)로 부터 props를 통해 받습니다.

우직한 컴포넌트에 이벤트 정의 순서
- propTypes과 defaultProps 정의

```js
Control.propTypes = {
  onPlus: PropTypes.func,
  onSubtract: PropTypes.func,
  onRandomizeColor: PropTypes.func
};

function createWarning(funcName) {
  return () => {
    console.warn(funcName + "is not defined");
  };
}
Control.defaultProps = {
  // onPlus: ()=>{console.warn('onPlus is not defained')},
  onPlus: createWarning("onPlus"),
  onSubtract: createWarning("onSubtract"),
  onRandomizeColor: createWarning("onRandomizeColor")
};

```

- render 에 이벤트 영역에 prop추가 (ex-onPluss)
```html
  render() {
    return (
      <div>
        <button onClick={this.props.onPlus}>+</button>
        <button>-</button>
        <button>Randomize Color</button>
      </div>
    );
  }
```

똑똑한 컴포넌트에 이벤트 정의 순서
- 임포트 후 렌더링
```js
import Value from './Value';
import Control from './Control';

  render() {
    return (
      <div>
        <Value />
        <Control />
      </div>
    );
  }
```
App에서 정의

- 임포트 후 똑똑한 컴포넌트 렌더링
```js
import Counter from "./Counter";
...

  render() {
    return <Counter />;
  }
```


### 액션
#### 액션 타입 정의
ActionTypes에 액션 이름들을 상수 형태로 만들고 다른 파일에서 불러와서 사용할수 있도록 합니다.
```js
$ touch src/actions/ActionTypes.js
```

내용은 다음과 같습니다.
```js
export const INCREMENT = "INCREMENT";
```

#### 액션 생성자 
이벤트들을 액션으로 만들어 봅니다. 이때 액션은 하나의 객체 입니다. 


액션 객체를 생성하기 위한 액션 생성자를 index.js에 작성합니다. (index이름으로 정의한 이유는 액션을 불러올때 디렉토리 명만 불러 오기 위함) 액션이 많은 경우 종류별로 분리하는 것이 좋습니다.

```js
// import {INCREMENT, DECREMENT, SET_COLOR} from './ActionTypes';
import * as types from "./ActionTypes";

export function increment() {
  return {
    type: types.INCREMENT
  };
}
export function decrement() {
  return {
    type: types.DECREMENT
  };
}
export function setColor(color) {
  return {
    type: types.SET_COLOR,
    color: color
  };
}

```


### 리듀서 (파일명은 소문자로..)
리듀서는 변화를 일으키는 `함수` 입니다. 이 함수는 순수해야 합니다. 순수의 조건은 비동기 작업을 하면 안되고, 인수 변경을 하면 안되고, 동일한 인수는 동일한 결과를 내야 합니다.리듀서 함수의 역할은 이전 상태와 액션을 받아서 다음 상태를 반환합니다. 

액션이란 어떤 작업을 할지 정보를 지니고 있는 객체 입니다. 리듀서는 이 디스패처로 부터 전달받은 액션을 이용하여 이전 상태를 변경하는게 아니고 이전 상태를 복사 하여 액션에 의해 변화를 준 다음 새로운 상태를 반환하는 것 입니다. 

#### 생성
사용할 액션 타입을 불러온 후 리듀서 초기 상태를 정의 합니다. 이전 상태와 액션값을 파라미터로 전달받기 전 초기 상태가 필요한다 이는 상수 형태의 객체입니다. ES6에서 제공되는 기본인수(default agrument) 기능으로 초기 상태 값을 적용하고 리듀서는 함수 이므로 내보내기도 함께 정의합니다. 스프레드 오퍼레이터를 통해 객체를 복사 합니다. 

```js
import * as types from "../actions/ActionTypes";

const initialState = {
  number: 0
};

export default function counter(state = initialState, action) {
  // if (typeof state === "undefined") {
  //   return initialState;
  // }

  /* ... */

  switch (action.type) {
    case types.INCREMENT:
      return { ...state, number: state.number + 1 };
    case types.DECREMENT:
      return { ...state, number: state.number - 1 };
    default:
      return state;    
  }
}

```

리듀서가 두개 이상인 경우 index 파일에서 합쳐줍니다.
```js
import { combineReducers } from "redux";
import counter from "./counter";
import ui from "./ui";

const reducers = combineReducers({
  counter,
  ui
});

export default reducers;

```

### 스토어(Store)
애플리케이션의 현재 상태를 지니고 있는 부분이며 하나의 스토어가 존재 해야 합니다. 이때 스토어생성시에는 리듀서를 인수로 전달하여 해당 함수를 실행합니다.

index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import { createStore } from 'redux';
import reducers from './reducers';

import * as actions from './actions';

const store = createStore(reducers);

const unsubscribe = store.getState();
store.dispatch(actions.increment());
unsubscribe();

ReactDOM.render(<App />, document.getElementById('root'));

```

#### 하는 일
- 디스패치를 통해 액션을 리듀서르 보낸다. (dispatch)
- 현재 상태를 받환한다. (getStore)
- 스토어의 변화가 있을때 마다, 즉 상태가 바뀔때마다 실행할 함수를 등록한다. (subscribe)

#### 적용 

컴포넌트에서 redux스토어 안에 있는 데이터를 사용하고 변화를 주려면 App 컴포넌트에 프롭스로 스토어를 넘겨 하위 컴포넌트에서 getState나 dispatch를 적용할수 있습니다. 그러나 이렇게 적용하는 경우 구조가 무척이나 복잡해 지는데요. 그래서 react-redux 뷰 레이어 바인딩 도구를 사용하여 스토어를 적용해 보도록 하곘습니다.

### react-redux 
뷰 레이어 바인딩 도구 입니다.

- Provider: 하나의 컴포넌트로써 컴포넌트에서 redux를 사용할수 있도록 한다. 
- connetc[opt]: 똑똑한 컴포넌트에서 사용한다. 컴포넌트를 redux에 연결하는 또 다른 함수를 반환한다. 옵션이 없으면 this.props.store로 접근 가능하다.

opt: [mapStateToProps], [mapDispatchToProps], [mergeProps], [options]
options: pure=ture, withRef=false (withRef=true인경우 getWrappedInstance()를 사용)
```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore } from "redux";
import reducers from "./reducers";

import { Provider } from "react-redux";

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

```

```js
import React, { Component } from "react";
import PropTypes from "prop-types";

import Value from "./Value";
import Control from "./Control";
import { connect } from "react-redux";
// import { connet, bindActionCreators } from "redux";

import * as actions from "../actions";

class Counter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {/* <Value numner={this.props.store.getState().counter.number} /> */}
        <Value number={this.props.number} />
        <Control />
      </div>
    );
  }
}

Counter.propTypes = {
  onFn: PropTypes.func
};

Counter.defaultProps = {
  name: ""
};

const mapStateToProps = state => {
  return {
    number: state.counter.number,
    color: state.ui.color
  };
};

const mapDispatchToProps = dispatch => {
  // return bindActionCreators(actions, dispatch);

  return {
    handleIncrement: () => {
      dispatch(actions.increment());
    },
    handleDecrement: () => {
      dispatch(actions.decrement());
    },
    handleSetColor: color => {
      dispatch(actions.setColor(color));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```


### 기능구현
배경색을 랜덤색상으로 적용해보겟습니다.

```js

  setRandomColor() {
    const color = [
      Math.floor(Math.random() * 55 + 200),
      Math.floor(Math.random() * 55 + 200),
      Math.floor(Math.random() * 55 + 200)
    ];
    this.props.handleSetColor(color);
  }
    return (
      <div style={style}>
        {/* <Value numner={this.props.store.getState().counter.number} /> */}
        <Value number={this.props.number} />
        <Control
          onPlus={this.props.handleIncrement}
          onSubstrat={this.props.handleIncrement}
          onRandomizeColor={this.setRandomColor}
        />
      </div>
    );
```


----
해당 내용은 다음 글을 참고 하였습니다.
- https://www.youtube.com/watch?v=dmxA42uXo0I&list=PL9FpF_z-xR_GMujql3S_XGV2SpdfDBkeC&index=27