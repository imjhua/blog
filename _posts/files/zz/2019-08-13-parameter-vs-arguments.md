---
layout: post
title: Parameter vs Arguments
categories: Programming
---

종종 매개변수(parameter)와 전달인자(argument)는 적당히 섞어서 쓰이기도 하는데, 이 경우 문맥에 따라 의미를 달리해서 해석되기도 합니다. 하지만 엄밀히 말해서 매개변수는 함수의 정의부분에 나열되어 있는 변수들을 의미하며, 전달인자는 함수를 호출할때 전달되는 실제 값을 의미합니다. 이같은 의미를 명확히 하기 위해 매개변수는 변수(variable)로, 전달인자는 값(value)으로 보는 것이 일반적입니다.

## Parameter (매개변수)
함수를 정의 할 때 외부로부터 받아들이는 임의의 값을 의미합니다.

```
int sum(int a, int b)
{
    return a+b;
}
```

(int a, int b)는 실제 값이 존재하지 않고 형태를 나타내 줄 뿐 입니다. 이때 (int a, int b)를 매개변수라고 부릅니다.

## Arguments (전달인자)
함수를 호출할 때 이 때 사용하게 되는 일련의 값들을 아규먼트라고 부릅니다.

```
sum(10,20);
```
위의 sum함수를 호출하였을때 (10,20)이 변수를 전달인자라고 부릅니다. 이때 전달인자에는 값이 존재하는것을 볼 수 있습니다.

----
해당 내용은 다음 글을 참고 하였습니다.
- https://wowon.tistory.com/101
- https://wayhome25.github.io/etc/2017/12/31/parameter-argument/