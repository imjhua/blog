---
layout: post
title: 함수형 컴포넌트(Functional Component) 
categories: React
---

React는 두 종류의 컴포넌트 선언이 존재합니다. ES6 클래스 컴포넌트와 함수형 상태 없는 컴포넌트(functional stateless component)입니다. 함수형 상태 없는 컴포넌트는 props를 인자로 받고 JSX를 반환하는 단순한 함수입니다. 이 함수는 어떤 상태도 갖지 않으며 React의 생애주기(lifecycle) 메소드에도 접근하지 않습니다. 이 컴포넌트는 이름 붙여진 그대로 상태가 없습니다.


## 함수형 컴포넌트
React 에서 컴포넌트를 정의 할 때는 보통 EcmaScipt 6 에 도입된 class 문법을 사용합니다. 컴포넌트에서 라이프사이클 API를 사용해야 하거나, state를 사용하는 경우에는 기본 클래스 생성 문법으로 작성해야 합니다. 그런데 만약 라이프사이클 API와 state를 사용할 필요가 없고 오로지 props를 전달 받은 뷰를 렌더링하는 역할만 한다면 함수형 컴포넌트를 만들면 더 간단하게 선언할 수 있는 방법이 있습니다. 바로 함수형 컴포넌트를 정의하는 방법입니다.

### 클래스 컴포넌트
 ES6 클래스 컴포넌트는 지역 상태와 생애주기 메소드를 사용할 수 있습니다. 이 컴포넌트는 this.state와  this.setState() 메소드에 접근 가능합니다. ES6 클래스 컴포넌트는 상태 컴포넌트로 사용할 수 있다는 의미입니다. 물론 이 컴포넌트가 꼭 지역 상태를 사용해야 한다는 뜻은 아니며 상태 없는 컴포넌트로도 작성할 수 있습니다. 일반적으로 상태가 없는 ES6 클래스 컴포넌트라면 생애주기 메소드를 사용하기 위해 클래스 형태로 작성한 경우입니다.

```js
class FocusedInputField extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.input.focus();
  }

  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        ref={node => this.input = node}
        onChange={event => this.props.onChange(event.target.value)}
      />
    );
  }
}
```


### 함수형 컴포넌트
순수한 함수만으로 컴포넌트를 선언하는 방법입니다. 번거롭게 class를 만들고 render()를 만들지 않아도 됩니다. 

```js
// ES5 방식
import React from 'react';
function Hello(props){
    return (
        <div> Hello {this.props.name}</div>        
    )
}
export default Hello;
```

```js
// ES6 arrowFn 방식

import React from 'react';

const Hello = (props) => {
    return (
        <div>Hello {props.name}</div>
    );
}

export default Hello;
```


```js
// ES6 ArrowFn + 비구조화 할당 방식
import React from 'react';
const Hello = ({name}) => {
    return (
        <div> Hello {name}</div>        
    )
}
 
/*
또는 이런 식으로 {}를 생략할 수도 있다.
const Hello = ({name}) => (
    <div> Hello {name}</div>
)
*/
 
export default Hello;
```

## 장점
함수형 컴포넌트는 컴포넌트에서 라이프사이클, state 등 불필요한 기능을 제거한 상태이기 때문에 메모리 소모량은 일반 클래스형 컴포넌트보다 적습니다. 리엑트 v16 이상에서는 함수형 컴포넌트 성능이 클래스형 컴포넌트보다 조금 빠릅니다.

또한 리액트 프로젝트에서 state를 사용하는 컴포넌트 개수를 최소화하면 좋습니다. 따라서 컴포넌트 만들때는 대부분 함수형으로 작성하여 state를 사용하는 컴포넌트 개수를 줄이는 방향으로 향하며, state나 라이프사이클 API를 꼭 써야할때만 클래스 형태로 변환하여 컴포넌트를 작성하면 됩니다.


## 정리
일반적으로 지금까지 만들어왔던 class문법을 사용하는 것 보다 훨씬 간단해 졌습니다. 필요한 경우에 따라 함수형 컴포넌트를 만들어서 사용하면 쉽고 효율적으로 컴포넌트를 활욜 할 수 있습니다.



----
해당 내용은 다음 글을 참고 하였습니다.
- https://velopert.com/2994
- https://backback.tistory.com/299 
- https://edykim.com/ko/post/learn-react-before-using-redux/