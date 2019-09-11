---
layout: post
title: TODO
tags:
  - new
categories: TODO
---

면접
https://www.freecodecamp.org/news/grabs-front-end-guide-for-large-teams-484d4033cc41/
https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Korean/questions/javascript-questions.md


https://basarat.gitbooks.io/typescript/docs/tips/barrel.html

barrel


```js
// demo/foo.ts
export class Foo {}

// demo/bar.ts
export class Bar {}

// demo/baz.ts
export class Baz {}
Without a barrel, a consumer would need three import statements:
import { Foo } from '../demo/foo';
import { Bar } from '../demo/bar';
import { Baz } from '../demo/baz';
You can instead add a barrel demo/index.ts containing the following:
// demo/index.ts
export * from './foo'; // re-export all of its exports
export * from './bar'; // re-export all of its exports
export * from './baz'; // re-export all of its exports
Now the consumer can import what it needs from the barrel:
import { Foo, Bar, Baz } from '../demo'; // demo/index.ts is implied


```

```js
<form onSubmit={this.handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          onChange={this.handleChangeEmail}
        />
      </form>
```


```js
<form onSubmit={this.handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={this.handleChangeEmail}
        />
      </form>
```
Uncontrolled component & Controlled Component
Uncontrolled 컴포넌트는 방금도 말씀드렸지만 상태를 직접 React 에서 제어하지 않는다는 의미에서 Uncontrolled 컴포넌트로 불립니다. React 생태계에서는 사실 잘 쓰이지 않아요. 이렇게 상태를 프로그래머가 제어해야할 일이 종종 생기기 때문입니다. 하지만 아까도 말씀드렸듯이 렌더를 아예 타지않는다는 장점이 있기 때문에 상태를 제어할 일이 없다면 쓰는 것도 좋다고 생각해요.


이제 초기화 버튼까지 아주 잘 동작하네요! 지금 보신 이게 바로 Controlled 컴포넌트 입니다. 아까 보았던 State 가 없는 방식이 Uncontrolled 컴포넌트이고요.



컴포넌트 내부에서 상태를 가지면 스스로 프롭으로 변경해서 데이터를 업데이트하고
부모컴포넌트에서 초기화를 어덯게 시키나? 새로 그린다. 리랜더를 한다. 자식 컴포넌트 key속성을 사용한다. 초기화에만 쓰는상태를 추가한다.



```js
import React from 'react'

import Input from './Input'

class JoinForm extends React.Component {
  email = ''
  password = ''
  state = {
    reset: 0
  }
  
  render() {
    const { reset } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          // key={reset + 'email'}
          type="email"
          placeholder="이메일"
          onChange={this.handleChangeEmail}
        />
        <Input
          // key={reset + 'password'}
          type="password"
          placeholder="비밀번호"
          onChange={this.handleChangePassword}
        />
        <button type="submit">가입하기</button>
        <button type="button" onClick={this.handleReset}>초기화</button>
      </form>
    );
  }

  handleChangeEmail = (value) => {
    this.email = value
  }
  
  handleChangePassword = (value) => {
    this.password = value
  }

  handleSubmit = () => {
    console.log(this.email, this.password)
  }

  handleReset = () => {
    this.email = ''
    this.password = ''
    this.setState({
      reset: this.state.reset + 1
    })
  }
}

export default JoinForm
```


위 링크에서 이 기법에 대한 더 자세한 정보를 확인하실 수 있어요. 이렇게 컴포넌트를 제거하고 새로 만드는 작업은 당연하게도 State를 단순히 초기화하는 것보다 성능이 나쁠 거라고 예상하게 되지만, 실제로는 성능차이가 별로 중요하지 않은 수준이고 특정 상황에서는 State를 초기화는 것보다도 빠를 수 있다고 해요. 저는 사실 Uncontrolled Component를 선호하는 편입니다. State가 외부에 공개되지 않아서(캡슐화) 가지는 장점이 크다고 생각해요.

하지만 이 방법도 근본적으로 완벽하지는 않습니다. 우선 초기화에만 쓰는 상태가 하나 추가 되었다는 단점이 있고요. 또, JoinForm 입장에서 봤을 때 Input 컴포넌트를 원하는 값으로 만들어줄 방법이 없죠. 이제 두 번째 방법을 알아봅시다.


이 예제를 보시면 마찬가지로 PureComponent를 사용함에도 불구하고, 관련없는 두개의 Input이 서로 렌더링되고 있는걸 확인하실 수 있습니다. 왜일까요?

바로 이전의 예제와 이 예제의 차이점은 이 예제에서는 인라인 함수를 썼다는 것입니다. 인라인 함수를 render 메소드 내에서 쓰면 매 render 실행시마다 함수 인스턴스가 새로 생성되겠죠? 따라서 이 코드를 실행되면 결과는 false로 출력됩니다.

1
(() => null) === (() => null); // false
이 말은 매 render 실행마다 Input에 Props로 내려오는 함수가 모두 다르다는 것이고, 함수의 실행과는 관계 없이 Shallow compare로 함수 자체가 다른지를 비교하기 때문에 항상 다르다는 결과를 반환하겠죠. 결론적으로 항상 re-render 되는 것입니다.

이런 상황은 인라인 함수 사용이 대표적이지만 이것 말고도 여러가지가 있습니다. 자주 부딪치는 문제중에서는 렌더 메소드 내에서 객체를 새로 만드는 케이스가 있죠. 이렇게요.

1
2
3
4
5
class Parent extends React.Component {
  render() {
    return <Child foo={{ bar: "baz" }} />;
  }
}
또 한 가지 정말 쉽게 실수할 수 있는 케이스는 ReactNode를 넘길 때, children등을 사용할 때 인데요, 이 부분은 조금 이따가 Component Composition을 할 때 다뤄보겠습니다.


정리

Uncontrolled Component는 사용자가 상태를 제어하지 않는 컴포넌트다.
Uncontrolled Component는 key Props를 이용해 초기화 할 수 있다.
Controlled Component는 사용자가 상태를 제어할 수 있는 컴포넌트다.
PureComponent를 이용해 render 를 최적화 할 수 있다.
PureComponent는 Props와 State를 얕은 비교해서 이전과 같으면 render를 실행시키지 않는다
PureComponent를 잘못 사용하면 일반적인 Component보다도 성능이 나빠질 수 있다.

https://hyunseob.github.io/2019/06/02/react-component-the-right-way/










그렇지만.. Dialog의 render를 최적화할 방법은 없을까요? 이렇게 부모 컴포넌트의 상태가 업데이트 될 때마다 불필요한 render 호출은 합성된 컴포넌트에서 반드시 받아들여야 하는 일일까요?

물론 절대 그렇지 않습니다. 간단하게 Dialog를 래핑한 컴포넌트를 하나 더 만들기만 하면 문제는 해결됩니다.


Recap
Portal 컴포넌트는 논리적으로 하위 컴포넌트지만 시각적으로는 상위 컴포넌트여야 할 때 사용한다.
React에서는 합성, Composition을 통해 컴포넌트를 재사용할 수 있다.
Composition을 지원하는 컴포넌트의 경우 PureComponent를 사용하면 성능이 나쁠 수 있다.
Composition을 지원하는 컴포넌트를 최적화 하고 싶으면 특수화를 적용한다.






Specialization
WelcomeDialog라는 컴포넌트를 하나 더 만들었어요. PureComponent로요. Dialog는 Component로 고치고요. WelcomeDialog의 render 메소드내에서는 ReactNode를 그냥 생성하고 있죠. 왜냐하면 WelcomeDialog는 PureComponent이고, Props를 전혀 받지 않고 있기 때문에 render 가 다시 실행될 일이 없거든요. 따라서 Dialog도 다시 render 되지 않습니다.

이것을 React에서는 Specialization(특수화)이라고 부릅니다. 일반적인 목적의 컴포넌트를 좀 더 특수한 목적에 대응하는 컴포넌트로 만드는 것이죠.

https://reactjs.org/docs/composition-vs-inheritance.html#specialization


프로그래밍 패러다임
어떻게가 아닌 무엇을.


https://velog.io/@kyusung/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9A%94%EC%95%BD
=======
테스트?  tdd bdd ddd
https://asfirstalways.tistory.com/296

리덕스 사가 모달?

클라이언트 사이드렌더링 서버 사이드 렌더링 차이점과 리엑트의 우수한점????


코드 커버리지
https://afrobambacar.github.io/2018/10/code-coverage-with-jest.html

https://medium.com/@pakss328/%EC%BD%94%EB%93%9C%EC%BB%A4%EB%B2%84%EB%A6%AC%EC%A7%80-code-coverage-991e79da9e5f

https://medium.com/@rinae/%EB%B2%88%EC%97%AD-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A6%AC%EB%8D%95%EC%8A%A4-%EC%95%B1%EC%9D%84-jest%EC%99%80-enzyme%EC%9C%BC%EB%A1%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8-%ED%95%98%EB%A9%B0-%EC%96%BB%EC%9D%80-%EA%B5%90%ED%9B%88-8fc3e2c6615d

dummy stub mock

https://m.blog.naver.com/PostView.nhn?blogId=palfuni&logNo=120154483985&proxyReferer=https%3A%2F%2Fwww.google.com%2F

https://www.jpstory.net/2013/07/26/know-your-test-doubles/

1. 모든 프로그램이 개발하고 테스트할 때 완성되어 있는 것은 아니다. 그래서 필요한 것이 Stub이다.

Dummy
가장 기본적인 유형으로, 매개변수 값과 같이 작업을 수행하는 메소드가 없는, 값 전달만을 위한 객체를 말한다.

Stub은 로직이 없고 단지 원하는 값을 반환합니다. 테스트시에 “이 객체는 무조건 이 값을 반환한다”고 가정할 경우 사용할 수 있습니다. Stub은 보통 작성하기 쉽지만 불필요한 boilerplate 코드를 줄이기 위해서 Mocking Framework을 이용하는게 편합니다.

Mock은 “어떤 메소드가 호출 될 것이다”라는 행위에 대한 예상을 가지고 있습니다. 만약 그 예상대로 메소드가 호출 되지 않을 경우 테스트는 실패합니다. 이렇듯 Mock은 객체 사이의 행위(interaction)를 테스트하기 위해 사용합니다. 식별 할 수 있는 상태 변경이 없거나 반환 값으로 확인 할 수 없는 경우에 유용합니다. 예를 들면 어떤 코드가 디스크에서 read 작업을 하는데 하나 이상의 디스크에서 read 작업을 수행하지 않도록 하려는 경우, read 작업을 수행하는 메소드가 한번만 호출 되었는지 검증하기 위해 Mock을 사용할 수 있습니다.




테스트 코드를 정말 작성해야 하는가?
https://blog.outsider.ne.kr/1275

UI오ㅓ UX
https://m.blog.naver.com/moolsaess/221159385304

웹앱? 웹뷰?

웹팩
http://jeonghwan-kim.github.io/js/2017/05/15/webpack.html


확장성을 고려한 컴포넌트 
https://velog.io/@kyusung/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B5%90%EA%B3%BC%EC%84%9C-%ED%99%95%EC%9E%A5%EC%84%B1%EC%9D%84-%EA%B3%A0%EB%A0%A4%ED%95%9C-React-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8

스토리북 입문 가이드
https://hyunseob.github.io/2018/01/08/storybook-beginners-guide/

컴포넌트 제대로 만들기
https://hyunseob.github.io/2019/06/02/react-component-the-right-way/

리엑트 모듈
https://gloriajun.github.io/frontend/2019/04/11/react-code-splitting.html#the-async-component-hoc


8-point 그리드란?
http://uidesignguides.com/8-point-%EA%B7%B8%EB%A6%AC%EB%93%9C%EB%A1%9C-%EB%94%94%EC%9E%90%EC%9D%B8%ED%95%98%EA%B8%B0/
https://brunch.co.kr/@blackindigo-red/8
https://spec.fm/specifics/8-pt-grid

React를 이용해 재사용성을 갖춘 디자인 시스템 구축하기
https://code.tutsplus.com/ko/tutorials/build-a-reusable-design-system-with-react--cms-29954

Babel과 Webpack을 이용한 ES6 환경 구축 
https://poiemaweb.com/es6-babel-webpack-1
https://poiemaweb.com/es6-babel-webpack-2


Webpack4 for React (리액트를 위한 웹팩4) - 1
https://velog.io/@padakim/Webpack4-for-React-%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A5%BC-%EC%9C%84%ED%95%9C-%EC%9B%B9%ED%8C%A94-1-

## 블로그
https://www.robinwieruch.de/conditional-rendering-react/
https://blog.logrocket.com/how-to-use-react-createref-ea014ad09dba/

http://cplusplus5.egloos.com/

## go 크로스 컴파일
https://mingrammer.com/cgo-cross-compile-for-mac-for-linux/

## 디자인 패턴


## 검색 알고리즘
트리, 라운드로빈

## 웹 개발 생태계

- https://clay1987.blog.me/221405825662

- https://jayzzz.tistory.com/54


http와 ajax와 websocket
https://medium.com/@chullino/http%EC%97%90%EC%84%9C%EB%B6%80%ED%84%B0-websocket%EA%B9%8C%EC%A7%80-94df91988788



export import 동작 구조
re-export patterns 
export {default as Foo} from './Foo';
re-export the default module
dont re-export the default module
## react
virtual dom

## redux

##. react, angular 차이점

# 제너레이터

## html5 속성

## css

## 메모리 구조 (java / javascript)

## 클라우드와 saas


클라우드서비스는 기업 내에 서버와 저장장치를 두지 않고 외부에 아웃소싱하면 기업의 데이터 관리비용을 대폭 절감할 수 있다는 게 아이디어의 골자다. 클라우드를 쓰면 예상치 못한 데이터 트래픽 폭주를 대비해 과도한 설비투자를 할 필요가 없고, 데이터 관리에 필요한 인력도 줄일 수 있다. ‘구름(클라우드)’이라는 이름은 형체가 없는 온라인 공간에 ICT 인프라가 모두 들어간다는 이유 때문에 붙었다. 

데이터를 기반으로 부가가치를 창출해내는 4차 산업혁명이 진행되면서 빅데이터와 인공지능(AI) 기술을 도입하기 위해 클라우드를 쓰는 사례도 늘어나고 있다. 다양한 데이터를 클라우드에 집중시켜야 데이터를 분석하고 활용할 수 있어서다. 클라우드 서비스 제공업체가 데이터를 분석하고 AI를 활용할 수 있는 도구들을 함께 제공하고 있다.

클라우드 서비스는 데이터 저장공간과 서버만 제공하고 소프트웨어 문제는 고객이 알아서 해결하는 인프라 서비스(IaaS), 소프트웨어를 개발할 수 있는 플랫폼을 묶음으로 제공하는 플랫폼 서비스(PaaS), 소프트웨어까지 함께 주는 소프트웨어 서비스(SaaS) 등으로 나뉜다. 대기업과 공공기관 등이 주 고객인 IaaS 시장을 주도하는 업체는 아마존웹서비스(점유율 33%), 마이크로소프트(13%), 구글(6%) 등이다.

- Saas 서비스 제공: 서비스형 소프트웨어 / 클라우드컴퓨팅 기반 저비용･고효율의 공동활용시스템(플랫폼)  / SaaS는 소프트웨어의 여러 기능 중에서 사용자가 필요로 하는 서비스만 이용 가능하도록 한 소프트웨어이다. SaaS는 소프트웨어 유통 방식의 근본적인 변화를 설명하는 개념으로, 공급업체가 하나의 플랫폼을 이용해 다수의 고객에게 소프트웨어 서비스를 제공하고, 사용자는 이용한 만큼 돈을 지급한다.

전통적 소프트웨어 비즈니스 모델과 비교할 때 SaaS의 가장 큰 차이점은 제품 소유의 여부이다. 기존 기업용 소프트웨어는 기업 내부의 서버 등 장비에 저장해 이용한다는 점에서 고객이 소유권을 갖고 있었지만, SaaS는 소프트웨어가 제품이 아닌 서비스, 즉 빌려 쓰는 모델이라는 점에서 기존 라이선스 모델과는 확연히 구분된다. (공유 경제)

SaaS는 기업이 새로운 소프트웨어 기능을 구매하는 데 드는 비용을 대폭 줄여주며, 일정 기간 동안의 사용량을 기반으로 비용을 지급함으로써 인프라 투자와 관리 부담을 피할 수 있게 한다.

## RESTful api 


## OSI 7계층