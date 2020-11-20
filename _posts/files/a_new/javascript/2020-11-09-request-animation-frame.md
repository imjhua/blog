---
layout: post
title: 부드러운 애니메이션 적용하기 (requestAnimationFrame)
categories: JavaScript
---

좋은 성능이란 궁극적 인 목표 인 초당 60 프레임 (FPS)에 도달하는 것을 의미합니다. 사람의 눈은 1초당 60개 이상의 프레임(60 fps, 프레임당 16.7ms)으로 이뤄진 애니메이션을 볼 때 움직임이 자연스럽다고 느끼기 때문입니다. 반대로 60 fps를 초과할수록 움직임이 버벅인다는걸 느끼게 됩니다. 브라우저의 애니메이션을 더 나은 성능으로 보여주기 위한 방법으로 requestAnimationFrame를 사용해볼 수 있습니다.

<hr />

<!-- vscode-markdown-toc -->

- [requestAnimationFrame(rAF)](<#requestanimationframe(raf)>)
  - [장점](#장점)
  - [동작](#동작)
  - [적용](#적용)
- [참고](#참고)
  - [화면에 프레임을 추가하는 순서](#화면에-프레임을-추가하는-순서)
- [정리](#정리)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='requestanimationframe(raf)'></a>requestAnimationFrame(rAF)

브라우저에게 수행하기를 원하는 애니메이션을 알리기 위해 호출합니다. window.requestAnimationFrame()은 DOM의 위치와 길이, 크기등이 다시 계산되는 리플로우 과정을 거친 후에야 가시성에 영향을 주는 DOM의 수정이 있을때 발생하는 리페인트가 진행되기 전에 호출합니다. 화면에 새로운 애니메이션을 업데이트할 준비가 될때마다 실제 프레임에 대한 업데이트가 이루어집니다. 매번 브라우저성능보다 많은 처리를 하는 문제를 해결해 볼 수 있습니다.

### <a name='장점'></a>장점

사용자에게 표시 될 애니메이션만 그립니다. 백그라운드 탭, 최소화 된 창 또는 페이지의 숨겨진 부분에서 실행되는 애니메이션을 그리기 때문에 애니메이션이 더 부드러워 집니다. 데 CPU 전원이나 배터리 수명이 낭비되지 않습니다.

### <a name='동작'></a>동작

requestAnimationFrame스크립트는 macro, micro 와는 또다른 animation frame전용 큐에서 스케줄링 되며 브라우저에서 신호를 받아 처리됩니다. 실행 대기중인 콜백 함수의 ID 목록을 보유하며 cancelAnimationFrame을 통해 요청을 취소 할 수 있습니다.

### <a name='적용'></a>적용

- 특정 조건에 맞는 경우 실행 후 clear
- 반복적으로 호출하다가 특정 조건에 맞는 경우 실행(재귀). 반복적으로 호출하고 clear

```js
// 반복적으로 호출
let rAF = 0;
function draw() {
  if (rAF) {
    cancelAnimationFrame(rAF);
  }
  // Drawing code goes here
  rAF = requestAnimationFrame(draw);
}

draw();
```

## <a name='참고'></a>참고

### <a name='화면에-프레임을-추가하는-순서'></a>화면에 프레임을 추가하는 순서

자바스크립트로 스타일을 변경하는 구문이 있는지 확인한 뒤 해당되는 DOM 요소에 CSS class 또는 inline 스타일로 반영합니다.

- Style: 현재 버전의 CSS를 어떤 DOM 요소에 적용해야 할지 계산합니다.
- Layout: 각 요소의 너비나 위치를 갱신에 화면 상에 배치합니다.
- Paint: 각 요소에 배경색, 글자 색과 같이 픽셀을 채우는 과정입니다.
- Composite: 이전 과정에서 생성된 레이어를 병합합니다.
  위 과정의 처리 시간이 16.7ms 을 초과하는 횟수가 늘어날수록 전체 렌더링 시간이 지연됩니다. 결국 앞서 나온 애니메이션 예제와 같이 여행자가 인지할만큼 반응이 느려지는 결과를 가져옵니다.

애플리케이션에 많은 부담을 주는 경우 레이아웃 트리거를 완전히 피하려고 노력해야 합니다! 합성은 피할 수 없는 단계이므로..

참고) 마지막 단게인 Composite Layers(합성) 생성은 CPU가 애니메이션을 처리하기 위해 GPU와 통신하는 단계입니다. transform, opacity와 같은 속성을 사용하면, CPU 대신 GPU를 사용해 웹 브라우저가 애니메이션을 수행할 수 있도록 할 수 있습니다.

## <a name='정리'></a>정리

requestAnimationFrame은 브라우저 내부에서 무슨 일이 일어나고 있는지 알고 있기 때문에 브라우저가 렌더링할 수 있는 능력을 벗어나는 횟수만큼 실행되는 것을 방지할 수 있습니다. 따라서 애니메이션 스케줄링을 최적화 할 수 있습니다.

다음과 같은 특징이 있습니다.

- 브라우저가 레이아웃을 계산하는 것보다 더 자주 또는 덜 자주 호출되지 않는다.(정확한 주기로 호출)
- 브라우저가 레이아웃을 계산하기 바로 전에 호출된다.(정확한 타이밍에 호출).
- 레이아웃 변경 (DOM 또는 CSSOM 변경)에 rAF를 사용하는것이 적절하다.
- rAF는 브라우저에서 관련 레이아웃을 렌더링하는 다른 것들과 마찬가지로 수직동기화(V-SYNC)된다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://dev.opera.com/articles/better-performance-with-requestanimationframe/
- https://medium.com/myrealtrip-product/fe-website-perf-part2-e0c7462ef822
- https://www.viget.com/articles/animation-performance-101-browser-under-the-hood/