---
layout: post
title: 트랜지션 효과(자연스럽게 사라지기)
categories: Web
---

- display
- visibility
- opacity


[Repaint 발생 요소]

리페인트는 레이아웃에는 영향을 주지 않지만, `가시성에는 영향`을 주는 엘리먼트가 변경되면 발생한다.

- opacity
- background-color
- visibility
- outline


#### 사용하지 않는 노드에는 visibility: invisible 보다 display: none을 사용하기

visibility invisible은 레이아웃 공간을 차지하기 때문에 reflow의 대상이 됩니다. 하지만 display none은 Layout 공간을 차지하지 않아 Render Tree에서 아예 제외됩니다.




9. 숨겨진 엘리먼트를 변경한다. display: none; 으로 숨겨진 엘리먼트는 변경될 때, 리페인트나 리플로우를 일으키지 않는다. 그렇기 때문에 엘리먼트를 표시하기 전에 엘리먼트를 변경한다. (display: none 속성이 설정된 노드는 화면에 어떠한 공간도 차지하지 않기 때문에 Render Tree를 만드는 과정에서 제외된다.) visibility invisible은 레이아웃 공간을 차지하기 때문에 reflow의 대상이 되지만 display none은 Layout 공간을 차지하지 않아 Render Tree에서 아예 제외된다.



---

해당 내용은 다음 글을 참고 하였습니다.

- 