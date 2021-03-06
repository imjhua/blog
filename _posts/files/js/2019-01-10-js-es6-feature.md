---
layout: post
title: ES6(ECMA2015)의 새로운 기능들
categories: JavaScript
---

ES5(ECMA2009)이후 가장 많은 업데이트가 일어난 ES6(ECMA2015)에 추가된 새로운 기능들을 정리하고자 합니다. 문법의 큰 변화로 인해 진입장벽이 높다면 높을 수 있기 때문에 front 개발자라면 꼭 공부해야 합니다. ES6의 새로운 기능들을 살펴 봅시다.

## ES6의 도입
ES6는 객체지향 언어의 장점을 적극적으로 도입했으며, 효율적인 메모리 사용에 중점을 두었다고 할 수 있습니다. ES5가 프로그램 언어의 기본 기증에 중점을 두었다면, ES6는 이를 바탕으로 활용 기능에 중점을 두었다고 할 수 있습니다. 다른 언어의 장점을 자바스크립트 아키텍쳐에 맞추어 적용하였으며, ES5의 함수형을 발전시켰다고 할 수 있습니다. 

## 기능 목록 
ES6의 기능들을 정리하면 다음과 같습니다.

### 기본 매개 변수
함수에 넘겨주는 인자값에 대한 기본값을 함수의 매개변수에서 정의 해 줄 수 있습니다. 

```js
var link = function (height, color, url) {
    var height = height || 50
    var color = color || 'red'
    var url = url || 'http://azat.co'
    ...
}
```

### 템플릿 리터럴
변수와 문자열의 +연산자의 복잡한 조합 대신 `(back-ticed) 안에 ${NAME} 로 구문을 정리하여 간단하게 사용 가능합니다.
```js
var name = `Your name is ${first} ${last}.`
```

다음처럼 CSS 클래스를 유동적으로 설정할 수 있습니다.
```js
<div className={`todo-test-${checked && "checked"}`}>
  <div>
    {text}
  </div>
</div>
```

### 멀티 라인 문자열
기존 멀티라인을 처리하기 위해 사용하던 +'\n' 대신 `(back-ticed) 문자열로 멀티 라인을 묶어 주면 간단하게 처리 할 수 있습니다.
```js
var fourAgreements = `You have the right to be you.
    You can only be you when you do your best.`
```

### 향상된 객체 리터럴
객체 리터럴 정의시 __proto__ 속성을 사용하여 바로 프로토 타입설정(상속목적)이 가능합니다. 속성이름과 할당하는 값이 동일한 경우 속성명만을 정의하여 할당 가능한 단축 표기법을 제공(key:value 대신 key만을 정의함)합니다. 또한. 동적으로 속명명을 정의하는 것이 가능합니다. 즉, 객체 생성이 편리 해 졌습니다.
```js
var serviceBase = {port: 3000, url: 'azat.co'},
    getAccounts = function(){return [1,2,3]}
var accountService = {
    __proto__: serviceBase, //속성을 사용해서 바로 프로토타입을 설정
    getAccounts, // 할당 가능한 단축 표기법(key:value 대신 key만을 정의함)
    toString() { // function 키워드 사용하지 않아도 가능.
     return JSON.stringify((super.valueOf()))
    },
    toString() {
     // Super calls
     return "d " + super.toString();
    },
    getUrl() { return "http://" + this.url + ':' + this.port },
    [ 'valueOf_' + getAccounts().join('_') ]: getAccounts() // 동적으로 속성 이름을 정의
};
```

### 비구조화 할당
구조화된 데이터(json)의 프로퍼티를 변수에 각각 할당받아 처리할 필요 없이 {,,}을 사용하여 한꺼번에 할당이 가능합니다. 이 때 주의점은 할당하려는 변수와 구조화된 데이터의 프로퍼티명을 동일하게 해야 합니다. 구조화된 데이터는 {}, 배열은 []를 사용하여 한번에 할당이 가능합니다. 특히 함수에서 매개변수의 일부만 입력으로 받고 싶을때 유용합니다.
```js
var {username, password} = {username: 'username', password: 'password'};
var [line1, line2, line3, , line5] = file.split('\n');
```


다음 props인자의 name값을 얻어 오는 방법을 비구조화 할당을 통해 다음으로 만들 수 있습니다.
```js
// props obj인자

const Hello = (props) => {
    return (
        <div>Hello {props.name}</div>
    );
}
```


```js
// name 비구조화 할당

const Hello = ({name}) => {
    return (
        <div> Hello {name}</div>        
    )
}
```

할당하려는 변수와 구조화된 데이터의 프로퍼티명을 동일하게 해야 한다고 하였는데, 원래의 key 값과 다른 이름의 변수를 사용하는 방법은 아래와 같습니다. ...인 전개 연산자로 오브젝트를 대상으로 명시적으로 할당되지 않은 나머지 배열은 새로운 배열로, 객체는 새로운 객체로 할당 받아 사용할 수 있습니다.
```js

var { a1 : awesome_name, a2 : dumb , ...rest_a } = { a1 : 10, a2 : 20, a3 : 30, a4 : 40 };
console.log(awesome_name); // 10
console.log(dumb); // 20
console.log(rest_a); // { a3: 30, a4: 40 }

```

### Spread 문법 (전개 연산자: ...)
전개 연산자는 배열인 어떤 값을 함수의 파라미터 순서대로 전달해주는 걸 의미합니다.


```js
var param = ["A", "B", "V."];
function func(a, b, c) {
  console.log(a + " " + b + " " + c);
}

func(param); // 함수의 파라미터는 3개를 받으므로, 배열 하나만 넘기면 정상동작 하지 않음.
```

배열을 파라미터로 넘기는 경우, 과거에는 다음과 같이 해결하였습니다. 하지만 불필요하게 구문이 많아 지는 단점이 있습니다.

```js
function func2(arr) {
  // 가변인자에 대한 함수 호출시에 apply 메서드를 이용한다. 인자의 배열을 받아 그 배열의 각 요소가 개별 인자인 것처럼 함수를 호출한다. 또한, 첫 번째 인자로 this로 바인딩 될 객체를 명시할 수 있다.
  return func.apply(null, arr); // fun.apply(thisArg, [argsArray])
}
func2(param);
```

다음과 같이 전개 연산자를 사용하여 간단하게 배열을 파라미터로 넘길 수 있습니다.

```js
func(...param);
func(1, ...[2, 3]);
```

전개연산자는 여러가지 응용이 가능합니다. 예를들어 array의 push를 이용하여 concat의 효과를 낼 수 있습니다.

```js
var concat = [10, 11, 12];
var arr = [1, 2, 3];

arr.push(4, 5, 6);
console.log(arr); // 1, 2, 3, 4, 5, 6

arr.push(...concat);
console.log(arr); // 1, 2, 3, 4, 5, 6, 10, 11, 12
```

정리해봅시다.

- 개별 요소로 분리: 배열 또는 이터러블 대상
- 매개 변수로 전달: 배열 또는 이터러블 대상
- 비구조화 할당: 오브젝트 대상, 명시적으로 할당되지 않은 나머지 배열은 새로운 배열로, 객체는 새로운 객체로 할당된다.
- 깊은 복사: 오브젝트 대상, ... 연산자를 사용해 개별 요소들을 할당할 때, 혹은 할당 후에 다시 []혹은 {}로 묶어준다.
- 햇갈릴수 있는! 가변 파라미터 (Rest 파라미터: Rest Parameter): 나머지 파라미터를 배열로 받는다.

#### 기본 파라미터
undefined 대신 기본값을 설정할 수 있습니다. 함수 호출시 인자가 없거나 undefined 인 경우에 기본값을 적용합니다.

```js
function test(a, b = "test", c = 30) {
  console.log(a, b, c);
}
test("a");
test("a", "b");
test("a", "b", "c");
test("a", undefined, "c");
```

#### 개별 요소로 분리
Spread 연산자는 연산자의 대상 배열 또는 이터러블(iterable)을 "개별" 요소로 분리합니다. 내장된 생성자 중 iterable 객체를 만들어내는 생성자에는 아래와 같은 것들이 있습니다.

- String
- Array
- TypedArray
- Map
- Set

```js
// 배열
console.log(...[1, 2, 3]); // -> 1, 2, 3
 
// 문자열
console.log(...'Helllo');  // H e l l l o

// Map과 Set
console.log(...new Map([['a', '1'], ['b', '2']]));  // [ 'a', '1' ] [ 'b', '2' ]
console.log(...new Set([1, 2, 3]));  // 1 2 3
```

```js
// ES6: concat
const arr = [1, 2, 3];
// ...arr은 [1, 2, 3]을 개별 요소로 분리한다
console.log([...arr, 4, 5, 6]); // [ 1, 2, 3, 4, 5, 6 ]
```

```js
// ES6: push
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// ...arr2는 [4, 5, 6]을 개별 요소로 분리한다
arr1.push(...arr2); // == arr1.push(4, 5, 6);

console.log(arr1); // [ 1, 2, 3, 4, 5, 6 ]
```

```js
// ES6: splice
const arr1 = [1, 2, 3, 6];
const arr2 = [4, 5];

// ...arr2는 [4, 5]을 개별 요소로 분리한다
arr1.splice(3, 0, ...arr2); // == arr1.splice(3, 0, 4, 5);

console.log(arr1); // [ 1, 2, 3, 4, 5, 6 ]
```


#### 매개변수로 전달
```js
// ES6
function foo(x, y, z) {
  console.log(x); // 1
  console.log(y); // 2
  console.log(z); // 3
}
const arr = [1, 2, 3];
foo(...arr);// Array를 받아서 각 개별 요소로 분리 하여 매개변수로 전달되었다.
```

#### 비구조화 할당
오브젝트를 대상으로 명시적으로 할당되지 않은 나머지 배열은 새로운 배열로, 객체는 새로운 객체로 할당 받아 사용할 수 있습니다.

```js
var [a1, a2, ...rest_a] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(a1); // 1
console.log(a2); // 2
console.log(rest_a); // [3, 4, 5, 6, 7, 8, 9]

var { a1, a2, ...rest_a } = { a1 : 10, a2 : 20, a3 : 30, a4 : 40 };
console.log(a1); // 10
console.log(a2); // 20
console.log(rest_a); // { a3: 30, a4: 40 }
```

#### 깊은 복사 
자바스크립트는 불변형의 데이터를 대입할 때 포인터와 값 모두 생성하지만, 오브젝트(배열)을 대입할 때에는 메모리 절약을 위해 포인터만 새로 할당할 뿐 새로 생성하는 것이 아닙니다. 따라서 깊은 복사를 하기 위해서는 ...을 이용하여 

1. 개별 요소들로 할당할 때 []로 묶어 주거나 (개별 요소 분리)
2. 개별 요소들로 할당 받은 후 []혹은 {}로 묶어주거나 (비구조화 할당)

하는 방법을 사용하여 깊은 복사가 이루어진 새로운 객체를 생성하여 깊은 복사가 가능해 지는 방법이 있다.

```js
var arr = [1,2,3];
var copy1 = arr;
var [...copy2] = arr; // 2번 방법
var copy3 = [...arr]; // 1번 방법

arr[0] = 'String';
console.log(arr); // [ 'String', 2, 3 ]
console.log(copy1); // [ 'String', 2, 3 ]
console.log(copy2); // [ 1, 2, 3 ]
console.log(copy3); // [ 1, 2, 3 ]


var obj = {x: 'x'};
var obj1 = obj;
var {...obj2} = obj; // 2번 방법
// var ...obj3 = {...obj}; // 1번 방법 not work: 이터러블이 아닌 일반 객체는 Spread 연산자의 피연산자가 될 수 없다.

obj.y = 'y';
console.log(obj1); // {x: 'x', y: 'y'}
console.log(obj2); // {x: 'x'}
```

#### 가변 파라미터 (Rest 파라미터: Rest Parameter)
오브젝트를 대상으로 명시적으로 할당되지 않은 나머지 배열은 새로운 배열로, 객체는 새로운 객체로 할당 받아 사용하는 비구조화 할당방법의 하나로 마지막 파라미터를  ...로 받을 수 있습니다. Rest 파라미터는 반드시 마지막 파라미터이어야 합니다. Rest 파라미터를 사용하면 함수의 파라미터로 오는 값들을 배열로 전달받을 수 있습니다.

```js
var messages = ids.map((value, index, ...abc) => ({v:value, i:index, a:abc}));

function foo(...rest) {
  console.log(Array.isArray(rest)); // true
  console.log(rest); // [ 1, 2, 3, 4, 5 ]
}
foo(1, 2, 3, 4, 5);
```

* arguments VS rest 파라미터

ES5에서도 가변 인자 함수의 경우 arguments 객체를 통해 인자값을 확인할 수 있었습니다. arguments와 rest파라미터의 차이점은 arguments는 유사 배열 객체고 rest는 배열이라는 점입니다. 유사 배열 객체(array-like object)는 간단하게 순회가능한(iterable) 특징이 있고 length 값을 알 수 있는 특징이 있는 것입니다. 즉, 배열처럼 사용할 수 있는 객체를 말합니다. arguments는 유사배열객체이기 때문에 Array 오브젝트의 메서드를 사용할 수 없습니다. 따라서 ES6에서는 arrow function에 arguments는 사용할 수 없을 뿐더러 Rest 파라미터를 사용하면 더 유연한 코드를 작성할 수 있는 것이기 때문에 Rest 파라미터 사용을 권장합니다.

```js
//ES5 arguments예

var foo = function () {
  console.log(arguments);
};
foo(1, 2); // { '0': 1, '1': 2 }
```

### 화살표 함수 (arrow function)
일반 함수의 자신을 호출하는 객체를 가리키는 dynamic this와 달리 arrows 함수는 코드의 상위 스코프(lexical scope)를 가리키는 lexical this를 가집니다. 화살표 함수는 항상 익명함수로 정의되며 this의 값을 `현재 문맥에 바인딩` 시킵니다. 자신을 포함한 외부 scop에서 this를 계승(lexical scope) 받습니다. 따라서 주의 사항으로는, 객체의 메소드 정의시 화살표 함수를 사용하게 되면 함수안의 this는 전역객체를 바인딩하게 되므로 객체의 메소드 정의 방법으로 정의하여 실행 문맥에 의하여 함수를 소유하고 있는 객체를 가리키도록 해야 합니다. 생성자 함수정의시에도 마찬가지 이유로 사용하지 않습니다.  

화살표 함수의 this는 자신이 선언된 위치의 this를 마치 call(현재는 보통 function.bind 라고함) 된 것과 같이 그대로 this로 가지고 있는 특성이 있습니다.

```js
// 일반함수
testobj.testCallback(function(){ console.log('hello'); });
// 화살표함수
testobj.testCallback(() => { console.log('hello'); });
```


```js
// Lexical this
// 출력결과 : Bob knows John, Brian
var bob = {
  _name: "Bob",
  _friends: ["John, Brian"],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
}
```

#### function 키워드와의 차이점
화살표 함수는 function 키워드보다 간단하게 함수를 선언할 수 있어 편리 합니다. 하지만 모든 경우에 사용할 수 없으며 함수가 실행되는 환경을 고려해야 합니다. 화살표 함수는 new 연산자로 인스턴스를 생성 할 수 없습니다. new 연산자를 사용하려면 함수에 자기 자신을 통해 만들어질 객체의 원형을 가지는 prototype이 연결되어 있어야 하고 여기에 constructor가 연결되어 있어야 합니다. 그런데 화살표 함수에는 prototype이 연결되어 있지 않기 때문에 new 연산자로 인스턴스를 생성할 수 없습니다. 상위객체를 나타내는 __proto__ 에는 빌드인 Function 오브젝트의 prototype에 연결된 메스드가 연결되어 있습니다. 따라서, 함수의 prototype 값이 없다면 이 형태는 화살표함수 라는 것을 알 수 있습니다. 

참고) 프로토타입 객체의 속성 
Prototype Object는 일반적인 객체와 같으며 기본적인 속성으로 constructor와 __proto__를 가지고 있습니다.
- constructor: 생성자로써, 자신을 만들어낸 객체와 연결된 속성
- __proto__: 상위 객체. 객체를 만들어내기 위해 사용된 객체원형에 대한 숨겨진 연결. 자신을 만들어낸 객체의 원형(Prototype Link)
- prototype: 자기 자신. 자신을 통해 만들어질 객체의 원형(Prototype Object)

#### arguments 사용 불가
화살표 함수 블록에서 arguments 프로퍼티를 사용할 수 없습니다. ES5에서도 가변 인자 함수의 경우 arguments 객체를 통해 인자값을 확인할 수 있었습니다. arguments는 유사 배열 객체입니다. 유사 배열 객체(array-like object)는 간단하게 순회가능한(iterable) 특징이 있고 length 값을 알 수 있는 특징이 있는 것입니다. 즉, 배열처럼 사용할 수 있는 객체를 말합니다. arguments는 유사배열객체이기 때문에 Array 오브젝트의 메서드를 사용할 수 없습니다. 따라서 ES6에서는 arrow function에 arguments 대신에 rest 파라미터를 사용합니다. rest 파라미터를 사용하면 사용하면 더 유연한 코드를 작성할 수 있는 것이기 때문에 rest 파라미터 사용을 권장합니다.

참고) arguments는 Argument 오브젝트를 대신하는 프로퍼티로 함수가 호출되면 Argument오브젝트를 생성하고 함수 실행이 긑나 빠져나올 때 삭제 합니다. 함수를 여러번 호출하면 그 횟수 만큼 Argument 오브젝트를 생성하고 삭제하므로 효율이 떨어집니다. rest 파라미터는 Arguement 오브젝트를 생헝하지 않으므로 효율이 높습니다. 



```js
$('.btn').click((event) => {
  this.sendData()
});

var messages = ids.map(value => `ID is ${value}`) // implicit return

```

#### this의 참조
화살표 함수가 간닪게 코드를 작성할 수 있어 편리하지만 this의 참조를 고려해야 합니다. ES5에서 function 키워드로 작성된 함수를 작성하여 호출하는 경우, 작성된 함수내의 this는, 실행시 this를 호출하는 함수를 소유하고 있는 객체를 가리킵니다. 인스턴스를 생성하고 인스턴스의 메소드를 호출하는 경우 this는 인스턴스를 가리키지만, 콜백으로 사용되는 함수내의 this는 콜백이 등록된 함수를 호출하는 인스턴스를 가리키지 않고 콜백이 등록된 함수를 가리키게 됩니다. 예를 들면 window 오브젝트의 setTimeout 함수의 콜백내의 this는 setTimeout를 호출한 인스턴스를 가리키는것이 아닌, winow를 가리는 경우입니다. 이러한 문제를 화살표 함수를 사용하여 해결할 수 있습니다. 콜백함수를 화살표 함수로 작성하면 콜백함수를 호출하는 함수가 포함된 함수의 인스턴스를 참조 합니다.


#### prototype
prototype에 화살표 함수를 연결하면 화살표 함수 블록에서 this가 인스턴스를 참조하지 못합니다. 이때에는 this가 인스턴스를 가리키지 않고 window오브젝트를 가리킵니다. 따라서 화살표 함수가 아닌 function 키워드 함수를 prototype에 연결해야 합니다. 

### 프로미스(Promise)
프로미스(Promise)는 비동기 프로그래밍을 위한 라이브러리입니다. 프로미스는 자바스크립트 비동기 처리에 사용되는 객체입니다. 여기서 자바스크립트의 비동기 처리란 ‘특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성’을 의미합니다. Promise 개체는 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 나타냅니다. 콜백지옥에서 벗어 날 수 있습니다.

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
```

```js
var wait1000 =  new Promise((resolve, reject)=> {
  setTimeout(resolve, 1000)
}).then(()=> {
  console.log('hi!')
})
```
 
```js
var promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
});

promise1.then(function(value) {
  console.log(value);
  // expected output: "foo"
});

console.log(promise1);
// expected output: [object Promise]

```


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


### 블록 레벨 스코프 let, const
ES5까지 변수를 선언할 수 있는 유일한 방법은 var 키워드를 사용하는 것이었습니다. var는 다음과 같은 특징이 있습니다. 

- 함수 레벨 스코프(Function-level scope): 함수의 코드 블록만을 스코프로 인정한다. 따라서 전역 함수 외부에서 생성한 변수는 모두 전역 변수이다. 이는 전역 변수를 남발할 가능성을 높인다. for 문의 변수 선언문에서 선언한 변수를 for 문의 코드 블록 외부에서 참조할 수 있다.
- var 키워드 생략 허용: 암묵적 전역 변수를 양산할 가능성이 크다.
- 변수 중복 선언 허용: 의도하지 않은 변수값의 변경이 일어날 가능성이 크다.
- 변수 호이스팅: 변수를 선언하기 이전에 참조할 수 있다.

이는 다른 언어와는 다른 특징으로 주의를 기울이지 않으면 심각한 문제를 일으켰습니다. 특히 var로 선언된 변수를 함수 내부에서 var 로 재 선언 하지 않는 경우 글로벌 변수의 값을 덮어쓰는 문제가 있었는데, 이를 방지 하기 위해 use strict이라는 키워드를 사용하여 strict모드를 사용하였습니다. strict 모드는 ES5(ECMA Script 5)에 추가된 키워드입니다. strict 모드는 자바스크립트가 묵인했던 에러들의 에러 메시지를 발생시킵니다. 엄격하게 문법 검사를 하겠다라는 의미로 코드를 작성할 때 사용합니다. 하지만 이는 근본적인 접근이 아닙니다. ES6에서는 이런 문제를 해결하기 위해 블록 스코프를 가지는 새로운 키워드를 추가 하였습니다. 바로 let입니다. let은 블록 유효 범위로 지정됩니다. const는 상수 정의시에 사용합니다. const의 경우, 값을 새로 할당할 수 없지만 프로퍼티에는 값을 할당 하거나 수정 할 수 있습니다. 블록 레벨 스코프를 사용하면, 블록 내부에서는 참조가 가능하며 그 밖의 영역에서 참조 할 경우 에러가 발생합니다. var 키워드는 블록 유효 범위가 존재하지 않기 때문에, 블록이 닫힌 이후에도 접근이 가능 합니다. 

```js
{
    var count = 10;
}
console.log(count);     // 10

-----

for (var i=0; i<11; i++){}
console.log( i );       // 11
```

자바스크립트에서 함수 레벨 스코프를 사용합니다. 스코프의 특징은 함수 호출시점이 아닌 선언된 시점을 기준으로 유효범위를 갖는다는 것을 기억 합시다. 전역변수와 지역변수가 중복 선언된 경우 전역 영역에서는 전역변수만이 참조 가능하고 함수 내 지역 영역에서는 전역과 지역 변수 모두 참조 가능하나 위 예제와 같이 변수명이 중복된 경우, 지역변수를 우선하여 참조합니다.

```js
var a = 10;     // 전역변수

(function () {
  var b = 20;   // 지역변수
})();

console.log(a); // 10
console.log(b); // "b" is not defined

---

var x = 'global';

function foo() {
  var x = 'local';
  console.log(x);
}

foo();          // local
console.log(x); // global
```
참고) 대부분 블록{} 으로 스코프를 정의하지만, swtch-case 문의 경우, switch 블록이 블록 스코프가 된다. switch안의 case는 별도의 스코프를 갖지 않는다.

### 클래스(Class)
ES6 클래스는 포로토타입 기반 객체지향 패턴을 더 쉽게 사용할 수 있는 대체재입니다. 클래스 패턴 생성을 더 쉽고 단순하게 생성할 수 있어서 사용하기도 편하고 상호운용성도 증가됩니다. class 키워드를 사용하여 protorype기반 상속 보다 명확하게 클래스를 정의할 수 있습니다(객체 지향 패턴). get과 set, static 키워드를 사용해 메소드 정의가 가능하며 상속시 부모생성자를 호출하기 위해 super()를 사용할 수 있습니다. static 키워드를 사용하여 메서드를 선언 할 수 있는데, 이는 Class오브젝트 프로퍼티로 작성하며, 오브젝트로 생성한 인스턴스에 할당되지 않습니다. 인스턴스의 prototype에 연결된 함수는 new연산자를 사용해 생성한 인스턴스에서 호출합니다. function키워드를 사용한 함수와의 구분을 위해 static 메서드는 정적 메소드라고도 구분할 수 있습니다. 

```js
// class 이름
class Saro
{
	constructor()
	{
		console.log('생성자');
		this.host = 'me';
	}
	
	* genFunc() { /* ... */ }
	get propertyValue()
	{
		return '호스트 : ' + this.host;
	}
	set propertyValue(host)
	{
		console.log('호스트는 바꿀수 없습니다.');
	}
	getHost()
	{
		return this.host;
	}
	static staticFunction()
	{
		console.log('스테틱 함수입니다.');
	}
};
```

참고) 함수는 Array.isArry() / 메서드는 [1,2,3].forEach(..)

#### {} 내에서 단축된 문법과 get set 프로퍼티

클래스에서 사용하는 문법과 거의 동일합니다. 구분자(,)만 추가하면 똑같이 사용할 수 있습니다.

```js
var temp = {
  get pname() {
    return "고정값";
  },
  set pname(name) {
    console.log(name + "변경불가");
  },
  func() {
    console.log("함수");
  },
  *genFn() {
    console.log("제네레이터 함수");
    yield null;
  }
};

temp.func();
console.log(temp.pname);
temp.pname = "input!!!";
console.log(temp.pname);
temp.genFn().next().value;
```

### 모듈 
컴포넌트 정의를 위한 모듈을 지원합니다. 기존에는 모듈사용에 대한 공식적인 방법이 없었기 때문에 비공식적으로 JavaScript 모듈 로더들 AMD, CommonJS(module.eports로 모듈 정의후 require()로 모듈을 불러와 사용)의 패턴을 사용하였데 새롭게 import와 export 가 제공됩니다.

### for ...of 반복문
기존 for in 의 경우 프로퍼티를 가져왔다면, for of 는 반복자를 가져옵니다. 배열, DOM 컬렉션, generator function 에서도 사용할 수 있습니다.  foreach 반복문은 오직 Array 객체에서만 사용가능한 메서드입니다. for ...in 반복문은 객체의 속성을 반복하여 작업할 수 있었으나 key만 접근 가능하고 value에는 접근할 수 없었습니다. for of 반복문은 [Symbol.iterator] 속성을 가지는 컬렉션(prototype까지 접근 가능) 전용으로 사용 가능합니다.

```js
var arr = [1, 2, 3];
for (var val of arr) {
  console.log(val);
}
```

- foreach 반복문: 오직 Array만 가능 
- for ...in 반복문: 객체의 모든 열거 가능한 속성에 대해 반복 
- for ...of 반복문: 이터레이터 속성을 가지는 컬렉션 전용

#### foreach 반복문
foreach 반복문은 오직 Array 객체에서만 사용가능한 메서드입니다.(ES6부터는 Map, Set 등에서도 지원됩니다) 배열의 요소들을 반복하여 작업을 수행할 수 있습니다. foreach 구문의 인자로 callback 함수를 등록할 수 있고, 배열의 각 요소들이 반복될 때 이 callback 함수가 호출됩니다. callback 함수에서 배열 요소의 인덱스와 값에 접근할 수 있습니다.

```js
var items = ['item1', 'item2', 'item3'];

items.forEach(function(item) {
    console.log(item);
});
// output: item, item2, item3
```

#### for ...in 반복문
for in 반복문은 객체의 속성들을 반복하여 작업을 수행할 수 있습니다. 모든 객체에서 사용이 가능합니다. for in 구문은 객체의 key 값에 접근할 수 있지만, value 값에 접근하는 방법은 제공하지 않습니다. 자바스크립트에서 객체 속성들은 내부적으로 사용하는 숨겨진 속성들을 가지고 있습니다. 그 중 하나가 [[Enumerable]]이며, for in 구문은 이 값이 true로 셋팅되어 속성들만 반복할 수 있습니다. 이러한 속성들을 열거형 속성이라고 부르며, 객체의 모든 내장 메서드를 비롯해 각종 내장 프로퍼티 같은 비열거형 속성은 반복되지 않습니다. 

```js
var obj = {
    a: 1, 
    b: 2, 
    c: 3
};

for (var prop in obj) {
    console.log(prop, obj[prop]); // a 1, b 2, c 3
}


var iterable = [3, 5, 7];
iterable.foo = "hello";

for (var key in iterable) {
  // 객체의 모든 열거 가능한 속성에 대해 반복하기 때문
  // 이때 배열의 경우 index 가 String으로 출력되는 단점이 있다.
  // 가급적 배열에는 [Symbol.iterator] 속성을 가지는 컬렉션을 출력하는 for of 를 사용하자!
  console.log(key); // 0, 1, 2, "foo", "arrCustom", "objCustom"
}

```

#### for ...of 반복문
for of 반복문은 ES6에 추가된 새로운 컬렉션 전용 반복 구문입니다. for of 구문을 사용하기 위해선 컬렉션 객체가 [Symbol.iterator] 속성을 가지고 있어야만 합니다(직접 명시 가능).

```js
var iterable = [10, 20, 30];

for (var value of iterable) {
  console.log(value); // 10, 20, 30
}
```

Iterator 객체는 CLR의 IEnumerable 혹은 Java의 Iterable처럼 사용자 정의의 반복을 가능하게 해줍니다. for..of 반복문이 ES6에서 추가 되었으며 for..in 반복문과 달리 iterator 기반의 컬렉션 전용 반복문입니다. 

```js
let fibonacci = {
    [Symbol.iterator]() {
        let pre = 0, cur = 1;

        return {
            next() {
                [pre, cur] = [cur, pre + cur];
                return { done: false, value: cur }
            }
        }
    }
}

for (var n of fibonacci) {
    // truncate the sequence at 1000
    if (n > 1000)
        break;
    console.log(n); // 1, 2, 3, 5, 8, ...987
}
```

### generator & generator function
Generators는 function와 yield 키워드를 이용하여 iterator 선언을 단순하게 작성할 수 있게 합니다. function로 선언한 함수는 Generator 객체를 반환합니다. Generators는 iterator의 하위 타입이며 next와 throw 메서드를 가지고 있습니다. 이 메서드들로 인해 yield 키워드로 반환된 값은 다시 generator에 주입거나 예외처리를 할 수 있게 되었습니다. Generator 객체는 generator function 으로부터 반환된 값이며 반복자와 반복자 프로토콜을 준수합니다.

```js
function* gen() { 
  yield 1;
  yield 2;
  yield 3;
}

var g = gen(); // "Generator { }"

```


#### Number.isNaN()
글로벌 isNaN 과 달리 정확히 Number 타입의 isNaN인지 구분합니다. 이유는 글로벌 isNaN은 다음과 같은 예상치 못한 결과를 받기 때문입니다.
```js
isNaN(null)      // false
isNaN('0') // false
```

실제로 isNaN()의 내부적인 작동 방식을 살펴 보면 isNaN() 함수는 넘어오는 인수를 먼저 숫자로 변환을 시도합니다. 그리고 그 결과값을 통해 NaN 여부를 확인하게 됩니다. 다음과 같은 코드를 실행하는 것으로 이해할 수 있습니다.
```js
isNaN(Number(null)) // 0
```

다음 글로벌 inNaN과 Number.isNaN을 비교해 보겠습니다. 
```js
isNaN('aaa'); // true
isNaN('34234'); // false
isNaN(34234); // false

Number.isNaN('aaa'); // false - 스트링 타입이기때문에 정확히 Number 타입의 NaN만 유효
Number.isNaN(NaN); // true
Number.isNaN(0 / 0); // true : 무한도 NaN에 속한다.
Number.isNaN(231); // false
```

둘의 차이점을 정리해보자면, 
- 글로벌 isNaN은 값을 받아 숫자로 변환을 시도 헌 후 not a number를 체크 한다.
- Number.isNaN은 정확히 숫자(Number) 타입에서만 not a number를 체크 한다.


#### Object.is()
완전 동일한 객체 인지 확인합니다. 동일하다는 기준은, 결과값이면서 동일한 참조를 가지는 값입니다. 이 경우, 원시자료형은 그대로 복사가 이루어지기 때문에 같을 것이고, 동일해 보이지면 참조형 객체(object, class)인 경우는 참조되는 공간이 다르므로 다를 것입니다.



```js
Object.is(null, null); // true
Object.is(undefined, undefined); // true
Object.is(1, 1); // true

Object.is(1, 3); // false
Object.is(1, true); // false

var abc1 = { a : 1, b : 2 };
var abc2 = { a : 1, b : 2 };
Object.is(abc1, abc2 ); // false : 같아보이지만 다른 객체이다.

var Cl = function()
{
	this.a = 1;
	this.b = 2;
}
var cl1 = new Cl();
var cl2 = new Cl();
Object.is(cl1, cl2); // false: object / class 의 경우 참조가 다름.
Object.is(cl1, cl1); // true : 완전히 같다.

// 특별한 경우
Object.is(0, -0); // false
Object.is(-0, -0); // true
Object.is(NaN, 0/0); // true
// 하나는 NaN 또하나는 무한이지만 무한도 NaN에 속하므로, 같은 NaN으로 취급함.
```

#### 배열형 추가기능
Array에 기본 메소드가 추가되었습니다.

- fill(채울값)
- fill(채울값, 시작위치)
- fill(채울값, 시작위치, 종료위치)

```js

([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).fill(99);
// [99, 99, 99, 99, 99, 99, 99, 99, 99, 99]

([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).fill(99, 3);
// [1, 2, 3, 99, 99, 99, 99, 99, 99, 99]

([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).fill(99, 3, 7);
// [1, 2, 3, 99, 99, 99, 99, 8, 9, 10]
```


- @@iterator
String, Array, Map, Set, TypedArray오브젝트의 프로토타입에는 Symbol.iterator이 연결되어 있습니다. 배열처리를 위한 이터레이터 오브젝트입니다. 위 for of는 iterator 가 있는 객체에서 작동합니다.  

```js
var arr = [3, 7, 11];
var iter = arr[Symbol.iterator]();
var node;
while (!(node = iter.next()).done)
{
	console.log(node.value);
}
```

- Array.prototype.entries()
- Array.prototype.keys()



#### import / export
import 문은 외부 모듈이나 다른 스크립트 등으로부터 export 된 기능을 가져오는데 사용됩니다.

```js
import name from "module-name";
import * as name from "module-name";
import { member } from "module-name";
import { member as alias } from "module-name";
import { member1 , member2 } from "module-name";
import { member1 , member2 as alias2 , [...] } from "module-name";
import defaultMember, { member [ , [...] ] } from "module-name";
import defaultMember, * as alias from "module-name";
import defaultMember from "module-name";
import "module-name"; //어떠한 바인딩 없이 모듈 전체의 사이드 이펙트만 가져옴
``` 

export 문은 JavaScript 모듈에서 함수, 객체, 원시 값을 내보낼 때 사용합니다. 내보낸 값은 다른 프로그램에서 import 문으로 가져가 쓸 수 있습니다.
```js
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // var, const에서 동일
export let name1 = …, name2 = …, …, nameN; // var, const에서 동일
export function FunctionName(){...}
export class ClassName {...}

export default expression;
export default function (…) { … } // class, function* 에서 동일
export default function name1(…) { … } // class, function* 에서 동일
export { name1 as default, … };

export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
export { default } from …; // import 와 export 를 한 번에 처리할 수 있는 export - from
// 이 문법은 주로 패키지의 다른 모듈들을 한 데 모아
// 일관된 형태로 내보내거나 관리하고자 할 때 사용합니다
```


참고) 모듈을 불러오는 다양한 방법
- ES6 Modules(ESM): import
- CommonJS: require
- AMD: define - require
- Browser: <script src="...">
(이 외에도 System.js, Require.js 등의 모듈 로더등이 있다)

### 그외
- Unicode: 완전한 유니코드를 지원하기 위해 문자열에 새로운 유니코드 리터럴과 정규닉식에 u 모드가 추가되었다. 또한 21비트 형식까지 처리하기 위한 신규 API가 추가되었다. 추가된 기능은 JavaScript로 글로벌 앱을 만드는 것이 가능하다.
- Modules: 언어 차원에서 컴포넌트 정의를 위한 모듈을 지원한다. 유명한 JavaScript 모듈 로더들(AMD, CommonJS)의 패턴을 적용시켰다. 런타임 동작은 호스트에 정의된 기본 로더에 의해 정의된다. 묵시적 비동기 형태로 요구되는 모듈들이 정상적으로 로드되기 전까지 코드가 실행되지 않는다. 
- Module 로더: 모듈 로더는 주요 모듈 포맷으로 작성된 모듈을 해석하고 로드한다. 모듈 로더는 런타임에 실행된다.
- Map + Set + WeakMap + WeakSet: 일반 알고리즘을 위한 효율적인 데이터 구조를 제공한다. WeakMap과 WeakSet는 메모리 누수로 부터 자유롭게 해준다. 이들 내 저장된 객체에 다른 참조가 없는 경우, garbage collection 될 수 있다.
- Proxies: 프록시(Proxy)를 사용하면 호스트 객체에 다양한 기능을 추가하여 객체를 생성할 수 있다. 프록시는 대상을 가상화하여 프록시와 대상이 사용하는 기능을 동일한 객체로 표시되도록 한다. interception, 객체 추상화, 로깅/수집, 값 검증 등에 사용될 수 있다.
- Symbols: 심볼(Symbol)은 객체 상태의 접근 제어를 가능하게 한다. Symbol은 새로운 원시 타입으로 이름 충돌의 위험 없이 속성(property)의 키(key)로 사용할 수 있다. 옵션 파라미터인 description는 디버깅 용도로 사용되며 식별 용도는 아니다. Symbol은 고유(unique)하며, Object.getOwnPropertySymbols와 같은 reflection 기능들로 접근할 수 있기 때문에 private 하진 않다(for in나 Object.keys()로는 접근 불가).
- Math + Number + String + Array + Object APIs: core Math 라이브러리, Array 생성 helper, String helper, 복사를 위한 Object.assign 등 많은 라이브러리들이 추가되었다.
- Reflect API: Reflection API는 런타임 시 객체에 대해 작업을 수행할 수 있다. 프록시 트랩(proxy traps)와 같은 메타 함수들을 가지고 있다. Reflection은 프록시를 구현하는데 유용하다. Reflect 객체로 표현된 리플렉션 API는 프록시가 오버라이드 할 수있는 것과 동일한 로우 레벨 연산에 대한 기본 동작을 제공하는 메서드 컬렉션이다. 모든 프록시 Trap에 대해 Reflect 메서드가 있다.
- Tail Calls: 마지막에 호출되는 함수가 호출 스택이 초과되게 하지 않습니다. 재귀 알고리즘을 매우 큰 입력 값에서도 안전하게 만든다.

## ES5와의 구분

### 프로퍼티의 키와 이름
오브젝트를 정의할때, 오브젝트는 프로젝트 키 또는 이름과 프로퍼티의 값으로 구분됩니다. ES5에서는 프로퍼티의 키와 이름을 구분하지 않았지만 ES6에서는 구분해야 합니다. `ES6에서 프로퍼티 이름은 문자열 타입의 이름을 나타냅니다. 프로퍼티 키는 여기에 Symbol 값이 포함됩니다.` 프로퍼티 키는 문자열 타입의 이름과 Symbol값을 포함합니다. 

### 함수와 메서드 
함수는 function  키워드를 사용한 형태 입니다. 메서드도 함수와 형태는 같지만 정의가 다릅니다. ES5에서는 오브젝트 프로퍼티(Arrary.isArray())로 작성된 것을 함수라고 했으며, prototype 체인으로 작성된 함수를 메서드라고 했습니다.


```js
// 함수
Arrary.isArray()

// 메서드
Object.prototype.get = function(){ }
```

함수와 메서드는 new 연산자로 인스턴스를 생성할 때 인스턴스에 할당되는 기분이 다르기 때문에 구분이 꼭 필요합니다. 인스턴스는 Array.isArray() 를 호출할 수 없지만 prototype에 연결된 get은 호출할 수 있습니다. 


## 마치며 
ES6(ECMA2015)는 확정되었지만 아직 모든 브라우저에서 완전하게 지원되지 않습니다. 따라서 Babel과 가은 자바스크립트 컴파일러를 통해 최신버전의 문법을 브라우저와 호환가능한 문법으로 변환하여 사용해야 합니다. babel사용시 조심한 점은, babel은 문법을 변환해 주는 역할만 할 뿐 최신으로 추가된 함수를 변환하는 것이 아니기 때문에 이 때에는 babel-polyfill를 별도로 설정하여 사용해야 합니다. polyfill은 프로그램이 처음에 시작될 때 현재 브라우저에서 지원하지 않는 함수를 검사해서 각 object의 prototype에 붙여주는 역할을 합니다. 즉, babel은 컴파일-타임에 실행되고 babel-polyfill은 런-타임에 실행되는 것입니다. 앞으로 계속 ES6를 지원하는 브라우저들은 점점 늘어 날 것 이기 때문에 미리미리 공부해 둡시다.


- 기본 매개 변수 (Default Parameters)
- 템플릿 리터럴 (Template Literals)
- 멀티 라인 문자열 (Multi-line Strings)
- 비구조화 할당 (Destructuring Assignment)
- 향상된 객체 리터럴 (Enhanced Object Literals)
- 화살표 함수 (Arrow Functions)
- Promises
- 블록 범위 생성자 Let 및 Const (Block-Scoped Constructs Let and Const)
- 클래스 (Classes)
- 모듈 (Modules)


----
해당 내용은 다음 글을 참고 하였습니다.
- https://blog.asamaru.net/2017/08/14/top-10-es6-features
- https://itstory.tk/entry/JavaScript-ES6-%EB%AC%B8%EB%B2%95-%EC%A0%95%EB%A6%AC
- https://jeong-pro.tistory.com/117
- https://poiemaweb.com/es6-block-scope
- https://jsdev.kr/t/es6/2944
- https://gs.saro.me/dev?tn=432