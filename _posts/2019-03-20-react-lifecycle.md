---
layout: post
title: React 컴포넌트의 생명주기(Lifecycle)
tags:
 - react-life-cycle
categories: React
---

## 소개
react의 컴포넌트에 대해 알아봅시다. 리엑트는 간단하게 정의하면 UI를 위한 JS라이브러리로 표현할 수 있습니다. 이때 상태에 따라 화면은 바뀌게 되는 것입니다. React 컴포넌트는 상태 값을 이용해 UI를 표현합니다. 컴포넌트 상태는 객체의 인스턴스 속성(Properties)을 이용해 관리하며, 컴포넌트간에 단방향으로 데이터를 주고받는 props와 컴포넌트 내부에서 사용하는 state가 있습니다.

프로퍼티나 상태의 갱신을 위해 리엑트 컴포넌트의 생명주기를 활용합니다. 즉, 컴포넌트의 생명주기에 따라 상태에 따라 화면이 갱신되므로 컴포넌트 구성 하기 전, 생명주기를 알고 있어야 합니다. 

## 생명주기(Lifecycle)
먼저 컴포넌트는 각 프로세스가 진행될 때에 따라 Lifecycle 함수로 불리는 특별한 함수가 실행됩니다. 개발자는 이를 재정의하여 컴포넌트를 제어하게 됩니다. 컴포넌트가 실행되거나 업데이트되거나 제거될 때, 특정한 이벤트들이 발생합니다. 생명주기란 컴포넌트가 생성되고 사용되고 소멸될 때 까지 일련의 과정을 말합니다. 이러한 생명주기 안에서는 특정 시점에 자동으로 호출되는 메서드가 있는데, 이를 라이프 사이클 이벤트라고 합니다.

리엑트 버전 v16.3을 기준으로 생명주기가 변경되었습니다. 해당 버전 기준으로 생명주기에 대해 정리 해 보겠습니다.

### React v16.3 이전의 라이프 사이클 이벤트

- counstructor
- `componentWillMount`(v17 defrecated)
- render
- componentDidMount
- `componentwillReceiveProps(nextProps)`(v17 defrecated)
- shouldComponentUpdate(nextProps, nextState)
- `componentWillUpdate`(v17 defrecated)
- render
- componentDidUpdate(prevProps, prevState)
- componentWillUnmount


### counstructor
컴포넌트가 처음 만들어 질때 실행됩니다. 기본 state를 설정할 수 있습니다.


### componentWillMount
컴포넌트가 DOM위에 만들어지기 전에 실행 됩니다. 따라서 DOM을 처리할 수 없습니다. render가 호출되기 전이기 때문에 setState를 사용해도 render가 호출하지 않습니다. (v17 defrecated에서 삭제)

### render
화면 렌더링을 담당 합니다.

### componentDidMount
첫 렌더링 후 실행됩니다. 이 안에서 다른 js프레임웍 연동 및 setTimeout, setInterval 및 Ajax를 사용합니다.

### componentwillReceiveProps(nextProps)
props를 받을 때 실행됩니다. props에 따라 state를 업데이트 할 때 사용하면 유용합니다. 이 안에서 setState할 수 있지만 추가적인 렌더링은 발생하지 않습니다. 컴포넌트가 처음 마운트 되는 시점에서는 호출되지 않습니다. (v17 defrecated - getDerivedStateFromProps로 대체됨)


### shouldComponentUpdate(nextProps, nextState)
props/state가 변경되었을때 리 렌더링을 할지 말지를 결정합니다. 실제로 사용할때는 필요한 비교를 하고 값을 반환해야 합니다. 쓸데없는 렌더링을 걸러낼 수 있습니다.

ex) return nextProps.id !== this.props.id (이때 JSON.stringify를 사용하여 여러 field를 편하게 비교 할 수 있습니다.)

### componentWillUpdate(prevProps, prevState)
컴포넌트 업데이트 직전 실행됩니다. setState는 절대로 사용하면 안됩니다. 무한 루프에 빠질수 있습니다. (v17 defrecated - getSnapshotBeforeUpdate로 대체됨)

### componentDidUpdate(prevProps, prevState)
컴포넌트 업데이트 직후 실행됩니다. setState는 절대로 사용하면 안됩니다. 무한 루프에 빠질수 있습니다.


### componentWillUnmount
컴포넌트가 DOM에서 사라진 후 실행됩니다. 컴포넌트 내부에서 타이머나 비동기 API를 사용하고 있을 때, 이를 제거하기에 유용합니다.


### 사용예
```js
import React from "react";

export default class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hi!</h1>
        <h2>
          It is {this.state.date.toLocaleTimeString()}
        </h2>
      </div>
    );
  }
}

```


## React v16.3 이후에 변경된 부분
대체적으로 componentWill... 이 아에 삭제 되었거나 삭제되면서 대체 메서드가 추가되었습니다.


- 사용불가: componentWillMount, 
componentWillReceiveProps, 
componentWillUpdate (v17 부터 사용불가)
- 대체 메서드 추가: componentWillReceiveProps -> getDerivedStateFromProps
- 대체 메서드 추가: componentWillUpdate -> getSnapshotBeforeUpdate 
-  컴포넌트 에러 핸들링 API 추가: componentDidCatch

### getDerivedStateFromProps
getDerivedStateFromProps은 componentWillReceiveProps의 대체 역할로 작성된 메서드로 컴포넌트가 인스턴스화 된 후, 새 props를 받았을 때 호출됩니다. 주의할 점으로 setState를 사용하는 것이 아닌 값을 retrun을 해야합니다. state를 갱신하는 객체를 반환할 수 있고, 새로운 props가 state 갱신을 필요로 하지 않음을 나타내기 위해 null을 반환할 수도 있습니다.

#### 이전 코드
```js
componentWillReceiveProps(nextProps) {
  if (this.props.name !== nextProps.name) {
    this.setState({ name: nextProps.name });
  }
}
```
#### 개선된 코드
```js
static getDerivedStateFromProps(nextProps, prevState) {
  if (prevState.name !== nextProps.name) {
    return { name: nextProps.name };
  }

  return null;
}
```

### getSnapshotBeforeUpdate
getSnapshotBeforeUpdate은 componentWillUpdate의 대체 역할로 작성된 메서드로 DOM이 업데이트 직전에 호출됩니다. (이 라이프 사이클은 많이 필요하지 않지만, 렌더링되는 동안 수동으로 스크롤 위치를 유지해야할 때와 같은 경우에는 유용할 수 있음)

#### 이전 코드
```js
componentWillUpdate(nextProps, nextState) {
  if (this.props.list.length < nextProps.list.length) {
    this.previousScrollOffset =
      this.listRef.scrollHeight - this.listRef.scrollTop;
  }
}
```

#### 개선된 코드
```js
getSnapshotBeforeUpdate(prevProps, prevState) {
  if (prevProps.list.length < this.props.list.length) {
    return (
      this.listRef.scrollHeight - this.listRef.scrollTop
    );
  }
return null;
}
```

### componentDidCatch
컴포넌트 오류 처리 개선을 위해 추가되었습니다.
에러 발생시에 state를 변경하고 render에서 해당 처리를 구현하면 됩니다. 주의할점은 자식 컴포넌트에서 발생하는 에러만 잡아낼 수 있고, 자신의 에러는 잡아낼수 없습니다.

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### 변경 이유
React 커뮤니티에서도 생명주기는 가장 혼란을 야기하는 기능이었습니다. 초기 렌더링을 제어하는 방법이 많아져서 혼란이 되었고
오류 처리 인터럽트 동작시에 메모리 누수 발생할 수 있는 문제를 해결하기 위해 변경되었습니다.




----
해당 내용은 다음 글을 참고 하였습니다.
- https://medium.com/little-big-programming/react%EC%9D%98-%EA%B8%B0%EB%B3%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-92c923011818
- https://velog.io/@kyusung/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B5%90%EA%B3%BC%EC%84%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%99%80-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EC%9D%B4%EB%B2%A4%ED%8A%B8