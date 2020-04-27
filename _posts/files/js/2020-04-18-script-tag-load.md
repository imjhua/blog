---
layout: post
title: Script tag 로드의 문제점
categories: JavaScript
categories: TODO
---

Script 태그를 이용하여 모듈을 로드하면 winodw 객체의 속성으로 모듈이 로드되기 때문에 각기 다른 모듈을 공유하는데 제약이 없는 문제가 있습니다. 파일을 독립적으로 존재하지 못하게 되면 같은 이름의 변수를 사용하거나 스코프가 전역으로 설정되는 문제가 발생할 수 있습니다.


https://www.google.com/search?q=script%ED%83%9C%EA%B7%B8%EC%9D%98+%EB%AC%B8%EC%A0%9C&oq=script%ED%83%9C%EA%B7%B8%EC%9D%98+%EB%AC%B8%EC%A0%9C&aqs=chrome..69i57j0l3.4971j0j7&sourceid=chrome&ie=UTF-8


---

해당 내용은 다음 글을 참고 하였습니다.

- 