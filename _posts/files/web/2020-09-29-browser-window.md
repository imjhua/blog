---
layout: post
title: 브라우저의 창
categories: Web
---

브라우저의 창 크기를 나타내는 속성들이 몇가지 있습니다. 브라우저의 창 크기는 브라우저를 구성하고 있는 브라우저 메뉴영역들에 따라 달라집니다.

## 브라우저의 창 크기

- 해상도: window.screen.width & window.screen.height

- 화면 크키(브라우저 UI 개발자 도구, 스크롤 영역 제외): innerWidth & innerHeight

- 브라우저 UI(윈도우 두께)를 포험한 전체 크기: outerWidth & outerHeight

- 이벤트가 발생한 위치: event.clientX & event.clientY

- 창의 크기(body 엘리먼트의 패딩을 포함한 크기): document.body.clientWidth & document.body.clientHeight

- 문서 전체: document.body.scrollWidth & documnet.body.scrollHeight

---

해당 내용은 다음 글을 참고 하였습니다.

- http://blog.naver.com/PostView.nhn?blogId=dreamid&logNo=140061573075&parentCategoryNo=&categoryNo=11&viewDate=&isShowPopularPosts=true&from=search
