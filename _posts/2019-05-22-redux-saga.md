


Redux-Saga는 처음부터 사이드 이펙트를 관리하기 위해 만들어졌다. 리덕스가 처음 나왔을 때, 액션 생성자와 리듀서는 순수해야 하는데 사이드 이펙트는 어떻게 처리하는가에 대한 많은 의견이 있었다. 그리고 Redux-Saga가 등장했다.

### Saga

Saga에 대해 조금 알아보니 Sagas라는 논문이 있었고, GOTO 컨퍼런스-2015에 "Applying Saga Pattern"이라는 발표가 있었다. 요약해보면 Saga는 어떤 시스템에서의 장기(Long lived) 트랜잭션과 그 실패 처리를 어떻게 관리할지에 대한 방법이다. 하지만 MSDN의 "A Saga on Sagas"에서는 조금 다르다. CQRS 패턴의 프로세스 매니저로 생각한다. 작업을 효율적으로 처리하는 것 그 자체에 더 관심이 있다. Redux-Saga에서는 위 3가지에서 모두 영감을 받았다고 한다. 다만 개인적으로 Redux-Saga의 Saga는 MSDN의 Saga와 더 유사하다고 생각한다. Saga는 각 작업을 어떻게 관리할지에 대해 더 관심을 둔다.



즉,
실제 서비스 로직들은 모두 Saga 내부에서 처리하며, 그 결과를 다시 액션으로 발행(dispatch)한다. 이 외의 모든 것들 - 예약 버튼이나 예약 결과를 보여주는 컴포넌트, 액션, 액션 생성자, 리듀서 모두 순수 함수로 사이드 이펙트없이 구현할 수 있다.



이펙트는 Redux-Saga의 가장 중심이 되는 특징이다. 마치 Redux의 Action처럼 단순한, 일반적인 객체인데 개발자에겐 어마어마한 마법을 보여준다. 그리고 대부분의 서비스 로직을 이 이펙트로 작성한다. 

제너레이터함수 - Caller와 Callee
제너레이터함수는 Callee, 이를 호출하는 함수는 Caller다.
Caller는 Callee가 반환한 제너레이터를 가지고 로직을 수행한다.
Caller는 Callee의 yield 지점에서 다음 진행 여부/시점을 제어한다.
Caller는 Callee를 호출하는 책임뿐 아니라 Callee 내부 로직 수행에 대한 제어권을 갖는다(더 진행하지 않거나, 에러를 발생시킬 수도 있다). 흔히 Caller를 Runner라는 이름으로 부르기도 하는데, 이전에 우리 위클리에서 작성했던 "Generator in Practice - [1부] 기본 속성과 Runner"를 한번 읽어보자. (제너레이터 자체에도 관심이 있다면 "ES6의 제너레이터를 사용한 비동기 프로그래밍" 글도 읽어보길 추천한다.)

Redux-Saga 입장으로 보면 미들웨어는 Caller이고, 우리가 작성한 Saga는 Callee다.

Redux-Saga와 제너레이터
  
지금까지 제너레이터함수, Caller(=Runner)와 Callee에 대해 간단히 알아보았다. 그리고 Redux-Saga에서 말하는 Saga는 바로 제너레이터함수다. 그럼 왜 Saga를 제너레이터함수로 구현할까? 이는 곧 Redux-Saga가 이펙트라 부르는 것들을 어떻게 만들고 사용하는지와 연관된다. 우리가 Redux-Saga를 사용한다는 것은 곧 Redux-Saga 미들웨어에 우리의 Saga를 등록하고 수행시킨다는 뜻이다. 미들웨어는 Saga를 끊임없이 동작시킨다.


```js
main.js
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(mySaga)

// render the application
```

### 사이드 이팩트
redux-saga는 애플리케이션의 "부작용"들(데이터 요청(fetch) 등의 비동기 작업, 브라우저 캐시 같은 순수하지 않은 것들)을 쉽게 관리하고 효과적으로 실행하고 간단한 테스트와 쉬운 실패 처리를 목적으로 한다.
프로그래밍 혹은 컴퓨터 과학이라는 범주에서도 다시 사이드 이펙트의 정의는 여러 가지가 있을 수 있지만, 자바스크립트 관점에서 보면 사이드 이펙트는 (자바스크립트) 코드가 외부 세계에 영향을 주거나 받는 것이다. 조금 모호하지만 함수 관점으로 생각하면 조금 더 명확하다. 함수가 일관된 결과를 보장하지 못하거나, 함수 외부 어디든지 조금이라도 영향을 주는 경우 모두 사이드 이펙트를 갖는 것이라 할 수 있다. 다만 외부 세계라는 것을 딱 잘라 정의하기에는 어렵다. 코드의 바깥(outer) 스코프도 외부 세계라 할 수 있고, 사용자의 액션이나 네트워크 통신 역시 당연히 외부 세계라 할 수 있다.



### 이팩트

이펙트는 미들웨어에 의해 수행되는 명령을 담고 있는 자바스크립트 객체라고 생각하면 된다. 앞서 잠깐 살펴본 call이나 put 모두 이펙트 생성자고, 생성된 이펙트는 모두 일반 자바스크립트 객체일 뿐이다. 이펙트 생성자는 항상 일반 객체를 만들기만 하고, 어느 다른 동작도 수행하지 않는다. Saga는 명령을 담고 있는, 이펙트라 부르는 순수한 객체를 yield 할 것이고, 미들웨어는 이런 명령들을 해석해 처리하고, 그 결과를 다시 Saga에 돌려준다. 예를 들어 call(fn, arg1, arg2) 이펙트를 Saga에서 yield 했다면, 미들웨어는 fn(arg1, arg2);으로 수행하고 그 결과를 다시 Saga에 전달한다.



### 먼저 우리는 비동기 액션을 실행하는 task를 만듭니다.
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


그리고 FETCH_REQUEST 액션을 수행할 때마다 위의 task를 수행하려면:

import { takeEvery } from 'redux-saga/effects'

function* watchFetchData() {
  yield takeEvery('FETCH_REQUESTED', fetchData)
}

위의 예제에서, takeEvery는 동시에 시작되는 여러 개의 fetchData instance들을 허용합니다. 이 순간에 이전의 하나 혹은 더 많은 아직 제거되지 않은 fetchData 작업들이 아직 있는 동안 새로운 fetchData 작업을 시작합니다.

만약에 단지 가장 마지막에 발생된 request의 response를 얻고 싶다면(예를 들어 항상 데이터의 가장 마지막 버전을 보여주는 것), takeLatest helper를 사용하면 됩니다.

import { takeLatest } from 'redux-saga/effects'

function* watchFetchData() {
  yield takeLatest('FETCH_REQUESTED', fetchData)
}
takeEvery와는 다르게, takeLatest는 어떤 순간에 실행되는 단 하나의 fetchData 작업만 허용합니다. 그리고 이것은 가장 마지막에 시작되었던 작업일 것입니다. 만약 다른 fetchData 작업이 시작되었을 때 이전의 작업이 여전히 실행 중이라면, 이전의 작업은 자동적으로 취소됩니다.

서로 다른 액션들을 보고 있는 여러개의 saga들을 가지고 있다면, 이것들을 함께 실행하는데 사용되는 fork 같은 일을하는 built-in helper들로 여러개의 watcher를 만들 수 있습니다.(나중에 fork에 대해 얘기할 것입니다. 지금은 백그라운드에서 여러개의 saga들을 시작하는 것을 허용하는 이펙트 가 있다고 생각하세요.)



서로 다른 액션ㅇ들을 보고 있는 여러개의 saga 들을 가지고 있다면 이것들을 함꼐 실행하는데 사용되는 wather(fork같은 일을하는 built-in helper들)를 만들 수 있따. 


- https://meetup.toast.com/posts/140
-  https://wkdtjsgur100.github.io/redux-saga/
