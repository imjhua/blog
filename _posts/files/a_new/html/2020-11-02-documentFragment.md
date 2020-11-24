---
layout: post
title: createDocumentFragment
categories: HTML
---

DocumentFragment는 부모가 없는 최소한의 문서 객체입니다. 자바스크립트의 DOM객체는 연산을 수행할때마다 DOMTree라는 자료구조에 접근해야 하는데, 이는 자바스크립트의 성능을 저하시키는 요인 중 하나입니다. 성능최적화를 위해서는 DOM객체접근을 최소화하도록 해야하며 이떄 DocumentFragment객체를 이용할 수 있습니다.

## DOM객체 접근 최소화하기

DocumentFragment 객체를 이용하여 자바스크립트의 성능을 최적화한 코드를 비교해보겠습니다. 먼저 target에 계속 접근해서 append하는 코드 입니다.

```js
function addElements() {
  var target = document.getElementById("list");

  for (var i = 0; i < 100; i++) {
    var div = document.createElement("div");

    div.innerText = "div";
    target.appendChild(div); // target에 계속 접근해서 append한다.
  }
}
```

메모리상에서 조작 후 한번에 붙입니다. 객체에 대한 접근히 확실히 줄어듭니다. 이떄 cloneNode를 이용하여 복제를 하는데 이는 노드를 추가한 이후에도 Fragment의 내용을 메모리상에서 유지하기 위함입니다. 필요하지 않다면 굳이 복제할 필요는 없습니다.

```js
function addElements() {
  var target = document.getElementById("list");
  var docFrag = document.createDocumentFragment(); // 메모리에만 존재하며 마크업에 표현되지 않음

  for (var i = 0; i < 100; i++) {
    var div = document.createElement("div");

    div.innerText = "div";
    docFrag.appendChild(div); // 메모리상에서 조작후
  }

  // 노드를 삽입하는 메서드에 DocumentFragment를 인수로 전달하면,
  // 자식 노드 구조 전체가 삽입되며 DocumentFragment 노드 자체는 무시된다.
  target.appendChild(docFrag.cloneNode(true)); // append
}
```

참고) 노드를 추가한 이후에도 Fragment의 내용을 메모리상에서 유지하려면, cloneNode()를 사용하여 추가할 DcoumentFragment를 복제하면 된다.

## DocumentFragment 와 createElement 의 차이점

DocumentFragment는 어떤 종류의 노드도 가질 수 있는 반면, element는 그렇지 않습니다. DocumentFragment를 DOM에 추가하더라도 DocumentFragment 자체는 추가되지 않으며, 노드의 내용만이 추가됩니다. element를 추가할 경우에는 element 자체도 추가 동작에 속하게 됩니다.

## 정리

DocumentFragment를 사용하여 메모리상에서 노드 구조를 만들고 이를 라이브 노드 구조에 삽입하면 매우 효율적입니다. DocumentFragment 노드 자체는 DOM에 포함 되지 않기 때문에 노드 구조에도 영향을 끼치지 않습니다. 여러번의 렌더링과 재구조화를 메모리상에서 조작 후 한번의 렌더링과 재구조화가 발새하도록 하여 성능을 최적화 할 수 있습니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- http://dolphin.ivyro.net/file/web/html1/tutorial15.html
- https://boycoding.tistory.com/65
- https://untitledtblog.tistory.com/44
- https://programmer-seva.tistory.com/60
