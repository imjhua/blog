---
layout: post
title: redux-saga
categories: React
---

react 애플리케이션을 개발할 때 가장 어려운 부분은 아마도 사이드 이펙트를 처리하는 부분일 것입니다. 예를 들면 비동기 처리와 같은 데이터 패치(fetch)나 브라우저 캐시에 접근하는 등의 동작들이 있습니다. redux를 사용해봤다면 HTTP 리퀘스트나 타이머 같은 비동기 조작을 사용하여 상태를 변경할 때 문제를 겪어봤을 것입니다. Redux-Saga는 처음부터 이러한 사이드 이펙트를 관리하기 위해 만들어진 라이브러리 입니다.

### 리덕스(Redux)

리덕스(redux)는 상태(state)관리 도구입니다. 하위, 상위 컴포넌트에 데이터를 props로 넘겨주는게 너무 관리하기 힘들어서 선택하는 라이브러리 입니다. 리덕스를 사용하면 데이터를 처리하는 비즈니스 로직을 컴포넌트로부터 분리할 수 있습니다. 하나의 Store(Object)에 SPA의 모든 데이터를 보관합니다. 리덕스의 동작 구조를 보면 store는 상태를 저장하고 있는 곳으로 observer pattern을 사용하여 createStore(reducers)를 통해서 리듀서를 등록해서 이벤트가 발생할 때 action을 가지고 reducer를 콜백으로 실행합니다. reducer 함수의 인자는 state, action입니다. 즉 store가 이벤트에 포함된 action을 받아서 어떤 내용을 수행할지를 판단해서 수행하고 새로운 state값을 리턴하게 됩니다.

### 리덕스의 리듀스 함수

이때, 리덕스의 리듀스 함수는 순수 함수여만 합니다. 순수함수란, 기본적으로 입력 데이터를 변경하지 않고 외부 상태(데이터베이스, 전역 변수등)에 의존하지 않으며 동일한 입력 값에 대해 동일한 출력 값을 일관되게 제공하는 함수를 뜻합니다. 즉, 리덕스는 Action Creator라는 순수 함수의 반환(Action)을 받아 리듀서(Reducer)라 부르는 순수 함수로 데이터를 처리합니다. 리덕스(redux)가 처음 나왔을 때, `액션 생성자와 리듀서는 순수`해야 하는데 함수가 일관된 결과를 보장하지 못하거나, 함수 외부 어디든지 조금이라도 영향을 주는 경우에 대한 사이드 이펙트는 어떻게 처리하는가에 대한 많은 의견이 있었습니다. 리액트, 리덕스는 함수의 응용, 순수 함수, 불변성 등 함수형 프로그래밍을 지향합니다. 사이드 이펙트를 원하지 않습니다.

### 사이드 이펙트 (side-effect)

리액트 리덕스 구조에서 사이드 이펙트는 어디에서 발생할까요? 바로 액션과 리듀서 사이에 들어가 중간자 역할을 하는 `미드웨어`에서 사이드 이펙트가 존재 할 수 있습니다. `미들웨어는 액션이 디스패치 되어 리듀서에서 이를 처리하기 전 사전에 지정된 작업을들 설정`합니다. 리듀서 사이의 중간자역할로써 리듀서가 액션을 처리하기 전에, 어떠한 추가 작업을 하는 역할을 합니다. 예를 들면 데이터 패치나, 로그 기록, 액션 취소 등이 있습니다.

Redux-Saga는 이러한 중간자 사이에서 발생하는 사이드 이펙트 등을 처리 하기 위해 등장하였습니다. Redux-Saga는 이 틈에서 사이드 이펙트를 훌륭히 관리합니다.

### 제너레이터 함수

saga를 사용하기전 saga의 구성이 되는 제너레이터 함수를 이해할 필요가 있습니다. 제너레이터 함수는 iterable (돌리고 돌릴 수 있다)하며 비동기든 동기든 간에 yield 구문으로 순차적 처리가 가능합니다. saga에서는 이 제너레이터 함수를 활동하여 비동기를 순차적으로 처리 합니다.

#### Caller와 Callee

제너레이터함수는 Callee, 이를 호출하는 함수는 Caller 라고 합니다.

- Caller는 Callee가 반환한 제너레이터를 가지고 로직을 수행한다.
- Caller는 Callee의 yield 지점에서 다음 진행 여부/시점을 제어한다.
- Caller는 Callee를 호출하는 책임뿐 아니라 Callee 내부 로직 수행에 대한 제어권을 갖는다(더 진행하지 않거나, 에러를 발생시킬 수도 있다).

Redux-Saga 입장으로 보면 미들웨어는 Caller(Saga 미들웨어 그 자체)이고, 우리가 작성한 Saga는 Callee(제너레이터 함수)로 표현할 수 있습니다. 계속해서 살펴 보겠지만, 이팩트라고 부르는 것들로 saga를 등록하고 수행시킵니다.

### 등장 배경

Saga는 처음 GOTO 컨퍼런스-2015에 "Applying Saga Pattern"이라는 발표에서 처음 등장 하였습다. 내용을 요약해보면 Saga는 어떤 시스템에서의 장기(Long lived) 트랜잭션과 그 실패 처리를 어떻게 관리할지에 대한 방법을 제시하였습니다. MSDN에서도 "A Saga on Sagas"로 saga 용어가 등장하였는데, 여기에서는 CQRS(Command and Query Responsibility Segregation: 명령과 조회의 책임 분리) 패턴의 프로세스 매니저로 설명되었습니다. 한쪽(GOTO conference)에서는 트랜잭션 칠패 처리에 대한 관리를, 다른 한쪽(MSDN)에서는 작업을 효율적으로 처리하는 것 그 자체에 더 관심이 있습니다. Redux-Saga에서는 모두에서 영감을 받았다고 합니다.

## redux-saga

실제 서비스 로직들은 모두 Saga 내부에서 처리하며, 그 결과를 다시 액션으로 발행(dispatch)합니다. saga 를 이용하면 결과를 보여주는 컴포넌트, 액션, 액션 생성자, 리듀서 모두 순수 함수로 사이드 이펙트없이 구현할 수 있습니다.

### Saga

다음과 같이 saga 실행을 위한 미들웨어 생성 후 리덕스 스토어 연결 코드를 작성합니다.

```js
// main.js

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducers";
import mySaga from "./sagas";

// saga 미들웨어를 생성합니다.
const sagaMiddleware = createSagaMiddleware();
// 스토어에 mount 합니다.
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// 그리고 saga를 실행합니다.
sagaMiddleware.run(mySaga);

// 애플리케이션을 render합니다.
```

### Helper effect

redux-saga는 몇몇 특정 액션들이 스토어에 보내질 때, 여러 task들을 함께 실행하기 위한 내부적인 함수를 감싸는 몇몇 helper effect들을 제공합니다. saga는 헬퍼함수(helpers)를 사용하여 액션과 리스너를 등록하고, 등록한 액션을 계속 리스닝 하고 있습니다. 리스닝 하고 있는 액션이 발생하면 바로 캐치 하여 worker saga(제너레이터로 작성된 saga함수)를 실행합니다.

```js
// saga는 action을 listen(watch)한다.
function* mySaga() {
  /*
  각각의 dispatch 된 `FETCH_DATA` 액션에 대해 fetchUser를 실행합니다. 
  동시에 data를 fetch하는 것을 허용합니다. 
  여러개의 saga를 등록 할 수도 있습니다.
*/
  yield takeEvery("FETCH_DATA", getData);
  // yield takeEvery("FETCH_DATA2", getData2);
  // yield takeEvery("FETCH_DATA3", getData3);
}

export default mySaga;
```

Saga에서 사용되는 함수들은 generator function으로 구현됩니다.

- ROOT_SAGA: mySaga (보통은 watch saga들을 담고 있지만 여기서는 root saga이면서 watch saga입니다.)
- WATCH_SAGA: mySaga
- WORKER_SAGA: getData

### root saga

sagaMiddleware.run(mySaga) 로 실행됩니다. 액션에 대한 비동기 처리를 담당하는 worker saga를 등록하여 리스닝 하고 있는 watcher saga를 호출합니다.

```js
// 단일 watcher saga를 호출
function* mySaga() {
  yield takeEvery("FETCH_DATA", getData);
}
export default mySaga;

// 여러개의 watcher saga를 호출
function* helloSaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

function* watchIncrementAsync() {
  yield takeEvery("OTHER_DATA_REQUESTED", fetchOtherData);
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}
```

### worker saga

디스패치된 액션에 따라 수행되는 함수 입니다. 비동기 처리를 담당 하고 있습니다. 제너레이터 함수로 구현됩니다.

```js
function* getData(action) {
  try {
    const data = yield call(Api.fetchUser, action.payload.userId);
    yield put({ type: "FETCH_DATA_FULFILLED", data: data });
  } catch (e) {
    yield put({ type: "FETCH_DATA_REJECTED", message: e.message });
  }
}
```

#### 코드 설명

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

### 이펙트

이펙트는 Redux-Saga의 가장 중심이 되는 특징입니다. 이펙트는 미들웨어에 의해 수행되는 명령을 담고 있는 자바스크립트 객체라고 생각할 수 있습니다. call이나 put 같은 이펙트 생성자를 통해 이펙트를 생성하고, 생성된 이펙트는 모두 일반 자바스크립트 객체일 뿐입니다. 이펙트 생성자는 항상 일반 객체를 만들기만 하고, 어느 다른 동작도 수행하지 않습니다.

제너레이터 함수로 구성되어있는 saga들은 그 안에 명령을 담고 있는, 이펙트(takeEvery, call, put 등)라 부르는 순수한 객체를 yield 할 것이고, 미들웨어는 이런 명령들을 해석해 처리하고, 그 결과를 다시 Saga에 돌려줍니다.

### 이펙트 코드

redux-saga 는 스토어에 몇몇 지정된 액션들이 dispatch 되었을때 태스크를 만들기 위해 내부 함수들을 감싸는 몇몇 헬퍼 이펙트들을 제공합니다.

최초로 발생하게 되는 액션들을 미리 saga에 패턴으로 등록하여 액션이 스토어에 디스패치(dispatch) 될때 바로 수행될 수 있도록 합니다. 예를 들면 데이터 패치를 위한 비동기를 수행할 테스크의 시작을 알리는 FETCH_REQUESTED 액션이 있을 수 있습니다.

#### watcher saga: 비동기 액션의 시작점이 되는 패턴 등록

FETCH_REQUESTED 액션을 dispatch 하는 버튼이 있고, 서버로부터 받은 데이터를 fetch 시키는 비동기 액션의 태스크를 실행할 수 있도록 saga에 패턴을 다음과 같이 등록합니다.

```js
import { takeEvery } from "redux-saga/effects";

function* watchFetchData() {
  yield takeEvery("FETCH_REQUESTED", fetchData);
}
```

takeEvery는 동시에 시작되는 여러 개의 fetchData instance들을 허용합니다. 이 순간에 이전의 하나 혹은 더 많은 아직 제거되지 않은 fetchData 작업들이 아직 있는 동안 새로운 fetchData 작업을 시작합니다.

만약에 단지 가장 마지막에 발생된 request의 response를 얻고 싶다면(예를 들어 항상 데이터의 가장 마지막 버전을 보여주는 것), takeLatest helper를 사용할 수 있습니다.

```js
import { takeLatest } from "redux-saga/effects";

function* watchFetchData() {
  yield takeLatest("FETCH_REQUESTED", fetchData);
}
```

takeEvery와는 다르게, takeLatest는 어떤 순간에 실행되는 단 하나의 fetchData 작업만 허용합니다. 그리고 이것은 가장 마지막에 시작되었던 작업일 것입니다. 만약 다른 fetchData 작업이 시작되었을 때 이전의 작업이 여전히 실행 중이라면, 이전의 작업은 자동적으로 취소됩니다.

#### worker saga: 비동기 액션을 수행하는 태스크

등록된 태스크를 실행해서 액션을 핸들링 해봅시다.

```js
import { call, put } from "redux-saga/effects";

export function* fetchData(action) {
  try {
    const data = yield call(Api.fetchUser, action.payload.url);
    yield put({ type: "FETCH_SUCCEEDED", data });
  } catch (error) {
    yield put({ type: "FETCH_FAILED", error });
  }
}
```

## 정리

비동기 처리 같은 단순하지 않은 작업들은 saga에 만들어 놓을 수 있습니다. 누군가 발생시킨 액션중 일치하는 saga와 연결된 액션타입이 있으면 해당 saga를 실행시켜 처리 합니다. api 호출등의 비동기 처리 로직이 작성된 제너레이터 함수를 saga와 연결하는여 액션을 계속 리스닝할 수 있습니다. 일치하는 액션(타입)이 발생할 때 해당 제너레이터 함수를 실행시키고 다음 액션객체를 디스패치(put)하여 리듀서로 전달합니다.

또한, React + Redux만으로는 아직 불편한 경우가 많습니다. 'Reducer 안에 부작용이 생길 처리를 써선 안된다' 라는 원칙이 있기 때문입니다.

- 같은 입력에 대해 확률적으로 다른 결과가 나오는 처리
- 지연처리
- HTTP 리퀘스트 처리

이런 것들은 기본적으로 순수함수를 추구하는 Reducer 안에서 쓸 수가 없습니다. 그럼 대안은 어디가 있을까요? 다음과 같은 곳에 처리하는게 좋을까요?

- Component 안
- Action Creator 안
- mapDispatchToProps 안

지금까지 redux만 사용하는 경우, 스토어와 디스패치를 연결하기 위해 connect를 사용하였습니다. '연결된 Component로부터 action이 dispatch되면 그 Reducer를 향한다'라고만 하였는데, 여기에 새로운 방법을 제시하는 것이 Saga 입니다. Saga는 제너레이터 함수이기 때문에, 비동기처리를 간단히 다룰 수 있습니다.

- yield take(ACTION_TYPE)으로 지정한 action의 발생을 감시한다
- 가져온 action을 구워먹고 삶아먹고 마음대로 할 수 있다
- yield put(action)의 결과를 다른 action으로 내보낼 수 있다
  기본적으론 이런 것들이 가능합니다. 내보낸 action은 Reducer를 향하게도 할 수 있고 자기 자신의 Saga에게 다시 올 수도 있고 자기 외의 다른 Saga에 보낼 수 있을지도 모릅니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://meetup.toast.com/posts/140
- https://wkdtjsgur100.github.io/redux-saga/
