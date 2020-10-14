---
layout: post
title: 햇갈리는 module.exports module export default 차이
categories: JavaScript
---

모듈을 내보내기 할때 상요하는 패턴이 햇갈릴때가 있습니다. module.exports 와 export default 차이를 정리합니다.

## 모듈화 패턴

모듈화를 하는데 있어 네이티브에서 제공하는 ES6가 나오기전까지 우리는 모듈패턴을 통해 모듈화를 하였습니다. 이 모듈패턴에서 모듈을 내보내는 코드가 존재합니다.

- cjs
- amd
- umd
- es6

참고) https://babeljs.io/docs/en/babel-preset-env#modules

## commonjs

모듈화 및 내보내기입니다.

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

- module.exports: cjs
- export default: est

---

해당 내용은 다음 글을 참고 하였습니다.
- https://www.freecodecamp.org/news/javascript-modules-a-beginner-s-guide-783f7d7a5fcc/

-
