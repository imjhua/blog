---
layout: post
title: 자바스크립트의 비동기 처리
categories: JavaScript
---

자바스크립트 언어는 단일 스레드 언어(위에서 아래로 단방향으로 함수가 해석 되며 실행)이기 때문에, 행여 필요한 데이터가 클라이언트 쪽으로 전달되지 않은 채로 사용자에게 보여진다면 서비스상 큰 오류가 생길 수 있습니다. 그렇기 때문에 이러한 문제점을 해결하기 위해 비동기 프로그래밍이 도입되었습니다.

따라서, 자바스크립트의 비동기 처리란 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성으로 인한 문제를 해결하기 위한 처리로 특정 로직의 실행이 끝날 때까지 기다려주지 않고 나머지 코드를 먼저 실행하는 비동기 처리가 등장하게 되었습니다. 먼저 동기식 처리와 비동기식 처리 모델에 대해 간단히 살펴 봅시다.

## 동기식 처리 모델(Synchronous processing model)

동기식 처리 모델은 직렬적으로 태스크(task)를 수행합니다. 즉, 태스크는 순차적으로 실행되며 어떤 작업이 수행 중이면 다음 태스크는 대기하게 됩니다. 예를 들어 서버에서 데이터를 가져와서 화면에 표시하는 태스크를 수행할 때, 서버에 데이터를 요청하고 데이터가 응답될 때까지 이후의 태스크들은 `블로킹`됩니다.

## 비동기식 처리 모델(Asynchronous processing model 또는 Non-Blocking processing model)

비동기식 처리 모델은 병렬적으로 태스크를 수행합니다. 즉, 태스크가 종료되지 않은 상태라 하더라도 대기하지 않고 즉시 다음 태스크를 실행합니다. 예를 들어 서버에서 데이터를 가져와서 화면에 표시하는 태스크를 수행할 때, 서버에 데이터를 요청한 이후 서버로부터 데이터가 응답될 때까지 대기하지 않고(Non-Blocking) 즉시 다음 태스크를 수행합니다. 이후 서버로부터 데이터가 응답되면 이벤트가 발생하고 이벤트 핸들러가 데이터를 가지고 수행할 태스크를 계속해 수행합니다. 자바스크립트의 대부분의 DOM 이벤트와 Timer 함수(setTimeout, setInterval), Ajax 요청은 비동기식 처리 모델로 동작합니다.

### 비동기 처리

비동기 처리란 자바스크립트의 비동기 처리란 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성을 말합니다. 즉, 특정 로직의 실행이 끝날 때까지 기다려주지 않고 나머지 코드를 먼저 실행하는 것이 비동기 처리입니다.

#### setTimeout

setTimeout()은 Web API의 한 종류입니다. 코드를 바로 실행하지 않고 지정한 시간만큼 기다렸다가 로직을 실행합니다.

```js
// #1
console.log("Hello");
// #2
setTimeout(function () {
  console.log("Bye");
}, 3000);
// #3
console.log("Hello Again");
```

마찬가지로 setTimeout() 역시 비동기 방식으로 실행되기 때문에 3초를 기다렸다가 다음 코드를 수행하는 것이 아니라 일단 setTimeout()을 실행하고 나서 바로 다음 코드인 console.log('Hello Again');으로 넘어갔습니다. 따라서, 'Hello', 'Hello Again'를 먼저 출력하고 3초가 지나면 'Bye'가 출력됩니다.

#### ajax방식

비동기 처리의 가장 흔한 사례는 jQuery의 ajax입니다. 작동 방식은 다음과 같습니다. 보통 화면에 표시할 이미지나 데이터를 서버에서 불러와 표시해야 하는데 이때 ajax 통신으로 해당 데이터를 서버로부터 가져올 수 있기 때문입니다.

```js
function getData() {
  var tableData;
  $.get("https://domain.com/products/1", function (response) {
    tableData = response;
  });
  return tableData;
}

console.log(getData()); // undefined
```

undefined으로 출력되는 문제가 바로 비동기 처리로 인하여 호출이 끝날때까지 기다리지 않고 다음 코드를 먼저 실행해 버리기 때문입니다. 이 문제를 콜백함수를 파라미터로 넘겨 다음과 같이 해결합니다.

```js
function getData(callbackFunc) {
  $.get("https://domain.com/products/1", function (response) {
    callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
  });
}

//getData 호출시 callbackFn을 파라미터로 넘겨준다.
getData(function (tableData) {
  console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});
```

이렇게 콜백 함수를 사용하면 특정 로직이 끝났을 때 원하는 동작을 실행시킬 수 있습니다.

### 문제점

자바스크립트에서 빈번하게 사용되는 비동기식 처리 모델은 실행 완료를 기다리지 않고 즉시 다음 태스크를 실행합니다. 요청을 병렬로 처리하여 다른 요청이 블로킹(blocking, 작업 중단)되지 않는 장점이 있습니다. 하지만 비동기 처리를 위해 콜백 패턴을 사용하면 처리 순서를 보장하기 위해 여러 개의 콜백 함수가 네스팅(nesting, 중첩)되어 복잡도가 높아지는 콜백 헬(Callback Hell)이 발생하는 단점이 있습니다. 콜백 헬은 가독성을 나쁘게 하며 실수를 유발하는 원인이 됩니다.

따라서 비동기 함수(비동기를 처리하는 함수) 내에서 처리 결과를 반환(또는 전역변수에의 할당)하면 기대한 대로 동작하지 않습니다. 이것이 바로 콜백함수의 헬을 만들게 됩니다. 여기서 콜백헬의 문제점은 사실 단순히 들여쓰기와 가독성의 문제만은 아닙니다. 더 중요한 문제점은 콜백함수를 다른 함수로 전달하는 순간 그 콜백함수에 대한 제어권을 잃는 점입니다. 즉, 내가 제공한 콜백이 언제 실행되는지, 몇 번 실행되는지 등에 대해 신뢰할 수가 없게 되어 버립니다. 그리고 위의 코드에서 보다시피 내가 처음에 제공한 콜백 함수는 한없이 위임되어 저 끝에 파묻혀 있게 되버립니다. 이로 인해 프로그램이 더 예측하기 어렵게 되고 에러가 발생하기 쉽게 되며, 디버깅 또한 만만치 않게 됩니다.

#### 콜백 지옥

비동기 호출의 경우(ajax, setTimeout등)비동기 처리 방식에 의해 야기될 수 있는 문제들은 콜백(callback) 함수를 이용하여 처리 할 수 있습니다.그러나 비동기 처리 로직을 위해 콜백 함수를 연속해서 사용할 때 발생하는 콜백지옥에 빠져 버리는 문제가 발생합니다.

다음은 콜백 지옥예 입니다.

```js
step1(function (value1) {
  step2(value1, function (value2) {
    step3(value2, function (value3) {
      step4(value3, function (value4) {
        step5(value4, function (value5) {
          // value5를 사용하는 처리
        });
      });
    });
  });
});
```

#### 곤란한 에러처리

콜백헬은 코드의 가독성을 나쁘게 하고 복잡도를 증가시켜 실수를 유발하는 원인이 되며 에러 처리가 곤란합니다.

try 블록 내에서 setTimeout 함수가 실행되면 1초 후에 콜백 함수가 실행되고 이 콜백 함수는 예외를 발생시킵니다. 하지만 이 예외는 catch 블록에서 잡히지 않습니다.

```js
try {
  setTimeout(() => {
    throw "Error!";
  }, 1000);
} catch (e) {
  console.log("에러를 캐치하지 못한다..");
  console.log(e);
}
```

자바스크립트의 작동 원리에 따라 비동기 처리 함수의 콜백 함수는 해당 이벤트(DOM 이벤트, timer 함수의 tick 이벤트, Ajax의 onreadystatechange 이벤트)가 발생하면 이벤트 큐(Event queue)로 이동한 후 호출 스택이 비어졌을 때, 호출 스택으로 이동되어 실행됩니다. setTimeout 함수는 비동기 함수이므로 콜백 함수의 실행 완료를 기다리지 않고 즉시 종료되어 호출 스택에서 제거됩다. 이후 tick 이벤트가 발생하면 setTimeout 함수의 콜백 함수는 이벤트 큐로 이동한 후 호출 스택이 비어졌을 때 호출 스택으로 이동되어 실행됩니다. 이때 setTimeout 함수는 이미 호출 스택에서 제거된 상태입니다. 이것은 `setTimeout 함수의 콜백 함수를 호출한 것은 setTimeout 함수가 아니다라는 것을 의미`합니다. setTimeout 함수의 콜백 함수의 호출자(caller)가 setTimeout 함수라면 호출 스택에 setTimeout 함수가 존재해야 하기 때문입니다.

예외(exception)는 호출자(caller) 방향으로 전파됩니다. 하지만 위에서 살펴본 바와 같이 setTimeout 함수의 콜백 함수를 호출한 것은 setTimeout 함수가 아닙니다. 따라서 setTimeout 함수의 콜백 함수 내에서 발생시킨 에러는 catch 블록에서 캐치되지 않아 프로세스는 종료되어 버립니다. 이러한 문제를 극복하기 위해 Promise가 제안되었습니다. Promise는 ES6에 정식 채택되어 IE를 제외한 대부분의 브라우저가 지원하고 있습니다.

### 다양한 비동기 처리 방법들

#### promise

```js
// Promise 객체를 반환하는 함수
// const delay = ms => new Promise(resolve => { setTimeout(() => resolve(ms), ms) });
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${ms} 밀리초가 지났습니다.`);
      resolve();
    }, ms);
  });
}

delay(1000)
  .then(() => delay(2000))
  .then(() => Promise.resolve('끝'))
  .then(console.log);

console.log('시작');

```

#### async & await

```js
// Promise 객체를 반환하는 함수.
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${ms} 밀리초가 지났습니다.`);
      resolve();
    }, ms);
  });
}

async function main() {
  await delay(1000);
  await delay(2000);
  const result = await Promise.resolve("끝");
  console.log(result);
}

main();
```

#### generator

Generator
Iterable 챕터에 다뤘던 generator 함수는 '함수를 잠시 멈춰둘 수 있다'는 특징을 갖고 있습니다. 이 특징으로 인해 generator가 비동기 프로그래밍을 위해 사용되기도 합니다. 실제로, ES2017에서 비동기 함수가 도입되기 전에는 generator가 비동기 프로그래밍을 위해 널리 사용되었습니다. 최근에는 언어에 내장되어 있고 더 쉬운 비동기 함수를 많이 사용하는 편입니다.

다만 generator는 함수의 재개를 프로그래머가 직접 제어할 수 있다는 장점을 갖고 있기 때문에, 일부러 비동기 함수 대신 generator를 사용하는 경우도 있습니다. React에서 비동기 프로그래밍을 하기 위해 널리 사용되는 라이브러리인 redux-saga 역시 generator를 활용하고 있습니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://poiemaweb.com/es6-promise
- https://meetup.toast.com/posts/73
