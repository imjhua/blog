---
layout: post
title: Shadow DOM
categories: Web
---

HTML 문서의 모든 요소와 스타일로 이루어진 DOM은 하나의 큰 글로벌 범위 내에 있습니다. 페이지의 요소가 문서 내에 깊이 중첩되어 있거나 어디에 배치되어있는지 상관없이 document.querySelector() 메서드를 사용하여 접근이 가능합니다. Shadow DOM을 사용하면 HTML이나 CSS 페이지에 적용되는 DOM을 분리할 수 있습니다.

## Shadow DOM

브라우저에서 제공하는 <video> 요소의 재생 버튼, 타임라인은 어떻게 생성되는 걸까요? 이런 요소들을 Shadow DOM이라고 할 수 있습니다. 즉, DOM트리에서 완전히 분리된 고유의 요소와 스타일을 가진 DOM 트리(Shadow DOM은 DOM 내의 DOM처럼 보여지기도 함)입니다. Shadow DOM은 웹 작성자가 사용하도록 최근에야 지정되었지만, 지금까지는 사용자 에이전트에서 폼 요소와 같이 복잡한 구성요소를 만들고 스타일을 입히기 위해 수년 동안 사용되어 왔습니다.

### 필요성

웹 컴포넌트의 중요한 측면은 캡슐화입니다. 마크업 구조, 스타일 그리고 동작을 페이지 내의 다른 코드와
분리하고 숨긴채로 유지하여 서로 충돌하지 않으며, 코드가 좋고 깨끗하게 되도록 하는 중요한 측면입니다.
Shadow DOM API 는 이러한 캡슐화의 핵심이며, 숨겨지고 분리된 DOM 을 엘리먼트에 달 수 있는
방법입니다.

참고) DOM(Document Object Model)은 HTML 문서의 구조화된 표현입니다. 이것은 브라우저가 페이지에 무엇을 렌더링 할지 결정하기 위해, 혹은 자바스크립트 프로그램이 페이지의 콘텐츠 및 구조, 스타일을 수정하기 위해 사용됩니다.

## Show Shadow DOM 확인 (#shadow-root)

shadow-root 영역을 확인 하기 위해 다음과 같은 range타입의 input을 만들어 봅니다.

```html
<input type="range" id="vol" name="vol" min="0" max="50" />
```

해당 타입은 트랙과 슬라이더를 자체적으로 제어하는 Shadow DOM 인터페이스를 만들어 냅니다. 이 DShadow DOM을 살펴보면 다음과 같이 여러 작은 <div> 요소로 구성되어 있는 것을 볼 수 있습니다.

```html
<input type="range" id="vol" name="vol" min="0" max="50" />
#shadow-root (user-agent)
<div>
  <div pseudo="-webkit-slider-runnable-track" id="track">
    <div id="thumb"></div>
  </div>
</div>
```

이처럼 Shadow DOM을 사용하여 위와 같은 결과를 얻을 수 있습니다. 호스트 HTML 문서에는 단순한 <input> 요소가 노출되지만, 그 내부에는 DOM의 글로벌 범위에 포함되지 않는! HTML 요소와 스타일 구성 요소들이 있습니다.

참고) "Show Shadow DOM"은 개발자도구 > Settings > General > Element 밑에서 찾을 수 있습니다.

### Show Shadow DOM 추가하기 (#shadow-root생성)

#### createShadowRoot

createShadowRoot를 통해 쉐도우 루트를 생서하여 추가 할 수 있습니다.

```js
<div id="example1">Light DOM</div>
<script>
var container = document.querySelector('#example1');
var root1 = container.createShadowRoot();
var root2 = container.createShadowRoot();
root1.innerHTML = '<div>Root 1 FTW</div>';
root2.innerHTML = '<div>Root 2 FTW</div>';
</script>
```

### attachShadow

attachShadow를 통해 모드를 설정(open)하여 적용 할 수도 있습니다.

```js
document.body.appendChild(document.createElement("div")).innerHTML =
  '<style>p { background-color: #82b74b; }</style><p id="non-shadow">Yey!</p>';
document.body
  .appendChild(document.createElement("div"))
  .attachShadow({ mode: "open" }).innerHTML = '<p id="shadow">Yey!</p>';
```

## 사용 예

일반적으로 DOM내 사용하는 CSS는 선언된 위치와 상관없이 모든 DOM 요소에 적용됩니다. 예를 들어 DOM 중간에 선언된 <style>태그 내에 다음과 같은 코드가 있습니다.

```css
div {
  background: black;
}
```

이러면 모든 div 태그의 배경색이 검정색(black)이 되어 브라우저를 암흑으로 만들어 버릴 것입니다. 왜 DOM 가운데 선언한 스타일 하나 때문에 모든 DOM이 고통받아야 하는걸까요? Shadow DOM을 이용하면 이 문제를 간단히 해결할 수 있습니다. Shadow DOM은 `DOM의 특정 영역을 메인 DOM과 분리시켜 캡슐화` 합니다. DOM 요소가 캡슐화되면 Shadow DOM 내부의 스타일은 그 안에서만 적용됩니다. 아무리 body { ... }으로 넣어도 외부의 body에 적용되지 않습니다. 이렇게 얘기하면 거창해보일지 모르겠지만, 실제 사용법은 매우 간단합니다. 단지 element.attachShadow() API하나만 사용하면 됩니다. 그러면, 완전히 격리된 DOM을 만들어낼 수 있습니다.

## 문제점

Shadow DOM은 비교적 최신 스펙이지만 모든 브라우저에 적용되지는 않습니다. 회사에서 진행중인 프로젝트는 IE10이상, 안드로이드 4.4이상 지원하고 있기 때문에, IE 지원을 위한 추가 작업이 필요합니다. 다행히 웹 컴포넌트를 위한 polyfill이 있어 추가해주면 좀 더 많은 브라우저에서 Shadow DOM을 사용할 수 있습니다.

## 결론

Shadow tree는 DOM tree와 비슷하지만 일반 DOM 대신 Shadow DOM을 사용합니다. Shadow DOM을 이용하면 HTML과 CSS에 스코프를 줄 수 있습니다. Shadow DOM은 DOM의 구조를 가지고 있으나 외부에는 노출되지 않은 DOM을 말하며 DOM의 구조를 캡슐화할 때 사용합니다. 일반적인 외부의 style은 적용되지 않고 Shadow DOM을 추가하거나 접근하기 위해서는 별도의 방법이 필요합니다. 그리고 위에서 설명한 템플릿 엘리먼트를 이용해 만들어진 데코레이터나 커스텀 엘리먼트는 모두 Shadow DOM으로 만들어집니다. 다만, 데코레이터에서 만들어진 Shadow DOM은 스크립트로 접근하거나 수정할 수 없습니다. 그에 비해 커스텀 엘리먼트로 만들어진 Shadow DOM은 스크립트로 수정할 수 있습니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://wit.nts-corp.com/2019/03/27/5552
- https://skout90.github.io/2017/10/29/Web/%EC%9B%B9%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%99%80%EC%89%90%EB%8F%84%EC%9A%B0%EB%8F%94/
- https://kyu.io/%EC%9B%B9-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B83%E2%80%8A-%E2%80%8A%EC%89%90%EB%8F%84%EC%9A%B0-%EB%8F%94shadow-dom/
- https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_shadow_DOM
