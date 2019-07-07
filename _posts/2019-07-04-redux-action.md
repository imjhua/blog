---
layout: post
title: redux-actions 를 통한 더 쉬운 액션관리 (createAction/)
categories: React
---

리덕스(Redux)에서, 액션을 만들다보면 드는 의문이 '이걸 굳이 하나하나 액션 생성자를 만들어야하나?' 입니다. redux-actions를 사용하면, createAction 을 통한 액션생성을 자동화할 수 있고, 리듀서에서 사용하는 swtich 문을 handleActions으로 더 쉽고 간편하게 작성할 수 있습니다. 

## redux-actions
redux-actions 패키지에는 리덕스의 액션들을 관리하기 위한 유용한 createAction 과 handleActions가 있습니다. 이 함수들이 어떤 기능을하는지 알아보도록 하겠습니다.

## createAction
보통의 액션을 생성하는 액션생성자는 다음과 같은 구조를 가집니다.

```js
export const increment = (payload) => ({
    type: types.INCREMENT,
    payload
});

export const decrement = (payload) => ({
    type: types.DECREMENT,
    payload
});
```


payload를 파라미터로 전달하여 액션 객체에 넣어주는것 뿐인데 이걸 자동화할수도 있지 않을까요? 먼저 액션 타입으로 액션 생성자를 만들고 액션생성자에 payload를 넘겨줍니다. createAction을 사용한다면 다음과 같이 자동화 시켜 줄 수 있습니다.

```js
// 1. 액션 타입으로 액션 생성자를 만든다.
export const increment = createAction(types.INCREMENT);
export const decrement = createAction(types.DECREMENT);
export const setColor = createAction(types.SET_COLOR);

// 2. 액션생성자에 payload를 넘겨준다.
increment(3);
/* 생성된 액션 객체는 다음과 같다.
{
    type: 'INCREMENT',
    payload: 5
}
*/

// 2. 액션생성자에 payload(object)를 넘겨준다.
setColor({index: 5, color: '#fff'});
/* 생성된 액션 객체는 다음과 같다.
{
    type: 'SET_COLOR',
    payload: {
        index: 5,
        color: '#fff'
    }
}
*/
```

 액션을 생성하는것을 자동화 할 수 있습니다. 다만, 단점으로는 코드를 봤을때 해당 액션생성자가 파라미터로 필요한 값이 뭔지 모르기때문에, 그 위에 주석을 작성해주어야 합니다.



## handleActions
리듀서에서 액션의 type 에 따라 다른 작업을 하기 위해서 switch문을 사용합니다. 하지만 switch문을 사용하게 되면 scope(유표 범위)가 리듀서 함수로 설정되어있다는것 중요한 단점이 있습니다. 이유는, switch문의 스코프는 case문이 아닌 swtich문이기 때문입니다. 그렇기 때문에 서로 다른 case 에서 let 이나 const 를 통하여 변수를 선언하려고 하다보면 같은 이름이 중첩될시엔 에러가 발생합니다. 이 문제를 해결해주는것이 바로 handleActions 입니다. 이 함수를 사용하면 다음과 같은 방식으로 해결 할 수 있습니다.

```js
const reducer = handleActions({
  INCREMENT: (state, action) => ({
    counter: state.counter + action.payload
  }),

  DECREMENT: (state, action) => ({
    counter: state.counter - action.payload
  })
}, { counter: 0 });
```
첫번째 파라미터로는 액션에 따라 실행 할 함수들을 가지고있는 객체, 두번째 파라미터로는 상태의 기본 값 (initialState) 를 넣어주면 됩니다.

## 정리
- 액션생성자 함수를 만들때 함수를 정의하는 번거로움 대신 createAction 사용하기
- switch 문을 작성하는 대신 handleActions 사용하기


----
해당 내용은 다음 글을 참고 하였습니다.
- https://velopert.com/3358