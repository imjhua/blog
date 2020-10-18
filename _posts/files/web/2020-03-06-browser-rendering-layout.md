---
layout: post
title: 브라우저 렌더링시의 Layout
categories: Web
---

렌더링 과정에서 레이아웃을 정리해 봅니다.

## 브라우저 렌더링 과정

브라우저 렌더링은 다음 단계를 가집니다.

1. 파싱: DOM 트리를 만드는 과정. HTML문서를 해석한다. HTML문서를 가공하여 쉽게 접근 가능하도록 한다.
2. 자바스크립트 엔진: HTML parsing, UserInput, rAF 등으로 실행된다.
3. Recalculate Style: 파싱된 css 결과인 CSSOM을 렌더트리에 적용하는 과정이다. HTML은 단순 문서이고 각 엘리먼트들의 렌더링에 관한 모든 정보는 CSS가 가지고 있다.
4. 렌더트리: Recalculate Style의 결과이다. DOMTree + CSSOMTree. 화면에 보이는 요소들을 중심으로 구성한다.
5. 레이아웃: 노드 박스들의 좌표를 계산한다. (크기, 위치)

- 각 박스의 넓이는 viewport(ICB)기준
- 각 박스의 높이는 contents(fonts)기준
- 윈도우 사이즈를 변경하거나 폰트 변경시 글로벌 레이아웃 발생
- Dirty bit system은 인크리멘탈 레이아웃이다.

6. 페인팅: 렌더링 트리를 탐색하면서 특정 메모리 공간에 RGB 값을 채우는 과정 ??

### 레이아웃

렌더러가 생성되고 트리에 추가될 때, 이 렌더러는 위치와 크기를 가지지 않습니다. 이러한 값들을 계산하는 것을 레이아웃이라고 부릅니다. 렌더트리는 HTML은 흐름-기반(flow-based) 레이아웃 모델로 이것은 대부분 단일 방향에서 기하학적 값들을 계산할 수 있음을 의미합니다. 좌표계는 루트 렌더러를 기준으로 합니다. top, left 좌표가 사용됩니다. 레이아웃은 재귀적인 과정입니다. 이것은 루트 렌더러(HTML 도큐먼트 엘리먼트에서 <html>에 해당)에서 시작됩니다. 레이아웃은 부분 또는 전체 렌더러의 계층을 통과하면서 재귀적으로 반복되고, 이를 필요로 하는 렌더러의 기하학적 정보를 계산합니다.

- 루트 렌더러의 위치는 0,0이고 치수는 브라우저 윈도우에서 보이는 부분의 크기(뷰포트)이다.
- 레이아웃 시작은 각 노드에 화면에 표시되어야 하는 정확한 좌표를 전달하는 것을 의미한다.

#### 강제 동기식 레이아웃

언제든 DOM을 수정되면, 직전 레이아웃은 효력이 없어지며(invalidated) reflow가 일어납니다. 브라우저는 일반적으로 현재작업이나 프래임이 끝날때까지 기다리지만, 현재 작업이나 프래임이 완료되기 전에 javscript를 통해 기하학적인 값(geometric value)을 묻는다면, 브라우저는 즉시 레이아웃을 reflow해야 한다. 이것을 강제 동기식 레이아웃 이라 하며, 이것이 반복됨(레이아웃 스레싱)으로서 성능 저하가 유발된다.

높이를 요청하기 전에 상자의 스타일을 변경한 경우 문제가 발생할 수 있습니다.

- DOM을 수정하게 되면, 직전 레이아웃은 효력이 없어지며 reflow가 일어난다.
- reflow(리플로우)는 레아이웃을 다시 그리는 것이고 repaint(리패인트)는 렌더트리를 다시 그리는 것이다.
- 상자의 스타일은 변경하면 증분 레이아웃이 발생한다.
- 참고로 글꼴 크기 변경과 같은 모든 렌더러에 영향을주는 전역 스타일 변경하거나 화면 크기가 조정하는 경우 글로벌 레이아웃이 발생한다.
- 증분 레이아웃은 비동기식으로 트리거 된다.
- 브라우저는 일반적으로 현재작업이나 프래임이 끝날때까지 기다리지만,
- 현재 작업이나 프래임이 완료되기 전에 javscript를 통해 기하학적인 값(geometric value)을 묻는다면 (높이를 바로 요청)
- 브라우저는 즉시 레이아웃을 reflow해야 한다.
- 브라우저가 레이아웃을 더 일찍 수행하게 된다.
- 이것이 강제 동기식 레아이웃이다.
- 즉, 증분레이아웃이 발생하는 경우 이는 기본적으로 비동기시으로 트리거되는데, 자바스크립트를 사용하여 동기식 레이아웃이 발생할 수 있다.
- 브라우저가 열심히 스타일을 계산해 위치를 정하고 있는데 스타일 정보를 조회하거나 변경하는 경우를 강제 동기식 레이아웃이라고 한다. (Forced Synchronous Layout)
- 이것이 반복됨(레이아웃 스레싱)으로서 성능 저하가 유발된다.
- 데스크탑 브라우저에서 레이아웃 스레싱의 부작용은 심하지 않지만,
- 모바일에서는 심각한 성능 저하가 있다.
- 강제 동기식 레아이웃은 불필요하고 잠재적으로 비용이 많이 드는 작업이다.
- 이 때문에 항상 스타일 읽기를 일괄 처리하고 먼저 수행한 다음(이때 브라우저가 이전 프레임의 레이아웃 값을 사용할 수 있음) 쓰기를 수행해야 한다.

#### Bad

```js
function logBoxHeight() {
  box.classList.add("super-big");

  // Gets the height of the box in pixels
  // and logs it out.
  console.log(box.offsetHeight); //
}
```

#### Good

```js
function logBoxHeight() {
  // Gets the height of the box in pixels
  // and logs it out.
  console.log(box.offsetHeight);

  box.classList.add("super-big");
}
```

#### 레이아웃 스래싱

많은 레이아웃을 연속적으로 빠르게 실행 하면 강제 동기식 레이아웃이 더 악화됩니다. 다음 코드를 살펴봅시다. 반복문과 같이 빠른 주기로 실행되는 코드에 픽셀 파이프라인을 유발하는 부분이 있는 경우 (레이아웃 스래싱, Layout Thrashing) 이 코드는 단락 그룹을 반복 실행하고 각 단락의 너비를 “box” 요소의 너비와 일치하도록 설정합니다.

```js
function resizeAllParagraphsToMatchBlockWidth() {
  // Puts the browser into a read-write-read-write cycle.
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = box.offsetWidth + "px";
  }
}
```

레이아웃 스레싱을 피하기 위해서 다음으로 개선할 수 있습니다. 샘플을 수정하려면 값을 다시 읽은 다음 써야 합니다.

```js
// Read.
var width = box.offsetWidth;

function resizeAllParagraphsToMatchBlockWidth() {
  for (var i = 0; i < paragraphs.length; i++) {
    // Now write.
    paragraphs[i].style.width = width + "px";
  }
}
```

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing?hl=ko
