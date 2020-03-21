---
layout: post
title: Blocking-NonBlocking-Synchronous-Asynchronous
categories: JavaScript
---


Blocking-NonBlocking-Synchronous-Asynchronous 를 구분해 보고자 합니다. 대략적으로 Blocking과 Synchronous가 비슷하고, Non-blocking과 Asynchronous 둘이 비슷하다고 생각하겠지만 각각의 구분은 엄연히 다른 기준을 가지고 있습니다. 즉 두 개념은 관심사가 다릅니다.

## Blocking/NonBlocking
Blocking/NonBlocking은 호출되는 함수가 바로 리턴하는지 하지 않는지에 따라 구분 할 수 있습니다. 호출된 함수가 바로 리턴해서 호출한 함수에게 제어권을 넘겨주고, 호출한 함수가 다른 일을 할 수 있는 기회를 줄 수 있으면 NonBlocking 입니다. 그렇지 않고 호출된 함수가 자신의 작업을 모두 마칠 때까지 호출한 함수에게 제어권을 넘겨주지 않고 대기하게 만든다면 Blocking 입니다.


## Synchronous/Asynchronous
Synchronous/Asynchronous는 호출되는 함수의 작업 완료 여부를 누가 신경쓰는지에 따라 구분됩니다. 호출하는 함수는 호출되는 함수의 작업 완료 유무를 신경쓰지 않고, 호출되는 함수에게 callback만을 전달하여 호출되는 함수의 작업이 완료되면 호출되는 함수가 전달받은 callback을 실행하면 Asynchronous 입니다. 호출하는 함수가 호출되는 함수의 작업 완료 후 리턴을 기다리거나, 또는 호출되는 함수로부터 바로 리턴 받더라도 작업 완료 여부를 호출하는 함수 스스로 계속 확인하며 신경쓰면 Synchronous 입니다.

## 비슷한 동작
앞에서 막연하게 비슷하다고 했던 것은 조금 구체적으로 말하면 동작이 비슷한 것 입니다. Blocking과 Sync는 막거나 기다리거나 하는 등 둘 모두 뭔가 비효율적으로 동작하는 느낌인 반면에, NonBlocking이나 Async는 막지도 않고 완료되면 알아서 처리하는 등 둘 모두 뭔가 효율적인것 같은 느낌으로 비슷한 동작으로 생각되어 집니다. 동작은 비슷하지만 관심사가 다르다는 점을 염두에 두고 낯선 조합을 살펴보겠습니다.

## NonBlocking-Sync
앞에서 살펴본대로 조합해보면 NonBlocking-Sync는 호출되는 함수는 바로 리턴하고, 호출하는 함수는 작업 완료 여부를 신경쓰는 것입니다. 신경쓰는 방법이 기다리거나 물어보거나 두 가지가 있었는데, NonBlocking 함수를 호출했다면 사실 기다릴 필요는 없고 호출되는 함수의 작업 완료 여부를 계속 물어보는 일이 필요합니다. 즉, NonBlocking 메서드 호출 후 바로 반환 받아서 다른 작업을 할 수 있게 되지만, 메서드 호출에 의해 수행되는 작업이 완료된 것은 아니며, 호출하는 메서드가 호출되는 메서드 쪽에 작업 완료 여부를 계속 문의합니다.


다음 코드는 NonBlocking-Sync라는 특성 이해에 집중할 수 있도록 간략화한 예제고, 실무적으로는 Future보다는 CompletableFuture를 쓰거나, Future를 쓴다면 위의 while 블록은 별도의 쓰레드로 빼서 실행하는 것이 좋습니다.

```js
Future ft = asyncFileChannel.read(~~~);

while(!ft.isDone()) {
    // isDone()은 asyncChannle.read() 작업이 완료되지 않았다면 false를 바로 리턴해준다.
    // isDone()은 물어보면 대답을 해줄 뿐 작업 완료를 스스로 신경쓰지 않고,
    //     isDone()을 호출하는 쪽에서 계속 isDone()을 호출하면서 작업 완료를 신경쓴다.
    // asyncChannle.read()이 완료되지 않아도 여기에서 다른 작업 수행 가능 
}

// 작업이 완료되면 작업 결과에 따른 다른 작업 처리
```

## Blocking-Async
조합해보면 Blocking-Async는 호출되는 함수가 바로 리턴하지 않고, 호출하는 함수는 작업 완료 여부를 신경쓰지 않는 것입니다. Blocking-Async의 대표적인 케이스가 Node.js와 MySQL의 조합입니다. Node.js 쪽에서 callback 지옥을 헤치면서 Async로 전진해와도, 결국 DB 작업 호출 시에는 MySQL에서 제공하는 드라이버를 호출하게 되는데, 이 드라이버가 Blocking 방식입니다. 사실 Node.js 뿐아니라 Java의 JDBC도 마찬가지입니다. 다만 Node.js가 싱글 쓰레드 루프 기반이라 멀티 쓰레드 기반인 Java의 Servlet 컨테이너보다 문제가 더 두드러져 보일 뿐, Blocking-Async라는 근본 원인은 같습니다. Blocking-Async는 별다른 장점이 없어서 일부러 사용할 필요는 없지만, NonBlocking-Async 방식을 쓰는데 그 과정 중에 하나라도 Blocking으로 동작하는 놈이 포함되어 있다면 의도하지 않게 Blocking-Async로 동작할 수 있다는 것을 알고 있어야 합니다.



## 정리

### 호출 및 처리 방식에서의 구분
- Blocking/NonBlocking은 호출한 입장에서의 호출되는 함수가 바로 리턴하는지 하지않는지/하는지
- Sync/Async는 처리되는 방식은 함수완료여부를 신경쓰는지/쓰지않는지

### 관심사의 구분 
비슷한 동작인것만 같은 Blocking/NonBlocking 과 Synchronous/Asynchronou를 각자의 관심사로 구분할 수 있습니다.

- Blocking: 호출되는 함수가 바로 리턴하지 않는다.
- NonBlocking: 호출되는 함수는 바로 리턴한다.
- Synchronous: 호출하는 함수는 작업 완료 여부를 신경쓴다.
- Asynchronous: 호출하는 함수는 작업 완료 여부를 신경쓰지 않는다.


### 동작에서의 구분
- NonBlocking은 제어문 수준에서 지체없이 반환하는 것
- Asynchronous는 별도의 쓰레드로 빼서 실행하고, 완료되면 호출하는 측에 알려주는 것


---

해당 내용은 다음 글을 참고 하였습니다.
- https://homoefficio.github.io/2017/02/19/Blocking-NonBlocking-Synchronous-Asynchronous/
