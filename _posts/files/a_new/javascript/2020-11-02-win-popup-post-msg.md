---
layout: post
title: 윈도우 팝업 데이터 통신하기
categories: JavaScript
---

부모창에서 자식창을 띄워 postMessage 를 통한 데이터연동을 해 봅니다.

## postMessage

window.postMessage() 메소드는 Window 오브젝트 사이에서 안전하게 cross-origin 통신을 할 수 있게 합니다. 예시로, 페이지와 생성된 팝업 간의 통신이나, 페이지와 페이지 안의 iframe 간의 통신에 사용할 수 있습니다.

window는 다른 window를 참조할 수 있고(targetWindow = window.opener), targetWindow.postMessage()를 통해 다른 window에 MessageEvent를 전송할 수 있습니다. 이벤트를 받는 window는 이를 통해 필요에 따라 이벤트를 처리할 수 있습니다. window.postMessage()를 통해 전달된 인자는 이벤트 객체를 통해 이벤트를 받는 window에서 사용할 수 있습니다.

중요한 사실이 있는데, postMessage는 IE10부터 완벽하게 지원하며 부분적으로 IE 8-10은 iframe 을 통해서만 데이터 전송이 가능합니다.

### 문법

```
targetWindow.postMessage(message, targetOrigin, [transfer]);
```

- Window.open (새 창을 만들고 새 창을 참조할 때),
- Window.opener (새 창을 만든 window를 참조할 때),
  HTMLIFrameElement.contentWindow (부모 window에서 임베디드된 iframe을 참조할 때),
- Window.parent (임베디드된 iframe에서 부모 window를 참조할 때),
- Window.frames + an index value (named or numeric).

### 데이터 연동에 꼭 필요한 프로퍼티

- Window.opener: 현재 창을 열었던 다른 창의 참조를 반환합니다.
- Window.parent: 현재 창 또는 서브 프레임의 부모에 대한 참조를 반환합니다.

## 새창 띄우기 window.open

window.open() 함수를 사용하여 새창을 띄울 수 있습니다.

```
var window = window.open(url, windowName, [windowFeatures]);
```

### windowName

- \_blank : 새 창에 열립니다. 이것이 기본값입니다.
- \_parent : 부모 프레임에 열립니다.
- \_self : 현재 페이지를 대체합니다.
- \_top : 로드된 프레임셋을 대체합니다.
- name(임의의 이름) : 새 창이 열리고 창의 이름을 지정합니다. 동일한 이름에 다시 open() 을 하면 기존의 열린창의 내용이 바뀝니다.

### windowFeatures

DOMString창 함유 쉼표로 구분리스트 형태 "이름 = 값"에 해당 값으로 적용합니다. 이러한 기능에는 창의 기본 크기 및 위치, 스크롤 막대 포함 여부 등과 같은 옵션이 포함됩니다.

```js
function openWindowPopup(url?: string) {
  const windowName = "AddressList Popup";
  const windowFeatures =
    "width=800,height=600,top=20,left=900,location=no,resizable=yes,scrollbars=yes,status=no";

  const win = window.open(url, windowName, windowFeatures);

  return win;
}
```

### opener & parent

#### opener

부모창(A)에서 자식창(B)을 팝업으로 열었을 때 자식창에서 행해진 Action에 따라 부모창에 영향을 줘야 하는 경우 opener를 사용합니다. opener객체는 자기 창을 연 부모의 window 객체를 참조하여 데이터를 연동하는데 사용합니다. IE에서는 동작하지 않습니다!

- 창 A가 창 B를 열었을 때 B.opener는 A를 반환합니다.

#### parent

IE9에서 postMessage를 통한 데이터 통신을 하기 위해 iframe을 사용하여야 하고, 이경우 부모창에서 자식창에서 행해진 action을 전달받기 위해서는 parent 프로퍼티를 사용하여야 합니다.

### 적용

```js
const handleClickIE9 = (e: Event) => {
  e.stopPropagation();
  const win = openWindowPopup();
  // 이때 자식팝업창에서는 parent를 사용한다.
  const html = `<html>
                  <meta http-equiv="X-UA-Compatible" content="IE=9">
                  <iframe src=${ADDRESS_LIST_URL} width="100%" height="100%"></iframe>
                  </html>`;

  win?.document.write(html);

  win?.addEventListener("message", receiveMessage, false);
  function receiveMessage() {
    setReceiveData(true);
    win?.close();
  }
};

const handleClick = (e: Event) => {
  e.stopPropagation();
  // 이때 자식팝업창에서는 opener를 사용한다.
  const win = openWindowPopup(ADDRESS_LIST_URL);

  window.addEventListener("message", receiveMessage, false);
  function receiveMessage() {
    setReceiveData(true);
    win?.close();
  }
};
```

#### handleClickIE9

- iframe으로 적용 합니다.
- 반환받은 window객체를 통해 post message를 받습니다.
- 반환받은 window객체를 닫습니다.

#### handleClick

- url그대로 새창을 띄웁니다.
- 전역 window객체를 통해 post message를 받습니다.
- 반환받은 window객체를 닫습니다.


### iframe으로 통일하기

동일한 이름으로 창을 띄우기 때문에 새롭게 내용을 추가 하기위해 open / write / close가 호출되었습니다.

- iframe으로 적용 합니다.
- 반환받은 window객체를 통해 post message를 받습니다.
- 반환받은 window객체를 닫습니다.
- 자식에서는 parent로 통신하겠지요?

```js
const handleClickForNewWindow = (e: Event) => {
  e.preventDefault();
  const popup = openWindowPopup(); // target=parent
  const html = `<html> <meta http-equiv="X-UA-Compatible" content="IE=10"> <iframe src=${ADDRESS_ADD_URL} width="100%" height="100%" style="border: 0;"></iframe> </html>`;

  popup?.document.open();
  popup?.document.write(html);
  popup?.document.close();

  function receiveMessage(e: MessageEvent) {
    if (e.data && e.data.action === messageEventDataActionKey) {
      setReceiveData(true);
      popup?.close();
      popup?.removeEventListener("message", receiveMessage);
    }
  }
  popup?.addEventListener("message", receiveMessage, false);
};
```

## 정리

iframe 에서 삽입된 부모 페이지의 객체에 접근하기 위해 window.parent 를 제공합니다. window.open 에서 호출한 부모 페이지의 객체에 접근하기 위해 window.opener 를 제공합니다. 주의할 점은 window.parent는 삽입된 부모 페이지가 없으면 자기 자신을 가리킵니다.

- 자신의 창이 팝업창(popup)일 경우 opener. 단, IE에서는 동작하지 않음.
- 아이프레임(iframe)일 경우 parent.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://mkil.tistory.com/226
- https://developer.mozilla.org/ko/docs/Web/API/Window/postMessage
- https://developer.mozilla.org/ko/docs/Web/API/Window/open
