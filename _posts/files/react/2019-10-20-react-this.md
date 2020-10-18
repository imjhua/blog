---
layout: post
title: React의 this
categories: React
---

React 클래스에서의 this는 클래스가 아닌, 전역객체를 의미합니다. 무슨말인고 하니 자바스크립트에서의 this는 호출하는 문맥(context)에 의해 좌우되는데 클래스의 메소드에서 호출되는 this는 컴포넌트가 아닌 전역객체를 가리킨다는 것입니다.

## javascript의 this

객체지향언어세어의 일반적인 this는 객체를 지칭합니다. 자바스크립트의 this는 실행시의 호출하는 문맥(context)을 의미합니다.

```js
const fn = function () {
  console.log(this.value); // value가 없기 때문에 에러
};

fn.value = "test";
fn();
```

fn()을 호출하는 것은 전역객체 window이기 때문에, 호출시의 context는 전역 객체 window 입니다. 따라서 fn안의 this는 전역객체를 가리키게 되고, 전역객체 window에는 value가 없으므로 에러가 발생합니다.

## React 클래스에서의 this

컴포넌트의 render()함수가 실행되면 DOM이 그려집니다. render에서 사용되는 this는 컴포넌트 객체를 가리키는 것이 맞습니다. 그러나 click이벤트 핸들러함수에서 호출하는 this는 컴포넌트 객체를 가리키지 않습니다. handleClick() 함수가 호출될때의 this는 컴포넌트 객체가 아닌 전역객체 window를 의미합니다. 객체의 메소드를 호출한 것이 아니라 단지 함수를 호출 했기 때문입니다. 메소드실행의 경우, 메소드를 소유한 객체가 this가 되지만 일반 함수를 호출한 경우 함수 실행에서의 this(실행문맥)는 전역객체를 가리킵니다.

```jsx
import React from "react";

class BindTest extends React.Component {
  handleClick() {
    // 1번 this
    console.log(this, "handleClick");
  }
  render() {
    return (
      // 2번 this
      <button type="button" onClick={this.handleClick}>
        Goodbye bind
      </button>
    );
  }
}
export default BindTest;
```

1번 this와 2번 this는 다릅니다. this.handleClick가 호출되어 실행되는 순간에는 다음과 같은 코드가 실행됩니다. 따라서 전역객체가 실행 문맥이 됩니다.

```js
(function () {
  console.log(this, "handleClick");
})();
```

### bind 메소드 사용하기

bind 메소드는 this의 대상을 지정해주는 역할을 합니다. 이벤트 핸들러를 호출하는 this를 컴포넌트객체의 this라고 명시적으로 지정하여 전역객체가 아닌 컴포넌트객체에서 이벤트핸들러 함수를 실행하도록, 즉 메소드를 실행하도록 하여 undefined가 출력되는 문제를 bind를 통해 해결할 수 있습니다. 핸들러 함수에 선언된 this가 컴포넌트 객체임을 알려주도록 합니다.

```jsx
  render() {
    return (
      <button type="button" onClick={this.handleClick.bind(this)}>
        Goodbye bind
      </button>
    )
  }
```

bind는 this의 대상을 지정해주기 위해 bind의 메서드에 전해진 인자로 컴포넌트를 가리키는 this를 전달하는데 bind 메소드는 함수를 호출 할 때마다 바인딩된 객체를 새로 생성하여 새로 생성된 객체를 참조하도록 합니다.

### 사용할 곳에서 bind()를 사용하는 방법

render() 안에서 바인딩합니다.

```jsx
render() {
    return <div
        onClick={ this.update.bind( this ) }
    />
}
```

### 생성자에서 bind()를 사용하는방법

constructor() 안에서 바인딩합니다.

```jsx
class Home extends React.Component {

    constructor() {
        super()
        this.update = this.update.bind(this);
    }
```

## 화살표 함수 (Arrow Function)

매번 bind함수를 사용하여 이벤트 핸들러 함수에 사용되는 this를 재정의해주는 것은 여간 귀찮은 일이 아닙니다. 이 문제를 ES6의 화살표 함수를 통해 해결 할 수 있습니다. 화살표 함수는 함수를 정의할 때 간단한 형태로, 그리고 문맥을 바인드하기 위해 개발 되었습니다. 화살표 함수의 this는 실행문맥을 가지지 않기 때문에 외부함수(부모함수)의 this를 상속받습니다. 문맥을 좀더 직관적으로 볼 수 있습니다.

참고) 화살표 함수 표현은 메소드 함수가 아닌 곳에 가장 적합합니다. 그래서 생성자로서 사용할 수 없습니다.

```jsx
import React from "react";

class BindTest extends React.Component {
  handleClick = () => {
    console.log(this, "handleClick");
  };
  render() {
    return (
      <button type="button" onClick={this.handleClick}>
        Goodbye bind
      </button>
    );
  }
}
export default BindTest;
```

## 정리

React에서 class로 컴포넌트를 생성할때에, render에서 사용되는 이벤트 핸들러에서 실행되는 this는 전역객체를 가리킵니다. 이때 컴포넌트 객체를 bind()함수를 사용하여 전달하거나 실행문맥을 가지지 않는 화살표 함수를 사용하여 컴포넌트 객체의 메소드를 실행 할 수 있습니다.

```jsx
// 생성자에서 bind()를 사용하는방법
class LoggingButton extends React.Component {
  Constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("this is:", this);
  }

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}

// 사용할 곳에서 bind()를 사용하는 방법
class LoggingButton extends React.Component {
  handleClick() {
    console.log("this is:", this);
  }

  render() {
    return <button onClick={this.handleClick.bind(this)}>Click me</button>;
  }
}

// 화살표 함수로 직접 호출하는 방법
// 이 방법은 LoggingButton이 랜더링 될 때마다 새로운 함수를 생성하는 문제가 있다.
// 콜백 함수 내에서 재랜더링을 발생시키는 경우 성능 문제가 발생할 수 있다.
class LoggingButton extends React.Component {
  handleClick() {
    console.log("this is:", this);
  }

  render() {
    return <button onClick={(e) => this.handleClick(e)}>Click me</button>;
  }
}

// 화살표 함수로 선언하고 바인딩하는 방법
// 이 방법으로 이벤트를 바인딩 하는것을 권장한다.
class LoggingButton extends React.Component {
  handleClick = () => {
    console.log("this is:", this);
  };

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

---

해당 내용은 다음 글을 참고 하였습니다.

- https://blueshw.github.io/2017/07/01/arrow-function/
- https://medium.com/@khwsc1/react%EC%97%90%EC%84%9C%EC%9D%98-%EB%B0%94%EC%9D%B8%EB%94%A9-binding-%EB%B0%A9%EB%B2%95%EB%93%A4-a595ff9190b6
- https://velog.io/@kyusung/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B5%90%EA%B3%BC%EC%84%9C-React%EC%97%90%EC%84%9C-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%8B%A4%EB%A3%A8%EA%B8%B0
