---
layout: post
title: 함수를 호출하는 다양한 방법 (call / appy / bind )
categories: JavaScript
---

함수를 호출하는 다양한 방법(call / appy / bind )들이 있습니다.


## call 메서드

원하는 객체로 함수를 호출하려면 call 메서드를 사용하도록 합니다. this를 통해 객체를 특정 객체로 지정하여 함수를 호출할 필요가 있을 때, call 메서드를 이용합니다. call 메서드의 첫 번째 인자로 특정 객체를 전달합니다. 따라서 call 메서드를 이용하면 해당 객체 내에 저장되어 있지 않은 메서드라도 호출할 수 있습니다.  

```js
var hasOwnProperty = {}.hasOwnProperty;
dict.foo = 1;
delete dict.hasOwnProperty;
hasOwnProperty.call(dict,"foo"); //true
hasOwnProperty.call(dict,"hasOwnProperty"); //false
```

## apply 메서드
원하는 객체로 함수를 호출하고 가변 인자로 함수를 호출하려면 apply 메서드를 사용합니다. 가변인자에 대한 함수 호출시에 apply 메서드를 이용합니다. 인자의 배열을 받아 그 배열의 각 요소가 개별 인자인 것처럼 함수를 호출합니다. 또한, 첫 번째 인자로 this로 바인딩 될 객체를 명시할 수 있습니다. 

```js
var scores = getAllScores();
average.apply(null,scores); //average라는 함수가 있다고 가정할 때, scores라는 가변인자를 전달할 수 있으며 average함수가 this를 참조하지 않으므로 첫 번째 인자로 null을 전달  
```

## bind 메서드
고정된 객체로 메서드를 호출하려면 bind 메서드를 사용합니다. 메서드를 추출할 때, 해당 메서드의 객체가 this로 바인딩 되지 않으므로 bind 메서드를 이용하여 지정한 객체로 this가 바인딩 되는 함수를 만들 수 있습니다. bind 메서드를 사용하면 원본 함수와 동일한 본문을 갖는 함수를 생성하며 객체를 바인딩합니다. bind 메서드에 대한 인자로 지정하고자 하는 객체를 전달합니다.

```js
var buffer = { 
 entries : [],
 add : function(S){
  this.entries.push(s);
 }
};
 
var source = ["867","-","5309"];
source.forEach(buffer.add); //this가 가르치는 객체가 buffer가 아니므로 에러(entries가 정의 되어있지 않음)
 
source.forEach(buffer.add.bind(buffer));//buffer.add함수가 buffer객체에 바인딩
```

## 정리
- call: 원하는 객체로 함수를 호출할 때
- apply: 원하는 객체로 함수를 호출하고 가변 인자로 함수를 호출할 때
- bind: 고정된 객체로 메서드를 호출할 때


----
해당 내용은 다음 글을 참고 하였습니다.
- https://blog.naver.com/healongee/220693613010