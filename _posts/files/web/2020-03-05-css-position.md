---
layout: post
title: CSS Position
categories: Web
---

레이아웃의 위치를 지정할 수 있는 속성이 있습니다. CSS position 속성은 문서 상에 요소를 배치하는 방법을 지정합니다.top, right, bottom, left 속성이 요소를 배치할 최종 위치를 결정합니다. 

## postion 속성
position 속성은 상속되지 않으며, 위(top), 아래(bottom), 왼쪽(left), 오른쪽(right) 의 위치를 같이 설정 할 수 있습니다.

- static (기본값): 위치를 지정하지 않을 때 사용한다. static이면 offset 값을 무시된다.
- relative: 위치를 계산할때 static의 원래 위치부터 계산한다. 상대적인 offset 적용됨.
- absolute: 원래 위치와 상관없이 위치를 지정할 수 있다. 즉 static이 아닌 가장 가까운 조상의 position 위치를 기준으로 위치를 지정한다. 
- fixed: 원래 위치와 상관없이 위치를 지정할 수 있다. 상위 요소에 영향을 받지 않기 때문에 화면이 바뀌더라도 고정된 위치를 설정 할 수 있다. 브라우저 화면의 상대 위치를 기준으로 위치가 결정된다.


## 결론
포지션 속성들을 정리하면 다음과 같습니다.

- Absolute Position(브라우저 또는 상위요소를 기준으로 배치하는 방법)
- Relative Position(자기자신을 기준으로 배치하는 방법)
- Fixed Position(스크린을 기준으로 배치하는 방법)


----
해당 내용은 다음 글을 참고 하였습니다.
- https://developer.mozilla.org/ko/docs/Web/CSS/position
- https://ko.learnlayout.com/position.html
- https://electronic-moongchi.tistory.com/26
- https://amaze9001.tistory.com/56