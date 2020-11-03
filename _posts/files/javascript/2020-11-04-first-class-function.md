---
layout: post
title: 일급함수
categories: JavaScript
---

참고) JavaScript(JS)는 가벼운 인터프리터 또는 JIT 컴파일 프로그래밍 언어로, 일급 함수를 지원합니다.


일반적으로 1급 시민의 조건을 다음과 같이 정의한다.

변수(variable)에 담을 수 있다
인자(parameter)로 전달할 수 있다
반환값(return value)으로 전달할 수 있다
대부분의 프로그래밍 언어에서 숫자는 1급 시민의 조건을 충족한다. 숫자는 변수에 저장할 수 있고 인자나 반환값으로 전달할 수 있다.

1급 객체(first class object)
1급 객체(first class object)라는 것은 특정 언어에서 객체(object)를 1급 시민으로써 취급한다는 뜻이다. 당연히 위의 조건을 모두 충족한다.

1급 함수(first class function)
1급 객체 뿐만 아니라 1급 함수도 존재한다. 함수를 1급 시민으로 취급하는 것이다. 몇몇의 학자들은 1급 시민의 조건과 함께 다음과 같은 추가적인 조건을 요구한다.

런타임(runtime) 생성이 가능하다
익명(anonymous)으로 생성이 가능하다
이런 추가조건으로 봤을 때 C의 함수는 1급 함수로 볼 수 없다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Glossary/First-class_Function
- https://bestalign.github.io/2015/10/18/first-class-object/
- https://ooeunz.tistory.com/87?category=813738