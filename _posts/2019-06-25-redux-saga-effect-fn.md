---
layout: post
title: redux-saga 
categories: TODO
---

react 애플리케이션을 개발할 때 가장 어려운 부분은 아마도 사이드 이펙트를 처리하는 부분일 것입니다. 예를 들면 비동기 처리와 같은 데이터 패치(fetch)나 브라우저 캐시에 접근하는 등의 동작들이 있습니다. redux를 사용해봤다면 HTTP 리퀘스트나 타이머 같은 비동기 조작을 사용하여 상태를 변경할 때 문제를 겪어봤을 것입니다. Redux-Saga는 처음부터 이러한 사이드 이펙트를 관리하기 위해 만들어진 라이브러리 입니다. 


### 이펙트 함수

- take: 
- takeEvery: takeEvery는 동시에 시작되는 여러 개의 fetchData instance들을 허용
- all: 여러개의 이펙트를 처리한다.
- select: store에 저장된 데이터를 미들웨어에서 사용할 수 있도록 한다.
- put stor에 Action을 디스패치 한다.
- call: 주어진 함수를 호출한다. 

#### task()


take는 우리가 전에 봤던 call, put와 비슷합니다. 이는 특정한 액션을 기다리기 위해서 미들웨어에 알려주는 명령 오브젝트를 생성합니다. 
take를 사용하는 것은 우리의 코드 작성법에 작은 충격을 줍니다. takeEvery의 경우에, 실행된 태스크는 그들이 다시 실행될 때에 대한 관리 방법이 없습니다. 그저 각각의 매칭되는 액션에 실행되고, 또 실행되겠죠. 또한 그들은 언제 감시(observing)를 멈춰야 하는지에 대한 관리 방법도 없습니다.
take의 경우에는 컨트롤의 방향이 정반대입니다. 핸들러 태스크에 푸시(push)되고 있는 액션들 대신, 사가는 스스로 액션들을 풀링(pulling)합니다. 이는 사가가 일반 함수 콜을 하는 것처럼 보입니다. 액션이 dispatch되었을 때 resolve하는 action = getNextAction()처럼요.
풀 접근법의 다른 이점은 우리가 친숙한 동기적(synchronous) 스타일로 컨트롤 플로우를 표현할 수 있다는 것입니다. 예를 들어, 우리가 LOGIN 액션과 LOGOUT 액션을 이용하여 로그인 플로우를 실행시키고 싶다고 가정해봅시다. takeEvery(혹은 redux-thunk)을 이용했다면 LOGIN과 LOGOUT으로 나뉘어진 두 개의 태스크(혹은 썽크)를 작성해야 했을 것입니다.




```js
import { select, take } from 'redux-saga/effects'

function* watchAndLog() {
  while (true) {
    const action = yield take('*')
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  }
}

```



#### takeEvery()
takeEvery는 동시에 시작되는 여러 개의 fetchData instance들을 허용합니다. 이 순간에 이전의 하나 혹은 더 많은 아직 제거되지 않은 fetchData 작업들이 아직 있는 동안 새로운 fetchData 작업을 시작합니다. 





takeEvery는 비동기적으로 지속적으로 액션의 영향을 받는 작업에 쓰이고, take는 특정 기능구현이나, 동기적인 작업(?)에 쓰이는 경향이 강한것 같다.



```js
import { select, takeEvery } from 'redux-saga/effects'

function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  })
}

```
#### all()
#### all()
#### all()
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
