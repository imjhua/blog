---
layout: post
title: 인터랙션 개발
categories: Resume
---



## 애니메이션
- https://wsss.tistory.com/34?category=701850
- https://codepen.io/pieter-biesemans/pen/xqVBdK 한땀한땀?
- https://bashooka.com/inspiration/scrolling-animation-effects/
- https://dashboardpack.com/live-demo-preview/?livedemo=290%3Futm_source%3Dcolorlib&utm_medium=reactlist&utm_campaign=architecthtml&v=38dd815e66db
- animation 동작만들어보기: https://codepen.io/joyanna/pen/NWGYLNW
- ani 합: https://codepen.io/hisamikurita/pen/OJLrjpB
- 프로그레스바 에서 텍스트 노출: https://codepen.io/AbubakerSaeed/pen/abzWqPb


## TODO

- 마우스가 오버되면 컬러값 랜덤?
- 빌보드 구현(자동 롤링 & 뷰포트에 들어왔을때만 동작)
- 뷰포트 계산 하는 함수로 분리(패딩 인자로)
- 터치 이벤트 아래로 끌면 리프레시
- 사용자 액션에 반응하는 것 고민
- 핀터레스트 클론코딩
- 네이버 플리킨 예제 따라하기
- 인터섹션 옵저버 무한스크롤
- 깃 코드 옮기기
- 하트뿅뿅 종 흔들흔들

다양한 사용자 입력
PC에서는 사용자 입력 방법이 마우스와 키보드를 이용한 입력만 있다. 하지만 모바일에서는 사용자 입력 방법이 매우 다양하다. 터치스크린부터 키보드, 기기의 방향, 기기의 움직임, GPS를 이용한 위치 이동 등 굉장히 많은 입력 방법이 있다.
터치 입력에도 오므리고 벌리기(pinch), 쓸어 넘기기(swipe), 살짝 누르기(tap) 등 여러 가지 제스처가 있어 이를 분석하고 처리하는 것도 결코 쉬운 일이 아니다. 더구나 기기가 계속 발전하면서 계속 추가되는 사용자 입력 방법을 처리하기는 더욱 어렵다.