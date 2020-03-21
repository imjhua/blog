---
layout: post
title: Shadow dom
categories: WEB
---


쉐도우 돔은 어떻게 HTML과 CSS에 스코프를 줄 수 있습니다. 즉, HTML이나 CSS 모두 페이지에 적용되는 DOM을 분리하고자 할 때 사용합니다. 

## 사용
일반적으로 DOM내 사용하는 CSS는 선언된 위치와 상관없이 모든 DOM 요소에 적용됩니다. 예를 들어 DOM 중간에 선언된 <style>태그 내에 다음과 같은 코드가 있습니다.

```css
div { background: black }
```

이러면 모든 div 태그의 배경색이 검정색(black)이 되어 브라우저를 암흑으로 만들어 버릴 것입니다. 왜 DOM 가운데 선언한 스타일 하나 때문에 모든 DOM이 고통받아야 하는걸까요? 쉐도우 돔을 이용하면 이 문제를 간단히 해결할 수 있습니다. 쉐도우 돔은 `DOM의 특정 영역을 메인 DOM과 분리시켜 캡슐화` 합니다. DOM 요소가 캡슐화되면 쉐도우 돔 내부의 스타일은 그 안에서만 적용됩니다. 아무리 body { ... }으로 넣어도 외부의 body에 적용되지 않습니다. 이렇게 얘기하면 거창해보일지 모르겠지만, 실제 사용법은 매우 간단합니다. 단지 element.attachShadow() API하나만 사용하면 됩니다. 그러면, 완전히 격리된 DOM을 만들어낼 수 있습니다.


### 주요 메소드/프로퍼티
#### attachShadow
Element 에 쉐도우 루트 노드를 붙입니다. attachShadow를 통해 DOM을 추가한 곳에 #shadow-root 영역으로 표시 되어져 있습니다. 이 안에 어떠한 스타일을 추가하더라도 외부에 영향을 주지는 않습니다. mode가 open 인경우 Element.shadowRoot 에서 shadowRoot 객체를 반환, 아니면 null을 반환하여 Element에서 접근할 수 없게 합니다. 

```js
var shadowRootObj = Element.attachShadow([shadowRootInit]);
```
- shadowRootInit: {mode: 'open'} , {mode: 'closed'}

#### getRootNode
루트 노드를 알아옵니다.
```js
var document or shadowRoot = node.getRootNode(options);
```
- options = {composed:false}

options composed는 false가 기본이며, false일 경우 shadowRoot를, true 인 경우 shadowRoot를 넘어선 루트 노드를 가져옵니다. shadowRoot 가 없다면 document 를 반환합니다.


## 문제점
쉐도우 돔은 비교적 최신 스펙이지만 모든 브라우저에 적용되지는 않습니다. 회사에서 진행중인 프로젝트는 IE10이상, 안드로이드 4.4이상 지원하고 있기 때문에, IE 지원을 위한 추가 작업이 필요합니다. 다행히 웹 컴포넌트를 위한 polyfill이 있어 추가해주면 좀 더 많은 브라우저에서 쉐도우 돔을 사용할 수 있습니다.

## 결론
섀도 DOM은 DOM의 구조를 가지고 있으나 외부에는 노출되지 않은 DOM을 말하며 DOM의 구조를 캡슐화할 때 사용합니다. 일반적인 외부의 style은 적용되지 않고 섀도 DOM을 추가하거나 접근하기 위해서는 별도의 방법이 필요합니다. 그리고 위에서 설명한 템플릿 엘리먼트를 이용해 만들어진 데코레이터나 커스텀 엘리먼트는 모두 섀도 DOM으로 만들어집니다. 다만, 데코레이터에서 만들어진 섀도 DOM은 스크립트로 접근하거나 수정할 수 없습니다. 그에 비해 커스텀 엘리먼트로 만들어진 섀도 DOM은 스크립트로 수정할 수 있습니



---

해당 내용은 다음 글을 참고 하였습니다.
- https://skout90.github.io/2017/10/29/Web/%EC%9B%B9%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%99%80%EC%89%90%EB%8F%84%EC%9A%B0%EB%8F%94/