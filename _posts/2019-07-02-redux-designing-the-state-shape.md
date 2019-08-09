---
layout: post
title: Redux 상태 설계 하기 
categories: React
categories: TODO
---

https://medium.com/@ca3rot/%EC%95%84%EB%A7%88-%EC%9D%B4%EA%B2%8C-%EC%A0%9C%EC%9D%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-%EC%89%AC%EC%9A%B8%EA%B1%B8%EC%9A%94-react-redux-%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%9D%98-%EC%9D%B4%ED%95%B4-1585e911a0a6


## 소개
Redux에서 애플리케이션의 모든 상태는 하나의 객체에 저장됩니다. 어떤 코드건 작성하기 전에 동작하는 형태를 생각해보면 상태의 저장구조와 해야 하는 액션들이 명확해 질 수 있습니다. 

## 상태 설계

### 저장해야 하는 상태 정리
먼저 상태객체를 만들기 전, 어떤 표현이 가장 단순 할지 생각 해 봅니다.

할일 앱을 만들고자 한다면 아래 두 가지의 상태를 저장해야 할 것입니다.
- 현재 선택된 필터.
- 할일의 실제 목록.

개발을 하다 보면 종종 데이터 뿐만 아니라 UI상태도 상태 트리에 저장해야 하는 경우가 있습니다. 그래도 좋지만, 데이터는 UI상태와 분리하는 것이 좋습니다. 페이지의 상태를 저장하여 계속 활용하는 경우라면 상태트리에 저장하여 활용할 수 있습니다. 앱의 상태를 데이터베이스라고 생각하시면 됩니다.

```js
{
  visibilityFilter: 'SHOW_ALL',
  todos: [{
    text: 'Consider using Redux',
    completed: true,
  }, {
    text: 'Keep all state in a single tree',
    completed: false
  }]
}
```


액션 다루기
상태 객체가 어떻게 생겼는지 정했으니 리듀서를 작성해봅시다. 리듀서는 이전 상태와 액션을 받아서 다음 상태를 반환하는 순수 함수입니다.

절대로 리듀서 내에서 하지 말아야 할 것들은 다음과 같습니다.
인수들을 변경(mutate)하기;
API 호출이나 라우팅 전환같은 사이드이펙트를 일으키기;
Date.now()나 Math.random() 같이 순수하지 않은 함수를 호출하기.
사이드이펙트를 어떻게 일으키는지는 심화과정에서 확인하게 될겁니다. 지금은 리듀서가 반드시 순수해야 한다는 점만 기억해두세요. 인수가 주어지면, 다음 상태를 계산해서 반환하면 됩니다. 예기치 못한 일은 없어야 합니다. 사이드 이펙트도 없어야 합니다. API 호출도 안됩니다. 변경도 안됩니다. 계산만 가능합니다.

----
해당 내용은 다음 글을 참고 하였습니다.
- https://lunit.gitbook.io/redux-in-korean/basics/reducers#%EC%83%81%ED%83%9C-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0