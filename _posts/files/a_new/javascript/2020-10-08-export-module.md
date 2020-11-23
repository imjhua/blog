---
layout: post
title: 햇갈리는 module.exports module export default 차이
categories: JavaScript
---

모듈을 내보내기 할때 상요하는 패턴이 햇갈릴때가 있습니다. module.exports 와 export default 차이를 정리합니다.

## 모듈이란?

모듈이란 관련된 객체들의 집합이라고 할 수 있습니다.

## 모듈화 패턴

모듈화를 하는데 있어 네이티브에서 제공하는 ES6가 나오기전까지 우리는 모듈패턴을 통해 모듈화를 하였습니다. 이 모듈패턴에서 모듈을 내보내는 코드가 존재합니다.

- cjs
- amd
- umd
- es6

참고) https://babeljs.io/docs/en/babel-preset-env#modules

## commonjs

module.exports을 적용한 예입니다.

```js
function myModule() {
  this.hello = function () {
    return "hello!";
  };

  this.goodbye = function () {
    return "goodbye!";
  };
}

module.exports = myModule;
//또는 module.exports = function(){ ~ }

// 사용은? const myModule = require('myModule')
```

exports를 적용한 예입니다.

```js
var template = { a: "a", b: "b" };
exports.foo = template;
//또는 exports.foo = { a: 'a', b: 'b' }
```

### exports와 module.exports의 차이점

exports객체와 module.exports객체는 동일합니다. exports 가 module.exports객체를 call by reference 방식으로 바라보고 있으며, 최종적으로 리턴값은 module.exports 라는것입니다. exports는 module.exports를 참조하는 변수입니다. Node.js의 모듈 시스템에서 실제로 익스포트 되는 객체는 module.exports이고, exports는 이를 참조하는 변수에 불과합니다.

```js
var module = { exports: {} };
var exports = module.exports;
// your code return module.exports;
```

정리하면 다음과 같습니다.

```js
var template = { a: "a", b: "b" };
// 가능
module.exports.foo = template; //(o)
module.exports = template; //(o)
module.exports = { a: "a", b: "b" }; // (o)
exports.foo = template; //(o)

// 불가능
exports = template; //(x)
exports = { a: "a", b: "b" }; // (x)
```

```js
// 아래 두개는 동일
module.exports.foo = function () {
  console.log("foo");
};
exports.foo = function () {
  console.log("foo");
};
```

## es6

모듈화 및 내보내기입니다.

```js
// lib/counter.js
export let counter = 1;

export function increment() {
  counter++;
}

export function decrement() {
  counter--;
}

export default function(){
  ....
}
```

## 정리

cjs에서 exports는 module.exports를 참조하는 변수입니다.

- module.exports 또는 exports: cjs
- export default: es6

---

해당 내용은 다음 글을 참고 하였습니다.

- https://www.freecodecamp.org/news/javascript-modules-a-beginner-s-guide-783f7d7a5fcc/
- https://dydals5678.tistory.com/97
