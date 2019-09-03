---
layout: post
title: React 의 this
categories: React
---

react클래스에서 사용되는 this를 이해하기 위해 먼저 자바스크립트의 this에 대해 알아보겠습니다.

## js의 this
객체지향언어세어의 일반적인 this는 객체를 지칭합니다. js의 this는 실행시 context를 의미합니다.

```js

const fn = function(){
  console.log(this.a); // a 없어서 에러
}

fn.a = 'test';
fn(); 
```

fn(); 호출시의 context는  전역 객체입니다. 따라서 fn안의 this는 전역이 되고, 전역에는 a  가 없으므로 에러입니다.

this.a를 출력하려면 `this 에 해당하는 객체의 메서드`를 호출하면 this.value 값을 가져올 수 있습니다. 

```js
const thisTest = function() {
  console.log(this.value)
}
thisTest.value = 'I am this'
thisTest.func = function() {
  console.log(this.value)
}
thisTest.func()

```

## react 의 this

컴포넌트의 render()함수가 실행되면 DOM 이 그려질것입니다. 이때 this 는 WithoutBindTest 객체를 가리키는것이 맞습니다. 하지만 handleClick()함수가 호출될때의 this 는 WithoutBindTest 가 아닌 전역객체(Window)를 의미합니다. 왜냐하면 this 라는 값은 호출하는 문맥(context)에의해 좌우되는데 `클릭이 실행되는 문맥이 바로 전역(window)객체이기 때문`입니다.

```jsx
render() {
    return <button type="button" onClick={this.handleClick}>Goodbye bind without this</button>;
}
```
 

## 화살표 함수 (Arrow Function)
귀차니즘을 해결해보겠습니다. click, change 등의 이벤트 리스너를 붙여줄때마다 bind()함수를 작성하는건 귀찮은 일입니다. ES6 의 화살표함수를 사용하면 이 문제를 간단히 해결할 수 있습니다. BindTest 를 화살표 함수를 이용해 새로 작성해보았습니다.

이제는 this 가 무엇인지 걱정할 필요가 없습니다. `화살표 함수의 this 는 외부함수(부모함수)의 this 를 상속받기 때문에 this 는 항상 일정`합니다. 다음 예제의 경우에는 this가 BindTest 클래스(사실 함수입니다)가 됩니다..


```js
import React from 'react'

class BindTest extends React.Component {
  handleClick = () => {
    console.log(this)
  }
  render() {
    return (
      <button type="button" onClick={this.handleClick}>
        Goodbye bind
      </button>
    )
  }
}
export default BindTest
```



----
해당 내용은 다음 글을 참고 하였습니다.
- https://blueshw.github.io/2017/07/01/arrow-function/

