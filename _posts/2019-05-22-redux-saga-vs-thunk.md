---
layout: post
title: 비동기 처리 redux-thunk 와 redux-saga 비교 
tags:
 - tag
categories: TODO
---

## 소개
text
https://medium.com/@han7096/redux-saga%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC-5e39b72380af
----
해당 내용은 다음 글을 참고 하였습니다.
- url

https://velog.io/@dongwon2/Redux-Thunk-vs-Redux-Saga%EB%A5%BC-%EB%B9%84%EA%B5%90%ED%95%B4-%EB%B4%85%EC%8B%9C%EB%8B%A4-

https://orezytivarg.github.io/from-redux-thunk-to-sagas/

우리는 redux-thunk라는 미들웨어를 redux에 사용하여 함수 디스패치를 다룬다. 여기서 주목해야할 한 가지는 flux 표준 액션으로 변환할 수 있는 적절한 미들웨어가 있다면, redux를 사용해서 모든 것을 디스패치할 수 있다는 것이다.
다룰 수 있는 적절한 redux 미들웨어가 있다면 Promises, Observables 혹은 심지어 Generators라도 디스패치할 수 있다. 비동기 작업을 기술할 때 thunks나 promises를 사용하는 것은 파악하기 어려울 수 있다.
또한, 그들 자신의 각 효과에 대해 파악하는 것이 제한된다. 어떤 경우에는 오프라인 store나, 웹 API, 혹은 기존 앱 상태의 조각에 대해 입력해야할 필요가 있을 수 있다.
간단히 말해, thunks는 좋은 시작점은 될 수 있겠지만, 확장에 쓰이기는 어렵다는 것이다. 더 적합한 접근 방법은 redux-saga 미들웨어를 사용해서 비동기 작업에 대한 워크플로우를 오케스트레이션하는 것이다.
saga는 한 프로세스를 몇 개의 더 작은 프로세스로 나눌 수 있도록 하는 오류 관리 패턴이다. 하위 프로세스 중 하나가 성공하거나 실패하면, 그 정보로 애플리케이션 상태를 업데이트한다.



Saga는 제너레이터함수이고, 미들웨어는 Saga에게 yield 값을 받아서 또 다른 어떤 동작을 수행할 수 있다. Saga는 명령을 내리는 역할만 하고, 실제 어떤 직접적인 동작은 미들웨어가 처리할 수 있다는 뜻이다. redux-thunk와의 가장 큰 차이점이다.



```js
function asyncIncrement() {
  return async (dispatch) => {
    await delay(1000);
    dispatch({type: 'INCREMENT'});
  };
}
```


위 함수는 스스로 비동기적인 처리를 직접 수행한다. 저 함수에 대한 테스트가 필요하다면, 1초를 기다리고 dispatch 하는 것을 어떻게 증명할지 생각해보자. 딱히 마음에 드는 방법은 떠오르지 않는다. 문제는 함수 내부에 비동기적인 로직이 그대로 녹아있다는 것이다.



```js
function* asyncIncrement() {
  // Saga는 아래와 같이 간단한 형태의 명령만 yield 한다.
  yield call(delay, 1000); // {CALL: {fn: delay, args: [1000]}}
  yield put({type: 'INCREMENT'}); //  {PUT: {type: 'INCREMENT'}}
}
```
call이든 put이든 모두 직접적인 처리를 하지 않는다(call, put은 이펙트 생성자(Effect creator)라 부른다). 명령을 만들어주기만 하고, 이 명령에 따른 직접적인 처리는 모두 미들웨어가 한다. 그래서 이런 Saga는 테스트도 정말 간단하다.




물론 Saga는 반드시 이펙트만을 yield 해야 하는 것은 아니다. 일반적인 Promise도 yield 할 수 있고, 미들웨어는 이 역시도 훌륭히 resolve나 reject를 기다려줄 것이다. 하지만 이런 비동기 로직을 Saga 내부에서 직접 처리하면 테스트, 여러 다른 이펙트들과의 상호작용이 어렵다. thunk에서 크게 달라지는 점이 없다. 때문에 되도록 이펙트만을 yield 하는 Saga를 작성하길 추천한다.


- https://meetup.toast.com/posts/140