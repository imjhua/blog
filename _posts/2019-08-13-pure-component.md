---
layout: post
title: React PureComponent
categories: React
categories: TODO
---


이것은 React.memo ()가하는 일과 정확히 일치하기 때문에 의미가 있습니다! 예정된 렌더링이 이전 렌더링과 다른지 확인하십시오. 동일한 경우 이전을 유지하십시오.

이 질문은 트위터에서도 요청되었으며 Dan은 왜 PureComponent가 memo아닌 pure다른 이유를 설명했습니다 .

https://scotch.io/tutorials/react-166-reactmemo-for-functional-components-rendering-control


React 컴포넌트를 사용하면 UI를 독립적이고 재사용할 수 있는 부분으로 나누고 각 부분을 분리하여 생각할 수 있습니다. React컴포넌트는 일반 Component와, PureComponent로 세부적으로 나누어 정의 할 수 있습니다. 성능을 최적화 하는데 활용되는 PureComponent에 대해 알아보겠습니다. 순수함수가 무엇인지, 어떻게 사용하는지, 왜 우리가 사용해야 하는지에 대해서요.

## PureComponent
Component는 props와 state를 가집니다. 컴포넌트가 동일한 props와 state라는 전제 하에 동일한 결과 값이 확실히 반환된다면 우리는 이 컴포넌트를 순수하다고(pure) 말합니다. pureComponent의 좋은 예가 함수형 컴포넌트입니다.

컴포넌트들은 shouldComponentUpdate라는 메소드를 가지고 있습니다. 컴포넌트의 생명주기(LifeCycle)에서 shouldComponentUpdate를 호출하고 이것은 state가 변경되거나 부모 컴포넌트로부터 새로운 props를 전달받을 때 실행됩니다. React는 이 메소드(shouldComponentUpdate)의 반환 값에 따라서 re-render를 할지에 대한 여부를 결정하게 됩니다. shouldComponentUpdate함수를 어떻게 수행하느냐에 따라 순수컴포넌트(PureComponent) 는 일반컴포넌트(Component)의 구분이 생깁니다. 모든 것은 동일하게 동작합니다. 

즉, 순수 컴포넌트와 일반 컴포넌트를 구분하자면 클래스형 컴포넌트의 생명주기(LifeCycle) 의 shouldComponentUpdate 함수를 다뤄준다는 점입니다. 

## Component vs PureComponent
컴포넌트를 구성하는데 상속받는 두가지 타입이 존재 합니다. 각각에서는 shouldComponentUpdate를 어떻게 처리하느냐에 따라 차이가 있는데, 이를 통해 pureComponent를 더 자세히 이해해 보겠습니다.

#### 일반컴포넌트(Component)
기본적으로 shouldComponentUpdate 메소드는 true를 반환합니다. Component 는 바뀔값과 현재 값을 비교 해주지 않으므로 컴포넌트가 변경되면 불필요한 `매번, 항상` 렌더링을 다시 수행하게 됩니다. React 개발자는 re-render를 원하지 않는 경우에, 이 return value를 false로 오버라이드 할 수 있습니다.

#### 순수컴포넌트(PureComponent)
일반 컴포넌트에서 props 혹은 state 가 변경되지 않아도, 매번 불필요한 렌더링을 하는 것은 비효율적입니다. 이때 순수컴포넌트를 사용하면 얕은 비교(shallow comparison)를 수행하여 리렌더링을 할지 결정합니다. 즉, props 혹은 state 가 변경될 때, 바뀔값과 현재값을 참조값만 비교하여 리렌더링을 하는 것 입니다. 주의할 점은, 얕은 비교를 수행하는 것 이기 때문에 state/props가 복잡한 자료구조이거나, 새롭게 변형된다면 의도한대로 결과를 얻지 못할 수 있습니다.


참고) 얕은 비교(shallow comparison)란: 모든 object의 key/value 쌍을 반복적으로 비교하는 대신 object의 참조자만 비교하는 것.

## 주의사항
React.PureComponent의 shouldComponentUpdate()는 컴포넌트의 하위 트리에 대한 props 갱신 작업을 수행하지 않습니다. 자식 컴포넌트들이 "순수"한지 꼭 확인하여야 합니다.

## 사용법

### 클래스형 컴포넌트
컴포넌트 구현시 pureComponent상속받습니다.

```js
class Greeting extends React.pureComponent {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
### 함수형 컴포넌트
함수형 컴포넌트에서는 pureComponent상속받는 대신, 고차 컴포넌트인 React.memo(React 16.6)를 사용합니다. pureComponent처럼 동작하는 것이지 동일하지는 않습니다.

```js
const MyComponent = React.memo(function MyComponent(props) {
  /* props를 사용하여 렌더링 */
});

```

#### React.memo
React 16.6에 도입된 기능입니다. 함수형 컴포넌트가 동일한 props로 동일한 결과를 렌더링한다면 React.memo를 호출하고 결과를 메모이징 하도록 래핑하여 경우에 따라 성능 향상을 누릴 수 있습니다. 리렌더링 대신 마지막으로 렌더링 된 결과를 재 사용하게 됩니다. 마찬가지로 얕은 비교만을 수행하기 때문에, 다른 비교 동작을 원한다면 두번째 인자로 별도의 비교 함수를 제공할 수 있습니다. 이것이 바로 shouldComponentUpdate를 사용하는 것과 같은 동작입니다. shouldComponentUpdate가 true를 리턴해야하는 동안 'areEqual'함수는 렌더링을 계속하기 위해 false를 리턴합니다. 이는 'areEqual'은 'shouldComponentUpdate'와 반대입니다. 다른 하나는 원하는대로 'areEqual'함수의 이름을 지정할 수 있습니다.


```js
const areEqual = (prevProps, nextProps) => {
  return (prevProps.title === nextProps.title)
};
React.memo(SubComp, areEqual);
```

## 정리
React.PureComponent는 React.Component와 비슷합니다. React.Component는 shouldComponentUpdate()를 구현하지 않지만, React.PureComponent는 props와 state를 이용한 얕은 비교를 구현한다는 차이점만이 존재합니다. React 컴포넌트의 render() 함수가 동일한 props와 state에 대하여 동일한 결과를 렌더링한다면, React.PureComponent를 사용하여 경우에 따라 성능 향상을 누릴 수 있습니다.

props 혹은 state 가 변경될 때, 항상 렌더링을 수행하지 않고, 얕은 비교를 하므로서 불필요한 리렌더링을 없앨 수 있습니다. 일반 컴포넌트를 사용했을 때 보다 얻을 수 있는 성능상의 이득에 기인하여 순수 컴포넌트를 사용합니다. React.PureComponent는 성능을 최적화하는 데 활용됩니다. 여러분이 성능상의 이슈에 맞닥뜨리지 않는 한 이 컴포넌트를 사용해야 하는지 고려해 볼 이유는 없습니다.

또한, 컴포넌트가 복잡하 자료구조 인경우 얕은 비교로는 값의 변경에 대해 알 수 없으므로, props와 state의 구조가 간단할 것으로 예상될 때에만 PureComponent를 사용하는 것이 좋겠습니다. 


----
해당 내용은 다음 글을 참고 하였습니다.
- https://code.tutsplus.com/ko/tutorials/stateful-vs-stateless-functional-components-in-react--cms-29541
- https://www.vobour.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%B4%ED%95%B4-%EA%B8%B0%EC%B4%88-component-vs-purecomp
- https://ko.reactjs.org/docs/react-api.html