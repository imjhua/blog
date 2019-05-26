---
layout: post
title: 객체의 불변과 가변 그리고 복사(복제) 
tags:
 - immutability
categories: JavaScript
---

## 코드


```js
var init = function() {
  return { name: "kim", score: [1, 2] };
};

// 데이터 불면: 문자열, 숫자, 불리언 값은 언제나 불변입니다.
// 가변: 함수와 배열은 객체이므로 가변입니다. 속성 추가, 제거, 재할당의 대상이 될 수 있습니다.

// const는 불변적 바인딩(immutable binding)을 합니다
// 상수로 정의된 것이지 값이 변하지 않는 다는 불변하다는 것과는 다른 것입니다.
// 값을 새로 할당 할 수는 없지만 내용에 대한 변경은 가능 합니다.
// 즉, const선언은 value와의 재할당 불가능한 binding을 만들지만 const에 binding된 객체 안의 값들은 수정이 가능하다.

const objConst = {
  name: "kim",
  bar: {
    value: 2
  }
};

test("Change objConst.name", () => {
  objConst.name = "kim";
  expect(objConst.name).toBe("kim");
});

// object.freeze(ES5)는 객체가 불변하도록 정의 합니다.
// const로 정의 하였는가 let 혹은 var로 정이 하였는가에 따라 새로운 값을 할당할수 있는지 없는지에 다르겠지만
// 값에 대한 내용은 변하지 않습니다.
// Object.freeze() 는 속성-값 쌍에서만 적용됩니다.
// freeze는 객체만을 인자로 받아서 객체들의 값이 바뀌는 것을 막는다. 하지만 예시와 같이 nested된 객체가 있다면 해당 객체의 value를 바꾸는 것은 가능하다.
// 지금 현재로써는 Date, Map, Set과 같은 객체들을 완전히 불변적으로 만드는 방법은 없습니다.

const objFreeze = {
  name: "kim",
  bar: {
    value: 2
  }
};

test("nonChange objFreeze.name", () => {
  Object.freeze(objFreeze);
  objFreeze.name = "jh";
  expect(objFreeze.name).not.toBe("jh");
});

test("Change objFreeze.bar.value", () => {
  Object.freeze(objFreeze);
  objFreeze.bar.value = 10;
  expect(objFreeze.bar.value).toBe(10);
});

// shallow copy
test("Equal obj & objShallowCopy", () => {
  let obj = init();
  let objShallowCopy = obj;
  expect(obj === objShallowCopy).toBeTruthy();

  objShallowCopy.name = "jh";
  expect(obj.name).toBe(objShallowCopy.name);

  objShallowCopy.score.push(3);
  expect(obj.score).toBe(objShallowCopy.score);
});

// assign copy
// assign을 통해 원본 객체의 불변을 가질 수 있다.
// 그러나 중첩된 객체의 경우, 값에 함수나 배열을 가지고 있는 경우는 불변하지 않는다.
// 중첩 객체 내, 원시데이터 타입(문자열)은 바로 복제 되지만 
// 배열 값의 경우 별도의 공간에 독립적으로 저장이 되어 있기 때문에
// 복제시, 값은 배열의 위치를 가지고 있으므로 실제 주소의 값을 공유해 버리게 된다.
// 즉, 복제를 하면 객체의 프로퍼티들만 복제를 하기 때문에 프로퍼티가 객체(함수, 배열)를 가지고 있는 경우 
// 값을 복제하는 것이 아닌 위치를 복제 하기 때문에, 또 값을 공유하게 되어 버려 불변함을 유지 할 수 없다. 

test("Equal obj & objAssignCopy", () => {
  let obj = init();
  let objAssignCopy = Object.assign({}, obj);
  expect(obj === objAssignCopy).toBeFalsy();

  objAssignCopy.name = "jh";
  expect(obj.name).not.toBe(objAssignCopy.name);

  console.log(obj)
  objAssignCopy.score.push(3);
  console.log(obj)
  expect(obj.score).toBe(objAssignCopy.score);
});

// spread operation
test("Equal obj & objSpreadOperationCopy", () => {
  let obj = init();
  let objSpreadOperationCopy = { ...obj };
  expect(obj === objSpreadOperationCopy).toBeFalsy();

  objSpreadOperationCopy.name = "jh";
  expect(obj.name).not.toBe(objSpreadOperationCopy.name);
  
  objSpreadOperationCopy.score.push(3);
  expect(obj.score).toBe(objSpreadOperationCopy.score);
});

// fnShallow test
function fnShallow(person) {
  person.name = "jh";
  person.score.push(3);
}

test("Equal obj & fnShallow", () => {
  let obj = init();
  fnShallow(obj);
  expect(obj.name).toBe("jh");
});

// fnShallow & objAssign test
test("Equal objAssign & fnShallow", () => {
  let obj = init();
  let objAssign = Object.assign({}, obj);
  fnShallow(objAssign);
  expect(obj.name).toBe("kim");
  expect(objAssign.name).toBe("jh");
  expect(obj.score).toBe(objAssign.score);
});

// fnAssign test
function fnAssign(person) {
  person = Object.assign({}, person);
  person.name = "jh";
  person.score.push(3);
  return person;
}

test("Equal obj & fnAssign", () => {
  let obj = init();
  let objAssign = fnAssign(obj);
  expect(obj.name).toBe("kim");
  expect(objAssign.name).toBe("jh");
  expect(obj.score).toBe(objAssign.score);
});

// fnSpreadOperation test
function fnSpreadOperation(person) {
  person.name = "jh";
  person.score.push(3);
  return person;
}

test("Equal obj & fnAssfnSpreadOperationign", () => {
  let obj = init();
  let objSpreadOperation = fnSpreadOperation({ ...obj });
  expect(obj.name).toBe("kim");
  expect(objSpreadOperation.name).toBe("jh");
  expect(obj.score).toBe(objSpreadOperation.score);
});

```


----
해당 내용은 다음 글을 참고 하였습니다.
- https://www.youtube.com/user/egoing2