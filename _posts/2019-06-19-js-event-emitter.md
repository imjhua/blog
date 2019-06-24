---
layout: post
title: EventEmitter
categories: JavaScript
---

EventEmitter는 Node.JS에 내장되어 있는 일종의 옵저버 패턴 구현입니다. node 뿐만 아니라 대부분의 프레임워크나 라이브러리에서 이 구현을 쓰거나 유사한 구현을 활용하고 있는 경우가 많습니다. DOM Event Listener를 사용해본 경험이 있다면 사실 특별하게 새로운 기능은 아니지만, 요즘 이 패턴으로 작성된 라이브러리가 많고 특히 node 코어 라이브러리도 이 구현을 사용한 경우가 많습니다. 이러한 이벤트를 정의하고 처리하기 위해이벤트를 발생시키고 처리하는 방식을 EventEmitter 객체를 통해 구현할 수 있습니다. Procedural Programming Model에서 이러한 Event Driven Programming의 개념을 익혀 봅시다.


## 비동기 이벤트 프로그래밍
기존의 프로그래밍 언어들은 일반적으로 함수를 부르는 형태의 프로그래밍 구조를 가지고 있습니다. 이를 procedural programming model이라고 하는데,  코드가 순차적으로 실행되면서 함수를 호출하는 식의 구조를 가지고 있기 때문에 코드를 보면 코드의 수행 순서를 예측할 수 있습니다. 비동기 이벤트 프로그래밍 언어의 대표적인 예로 node.js가 있습니다. nodejs는 event driven programming 이라는 개념을 가지고 있는데, 이 개념은 특정 이벤트가 발생되면 미리 이벤트에 맵핑된 함수가 실행되는 형태입니다다. 즉 해당 함수가 언제 호출 되는지를 예측할 수 가 없습니다. 또한 node.js 특징은 비동기 프로그래밍 방식이 라는 것인데, 앞서 설명한 바와 같이 node.js는 비동기식 IO를 이용합니다. 즉 IO 요청을 보내놓고, 코드를 blocking 상태에서 기다리는 것이 아니라 다음 코드로 진행한 다음, IO 가 끝났다는 이벤트가 오면, 미리 지정해놓은 함수를 실행하는 형태입니다. 이렇게 함수를 호출한후, 작업이 끝난 후에, 호출되도록 정의한 함수를 "callback"함수라고 합니다.


이 코드는 hello.txt 라는 파일을 읽는 코드인데, 맨 뒤에 function(err.contents)라는 함수를 정의하였습니다. 이 함수는 파일을 다 읽었을때 호출되는 callback 함수이다. fs.readFile을 호출하면, node는 파일이 다 읽을때 까지 이 코드에서 block되어 있는 것이 아니라 다음코드로 진행을 한 다음, 파일을 다 읽으면 이벤트를 발생시켜서 여기에 연결된 function(err,contents)를 수행하게 되는 것입니다.

```js
var fs = require('fs');
 
var contents = fs.readFile('hello.txt','utf-8',function(err,contents){
        console.log('read 1:'+contents);
});

```
 
## Event Emitter
Node.js의 코어 API 대부분은 관용적으로 비동기 이벤트 기반 아키텍처를 사용해서 만들어졌습니다. 에미터(emitter)로 불리는 어떤 종류의 객체를 이벤트 이름으로 정의된 특정 이벤트에 정기적으로 전달해 "리스너 listener"로 불리는 함수 객체를 실행합니다. 이벤트를 내보내는 모든 객체는 EventEmitter 클래스의 인스턴스입니다. 이 객체는 하나 이상의 함수를 이벤트로 사용할 수 있도록 이름을 넣어 추가하는 eventEmiter.on() 함수를 사용할 수 있습니다. 이벤트 이름은 일반적으로 cameCase(카멜 케이스)로 작성된 문자열이지만 JavaScript의 프로퍼티 키로 사용할 수 있는 모든 문자열을 사용할 수 있습니다. EventEmitter 객체로 이벤트를 호출할 때, 해당 이벤트에 붙어 있는 모든 함수는 동기적으로 호출됩니다. 호출을 받은 리스너가 반환하는 결과는 어떤 값이든 무시되고 폐기됩니다.


다음은 EventEmitter 인스턴스를 단일 리스너와 함께 작성합니다. 어떤 객체든 상속을 통해 EventEmitter가 될 수 있습니다. 

```js
// util.inherits을 통해 프로토타입으로 상속(extends)함
const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();

// 리스너를 등록
myEmitter.on('event', () => {
  console.log('an event occurred!');
});

// 등록한 이벤트를 호출
myEmitter.emit('event');


----
// es6
const EventEmitter = require('events');

class MyEmitter extends EventEmitter{
  //...
}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');
```

### 인자와 this를 리스너에 전달하기
eventEmitter.emit() 메소드는 인자로 받은 값을 리스너 함수로 전달합니다. 이 과정에서 기억해야 할 부분이 있는데 일반적으로 EventEmitter를 통해 호출되는 리스너 함수 내에서는 this가 이 리스너 함수를 부착한 EventEmitter를 참조하도록 의도적으로 구현되어 있습니다.

```js
const myEmitter = new MyEmitter();
myEmitter.on('event', function(a, b) {
  console.log(a, b, this);
    // Prints:
    //   a b MyEmitter {
    //     domain: null,
    //     _events: { event: [Function] },
    //     _eventsCount: 1,
    //     _maxListeners: undefined }
});
myEmitter.emit('event', 'a', 'b');
```

ES6의 Arrow 함수를 리스너로 사용하는 것은 가능하지만 이 기능의 명세대로 이 함수 내에서의 this는 더이상  EventEmitter 인스턴스를 참조하지 않습니다.
```js
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
    // Prints: a b {}
});
myEmitter.emit('event', 'a', 'b');
```

## 비동기 vs 동기
EventListener는 모든 리스너를 등록한 순서대로 동기적으로 처리합니다. 즉 이벤트를 적절한 순서로 처리하는 것을 보장해 경쟁 조건(race condition)이나 로직 오류를 피하는 것이 중요합니다. 이 모든 것이 적절하게 구현되었을 때, setImmediate()이나 process.nextTick()메소드를 사용해 리스너 함수를 비동기도 동작하도록 전환할 수 있습니다.

```js
const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('this happens asynchronously');
  });
});
myEmitter.emit('event', 'a', 'b');
```

## Event Emitter methods
### 단 한 번만 동작하는 이벤트
eventEmitter.on() 메소드로 등록된 리스너는 이벤트 이름이 호출되는 매 횟수만큼 실행됩니다.

```js
const myEmitter = new MyEmitter();
var m = 0;
myEmitter.on('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
  // Prints: 1
myEmitter.emit('event');
  // Prints: 2
```

eventEmitter.once()메소드로 등록한 리스너는 호출한 직후 제거되어 다시 호출해도 실행되지 않습니다.

```js
const myEmitter = new MyEmitter();
var m = 0;
myEmitter.once('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
  // Prints: 1
myEmitter.emit('event');
  // Ignored
```

### 오류 이벤트
EventEmitter 인스턴스에서 오류가 발생했을 때의 전형적인 동작은 'error' 이벤트를 호출하는 것입니다. 이 경우는 Node.js에서 특별한 경우로 다루어 집니다. 오류가 발생한 EventEmitter에 error 이벤트로 등록된 리스너가 하나도 없는 경우에는 오류가 던져지고(thrown) 스택 추적이 출력되며 Node.js의 프로세스가 종료됩니다.

```js
const myEmitter = new MyEmitter();
myEmitter.emit('error', new Error('whoops!'));
  // Throws and crashes Node.js
```

### 그외 메소드
#### addListener & on
이 메서드들은 eventname에 해당하는 이벤트에 대해서 LISTENER_FUNCTION 이름의 함수가 매번 호출 되도록 합니다. 이벤트에 함수를 binding 할때는 하나의 이벤트에 여러개의 listener를 바인딩 할 수 있으며, 최대 바인딩 개수는 디폴트 값은 10개입니다.

- emitter.addListener(EVENT_NAME, LISTENER_FUNCTION)
- emitter.on(EVENT_NAME, LISTENER_FUNCTION)

#### once
이 메서드는 eventname에 해당하는 이벤트에 대해서 LISTENER_FUNCTION 이름의 함수가 처음 한번만 호출 되도록 합니다.
- emitter.once(EVENT_NAME, LISTENER_FUNCTION)

#### removeListener
- emitter.removeListener(EVENT_NAME, LISTENER_FUNCTION)
이 메서드는 eventname에 바인딩 되어 있는 listener function 이름의 함수와의 binding을 제거한다.


#### removeListener
인자는 배열형으로, 배열내에 들어가 있는 eventnames에 각각 바인딩 된 모든 함수에 대한 바인딩을 제거합니다.
- emitter.removeAllListener(['eventnames'])

#### setMaxListeners
해당 eventEmitter에 바인딩될 수 있는 이벤트의 수를 조정한다.
- emitter.setMaxListeners(n)

#### listeners
event이름의 이벤트에 바인딩된 모든 callback 함수 이름을 리턴합니다.
- emitter.listeners(event)

#### emit
eventname의 이벤트를 생성하고, 이벤트를 생성할 당시 [args]에 정의된 값 들을 이벤트와 함께 전달합니다.
- emitter.emit(EVENT_NAME, [args])



---
해당 내용은 다음 글을 참고 하였습니다.

- https://edykim.com/ko/post/events-eventemitter-translation-in-node.js/
- https://bcho.tistory.com/tag/EventEmitter