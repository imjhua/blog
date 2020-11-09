---
layout: post
title: 일급함수(first class function)
categories: JavaScript
---

JavaScript는 일급 함수를 지원합니다. 일급함수?가 뭘까요? 이를 정리해 보고 JavaScript에서 함수가 1급 객체인 것이 왜! 중요한지 알아봅니다.

## 1급 객체(first class object)

일반적으로 1급 객체의 조건을 다음과 같이 정의합니다.

(객체기준으로 객체가)

- 변수(variable)에 담을 수 있다.
- 인자(parameter)로 전달할 수 있다.
- 반환값(return value)으로 전달할 수 있다.

대부분의 프로그래밍 언어에서 숫자는 1급 객체의 조건을 충족합니다. 예를 들면, 숫자는 변수에 저장할 수 있고 인자나 반환값으로 전달할 수 있습니다.

## 1급 함수(first class function)

1급 객체 뿐만 아니라 1급 함수도 존재합니다. 함수를 1급 객체 처럼 취급하는 것입니다. 다음과 같은 추가적인 조건이 있습니다.

- 런타임(runtime) 생성이 가능하다.
- 익명(anonymous)으로 생성이 가능하다.

JavaScript의 함수는 객체이기도 하기에 1급 객체이면서 동시에 1급 함수입니다.

참고) 이런 추가조건으로 봤을 때 C의 함수는 1급 함수로 볼 수 없습니다.

## 고차함수(HOF)에서의 사용

JavaScript에는 고차함수(high order function)라는 개념이 있습니다. 다른 함수를 인자로 받거나 그 결과로 함수를 반환하는 함수입니다. 인자로 받는 함수(콜백함수)는 특히 표현력이 높으며 자주 쓰이는 코딩관례입니다. 고차함수에는 each, filter, map, sort 등의 함수가 있습니다. 함수가 1급 객체&함수 이기에 가능합니다.

## 커링

함수 생성당시 기억하는 렉시컬환경은 함수를 주고받을 때도 유효하게됩니다. 클로저를 통해 커링을 구현하기도 합니다.

참고) 클로저는 내부 함수로 외부 함수의 변수에 접근할 수 있는 함수로 외부 함수가 반환된 후에도 외부 함수의 변수 범위 체인에 접근할 수 있다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Glossary/First-class_Function
- https://bestalign.github.io/2015/10/18/first-class-object/
- https://ooeunz.tistory.com/87?category=813738
