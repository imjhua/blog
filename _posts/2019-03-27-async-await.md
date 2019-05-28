---
layout: post
title: ES8 async/await 
tags:
 - async
categories: JavaScript
---

## 소개
ES8에서 등장한 snyc/await 는 비동기 코드를 작성하는 새로운 방법입니다. async/await는 C#에서는 이미 몇년 전부터 있었던 기능이며 이에 친숙한 사람들도 분명 있을 것입니다. ES8 이전에는 비동기코드를 작성하기 위해 callback이나 promise를 사용해야 했습니다. async/await는 promise처럼 non-blocking 이며, 사용방법이 간단하고 직관적이기 때문에 활용도가 높습니다. `async/await는 비동기 코드의 겉모습과 동작을 좀 더 동기 코드와 유사하게 만들어준다는 장점`이 있습니다. 

es8이전의 비동기 프로그래밍 방식은 콜백패턴을 사용하거나 es6에 새로 추가된 Promise를 사용하였습니다. es8에서 새로 도입된 비동기 함수(async function)를 사용하여 동기식 코드와 거의 같은 구조를 갖는 비동기식 코드를 짤 수 있습니다. async/await이 모든 메이저 브라우저에서 지원됩니다.

## async & await
async/await의 기반은 promise입니다. async 함수는 promise를 리턴하고, 모든 await 함수는 일반적으로 promise가 됩니다.

### async function
async function 선언은 비동기 함수를 정의합니다. 비동기 함수는 이벤트 루프를 통해 비동기적으로 작동하는 함수로, 암시적으로 Promise를 사용하여 결과를 반환합니다. 비동기 처리를 하는 함수 앞에 async를 붙여줍니다. 함수 내에서 실제 비동기로 처리되는 곳에 await를 추가합니다. ㄸ라서 await 뒷부분은 promise를 반환합니다. 만약 값이 Promise가 아니라면, 해당 값은 resolve된 Promise로 변환되며 이를 기다립니다. (async함수 자체도 promise를 반환합니다.)

참고) Promise는 비동기 조작의 최종 완료나 실패를 표현해주는 객체입니다.

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


```js
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  var result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: 'resolved'
}

asyncCall();
```


### await
async 함수는 await 구문을 포함할 수 있는데 이를 이용하면 함수의 수행을 멈추고 프로미스의 이행 값이 넘어오기를 기다렸다가 async 함수의 수행을 계속해서 이어가다가 마지막에는 이행된 값을 반환할 수 있습니다. await 키워드는 async 함수 내에서만 사용될 수 있으며 동기적으로 프로미스를 기다릴 수 있도록 해줍니다. 만약 우리가 async 밖에서 프로미스를 사용하면 여전히 then 콜백을 사용해야 합니다.

즉, await는 Promise의 then 메소드와 유사한 기능을 하는데, await 키워드 뒤에 오는 Promise가 결과값을 가질 때까지 비동기 함수의 실행을 중단시킵니다. 여기서의 '중단'은 비동기식이며, 브라우저는 Promise가 완료될 때까지 다른 작업을 처리할 수 있습니다.

await는 연산자이기도 하며, await 연산의 결과값은 뒤에 오는 Promise 객체의 결과값이 됩니다. 따라서 비동기 함수의 가장 큰 장점이기도 한데, 동기식 코드를 짜듯이 비동기식 코드를 짤 수 있습니다. then 메소드를 사용할 때보다 복잡한 비동기 데이터 흐름을 아주 쉽게 표현할 수 있다는 장점이 있습니다. 다만, 비동기 함수 역시 Promise를 사용하기 때문에, 비동기 함수를 잘 쓰기 위해서는 여전히 Promise에 대해 잘 알고 있어야 합니다.


await연산자는 Promise를 기다리기 위해 사용됩니다. await 키워드는 오직 async 로 정의된 함수(async function)의 내부에서만 사용될 수 있습니다. await 를 우리 코드의 탑 레벨에서는 사용할 수 없습니다. async 함수 안에 위치한 경우에만 사용이 가능합니다. 모든 async 함수는 암묵적으로 promise를 반환하고, promise가 함수로부터 반환할 값을 resolve 합니다. await 문은 async함수의 실행을 중단시키고, Promise가 실행(fulfill)되거나 거절(reject)되기를 기다리고 성공(resolve)이든 실패(reject)든 응답이 오면 중단시켰던 async함수를 다시 실행시킵니다. 이때  await 문의 값은 Promise 에서 fulfill된 값이 됩니다. 



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

```js
async function f2() {
  var y = await 20;
  console.log(y); // 20
}
f2();
```

만약 Promise가 reject되면, await은 reject된 값을 throw합니다.
```js
async function f3() {
  try {
    var z = await Promise.reject(30);
  } catch(e) {
    console.log(e); // 30
  }
}
f3();

```

## Promise 와 async/await 

### Promise
```js
const makeRequest = () =>
  getJSON()
    .then(data => {
      console.log(data)
      return "done"
    })

makeRequest()
```

### async/await 
```js
const makeRequest = async () => {
  // 모든 async 함수는 암묵적으로 promise를 반환하고, promise가 함수로부터 반환할 값을 resolve 합니다. 
  // getJSON() promise가 resolve된 후에 일어나고, 그 후에 값을 출력(console.log)함.
  console.log(await getJSON()) 
  return "done"
}

makeRequest()
```


### 장점

- 간결한 코드: async/await을 이용하면 훨씬 더 적은 코드만을 작성해도 됩니다. 다른 방식을 사용할 때 마다 해야 하는 불필요한 몇 가지 일을 하지 않아도 되기 때문입니다. .then 을 붙이고 응답을 처리하기 위한 익명함수를 생성하고 또 그 콜백에서 응답을 받아오는 등의 일들이 그것입니다.
- 쉬운 에러처리: async/await을 이용하면 동일한 코드 구조로 비동기 코드와 동기 코드의 에러를 처리하는 것이 가능합니다. 바로 잘 알려진 try/catch를 이용하는 것입니다. 
- 직관적인 조건문: async/await을 이용해 조건문을 작성하는 것이 훨씬 직관적입니다.
- 스택 프레임 추적: async/await와는 다르게 프로미스 체인에서 반환된 에러 스택은 어디에서 에러가 발생했는지에 대한 정보를 주지 않지만 async/await로는 어디에서 에러가 발생해는지 확인할 수 있습니다.
- 디버깅: 프로미스를 사용해본적이 있다면 이를 디버깅하는 것이 쉽지않다는 것을 알것입니다. 예를 들어 .then 블록 내에서 브레이크포인트를 설정하고 스텝오버(step-over)와 같은 디버깅 명령을 사용하면 디버거는 다음 .then 으로 가지 않습니다. 왜냐하면 디버거는 오직 동기 코드만을 지나가기(step) 때문입니다.
async/await을 이용하면 await 호출이 마치 일반적인 동기 함수인 것처럼 정확하게 지나갈 수 있습니다.

#### 간결함과 깔끔함
코드의 양을 많이 줄일 수 있습니다. .then 을 추가할 필요가 없었으며, response 를 해결하기 위한 비동기 함수를 만들 필요도 없었고, data 란 이름의 변수를 선언하고 사용할 필요도 없어지게 되었습니다. 우리는 또한 코드의 nesting도 피할 수 있습니다.

#### 에러 핸들링
async/await는 동기와 비동기 에러 모두를 try/catch를 통해서 처리할 수 있게 합니다. try/catch 는 오래되었지만 좋은 접근 방식입니다. 프로미스 방식은 콜백헬에 비해서는 쉬운 에러처리가 가능하지만 모든 에러를 핸들링하는데 불편함이 있습니다.

먼저, 프로미스는 비동기 콜백 내 발생한 오류를 잡을 수 없습니다. 
```js
var p1 = new Promise(function(resolve, reject) {
  throw 'Uh-oh!';
});

p1.catch(function(e) {
  console.log(e); // "Uh-oh!"
});


var p2 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    throw 'Uncaught Exception!';
  }, 1000);
});

p2.catch(function(e) {
  console.log(e); // 이는 전혀 호출되지 않음
});
```

오류를 예측하고 reject를 호출해야만 then의 두번째 메소드를 통해 콜백 처리가 가능합니다.
```js
//Promise 선언
var _promise = function (param) {

	return new Promise(function (resolve, reject) {

		// 비동기를 표현하기 위해 setTimeout 함수를 사용 
		window.setTimeout(function () {

			// 파라메터가 참이면, 
			if (param) {

				// 해결됨 
				resolve("해결 완료");
			}

			// 파라메터가 거짓이면, 
			else {

				// 실패 
				reject(Error("실패!!"));
			}
		}, 3000);
	});
};

//Promise 실행
_promise(true)
.then(function (text) {
	// 성공시
	console.log(text);
}, function (error) {
	// 실패시 
	console.error(error);
});
```


promise의 경우, promise의 then에서 에러가 발생하면 try/catch로 에러를 잡을 수 없습니다. then 메소드 내부에서 발생한 에러 처리를 위해서는 .catch 를 호출해야하며, 에러를 처리하는 코드는 중복되고 복잡해 질 것입니다.

```js
const makeRequest = () => {
  try {
    getJSON()
      .then(result => {
        // this parse may fail
        const data = JSON.parse(result)
        console.log(data)
      })
      // uncomment this block to handle asynchronous errors
      // .catch((err) => {
      //   console.log(err)
      // })
  } catch (err) {
    console.log(err)
  }
}
```

다음은 async/await 코드 입니다. catch 블락으로 에러를 파싱이 가능합니다.
```js
const makeRequest = async () => {
  try {
    // this parse may fail
    const data = JSON.parse(await getJSON())
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

```


#### 분기
비동기 처리를 통해 얻어온 데이터를 조건으로 하여 분기 처리를 하는 경우 입니다.

```js
const makeRequest = () => {
  return getJSON()
    .then(data => {
      if (data.needsAnotherRequest) {
        return makeAnotherRequest(data)
          .then(moreData => {
            console.log(moreData)
            return moreData
          })
      } else {
        console.log(data)
        return data
      }
    })
}
```

async/await를 사용하면 가독성을 높일 수 있습니다.

```js
const makeRequest = async () => {
  const data = await getJSON()
  if (data.needsAnotherRequest) {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData)
    return moreData
  } else {
    console.log(data)
    return data    
  }
}
```
#### 이중 구문(중첩)
promise를 중첩으로 사용해야 하는 경우가 분명 있습니다. 비동기 처리를 통해 얻어온 데이터로 또 다른 비동기 호출을 해야 하는 경우입니다. 이럴경우 then을 중첩으로 사용하게 되는데 그럴 경우 nesting과 대괄호들, return문들이 필요합니다.

```js
const makeRequest = () => {
  return promise1()
    .then(value1 => {
      // do something
      return promise2(value1)
        .then(value2 => {
          // do something          
          return promise3(value1, value2)
        })
    })
}
```

물론, promise의 all함수를 이용하여 조금은 간결 하게 만들 수 있지만 가독성이 떨어 집니다. Promise.all이 하는 일은 그들을 그룹화해서 하나의 새로운 promise로 만들고 모두 종료될 때까지 기다리는 것입니다. 
```js
const makeRequest = () => {
  return promise1()
    .then(value1 => {
      // do something
      return Promise.all([value1, promise2(value1)])
    })
    .then(([value1, value2]) => {
      // do something          
      return promise3(value1, value2)
    })
}
```

async/await를 사용하면 then을 사용하지 않아 중첩되는 구문이 사라지기 때문에 간결한코드를 만들 수 있습니다.
```js
const makeRequest = async () => {
  const value1 = await promise1()
  const value2 = await promise2(value1)
  return promise3(value1, value2)
}
```


#### error stack
promise의 then 체인 어딘가에서 에러가 발생하는 경우, catch 절에서 에러처리는 가능하지만 promise 체인에서 반환되는 error stack은 어디서 에러가 발생했는 지에 관해 어떤 힌트도 주지 않습니다.

```js
const makeRequest = () => {
  return callAPromise()
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => {
      throw new Error("oops");
    })
}

makeRequest()
  .catch(err => {
    console.log(err);
    // output
    // Error: oops at callAPromise.then.then.then.then.then (index.js:8:13)
  })
```


async/await에서 발생한 error stack은 error를 포함한 함수를 가르킵니다.
```js
const makeRequest = async () => {
  await callAPromise()
  await callAPromise()
  await callAPromise()
  await callAPromise()
  await callAPromise()
  throw new Error("oops");
}

makeRequest()
  .catch(err => {
    console.log(err);
    // output
    // Error: oops at makeRequest (index.js:7:9)
  })
```


#### 디버깅
디버깅 도구는 동기화된 코드를 따라서만 움직이기 때문에 promise의 then을 디버깅 하기 쉽지 않습니다. 또한 프로미스는 return 되는 arrow function들에 breakpoint를 잡을 수 없습니다. async/await를 사용하면 이러한 문제들이 없기 때문에 디버깅이 매우 쉬워집니다.


## 정리
async 함수가 호출되면 Promise를 리턴합니다. async함수에서 값을 리턴하면, promise는 그 값을 받아서 resolved됩니다. async함수는 await 표현식을 포함하고 있으며 async 함수에 Promise 값이 전달되기 전까지 실행을 지연시킵니다. 

## 결론
Promise를 사용하면 기존 콜백함수 보다 깔끔하게 코드작성이 가능하지만, 실행 절차/순서가 복잡하여 가독성이 떨어집니다. 그래서 ES8에서 async/await가 등장 하였습니다. async/await를 사용하므로써 promise가 가진 문법적인 번잡함을 대신하게 되었지만, 한편으로 이것은 비동기 코드를 덜 분명하게 만들기도 합니다. 




----
해당 내용은 다음 글을 참고 하였습니다.
- https://helloworldjavascript.net/pages/285-async.html
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function
- https://medium.com/@constell99/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-async-await-%EA%B0%80-promises%EB%A5%BC-%EC%82%AC%EB%9D%BC%EC%A7%80%EA%B2%8C-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EB%8A%94-6%EA%B0%80%EC%A7%80-%EC%9D%B4%EC%9C%A0-c5fe0add656c
- https://programmingsummaries.tistory.com/325