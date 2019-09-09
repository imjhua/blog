---
layout: post
title: ECMAScript 역사
categories: JavaScript
categories: TODO
---

ECMA스크립트(ECMAScript, 또는 ES)는 Ecma 인터내셔널의 ECMA-262 기술 규격에 정의된 표준화된 스크립트 프로그래밍 언어입니다. 자바스크립트를 표준화하기 위해 만들어졌고 지금도 자바스크립트가 제일 잘 알려져 있지만, 액션스크립트와 J스크립트 등 다른 구현체도 포함하고 있습니다. ECMA스크립트는 웹의 클라이언트 사이드 스크립트로 많이 사용되며 Node.js를 사용한 서버 응용 프로그램 및 서비스에도 점차 많이 쓰이고 있습니다

## 판본

| 판  | 출판일                                                                                                                          | 이름                                                                                                                    | 이전 판과의 차이점                                                                                                                            |
| --- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 1997년 6월                                                                                                                      | 초판                                                                                                                    |
| 2   | 1998년 6월                                                                                                                      | ISO/IEC 16262 국제 표준과 완전히 동일한 규격을 적용하기 위한 변경.                                                      |
| 3   | 1999년 12월                                                                                                                     | 강력한 정규 표현식, 향상된 문자열 처리, 새로운 제어문 , try/catch 예외 처리, 엄격한 오류 정의, 수치형 출력의 포매팅 등. |
| 4   | 버려짐 4번째 판은 언어에 얽힌 정치적 차이로 인해 버려졌다. 이 판을 작업 가운데 일부는 5번째 판을 이루는 기본이 되고 다른 일부는 | ECMA스크립트의 기본을 이루고 있다.                                                                                      |
| 5   | 2009년 12월                                                                                                                     | 더 철저한 오류 검사를 제공하고 오류 경향이 있는 구조를 피하는 하부집합인 "strict mode"를 추가한다. 3번째 판의 규격에    | 있던 수많은 애매한 부분을 명확히 한다.[3]                                                                                                     |
| 5   | 1 2011년 6월                                                                                                                    | ECMA스크립트 표준의 제 5.1판은 ISO/IEC 16262:2011 국제 표준 제3판과 함께 한다.                                          |
| 6   | 2015년 6월                                                                                                                      | ECMAScript 2015 (ES2015) 6판에는 클래스와 모듈 같은 복잡한 응용 프로그램을 작성하기 위한 새로운 문법이 추가되었다.      | 하지만 이러한 문법의 의미는 5판의 strict mode와 같은 방법으로 정의된다. 이 판은 "ECMAScript Harmony" 혹은 "ES6 Harmony" 등으로 불리기도 한다. |
| 7   | 2016년 6월                                                                                                                      | ECMAScript 2016 (ES2016)                                                                                                |
| 8   | 2017년 6월                                                                                                                      | ECMAScript 2017 (ES2017)                                                                                                |
| 9   | 2018년 6월                                                                                                                      | ECMAScript 2018 (ES2018)                                                                                                |

## 추가된 기능

### ES6

#### 클래스

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
#### Promise
Promise 개체는 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 나타냅니다.

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


#### generator & generator function
Generator 객체는 generator function 으로부터 반환된 값이며 반복자와 반복자 프로토콜을 준수합니다.

```js
function* gen() { 
  yield 1;
  yield 2;
  yield 3;
}

var g = gen(); // "Generator { }"

```


#### 화살표함수
화살표 함수의 this는 자신이 선언된 위치의 this를 마치 call(현재는 보통 function.bind 라고함) 된 것과 같이 그대로 this로 가지고 있는 특성이 있습니다.

```js
// 일반함수
testobj.testCallback(function(){ console.log('hello'); });
// 화살표함수
testobj.testCallback(() => { console.log('hello'); });
```


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

#### 전개 연산자 (spread operator)

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

#### for - of

기존 for in 의 경우 프로퍼티를 가져왔다면, for of 는 반복자를 가져옵니다. 배열, DOM 컬렉션, generator function 에서 사용할 수 있습니다.

```js
var arr = [1, 2, 3];
for (var val of arr) {
  console.log(val);
}
```

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


#### const
읽기전용 값입니다. 블록 단위에서 쓸경우 해당 블록에서만 유효합니다. 즉, cost의 스코프는 블록단위 입니다. 

```js
const aa = 1;
console.log(aa);
aa = 2; // Uncaught TypeError: Assignment to constant variable. 
```

#### Number.isNaN()
글로벌 isNaN 과 달리 정확히 Number 타입의 isNaN인지 구분합니다. 이유는 글로벌 isNaN은 다음과 같은 예상치 못한 결과를 받기 때문입니다.
```js
isNaN(null)      // false
isNaN('0')       // false
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


#### String 템플릿 리터럴

```js
var first = 'kim';
var name = 'jh';
var cnt = 300;
console.log(`${first}, ${name}님. \n숫자더하기 ${ cnt + 33 }`);
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


#### let
var와 유사하지만 블록내로 엄격하게 제한 합니다.
```js
var a = 5;
var b = 10;

if (a === 5)
{
	let a = 4; // IF 블록 안에서만 영향
	var b = 1; // 함수 전체에 영향
	
	console.log(a);  // 4
	console.log(b);  // 1
} 

console.log(a); // 5
console.log(b); // 1
```



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
(이 외에도 System.js, Require.js 등의 모듈 로더가 있습니다)
---

해당 내용은 다음 글을 참고 하였습니다.

- https://ko.wikipedia.org/wiki/ECMA%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8
- https://gs.saro.me/dev?tn=432
