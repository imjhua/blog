---
layout: post
title: React Hooks를 사용 해 보자! 
categories: React
---

Hooks는 리액트 v16.8 에 새로 도입된 기능으로서, 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 그리고 렌더링 직후 작업을 설정하는 useEffect 등의 기능등을 제공하여 기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게 해줍니다.


## 배경
react hooks 아이디어는 오래전에 등장하였습니다. Sebastian Markbåge이 react-future 리파지토리에서 함수 형태로 props state를 제어하는 함수형 컴포넌트를 제안했습니다. 리액트 팀이 이 아이디어를 기반으로 적용 방식에 대한 고민을 하고 안정성 테스트를 거쳐 hooks을 만들어 냈습니다.

React Hooks는 처음 2018년 React Conference에서 나왔습니다. 컨퍼런스에서는 리엑트의 다음 3가지 문제점에 대해 언급하였습니다.
- Wrapping Hell
- 너무 큰 컴포넌트
- class사용시 this와 bind

Wrapping Hell은 연결되는 컴포넌트 구조들로 인해 계층이 많이 생기고 컴포넌트를 관리하기 어려워지는 문제입니다. 또한 너무 큰 컴포넌트가 복잡해지고 UI상에서 제어할 것들이 많아 지면서 컴포넌트가 지나치게 커지고 이를 분리하기 어려운 문제가 있으며 class를 컴포넌트로 상요해서 발생하는 문제로 this나 bind를 사용해서 코드를 작성하는 과정이 혼란을 발생시킵니다.

## React-Hooks

### 장점
컴포넌트를 함수로 관리 하므로써 얻는 이점입니다.

- 가독성
- 재사용성

### 사용예

#### 기존 class 문법

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

#### 함수형 컴포넌트와 Hooks

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

#### 재사용성을 높이기 위한 코드 분리 
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



## 함수형 컴포넌트 API(Functional Component API)
class 형태로 관리되던 컴포넌트를 function을 통해 만들수 있게 해주는 API입니다. 다음 두가지 기능이 대표적으로 많이 사용됩니다.

- useState(initValue): state관리
- useEffect(callbackFn): lifecycle관리
- useContext: context관리
- useReducer: action에 대한 state 처리
- useMemo: 연산 최적화
- useCallback: 리렌더링 최적화
- useRef: DOM에 직접 접근 (ref 와 동일)

### useState
useState 는 가장 기본적인 Hook으로서, 함수형 컴포넌트에서도 가변적인 상태를 지니고 있을 수 있게 해줍니다. 만약에 함수형 컴포넌트에서 상태를 관리해야 되는 일이 발생한다면 이 Hook을 사용할 수 있습니다. 초기값을 지정해 주면 그 값에 대한 상태 업데이트를 자동으로 해주는 함수를 반환하여 반환된 함수를 호출하여 setState를 매번 사용하는 수고를 덜어 줄 수 있습니다.

자세하게 동작을 설명하자면, 이 함수가 호출되고 나면 배열을 반환하는데 그 배열의 첫번째 원소는 상태 값이고, 두번째 원소는 상태를 설정하는 함수입니다. 이 함수에 파라미터를 넣어서 호출하게 되면 전달받은 파라미터로 값이 바뀌게 되고 컴포넌트는 정상적으로 리렌더링 됩니다.

하나의 useState 함수는 하나의 상태 값만 관리를 할 수 있기 때문에 만약에 컴포넌트에서 관리해야 할 상태가 여러 개라면 useState 를 여러번 사용하시면 됩니다.

```js
import React, { useState } from "react";

const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeNickname = e => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} placeholder="name"/>
        <input value={nickname} onChange={onChangeNickname} placeholder="nickname"/>
      </div>

      <div>
        <div>
          <b>이름: </b> {name}
        </div>
        <div>
          <b>닉네임: </b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;

```

또 다른 사용 예는 다음과 같다.
```js

  function useInput(defaultValue = "test") {
    const [value, setValue] = useState(defaultValue);

    const onChange = e => {
      // const value = e.target.value;
      const { target: { value } } = e;

      setValue(value);
    };

    return { value, onChange };
  }
  const inputProps = useInput("");

  return (
    <div>
        <input name="test" {...inputProps} placeholder="test" />
    </div>
  );

```


### useEffect
useEffect는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook 입니다. 클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친 형태로 보아도 무방합니다. 함수를 따로 호출하지 않아도 렌더링(상태변화가 일어날때 수행됨 - onChange이벤트 발생시 마다가 됨) 될때마다 수행됩니다.

```js
import React, { useState, useEffect } from "react";

const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    console.log("렌더링 끝!");
    console.log({
      name,
      nickname
    });
  });

...

```

주의해야 할점은 useEffect는 componentDidMount + componentDidUpdate + componentWillUnmount가 아니라는 점 입니다. useEffect 훅을 사용하기 전에 고려해야 하는 점이 있습니다. 이 훅은 조금 특별하고 다르고 멋지기 때문인데, 클래스 컴포넌트에서 훅(hook)으로 변경할 때에 componentDidMount, componentDidUpdate, componentWillUnmount를 하나 이상의 useEffect 콜백 함수로 바꾸게 될 겁니다. (컴포넌트의 수명주기에 포함된 컴포넌트의 관심사에 따라 다릅니다.)  이 코드는 리팩토링이 아닙니다. 리팩토링은 사용자가 볼 수 있는 변화를 만들지 않고 내부 구현을 바꾸는 것을 의미 합니다. 코드 리팩토링은 존재하는 컴퓨터 코드를 구조를 조정하는 과정으로 외부 동작을 바꾸지 않고 팩토링 즉, 분해(decomposition)를 수행하는 일을 의미하기 때문입니다.


#### 마운트 될 때만 실행하고 싶을 때(가장 처음 렌더링 될 때만 실행)
만약 useEffect 에서 설정한 함수가 컴포넌트가 화면에 가장 처음 렌더링 될 때만 실행되고 업데이트 할 경우에는 실행 할 필요가 없는 경우엔 함수의 두번째 파라미터로 비어있는 배열을 넣어주면 됩니다.

```js
  useEffect(() => {
    console.log('마운트 될 때만 실행됩니다.');
  }, []);

```

#### 특정 값이 업데이트 될 때만 실행하고 싶을 때
useEffect 를 사용 할 때 특정 값이 변경이 될 때만 호출하게 하고 싶을 경우도 있을 것입니다. 만약 클래스형 컴포넌트라면 componentDidUpdate 생명주기 API를 통해 다음과 같이 작성할 것입니다.

```js
componentDidUpdate(prevProps, prevState) {
  if (prevProps.value !== this.props.value) {
    doSomething();  
  }
}
```

위 코드에서는 props 안에 들어있는 value 값이 바뀔 때에만 특정 작업을 수행하도록 하였습니다. 만약 이러한 작업을 useEffect 에서 해야한다면 어떻게 해야 할까요? 바로, useEffect 의 두번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 됩니다. 배열 안에는 useState 를 통해 관리하고 있는 상태를 넣어줘도 되고, props 로 전달받은 값을 넣어주어도 됩니다.

```js
  useEffect(() => {
    console.log(name);
  }, [name]);
```

#### 뒷정리 하기(컴포넌트가 언마운트되기 전이나, 업데이트 되기 직전에 어떠한 작업을 수행)
useEffect 는 기본적으로 렌더링 되고난 직후마다 실행되며, 두번째 파라미터 배열에 무엇을 넣느냐에 따라 실행되는 조건이 달라집니다. 만약 컴포넌트가 언마운트되기 전이나, 업데이트 되기 직전에 어떠한 작업을 수행하고 싶다면 useEffect 에서 뒷정리(cleanup) 함수를 반환해주어야 합니다.

```js
 useEffect(() => {
    console.log('effect');
    console.log(name);
    return () => {
      console.log('cleanup');
      console.log(name);
    };
  });

```


만약에, 오직 언마운트 될 때만 뒷정리 함수를 호출하고 싶으시다면 useEffect 함수의 두번째 파라미터에 비어있는 배열을 넣으시면 됩니다.
```js
  useEffect(() => {
    console.log('effect');
    console.log(name);
    return () => {
      console.log('cleanup');
      console.log(name);
    };
  }, []);

```

### useLayoutEffect
componentDidMount나 componentDidUpdate와 다르게 useEffect로 예정한 효과는 브라우저가 화면을 업데이트하는 것을 막지 않습니다. 앱이 더 높은 응답성을 제공할 수 있도록 이렇게 동작합니다. 대부분의 효과는 동기적으로 구동될 필요가 없습니다. 동기적으로 동작하는 경우는 레이아웃을 측정해야 한다거나 하는 등 특수한 경우에 해당합니다. 이런 코드는 useLayoutEffect에 넣을 수 있으며 useEffect와 동일하게 동작하는 API입니다.

### useContext
이 Hook 을 사용하면 함수형 컴포넌트에서 Context 를 보다 더 쉽게 사용 할 수 있습니다.

```js
import React, { createContext, useContext } from "react";

const ThemeContext = createContext("black");

const ContextSample = () => {
  const theme = useContext(ThemeContext);
  const style = {
    width: "240px",
    height: "24px",
    margin: "0 auto",
    background: theme
  };

  return <div style={style} />;
};

export default ContextSample;

```

### useReducer
useReducer 는 useState 보다 컴포넌트에서 더 다양한 상황에 따라 다양한 상태를 다른 값으로 업데이트해주고 싶을 때 사용하는 Hook 입니다. Redux에서 나오는 리듀서(reducer) 라는 개념입니다.

참고) 리듀서는 현재 상태와, 업데이트를 위해 필요한 정보를 담은 액션(action) 값을 전달 받아 새로운 상태를 반환하는 함수입니다. 리듀서 함수에서 새로운 상태를 만들 때는 꼭 불변성을 지켜주어야 합니다.

Redux 에서는 액션 객체에는 어떤 액션인지 알려주는 type 필드가 꼭 있어야 하지만, useReducer 에서 사용하는 액션 객체는 꼭 type 를 지니고 있을 필요가 없습니다. 심지어, 객체가 아니라 문자열이나, 숫자여도 상관이 없습니다.

#### 기존 reducers 사용과 비교
기존에는 다음과 같이 index.js에서 reducer를 통해 스토어를 생성하고 스토어를 프로퍼티로 사용하였습니다.

```js
// src/index.js

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
//Counter.js

import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다
      </p>

      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
};

export default Counter;

```

#### 여러번 useState사용 대신 useReducer 한번 사용법
하나의 useState 함수는 하나의 상태 값만 관리를 할 수 있습니다. 컴포넌트에서 관리해야할 상태가 여러개인 경우 useState 를 여러번 사용해야 했는데 useReducer 를 사용한다면 컴포넌트에 name값을 할당하여 e.target.name 을 참조하여 setState 를 해준 것과 유사한 방식으로 작업을 처리 할 수 있습니다.

```js
import React, { useReducer } from "react";
import { dispatch } from "rxjs/internal/observable/range";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  };
}

const Info = () => {
  // const [name, setName] = useState("");
  // const [nickname, setNickname] = useState("");

  // const onChangeName = e => {
  //   setName(e.target.value);
  // };

  // const onChangeNickname = e => {
  //   setNickname(e.target.value);
  // };
  
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    nickname: ""
  });
  const { name, nickname } = state;
  const onChange = e => {
    dispatch(e.target);
  };

  return (
    <div>
      <div>
        <input
          name="name"
          value={name}
          onChange={onChange}
          placeholder="name"
        />
        <input
          name="nickname"
          value={nickname}
          onChange={onChange}
          placeholder="nickname"
        />
      </div>

      <div>
        <div>
          <b>이름: </b> {name}
        </div>
        <div>
          <b>닉네임: </b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```


useReducer 에서의 액션은 그 어떤 값이 되어도 됩니다. 그래서 이번에 우리는 이벤트 객체가 지니고있는 e.target 값 자체를 액션 값으로 사용하였습니다. `dispatch(e.target)`

이런 식으로 인풋을 관리하면, 아무리 인풋의 개수가 많아져도 코드를 짧고 깔끔하기 유지 할 수 있습니다.

### useMemo
useMemo 를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화 할 수 있습니다. 상태값이 변경될때마다 렌더링이 계속 발생하는데 렌더링에 연산을 담당하는 함수가 있는 경우 계속 호출되는 낭비가 발생할 수 있습니다. 모든 상태변화에 관계없이 정말 필요할때만 렌더링 된다면 더 효율적 일 것입니다. 햇갈릴수도 있는데 useEffect의 특정 값이 업데이트 될때만 실행하고 싶은 경우와는 전혀 다른 경우입니다. 지금 사용하는 useMemo는 오직 렌더링시의 낭비를 개선하는 것입니다. 

useMemo Hook 을 사용하면 불필요한 화면 리 랜더링 작업을 최적화 할 수 있습니다. 렌더링 하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고 만약에 원하는 값이 바뀐 것이 아니라면 이전에 연산했던 결과를 다시 사용하는 방식입니다.

```js
import React, { useState, useMemo } from "react";

const getAverage = numbers => {
  console.log(numbers + "평균값 계산중...");

  if (numbers.length === 0) return 0;

  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = e => {
    setNumber(e.target.value);
  };

  const onInsert = e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };

  const onKeyPress = e => {
    if (e.charCode === 13) {
      onInsert(e);
    }
    // if (e.key === "Enter") {
    //   onInsert(e);
    // }
  };

  const lis = list.map((value, index) =>
    <li key={index}>
      {value}
    </li>
  );

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} onKeyPress={onKeyPress}/>
      <button onClick={onInsert}>등록</button>
      <ul>
        {lis}
      </ul>
      <div>
        {/* <b>평균 값:</b> {getAverage(list)} */}
        <b>평균 값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;

```


### useCallback
useCallback 은 useMemo와 상당히 비슷한 함수입니다. 주로 렌더링 성능을 최적화해야 하는 상황에서 사용하는데 이 Hook을 사용하면 이벤트 핸들러 함수를 필요할 때만 생성 할 수 있습니다. 함수형 컴포넌트이기 때문에 class로 구성된 컴포넌트와는 다르게(이때에는 생명주기에 맞춰서 호출됨),  컴포넌트가 리 렌더링 될때마다 이 함수들이 새로 생성됩니다. 대부분의 경우에는 이러한 방식이 문제가 되지 않지만, 컴포넌트의 렌더링이 자주 발생하거나, 렌더링 해야 할 컴포넌트의 개수가 많아진다면 이 부분을 최적화 해주것이 좋습니다.

한번 useCallback 을 사용하여 최적화를 해봅시다. 첫번째 인자는 클로저입니다. 이 함수가 생성되던 당시의 상태를 기억한다고 할 수 있습니다. 두번째 인자의 다른 이름은 Dependecy List로, 여기에 함수 내에서 참조하고 있는 즉, 의존하고 있는 값을 넣습니다. useEffect의 사용법과 비슷합니다. useCallback 에서는 Dependency List를 이전에 넘겨 받은 값과 shallow compare로 비교해서 다르다고 판단하면 새로운 함수를 만들고, 아니라면 이전에 만들어진 함수를 그대로 유지합니다.

```js

  // const onChange = e => {
  //   setNumber(e.target.value);
  // };

  // const onInsert = e => {
  //   const nextList = list.concat(parseInt(number));
  //   setList(nextList);
  //   setNumber("");
  // };

  const onChange = useCallback(e => {
    setNumber(e.target.value);
  }, []); //// 컴포넌트가 처음 렌더링 될 때만 함수 생성


  const onInsert = useCallback(e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  }, [number, list]); //// number 혹은 list 가 바뀌었을 때만 함수 생성


```


실제로 useCallback을 들여다보면 다음과 같습니다. useCallback 은 결국 useMemo 에서 함수를 반환하는 상황에서 더 편하게 사용 할 수 있는 Hook 입니다. 숫자, 문자열, 객체 처럼 일반 값을 재사용하기 위해서는 useMemo 를, 그리고 함수를 재사용 하기 위해서는 useCallback 을 사용하면 됩니다.

```js
useCallback(() => {
  console.log('hello world!');
}, [])

useMemo(() => {
  const fn = () => {
    console.log('hello world!');
  };
  return fn;
}, [])
```

### useRef
useRef Hook 은 함수형 컴포넌트에서 ref 를 쉽게 사용 할 수 있게 해줍니다. ref는 리엑트에서 DOM에 직접적인 접근을 하는 경우 사용합니다. 직접접근의 경우는 다음과 같은 때가 있습니다.

- input / textarea 등에 포커스를 해야 할때
- 특정 DOM 의 크기를 가져와야 할 때
- 특정 DOM 에서 스크롤 위치를 가져오거나 설정을 해야 할 때
- 외부 라이브러리 (플레이어, 차트, 캐로절 등) 을 사용 할 때

```js
...

const inputEl = useRef(null);

...

const onInsert = useCallback(
  e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    inputEl.current.focus();
  },
  [number, list]
); //// number 혹은 list 가 바뀌었을 때만 함수 생성

...

<input
  value={number}
  onChange={onChange}
  onKeyPress={onKeyPress}
  ref={inputEl}
/>

...

```

useRef 를 사용하여 ref 를 설정하면, useRef 를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가르키게 됩니다.



## 결론
state초기화시 여러개가 생시면서 선언부가 복잡해지고 여러가지 핸들러들, onCLick Event Blur들 마다 로직이 생기고 또  온갖 곳에 분산되어 있는 state별 life cycle로직들 즉 각각 state와 관련된 로직들이 여러 life cycle로 분산되어 복잡하였습니다. 따라서 여러군데 분산되어 있는 로직들을 디버깅 하기가 어려워지고 코드를 이해하기 힘든 경우가 많았는데, Hooks 을 이용하여 로직을 관리하는데 보다 효율적인 방법이 제공되었습니다. 

useState와 useEffect를 이용해서 분리를 하면 sate구현에 관련된 부분의 상단에 필요한 state 만 불러오고 선언하는 부분만 생깁니다. state관리 로직들을 각각의 state별로 나누어 life cycle과 state를 관리하는 함수들을 따로 정의하고 해당 state와 관련된 부분들을 모두 분리해서 필요한 것들을 내보내주는 식으로 관리 할 수 있습니다. 





----
해당 내용은 다음 글을 참고 하였습니다.
- https://www.youtube.com/watch?v=GuIiGOMJgUI
- https://velog.io/@velopert/react-hooks