---
layout: post
title: Testing the Saga Generator Function
categories: TODO
---


Redux-Saga는 react 애플리케이션의 비동기 처리시 발생할 수 있는 사이드 이펙트를 관리하기 위해 만들어진 라이브러리 입니다. Saga 이펙트는 일반 자바스크립트 객체를 반환합니다. 이 객체들은 이펙트를 표현 또는 설명하고, redux-saga는 이를 실행합니다. 마찬가지로 테스트 또한 yield된 객체를 우리가 원하는 이펙트를 설명하는지 비교하면 되니, 쉽게 테스트를 할 수 있습니다.



## 이펙트
Saga에서 많이 사용되는 이펙트들을 다시 정리해 봅니다.

- select: store에 저장된 데이터를 미들웨어에서 사용할 수 있도록 한다.
- put store에 Action을 디스패치 한다.
- call: 주어진 함수를 호출한다. 

## 테스트 


```js

const CHOOSE_COLOR = 'CHOOSE_COLOR';
const CHANGE_UI = 'CHANGE_UI';

const chooseColor = (color) => ({
  type: CHOOSE_COLOR,
  payload: {
    color,
  },
});

const changeUI = (color) => ({
  type: CHANGE_UI,
  payload: {
    color,
  },
});


function* changeColorSaga() {
  const action = yield take(CHOOSE_COLOR);
  yield put(changeUI(action.payload.color));
}

test('change color saga', assert => {
  const gen = changeColorSaga();

  assert.deepEqual(
    gen.next().value,
    take(CHOOSE_COLOR),
    'it should wait for a user to choose a color'
  );

  const color = 'red';
  assert.deepEqual(
    gen.next(chooseColor(color)).value,
    put(changeUI(color)),
    'it should dispatch an action to change the ui'
  );

  assert.deepEqual(
    gen.next().done,
    true,
    'it should be done'
  );

  assert.end();
});

```


## Branching Saga (사가 분기)
가끔씩 사가는 다른 결과를 가질 때가 있습니다. 사가의 모든 단계를 다시 반복하지 않고 분기하려면 cloneableGenerator 유틸리티 함수를 사용하세요.

```js

test('doStuffThenChangeColor', assert => {

  assert.test('user choose an even number', a => {
    a.equal( .. );
    a.end();
  });
});

```


```js

function* doStuffThenChangeColor() {
  yield put(doStuff());
  yield put(doStuff());
  const action = yield take(CHOOSE_NUMBER);
  if (action.payload.number % 2 === 0) {
    yield put(changeUI('red'));
  } else {
    yield put(changeUI('blue'));
  }
}

import { put, take } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

test('doStuffThenChangeColor', assert => {
  const data = {};
  data.gen = cloneableGenerator(doStuffThenChangeColor)();

  assert.deepEqual(
    data.gen.next().value,
    put(doStuff()),
    'it should do stuff'
  );

  assert.deepEqual(
    data.gen.next().value,
    put(doStuff()),
    'it should do stuff'
  );

  assert.deepEqual(
    data.gen.next().value,
    take(CHOOSE_NUMBER),
    'should wait for the user to give a number'
  );

  assert.test('user choose an even number', a => {
    // cloning the generator before sending data
    data.clone = data.gen.clone();
    a.deepEqual(
      data.gen.next(chooseNumber(2)).value,
      put(changeUI('red')),
      'should change the color to red'
    );

    a.equal(
      data.gen.next().done,
      true,
      'it should be done'
    );

    a.end();
  });

  assert.test('user choose an odd number', a => {
    a.deepEqual(
      data.clone.next(chooseNumber(3)).value,
      put(changeUI('blue')),
      'should change the color to blue'
    );

    a.equal(
      data.clone.next().done,
      true,
      'it should be done'
    );

    a.end();
  });
});
```


Suppose we have a basic saga which calls an HTTP API:


```js

function* callApi(url) {
  const someValue = yield select(somethingFromState);
  try {
    const result = yield call(myApi, url, someValue);
    yield put(success(result.json()));
    return result.status;
  } catch (e) {
    yield put(error(e));
    return -1;
  }
}

// We can run the saga with mocked values:
const dispatched = [];

const saga = runSaga({
  dispatch: (action) => dispatched.push(action),
  getState: () => ({ value: 'test' }),
}, callApi, 'http://url');

// A test could then be written to assert the dispatched actions and mock calls:

import sinon from 'sinon';
import * as api from './api';

test('callApi', async (assert) => {
  const dispatched = [];
  sinon.stub(api, 'myApi').callsFake(() => ({
    json: () => ({
      some: 'value'
    })
  }));
  const url = 'http://url';
  const result = await runSaga({
    dispatch: (action) => dispatched.push(action),
    getState: () => ({ state: 'test' }),
  }, callApi, url).toPromise();

  assert.true(myApi.calledWith(url, somethingFromState({ state: 'test' })));
  assert.deepEqual(dispatched, [success({ some: 'value' })]);
});
```















----
해당 내용은 다음 글을 참고 하였습니다.
- https://dev.to/phil/the-best-way-to-test-redux-sagas-4hib
- https://redux-saga.js.org/docs/advanced/Testing.html
- https://mskims.github.io/redux-saga-in-korean/advanced/Testing.html
