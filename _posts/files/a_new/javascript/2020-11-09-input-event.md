---
layout: post
title: input엘리먼트의 Event
categories: JavaScript
---

text type의 input인 경우, 입력받는 text에 따라 입력과 관련된 2개의 이벤트가 발생하게 됩니다. key 이벤트는 제외하고 change와 input이벤트입니다. 비슷해 보이는 이벤트의 차이는 무엇일까요?

<hr />

<!-- vscode-markdown-toc -->

- [onChage & onInput event](#onchage-&-oninput-event)
  - [onChage event](#onchage-event)
  - [onInput event](#oninput-event)
- [정리](#정리)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='onchage-&-oninput-event'></a>onChage & onInput event

### <a name='onchage-event'></a>onChage event

변경되는 요소의 종류와 사용자가 요소와 상호 작용하는 방식에 따라 change이벤트가 다른 순간에 실행됩니다. text type의 경우 값이 변경된 후 요소가 포커스를 잃었을때 발생합니다.

### <a name='oninput-event'></a>onInput event

요소의 value 속성이 바뀔 때마다 발생한다. input의 입력이 바뀔때마다 발생합니다.

## <a name='정리'></a>정리

보통은 input이벤트 발생후 change이벤트가 발생합니다. change의 경우 요소의 상호작용에 따라 발생하는 시점이 달라질 수 있기때문에 주의해서 사용해야 합니다.

- onChage: 폼의 입력 요소에 변경이 생기면 발생
- onInput: 요소의 값이 변경될 때 발생.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Web/API/HTMLElement/change_event
- https://developer.mozilla.org/ko/docs/Web/API/HTMLElement/input_event
