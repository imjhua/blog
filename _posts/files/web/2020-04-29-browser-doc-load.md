---
layout: post
title: 문서 로드 시점 이벤트와 브라우저 로딩 순서
categories: Web
---

웹문서를 만드는 경우, 문서가 로드되었을때를 기점으로 문서를 초기화하고, 각종 설정을 부여하는 것은 빈번한 일입니다. 이 시점에 접근하기 위해 사용되는 이벤트들에 대하여 알아봅니다.

## 문서 로드 시점(DOMContentLoaded, onload)

페이지 라이프사이클은 크게 3가지로 분류됩니다. 로드 시점과 관련된 이벤트로써, 발생하는 시점은 다음과 같습니다.

- DOMContentLoaded: HTML 이 모두 로드되고, DOM 트리가 완성되었지만, 외부 리소스(img etc) 가 아직 로드되어지지 않았을 때
- window.load: 브라우저에 모든 리소스(img, style, script, etc) 가 로드되었을 때
- beforeunload / unload: 페이지를 떠날 때

일반적으로, 스크립트를 문서의 마지막(</body>) 이전에 삽입하면 굳이 이벤트를 이용하여 프로그래밍을 처리할 필요가 없습니다. 다만, 문서의 <head> 영역에 스크립트가 삽입되거나 외부의 파일에 정의되어 있다면 이벤트를 연결하여 문서의 로드시점에 맞게 처리해야 합니다.

### HTML과 script가 로드된 시점에 발생하는 이벤트

### DOMContentLoaded

HTML과 script가 로드된 시점에 발생하는 이벤트입니다. 즉, 렌더트리생성 가능 시점인 DOM트리가 완성된 때이며 DOMContentLoaded 이벤트가 발생하는 시점은 개별 script 작업이 완료되는 시간만큼 지연됩니다.

```js
window.addEventListener("DOMContentLoaded", function () {
  //실행될 코드
});
```

- onload 이벤트보다 먼저 발생한다.
- 빠른 실행속도가 필요할때 적합하다.
- IE8 이하에서는 지원하지 않는다.

### jQuery ready

자바스크립트의 DOM 트리가 준비되었을때의 시점을 컨트롤하는 메소드로 DOMContentLoaded의 jQuery 버전입니다.

```js
$(document).ready(function () {
  //실행될 코드
});
```

onload 이벤트보다 먼저 발생합니다. 즉, 문서의 모든 자원이 다운로드되었을때 발생하는 onload와 달리 DOM 트리만 완성되면 바로 발생하므로 빠른 실행속도가 필요할때 적합합니다. 여러번 사용되면 선언 순서에 따라 순차적으로 실행됩니다.

### 문서의 모든 콘텐츠 로드 후 발생 이벤트

### window.onload

문서의 모든 콘텐츠(images, script, css, etc)가 로드된 후 발생하는 이벤트입니다(load 이벤트라고들 한다).

```js
window.onload = function () {
  //실행될 코드
};
```

- 문서에 포함된 모든 콘텐츠가 로드된 후에 실행되기에 불필요한 로딩시간이 추가될 수 있다.
- 동일한 문서에 오직 onload는 하나만 존재해야 한다.
- 중복될 경우, 마지막 선언이 실행된다.
- 외부 라이브러리에서 이미 선언된 경우 이를 찾아 하나로 합치는 과정이 필요하다.
- 외부의 자원(iframe, image, script)을 사용하는 경우에도 해당된다.
- <body> 요소에 속성(attribute)으로 지정될 수 있다.

```html
<body onload="실행될 코드"></body>
```

위와 같이 사용된 경우, window.onload로 지정된 것은 무시되며 window 객체뿐만 아니라 원하는 객체(object)가 로드되었을때 실행될 코드를 설정할 수 있습니다.

#### onload 속성 적용

```js
document.getElementById("myFrame").onload = function () {
  //실행될 코드
};
```

이벤트를 직접 연결할 수도 있습니다.

```js
window.onload = function() { 
  //실행될 코드 
}

// 또는

window.addEventListener("load", function () {
  //실행될 코드
});
```

참고) load 이벤트는 리소스와 그것에 의존하는 리소스들의 로딩이 완료되면 실행됩니다.

```html
// 윈도우 모든 리소스 로드
<script>
  window.addEventListener("load", function (event) {
    console.log("All resources finished loading!");
  });
</script>

// 스크립트 리소스 로드
<script>
  var script = document.createElement("script");
  script.addEventListener("load", function (event) {
    console.log("Script finished loading and executing");
  });
  script.src = "http://example.com/example.js";
  script.async = true;
  document.getElementsByTagName("script")[0].parentNode.appendChild(script);
</script>
```

### jQuery load

jQuery에서는 onload와 같은 동작을 하는 load 메소드를 제공합니다.

```js
$(window).load(function () {
  //실행될 코드
});
```

### 참고!

beforeunload / unload - 페이지를 떠날 때 발생하는 이벤트 입니다.

## 브라우저로딩 순서와 발생하는 이벤트 정리

초기값은 readyState = loading로 시작합니다.

1. 가장 먼저 window 객체가 생성. (window는 전역 객체로 웹 페이지와 탭마다 생성)
2. documet객체가 window의 프로퍼티로 생성되며 DOM트리의 구축을 한다. document객체는 readyState 프로퍼티를 가진다.
3. DOM트리를 구축 중 script요소를 만나면 해당 script의 구문 분석 후 오류 발생하지 않으면 바로 그 자리에서 실행한다. 실행시 동기적으로 실행되어 html문서의 DOM트리 구축은 블로킹 된다. 오류가 발생한다면 멈추며, HTML DOM트리 구축을 중단한다.
4. script까지 모두 읽고 DOM구축이 성공한다면 readyState = interactive를 가진다.
5. 이때 웹 브라우저는 DOM트리 구축을 알리기 위해 `DOMContentLoaded 이벤트를 발생`시킨다.
6. img등 이미지 파일등의 외부 리소스를 읽어 들여야 한다면 이 시점에 읽는다.
7. 리소스까지 모두 읽어 들인 후에는 readyState = complete 으로 바뀌고 브라우저는 Window객체를 상대로 `load이벤트(onload)를 발생`시킨다.

## 결론

DOMContentLoaded 가 load 보다 빨리 발생합니다. 문서 로드 시점 이벤트의 다음 두가지를 구분하도록 합니다.

- HTML과 script가 로드된 시점(렌더트리생성 가능 시점인 DOM트리가 완성)에 발생하는 이벤트: DOMContentLoaded, jQuery ready
- 문서의 모든 콘텐츠 로드 후 발생 이벤트: window.onload, jQuery load

각 이벤트에 대한 유용한 경우는 다음과 같습니다.

- DOMContentLoaded: DOM이 준비 상태이기 때문에, DOM 노드를 제어할 수 있다.
- window.load: 모든 리소스가 로드된 시점이기에, image 사이즈와 같은 것들을 얻을 수 있다.
- beforeunload / unload: 변화에 따른 저장 여부 및 페이지 이탈 여부를 확인할 수 있다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://webdir.tistory.com/515
- https://mygumi.tistory.com/281
- https://ju-note.tistory.com/15
- https://developer.mozilla.org/ko/docs/Web/Events/load
