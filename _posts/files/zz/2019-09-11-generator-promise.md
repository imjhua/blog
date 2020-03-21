---
layout: post
title: Generator 와 Promise
categories: JavaScript
---

yield 표현을 통해 yield된 값을 반환하는 Generator 와 Promise 를 활용하여 비동기를 처리해 봅시다. 

## 제너레이터로만 제어권 넘기기
yield를 통해 실행을 멈추고 제어권을 넘겨봅니다.

```js
function* orderCoffee(phoneNumber) {
    const id = yield getId(phoneNumber);
    const email = yield getEmail(id);
    const name = yield getName(email);
    const result = yield order(name, 'coffee');
    return result;
}
```
 yield를 통해 실행을 멈추고 제어권을 넘겨준 것 까지는 좋지만, getId()가 작업을 완료하는 순간 다시 반환값과 함께 제어권을 가져오려면 누군가가 이터레이터의 next() 함수를 호출해 주어야 합니다. 현재로서는 작업을 완료하는 시점을 알고 있는 getId() 함수 내부에서 직접 호출할 수 밖에 없는데, 그렇게 되면 이터레이터와의 밀접한 의존도가 생기게 됩니다. 즉 다음과 같이 데이터를 반환하는 모든 함수의 마지막에 next() 를 호출하는 코드가 추가되어야 할 것입니다.


```js
const iterator = orderCoffee('010-1234-1234');
iterator.next();

function getId(phoneNumber) {
    iterator.next(result);
}

function getEmail(id) {
    iterator.next(result);
}

function getName(email) {
    iterator.next(result);
}

function order(name, menu) {
    iterator.next(result);
}
```


그런, 이렇게 동작하는 제너레이터에서는 범용적인 함수를 사용할 수가 없습니다. 또한 콜백 방식과는 또 다른 면에서는 제너레이터가 본인의 제어권을 상실했다는 의미를 가집니다. 콜백보다 더 나빠진 듯한 느낌입니다. 

## 제너레이터와 프라미스의 만남
만약 모든 함수가 프라미스를 반환한다면 각각의 함수가 제어권을 직접 다루지 않고, 제3자에게 위임할 수 있습니다. 우선 프라미스의 예제에서처럼 모든 getXXX 함수는 프라미스를 반환한다고 가정한다면, 누군가가 이터레이터를 생성해서 함수가 끝날때까지 반복해서 실행시켜 주면 됩니다.

```js
const iterator = orderCoffee('010-1010-1111');
let ret;

(function runNext(val) {
    ret = iterator.next(val);

    if (!ret.done) {
        ret.value.then(runNext); // ret.value는 promise객체. runNext() 함수가 재귀적으로 호출
    } else {
        console.log('result : ', ret.value);
    }
})();
```
프라미스와 제너레이터를 함께 사용하면 각각의 함수에서 제너레이터를 신경 쓰지 않고도 외부에서 제어할 수가 있습니다. 지금 상태에선 반환값을 전달할 수가 없지만, 비동기로 동작할 수 있는 범용적인 함수가 만들어 졌습니다.


## 정리
지금까지 자바스크립트에서 제너레이터로 비동기 프로그래밍을 하는 방법에 대해 알아보았습니다. 제너레이터와 프라미스를 같이 사용하면 비동기 코드를 마치 동기식 코드를 작성하는 것처럼 작성할 수 있습니다. 복잡한 비동기 코드를 다룰 때 이를 활용하면 이전과 비교할 수 없이 편하게 코드를 작성할 수 있을 것입니다.



----
해당 내용은 다음 글을 참고 하였습니다.
- https://ui.toast.com/weekly-pick/ko_20160408/