---
layout: post
title: ES6의 Generator 알아보기 
tags:
 - es6
categories: TODO
---

## 소개
자바스크립트가 다른 언어들과 구분되는 큰 특징 중의 하나는 바로 싱글스레드를 기반으로 하는 비동기 방식의 언어라는 점입니다. 이런 특징에 힘입어 Non-blocking IO을 사용하는 Node.js의 언어로 사용되면서 최근에는 서버사이드에서도 인기를 얻고 있는 언어 입니다. 하지만 이런 구조적 특징에서 오는 단점도 적지 않은데, 대표적인 것이 바로 연속적 전달 방식으로 인한 콜백 지옥(래퍼에 래퍼에 계속 deepth가 있는 형태)입니다.

이 콜백 지옥을 해결하기 위해 많은 시도가 있었는데, 최근에 ES6에 프라미스(Promise)가 포함되면서 콜백 지옥의 문제를 상당 부분 완화할 수 있게 되었습니다.

promise 사용 예는 다음과 같습니다.

```js
function getData() {
  return new Promise(function (resolve, reject) {
    $.get('url 주소/products/1', function (response) {
      if (response) {
        resolve(response);
      }
      reject(new Error("Request is failed"));
    });
  });
}

// Fulfilled 또는 Rejected의 결과 값 출력
getData().then(function (data) {
  console.log(data); // response 값 출력
}).then(function (data) {
  console.log(data); // response 값 출력
}).then(function (data) {
  console.log(data); // response 값 출력
}).catch(function (err) {
  console.error(err); // Error 출력
});
```


 하지만 많은 사람들이 기대하는 것과는 다르게 프라미스는 콜백 지옥을 해결하기 위해 나온 도구가 아닙니다. 단지 완화시킬 수 있는 방법을 제공해 줄 뿐입니다. 그리고 상대적으로 주목을 덜 받고 있는 것 같지만, ES6에는 비동기 프로그래밍을 위한 더 중요한 도구가 있습니다. 바로 제너레이터(Generator)입니다.

제너레이터는 함수의 실행을 중간에 멈추었다가 필요한 시점에 다시 재개할 수 있습니다. 일종의 코루틴(Coroutine) 이라고 볼 수 있는데, 이 위키 페이지에도 설명되어 있듯이, 코루틴과는 다르게 멈출 때 돌아갈 위치를 직접 지정할 수 없고, 단순히 호출자에게 제어권을 넘겨주게 된됩니다. 그래서 세미-코루틴이라 불리기도 합니다.


## 제너레이터 함수(Generator Function)
일반 함수는 function 키워드로 시작합니다. 제너레이터-함수는 function* 키워드로 시작합니다.

제너레이터-함수 안에는 yield 구문이 하는데, yield 구문의 문법은 return 구문과 비슷합니다. 차이점은 함수의 경우 (심지어 제너레이터-함수의 경우도) return 구문은 한번만 실행되지만, 제너레이터-함수의 yield 구문은 여러번 실행됩니다. yield 구문은 제너레이터의 실행을 멈췄다가 다음에 다시 시작할 수 있게 만듭니다.



#### 제너레이터와 제너레이터함수의 구분
우리가 function* 키워드로 작성하는 함수는 제너레이터가 아닌 제너레이터함수입니다. 그리고 이 제너레이터함수를 호출하면 반환되는 객체가 바로 제너레이터입니다. 제너레이터는 이터레이터(Iterator) 프로토콜과 이터러블(Iterable) 프로토콜을 따릅니다.

### 형식
```js
function* myGeneratorFunction() {
  yield 1;
  yield 2;
  yield 3;
}


const generator = myGeneratorFunction();

console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3



```
모든 제너레이터는 .next() 코드와 [Symbol.iterator]() 코드를 내장(built-in)하고 있습니다. 당신은 그냥 루프 처리만 작성하면 됩니다.

이터러블 프로토콜은 단순히 obj[Symbol.iterator]: Function => Iterator로 표현할 수 있습니다. 객체는 이터레이터 심볼 키값에 이터레이터를 반환하는 메서드를 가지고 있다면 이터러블입니다. 
이터레이터 프로토콜도 단순합니다. 객체가 next라는 메서드를 가지고 있고, 그 결과로 IteratorResult 라는 객체를 반환하면 됩니다. 반환되는 IteratorResult는 {done: boolean, value: any} 형태의 단순한 객체입니다.

한 가지 재밌는 점은, 제너레이터는 이터러블이면서 이터레이터라는 것인데, 이터러블에서 반환하는 이터레이터가 바로 자기 자신입니다.

```js
/* 
  제너레이터의 이터러블 구현은 아래처럼 정말 간단할 것이다.
  generator[Symbol.iterator] = () => this;
*/

generator === generator[Symbol.iterator](); // true
```


#### 제너레이터함수 - Caller와 Callee
제너레이터함수는 Callee, 이를 호출하는 함수는 Caller로 구분 할 수 있습니다. 두 관계는 다음과 같습니다.
- Caller는 Callee가 반환한 제너레이터를 가지고 로직을 수행한다.
- Caller는 Callee의 yield 지점에서 다음 진행 여부/시점을 제어한다.

### 동작 방식

기술적 관점에서, 제너레이터의 yield 구문이 실행될 때, 제너레이터의 스택 프레임 (stack frame: 로컬 변수, 인자, 임시 값, 제너레이터 코드의 실행 위치)은 스택에서 제거됩니다. 하지만, 제너레이터 객체는 이 스택 프레임에 대한 참조를 (또는 복사본을) 유지하고 있다가 다음번 .next() 호출 때 재활성화 시켜서 실행을 계속합니다.

myGen 제너레이터는 실행될 때 이터레이터를 반환한다. 그리고 이터레이터의 next() 함수가 호출될 때마다 호출되는 곳의 위치를 기억해둔 채로 실행된다. 그리고 함수 내부에서 yield를 만날 때마다 기억해둔 위치로 제어권을 넘겨준다. 이런 식으로 next() -> yield -> next() -> yield 라는 순환 흐름이 만들어 지고, 이 흐름을 따라 해당 함수가 끝날 때까지 (return을 만나거나 마지막 라인이 실행될 때까지) 진행된다.

여기서 중요한 점은 next()와 yield가 서로 데이터를 주고받을 수 있다는 점입니다. yield 키워드 뒤의 값은 next() 함수의 반환값으로 전달됩니다 (정확히는 value 프라퍼티의 값으로). 그럼 반대로 호출자가 제너레이터에게 값을 전달하는 것도 가능합니다. next()를 호출할 때 인수를 넘기면 됩니다.


```js
function *myGen() {
    const x = yield 1;       // x = 10
    const y = yield (x + 1); // y = 20
    const z = yield (y + 2); // z = 30
    return x + y + z;
}

const myItr = myGen();
console.log(myitr.next());   // {value:1, done:false}
console.log(myitr.next(10)); // {value:11, done:false}
console.log(myitr.next(20)); // {value:22, done:false}
console.log(myitr.next(30)); // {value:60, done:true}
```
next()를 호출할 때 인수로 값을 지정하면 yield 키워드가 있는 대입문에 값이 할당되는 것을 볼 수 있습니다. 이런 식으로 제너레이터와 호출자는 서로 제어권 뿐만 아니라 데이터까지 주고받을 수 있습니다. 


### 특징
제너레이터는 분명 함수의 내부에서는 콜백도 없고 프라미스도 없지만, 비동기적으로 데이터를 주고받으며 실행되고 있습니다. 이 무슨 비동기인 듯 비동기 아닌 비동기 같은 코드처럼 보입니다.

제너레이터는 쓰래드(thread)가 아니라는 점을 명심합시다. 쓰래드를 지원하는 랭귀지들은 여러개의 코드를 동시에 실행시킵니다. 그래서 자원 경합 상황(race conditions), 비결정적 실행 특성(nondeterminism), 그리고 아주 아주 달콤한 성능(performance)을 만들어냅니다. 제너레이터는 쓰래드와 완전히 다릅니다. 제너레이터 코드는 제너레이터를 호출하는 코드와 같은 쓰래드에서 실행됩니다. 코드는 정의된 순서에 따라 항상 똑같은 순서로 실행되며 여러 코드가 동시에 실행되는 경우는 절대 없습니다. 시스템 쓰래드와 다르게, 제너레이터는 yield 구문에 의해서만 실행을 멈춥니다.



제너레이터가 이터레이터로 동작하는 이점
- 객체를 이터러블 하게 만든다.
- 배열 생성 함수를 간다하게 만든다.
- 큰 결과 처리
- 복잡한 루프 구분 리팩토링
- 이터러블을 다루는 도구로 사용. 필터링 맵핑등 

```js
function* filter(test, iterable) {
  for (var item of iterable) {
    if (test(item))
      yield item;
  }
}
```


기존 비동기 호출의 변천사





```js


일단 가독성이 한결 나아 보인다. 뿐만 아니라, 이제 해당 함수가 처리를 성공적으로 완료했을 경우 항상 then()에 넘겨진 함수가 단 한번 실행될 거라는 신뢰가 생겼다. 어마어마한 발전이다. 여기서 만족하지 말자. 프라미스를 쓸 수 있다면 ES6의 시대에 살고 있을 테니 Arrow 함수를 써서 좀 더 세련되게 만들어 보도록 하겠다.

function orderCoffee(phoneNumber) {
    return getId(phoneNumber)
        .then(id => getEmail(id))
        .then(email => getName(email))
        .then(name => order(name, 'coffee'));
}

function* orderCoffee(phoneNumber) {
    const id = yield getId(phoneNumber);
    const email = yield getEmail(id);
    const name = yield getName(email);
    const result = yield order(name, 'coffee');
    return result;
}

const iterator = orderCoffee('010-1234-1234');
iterator.next();

function getId(phoneNumber) {
    // …
    iterator.next(result);
}

function getEmail(id) {
    // …
    iterator.next(result);
}

function getName(email) {
    // …
    iterator.next(result);
}

function order(name, menu) {
    // …
    iterator.next(result);
}
```






----
해당 내용은 다음 글을 참고 하였습니다.
- https://meetup.toast.com/posts/140
- http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/
- https://meetup.toast.com/posts/73