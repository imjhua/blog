---
layout: post
title: Ducks Pattern
categories: React
categories: TODO
---


```js
// patyload를 받아 객체 생성
function makeActionCreator(actionType) {
  return payload => ({ type: actionType, payload })
}

// 비동기 처리에 대한 요청 타입이 세분화 된 액션 타입으로 액션 객체 생성
function makeAsyncActionCreator(actions) {
  let actionCreator = makeActionCreator(actions.INDEX)
  actionCreator.request = makeActionCreator(actions.REQUEST)
  actionCreator.success = makeActionCreator(actions.SUCCESS)
  actionCreator.fail = makeActionCreator(actions.FAIL)
  return actionCreator
}

export const fetchNotices = makeAsyncActionCreator(actionTypes.FETCH_NOTICES)
export const normalAction = makeActionCreator(actionTypes.NORMAL_ACTION)
```

Async한 Action의 명명 규칙을 넘어 일정한 형태로 자리잡게 되면, 반복되는 코드를 추출하는데에 꽤 도움이 됩니다.


----
해당 내용은 다음 글을 참고 하였습니다.
- https://medium.com/@FourwingsY/redux-redux-saga-%EB%A1%9C-async-%EB%8B%A4%EB%A3%A8%EA%B8%B0-b7b9a9110356