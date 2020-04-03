---
layout: post
title: Axiox & Fetch
categories: JavaScript
---


네트워크 통신을 위해 XMLHttpRequest(XHR)를 이용해서 JavaScript 로 비동기 리퀘스트를 처리해왔습니다. 매우 유용했지만, XHR 는 그렇게 좋은 API 는 아니었습니다. XHR 은 관심사항을 격리시키지 못했습니다. 입력, 출력, 그리고 상태(state) 모두를 하나의 객체로 관리해야 했으며, 상태(state) 는 이벤트를 통해 추적해야 했습니다. XHR 의 이벤트 기반 모델(event based model) 은 요즘의 Promise 기반 (그리고 generator 기반) 비동기 프로그래밍 방식과 그다지 잘 어울리지 않습니다.

이런 문제들을 해결하기 위해 2015년 경 Fetch API 가 정의되었습니다. Fetch는 자바스크립트에서 지원하는 기능이 아닌 브라우저에서 지원하는 API입니다. 따라서 지원하지 않는 브라우저가 있을 수 있습니다. fetch() 함수는 URL 을 인자로 받고 응답을 처리하기 위한 promise 를 반환합니다. 응답을 처리할 때 Response 객체를 이용할 수 있습니다.

이외, Axios는 HTTP 통신 라이브러리입니다. 마찬가지로 Promise 기반의 비동기 방식으로 HTTP 데이터 요청을 실행합니다. 내부적으로는 직접적으로 XMLHttpRequest 를 다루지 않고 AJAX 호출을 할 수 있습니다.

## Axios
- 사용하기 좀 더 편리하다.
- fetch 에는 존재하지 않는 기능이 좀 더 많다.
- Promise based

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```


## Fetch

- 라이브러리를 import 하지 않아도 사용할 수 있다.
- React Native 의 경우에 업데이트가 잦기 때문에, 라이브러리(예를들면, axios 같은 것들..)이 이 업데이트를 쫓아오지 못하는 경우가 생기는데, Fetch 는 이걸 걱정할 필요 없이 사용 가능
- Promise based
- Request Aborting 에 대해서 표준적인 방법을 제공해 주지 못함.
- 네트워크 에러가 발생했을 때, 계속 기다려야됨 -> response timeout API 제공이 안됨.
- 지원하지 않는 브라우저가 있다.
- Error handling 관련해서 문제가 좀 있다.
- Catch 에 걸렸을 때, 이후 .then( ~~~ )을 실행한다.
- axios 의 경우엔 .then(~~~)을 실행하지 않고, console 창에 해당 에러로그를 보여준다.


```js
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
```

## 차이점
- fetch 의 request 함수는 response 객체가 ok 프로퍼티를 포함하는 것으로 정상적인 요청/응답을 체크하고, axios 는 status 값이 200 인지와 statusText 를 통해서 확인한다.
- fetch 는 response 객체에 .json() 메소드를 호출하여서 json 객체를 얻고, axios 는 response 객체의 data property 에 접근함으로써 얻는다.

## 결론
- 둘다 프로미스 기반이다.
- 둘다 쓰는데 무리 없고, 잘 동작 하나, axios 는 주로 react, fetch 는 react native 에 사용한다.(React-native 의 빠른 업데이트 때문에 ..Quora 에 답변 다신 어떤분 개인 의견)
- 전체적으로 이 둘은 비슷하나, axios 가 조금 더 장점이 많- 동시에 fetch 의 단점도 꽤나 존재한다.
- fetch 가 좀더 가볍고 axios 가 상대적으로 좀 더 무거운 느낌(제공하는 기능이 더 많다.)
- 요청 취소를 위해선 fetch 가 아닌 axios 등의 다른 라이브러리 사용이 필요하다.

참고로 Fetch API보다 Axios가 더 좋은 장점은 다음과 같습니다.
- 구형브라우저를 지원합니다.(Fetch API의 경우는 폴리필이 필요합니다.)
- 요청을 중단시킬 수 있습니다.
- 응답 시간 초과를 설정하는 방법이 있습니다.
- CSRF 보호 기능이 내장되어있다.
- JSON 데이터 자동변환
- Node.js에서의 사용이 가능하다.

----
해당 내용은 다음 글을 참고 하였습니다.
- http://hacks.mozilla.or.kr/2015/05/this-api-is-so-fetching/
- https://hoorooroob.tistory.com/entry/React-React-Naive-TIPS-axios-%EC%99%80-fetch-%EC%96%B4%EB%96%A4-%EA%B2%83%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%A0%EA%B9%8C