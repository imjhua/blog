---
layout: post
title: 일급함수(first class function)
categories: JavaScript
---

MDN에서 말하길.. JavaScript는 일급 함수를 지원한다고 적혀있습니다. 일급함수를 정리해 보고 JavaScript에서 함수가 1급 객체인 것이 왜! 중요한지 알아봅니다.

## 1급 객체(first class object)

일반적으로 1급 객체의 조건을 다음과 같이 정의합니다.

(객체기준으로 객체가)

- 변수(variable)에 담을 수 있다.
- 인자(parameter)로 전달할 수 있다.
- 반환값(return value)으로 전달할 수 있다.

대부분의 프로그래밍 언어에서 숫자는 1급 객체의 조건을 충족합니다. 예를 들면, 숫자는 변수에 저장할 수 있고 인자나 반환값으로 전달할 수 있습니다.

## 1급 함수(first class function)

1급 객체 뿐만 아니라 1급 함수도 존재합니다. 함수를 1급 객체 처럼 취급하는 것입니다. 다음과 같은 추가적인 조건이 있습니다.

- 런타임(runtime) 생성이 가능하다
- 익명(anonymous)으로 생성이 가능하다

따라서, 이런 추가조건으로 봤을 때 C의 함수는 1급 함수로 볼 수 없습니다.

## JavaScript에서 함수가 1급 객체인 것이 중요한 이유

https://bestalign.github.io/2015/10/18/first-class-object/


함수가 1급 객체라는 사실은 겉으로 봤을 땐 그리 특별하지 않다. 함수를 그냥 주고받을 수 있다는 것 뿐이지만 이것이 아주 큰 차이점을 만든다.

가장 중요한 장점은 바로 고차 함수(high order function)가 가능하다는 점이다. JavaScript의 each, filter, map, sort 등의 함수들이 얼마나 편리한지는 잘 알고 있을 것이다. 인자로 목적에 맞는 함수를 하나 넘겨주면 아주 쉽게 처리가 된다. 반면, Java 7의 Collections.sort함수같은 경우도 비교를 위해 인자를 하나 넘겨주게 되는데, 이것은 함수가 아니라 Comparator interface 타입의 인스턴스(instance)이다. 함수 하나를 넘겨주기 위해서 새로운 클래스를 만들고 그것의 인스턴스까지 생성해야 하는 것이다 – ES6와 Java 8에서는 람다(lambda)가 지원되면서 훨신 간편해졌다.

1급 객체가 JavaScript의 클로져(closure)와 만나면 또 하나의 장점이 생긴다. JavaScript의 함수는 생성될 당시의 Lexical Environment를 기억하게 되는데, 함수를 주고받게 되면 이 Lexical Environment도 함께 전달된다. 이것을 이용해서 커링(currying)과 메모이제이션(memoization)이 가능해진다. 여기서 적기엔 너무 큰 주제이므로 기회가 될 때 따로 다뤄보도록 하겠다.




---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Glossary/First-class_Function
- https://bestalign.github.io/2015/10/18/first-class-object/
- https://ooeunz.tistory.com/87?category=813738
