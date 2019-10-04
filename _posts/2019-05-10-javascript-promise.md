---
layout: post
title: 자바스크립트 Promise!
categories: JavaScript
categories: TODO
---

프로미스 처리 흐름 중심에서 볼 때 중요한것은
executer가 실행된다는 것과 resolve()가 호출되지 않는다는 점입니다. 바로 resolve()를 호출하지 않고 호출할 수 있는 환경이 되었을때 호출합니다.


호출할수 있는환경이되었을떄 호출하는것과 댄을 실행하지 않고 아래 코드로 이동하는 것이 프로미스비동기 처리의핵심입니다.


프로미스는 자바스크립트 비동기 처리에 사용되는 객체입니다. 여기서 자바스크립트의 비동기 처리란 '특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성'을 의미합니다. 자바스크립트는 비동기 처리를 위한 하나의 패턴으로 콜백 함수를 사용하는데, 이런 콜백 패턴은 가독성이 나쁘고 비동기 처리 중 발생한 에러의 예외처리가 곤란하며 여러개의 비동기 처리 로직을 한거번에 처리하는 것에도 한계가 있습니다. ES6에서 비동기 처리를 위한 또 다른 패턴으로 프로미스(Promise)를 도입하였습니다. 콜백패턴이 가진 단점을 보완하며 비동기 처리 시점을 명활하게 표현 할 수 있습니다. Promise 패턴을 사용한 라이브러리로는 jQuery Deffered, Q, Bluebird 등이 있습니다. 자바스크립트 비동기 처리를 유연하게 하기 위한 콜백 함수로 인해 Promise에 대해 알아 봅시다.

## 프로미스(Promise)
프로미스는 자바스크립트 비동기 처리에 사용되는 객체입니다. 기본적으로 promise는 함수에 콜백을 전달하는 대신에, 콜백을 첨부하는 방식의 객체입니다. 여기서 자바스크립트의 비동기 처리란 '특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성'을 의미합니다. 

### sync
순차적으로 실행합니다.

```js
var sync1 = function(param){ return param*2; }
var sync2 = function(param){ return param*3; }
var sync3 = function(param){ return param*4; }
  
var start = 1;
console.log(sync3(sync2(sync1(start)))); // 2
```


### async
콜백으로 함수를 넘깁니다.
```js
var async1 = function(param, callback) { callback(param*2); }
var async2 = function(param, callback) { callback(param*3); }
var async3 = function(param, callback) { callback(param*4); }
 
var start = 1;
 
async1(start, result => {
    async2(result, result => {
        async3(result, result => {
            console.log(result); // 24
        });
    });
});

```

### new Promise
복잡한 async의 콜백처리를 해결하기 위해, Promise를 사용합니다. Promise는 '언젠가 끝나는 작업'의 결과값을 담는 통과 같은 객체입니다. Promise 객체가 만들어지는 시점에는 그 통 안에 무엇이 들어갈지 모를 수도 있습니다. 대신 then 메소드를 통해 콜백을 등록해서, 작업이 끝났을 때 결과값을 가지고 추가 작업을 할 수 있습니다.

```js
function async1 (param) {
    return new Promise(function(resolve, reject) {
        resolve(param*2);
    });
}
function async2 (param) {
    return new Promise(function(resolve, reject) {
        resolve(param*3);
    });
}
function async3 (param) {
    return new Promise(function(resolve, reject) {
        resolve(param*4);
    });
}
 
var start = 1;
async1(start)
    .then(async2)
    .then(async3)
    .then(result => {
        console.log(result); // 24
    });


```

### Promise.resolve()
같은 내용을 Promise.resolve([value, promise, thenable]) 로 사용하면 아래와 같습니다.

```js
function async1 (param) {
    return Promise.resolve(param*2);
}
function async2 (param) {
    return Promise.resolve(param*3);
}
function async3 (param) {
    return Promise.resolve(param*4);
}
 
var start = 1;
async1(start)
    .then(async2)
    .then(async3)
    .then(result => {
        console.log(result); // 24
    });

```
return new Promise() 보다 간결한 것 같습니다. new Promise 에서 받는 reject를 처리하지 않는 경우에는 더욱 Promise.resolve() 패턴이 좋아 보입니다. 

#### Promise.resolve()
Promise.resolve()를 호출하면 Promise 인스턴스를 생성합니다.

```js
Promise.resolve(['a', 'b']).then((param)=>{ console.log(param);});

let a = Promise.resolve({'a':'a', 'b':'b'});
a.then((param)=>{ 
  for(let name in param){
    console.log(name, param[name]);
  }
});
```
#### Promise.resolve(thenable)

```js
const a = Promise.resolve({
  // thenable객체 생성. 이 시점에서는 Promise인스턴스만 생성하고 then은 실행하지 않는다.
  // 맨 마지막에 thenable객체가 실행된다.
  then(resolve){
  console.log('1');
  resolve('send param');
}});

a.then((param)=>{
  console.log('2');
  console.log(param); // 'send param'
});
```

### new Promise와 Promise.resolve()비교 (함수안에 async가 존재 하는 경우)
Promise는 thenable객체(then() 함수를 포함하는 객체)를 반환하기 때문에 then() 이나 catch() 로 받아서 연속적인 동작을 하는 구조입니다. 다른 말로 하면, Promise 에 의해 thenable 객체가 반환되지 않았다면 Promise 종료 타이밍이 애매해질 수 있습니다.

```js
// new Promise - resolve 콜백 호출
function request (param) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
 
        xhr.open('GET', 'http://google.co.kr/', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.response);  // 서버 응답이 출력됩니다.
            }
        };
        xhr.send(null);
    })
}
 
// Promise.resolve() - 독립적인 두개의 promise상숑 
Promise.resolve()
    .then(request)
    .then(result => {
        console.log('ok');
        console.log(result);
    });


function request (param) {
    return Promise.resolve() 
        .then(function () {
            var xhr = new XMLHttpRequest();
 
            xhr.open('GET', 'http://google.co.kr/', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    return Promise.resolve(xhr.response);
                }
            };
            xhr.send(null);
        });
}
 
Promise.resolve()
    .then(request)
    .then(result => {
        console.log('ok');
        console.log(result); // undefined
    });
```

resolve콜백을 이용하는 경웨,  Promise 실행 컨텍스트를 벗어나지 않고 원하는 결과를 얻을 수 있습니다.

Promise.resolve()를 이용하여 호출할때에는 result는 undefined 입니다. request() 함수에서 xhr.send() 를 실행하면 해당 컨텍스트에서의 작업은 끝나고 Promise 컨텍스트도 종료됩니다. xhr이 완료되었을 때 반환하는 객체를 받을 타이밍에는 이미 이전 함수가 끝나있기 때문입니다.


참고) thenable객체구조는 다음과 같습니다.
object{} 안에 then()을 작성한 형태
```js
let obj = { then(resolve,rect){ ... }}
```

## Promise 구조
Promise는 콜백 함수를 통해 서버에서 제대로 응답을 받아오면 resolve() 메서드를 호출하고, 응답이 없으면 reject() 메서드를 호출합니다. 호출된 메서드에 따라 then()이나 catch()로 분기하여 데이터 또는 오류를 출력합니다. 

```js
function getData() {
  return new Promise({
    // ...
  });
}

// then() 으로 여러 개의 프로미스를 연결한 형식
getData()
  .then(function (data) {
    // ...
  })
  .then(function () {
    // ...
  })
  .then(function () {
    // ...
  });
```

WEB API의 비동기의 대표적인 예로 setTimeout이 있습니다.

```js
const delay = (ms) => new Promise(res => setTimeout(res, ms))
```

### 특징
콜백 함수를 전달해주는 고전적인 방식과는 달리, Promise는 아래와 같은 특징들이 보장됩니다.

1. 콜백은 자바스크립트 Event Loop가 현재 실행중인 콜 스택을 완료하기 이전에는 절대 호출되지 않습니다. 이유는, 비동기 콜백은 즉시 호출 스택에 쌓이지 않고 Event Queue에서 기다렸다가 호출 스택이 비어있는 시점에 실행되기 때문입니다.
2. 비동기 작업이 성공하거나 실패한 뒤에 then() 을 이용하여 다음 콜백을 호출 할 수 있습니다.
3. then()을 여러번 사용하여 여러개의 콜백을 추가 할 수 있습니다. 그리고 각각의 콜백은 주어진 순서대로 하나 하나 실행되게 됩니다. (chaining) 이때, then() 함수는 새로운 promise를 반환합니다. 처음에 만들었던 promise와는 다른 새로운 promise입니다.


### 프로미스의 상태(states)
프로미스를 사용할 때 알아야 하는 가장 기본적인 개념이 바로 프로미스의 상태(states)입니다. 여기서 말하는 상태란 프로미스의 처리 과정을 의미합니다. new Promise()로 프로미스를 생성하고 종료될 때까지 다음 상태를 갖습니다.

프로미스는 아래의 3가지 상태를 가지게 됩니다.
- 대기 pending : 아직 실행되지 않음.
- 성공 fulfilled : 성공
- 실패 rejected : 실패

그리고 이 3가지 상태에 모두 속하지 않은 경우 정체 라고한다.
- 정체 settled : 실행은 되었으나 성공도 실패도 아님. executor 가 어떤 함수도 호출하지 않음.

정체가 생기지 않도록 예외 처리를 해주어야 합니다.
###  사용법
프로미스를 사용하면 비동기 호출이 완료된후 실행될 콜백을 넘기지 않고도 프로미스가 끝난 후 호출될 콜백(성공,실패)을 then()을 사용하여 코드를 작성 할 수 있습니다. 프로미스를 사용하는 방법은 다양합니다.

1. 프로미스 객체를 생성하여 변수에 할당하는 방법
2. 함수 선언식(호이스팅 됨): 프로미스 객체를 함수 선언식을 통해 나중에 생성하는 방법 (파라미터를 넘길 수 있음)
3. 함수 표현식(할당 됨): 프로미스 객체를 함수 표현식을 통해 나중에 생성하는 방법 (파라미터를 넘길 수 있음)

아래 코드를 보면 나중에 Promise객체를 생성하기 위해 Promise객체를 리턴하도록 함수로 감싸고 있습니다. Promise객체를 보면 파라미터로 익명함수(excutor)를 담고 있고 익형함수는 resolve와 reject를 파라미터로 받고 있습니다. 
```js

function getData() {
	// new Promise() 추가
	return new Promise(function (resolve, reject) {
		$.get('https://domain.com/products/1', function (response) {
			// 데이터를 받으면 resolve() 호출
			resolve(response);
		});
	});
}

// getData()의 실행이 끝나면 호출되는 then()
getData().then(function (tableData) {
	// resolve()의 결과 값이 여기로 전달됨
	console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
});

```

### 프로미스의 실행함수와 후속 처리 메소드
프로미스는 excutor라고 하는 실행함수를 매개변수(파라미터)로 받습니다. excutor는 resolve 및 reject 인수를 전달할 실행 함수입니다. 이 실행함수는 프로미스생성자에서 처리되는 비동기 작업을 시작한 후 모든 작업을 끝내면 resolve를 호출해 프로미스를 실행합니다. 오류가 발생한 경우 reject을 호출합니다.

또, Promise는 다음과 같은 후속 처리 메소드를 가집니다.
- then: then 메소드는 두 개의 콜백 함수를 인자로 전달 받는다. 첫 번째 콜백 함수는 성공(fulfilled, resolve 함수가 호출된 상태) 시 호출되고 두 번째 함수는 실패(rejected, reject 함수가 호출된 상태) 시 호출된다.
- catch: 예외(비동기 처리에서 발생한 에러와 then 메소드에서 발생한 에러)가 발생하면 호출된다.


#### excutor 실행함수
다음과 같은 구조를 가집니다. 아래 코드를 보면 나중에 Promise객체를 생성하기 위해 Promise객체를 리턴하도록 함수로 감싸고 있습니다. Promise객체를 보면 파라미터로 익명함수를 담고 있고 익형함수는 resolve와 reject를 파라미터로 받고 있습니다. 
```js
var promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
});

promise1.then(function(value) {
  console.log(value); // expected output: "foo"
});

console.log(promise1); // expected output: [object Promise]
```

param를 넘겨야 하는 경우 프로미스를 반환하는 함수를 호출합니다.
```js
var _promise = function (param) {
  // 프로미스를 반환
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			if (param) {
				resolve("해결 완료");
			} else {
				reject(Error("실패!!"));
			}
		}, 3000);
	});
};

_promise(true).then(function (text) {
	console.log(text); // 성공시
}, function (error) {
	console.error(error); // 실패시 
});

```

```js
  // 프로미스를 반환하는 비동기 함수
  function get(url) {
    // Promise 객체의 생성과 반환
    return new Promise((resolve, reject) => {
      // XMLHttpRequest 객체 생성
      const xhr = new XMLHttpRequest();

      // 서버 응답 시 호출될 이벤트 핸들러
      xhr.onreadystatechange = function () {
        // 서버 응답 완료
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) { // 정상 응답
            // resolve 메소드에 처리 결과를 전달
            resolve(xhr.response);
          } else { // 비정상 응답
            // reject 메소드에 에러 메시지를 전달
            reject('Error: ' + xhr.status);
          }
        }
      };

      // 비동기 방식으로 Request를 오픈한다
      xhr.open('GET', url);
      // Request를 전송한다
      xhr.send();
    });
  }

  const url = 'http://jsonplaceholder.typicode.com/post/1';

  /*
    비동기 함수 get은 Promise 객체를 반환한다.
    Promise 객체의 후속 메소드를 사용하여 비동기 처리 결과에 대한 후속 처리를 수행한다.
  */
  get(url).then(
    // 첫 번째 콜백 함수는 성공(fulfilled, resolve 함수가 호출된 상태) 시 호출된다.
    result => document.getElementById('result').innerHTML = result,
    // 두 번째 함수는 실패(rejected, reject 함수가 호출된 상태) 시 호출된다.
    error => console.log(error)
  );
```

#### then()
then() 메서드는 Promise를 리턴하고 두개의 콜백 함수를 인수로 받습니다. 하나는 Promise가 성공(success)했을 때를 위한 콜백 함수이고, 다른 하나는 실패(failure)했을 때를 위한 콜백 함수입니다. then 메소드의 두 번째 콜백 함수는 비동기 처리에서 발생한 에러(reject 함수가 호출된 상태)만을 캐치합니다.

```js
var p1 = new Promise(function(resolve, reject) {
  resolve("Success!");
  // 또는
  // reject("Error!");
});

p1.then(function(value) {
  console.log(value); // 성공! resolve()을 처리
}, function(reason) {
  console.log(reason); // 오류! reject()을 처리 
});
```

#### catch()
catch 메소드는 에러를 처리한다는 점에서 then 메소드의 두 번째 콜백 함수와 유사하지만 미묘한 차이가 있습니다. then 메소드의 두 번째 콜백 함수는 비동기 처리에서 발생한 에러(reject 함수가 호출된 상태)만을 캐치합니다. 하지만 catch 메소드는 비동기 처리에서 발생한 에러(reject 함수가 호출된 상태)뿐만 아니라 then 메소드 내부에서 발생한 에러도 캐치합니다. 따라서 에러 처리는 then 메소드의 두 번째 콜백 함수보다 catch 메소드를 사용하는 편이 보다 효율적입다.

```js
var p1 = new Promise(function(resolve, reject) {
  resolve("Success!");
  // 또는
  // reject("Error!");
});

p1.then(function(value) {
  console.log(value); // 성공! resolve()을 처리
}, function(reason) {
  console.log(reason); // 오류! reject()을 처리 
}).catch(function(reason) {
  // 비동기 처리에서 발생한 에러(reject 함수가 호출된 상태)뿐만 아니라 then 메소드 내부에서 발생한 에러도 캐치
  console.log('여기서 거부된 프로미스(' + reason + ')를 처리하세요.');
});
```

### 프로미스 패턴 사용
프로미스 패턴을 사용하여 비동기 작업들을 순차적으로 진행하거나, 병렬로 진행하는 등의 컨트럴이 보다 수월해지고 코드의 가독성이 좋아 집니다. 프로미스 패턴의 사용 전과 후를 비교해 보겠습니다.

#### 프로미스 사용 전
기존에 프로미스를 사용하지 않고 콜백을 호출하기 위해서는 다음과 같이 최초 실행 함수 + 성공 콜백 + 실패 콜백 3가지의 파라미터를 넘겨주엇습니다.
```js
function successCallback(result) {
  console.log("Audio file ready at URL: " + result);
}

function failureCallback(error) {
  console.log("Error generating audio file: " + error);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback);
```

#### 프로미스 사용 후
위와 같이 콜백들을 전달받는 형태보다는 Promise를 반환하여 성공하는 경우의 콜백과 실패하는 경우의 콜백을 연결 시켜 줄수 있습니다.
```js
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```

조금 더 간단하게 작성한다면 다음과 같습니다.
```js
const promise = createAudioFileAsync(audioSettings); 
promise.then(successCallback, failureCallback);
```

우리는 이와 같은 것을 비동기 함수 호출이라고 부릅니다.

#### 비동기 작업의 연속적 수행
다음은 콜백지옥의 대표적인 예입니다.

```js
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);

```

콜백 함수들을 반환된 promise에 promise chain을 형성하도록 추가할 수 있습니다.
```js
doSomething().then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback)
.then(function() {
    console.log('Do this whatever happened before');
});
```

코드가 훨씬 간결하고 깔끔해 졌습니다. 이 표현식을 화살표 함수로 나타내면 다음과 같습니다.
```js
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
  console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback)
.then(() => {
    console.log('Do this whatever happened before');
});
```

#### 쉬운 에러처리
Promise 객체의 후속 처리 메소드를 사용하여 비동기 처리 결과에 대한 후속 처리를 수행합니다. 비동기 처리 시 발생한 에러 메시지는 then 메소드의 두 번째 콜백 함수로 전달됩니다. Promise 객체의 후속 처리 메소드 catch을 사용하여도 에러를 처리할 수 있습니다.

```js
get(url)
  .then(result => document.getElementById('result').innerHTML = result)
  .catch(error => console.log(error));
```

물론, 에러처리의 단점 또한 존재 합니다.

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


#### 여러 프로미스 실행 (all)
여러개의 비동기 작업들이 존재하고 이들이 모두 완료되었을떄 작업을 진행하고 싶다면, 각각의 비동기 작업들을 프로미스에서 처리 하고 여러 프로미스가 모두 완료될 때 all API를 호출합니다. all은 프로미스 객체를 인자로 전달 받습니다.

```js
var promise1 = new Promise(function (resolve, reject) {
	// 비동기를 표현하기 위해 setTimeout 함수를 사용 
	window.setTimeout(function () {
		console.log("첫번째 Promise 완료");
		resolve("11111");

	}, Math.random() * 20000 + 1000);
});

var promise2 = new Promise(function (resolve, reject) {
	// 비동기를 표현하기 위해 setTimeout 함수를 사용 
	window.setTimeout(function () {
		console.log("두번째 Promise 완료");
		resolve("222222");

	}, Math.random() * 10000 + 1000);
});

Promise.all([promise1, promise2]).then(function (values) {
	console.log("모두 완료됨", values);
});
```

#### reject & resolve
무조건 성공이나 실패로 값을 전달하는 Promise 입니다.

```js

// 값을 실패로 전달
Promise.reject(1).then(function(value)
{ 
	console.log('성공', value);
}).catch(function(value)
{ 
	console.log('실패', value);
});

// 값을 성공으로 전달
Promise.resolve(2).then(function(value)
{ 
	console.log('성공', value);
}).catch(function(value)
{ 
	console.log('실패', value);
});
```

## 정리
Promise를 사용하면 기존 콜백함수 보다 깔끔하게 코드작성이 가능하지만, 실행 절차/순서가 복잡하여 가독성이 떨어집니다. 그래서 ES8에서 async/await가 등장 하였습니다. 후에 알아보도록 하겠습니다.


----
해당 내용은 다음 글을 참고 하였습니다.
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Using_promises
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise
- https://joshua1988.github.io/web-development/javascript/promise-for-beginners/ 
- https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/
- https://programmingsummaries.tistory.com/325
- https://medium.com/@shlee1353/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B9%84%EB%8F%99%EA%B8%B0-async-await-promise-ae659eb1cb7e
- ttps://han41858.tistory.com/11 