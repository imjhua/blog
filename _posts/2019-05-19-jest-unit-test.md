---
layout: post
title: Jest 단위 테스트 
categories: JavaScript
categories: TODO
---


https://github.com/facebook/jest/tree/master/examples/snapshot/__tests__


왜 Jest인가
매우 빠름
스냅샷 테스트
변경 사항에 관련된 테스트만 재실행하는 인터렉티브(interactive)한 감시 모드

유용한 실패(fail) 메세지
간단한 설정
목(Mocks)과 스파이(spies)
단일 커맨드 라인을 이용한 커버리지 리포트
적극적(active)인 개발
Chai에서 expect(foo).to.be.a('function') 대신에 expect(foo).to.be.a.function과 같은 잘못된 assert를 쓰는 것은 불가능하다. 왜내하면, (correct)expect(foo).to.be.true 다음에  쓰는 것이 자연스럽기 때문이다.



기본 컴포넌트 렌더링 테스트
대부분의 non-interactive 컴포넌트에는 충분하다:



it('should render a label', () => {
    const wrapper = shallow(
        <Label>Hello Jest!</Label>
    );
    expect(wrapper).toMatchSnapshot();
});
it('should render a small label', () => {
    const wrapper = shallow(
        <Label small>Hello Jest!</Label>
    );
    expect(wrapper).toMatchSnapshot();
});
it('should render a grayish label', () => {
    const wrapper = shallow(
        <Label light>Hello Jest!</Label>
    );
    expect(wrapper).toMatchSnapshot();
});


---

해당 내용은 다음 글을 참고 하였습니다.
- 



Jest는 페이스북에 만든 테스트 프레임워크입니다. 

## 단위 테스트란?
단위 테스트는 모듈이나 애플리케이션 안에 있는 개별적인 코드 단위가 예상대로 작동하는지 확인하는 반복적인 행위를 말합니다. 하나의 기능에 대한 동작들을 나눠서, 각각이 하위 작업이 잘 이뤄지는지 확인을 합니다.

단위 테스트의 중요한 특징 몇가지는 테스트들은 서로 분리되어 있고, 실행은 자동화되며 애플리케이션의 같은 부분을 테스트하는 테스트들은 그룹화되어 한 번에 처리된다는 것입니다. 테스트 코드들은 서로 분리되어 있고 테스트 되고 있는 코드와도 분리되어 있습니다. 이는 문제를 쉽게 찾고 해결하게 해줍니다.

편의를 위해 단위테스트는 자동화된 경우에만 동작하도록 합니다. 모든 테스트를 한 명령어로 실행하는 것이 이상적입니다. 실제로 이 방법은 대부분의 테스트 라이브러리에서 함수나 모듈이 테스트 코드를 발견하고 실행하는 것을 통해 사용되고 있습니다.

특정 기준에 따라 그룹화된 테스트들은 개발자들이 필요할 때 전체 테스트에서 특정 부분만 따로 테스트를 실행하는 것을 가능하게 해줍니다. 또한, 쉽게 테스트를 찾아서 변경하고 추가할 수 있도록 합니다.



## 단위테스트를 작성하는 이유?
단위테스트를 작성해야 하는 가장 큰 이유는 내가 작성한 코드가 잘 동작 하는지 확인하기 위해 입니다. 단위테스트를 작성하지 않는 경우, 기능들의 동작여부를 브라우저에서 테스트를 해야하고, 예상치 못한 에러가 발생할 경우 그 다음 과정은 진행하지도 못하게 됩니다. 큭히 복잡한 과정에서 에러가 발생한다면 디버깅을 하는데도 많은 시간이 소요됩니다. 

단위테스트를 통해 기능들이 동작하는데 문제가 없는지 확인할 수 있고 테스트 통과된 기능을 조합하여 하나의 또 다른 기능을 구현하여 기능들의 동작여부 확인 및 디버깅을 쉽게 할 수 있기 때문에 단위테스트를 작성해야 합니다.

## 단위테스트 규칙
단위테스트를 작성할 때는 다음과 같은 규칙을 지켜야합니다.

- 어떤 테스트도 다른 테스트에 의존하지 않아야한다. (독립적: Independent)
- Ajax, LocalStorage, UI Event 등 테스트 대상이 의존하는 것을 다른 것으로 대체한다. 이렇게 대체하는 것을 테스트 더블(Dummy, Stub, Fake, Spy, Mock)이라고 한다. (격리: Isolation))
- given, when, then 단계에 따라 테스트 코드를 작성한다.


## 단위테스트 시나리오
단위테스트를 작성하기전 시나리오를 먼저 작성는 것이 중요합니다. 어떻게 테스트가 진행될지 사용자 스토리를 정리 한 후 given, when, then 단계에 따라 테스트 케이스를 작성합니다.


Story. A
  senario
    given: ...
    when: ...
    then: ...
Story. B
Story. C 
...


## 설치

### jest 패키지 설치
Nodejs가 설치 되었다면, 빠르게 테스트를 진행할 수 있습니다. 만약 설치 되어있지 않다면, nodejs 사이트를 방문하여 설치 후 아래의 명령어를 터미널에서 실행합니다.

```sh
$ npm init -y
$ npm install --save-dev jest
```

package.json 파일에서 scripts 프로퍼티에 명령어를 추가합니다.
```js
// package.json
{
  ...
  "scripts": {
    "jest": "jest"
  }
  ...
}
```



### 테스트 파일 생성 및 실행

테스트 파일을 만들어 봅니다.

```js
// sample.text.js

test('This is a sample', () => {
  expect(true).toBe(true);
});
```

다음명령어로 단위테스트를 해봅니다.
```sh
$ npm run jest
```


### 단위테스트 케이스
다양한 테스트케이스는 jest 홈페이지에서 확인 할 수 있습니다. https://jestjs.io/docs/en/using-matchers

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

```js
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```
```js

test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

```

그외 다음과 같은 테스트케이스가 존재 합니다.

- toBeNull
- toBeUndefined
- toBeDefined
- toBeTruthy
- toBeFalsy
- toBeGreaterThan
- toBeGreaterThanOrEqual
- toBeLessThan
- toBeLessThanOrEqual


-------
빠르게 설치하고, 테스트하기에는 좋은 것 같다. 내가 느끼기에 가장 좋았던 것은 Snapshot이다. 실제 브라우저에 내가 원하는데로 랜더링 되는지 판단할 수 있는 것은 아주 매력적이었다. 다만 실제 브라우저가 아닌 가상환경에서 실행되는 것이기 때문에 UI와 관련된 부분을 많이 대체해야하기 때문에 테스트하기 어렵게 느껴졌다.
-------



## 정리
단위테스트를 활용 할 때에는 '시나리오 작성 -> 테스트 코드 작성 -> 기능 구현 -> 리팩토링' 이 과정을 반복적으로 가지며 중복되는 코드를 제거하고, 기능을 분리합니다. 간단하게 모든 테스트를 할 수는 없지만 최소한의 기능들은 단위 테스트를 통해 애플리케이션의 동작을 완성하는데 도움이 됩니다.

단위 테스트를 통해 문제를 빨리 발견하고 변화를 쉽게하며 통합을 간단하게 하고 설계를 개선할 수 있을 것입니다.



----
해당 내용은 다음 글을 참고 하였습니다.
- https://codingwalk.tistory.com/63
- https://medium.com/@jinseok.choi/jest%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-unit-test-%EC%A0%81%EC%9A%A9%EA%B8%B0-420049c16cc8


