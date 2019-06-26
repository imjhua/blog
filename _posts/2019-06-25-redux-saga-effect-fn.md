---
layout: post
title: redux-saga 이펙트
categories: TODO
categorie: React
---

react 애플리케이션을 개발의 비동기 처리에 사용되는 saga!  saga가 제공하는 이펙트 함수들에 대해 알아봅시다.


### 이펙트
이펙트는 Redux-Saga의 가장 중심이 되는 특징입니다. 이펙트는 미들웨어에 의해 수행되는 명령을 담고 있는 자바스크립트 객체라고 생각할 수 있습니다. call이나 put 같은 이펙트 생성자를 통해 이펙트를 생성하고, 생성된 이펙트는 모두 일반 자바스크립트 객체일 뿐입니다. 이펙트 생성자는 항상 일반 객체를 만들기만 하고, 어느 다른 동작도 수행하지 않습니다. 

제너레이터 함수로 구성되어있는 saga들은 그 안에 명령을 담고 있는, 이펙트(takeEvery, call, put 등)라 부르는 순수한 객체를 yield 할 것이고, 미들웨어는 이런 명령들을 해석해 처리하고, 그 결과를 다시 Saga에 돌려줍니다. 

### 이펙트(effect) 함수
- take: 특정 액션이 디스패치되기를 기다린다. (pulling)
- takeEvery: 동시에 시작되는 여러개의 액션에 디스패치되기를 기다린다.
- all: 여러개의 이펙트를 처리한다.
- select: store에 저장된 데이터를 미들웨어에서 사용할 수 있도록 한다.
- put store에 Action을 디스패치 한다.
- call: 주어진 함수를 호출한다. 
- fork:	서브 프로세스를 트리거한 뒤 완료를 기다리지 않고 수행한다.
- cancel:	포크되었던 서브 프로세스를 취소한다.
- cancelled: 현재 프로세스가 켄슬되었었는지 확인한다.
- delay: 다음 구문으로 이동하기 전에 주어진 기간동안 대기한다, Promise를 리턴한다.

#### task()
task는 액션 감시 프로세스의 전체적인 제어를 가능하게 함으로써, 복잡한 데이터 컨트롤 플로우를 설계할 수 있게 합니다. 특정한 액션을 기다리기 위해서 미들웨어에 알려주는 명령 오브젝트를 생성하고 핸들러를 task에 push하여 스스로 액션들을 pulling합니다. saga가 일반 함수를 호출하는 것 처럼 보여집니다. 미들웨어가 매칭되는 액션이 dispatch될 때까지 기다립니다. 계속 pulling 하므로, synchronous의 비동기 스타일로 표현 됩니다. 예를 들어, 우리가 LOGIN 액션과 LOGOUT 액션을 이용하여 로그인 플로우를 실행시키고 싶다고 가정해봅시다. takeEvery(혹은 redux-thunk)을 이용했다면 LOGIN과 LOGOUT으로 나뉘어진 두 개의 태스크(혹은 썽크)를 작성해야 했을 것입니다. 즉, 동일한 액션에서 같은 동작을 하고 싶을 때 사용하면 유용합니다. 

* NonBlocking의 경우, 메서드 호출 후 호출되는 함수로 부터 바로 반환 받아서 다른 작업을 할 수 있게 되지만, 메서드 호출에 의해 수행되는 작업이 완료된 것은 아닙니다. Asynchronous의 경우 호출되는 함수의 작업이 완료되면 호출되는 함수가 전달받은 callback을 실행하면 되지만,NonBlocking+synchronous의 경우에는 호출하는 메서드가 호출되는 메서드 쪽에 작업 완료 여부를 계속 문의(pulling)합니다.


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
 위의 예에서, watchAndLog는 어떠한 한 액션이 dispatch될 때까지 기다릴 겁니다. 작성되어 있는 제너레이터 함수는 완료를 향해 달려가는(run-to-completion) 함수가 아닙니다. 제너레이터는 한 번 반복될 때마다 액션이 일어나기를 기다릴 것입니다.




//////////// 여리 아래 부터작업 필












take를 사용하는 것은 우리의 코드 작성법에 작은 충격을 줍니다. takeEvery의 경우에, 실행된 태스크는 그들이 다시 실행될 때에 대한 관리 방법이 없습니다. 그저 각각의 매칭되는 액션에 실행되고, 또 실행되겠죠. 또한 그들은 언제 감시(observing)를 멈춰야 하는지에 대한 관리 방법도 없습니다.

take의 경우에는 컨트롤의 방향이 정반대입니다. 핸들러 태스크에 푸시(push)되고 있는 액션들 대신, 사가는 스스로 액션들을 풀링(pulling)합니다. 이는 사가가 일반 함수 콜을 하는 것처럼 보입니다. 액션이 dispatch되었을 때 resolve하는 action = getNextAction()처럼요.

이 컨트롤의 전환은 특별한 컨트롤 플로우를 수행할 수 있게 합니다. 전통적인 액션의 푸시 접근법을 해결해주죠.

간단한 예로, Todo 어플리케이션에서 유저의 액션들을 watch하고 있다가, 유저가 세 개의 todo를 만들면 축하 메세지를 띄워봅시다.



#### takeEvery()

 각각의 액션에 새로운 태스크를 만들기 위해서


takeEvery는 동시에 시작되는 여러 개의 fetchData instance들을 허용합니다. 이 순간에 이전의 하나 혹은 더 많은 아직 제거되지 않은 fetchData 작업들이 아직 있는 동안 새로운 fetchData 작업을 시작합니다. 



takeEvery의 경우에, 실행된 태스크는 그들이 다시 실행될 때에 대한 관리 방법이 없습니다. 그저 각각의 매칭되는 액션에 실행되고, 또 실행됩니다. 또 언제 감시(observing)를 멈춰야 하는지에 대한 관리 방법이 없습니다.


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


여러개의 이펙트를 처리 하기 위해 all을 다음과 같이 활용합니다. promise all 과 동일하게 동작합니다.


mainSaga 내에 여러 개의 사가가 있는 경우 call을 사용하면  사가가 완료될 때까지 블록이 됩니다. 따라서 이때에는 fork를 사용하는 것이 좋습니다.


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

#### select()
셀렉터를 사용하여 기존 애플리케이션 상태의 일부를 얻어온다
#### put()
	redux 스토어에 액션을 디스패치한다
  put을 사용하여 디스패치해야하는 액션을 알려주자.
#### call()
다른 saga들이나 promise 등을 호출할 수 있다

call 이펙트는 미들웨어가 프로미스의 resolve를 기다리게 합니다.

#### fork()
mainSaga 내에 여러 개의 사가가 있는 경우 call 대신 fork를 사용해야 한다. 왜냐하면 fork는 saga를 호출하고 다음 스텝으로 이동하도록 디자인되어 있기 때문이다. call은 사가가 완료될 때까지 블록되기 때문이다.

#### cancel()
#### cancelled()
#### delay()

## 정리
즉, 비동기 처리 같은 단순하지 않은 작업들은 saga 에 만들어놓고 누군가 발생시킨 액션중 일치하는 saga와 연결된 액션타입이 있으면 해당 saga를 실행시켜 주는 것입니다. 액션타입명-작성한 제너레이터 함수를 연결 해놓는데 이때 액션을 계속 리스닝하다가 일치하는 액션타입명이 발생할 때 해당 제너레이터 함수를 실행시키고 다음 액션객체를 디스패치(put)하여 리듀서로 전달합니다.


#### 예제
```js

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

```

----
해당 내용은 다음 글을 참고 하였습니다.
- https://meetup.toast.com/posts/140
- https://wkdtjsgur100.github.io/redux-saga/
- https://mskims.github.io/redux-saga-in-korean/advanced/FutureActions.html
