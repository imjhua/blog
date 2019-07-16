---
layout: post
title: 유사배열 (Array Like)
categories: JavaScript
categories: TODO
---

유사배열

다음과 같은 특징

```js
var myMap = new Map();

var keyString = "어떤 문자열",
    keyObj = {},
    keyFunc = function () {};

// 값 저장하기
myMap.set(0, "'어떤 문자열'과 연결된 값");
myMap.set("1", "keyObj와 연결된 값");
myMap.set(keyFunc, "keyFunc와 연결된 값");

console.log(myMap.get(0))

let a = Array.from(myMap)
console.log(a)



let obj = {0:"0", 1:"1", length: 2}

let aa = Array.from(obj)
console.log(aa)
```