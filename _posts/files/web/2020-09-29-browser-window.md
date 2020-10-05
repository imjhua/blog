---
layout: post
title: 브라우저의 창
categories: Web
---

브라우저의 창 크기를 나타내는 속성들이 몇가지 있습니다. 브라우저의 창 크기는 브라우저를 구성하고 있는 브라우저 메뉴영역들에 따라 달라집니다.

## 브라우저 창 크기

- 해상도: window.screen.width & window.screen.height

- 화면 크키(브라우저 UI 개발자 도구, 스크롤 영역 제외): innerWidth & innerHeight

- 브라우저 UI(윈도우 두께)를 포험한 전체 크기: outerWidth & outerHeight

- 이벤트가 발생한 위치: event.clientX & event.clientY

## 문서 전체 크기

- scrollHeight: 스크롤바 높이를 뺀 내용 전체의 높이 (document.body.scrollHeight)

- clientHeight: 스크롤바 높이를 뺀 가시적인 높이

- offsetHeight: 스크롤바 높이를 포함한 가시적인 높이

### 문서의 끝까지 스크롤했는지 판별하기

전체 문서 높이 - 현재 보여지는 영역 창크기(보여지는 영역은 스크롤 대상 아님, 이 다음 영역부터 감지되어야 한다.) - 스크롤영역이 아닌 다른 영역(footer)

```js
const winTop = window.pageYOffset; // 스크롤할때마다 현재 윈도우 offset을 알아낸다.

const windowScrollHeight = document.body.offsetHeight;
const windowHeight = window.innerHeight;
const footerElHeight = $(".footer").clientHeight;

const onTop = windowScrollHeight - windowHeight - footerElHeight; //스크롤이 문서하단에 도착했는지 계산합니다.

if (winTop >= onTop) {
  getList();
}
```

### 요소를 끝까지 스크롤했는지 판별하기

다음 등식이 참인 경우 요소를 끝까지 스크롤한 것입니다. 이떄 요소가 감싸고 있는 컨텐츠의 마진&패딩값에 대한 여유값이 필요합니다.

스크롤을 포함한 (스크롤되는)요소 높이 - 요소의 스크롤 현재위치 는 요소의 높이보다 작아야 한다.

참고) 정확히는 `element.scrollHeight - element.scrollTop === element.clientHeight`

```js
// 하단에 도착했을 경우(푸터영역 위까지의 요소를 끝까지 스크롤했는지 판별하기)
if (element.scrollHeight - element.scrollTop - PADDING < element.clientHeight) {
  getList();
}
```

---

해당 내용은 다음 글을 참고 하였습니다.

- http://blog.naver.com/PostView.nhn?blogId=dreamid&logNo=140061573075&parentCategoryNo=&categoryNo=11&viewDate=&isShowPopularPosts=true&from=search
- https://developer.mozilla.org/ko/docs/Web/API/Element/scrollHeight
