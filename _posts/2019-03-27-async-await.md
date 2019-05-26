---
layout: post
title: ES8 async & await 
tags:
 - async
categories: Javascript
---

## 소개
es8이전의 비동기 프로그래밍 방식은 콜백패턴을 사용하거나 es6에 새로 추가된 Promise를 사용하였습니다. es8에서 새로 도입된 비동기 함수(async function)를 사용하여 동기식 코드와 거의 같은 구조를 갖는 비동기식 코드를 짤 수 있습니다. async/await이 모든 메이저 브라우저에서 지원됩니다.

## 비동기 함수(async function)
먼저 async 함수 선언을 통해 비동기 함수를 정의합니다. 함수 앞에 async 키워드를 붙이면, 이 함수는 비동기 함수가 됩니다. 이렇게 생성된 함수는 AsyncFunction 객체를 반환합니다. AsyncFunction 객체는 해당 함수 내에 포함되어 있는 코드를 수행하는 비동기 함수를 나타냅니다. 이렇게 만들어진 비동기 함수가 호출 되면 이것은 프로미스를 반환합니다. 비동기 함수가 프로미스가 아닌 값을 반환하면, 프로미스는 자동으로 생성되며 해당함수로 부터 반환 받은 값을 이행합니다. 이 async 함수가 예외를 던지면 프로미스는 그 던져진 값과 함께 거절됩니다.



```js
// 비동기 함수
async function func1() {
  // ...
}

// 비동기 화살표 함수
const func2 = async () => {
  // ...
}

// 비동기 메소드
class MyClass {
  async myMethod() {
    // ...
  }
}
```

`비동기 함수는 항상 Promise 객체를 반환한다`는 특징을 갖습니다. 이 Promise의 결과값은 비동기 함수 내에서 무엇을 반환하느냐에 따라 결정되며, then 메소드와 똑같은 방식으로 동작합니다.

```js
async function func1() {
  return 1;
}

async function func2() {
  return Promise.resolve(2);
}

func1().then(console.log); // 1
func2().then(console.log); // 2
```

### await 키워드
async 함수는 await 구문을 포함할 수 있는데 이를 이용하면 함수의 수행을 멈추고 프로미스의 이행 값이 넘어오기를 기다렸다가 async 함수의 수행을 계속해서 이어가다가 마지막에는 이행된 값을 반환할 수 있습니다. await 키워드는 async 함수 내에서만 사용될 수 있으며 동기적으로 프로미스를 기다릴 수 있도록 해줍니다. 만약 우리가 async 밖에서 프로미스를 사용하면 여전히 then 콜백을 사용해야 합니다.

즉, await는 Promise의 then 메소드와 유사한 기능을 하는데, await 키워드 뒤에 오는 Promise가 결과값을 가질 때까지 비동기 함수의 실행을 중단시킵니다. 여기서의 '중단'은 비동기식이며, 브라우저는 Promise가 완료될 때까지 다른 작업을 처리할 수 있습니다.

await는 연산자이기도 하며, await 연산의 결과값은 뒤에 오는 Promise 객체의 결과값이 됩니다. 따라서 비동기 함수의 가장 큰 장점이기도 한데, 동기식 코드를 짜듯이 비동기식 코드를 짤 수 있습니다. then 메소드를 사용할 때보다 복잡한 비동기 데이터 흐름을 아주 쉽게 표현할 수 있다는 장점이 있습니다. 다만, 비동기 함수 역시 Promise를 사용하기 때문에, 비동기 함수를 잘 쓰기 위해서는 여전히 Promise에 대해 잘 알고 있어야 합니다.



```js
// Promise 객체를 반환하는 함수.
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${ms} 밀리초가 지났습니다.`);
      resolve()
    }, ms);
  });
}

async function main() {
  await delay(1000);
  await delay(2000);
  const result = await Promise.resolve('끝');
  console.log(result);
}

main();
```

## 장점
- 간결한 코드: async/await을 이용하면 훨씬 더 적은 코드만을 작성해도 됩니다. 다른 방식을 사용할 때 마다 해야 하는 불필요한 몇 가지 일을 하지 않아도 되기 때문입니다. .then 을 붙이고 응답을 처리하기 위한 익명함수를 생성하고 또 그 콜백에서 응답을 받아오는 등의 일들이 그것입니다.
- 쉬운 에러처리: async/await을 이용하면 동일한 코드 구조로 비동기 코드와 동기 코드의 에러를 처리하는 것이 가능합니다. 바로 잘 알려진 try/catch를 이용하는 것입니다. 
- 직관적인 조건문: async/await을 이용해 조건문을 작성하는 것이 훨씬 직관적입니다.
- 스택 프레임 추적: async/await와는 다르게 프로미스 체인에서 반환된 에러 스택은 어디에서 에러가 발생했는지에 대한 정보를 주지 않지만 async/await로는 어디에서 에러가 발생해는지 확인할 수 있습니다.
- 디버깅: 프로미스를 사용해본적이 있다면 이를 디버깅하는 것이 쉽지않다는 것을 알것입니다. 예를 들어 .then 블록 내에서 브레이크포인트를 설정하고 스텝오버(step-over)와 같은 디버깅 명령을 사용하면 디버거는 다음 .then 으로 가지 않습니다. 왜냐하면 디버거는 오직 동기 코드만을 지나가기(step) 때문입니다.
async/await을 이용하면 await 호출이 마치 일반적인 동기 함수인 것처럼 정확하게 지나갈 수 있습니다.

### promise와 async/await비교
다음은 promise코드 입니다.
```js
function loadData() {
    try { // Catches synchronous errors.
        getJSON().then(function(response) {
            var parsed = JSON.parse(response);
            console.log(parsed);
        }).catch(function(e) { // Catches asynchronous errors
            console.log(e); 
        });
    } catch(e) {
        console.log(e);
    }
}
```


다음은 async/await 코드 입니다.
```js
async function loadData() {
    try {
        var data = JSON.parse(await getJSON());
        console.log(data);
    } catch(e) {
        console.log(e);
    }
}
```


## 결론
동기 자바스크립트가 어떻게 동작하는지를 이해하고 선택한 메소드의 내부를 깊이 이해하는 것이 중요합니다. 프로그래밍의 다른 부분들이 그렇듯이 모든 접근 방식에는 장점과 단점이 있습니다.


----
해당 내용은 다음 글을 참고 하였습니다.
- https://helloworldjavascript.net/pages/285-async.html



https://hoorooroob.tistory.com/entry/React-React-Naive-TIPS-axios-%EC%99%80-fetch-%EC%96%B4%EB%96%A4-%EA%B2%83%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%A0%EA%B9%8C



- https://medium.com/@shlee1353/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B9%84%EB%8F%99%EA%B8%B0-async-await-promise-ae659eb1cb7e
- 

ES8에서 일어나고 있는일, async/await
자바스크립트 ES8에서는 프로미스 사용을 쉽게 해주는 async/await을 도입했습니다. async/await가 제공하는 가능성들을 짧게 살펴 보고 비동기 코드를 작성하기 위해 어떻게 사용할 수 있는지 살펴보겠습니다.

그럼 먼저 async/await이 어떻게 작동하는지 보겠습니다.

먼저 async 함수 선언을 통해 비동기 함수를 정의합니다. 이렇게 생성된 함수는 AsyncFunction 객체를 반환합니다. AsyncFunction 객체는 해당 함수 내에 포함되어 있는 코드를 수행하는 비동기 함수를 나타냅니다.

이렇게 만들어진 비동기 함수가 호출 되면 이것은 프로미스를 반환합니다. 비동기 함수가 프로미스가 아닌 값을 반환하면, 프로미스는 자동으로 생성되며 해당함수로 부터 반환 받은 값을 이행합니다. 이 async 함수가 예외를 던지면 프로미스는 그 던져진 값과 함께 거절됩니다.

async 함수는 await 구문을 포함할 수 있는데 이를 이용하면 함수의 수행을 멈추고 프로미스의 이행 값이 넘어오기를 기다렸다가 async 함수의 수행을 계속해서 이어가다가 마지막에는 이행된 값을 반환할 수 있습니다.

자바스크립트의 프로미스는 자바의 Future 혹은 C#의 Task와 비슷하다고 볼 수 있습니다.

async/await의 목적은 프로미스의 이용을 쉽게하는 것입니다.
다음 예제를 살펴봅시다:


위와 유사하게 예외를 던지는 함수들은 거절된 프로미스를 반환하는 함수와 동일합니다.


await 키워드는 async 함수 내에서만 사용될 수 있으며 동기적으로 프로미스를 기다릴 수 있도록 해줍니다. 만약 우리가 async 밖에서 프로미스를 사용하면 여전히 then 콜백을 사용해야 합니다.


“비동기 함수 표현식”을 통해서 비동기 함수를 정의할 수도 있습니다. 비동기 함수 표현식은 비동기 함수문과 매우 비슷하고 거의 동일한 문법을 갖고 있습니다. 주된 차이점은 비동기 함수에서는 함수 이름을 생략할 수 있다는 점입니다. 비동기 함수도 정의 되는 즉시 수행되는 IIFE(Immediately invoked function expression — 즉시실행 함수구문)처럼 사용될 수 있습니다.

다음 예제를 살펴 보겠습니다:


또 한 가지 중요한 점은 async/await이 모든 메이저 브라우저에서 지원된다는 점입니다.


만약 이와 같은 호환성으로도 부족하다면 바벨이나 타입스크립트 같은 몇 가지 트랜스파일러를 사용할 수 있습니다.
결국 중요한 것은 비동기 코드 작성을 위해 무작정 ‘최신의' 방식만을 따르지 않는 것입니다. 그 보다는 비동기 자바스크립트가 어떻게 동작하는지를 이해하고 선택한 메소드의 내부를 깊이 이해하는 것이 중요합니다. 프로그래밍의 다른 부분들이 그렇듯이 모든 접근 방식에는 장점과 단점이 있습니다.

https://medium.com/@kiwanjung/%EB%B2%88%EC%97%AD-async-await-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EC%A0%84%EC%97%90-promise%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-955dbac2c4a4

async/await의 기반이 promise라는 사실입니다.

사실, 우리가 쓰는 모든 async 함수는 promise를 리턴하고, 모든 await 함수는 일반적으로 promise가 됩니다.

제가 이걸 왜 강조하는걸까요? 왜냐하면 오늘날 쓰여지는 거의 모든 javascript 코드가 callback 패턴을 사용하기 때문입니다. 
즉, 많은 분들이 promise 를 안쓰신다는거죠. 그리고 그분들은 async/await 의 중요한 점을 놓치고 있습니다.
