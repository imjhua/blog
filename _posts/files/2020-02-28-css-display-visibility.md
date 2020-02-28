---
layout: post
title: CSS dispaly와 visibility속성
categories: HTML5
---
 

어떤 요소를 화면에 보이거나 숨길 때 사용하는 display와 visibilty 속성을 사용합니다. 둘의 차이에 대해 알아봅니다.

## display & visibilty 속성
display 속성은 요소를 어떻게 표시할지를 선택하고 isibility 속성은 요소를 보일지 말지 결정하는 속성입니다. 이것을 브라우저 렌더링시에 거치는 RenderTree에서도 차이가 있습니다.

- display: 표시, 나타냄
- visibilty: 볼 수 있음

display:none 속성이 설정된 노드는 화면에 어떠한 공간도 차지하지 않기 때문에 RenderTree를 만드는 과정에서 제외됩니다. visibility:invisible의 경우, 화면에 보이지는 않지만 공간은 차지하고 요소가 보이지 않게만 하기 때문에 RenderTree에 포함되는 차이가 있습니다.

 
## display 속성
display 속성에는 inline, block, none가 있습니다. display는 요소의 종류를 선택하는 속성입니다.
원래 inline 요소를 block 요소로 보이게 만들 수도 있고, 원래 block 요소를 inline 처럼 보이게 만들 수도 있습니다. 이 속성은 상속되지 않고 독립적으로 사용됩니다. 

- display: inline: 기본값으로, 요소를 inline 요소처럼 표시합니다. 따라서 앞뒤로 줄바꿈 되지 않습니다.
- display: block: 요소를 block 요소처럼 표시합니다. 따라서 요소 앞 뒤로 줄바꿈 됩니다
- display: none: 박스가 생성되지 않습니다. 따라서 공간을 차지하지도 않습니다.
- display: inline-block: 요소는 inline인데 내부는 block 처럼 표시함. 즉, 박스 모양이 inline 처럼 옆으로 늘어섬.

참고) flex : CSS3에 새로 생긴 값으로 블록-레벨의 flex 컨테이너처럼 요소를 표현한다.


## visibility 속성

visibility 속성엔느 visible, hidden, collapse가 있습니다. visibility 속성은, 어떤 요소를 보이게 할지 숨길지를 결정합니다.  요소가 보이지 않게 하는 경우에도 여전히 투명하게 공간을 차지 합니다. 이 속성은 상속됩니다.

- visibility: visible: 기본값으로 요소가 그대로 보입니다.
- visibility: hidden: 요소가 보이지 않지만, 여전히 그 공간을 차지하며 투명하게 남습니다.
- visibility: collapse: <table> 태그에서만 사용할 수 있는 값으로, 선택 테이블의 행과 열을 숨깁니다.

 
 
## 결론
display 속성은 요소를 어떻게 표시할지를 선택하고 isibility 속성은 요소를 보일지 말지 결정하는 속성입니다. display:none 속성이 설정된 노드는 화면에 어떠한 공간도 차지하지 않기 때문에 RenderTree를 만드는 과정에서 제외됩니다. visibility:invisible의 경우, 화면에 보이지는 않지만 공간은 차지하고 요소가 보이지 않게만 하기 때문에 RenderTree에 포함되는 차이가 있습니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://aboooks.tistory.com/85
