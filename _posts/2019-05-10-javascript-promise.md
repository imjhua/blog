---
layout: post
title: 자바스크립트 비동기 처리에 사용 Promise!
tags:
 - promise
categories: TODO
---

## 소개
프로미스는 자바스크립트 비동기 처리에 사용되는 객체입니다. 여기서 자바스크립트의 비동기 처리란 '특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성'을 의미합니다. 자바스크립트 비동기 처리와 비동기 처리를 유연하게 하기 위한 콜백 함수로 인해 Promise를 사용합니다. 

참고) 비동기 처리: 자바스크립트의 비동기 처리란 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성.


## 비동기 처리
이렇게 특정 로직의 실행이 끝날 때까지 기다려주지 않고 나머지 코드를 먼저 실행하는 것이 비동기 처리입니다.



### 비동기 처리 방식의 문제점 (콜백지옥)
비동기 처리 방식에 의해 야기될 수 있는 문제들은 콜백(callback) 함수를 이용하여 처리 할 수 있습니다.

#### 콜백 지옥 (Callback hell)
콜백 지옥은 비동기 처리 로직을 위해 콜백 함수를 연속해서 사용할 때 발생하는 문제입니다. 아마 아래와 같은 코드를 본 적이 있을 겁니다.
```js
$.get('url', function (response) {
	parseValue(response, function (id) {
		auth(id, function (result) {
			display(result, function (text) {
				console.log(text);
			});
		});
	});
});

```
웹 서비스를 개발하다 보면 서버에서 데이터를 받아와 화면에 표시하기까지 인코딩, 사용자 인증 등을 처리해야 하는 경우가 있습니다. 만약 이 모든 과정을 비동기로 처리해야 한다고 하면 위와 같이 콜백 안에 콜백을 계속 무는 형식으로 코딩을 하게 됩니다. 이러한 코드 구조는 가독성도 떨어지고 로직을 변경하기도 어렵습니다. 이와 같은 코드 구조를 콜백 지옥이라고 합니다.

### 비동기 처리 예

다음 다양한 비동기 처리 방법에 대한 예들을 살펴 보겠습니다.

### 기존 ajax방식 예
비동기 처리의 가장 흔한 사례는 제이쿼리의 ajax입니다. 작동 방식은 다음과 같습니다. 보통 화면에 표시할 이미지나 데이터를 서버에서 불러와 표시해야 하는데 이때 ajax 통신으로 해당 데이터를 서버로부터 가져올 수 있기 때문입니다.

```js
function getData() {
	var tableData;
	$.get('https://domain.com/products/1', function (response) {
		tableData = response;
	});
	return tableData;
}

console.log(getData()); // undefined
```

undefined으로 출력되는 문제가 바로 비동기 처리로 인하여 호출이 끝날때까지 기다리지 않고 다음 코드를 먼저 실행해 버리기 때문입니다. 이 문제를 콜백함수를 통해 다음과 같이 해결합니다.

```js
function getData(callbackFunc) {
	$.get('https://domain.com/products/1', function (response) {
		callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
	});
}

getData(function (tableData) {
	console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});

```
이렇게 콜백 함수를 사용하면 특정 로직이 끝났을 때 원하는 동작을 실행시킬 수 있습니다.


### SetTimeout 예
setTimeout()은 Web API의 한 종류입니다. 코드를 바로 실행하지 않고 지정한 시간만큼 기다렸다가 로직을 실행합니다. 

```js
// #1
console.log('Hello');
// #2
setTimeout(function () {
	console.log('Bye');
}, 3000);
// #3
console.log('Hello Again');

```

마찬가지로 setTimeout() 역시 비동기 방식으로 실행되기 때문에 3초를 기다렸다가 다음 코드를 수행하는 것이 아니라 일단 setTimeout()을 실행하고 나서 바로 다음 코드인 console.log('Hello Again');으로 넘어갔습니다. 따라서, 'Hello', 'Hello Again'를 먼저 출력하고 3초가 지나면 'Bye'가 출력됩니다.


### 프로미스 예
다음 코드는 서버에서 제대로 응답을 받아오면 resolve() 메서드를 호출하고, 응답이 없으면 reject() 메서드를 호출하는 예제입니다. 호출된 메서드에 따라 then()이나 catch()로 분기하여 데이터 또는 오류를 출력합니다.
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
}).catch(function (err) {
  console.error(err); // Error 출력
});

```
프로미스 패턴을 사용하여 비도익 작업들을 순차적으로 진행하거나, 병렬로 진행하는 등의 컨트럴이 보다 수월해지고 코드의 가독성이 좋아 집니다.

프로미스에 대해 제대로 알아 봅시다. 


## 프로미스 
프로미스는 자바스크립트 비동기 처리에 사용되는 객체입니다. 여기서 자바스크립트의 비동기 처리란 '특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성'을 의미합니다. 


## 프로미스  구조
프로미스는 다음과 같은 구조를 가집니다.

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
promise(약속)이 '미래' 시점의 데이터를 위한 것이긴 하지만, 내가 무언가의 promise를 갖고 있기만 하면, 그 데이터가 미래 시점에 있을지 이미 받았는지는 상관이 없습니다. 어떤 경우에도 `then()`을 부르기만 하면 됩니다.

### 프로미스의 상태(states)
프로미스를 사용할 때 알아야 하는 가장 기본적인 개념이 바로 프로미스의 상태(states)입니다. 여기서 말하는 상태란 프로미스의 처리 과정을 의미합니다. new Promise()로 프로미스를 생성하고 종료될 때까지 다음 상태를 갖습니다.


- Pending(대기): 비동기 처리 로직이 아직 완료되지 않은 상태. 수행중
- Fulfilled(이행): 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태. 작업이 끝나서 약속이 잘 지켜졌다.
- Rejected(실패): 비동기 처리가 실패하거나 오류가 발생한 상태. 약속이 어떤 이유에서 지켜지지 못함.
- Settled:작업이 끝나 결론이 난 상태 






### 사용 예

아래 코드를 보면 나중에 Promise객체를 생성하기 위해 Promise객체를 리턴하도록 함수로 감싸고 있습니다. Promise객체를 보면 파라미터로 익명함수를 담고 있고 익형함수는 resolve와 reject를 파라미터로 받고 있습니다. 
```js
function getData(param) {
  // new Promise() 추가
  return new Promise(function (resolve, reject) {
    $.get('url 주소/products/1', function (response) {
      // 데이터를 받으면 resolve() 호출
      resolve(response);
    });
  });
}

// getData()의 실행이 끝나면 호출되는 then()
getData(param).then(function (tableData) {
  // resolve()의 결과 값이 여기로 전달됨
  console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
});
```
new Promise로 Promise가 생성되는 직후부터 resolve나 reject가 호출되지 전까지의 순간을 pending상태라고 볼 수 있습니다. 이후 비동기 작업이 마친뒤 결과물을 약속대로 잘 줄수 잇다면, 첫번쨰 파라미터로 주입되는 resolve함수를 호출하고, 실패했다면 두번쨰 파라미터로 주입되는 reject함수를 호출한다는 것이 promise의 주요 개념입니다.

### return하지 않고 바로 실행하는 경우
https://programmingsummaries.tistory.com/325

다음은 프로미스 객체를 반호나하지 않고 할당한다. 이럴 경우 객체에 파라미터로 넘겨운 익명함수는 즉각 실행된다. 
```js
var _promise = new Promise(function(resolve, reject) {
	
	// 여기에서는 무엇인가 수행 

	// 50프로 확률로 resolve 
	if (+new Date()%2 === 0) {
		resolve("Stuff worked!");  
	}
	else {
		reject(Error("It broke"));
	}
});

//실행
_promise.then(callFn);
```


다음처럼 간단하게도 구현 가능합니다.
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

#### 에러처리

```js
_promise(true)
	.then(JSON.parse)
	.catch(function () { 
		window.alert('체이닝 중간에 에러가!!');
	})
	.then(function (text) {
		console.log(text);
	});
```

#### 여러 프로미스 실행

```js
ar promise1 = new Promise(function (resolve, reject) {

	// 비동기를 표현하기 위해 setTimeout 함수를 사용 
	window.setTimeout(function () {

		// 해결됨 
		console.log("첫번째 Promise 완료");
		resolve("11111");

	}, Math.random() * 20000 + 1000);
});

var promise2 = new Promise(function (resolve, reject) {

	// 비동기를 표현하기 위해 setTimeout 함수를 사용 
	window.setTimeout(function () {

		// 해결됨 
		console.log("두번째 Promise 완료");
		resolve("222222");

	}, Math.random() * 10000 + 1000);
});


Promise.all([promise1, promise2]).then(function (values) {
	console.log("모두 완료됨", values);
});
```
----
해당 내용은 다음 글을 참고 하였습니다.
- https://joshua1988.github.io/web-development/javascript/promise-for-beginners/ 
- https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/
\- https://programmingsummaries.tistory.com/325