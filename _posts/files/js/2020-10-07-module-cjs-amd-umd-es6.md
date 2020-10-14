---
layout: post
title: 모듈화와 Cjs & AMD & UMD & ES6
categories: JavaScript
---

좋은 모듈은 고유 한 기능과 함께 자체적으로 매우 독립적이므로 시스템 전체를 방해하지 않고 필요에 따라 섞거나 제거하거나 추가 할 수 있습니다. 왜 모듈을 사용할까요? Cjs? AMD? UMD? 차이는 무엇일까요?

## 모듈

확장되고 상호 의존적 인 코드베이스를 선호하는 모듈을 사용하면 많은 이점이 있습니다.

### 유지 관리

정의에 따라 모듈은 독립적입니다. 잘 설계된 모듈은 코드베이스의 일부에 대한 종속성을 최대한 줄여 독립적으로 성장하고 개선 할 수 있도록하는 것을 목표로합니다. 단일 모듈을 업데이트하는 것은 모듈이 다른 코드 조각에서 분리 될 때 훨씬 쉽습니다.

업데이트 할때 작은 변경이 모든 것들에 영향을 미친다면 작업은 그만큼 어렵고 힘들것입니다. 커버해야 하는 양이 그만큼 늘어날테니깐요. 대신 다른것에 영향을주지 않고 개선 할 수있는 방식으로 모듈화를 한다면 관리하는데 그만큼 비용을 아낄 수 있습니다.

### 네임 스페이스

JavaScript에서 최상위 함수 범위 밖의 변수는 전역 적입니다. 이 때문에 완전히 관련없는 코드가 전역 변수를 공유하는 "네임 스페이스 오염"이 발생하는 것이 일반적입니다. 관련없는 코드간에 전역 변수를 공유하는 것은 개발에서 절대 안됩니다. 모듈을 사용하면 변수에 대한 개인 공간을 생성하여 네임 스페이스 오염을 피할 수 있습니다.

### 재사용 성

기능단위로 분리된 모듈은 재활용할 수 있습니다. 하는 역할에 따라 재사용가능합니다.

## 모듈패턴(Cjs & AMD & UMD)과 ES6

### Cjs (대표적으로 node)

CommonJS는 모듈 선언을위한 JavaScript API를 설계하고 구현하는 자원 봉사 작업 그룹입니다. CommonJS 모듈은 본질적으로 특정 객체를 내보내는 재사용 가능한 JavaScript 조각으로, 다른 모듈이 프로그램에서 요구할 수 있도록합니다. Node.js로 프로그래밍했다면이 형식에 매우 익숙 할 것입니다.

CommonJS를 사용하면 각 JavaScript 파일은 고유 한 모듈 컨텍스트에 모듈을 저장합니다 (마지막으로 래핑하는 것처럼). 이 범위에서, 우리는 사용 module.exports이 모듈을 노출하고 개체를 필요로 가져올 수 있습니다. 이는 동기적으로 모듈을 로드합니다.

CommonJS 모듈을 정의 할 때 다음과 같이 보일 수 있습니다.

```js
function myModule() {
  this.hello = function () {
    return "hello!";
  };

  this.goodbye = function () {
    return "goodbye!";
  };
}

module.exports = myModule;
```

사용법은 다음과같습니다.

```js
var myModule = require("myModule");

var myModuleInstance = new myModule();
myModuleInstance.hello(); // 'hello!'
myModuleInstance.goodbye(); // 'goodbye!'
```

#### 단점

서버에서 잘 작동하지만 불행히도 브라우저 용 JavaScript를 작성할 때 사용하기가 더 어려워집니다. 웹에서 모듈을 읽는 것이 디스크에서 읽는 것보다 훨씬 더 오래 걸립니다. 모듈을로드하는 스크립트가 실행 중이면로드가 완료 될 때까지 브라우저가 다른 작업을 실행하지 못하도록 차단합니다. 코드가로드 될 때까지 JavaScript 스레드가 중지되기 때문에 이러한 방식으로 작동합니다. 이 문제는 모듈 번들링을 통해 해결합니다.

### AMD(Asynchronous Module Definition)

CommonJS는 모듈을 동기식으로 로드합니다. 모듈을 비동기적으로 로드하고자 할떄 AMD를 사용합니다.

AMD를 사용하여 모듈을로드하는 것은 다음과 같습니다.

```js
define(["myModule", "myOtherModule"], function (myModule, myOtherModule) {
  console.log(myModule.hello());
});
```

ommonJS와 달리 AMD는 작업을 완료하기 위해 비동기 동작과 함께 브라우저 우선 접근 방식을 취합니다. (참고로, 코드 실행을 시작할 때 동적으로 파일을 부분적으로로드하는 것은 좋지 않다고 강력하게 믿는 많은 사람들이 있습니다. 모듈 빌드에 대한 다음 섹션에서 자세히 살펴 보겠습니다).

비동기 성 외에도 AMD의 또 다른 이점은 모듈이 객체, 함수, 생성자, 문자열, JSON 및 기타 여러 유형이 될 수있는 반면 CommonJS는 객체를 모듈로만 지원한다는 것입니다. 즉, AMD는 CommonJS를 통해 사용할 수있는 io, 파일 시스템 및 기타 서버 지향 기능과 호환되지 않으며 함수 래핑 구문은 간단한 require 문에 비해 좀 더 장황 합니다.

### UMD(Universal Module Definition)

AMD와 CommonJS 기능을 모두 지원해야하는 프로젝트의 경우 UMD (Universal Module Definition)라는 또 다른 형식이 있습니다.

UMD는 기본적으로 두 가지 중 하나를 사용하는 방법을 생성하는 동시에 전역 변수 정의도 지원합니다. 결과적으로 UMD 모듈은 클라이언트와 서버 모두에서 작동 할 수 있습니다.

다음은 UMD가 비즈니스를 수행하는 방식에 대한 간략한 설명입니다.

### ES6

위의 어떤 모듈도 자바 스크립트에 네이티브가 아닙니다. 대신 모듈 패턴, CommonJS 또는 AMD를 사용하여 모듈 시스템 을 에뮬레이트 하는 방법을 만들었습니다.

ES6에서는 모듈을 가져오고 내보낼 수있는 다양한 가능성을 제공합니다. CommonJS 또는 AMD와 비교하여 ES6 모듈의 장점은 컴팩트하고 선언적인 구문과 비동기 로딩, 그리고 순환 종속성에 대한 더 나은 지원과 같은 추가 이점과 같은 두 가지 장점을 모두 제공하는 방법입니다.

작동 방식의 예는 다음과 같습니다.

```js
// lib/counter.js
export let counter = 1;

export function increment() {
  counter++;
}

export function decrement() {
  counter--;
}

// src/main.js
import * as counter from "../../counter";

console.log(counter.counter); // 1
counter.increment();
console.log(counter.counter); // 2
```

## 정리

모듈패턴들을 정리합니다.

- cjs: 서버우선, 객체만을 모듈을 동기식으로 로드한다.
- amd: 비동기 로드, 함수를 비롯한 비 객체들(JSON, 문자열 등)도 모듈로 지원한다.
- umd: AMD와 CommonJS 기능을 모두 지원
- es6: 네이티브문법입니다. 복사본이 아닌 읽기전용입니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://www.freecodecamp.org/news/javascript-modules-a-beginner-s-guide-783f7d7a5fcc/
