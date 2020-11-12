---
layout: post
title: Shadow DOM
categories: HTML
---

HTML 문서의 모든 요소와 스타일로 이루어진 DOM은 하나의 큰 글로벌 범위 내에 있습니다. Shadow Dom 은 말 그대로 숨겨진 DOM 입니다. 원래의 DOM 트리에서 완전히 분리된 고유의 요소와 스타일을 가진 DOM 트리가 됩니다. 이는 한 페이지내의 마크업과 스타일에 대한 동작을 분리하는 방법일 수 있습니다.

## shadow dom

우리는 페이지 내에서 요소를 찾을때 중첩과 상관없이 document.querySelector() 메서드를 사용합니다. CSS 스타일 또한 글로벌 범위 내의 어떤 요소든 선택이 가능합니다. 모두 글로벌하게 동작하기 때문입니다. 문서 전체에 일괄적으로 적용하는 경우 유용하게 사용하지만 반대로 글로벌의 영향을 받지 않는 캡슐화가 필요한 경우에는 다른 대안이 필요할것입니다. 이때 shadowDOm 의 도움을 받을 수 있습니다. 쉐도우 돔은, DOM 트리를 캡슐화하여 개별 엘리먼트를 메인 다큐먼트로부터 독립적으로 렌더링 할 수 있도록 합니다. 충돌에 대한 걱정없이 스크립트와 스타일을 적용할 수 있습니다. 예를 들면 iframe과 같이 독립적인 문서영역입니다. Shadow DOM은 <iframe>과 같은 도구에 의존할 필요 없이, 웹 플랫폼에서 기본적으로 캡슐화와 구성요소화를 허용하기 위해 만들어졌습니다.

### 스타일 적용

span을 추가하고 스타일을 적용합니다. 스타일은 글로벌하게 적용되기 때문에 문서전체에 영향을 주게 됩니다.

```js
document.body.appendChild(document.createElement("span")).innerHTML =
  "<style>div { background-color: #82b74b; }</style><div>야호!</div>";
```

shadowDom 을 적용하면 특정 엘리먼트에만 스타일을 적용할 수 있습니다.

```js
document.body
  .appendChild(document.createElement("span"))
  .attachShadow({ mode: "open" }).innerHTML = //  #shadow-root (open)영역이 새로 분리됨
  "<style>div { background-color: #82b74b; }</style><div>야호!</div>";
```

렌더링 된 결과를 보면 #shadow-root 영역이 새롭게 추가됩니다.

### id 얻기

쉐도우 돔에 있는 노드는 id를 통해 가져올 수 없습니F다. 쉐도우 돔에 존재하는 엘리먼트를 쉐도우 돔 밖에서 얻어오기 위해서는 아래와 같이 조금 더 복잡한 방법을 통해 가능합니다.

```js
document.querySelectorAll("div")[1].shadowRoot.querySelector("#shadow");
```

### API

createShadowRoot API를 요청하여 생성합니다.

```js
<div id="host"></div>
<script>
  var shadow = document.querySelector('#host').createShadowRoot();
  shadow.innerHTML = '<span>Host node</span>';
</script>
```

기존의 DOM에 attachShadow API를 요청하여 적용 할수 있습니다.

```js

<div id="host"></div>
<script>
  var shadow = document.querySelector('#host').attachShadow({ mode: "open" });
  shadow.innerHTML = '<span>Host node</span>';
</script>
```

## slot

슬롯은 사용자가 컴포넌트 내부에 원하는 마크업을 채울 수 있도록 미리 선언해놓은 자리 표시자입니다. 주로 사용자 커스텀 요소를 생성할 때 유용합니다. 사용자 커스텀 요소에 필요한 최소한의 마크업만 제공합니다. 원하는데로 그룹화하고 스타일을 적용하여 사용할 수 있습니다. 슬롯은 shadow DOM에서 사용됩니다. 즉, shadow root에 추가되는 템플릿 코드 내에 슬롯을 작성해야 합니다. 빈 슬롯을 추가한 템플릿을 생성한 후, 사용자 커스텀 요소에서 해당 슬롯에 배치하고 싶은 요소를 추가하여 사용할 수 있습니다. 슬롯을 통해 다양한 요소들이 하나의 템플릿에서 구현 가능하므로 매우 유용합니다.

아래 <my-template> 내의 <h1>, <p>과 같은 자식 요소들을 Light DOM이라고 합니다. 이들은 템플릿 코드에 있는 지정된 slot을 찾아갑니다.

```js
<template id="my-template">
    <slot name="title"></slot>
    <hr>
    <slot></slot>
</template>

<my-template>
     <h1 slot="title">제목</h1>
     <p>이 텍스트는 이름 없는 빈 슬롯에 들어가게 됩니다.</p>
</my-template>

```

## 참고

shadow DOM은 항상 일반 DOM 내의 요소에 부착됩니다. DOM이 없으면 shadow DOM도 존재하지 않습니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_shadow_DOM
- https://ui.toast.com/weekly-pick/ko_20170721
- https://wit.nts-corp.com/2019/03/27/5552
