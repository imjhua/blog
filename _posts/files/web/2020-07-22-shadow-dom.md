---
layout: post
title: keleton screen(스켈레톤 스크린)
categories: Web
categories: TODO
---

페이지에서 요청하는 데이터를 기다리는 동안 로딩중의 상태를 나타내는 다양한 방법들이 있습니다. 스피너 기법이나, 프로그래스바 스켈레톤 스크린을 보여줌으로써 사용자가 대기중의 상태를 알려줌과동시에 빠르게 로드되고 있다는 것을 전달하기 위함입니다. 스켈레톤이란, CSS코드의 뼈대 또는 프레임 역할을 하는 파트라는 의미로 흔히 사용됩니다.

## 스켈레톤 스크린
skeleton은 뼈대를 의미하는 단어입니다. 데이터를 받고 있는 로딩중의 상태를 나타내기 위하여 로딩 스켈레톤 스크린을 노출합니다. 페이스북이나 유튜브의 첫 화면을 보면, 아주 잠깐 프레임을 그려주는 빈 페이지를 확인할 수 있습니다. 

## 개발 CSS
그럼 이러한 UI는 어떤 방법으로 구현할 수 있을까요? CSS의 linear-gradient 속성과 :empty 선택자를 활용하여 이를 구현할 수 있습니다.



- background-image 로 각각 요소들의 크기를 정해줌
- background size로는 그 요소들의 위치를 정해줌


---

해당 내용은 다음 글을 참고 하였습니다.

- https://unordinarydays.tistory.com/184
- https://wit.nts-corp.com/2018/11/19/5371
- https://codepen.io/viktorstrate/pen/yoBRLy
- https://ideveloper2.tistory.com/168
