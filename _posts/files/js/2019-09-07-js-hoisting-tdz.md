---
layout: post
title: let과 const는 호이스팅 될까? (Hoisting과 TDZ)
categories: JavaScript
---

let 또는 const가 호이스팅 되는지 여부를 알아보기 전에 호이스팅과 Temporal Dead Zone(TDZ)이란 개념에 대해 알아보겠습니다. var 선언은 할당이 없는 상태로 범위(Scope)의 위로 Hoist될 수 있습니다. 하지만 const와 let 선언은 시간적 데드 존(Temporal Dead Zones (TDZ))이라는 새로운 개념의 혜택을 받고 있습니다.

## 호이스팅

var와 let/const선언에 대한 유효 범위는 다릅니다. 다음을 통해 변수가 선언된 유효 범위를 확인해 볼 수 있습니다. 다음에서 this는 해당 변수의 유효범위를 가리킵니다.

```jsx
var x = "global";
let y = "global";
console.log(this.x); // "global"
console.log(this.y); // undefined
// 글로벌 let 변수는 글로벌 객체의 속성이 아니다.
// 모든 JS 코드들을 둘러싸는 보이지 않는 개념적인 블럭 안에 존재한다.

console.log(foo); // undefined
var foo = 2; // hoisting 됨

console.log(foo); // ReferenceError: foo is not defined
let foo = 2; // let 변수를 선언 전에 참조하는 것은 에러
```

### var

JS 함수 안에서 선언한 var의 스코프는 해당 함수 전체입니다. 하나는 어떤 블럭 안에 선언한 변수의 스코프가 해당 블럭이 아니라는 점입니다. 변수의 스코프는 함수입니다. var 의 스코프가 결정되는 방식은, 가장 가까운 함수를 찾아 결졍됩니다. if문같은 블록이 있다고 하더라도, 함수가 아니기 때문에 스코프에 영향을 미치지 않습니다.

var로 선언된 x는 함수범위로 스코프를 가집니다. 다음 IIFE로 선언된 클로저 함수의 스코프에서 x는 함수의 시작점으로 호이스팅 되기 때문에 x는 undefined가 출력됩니다.

```jsx
var x = "outer scope";
(function () {
  console.log(x); // undefined
  var x = "inner scope";
})();

// 아래와 동일한 코드
var x = "outer scope";
(function () {
  var x;
  console.log(x); // undefined
  x = "inner scope";
})();
```

### 단점

다음 코드는 for문과 setTimeout(Web API)함수가 중첩으로 이루거 져 있습니다. for문이 실행되는 것과 setTimeout이 실행되는 것은 별개 입니다. 그런데 자세히 보면 i라는 변수를 공유하고 있습니다.

```jsx
var messages = ["Meow!", "I'm a talking cat!", "Callbacks are fun!"];

for (var i = 0; i < messages.length; i++) {
  setTimeout(function () {
    cat.say(messages[i]); // undefined이 3번 호출됨.
  }, i * 1500);
}
```

코드가 제대로 동작하지 않습니다. 이 같은 문제가 발생하는 이유는, 루프 안의 변수가 과도하게 공유되기 때문입니다. 이 코드에 변수는 i 오직 하나뿐입니다. `변수 i는 루프에서 공유될 뿐 아니라 세번의 콜백 호출에서도 공유`됩니다. 루프가 종료될 때, 변수 i 의 값은 3 입니다 (messages.length 의 값이 3 이기때문). 그리고 콜백은 아직 한번도 호출되지 않았습니다. 그래서 처음으로 타임아웃이 만료되어 콜백 함수가 호출될 때, cat.say(messages[i]) 코드는 이미 3이 되어 버린 공유되는 변수 i를 이용하여 messages[3]를 참조합니다. 분명히 그 값은 undefined 입니다.

이것이 var 스코프 규칙 때문에 발생하는 문제입니다.

번외지만, 이를 해결하기 위해 클로저를 사용할 수 있습니다. 클로저는 독립적인 (자유) 변수를 가리키는 함수로, 클로저 안에 정의된 함수는 만들어진 환경을 ‘기억한다’는 특징을 가지고 있기에 클로저를 사용하면 원하는 대로 동작하도록 만들 수 있습니다.

```js
var i;
for (i = 0; i < 10; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, 100);
  })(i);
}
```

중간에 IIFE(즉시실행함수표현 IIFE, Immediately Invoked Function Expression)를 덧붙여 setTimeout()에 걸린 익명함수를 클로저로 만들었습니다. 앞서 말한대로 클로저는 만들어진 환경을 기억합니다. 이 코드에서 i는 IIFE내에 j라는 형태로 주입되고, 클로저에 의해 각기 다른 환경속에 포함됩니다. 반복문은 10회 반복되므로 10개의 환경이 생길 것이고, 10개의 서로 다른 환경에 10개의 서로 다른 j가 생깁니다.

이쯤에서 IIFE 매개변수로 i를 넘기지 않고 그냥 직접 참조해도 되지 않느냐는 의문이 들 수도 있습니다. 하지만 직접 그렇게 해보면 원하는 대로 동작하지 않습니다. 위의 예제에서는 IIFE를 통해서 클로저마다 환경이 생깁니다. 하지만 인자로 i를 넘기지 않는다면 당연히 클로저가 참조하는 IIFE의 함수 스코프에서도 i값이 없으므로 생성 당시의 외부 스코프인 글로벌을 탐색하게 되고 결국 모두 같은 i를 참조하게 됩니다. 반면에, 인자로 i를 넘기게 되면 IIFE로 만든 10개의 스코프에 모두 i라는 변수가 다른 값으로 생기므로 정상적으로 동작할 수 있는 것입니다.

클로저 특징을 정리 해 보면,

1. 클로저는 function 안에 function이 존재할 때 생성된다.
2. 함수가 정의된 스코프(scope) 이외의 곳에서 사용될 때, private 처럼 사용이 가능하다.
3. 전역변수 사용을 억제하고 변수간의 충돌을 막을 수 있다. 이로인해 이벤트, 애니메이션에서 효과적으로 함수 사용이 가능하다.

단점으로는,

1. 메모리를 소모한다.
2. 스코프(scope) 생성에 따른 퍼포먼스 손해가 있다.
3. 직관적인 이해가 어려워 정확한 주석이나 문서와 같은 내용으로 정리를 해두는 것이 좋다.

참고) 호이스팅에는 장점도 있습니다. 호이스팅이 없다면, 글로벌 스코프에서 적절하게 동작하는 많은 수의 그럴듯한 기법들이 IIFE 안에서 동작하지 않게 될 것입니다.

### let/const

let과 const는 블록 범위 스코프를 가집니다.

### var와 let/const의 호이스팅

ES6를 포함한 자바스크림트에서의 변수선언은 호이스팅이 됩니다. 호이스팅은 선언된 타입의 유효 범위에 따라 다릅니다. var는 함수 범위 스코프, let과 const는 블록 범위 스코프이므로 다음 let 선언은 블록 시작부분에 Hoist합니다. let 변수를 선언 전에 참조하는 것은 에러입니다.

```js
let foo = 1; // 전역 변수

{
  console.log(foo); // ReferenceError: foo is not defined
  let foo = 2; // let은 블록 레벨 스코프를 가지므로 foo는 지역 변수
}
```

const로 선언된 x는 블록 스코프(함수 블록 포함)를 가집니다. 다음 IIFE로 선언된 클로저 함수의 스코프에서 x는 블록 시작점으로 호이스팅됩니다. 호이스팅되었기 때문에 x는 ReferenceError가 출력됩니다.

```jsx
const x = "outer scope";
(function () {
  console.log(x);
  const x = "inner scope";
})();
```

변수 선언의 순서를 다르게 적용하여 코드를 다시 살펴 보겠습니다.

```jsx
let a = "aaa";
(function () {
  let a;
  console.log(a); // undefined
})();
```

다음 코드를 얼핏 보면 호이스팅이 되지 않아 access 에러가 나는 것 처럼 보이지만, 실제로는 호이스팅 되어 access에러가 발생하는 것입니다. 왜냐하면 호이스팅 되지 않았다면 함수 밖에 선언된 let a='aaa'를 참조하여 정상적으로 출력되어야 할 것인데, 그렇지 않기 때문입니다. 호이스팅 되었는데 access에러가 나는 이유는 무엇일까요? 바로 TDZ때문입니다. TDZ는 아래에서 자세히 다룹니다.

```jsx
let a = "aaa";
(function () {
  console.log(a);
  let a; // 호이스팅되어 Cannot access 'a' before initialization
})();
```

### 함수 호이스팅

함수도 역시 선언식인 경우 호이스팅이 되어 다음과 같이 작성해도 에러가 나지 않습니다.

```jsx
let name;
getName();
console.log(name); // "Chris"

function getName() {
  //함수 선언식으로 정의(선언과 정의를 동시에)
  name = "Chris";
}
```

함수 표현식(변수 할당)은 호이스팅 되지 않습니다.

```jsx
let name;
getName();
console.log(name); // SyntaxError: Unexpected token function
let function getName(){
  name = 'Nick';
}
```

## TDZ(temporal dead zone)

변수가 존재하지만 초기화되지 않은, 스코프 안의 영역을 일시적 사각지대 즉 TDZ(temporal dead zone) 라고 부릅니다.

성능참고) 거의 대부분의 경우, 코드를 그냥 보는 것만으로도 변수 선언문이 실행되었는지 판단할 수 있습니다. 그래서 JavaScript 엔진도 변수를 참조할 때마다 해당 변수가 초기화되었는지 일일이 확인하지 않습니다. 그런데, 클로져에서는 이 문제가 다소 모호해집니다. 그래서 JavaScript 엔진도 이 경우에는 런-타임에 변수의 초기화 여부를 체크합니다. 이는 let 이 var 보다 아주 약간 느릴 수 있다는 것을 의미합니다.)

### let/const은 TDZ에 의해 제약을 받는다

var와 let/const선언에 대한 범위의 차이 중 하나는 `let/const가 TDZ에 의해 제약을 받는다`는 것입니다. 즉, 변수가 초기화되기 전에 액세스하려고 하면 var처럼 undefined를 반환하지 않고, ReferenceError가 발생합니다. 이는 코드를 예측가능하고 잠재적 버그를 쉽게 찾아낼 수 있도록 한다는 장점이 있습니다.

## ES6에서의 변수선언 호이스팅

예제를 다시 살펴 보겠습니다.

```js
let foo = 1; // 전역 변수

{
  console.log(foo); // ReferenceError: foo is not defined
  let foo = 2; // let은 블록 레벨 스코프를 가지므로 foo는 지역 변수
}
```

전역 변수 foo의 값이 출력될 것처럼 보입니다. 하지만 ES6의 선언문도 여전히 호이스팅이 발생하기 때문에 참조 에러(ReferenceError)가 발생합니다. ES6의 let으로 선언된 변수는 블록 레벨 스코프를 가지므로 코드 블록 내에서 선언된 변수 foo는 지역 변수가 됩니다. 따라서 지역 변수 foo도 `해당 스코프에서 호이스팅되고 코드 블록의 선두부터 초기화가 이루어지는 지점까지 일시적 사각지대(TDZ)`에 빠지게 됩니다. 따라서 전역 변수 foo의 값이 출력되지 않고 참조 에러(ReferenceError)가 발생합니다.

## 정리

let/const선언은 실행중인 실행 컨텍스트의 어휘적 환경(Lexical Environment)으로 범위가 지정된 변수를 정의합니다. 변수는 그들의 어휘적 환경에 포함될 때 생성되지만, 어휘적 바인딩(할당)이 실행되기 전까지는 액세스할 수 없습니다. 새로운 범위에 진입할 때마다 지정된 범위에 속한 모든 let/const 바인딩이 지정된 범위 내부의 코드가 실행되기 전에 실행됩니다. (즉, let/const선언이 호이스팅된다.) 어휘적 바인딩이 실행되기 전까지 액세스할 수 없는 현상을 TDZ라고 합니다.

https://charlie-junbeom-94043.tistory.com/14

---

해당 내용은 다음 글을 참고 하였습니다.

- https://charlie-junbeom-94043.tistory.com/14
- http://hacks.mozilla.or.kr/2016/03/es6-in-depth-let-and-const/
- https://medium.com/korbit-engineering/let%EA%B3%BC-const%EB%8A%94-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EB%90%A0%EA%B9%8C-72fcf2fac365
