---
layout: post
title: 자바스크립트 비동기 프로그래밍 
tags:
 - async-programming
categories: TODO
---

## 소개

https://meetup.toast.com/posts/73

이렇게 간단하게 할 수 있으면 얼마나 좋을까. 하지만 상황을 더 슬프게 만들기 위해 각각의 데이터들을 외부 네트워크에 있는 서버에서 받아와야 한다고 가정해 보자(아… 왜… ㅠㅠ). 싱글 스레드인 자바스크립트에서 네트워크 요청을 위해 이런 코드를 짠다면 하루에 커피 100잔도 못팔고 망하는 수가 있다. 지금이 바로 비동기 방식의 진가를 발휘하기 위해 콜백 지옥을 소환할 때다.

당연한 얘기지만, 각각의 네트워크 요청이 값을 반환하기 전까지 프로그램 전체가 멈춰서 대기를 해야 한다면 이 프로그램은 너무 느려서 사용할 수가 없을 것이다.

```js
function getId(phoneNumber, callback) { /* … */ }
function getEmail(id, callback) { /* … */ }
function getName(email, callback) { /* … */ }
function order(name, menu, callback) { /* … */ }

function orderCoffee(phoneNumber, callback) {
    getId(phoneNumber, function(id) {
        getEmail(id, function(email) {
            getName(email, function(name) {
                order(name, 'coffee', function(result) {
                    callback(result);
                });
            });
        });
    });
}
```


### 문제점

쨘. 지옥을 소환하는 게 이렇게 쉽다니 (지옥인데 친숙하다는 게 더 슬프다). 참고로 여기서 콜백의 문제점은 사실 단순히 들여쓰기와 가독성의 문제만은 아니다. 더 중요한 문제점은 콜백함수를 다른 함수로 전달하는 순간 그 콜백함수에 대한 제어권을 잃는 점이다. 즉, 내가 제공한 콜백이 언제 실행되는지, 몇 번 실행되는지 등에 대해 신뢰할 수가 없게 된다. 그리고 위의 코드에서 보다시피 내가 처음에 제공한 콜백 함수는 한없이 위임되어 저 지옥 구멍의 끝에 파묻혀 있다 (왜 거기있니 얘야…ㅠㅠ). 이로 인해 프로그램이 더 예측하기 어렵게 되고 에러가 발생하기 쉽게 되며, 디버깅 또한 만만치 않게 된다.

### 프라미스의 구원
하지만 알다시피, 프라미스의 등장으로 인해 이러한 문제는 상당 부분 완화되었다. 위의 슬픈 예제를 달래기 위해 프라미스로 보듬어 보자. 일단 모든 getXXX 함수에서 콜백 파라미터를 제거하고, 실행 결과로 프라미스를 반환한다고 가정하자.

```js

function getId(phoneNumber) { /* … */ }
function getEmail(id) { /* … */ }
function getName(email) { /* … */ }
function order(name, menu) { /* … */ }

function orderCoffee(phoneNumber) {
    return getId(phoneNumber).then(function(id) {
        return getEmail(id);
    }).then(function(email) {
        return getName(email);
    }).then(function(name) {
        return order(name, 'coffee');
    });
}

```

https://meetup.toast.com/posts/73

----
해당 내용은 다음 글을 참고 하였습니다.
- https://medium.com/@shlee1353/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B9%84%EB%8F%99%EA%B8%B0-async-await-promise-ae659eb1cb7e
- 
https://meetup.toast.com/posts/73