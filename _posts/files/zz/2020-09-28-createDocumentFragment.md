---
layout: post
title: createDocumentFragment() 사용하기
categories: TODO
---

https://developer.mozilla.org/ko/docs/Web/API/Document/createDocumentFragment

https://iamawebdeveloper.tistory.com/64

https://programmer-seva.tistory.com/60


createDocumentFragment() 메서드 사용

브라우저의 화면에 표시되는 페이지는 DOM 트리와 렌더링 트리를 통해 표시됩니다. 화면에 보이는 DOM 트리는 메인 DOM 객체라 할 수 있는데, 간혹 DOM API 메서드를 사용해 노드 작업을 실행해야 할 때가 있습니다. 이때 메인 DOM 객체와는 별개의 새로운 DOM 객체를 생성해 사용하면 렌더링 성능을 좀 더 향상시킬 수 있습니다. 새로운 DOM 객체는 다음 예제와 같이 document.createDocumentFragment() 메서드를 사용해 생성합니다.



// 새로운 DOM 객체를 생성한다.
var fragment = document.createDocumentFragment();

// elms는 메인 DOM에 추가해야 하는 DOM 컬렉션 객체라고 가정하며, 새로운 DOM 객체에 반복문으로 추가한다.
for(var e=0; e<elems.length; e++) {
    fragment.appendChild(elems[e]);
}

// 메인 DOM 객체, 즉 화면에 보이는 DOM 트리에서 <div> 요소를 선택한다.
var div = document.getElementsByTagName("div");

// 선택된 <div> 요소를 반복문으로 순회하며 새로운 DOM 객체에 추가된 노드의 복제본을 메인 DOM 객체에 추가한다.
for(var i=0; i < div.length; i++) {
    div[i].appendChild(fragment.cloneNode(true));
}




출처: https://12bme.tistory.com/140 [길은 가면, 뒤에 있다.]

---

해당 내용은 다음 글을 참고 하였습니다.

-