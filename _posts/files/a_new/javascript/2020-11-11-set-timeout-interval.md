---
layout: post
title: setTimeout과 setInterval는 같을 수 있을까?
categories: JavaScript
---

비동기적으로 코드를 실행할 수 있는 여러 WebAPI에는 setTimeout과 setInterval가 있습니다. setTimeout를 반복하면 setinterval과 동일한 효과를 낼 수 있는데요. 반복되는 이 두개의 실행함수 동작이 같을까요?

<hr />

<!-- vscode-markdown-toc -->

- [setTimout & setInterval](#settimout-&-setinterval)
- [setTimout으로 setInterval 구현하기](#settimout으로-setinterval-구현하기)
  - [다른 점](#다른-점)
- [참고](#참고)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='settimout-&-setinterval'></a>setTimout & setInterval

- setTimeout(): 특정 시간이 경과한 뒤에 특정 코드블록을 한번 실행한다.
- setInterval(): 각각의 호출 간에 일정한 시간 간격으로 특정 코드블록을 반복적으로 실행한다.
- (참고) requestAnimationFrame(): setInterval()의 최신 버전; 그 코드가 실행되는 환경에 관계없이 적절한 프레임 속도로 애니메이션을 실행시키면서, 브라우저가 다음 화면을 보여주기 전에 특정 코드블록을 실행한다.

## <a name='settimout으로-setinterval-구현하기'></a>setTimout으로 setInterval 구현하기

setTimeout을 반복하면 setinterval과 같은 효과를 낼 수 있습니다.

```js
// setinterval
function displayTimeByInterval() {
  setInterval(function () {
    let date = new Date();
    let time = date.toLocaleTimeString();
    document.getElementById("demo-interval").textContent = time;
  }, 1000);
}
displayTimeByInterval();

// settimeout
function displayTimeByTimeout() {
  setTimeout(function run() {
    let date = new Date();
    let time = date.toLocaleTimeString();
    document.getElementById("demo-timeout").textContent = time;
    setTimeout(run, 1000);
  }, 100);
}
displayTimeByTimeout();
```

### <a name='다른-점'></a>다른 점

두 방법의 차이는 미묘합니다.

- setTimeout()은 실행과 실행 사이에 동일한 지연을 보장합니다. 콜백으로 실행되는 함수의 완료 후에 지연시간이 동작합니다.
- setInerval()은 실행과 실행 사이에 동일한 지연을 보장하지 않습니다. 콜백으로 실행되는 함수의 시간 후에 반복의 지연시간이 동작합니다.

예를 들면, 콜백으로 실행되는 함수는 40ms이 걸린다면 1000ms의 지연시간을 가지는 각각의 함수는 실제로..

- setTimeout()은 1000ms의 지연시간을 보장한다.
- setInerval()은 1000ms의 시간중 함수가 40ms이 걸렸기 때문에 다음 실행까지 60ms의 지연시간에 대한 간격을 가진다.

따라서, 코드가 지정한 시간 간격보다 실행 시간이 오래 걸리면 순환 setTimeout()을 사용하는 것이 좋습니다. 이렇게하면 코드 실행 시간에 관계없이 실행 간격이 일정하게 유지되어 오류가 발생하지 않습니다.

## <a name='참고'></a>참고

비동기로 동작하는 setTimeout과 setInerval은 백그라운드 탭에서도 계속 작동하며 해당 브라우저 창이 최소화 된 경우에도 계속 작동합니다. 결과적으로 브라우저는 보이지 않는 애니메이션을 계속 실행하여 불필요한 CPU 사용량과 배터리 수명 낭비를 초래합니다. 이를 보완하기 위해 requestAnimationFrame를 사용할 수 있습니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://dev.opera.com/articles/better-performance-with-requestanimationframe/
- https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals
