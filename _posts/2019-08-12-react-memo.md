---
layout: post
title: React memo
categories: React
categories: TODO
---

pureComponent

기본적인 컴포넌트로만 속도 비교를 할때, PureComponent가 속도가 가장 빠르며 Functional Component와 React.Component는 속도가 비슷합니다. 이유는, PureComponent는 re-render를 막는 구문이 있기 때문이고, Functional Component는 클래스 기반 컴포넌트로 래핑되어 있기 때문입니다.


PureComponent는 xxx를 하여 
슈두 컴포넌트
props, state의 현재값과 새로운 값을 비교만 하기 때문에 완벽한 비교는 불가능합니다. 

## 라이프 사이클

마운팅(mounting) 이벤트 : 페이지에 컴포넌트를 나타내는 이벤트로, React 엘리먼트(컴포넌트 클래스의 인스턴스)를 DOM 노드에 추가하는 시점에 발생. 1회만 실행.
갱신(updating) 이벤트 : 컴포넌트 정보를  업데이트하는 이벤트로, 속성이나 상태가 변경되어 React 엘리먼트를 갱신하는 시점에 발생. 여러번 실행.
언마운팅(unmounting) 이벤트 : 페이지에서 컴포넌트가 사라지는 이벤트로, React 엘리먼트를 DOM에서 제거하는 시점에 발생. 1회만 실행.


constructor() : 엘리먼트를 생성하여 props와 state를 설정할 때 실행
마운팅
- componentWillMount() : 컴포넌트 클래스가 DOM에 삽입되기 전 실행
- componentDidMount() : 컴포넌트 클래스가 DOM에 삽입되어 렌더링이 완료된 후 실행
갱신
- componentWillReceiveProps(nextProps) : 컴포넌트가 속성을 받기 직전 실행
- shouldComponentUpdate(nextProps, nextState) : 컴포넌트가 갱신되는 조건을 정의하여 리렌더링을 최적화할 수 있으며 bool 값 반환
- componentWillUpdate(nextProps, nextState) : 컴포넌트가 갱신되기 직전 실행
- componentDidUpdate(prevProps, prevState) : 컴포넌트가 갱신된 후 실행
언마운팅
- componentWillUnmount() : 컴포넌트를 DOM에서 제거하기 전 실행. 구독한 이벤트 제거나 다른 정리 작업 수행




----
해당 내용은 다음 글을 참고 하였습니다.
- http://wiki.sys4u.co.kr/pages/viewpage.action?pageId=8553723
- https://ko.reactjs.org/docs/react-api.html