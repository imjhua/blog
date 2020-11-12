---
layout: post
title: Tasks, microtasks, queues and schedules
categories: JavaScript
---

JavaScript에는 이벤트 루프에 기반을 둔 동시성 모델이 있습니다. 호출스택에 처리시간이 오래걸리는 함수가 있을 경우, 브라우저가 아무일도 하지 못하는 대기상태를 막기위해 엔진이 아닌 자바스크립트 엔진을 구동하는 환경, 브라우저(또는 node.js)가 제공하는 기능입니다.

## 싱글스레드 기반 자바스크립트

자바스크립트는 기본적으로 싱글 쓰레드 기반 언어입니다. 싱글 쓰레드란? 호출 스택이 하나이기 때문에 한 번에 한 작업만 처리할 수 있습니다.

## 이벤트 루프기반의 동시성

자바스크립트는 코드 실행, 이벤트 수집과 처리, 큐에 놓인 하위 작업들을 담당하는 이벤트 루프에 기반한 동시성(concurrency) 모델을 가지고 있습니다.

- Stack: 함수 호출은 프레임들의 스택을 형성합니다.
- Heap: 객체들은 힙 안에 할당됩니다. 힙은 구조화되지 않은 넓은 메모리 영역입니다.
- Queue: JavaScript 런타임은 처리 할 작업을 큐에서 넣어두고, 이벤트 루프 중 가장 오래된 메시지부터 처리합니다.

이벤트 루프는 큐의 대기열을 바라보며 현재 실행중인 태스크가 있는지, 없는지를 반복해서 확인합니다. 한 이벤트 루프는 실행 순서를 보장하는 여러개의 task 를 가지고 있지만 각 이벤트 루프의 실행단계에서 어떤 task 를 실행시킬지는 브라우저가 선택합니다.

참고) 콜스택은 JavaScript 엔진에는 코드가 실행될 때 그 위치를 나타내는 커서(cursor) 역할을 한다.

### Run-to-completion 방식

이벤트 루프에 의해서 각 메시지는 다른 메시지가 처리되기 전에 완전히 처리됩니다. 이를 Run-to-completion 방식이라고 합니다. 하나의 메시지 처리(Queue)가 시작되면 이 메시지의 처리가 끝날 때까지는 다른 어떤 작업도 중간에 끼어들지 못합니다. 어떤 메시지가 완료되기까지 지나치게 오래 걸리는 경우에는 웹 어플리케이션은 클릭이나 스크롤과 같은 사용자 인터랙션을 처리할 수 없게 됩니다.

### microQueue & macroQueue & animationFrames

런타임은 처리 형태에 따라 작업을 각각의 큐에 넣어 둡니다.

#### macroQueue

setTimeout과 같은 javascript가 실행되는 런타임 환경에 존재하는 별도의 비동기 API들의 콜백이 저장됩니다.

#### microQueue

macroQueue보다 우선순위가 더 높습니다. 현재 실행되고 있는 script 바로 다음에 발생해야하는 작업으로 예약됩니다. observer callback이나 promise callback 등이 있습니다.

promise의 경우 callback 을 처리하기 위해 microtask 의 대기열에 들어갑니다. 이눈 promise 가 처리 여부와 상관없이 그 callbak 이 비동기로 실행됨을 보장할 수 있습니다. 즉, 처리된 promise 에 대해서 then(resolve, reject)이 호출되면 그 즉시 microtask 가 대기열에 들어갑니다.

#### animationFrames

rAF(requestAnimationFrame)으로 요청된 작업은 animationFrames에 추가됩니다. rAF API도 setTimeout 과 마찬가지로 callback으로 넘겨지는 function을 비동기 task로 분류하여 처리합니다. 다만 rAF 은 macro queue가 아니라 animation frame에서 처리됩니다. 또한 setTimeout 두번째 parameter로 전달되는 delay 값이 브라우저 렌더링에 최적화되어 있다는 차이가 있습니다.

참고) 브라우저는 60fps(초당 60회)로 화면을 렌더링합니다. 이 렌더링에 최적화하기 위해 rAF 이라는 API를 사용할 수 있습니다.

## 코드

```js
console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

Promise.resolve()
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });

console.log("script end");

// 실행순서는 다음과 같습니다.
// script start
// script end
// promise1
// promise2
// setTimeout
```

- promise의 콜백은 microQueue에 저장되며 이는 macroQueue보다 우선순위가 높습니다.
- setTimeout은 setTimeout에 대한 특정 시간 제한을 지정 했더라도 대기중인 메시지의 모든 코드가 완료 될 때까지 대기해야합니다.
- 순서는? callStack -> micro (모두 처리) -> macro (이벤트 루프에 의해)

#### 그외 개별 런타임에서의 처리

웹워커 또는 크로스 오리진 iframe은 자신의 스택, 힙, 메시지 큐를 가지고 있습니다. 두 별개의 런타임들은 postMessage method를 통해서만 서로 통신할 수 있습니다. 이 메서드는 다른 런타임이 message 이벤트 핸들러를 등록하고 있다면 해당 런타임의 큐에 메시지를 추가합니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop
- https://blueshw.github.io/2018/01/28/tasks-microtasks-queues-and-schedules/
- https://engineering.linecorp.com/ko/blog/dont-block-the-event-loop/
- https://jbee.io/web/optimize-scroll-event/
