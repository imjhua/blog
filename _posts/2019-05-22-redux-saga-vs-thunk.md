---
layout: post
title: 비동기 처리 redux-thunk 와 redux-saga 비교 
categories: TODO
---

리덕스를 사용하면 데이터를 처리하는 비즈니스 로직을 컴포넌트로부터 분리할 수 있습니다.액션 생성자 함수에서 API 호출 같은 비동기 프로세스 구현을 위해 사용하는 리덕스 미들웨어로, redux-thunk 와 redux-saga 미들웨어가 있습니다. 두가지 미들웨어를 비교, 분석 해봅시다.



## thunk
thunk는 비동기 처리를 위해 Promise를 사용하면 resolve시점(성공)에서 객체를 직접 리턴 할 수 없다는 단점을 보안하여 비동기 처리를 할떄 액션 객체를 반환하는 대신 dispatch를 인자로 하는 함수를 리턴합니다. dispatch를 인자로 하는 함수를 리턴하면 이 함수 안에서 데이터 패치를 비롯한 네트워킹, 다수의 디스패치 등을 할 수 있습니다. 비동기 액션 처리의 대안으로 많이 사용됩니다. 주의할 점은, 클로저 패턴을 사용해야 하기에 복잡하고 어려울 수 있습니다. 코드는 다음과 같습니다.


```js
export function fetchCars() {
   // dispatch를 인자로 하는 함수를 리턴 한다.
  return dispatch => {
    // 요청이 시작됨을 알린다.
    dispatch({ type: FETCH_CARS_BEGIN });
    // API 요청을 실행하며 완료 시 함수는 종결 된다
    return axios
      .get(`${API}/cars`)
      // 성공 시 성공했음을 알리고 받아온 자료를 payload 에 담아 리듀서로 보낸다
      .then(res =>
         dispatch({ type: FETCH_CARS_SUCCESS, payload: res.data })
      )
      // 실패 시 실패했음을 알리고 받은 에러를 payload 에 담아 리듀서로 보낸다
      .catch(err => 
         dispatch({ type: FETCH_CARS_FAILURE, payload: err }));
    };
}
```

## saga
saga의 가장 큰 장점은 action이 순수한 객체(Pure Object)만을 반환한다는 것입니다. 비동기 처리 같은 단순하지 않은 작업들은 saga 에 만들어놓고 누군가 발생시킨 액션중 일치하는 saga와 연결된 액션타입이 있으면 해당 saga를 실행시켜 줍니다. 

- 액션엔 비동기 작업이 아닌 단순히 리듀서와만 통신하는 액션들만 있다.
- API 통신을 하는 비동기 작업 같은 것들은 saga 에 작성한다. 
- 액션타입명-작성한 제너레이터 함수를 연결 해놓는데 이때 액션을 계속 리스닝하다가 일치하는 액션타입명이 발생할 때 잽싸게 해당 제너레이터 함수를 실행시킨다.
- 이 때 만약 data를 fetching 하는 비동기 액션이 였다면, 내부적으로 다시 단순히 리듀서에 받아온 data를 넣어주는 단순히 리듀서와만 통신하는 액션 이제너레이터 함수 안에 존재 할 것이다.




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