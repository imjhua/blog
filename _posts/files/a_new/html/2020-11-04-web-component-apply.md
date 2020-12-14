---
layout: post
title: Web Cmponent 사용
categories: HTML
---

웹 컴포넌트는 자체적으로 HTML엘리먼트를 만드는 기술입니다. 브라우저에에서 html 엘리먼트는 같은 요소라도 다르게 보이기도 합니다. 웹컴포넌트를 직접 구현해 봅시다.

<hr >

<!-- vscode-markdown-toc -->

- [종류](#종류)
  - [자율 사용자 정의 요소 (-로 구분된 이름 사용)](<#자율-사용자-정의-요소-(-로-구분된-이름-사용)>)
  - [사용자 정의 된 내장 요소 (is)](<#사용자-정의-된-내장-요소-(is)>)
- [주의점](#주의점)
- [특징](#특징)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='종류'></a>종류

### <a name='자율-사용자-정의-요소-(-로-구분된-이름-사용)'></a>자율 사용자 정의 요소 (-로 구분된 이름 사용)

독립형이며 표준 HTML 요소에서 상속되지 않습니다. 문자 그대로 HTML 요소로 작성하여 페이지에서 사용합니다.

```js
class PopUpInfo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // write element functionality in here

    ...
  }
}

customElements.define('popup-info', PopUpInfo);
// = document.createElement("popup-info");
```

### <a name='사용자-정의-된-내장-요소-(is)'></a>사용자 정의 된 내장 요소 (is)

는 기본 HTML 요소에서 상속됩니다. 이 중 하나를 만들려면 확장하는 요소를 지정해야하며 (위의 예에서 암시 된대로) 기본 요소를 작성하고 is속성 (또는 속성) 에 사용자 지정 요소의 이름을 지정하여 사용됩니다. HTMLParagraphElement 엘리먼트를 상속받아 확장한 사용자 정의된 내장 요소입니다.

```js
class WordCount extends HTMLParagraphElement {
  constructor() {
    // 항상 생성자에서 super는 처음으로 호출됩니다
    super();

    // 엘리먼트의 기능들은 여기에 작성합니다.

    ...
  }
}
customElements.define('word-count', WordCount, { extends: 'p' });
// = document.createElement("p", { is: "word-count" });
```

불편한 부분이 보일 수 있는데, 위 클래스 extends에서 분명 HTMLParagraphElement 상속받음을 알려주었음에도 불구하고, 또다시 customElements.define에서 'p'를 상속받고 있습니다. 각각이 인식되기 위해서는 어쩔수 없다고 합니다.

## <a name='주의점'></a>주의점

단순히 클래스의 생성자 constructor에서 DOM을 조작하는 데에는 문제가 없습니다. 문서 로드가 끝나는 시점의 이벤트인 DOMContentLoaded를 받아 DOM이 로드되고 나서 class를 초기화하기에 constructor가 실행되는 시점에서 엘리먼트는 DOM에 붙어있는 상태입니다. 따라서 constructor에서 어떠한 DOM 조작을 해도 문제가 되지 않습니다.

```js
class CurrentTime {
  constructor(el) {
    super();

    this._initDOM(el); // DOM 조작들
  }
}
```

그런데! HTMLElement를 상속받으면 상황이 조금 달라집니다. HTMLElement를 상속받은 Custom Elements의 constructor의 실행 시점은 아직 DOM에 추가지되지 않은 상태입니다. 그렇기에 아래처럼 constructor에서는 어떠한 DOM 조작도 할 수 없게 됩니다. 그러므로, 이곳에서는 DOM과 무관한 클래스 인스턴스 자체의 준비만 해야 합니다.

```js
class CurrentTime extends HTMLElement {
  constructor() {
    super(); // 항상 맨 앞에!

    console.log("yey!");
  }
}
window.customElements.define("current-time", CurrentTime);
```

## <a name='특징'></a>특징

컴포넌트를 캡슐화하여 쉽게 적용 가능하고 네이티브 엘리먼트로 동작하기 때문에 성능이 좋습니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- http://d2.naver.com/helloworld/188655
- https://kyu.io/%ec%9b%b9-%ec%bb%b4%ed%8f%ac%eb%84%8c%ed%8a%b81-keep-calm-and-usetheplatform/
