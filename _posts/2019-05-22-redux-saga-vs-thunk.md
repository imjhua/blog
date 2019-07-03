---
layout: post
title: 비동기 처리 redux-thunk 와 redux-saga 비교 
categories: React
categories: TODO
---

리덕스를 사용하면 데이터를 처리하는 비즈니스 로직을 컴포넌트로부터 분리할 수 있습니다.액션 생성자 함수에서 API 호출 같은 비동기 프로세스 구현을 위해 사용하는 리덕스 미들웨어로, redux-thunk 와 redux-saga 미들웨어가 있습니다. 구현의 측면에서는, Redux-Thunk 와 Redux-Saga는 많이 다릅니다. 하지만 미들웨어를 을 다루는 부분에서는 상당히 흡사합니다. 그러나 같지는 않습니다. 이들이 다른 몇 가지 중요한 점을 정리해보겠습니다. 


## thunk (redux-thunk)
thunk는 비동기 처리를 위해 Promise를 사용하면 resolve시점(성공)에서 객체를 직접 리턴 할 수 없다는 단점을 보안하여 비동기 처리를 할때 액션 객체를 반환하는 대신 dispatch를 인자로 하는 함수를 리턴합니다. dispatch를 인자로 하는 함수를 리턴하면 이 함수 안에서 데이터 패치를 비롯한 네트워킹, 다수의 디스패치 등을 할 수 있습니다. 이를 사용하여 비동기 작업을 관리하는건 매우 직관적이고 간단합니다. 비동기 액션 처리의 대안으로 많이 사용됩니다. 주의할 점은, 클로저 패턴을 사용해야 하기에 복잡하고 어려울 수 있습니다.

### thunk 란?
thunk란, 특정 작업을 나중에 하도록 미루기 위해서 함수형태로 감싼것을 칭합니다.

```js
const x = 1 + 2; // 이 코드가 실행되면 1 + 2 의 연산이 바로 진행됩니다.
const foo = () => 1 + 2; //1 + 2 의 연산이 코드가 실행 될 때 바로 이뤄지지 않고 나중에 foo() 가 호출 되어야만 이뤄집니다.
```


### 작동방식
간단합니다. redux-thunk 미들웨어에서, 전달받은 액션이 함수 형태 일 때, 그 함수에 dispatch 와 getState 를 넣어서 실행해줍니다.

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

리덕스에서는 기본적으로는 액션 객체를 디스패치합니다. 일반 액션 생성자는, 다음과 같이 파라미터를 가지고 액션 객체를 생성하는 작업만합니다.

```js
const actionCreator = (payload) => ({action: 'ACTION', payload});
```

### 구조
추가적으로 표준 액션들을 디스패치할 때, Redux-Thunk 미들웨어는 thunks라고 불리는 특별한 함수를 디스패치하는 것을 허락합니다. Thunks(in Redux)는 일반적으로 다음 구조를 가집니다.

```js
export const thunkName = parameters => (dispatch, getState) => {
  // 당신의 어플리케이션 로직을 여기에 적으세요
};
```
thunk는 (선택적으로) 몇 가지의 parameters를 인수로 취하고 또 다른 함수를 return하는 함수입니다. 내부 함수는 dispatch 함수와 getState함수를 사용합니다. 두 함수다 Redux-Thunk 미들웨어에서 제공받습니다.


### 적용
만약에 특정 액션이 몇초뒤에 실행되게 하거나, 현재 상태에 따라 아예 액션이 무시되게 하려면, 액션객체만을 생성하는 일반 액션 생성자로는 할 수가 없습니다. 하지만, redux-thunk 미들웨어를 사용하면 가능합니다. `thunk는 객체 대신 함수를 생성하는 액션 생성함수를 작성` 할 수 있기 때문입니다. 다음 예제 코드를 살펴 봅시다.

```js
// store.dispatch(incrementAsync()); 로 호출하면
// 1초뒤 액션이 디스패치 됨
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function incrementAsync() {
  return dispatch => { // dispatch 를 파라미터로 가지는 함수를 리턴합니다.
    setTimeout(() => {
      // 1 초뒤 dispatch 합니다
      dispatch(increment());
    }, 1000);
  };
}


// store.dispatch(incrementIfOdd()); 로 호출하면
// 조건에 따라 액션을 디스패치하거나 무시함
function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

```

### 사용 예

axios를 이용한 비동기 API 호출을 사용 하는 예는 다음과 같습니다.

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

타입스크립트가 적용된 또다른 예제 입니다.

```js
import * as api from 'api';
import {loginRequest, loginSuccess, loginFailure} from "./loginActions';

export const loginThunk =
  (name: string, password: string)=>
    (dispatch: Function)=>{
        dispatch(loginRequest());
        try{
          api.login(name, passwrod);
        }
        catch(err){
          dispatch(loginFailure(err));
          return;
        }
        dispatch(loginSuccess();)
    };

```


### 단점
클로저 패턴으로 사용되어 복잡하고 여럽습니다. 액션의 입장에서는, 액션을 생성할 뿐아니라 비동기에 대한 처리를 함께 해주어야 하기 때문에 액션을 생성하는 일과 더불어 추가적인 일을 해야 합니다.

## saga (redux-saga)
Redux-Saga 미들웨어는 sagas라고 불리는 순수함수로 복잡한 어플리케이션 로직을 표현할 수 있게 해줍니다. 순수 함수는 테스트 관점에서 바람직합니다. 왜냐하면, 상대적으로 테스트가 쉽고 반복적이고 예측가능하기 때문입니다.

Sagas는 generator라고 불리는 특별한 함수로 구성되어져 있습니다. ES6의 새로운 특징인 generator함수는 기본적으로, yield구문을 본 때마다 안팎을 점프하며 실행됩니다. yield구문을 generatort가 멈추는 것과 yielded 된 value를 return 하는 것을 유발합니다. 후에 호출자는 yield를 따르는 구문에 generator를 재개할 수 있습니다.

### saga 란?
saga의 가장 큰 장점은 `action이 순수한 객체(Pure Object)만을 반환`한다는 것입니다. 비동기 처리 같은 단순하지 않은 작업들은 saga 에 만들어놓고 누군가 발생시킨 액션중 일치하는 saga와 연결된 액션타입이 있으면 해당 saga를 실행시켜 줍니다. 


### 특징
- 액션엔 비동기 작업이 아닌 단순히 리듀서와만 통신하는 액션들만 있다.
- API 통신을 하는 비동기 작업 같은 것들은 saga 에 작성한다. 
- 액션타입명-작성한 제너레이터 함수를 연결 해놓는데 이때 액션을 계속 리스닝하다가 일치하는 액션타입명이 발생할 때 잽싸게 해당 제너레이터 함수를 실행시킨다.
- 이 때 만약 data를 fetching 하는 비동기 액션이 였다면, 내부적으로 다시 단순히 리듀서에 받아온 data를 넣어주는 단순히 리듀서와만 통신하는 액션 이제너레이터 함수 안에 존재 할 것이다.

### 적용

#### root saga
```js
// 단일 watcher saga를 호출
function* mySaga() {
  yield takeEvery("FETCH_DATA", getData);
}
export default mySaga;


// 여러개의 watcher saga를 호출
function* helloSaga() {
  yield takeEvery("USER_FETCH_REQUESTED", getData);
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
#### worker saga

```js
function* getData(action) {
   try {
      const data = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "FETCH_DATA_FULFILLED", data: data});
   } catch (e) {
      yield put({type: "FETCH_DATA_REJECTED", message: e.message});
   }
}
```

## 사용 예
loginSaga는 Redux-Saga에 의해 등록되고 그것은 즉각적으로 실행될 것입니다. 그러나 yield는 'LOGIN_REQUEST'가 store에 디스패처 되기 전까지 첫벉재 행에서 처리된 yield는 멈춰질 것입니다. 그 이후 실행이 계속됩니다.

```js
import * as api from "api";
import { LoginRequestAction, loginSuccess, loginFailure } from "./loginActions";

function* loginSaga() {
  const action: LoginRequestAction = yield take("LOGIN_REQUEST");
  const { name, password } = aciton.payload;
  try {
    yield call(api.login, name, password);
  } catch (err) {
    yield put(loginFailure(err));
    return;
  }
  yield put(loginSuccess());
}
```

## 정리
Redux-thunk와 Redux-saga는 둘 다 Redux의 미들웨어 라이브러리입니다. Redux 미들웨어는 dispatch()메소드를 통해 store로 가고 있는 액션을 가로채는 코드입니다.

두 방식의 가장 큰 차이점을 문장 구조라고 생각되지만 더 큰 차이점이 존재하는데, `Thunks는 절대로 action에 응답을 줄 수 없습니다.` 반면 Redux-Saga는 store를 구독하고 특정 작업이 디스패치 될 때 saga가 실행되도록 유발할 수 있습니다.


----
해당 내용은 다음 글을 참고 하였습니다.
- https://medium.com/@han7096/redux-saga%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC-5e39b72380af


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




## 정리

보통의 액션생성자는 그냥 하나의 액션객체를 생성 할 뿐이지만 redux-thunk 를 통해 만든 액션생성자는 그 내부에서 여러가지 작업을 할 수 있습니다. 이 곳에서 네트워크 요청을 해도 무방하죠. 또한, 이 안에서 액션을 여러번 디스패치 할 수도 있습니다.
----
해당 내용은 다음 글을 참고 하였습니다.
- https://meetup.toast.com/posts/140
- https://velopert.com/3401