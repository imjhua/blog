---
layout: post
title: ES6의 Generator Function
categories: JavaScript
---

함수를 호출하면 함수 블록의 코드를 한번에 실행하지만, 제너레이터 오브젝트는 나누어서 실행할 수 있습니다. 그렇기 때문에 제너레이터는 비동기 프로그래밍을 위한 중요한 도구로 사용됩니다.

자바스크립트가 다른 언어들과 구분되는 큰 특징 중의 하나는 바로 싱글스레드를 기반으로 하는 비동기 방식의 언어라는 점입니다. 이런 특징에 힘입어 Non-blocking IO을 사용하는 Node.js의 언어로 사용되면서 최근에는 서버사이드에서도 인기를 얻고 있는 언어이기도 합니다. 하지만 이런 구조적 특징에서 오는 단점도 적지 않은데, 대표적인 것이 바로 연속적 전달 방식으로 인한 콜백 지옥(래퍼에 래퍼에 계속 deepth가 있는 형태)입니다. 지금까지 이 콜백 지옥을 해결하기 위해 많은 시도가 있었습니다. promise, async/await 등 입니다. 지금 부터 알아볼 콜백지옥을 벗어나는 하나의 해결 방안인 Genrator 함수에 대해 알아보겠습니다.

## 제너레이터(Generator)

ES6에 새로 추가된 제너레이터(Generator)는 이터레이터(Iterator)를 쉽게 만들 수 있는 문법입니다. 제너레이터 함수는 함수 블록을 실행하지 않고 제너레이터 오브젝트를 생성하여 반환합니다. 생성된 제너레이터 오브젝트는 이터레이터오브젝트 입니다. 이터레이터 오브젝트의 메서드를 호출했을 때 제너레이터 함수 블록을 실행합니다.

Iterator 인터페이스를 이용하는 쪽에서 다음 값을 요청하면 Generator는 값을 계산하여 yield 합니다. Iterator 인터페이스를 직접 구현하는 것 보다 Generator를 이용하여 구현하는 것이 훨씬 편리합니다.

### 이터레이터 구현체

다음은 range() 구현체와 똑같은 대치물입니다. 이렇게 대치 가능한 이유는 제너레이터가 이터레이터이기 때문입니다.

```js
function* range(start, stop) {
  for (var i = start; i < stop; i++) yield i;
}
```

이터레이터로 동작하면 다음과 같은 장점들이 존재 합니다.

- 객체를 이터러블(iterable)하게 만듭니다.
- 배열 생성 함수를 간단하게 만듭니다.
- 엄청나게 큰 결과를 처리합니다.
- 복잡한 루프 구문을 리팩토링 합니다.
- 이터러블을 다루는 도구로 사용합니다. (fillterfing, mapping 등)

### 코루틴

코루틴은 어떠한 작업을 처리할 때 필요에 따라 시간 간격을 두고 작업을 처리할 수 있도록 도와주는 함수 형식을 말합니다. 코루틴은 항상 실행되는 것이 아니라 필요한 상황에서만 발생시킬수 있다는 점에서 매번 실행되는 구분 보다 훨씬 강력하고 효율적입니다. 제너레이터 함수에서는 yield를 통해 yield지점까지 실행 후 suspend되고 다음 호출은 yield지점 이후 부터 resume되어 실행을 이어갈 수 있습니다. 이러한 관점에서 제너레이터는 코루틴의 일종이라고 할 수 있습니다.

#### generator 코루틴

제너레터는 yield 에서 호출자에 값을 전달하면서 실행을 멈추고(pause/suspend) 다시 next()가 호출되면 아까 멈춘 위치에서 실행을 시작(resume)하여 다음 yield까지 실행되고 또 멈춥니다. 이러한 관점에서 제너레이터는 함수의 실행을 중간에 멈추었다가 필요한 시점에 다시 재개할 수 있는 일종의 코루틴(Coroutine) 이라고 볼 수 있는데, 코루틴과는 다르게 멈출 때 돌아갈 위치를 직접 지정할 수 없고, 단순히 호출자에게 제어권을 넘겨주게 됩니다. 그래서 세미-코루틴이라 불리기도 합니다.

```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
}
// foo()로 생성된 제너레이터를 순회하며 값을 읽어간다.
for (let i of foo()) {
  console.log(i);
}
```

#### Async/await 코루틴

Async/await 에도 코루틴이 존재 합니다. Promise를 반환하는 비동기(async) 함수들은 그 결과를 얻어 새로운 연산을 수행하기 위해 Promise 객체에 promise.then(value => …) 처럼 콜백을 등록하여 사용하거나 await로 준비된 값을 꺼내 비동기 처리를 할 수 있습니다. try/for/if 와 같은 제어문들을 그대로 사용할 수 있어서 코드를 이해하기 수월해지는 장점이 있습니다. Async 함수는 await에서 suspend되고, await 대상 Promise에서 값이 준비되면 resume되어 다시 실행을 이어가게 됩니다.

```js
async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url);
  } catch (e) {
    v = await downloadFallbackData(url);
  }
  return processDataInWorker(v);
}
```

#### 제너레이터와 Async 코루틴 비교

Generator 코루틴과 Async 코루틴의 차이점은 suspend된 코루틴이 일급객체인가 아닌가 하는 것 입니다. 각 언어들마다 약간의 차이가 있겠지만 대체로 비슷합니다. Async 코루틴은 최종 결과를 나타내는 Promise를 반환할 뿐 suspend된 상태의 코루틴에 대한 핸들이 제공되지 않습니다. Generator가 resume가능한 핸들을 제공하기 때문에 Async코루틴이 제공되지 않는 환경(혹은 적절하지 않은 경우)에서는 Generator 코루틴으로 Async 코루틴을 흉내내는 것이 가능합니다.

## 제너레이터 함수(Generator Function)

일반 함수는 function 키워드로 시작합니다. 제너레이터-함수는 function\* 키워드로 시작합니다. 제너레이터 함수는 함수블록을 실행하지 않고 제너레이터 오브젝트를 생성하여 반환합니다. 단 한 번의 실행으로 함수의 끝까지 실행이 완료되는 일반 함수와는 달리, 제너레이터 함수는 사용자의 요구에 따라 (yield와 next를 통해) 일시적으로 정지될 수도 있고, 다시 시작될 수도 있습니다. 이때, 제너레이터 함수는 제너레이터 객체를 반환하고 제너레이터 객체는 이터레이터 오브젝트 입니다. 제너레이터 함수 선언문은 다음과 같습니다.

```js
function* generatorFunction() {
  /* ... */
}
```

### 제너레이터와 제너레이터함수의 구분

우리가 function\* 키워드로 작성하는 함수는 제너레이터가 아닌 제너레이터함수입니다. 그리고 이 제너레이터함수를 호출하면 반환되는 객체가 바로 제너레이터입니다. 제너레이터는 이터레이터(Iterator) 프로토콜과 이터러블(Iterable) 프로토콜을 따릅니다.

### 형식

```js
function* myGeneratorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = myGeneratorFunction();

// 오브젝트에 [Symbol.iterator] 를 호출하면 이터레이터 오브젝트를 생성하여 반환한다.
// 이 말인 즉슨, 제너레이터의 이터러블은 다음과 같은 방식으로 구현되어 있을 거라는 것을 암시한다.
// generator[Symbol.iterator] = () => this;
generator === generator[Symbol.iterator](); // true

console.log(generator.next()); // {value: 1, done: false}
console.log(generator.next()); // {value: 2, done: false}
console.log(generator.next()); // {value: 3, done: false}
console.log(generator.next()); // {value: undefined, done: true}
```

모든 제너레이터는 .next() 코드와 \[Symbol.iterator\]() 코드를 내장(built-in)하고 있습니다. 당신은 그냥 루프 처리만 작성하면 됩니다. 이터러블 프로토콜은 단순히 obj\[Symbol.iterator\]: Function => Iterator로 표현할 수 있습니다. 객체는 이터레이터 심볼(Symbol) 키값에 이터레이터를 반환하는 메서드를 가지고 있다면 이터러블이라고 할 수 있습니다. 이터레이터 프로토콜은 매우 단순한데, 객체가 next라는 메서드를 가지고 있고, 그 결과로 IteratorResult 라는 객체를 반환하면 됩니다. 반환되는 IteratorResult는 {done: boolean, value: any} 형태의 단순한 객체입니다. 제너레이터는 이터러블이면서 이터레이터라는 것인데, 이터러블에서 반환하는 이터레이터가 바로 자기 자신입니다.

### Caller와 Callee

제너레이터함수는 Callee, 이를 호출하는 함수는 Caller로 구분 할 수 있습니다. 두 관계는 다음과 같습니다.

- Caller는 Callee가 반환한 제너레이터를 가지고 로직을 수행한다.
- Caller는 Callee의 yield 지점에서 다음 진행 여부/시점을 제어한다.

### 동작 방식

제너레이터함수 안에는 있는 yield 구문은 제너레이터의 실행을 멈췄다가 다음에 다시 시작할 수 있게 만듭니다. 기술적 관점에서, 제너레이터의 yield 구문이 실행될 때, 제너레이터의 스택 프레임 (stack frame: 로컬 변수, 인자, 임시 값, 제너레이터 코드의 실행 위치)은 스택에서 제거됩니다. 하지만, 제너레이터 객체는 이 스택 프레임에 대한 참조를 (또는 복사본을) 유지하고 있다가 다음번 .next() 호출 때 재활성화 시켜서 실행을 계속합니다. 즉, 제너레이터는 실행될 때 이터레이터를 반환합니다. 그리고 이터레이터의 next() 함수가 호출될 때마다 호출되는 곳의 위치를 기억해둔 채로 실행되는 것입니다. 그리고 함수 내부에서 yield를 만날 때마다 기억해둔 위치로 제어권을 넘겨줍니다. 따라서 yield 수 만큼 next()를 호출해야 제너레이터 함수 전체를 실행하게됩니다. yield 수보다 next()를 더 호출하게 되면 yield 가 더이상 존재하지 않으므로 {value: undefined, done: true} 을 반환합니다.

#### yield / next

next() -> yield -> next() -> yield 라는 순환 흐름이 만들어 지고, 이 흐름을 따라 해당 함수가 끝날 때까지 (return을 만나거나 마지막 라인이 실행될 때까지) 진행됩니다. 이터레이터를 생성해서 next()를 실행하면 결과의 value 값으로 프라미스를 반환하고, 프라미스의 then() 메서드에서 다시 이터레이터의 next() 함수를 실행합니다. 이런 식으로 이터레이터가 done:true를 반환할 때까지 순환하면서 호출하게 됩니다. 즉, next() -> yield -> then() -> next()의 순환흐름에 따라 실행되는 것입니다.

### 키워드

#### yield

next()와 yield는 서로 데이터를 주고받을 수 있습니다. yield 키워드 뒤의 값은 next() 함수의 반환값으로 전달됩니다(정확히는 value 프라퍼티의 값으로). 반대로 호출자가 제너레이터에게 값을 전달하는 것도 가능합니다. next()를 호출할 때 인수를 넘기면 됩니다. 즉, 데이터가 흘러가능 방향을 바꿀 수 있게됩니다. next()를 호출할 때 인수로 값을 지정하면 yield 키워드가 있는 대입문에 값이 할당되는 것을 볼 수 있습니다. 제너레이터와 호출자는 서로 제어권 뿐만 아니라 데이터까지 주고받을 수 있습니다.

```js
function* foo() {
  console.log(yield)
  console.log(yield)
  console.log(yield)
}
let g = foo()
g.next() // start generator
g.next(1)
g.next(2)
g.next(3)


-----


function *myGen() {
    const x = yield 1;       // x = 10
    const y = yield (x + 1); // y = 20
    const z = yield (y + 2); // z = 30
    return x + y + z;
}

const myItr = myGen();
console.log(myItr.next());   // {value:1, done:false}
console.log(myItr.next(10)); // {value:11, done:false}
console.log(myItr.next(20)); // {value:22, done:false}
console.log(myItr.next(30)); // {value:60, done:true}
```

#### yield yield

```js
function* sampleGFunction() {
  return yield yield yield;
}
const gen = sampleGFunction();
console.log(gen.next()); // {value: undefined, done: false}
console.log(gen.next(1)); // {value: 1, done: false}
console.log(gen.next(2)); // {value: 2, done: false}
console.log(gen.next(3)); // {value: 3, done: true}
console.log(gen.next(4)); // {value: undefined, done: true}



```


#### yield*

yield 다음에 오는 표현식에 제너레이터함수를 작성할 수 있습니다. 표현식으로 호출된 함수에 다수의 yield가 있으면 next() 호출시, 호출된 함수의 yield를 전부 처리한 후 yield\* 이후에 작성한 코드를 실행합니다.

```js
// iterater
function* gen1() {
  yield* [10, 20];
}
let gentObj1 = gen1();

console.log(gentObj1.next()); // {value: 10, done: false}
console.log(gentObj1.next()); // {value: 20, done: false}
console.log(gentObj1.next(77)); // {value: undefined, done: true}

----

// generator
let plusGen = function*(value) {
  yield value + 5;
  yield value + 10;
};

let gen6 = function*(value) {
  yield* plusGen(value);
  yield value + 20;
};

let genObj6 = gen6(10);

console.log(genObj6.next());
console.log(genObj6.next());
console.log(genObj6.next());

----

// recursive fn
let gen7 = function*(value) {
  yield value; // 없으면 계속자기 자신을 호출하므로 무한루프를 돌게된다.
  yield* gen7(value + 10);
};

let genObj7 = gen7(1);

console.log(genObj7.next());
console.log(genObj7.next());
console.log(genObj7.next());
```

#### return
return은 수행되고 있는 이터레이터를 종료시키며, `return 뒤에 오는 값은 IteratorResult 객체의 value 프로퍼티에 할당되며, done 프로퍼티는 true가 할당`됩니다. iter.next() 호출에서, 우리는 제너레이터-함수의 마지막에 도달하면 결과값의 .done 필드가 true가 되는 것입니다.

```js
function* sampleGFunction(value) {
  return ++value;
}

const generator = sampleGFunction(1);
console.log(generator.next()); // { value: 2, done: true }
```

#### return()
다음 yield가 있더라도 로직을 더이상 수행하지 않고 파라미터를 value에 할당하고 done은 true를 반환합니다.  그리고 더이상 return을 호출해도, 제너레이터는 수행이 끝났기 때문에 undefiend값이 반환됩니다.

```js
function* sampleGFunction(value) {
  yield "test1"; 
  yield "test2";
  yield "test3";
}
const gen = sampleGFunction(1);

gen.next(); // {value: "test1", done: false}
gen.return("test10"); // {value: "test10", done: true}
gen.return("test100"); // {value: undefined, done: true}
```

제너레이터 함수를 실행하지않는다, 따라서 yield를 수행하지 않는다.
value를 77로, done을 true로 하여 yield 표현식이 남아 있음에도 이터레이터를 종료시킨다.

#### throw()

```js
gen.throw("My Error!");
```

제너레이터 오브젝트의 throw를 호출하면 에러가 발생한다. 에러가 발생하면 제너레이터함수의 catch문에서 에러를 받는다. 중요한점은, 에러가 발생하여도 제너레이터가 이터레이터가 종료 되는 것이 아니라는 점이다. doen: false를 반환한다. 즉, 에러가 발생했지만 next를 호출하여 다음 yield 표현식을 수행한다.

`catch 블럭을 수행하지만 이터레이터가 종료된 것은 아니다`. 즉, 에러가 발생했지만 다음에 next를 호출 할 수 있다.

#### 변수의 사용

next() 를 해서 제너레이터 함수를 계속 호출하게 되는데, 이때 제너레이터 함수의 변수 값은 전 함수에서 설정된 값을 계속 유지 하고 있게 됩니다.

```js
let gengen = function*() {
  let value = 10;
  one = yield (value = value + 10);
  two = yield (value = value + 10);
};

let genObjgenObj = gengen();
console.log(genObjgenObj.next()); // {value: 20, done: false}
console.log(genObjgenObj.next()); //{value: 30, done: false}
console.log(genObjgenObj.next()); // {value: undefined, done: true}
```

제너레이터 함수 밖에서 선언된 변수를 함수 내에서 사용하는 경우 변수의 값이 그대로 유지 됩니다.

```js
let one, two;
let gen = function*() {
  one = yield;
  two = yield one + 10;
};

let genObj = gen();
console.log(genObj.next()); // {value: undefined, done: false}
console.log(one); // undefined
console.log(genObj.next(12)); // {value: 22, done: false}
console.log(genObj.next(34)); // {value: undefined, done: true}
console.log(one); // 12
```

### 특징

제너레이터는 분명 함수의 내부에서는 콜백도 없고 프로미스도 없지만, 비동기적으로 데이터를 주고받으며 실행되고 있습니다. 이 무슨 비동기인 듯 비동기 아닌 비동기 같은 코드처럼 보입니다.

#### 제너레이터는 스래드가 아니다

제너레이터는 쓰래드(thread)가 아니라는 점을 명심합시다. 쓰래드를 지원하는 랭귀지들은 여러개의 코드를 동시에 실행시킵니다. 그래서 자원 경합 상황(race conditions), 비결정적 실행 특성(nondeterminism), 그리고 아주 아주 달콤한 성능(performance)을 만들어냅니다. 제너레이터는 쓰래드와 완전히 다릅니다. 제너레이터 코드는 제너레이터를 호출하는 코드와 같은 쓰래드에서 실행됩니다. 코드는 정의된 순서에 따라 항상 똑같은 순서로 실행되며 여러 코드가 동시에 실행되는 경우는 절대 없습니다. 시스템 쓰래드와 다르게, 제너레이터는 yield 구문에 의해서만 실행을 멈춥니다.

#### 제너레이터가 이터레이터로 동작하는 이점

- 객체를 이터러블 하게 만든다.
- 배열 생성 함수를 간다하게 만든다.
- 큰 결과 처리
- 복잡한 루프 구분 리팩토링
- 이터러블을 다루는 도구로 사용. 필터링 맵핑등

```js
function* filter(test, iterable) {
  for (var item of iterable) {
    if (test(item)) yield item;
  }
}
```

#### 기존 비동기 호출의 변천사

```js
// promise
function orderCoffee(phoneNumber) {
    return getId(phoneNumber)
        .then(id => getEmail(id))
        .then(email => getName(email))
        .then(name => order(name, 'coffee'));
}

-----
// generator
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

## for-of
for-of() 문에 제너레이터 함수를 호출할 수 있습니다. 제너레이터 오브젝트를 생성하여 반환하는데, 반환받은 오브젝트는 할당할 변수가 없으므로 엔진 내부에 저장합니다. 다시 제너레이터 함수를 호출하며 이는 next()를 호출한것과 같습니다. 즉, 반복이란, for-of문을 시작할 댸 생성한 제너레이터 오브젝트의 next()를 호출하는 것 입니다.

```js
function* forOfGenFn() {
  let index = 0;
  while (true) {
    yield index++;
  }
}
for (const count of forOfGenFn()) { 
  console.log(count)
  if(count > 3) {
    break;
  }; 
}
```
## 응용
### 초기값 한번만 설정
일반 function키워드 함수는 다시 함수 안으로 들어가면 변수에 초기값을 설정하지만, 제너레이터 함수는 변수에 설정된 값을 유지합니다. 이것이 제너레이터 함수의 특징입니다.
```js
let index = 0;
function increment() {
  return index++;
}
console.log(increment()); // 0
console.log(increment()); // 1

function* incrementGenFn(){
  let index = 0;
  while(true){
    yield index++;
  }
}
const incrementGen = incrementGenFn();
console.log(incrementGen.next()); // {value: 0, done: false}
console.log(incrementGen.next()); // {value: 1, done: false}

```



### 다른 함수와의 의존성
중간에 다른 함수를 호출한 결과값으로의 처리가 필요한 경우 다음과 같이 제너레이터의 next의 파라미터를 넣어 활용 할 수 있다.

```js
const hiMsg = "hello!";
function* personGenFn() {
  const name = yield hiMsg;
  return `my name is: ${name}`;
}

function getFullName(firtst, second) {
  return `${firtst} ${second}`;
}


const gen = personGenFn();
console.log(gen.next());

// 중간에 연산이 필요한 경우 호출한 값을 param으로 넘겨
// 제너레이터에서 제어가 가능함
const firtst = "kim";
const second = "jh";
const name = getFullName(firtst, second);

console.log(gen.next(name));
console.log(gen.next());

```
---

해당 내용은 다음 글을 참고 하였습니다.

- https://meetup.toast.com/posts/140
- http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/
- https://meetup.toast.com/posts/73
- https://medium.com/@jooyunghan/%EC%BD%94%EB%A3%A8%ED%8B%B4-%EC%86%8C%EA%B0%9C-504cecc89407
- https://wonism.github.io/javascript-generator/
