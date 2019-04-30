---
layout: post
title: React 컴포넌트 
tags:
 - react
categories: text
---

## 소개
react의 컴포넌트에 대해 알아보자. React 컴포넌트는 상태 값을 이용해 UI를 표현한다. 컴포넌트 상태는 객체의 인스턴스 속성(Properties)을 이용해 관리하며, 컴포넌트간에 단방향으로 데이터를 주고받는 props와 컴포넌트 내부에서 사용하는 state가 있다.

react에서는 컴포넌트의 생명주기가 각각 존재한다. 이를 통해 프로퍼티나 상태가 갱신되며 화면이 업데이트 된다. 컴포넌트들이 사용하는 디자인 패턴들도 존재한다. 리엑트는 간단하게 정의하면 UI를 위한 JS라이브러리로 표현할 수 있습니다. 이때 상태에 따라 화면은 바뀌게 되지요. 컴포넌트의 생명주기를 먼저 살펴보가 컴포넌트 구성 방법에 대해 알아 봅시다.

## Lifecycle(생명주기)
React 컴포넌트는 생명 주기가 있습니다. 컴포넌트가 실행되거나 업데이트되거나 제거될 때, 특정한 이벤트들이 발생합니다. 간략히 라이프 사이클 관련해서 확인해보면 5가지 정도가 있습니다.

UI를 구성하기 위해서는 화면에 컴포넌트를 그리고(Mounting), 갱신하고(Updating), 지워야(Unmounting) 합니다. 컴포넌트는 각 프로세스가 진행될 때에 따라 Lifecycle 함수로 불리는 특별한 함수가 실행됩니다. 개발자는 이를 재정의하여 컴포넌트를 제어하게 됩니다. 그러므로 Lifecycle 함수들을 완전하게 이해해야 할 필요가 있습니다. 프로세스와 세부 프로세스, 그리고 각 프로세스에 대응하는 Lifecycle 함수들을 살펴 봅시다.


### Mount
컴포넌트가 처음 실행될 때 그것을 Mount라고 표현합니다. 컴포넌트가 시작되면 
- state, context, defaultProps 저장 (Mount중이므로 값을 바꾸면 안됨)
- componentWillMount
- render (컴포넌트를 DOM에 부착)
- componentDidMount 
(Mount가 완료된 후 - 주로 AJAX 요청을 하거나, setTimeout, setInterval같은 행동을 함)


### Props Update
props가 업데이트될 때의 과정입니다. 업데이트되기 전에 업데이트 발생하였음을 감지하고 다음을 실행한다.
다음은 componentDidUpdate제외하고 첫 번째 인자로 바뀔 props에 대한 정보를 가지고 있다.
- componentWillReceiveProps
- shouldComponentUpdate (return false 로 렌더 요청을 취소 할 수 있다. 쓸데 없는 update걸러냄)
- componentWillUpdate 
(state를 바꿔서는 안 됨. 아직 업데이트가 완료되지 않았으므로 변경하면 또 호출 루틴을 타게 된다. )
- render (업데이트가 완료)
- componentDidUpdate (render이 완료되었기 때문에 DOM에 접근가능)

### State Update
setState 호출을 통해 state가 업데이트될 때의 과정입니다. props update와 과정이 같지만, componentWillReceiveProps 메소드는 호출되지 않습니다. 그리고 메소드의 두 번째 인자로는 바뀔 state에 대한 정보를 가지고 있습니다. componentDidUpdate는 두 번째 인자로 바뀌기 이전의 state에 대한 정보를 가지고 있습니다.
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate


### Unmount
컴포넌트가 제거되는 것은 Unmount라고 표현합니다. 더는 컴포넌트를 사용하지 않을 때 발생하는 이벤트가 있습니다. componentWillUnmount가 그것입니다. componentDidUnmount는 없습니다. 이미 제거된 컴포넌트에서 이벤트를 발생시킬 수는 없겠죠? componentWillMount에서 주로 연결했던 이벤트 리스너를 제거하는 등의 여러 가지 정리 활동을 합니다.


참고로 react 16.3 부터는 ..will.. 시점의 메소드는 사용을 지양하려 하는 것을 알 수 있었습니다. 리액트 17부터는 componentWillMount, componentWillUpdate, componentWillReceiveProps 라이프 사이클이 deprecated됩니다!


## 컴포넌트 구성
컴포넌트 활용시에는 쉽게 재사용할 수 있는 방법을 찾아야 합니다. 이를 위한 다양한 컴포넌트 구성의 디자인 패턴들이 존재합니다. 우리는 보여지는 역할과 상태변화에 대한 동작하는 역할을 나누어 컴포넌트를 구성하는 디자인 패턴에 대해 알아 보겠습니다. 각각 프레젠테이션 컴포넌트와 컨테이너 컴포넌트로 분리 할 수 있습니다. 먼저 프레젠테이션 컴포넌트를 만든 주고 받아야 할 속성 혹은 상태들을 고민해 봅니다. props를 사용하지 않고 자식 컴포넌트로 전달하는 역할만 하는 컴포넌트가 존재한다는 사실을 알게 될텐데, 이것이 바로 컨테이너 컴포넌트가 될 것입니다. 데이터나 아무 상관없는 중간 컴포넌트에 대해 걱정이 없는 leaf 컴포넌트의 행위가 담긴 props 를 얻을 수 있는 방법이 될 것입니다. 이 방법으로 컴포넌트를 작성하면 당신의 앱(기능)과 UI 에 대한 구분을 이해하기가 더 수월합니다. 재사용성이 뛰어나며 완전히 서로 다른 상태값과 함께 같은 프레젠테이션 컴포넌트를 사용할 수 있고, 재사용 될 수 있는 별도의 컨테이너 컴포넌트로 변경할 수 있습니다.

재사용성과 유지보수성을 높이기 위해서 컴포넌트를 다음 두 가지 종류로 나누어 생각할 수 있습니다. 

### 프레젠테이션 컴포넌트
프레젠테이션 컴포넌트는 말하자면 앱의 팔레트와 같습니다. 앱의 싱글페이지 위에서 앱의 로직을 건드리지 않고 디자이너에게 모든 변화를 조정하게 할 수 있으며 이것은 사이드바, 페이징, 컨텍스트메뉴와 같은 레이아웃 컴포넌트를 추출하도록 할것이고, 이것은 동일한 마크업이나 몇몇의 컨테이너 레이아웃을 반복해서 작성하는 대신 this.props.children 을 통해서 구현될 수 있습니다.


- 어떻게 보여지는지와 관련있다.
- 프레젠테이션 컴포넌트와 컨테이너 컴포넌트가 모두 그 안에 들어가 있을것(**)이고, 일부 DOM 마크업과 스타일도 가지고 있다.
- 종종 this.props.children 을 통해서 노출된다.
- Flux 액션이나 stores 등과 같은 앱의 나머지 부분들에 의존적이지 않다.
- 데이터를 가져오거나 변경하는 방법에 대해서 관여할 필요가 없다.
- props 를 통해 배타적으로 callback 함수와 데이터를 받는다.
- 상태를 거의 가지고 있지 않다(만약 상태를 가지고 있다면, 데이터에 관한 것이 아닌 UI 상태에 관한 것이다).
- 만약 상태, 생명주기, hooks, 또는 퍼포먼스 최적화가 필요없다면, 유틸함수로서 쓰여질것이다.
- 예를들면 페이지, 사이드바, 스토리, 유저정보, 리스트 등이 있다.

- JSX를 이용한 마크업이 존재합니다.
- render에 필요한 데이터는 이미 존재한다고 가정합니다.
- UI를 위한 state가 존재할 수 있습니다.

### 컨테이너 컴포넌트
컴포넌트는 DOM 을 생성하지 말아야 합니다. 컴포넌트는 단지 UI 와 관련된 것들을 조합하는 것을 제공하는 것이 필요합니다.

- 어떻게 동작하는지와 관련있다.
- 프레젠테이션 컴포넌트와 마찬가지로 프레젠테이션 컴포넌트와 컨테이너 컴포넌트 모두 가지고 있지만 감싼 divs 를 제외하고는 DOM 마크업을 가지고 있지 않는다. 스타일 역시 가지고 있지 않는다.
- 데이터와 기능(행동)을 프레젠테이션 컴포넌트와 다른 컴포넌트에 제공한다.
- Flux(or Redux) 액션을 호출하고, 프레젠테이션 컴포넌트에 콜백함수로써 제공한다.
- 데이터 소스 역할을 하기 때문에 상태가 자주 변경된다.
- 직접 만드는것 보단 대게 React Redux 의 connect() 함수, Relay 의 createContainer() 함수, Flux Utils 의 Container.create()와 같은 Higher Order Components를 이용해서 만들어진다.
- 예를들면 유저페이지, 팔로워 사이드바, 스토리 컨테이너, 팔로우한 유저 리스트 등이 있다.
- 저는 이것들을 확실하게 구분하기 위하여 서로 다른 폴더에 생성한다.

- JSX를 이용한 마크업이 거의 없습니다.
- Ajax 요청, HOC 등을 이용해 render에 필요한 데이터를 Fetching 합니다.
- 데이터 Fetching 등을 위한 state가 존재할 수 있습니다.

## 정리
위에서 알 수 있듯 state의 존재 여부가 Presentational & Container 컴포넌트를 구분 짓는 것이 아닙니다.


| | Presentational 컴포넌트	| Container 컴포넌트 | 
|-------------------------|------------------| 
| 목적	| 어떻게 보여질 지 (마크업, 스타일)	| 어떻게 동작할 지 (데이터 불러오기, 상태 변경하기)
| Redux와 연관됨	| 아니오	| 예
| 데이터를 읽기 위해	| props에서 데이터를 읽음	| Redux 상태를 구독
| 데이터를 바꾸기 위해	| props에서 콜백을 호출	| Redux 액션을 보냄


해당 내용은 다음 글을 참고 하였습니다.
- https://medium.com/little-big-programming/react%EC%9D%98-%EA%B8%B0%EB%B3%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-92c923011818
- https://deminoth.github.io/redux/basics/UsageWithReact.html
- https://blueshw.github.io/2017/06/26/presentaional-component-container-component/?no-cache=1