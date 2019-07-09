---
layout: post
title: 
categories: React
categories: TODO
---

https://medium.com/@ca3rot/%EC%95%84%EB%A7%88-%EC%9D%B4%EA%B2%8C-%EC%A0%9C%EC%9D%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-%EC%89%AC%EC%9A%B8%EA%B1%B8%EC%9A%94-react-redux-%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%9D%98-%EC%9D%B4%ED%95%B4-1585e911a0a6

## react-redux
Store가 가진 state를 어떻게 props에 엮을 지 정한다(이 동작을 정의하는 함수는 mapStateToProps라고 불립니다)
Reducer에 action을 알리는 함수 dispatch를 어떻게 props에 엮을 지 정한다(이 동작을 정의하는 함수는 mapDispatchToProps라고 불립니다)
위에 두가지가 적용된 props를 받을 Component를 정한다
Store와 Reducer를 연결시킬 수 있도록 만들어진 Component가 반환값이 된다

```js
// functional component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addValue } from './actions';
​
const Counter = ({ value, dispatchAddValue }) => (
    <div>
        Value: {value}
        <a href="#" onClick={e => dispatchAddValue(1)}>+1</a>
        <a href="#" onClick={e => dispatchAddValue(2)}>+2</a>
    </div>
);
​
export default connect(
    state => ({ value: state.value }),
    dispatch => ({ dispatchAddValue: amount => dispatch(addValue(amount)) })
)(Counter)



// class component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addValue } from './actions';
​
class Counter extends Component {
    render() {
        const { value, dispatchAddValue } = this.props;
        return (
            <div>
                Value: {value}
                <a href="#" onClick={e => dispatchAddValue(1)}>+1</a>
                <a href="#" onClick={e => dispatchAddValue(2)}>+2</a>
            </div>
        );
    }
}
​
export default connect(
    state => ({ value: state.value }),
    dispatch => ({ dispatchAddValue: amount => dispatch(addValue(amount)) })
)(Counter)
```

## redux

```js
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();
const reduxDevTools = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__;

const composeMiddlewares = (() => {
  const middlewares = [applyMiddleware(sagaMiddleware)];
  if (reduxDevTools) middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  return middlewares;
})();

// Add a middleware
const enhancer = compose.apply(null, composeMiddlewares);

export default function configureStore() {
  const store = ((initialState = {}) => ({
    ...createStore(reducers, initialState, enhancer),
    runSaga: sagaMiddleware.run,
  }))();

  store.runSaga(rootSaga);

  return store;
}

```
----
해당 내용은 다음 글을 참고 하였습니다.
- 