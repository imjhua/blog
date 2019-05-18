---
layout: post
title: React Hooks를 사용 해 보자! 
tags:
 - react-hooks
categories: React
---

## 소개
Hooks는 리액트 v16.8 에 새로 도입된 기능으로서, 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 그리고 렌더링 직후 작업을 설정하는 useEffect 등의 기능등을 제공하여 기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게 해줍니다.


## 배경
react hooks 아이디어는 오래전에 등장하였습니다. Sebastian Markbåge이 react-future 리파지토리에서 함수 형태로 props state를 제어하는 함수형 컴포넌트를 제안했습니다. 리액트 팀이 이 아이디어를 기반으로 적용 방식에 대한 고민을 하고 안정성 테스트를 거쳐 hooks을 만들어 냈습니다.

React Hooks는 처음 2018년 React Conference에서 나왔습니다. 컨퍼런스에서는 리엑트의 다음 3가지 문제점에 대해 언급하였습니다.
- Wrapping Hell
- 너무 큰 컴포넌트
- class사용시 this와 bind

Wrapping Hell은 연결되는 컴포넌트 구조들로 인해 계층이 많이 생기고 컴포넌트를 관리하기 어려워지는 문제입니다. 또한 너무 큰 컴포넌트가 복잡해지고 UI상에서 제어할 것들이 많아 지면서 컴포넌트가 지나치게 커지고 이를 분리하기 어려운 문제가 있으며 class를 컴포넌트로 상요해서 발생하는 문제로 this나 bind를 사용해서 코드를 작성하는 과정이 혼란을 발생시킵니다.

## 함수형 컴포넌트 API(Functional Component API)
class 형태로 관리되던 컴포넌트를 function을 통해 만들수 있게 해주는 API입니다. 다음 두가지 기능이 대표적으로 많이 사용됩니다.

- useState(): state관리
- useEffect(): lifecycle관리

## 장점
컴포넌트를 함수로 관리 하므로써 얻는 이점입니다.

- 가독성
- 재사용성

## 사용예

### 기존 class 문법

```js
import React, { Component } from "react";

class CounterOrigin extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };

    document.title = this.state.number;
  }

  componentDidUpdate(){
    console.log(`[ORIGIN] update! number is ${this.state.number}`);
  }

  render() {
    return (
      <div>
        <p>
          {this.state.number}
        </p>
        <button
          onClick={() => {
            this.setState({number: this.state.number + 1});
          }}
        >
          add
        </button>
      </div>
    );
  }
}

export default CounterOrigin;

```

### 함수형 컴포넌트와 Hooks

```js
import React, { useState, useEffect } from "react";

function CounterHooks() {
  const [number, setNumber] = useState(0);

  useEffect(()=>{
    console.log(`[HOOKS] update! number is ${number}`);
  });

  return (
    <div>
      <p>
        {number}
      </p>
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        add
      </button>
    </div>
  );
}

export default CounterHooks;

```

### 재사용성을 높이기 위한 코드 분리 
함수 내부에 상태를 업데이트 하는 로직들을 또다른 분리하여 또다른 함수로 정의합니다. 즉 lifecycle과 state를 관리하는 로직들을 분리해서 새로운 함수를 만들어 주면 로직 분리를 통해서 고나련된 부분들을 모아서 관리하기 편해졌다는 것입니다. 자주 활용되는 state로직을 분리해서 다른 컴포넌트에서 쉽게 가져와서 쓸수 있게되어 재사용성이 높아 졌습니다. 

```js
import React, { useState, useEffect } from "react";

function CounterHooks() {
  const [number, addNumber] = useNumber();

  return (
    <div>
      <p>
        {number}
      </p>
      <button
        onClick={addNumber}
      >
        add
      </button>
    </div>
  );
}

function useNumber() {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log(`[HOOKS] update! number is ${number}`);
  });

  const add = ()=>{ setNumber(number + 1); }

  return [number, add];
}

export default CounterHooks;

```

## 결론
state초기화시 여러개가 생시면서 선언부가 복잡해지고 여러가지 핸들러들, onCLick Event Blur들 마다 로직이 생기고 또  온갖 곳에 분산되어 있는 state별 life cycle로직들 즉 각각 state와 관련된 로직들이 여러 life cycle로 분산되어 복잡하였습니다. 따라서 여러군데 분산되어 있는 로직들을 디버깅 하기가 어려워지고 코드를 이해하기 힘든 경우가 많았는데, Hooks 을 이용하여 로직을 관리하는데 보다 효율적인 방법이 제공되었습니다. 

useState와 useEffect를 이용해서 분리를 하면 sate구현에 관련된 부분의 상단에 필요한 state 만 불러오고 선언하는 부분만 생깁니다. state관리 로직들을 각각의 state별로 나누어 life cycle과 state를 관리하는 함수들을 따로 정의하고 해당 state와 관련된 부분들을 모두 분리해서 필요한 것들을 내보내주는 식으로 관리 할 수 있습니다. 





----
해당 내용은 다음 글을 참고 하였습니다.
- https://www.youtube.com/watch?v=GuIiGOMJgUI