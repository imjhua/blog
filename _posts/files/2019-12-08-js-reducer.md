---
layout: post
title: title
categories: JavaScript
categories: TODO
---
https://medium.com/@hongkevin/js-3-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B0%B0%EC%97%B4-%EB%A9%94%EC%84%9C%EB%93%9C-reduce-100-%ED%99%9C%EC%9A%A9%EB%B2%95-feat-egghead-io-97c679857ece
var votes = ["kim", "hong", "lee", "hong", "lee", "lee", "hong"];
var reducer = function(accumulator, value, index, array) {
  if (accumulator.hasOwnProperty(value)) {
    accumulator[val] = accumulator[val] + 1;
  } else {
    accumulator[val] = 1;
  }
  return accumulator;
}
var initialValue = {};
var result = votes.reduce(reducer, initialValue);
console.log(result); // { kim: 1, hong: 3, lee: 3 }

----
해당 내용은 다음 글을 참고 하였습니다.
- https://medium.com/@hongkevin/js-3-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B0%B0%EC%97%B4-%EB%A9%94%EC%84%9C%EB%93%9C-reduce-100-%ED%99%9C%EC%9A%A9%EB%B2%95-feat-egghead-io-97c679857ece