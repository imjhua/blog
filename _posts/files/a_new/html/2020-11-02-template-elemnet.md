---
layout: post
title: Template 엘리먼트
categories: HTML
---

템플릿 엘리먼트는 스크립트와 스타일을 포함하는 숨겨진 DOM입니다. 숨겨졌기때문에 렌더링 되지 않습니다. 이러한 장점들로 템플릿 엘리먼트를 이용하여 웹 컴포넌트를 만들 수도 있습니다. 사실상 웹 컴포넌트를 구성하는 표준이 된것이지요.

<hr >

<!-- vscode-markdown-toc -->

- [Template 엘리먼트](#template-엘리먼트)
  - [template.content](#template.content)
  - [템플릿 삽입](#템플릿-삽입)
- [정리](#정리)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='template-엘리먼트'></a>Template 엘리먼트

템플릿 엘리먼트는 마크업의 숨겨진 DOM이며 렌더링되지 않습니다. 페이지를 불러온 순간 즉시 그려지지는 않지만, 이후 JavaScript를 사용해 인스턴스를 생성하여 컨텐츠를 노출 할 수 있습니다. 템플릿을 사용하기 위해 이를 활성화할 필요가 있습니다. 활성화되기 전까지 템플릿의 컨텐츠는 절대로 렌더링되지 않습니다. 템플릿 엘리먼트는 스크립트와 스타일도 포함할 수 있습니다. 마찬가지로 스크립트와 스타일은 템플릿에 있을때는 적용되지 않지만, 복사되어 Document에 붙을 때에 적용됩니다. 쉐도우 돔(Shadow DOM)과 시너지를 일으켜 웹 컴포넌트의 템플릿 기능을 수행할수 있습니다.

템플릿은 간단하게 생각하면 콘텐츠 조각을 나중에 사용하기 위해 담아놓는 컨테이너입니다. HTML 마크 업 템플릿의 저장소 역할을 합니다. 페이지를 불러오는 동안 구문 분석기가 template 요소의 콘텐츠도 읽기는 하지만, 이는 유효성을 검증하기 위함이며 렌더링 하기 위함은 아닙니다. 브라우저는 template컨텐츠를 문서 외부로 간주 합니다.

### <a name='template.content'></a>template.content

template 기능을 검출하기 위해 DOM 엘리먼트를 생성하고 .content 속성이 존재하는지를 다음과 같이 검사합니다.

```js
function supportsTemplate() {
  return "content" in document.createElement("template");
}

if (supportsTemplate()) {
  // Good to go!
} else {
  // Use old templating techniques or libraries.
}
```

참고) .content 속성은 템플릿의 내부를 포함하는 읽기 전용의 DocumentFragment입니다.

### <a name='템플릿-삽입'></a>템플릿 삽입

다음과 같이 자바스크립트를 사용하여 템플릿을 활성화 합니다.

```html
<template id="tmpl">
  <script>
    alert("Hello");
  </script>
  <div class="message">Hello, world!</div>
</template>

<script>
  let elem = document.createElement("div");

  // Clone the template content to reuse it multiple times
  elem.append(tmpl.content.cloneNode(true));

  document.body.append(elem);
  // Now the script from template runs
</script>
```

만약 shdowDom을 이용한다면 이렇게 되겠죠?

```html
<template id="tmpl">
  <style>
    p {
      font-weight: bold;
    }
  </style>
  <p id="message"></p>
</template>

<div id="elem">Click me</div>

<script>
  let elem = document.createElement("div");

  elem.attachShadow({ mode: "open" });

  elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)

  elem.shadowRoot.getElementById("message").innerHTML =
    "Hello from the shadows!";
</script>
```

## <a name='정리'></a>정리

템플릿 요소는 마크업 조각 형태로 이루어집니다. 이는 페이지 로딩 시 렌더링 되지 않으며 자바스크립트를 이용해 런타임 시 인스턴스화할 수 있습니다. 따라서 자주 사용되는 마크업 조각들을 템플릿 요소에 추가하고 복제함으로써 재사용성을 증가시킵니다.

- template 콘텐츠는 구문 상 올바른 HTML 일 수 있습니다.
- template 콘텐츠는 "문서 외부"로 간주되므로 아무 영향도주지 않습니다.
- template.contentJavaScript에서 액세스 하고 복제하여 새 구성 요소에서 재사용 할 수 있습니다 .

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Web/HTML/Element/template
- https://www.html5rocks.com/ko/tutorials/webcomponents/template/
- https://ko.javascript.info/template-element
