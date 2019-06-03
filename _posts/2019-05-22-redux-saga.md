---
layout: post
title: redux-saga 
tags:
 - redux-saga
categories: TODO
---

## 소개
react 애플리케이션을 개발할 때 가장 어려운 부분은 아마도 사이드 이펙트를 처리하는 부분일 것입니다. 예를 들면 비동기 처리와 같은 데이터 패치(fetch)나 브라우저 캐시에 접근하는 등의 동작들이 있습니다. redux를 사용해봤다면 HTTP 리퀘스트나 타이머 같은 비동기 조작을 사용하여 상태를 변경할 때 문제를 겪어봤을 것입니다. Redux-Saga는 처음부터 이러한 사이드 이펙트를 관리하기 위해 만들어진 라이브러리 입니다. 

## 등장 배경

### redux(리덕스)
리덕스(redux)는 상태(state)관리 도구입니다. 하위, 상위 컴포넌트에 데이터를 props로 넘겨주는게 너무 관리하기 힘들어서 선택하는 라이브러리 입니다. 리덕스를 사용하면 데이터를 처리하는 비즈니스 로직을 컴포넌트로부터 분리할 수 있습니다. 하나의 Store(Object)에 SPA의 모든 데이터를 보관합니다. 리덕스의 동작 구조를 보면 store는 상태를 저장하고 있는 곳으로 observer pattern을 사용하여 createStore(reducers)를 통해서 리듀서를 등록해서 이벤트가 발생할 때 action을 가지고 reducer를 콜백으로 실행합니다. reducer 함수의 인자는 state, action입니다. 즉 store가 이벤트에 포함된 action을 받아서 어떤 내용을 수행할지를 판단해서 수행하고 새로운 state값을 리턴하게 됩니다. 


이때, 리덕스의 리듀스 함수는 순수 함수여만 합니다. 순수함수란, 기본적으로 입력 데이터를 변경하지 않고 외부 상태(데이터베이스, 전역 변수등)에 의존하지 않으며 동일한 입력 값에 대해 동일한 출력 값을 일관되게 제공하는 함수를 뜻합니다. 즉, 리덕스는 Action Creator라는 순수 함수의 반환(Action)을 받아 리듀서(Reducer)라 부르는 순수 함수로 데이터를 처리합니다.

리덕스(redux)가 처음 나왔을 때, `액션 생성자와 리듀서는 순수`해야 하는데 함수가 일관된 결과를 보장하지 못하거나, 함수 외부 어디든지 조금이라도 영향을 주는 경우에 대한 사이드 이펙트는 어떻게 처리하는가에 대한 많은 의견이 있었습니다. 리액트, 리덕스는 함수의 응용, 순수 함수, 불변성 등 함수형 프로그래밍을 지향합니다. 사이드 이펙트를 원하지 않습니다. 

### 사이드 이펙트 (side-effect)
리액트 리덕스 구조에서 사이드 이펙트는 어디에서 발생할까요? 바로 액션과 리듀서 사이에 들어가 중간자 역할을 하는 `미드웨어`에서 사이드 이펙트가 존재 할 수 있습니다. `미들웨어는 액션이 디스패치 되어 리듀서에서 이를 처리하기 전 사전에 지정된 작업을들 설정`합니다. 리듀서 사이의 중간자역할로써 리듀서가 액션을 처리하기 전에, 어떠한 추가 작업을 하는 역할을 합니다. 예를 들면 데이터 패치나, 로그 기록, 액션 취소 등이 있습니다. 

Redux-Saga는 이러한 중간자 사이에서 발생하는 사이드 이펙트 등을 처리 하기 위해 등장하였습니다. Redux-Saga는 이 틈에서 사이드 이펙트를 훌륭히 관리합니다.


### 드디어 등장
Saga는 처음 GOTO 컨퍼런스-2015에 "Applying Saga Pattern"이라는 발표에서 처음 등장 하였습다. 내용을 요약해보면 Saga는 어떤 시스템에서의 장기(Long lived) 트랜잭션과 그 실패 처리를 어떻게 관리할지에 대한 방법을 제시하였습니다. MSDN에서도 "A Saga on Sagas"로 saga 용어가 등장하였는데, 여기에서는 CQRS(Command and Query Responsibility Segregation: 명령과 조회의 책임 분리) 패턴의 프로세스 매니저로 설명되었습니다. 한쪽(GOTO conference)에서는 트랜잭션 칠패 처리에 대한 관리를, 다른 한쪽(MSDN)에서는 작업을 효율적으로 처리하는 것 그 자체에 더 관심이 있습니다. Redux-Saga에서는 모두에서 영감을 받았다고 합니다.


## Saga
실제 서비스 로직들은 모두 Saga 내부에서 처리하며, 그 결과를 다시 액션으로 발행(dispatch)합니다. saga 를 이용하면 결과를 보여주는 컴포넌트, 액션, 액션 생성자, 리듀서 모두 순수 함수로 사이드 이펙트없이 구현할 수 있습니다. 

### saga 실행을 위한 미들웨어 생성 후 리덕스 스토어 연결 코드

```js
// main.js

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import mySaga from './sagas'

// saga 미들웨어를 생성합니다.
const sagaMiddleware = createSagaMiddleware()
// 스토어에 mount 합니다.
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// 그리고 saga를 실행합니다.
sagaMiddleware.run(mySaga)

// 애플리케이션을 render합니다.
```


### saga
saga는 헬퍼함수(helpers)를 사용하여 액션과 리스너를 등록하여, 등록한 액션을 계속 리스닝 하고 있습니다. 리스닝 하고 있는 액션이 발생하면 바로 캐치 하여 worker saga(제너레이터로 작성된 saga함수)를 실행합니다.

```js
// saga는 action을 listen(watch)한다.
function* mySaga() {
/*
  각각의 dispatch 된 `FETCH_DATA` 액션에 대해 fetchUser를 실행합니다. 동시에 data를 fetch하는 것을 허용합니다. 여러개의 saga를 등록 할 수도 있습니다.
*/
  yield takeEvery("FETCH_DATA", getData);
  // yield takeEvery("FETCH_DATA2", getData2);
  // yield takeEvery("FETCH_DATA3", getData3);
}

export default mySaga;

```


### worker saga(genrator function)
디스패치된 액션에 따라 수행되는 함수 입니다.

#### generator 함수
saga를 사용하기전 saga의 구성이 되는 제너레이터 함수를 이해할 필요가 있습니다. 제너레이터 함수는 iterable (돌리고 돌릴 수 있다)하며 비동기든 동기든 간에 yield 구문으로 순차적 처리가 가능합니다. saga에서는 이 제너레이터 함수를 활동하여 비동기를 순차적으로 처리 합니다. 

#### Caller와 Callee
제너레이터함수는 Callee, 이를 호출하는 함수는 Caller 라고 합니다.

- Caller는 Callee가 반환한 제너레이터를 가지고 로직을 수행한다.
- Caller는 Callee의 yield 지점에서 다음 진행 여부/시점을 제어한다.
- Caller는 Callee를 호출하는 책임뿐 아니라 Callee 내부 로직 수행에 대한 제어권을 갖는다(더 진행하지 않거나, 에러를 발생시킬 수도 있다). 


Redux-Saga 입장으로 보면 미들웨어는 Caller(Saga 미들웨어 그 자체)이고, 우리가 작성한 Saga는 Callee(제너레이터 함수)로 표현할 수 있습니다. 계속해서 살펴 보겠지만, 이팩트라고  부르는 것들로 saga를 등록하고 수행시킵니다.

#### 코드

```js
// worker Saga: FETCH_DATA 액션에 대해 호출될 것입니다.
function* getData(action) {
   try {
      const data = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "FETCH_DATA_FULFILLED", data: data});
   } catch (e) {
      yield put({type: "FETCH_DATA_REJECTED", message: e.message});
   }
}

-----

//action.js
// action이 pure object만을 반환하는 것을 보고 있으면 아름답다는 생각이 저절로 든다.
export const fetchData = () => ({
    type: FETCH_DATA
});

// saga에서 호출하는 액션
export const fetchDataFulfilled = DATA => ({
    type: FETCH_DATA_FULFILLED,
    payload: DATA
});

// saga에서 호출하는 액션
export const fetchDataRejected = error => ({
    type: FETCH_DATA_REJECTED,
    error
});
```

### 여러개의 saga 등록하기
다른 액션들을 보고있는 여러개의 Saga 들을 등록해야 하는 경우에 처리 할수 있는 다양한 방법들이 존재 합니다. 내장 함수들을 사용해 여러개의 워쳐들을 만들 수 있습니다. 


- yield 여러개의 helper fn

- yield 여러개의 helper fn 을 담고 있는 watcher saga 여러번
- yield 여러개의 helper fn 을 담고 있는 watcher saga 리스트

- yield 여러개의 helper fn 을 담고 있는 fork 된 watcher saga 여러번
- yield 여러개의 helper fn 을 담고 있는 fork 된 watcher saga 리스트


- yield 여러개의 helper fn 을 담고 있는 spawn 된 watcher saga 여러번
- yield 여러개의 helper fn 을 담고 있는 spawn 된 watcher saga 리스트


참고) root saga: watcher saga 또는 helps fn 또는 worker saga 또는 비동기 처리를 담고 있음
참고) watcher saga: helps fn 또는 worker saga 를 담고 있음
참고) helps saga: worker saga 를 담고 있음
참고) worker saga: 비동기 처리 담당 를 담고 있음

단일 entry point를 rootSaga로 정의 하여 다양한 방법으로 호출 해 보겠습니다.





/////////////









```js
function* helloSaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

function* watchIncrementAsync() {
  yield takeEvery("OTHER_DATA_REQUESTED", fetchOtherData);
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}
```

모든 Saga들을 한번에 시작하기 위한 단일 entry point를 다음과 같이 제공 할 수 있습니다.
```js
function* helloSaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}


function* watchIncrementAsync() {
  yield takeEvery("OTHER_DATA_REQUESTED", fetchOtherData);
}


export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}
```


https://translate.googleusercontent.com/translate_c?depth=1&hl=ko&rurl=translate.google.co.kr&sl=en&sp=nmt4&tl=ko&u=https://github.com/redux-saga/redux-saga/issues/760&xid=17259,1500004,15700002,15700022,15700186,15700191,15700256,15700259&usg=ALkJrhjnqRsz5--eioIRw7-ntYx2naQHQw

여러개의 이펙트를 처리 하기 위해 all을 다음과 같이 활용합니다. promise all 과 동일하게 동작합니다.
```js
function* mySaga() {
  const [customers, products] = yield all([
    call(fetchCustomers),
    call(fetchProducts)
  ])
}

-----

function* mySaga() {
  const { customers, products } = yield all({
    customers: call(fetchCustomers),
    products: call(fetchProducts)
  })
}

```

### 이펙트
이펙트는 Redux-Saga의 가장 중심이 되는 특징입니다. 이펙트는 미들웨어에 의해 수행되는 명령을 담고 있는 자바스크립트 객체라고 생각할 수 있습니다. call이나 put 같은 이펙트 생성자를 통해 이펙트를 생성하고, 생성된 이펙트는 모두 일반 자바스크립트 객체일 뿐입니다. 이펙트 생성자는 항상 일반 객체를 만들기만 하고, 어느 다른 동작도 수행하지 않습니다. 

제너레이터 함수로 구성되어있는 saga들은 그 안에 명령을 담고 있는, 이펙트(takeEvery, call, put 등)라 부르는 순수한 객체를 yield 할 것이고, 미들웨어는 이런 명령들을 해석해 처리하고, 그 결과를 다시 Saga에 돌려줍니다. 

### 이펙트 코드 적용
redux-saga 는 스토어에 몇몇 지정된 액션들이 dispatch 되었을때 태스크를 만들기 위해 내부 함수들을 감싸는 몇몇 헬퍼 이펙트들을 제공합니다.

최초로 발생하게 되는 액션들을 미리 saga에 패턴으로 등록하여 액션이 스토어에 디스패치(dispatch) 될때 바로 수행될 수 있도록 합니다. 예를 들면 데이터 패치를 위한 비동기를 수행할 테스크의 시작을 알리는 FETCH_REQUESTED 액션이 있을 수 있습니다. 


#### 비동기 액션의 시작점이 되는 패턴 등록
FETCH_REQUESTED 액션을 dispatch 하는 버튼이 있고, 서버로부터 받은 데이터를 fetch 시키는 비동기 액션의 태스크를 실행할 수 있도록 saga에 패턴을 다음과 같이 등록합니다.

```js
import { takeEvery } from 'redux-saga/effects'

function* watchFetchData() {
  yield takeEvery('FETCH_REQUESTED', fetchData)
}
```

takeEvery는 동시에 시작되는 여러 개의 fetchData instance들을 허용합니다. 이 순간에 이전의 하나 혹은 더 많은 아직 제거되지 않은 fetchData 작업들이 아직 있는 동안 새로운 fetchData 작업을 시작합니다.

만약에 단지 가장 마지막에 발생된 request의 response를 얻고 싶다면(예를 들어 항상 데이터의 가장 마지막 버전을 보여주는 것), takeLatest helper를 사용할 수 있습니다.

```js
import { takeLatest } from 'redux-saga/effects'

function* watchFetchData() {
  yield takeLatest('FETCH_REQUESTED', fetchData)
}
```
takeEvery와는 다르게, takeLatest는 어떤 순간에 실행되는 단 하나의 fetchData 작업만 허용합니다. 그리고 이것은 가장 마지막에 시작되었던 작업일 것입니다. 만약 다른 fetchData 작업이 시작되었을 때 이전의 작업이 여전히 실행 중이라면, 이전의 작업은 자동적으로 취소됩니다.


#### 비동기 액션을 수행하는 태스크
등록된 태스크를 실행해서 액션을 핸들링 해봅시다.

```js
import { call, put } from 'redux-saga/effects'

export function* fetchData(action) {
   try {
      const data = yield call(Api.fetchUser, action.payload.url)
      yield put({type: "FETCH_SUCCEEDED", data})
   } catch (error) {
      yield put({type: "FETCH_FAILED", error})
   }
}
```


## 정리
즉, 비동기 처리 같은 단순하지 않은 작업들은 saga 에 만들어놓고 누군가 발생시킨 액션중 일치하는 saga와 연결된 액션타입이 있으면 해당 saga를 실행시켜 주는 것입니다. 액션타입명-작성한 제너레이터 함수를 연결 해놓는데 이때 액션을 계속 리스닝하다가 일치하는 액션타입명이 발생할 때 해당 제너레이터 함수를 실행시키고 다음 액션객체를 디스패치(put)하여 리듀서로 전달합니다.


----
해당 내용은 다음 글을 참고 하였습니다.
- url


https://medium.com/@han7096/redux-saga%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC-5e39b72380af

// generator: http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/
// generator: https://davidwalsh.name/es6-generators

import { put, takeLatest, all } from "redux-saga/effects";

function* fetchNews() {
  const json = yield fetch(
    "https://newsapi.org/v1/articles?source=cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc"
  ).then(response => response.json());

  // NEWS_RECEIVED 액션을 디스 패치 한다.
  yield put({ type: "NEWS_RECEIVED", json: json.articles });
}

//
/*
  takeEvery: 디스패치된 GET_NEWS 액션에 대해 실행. 동시에 news fetch 허용
  또는 takeLatest를 사용할 수 있습니다.
  동시에 news를 fetch하는 것을 허용하지 않습니다. 
  만약 fetch가 이미 대기 상태일 때  "USER_FETCH_REQUESTED"가 dispatch가 되었다면 
  대기 상태의 fetch는 취소되고 항상 최근 것만이 실행됩니다.
*/

// GET_NEWS 액션이 디스 패치 되면 fetchNews를 수행한다.
function* actionWatcher() {
  yield takeLatest("GET_NEWS", fetchNews);
}

export default function* rootSaga() {
  console.log("rootSaga");
  yield all([actionWatcher()]);
}
// export default rootSaga;



- https://meetup.toast.com/posts/140
-  https://wkdtjsgur100.github.io/redux-saga/
