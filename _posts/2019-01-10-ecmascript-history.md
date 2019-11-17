---
layout: post
title: ECMAScript 역사
categories: JavaScript
---

ECMA스크립트(ECMAScript, 또는 ES)는 Ecma 인터내셔널의 ECMA-262 기술 규격에 정의된 표준화된 스크립트 프로그래밍 언어입니다. 자바스크립트를 표준화하기 위해 만들어졌고 지금도 자바스크립트가 제일 잘 알려져 있지만, 액션스크립트와 J스크립트 등 다른 구현체도 포함하고 있습니다. ECMA스크립트는 웹의 클라이언트 사이드 스크립트로 많이 사용되며 Node.js를 사용한 서버 응용 프로그램 및 서비스에도 점차 많이 쓰이고 있습니다

## 판본

| 판  | 출판일 | 이름 | 이전 판과의 차이점 |
|-----|-------|-----|-----------------|
| 1   | 1997년 6월 | 초판 |
| 2   | 1998년 6월 | ISO/IEC 16262 국제 표준과 완전히 동일한 규격을 적용하기 위한 변경. |
| 3   | 1999년 12월  | 강력한 정규 표현식, 향상된 문자열 처리, 새로운 제어문 , try/catch 예외 처리, 엄격한 오류 정의, 수치형 출력의 포매팅 등. |
| 4   | 버려짐 4번째 판은 언어에 얽힌 정치적 차이로 인해 버려졌다. 이 판을 작업 가운데 일부는 5번째 판을 이루는 기본이 되고 다른 일부는 | ECMA스크립트의 기본을 이루고 있다. |
| 5   | 2009년 12월  | 더 철저한 오류 검사를 제공하고 오류 경향이 있는 구조를 피하는 하부집합인 "strict mode"를 추가한다. 3번째 판의 규격에    | 있던 수많은 애매한 부분을 명확히 한다.[3] |
| 5   | 1 2011년 6월 | ECMA스크립트 표준의 제 5.1판은 ISO/IEC 16262:2011 국제 표준 제3판과 함께 한다. |
| 6   | 2015년 6월 | ECMAScript 2015 (ES2015) 6판에는 클래스와 모듈 같은 복잡한 응용 프로그램을 작성하기 위한 새로운 문법이 추가되었다.      | 하지만 이러한 문법의 의미는 5판의 strict mode와 같은 방법으로 정의된다. 이 판은 "ECMAScript Harmony" 혹은 "ES6 Harmony" 등으로 불리기도 한다. |
| 7   | 2016년 6월 | ECMAScript 2016 (ES2016) |
| 8   | 2017년 6월 | ECMAScript 2017 (ES2017) |
| 9   | 2018년 6월 | ECMAScript 2018 (ES2018) |

## 버전별 추가된 새로운 기능들

### ES5
- 가변파라미터(Rest Parameter): 가변 인자의 목록을 배열로 전달받을 수 있다

### ES6
- 클래스(Class)
- 프로미스(Promise)
- 제너레이터(Generator)
- 화살표함수(Arrow function)
- get/set 프로퍼티
- 전개연산자(spread operator)
- for-of
- 기본 파라미터
- const / let
- Number.isNaN(): 글로벌 isNaN 과 달리 정확히 Number 타입의 isNaN인지 구분
- Object.is: 두 값이 같은지 확인
- 템플릿 리터럴(String Template lateral)
- 배열형 추가 기능: fill, @@iterator

### ES7
- Array.prototype.includes
- 제곱연산 ** (Exponentiation infix operator)

### ES8
- async await
- Object.values(): Object.values() 는 object.keys() 와 비슷하지만 keys와 달리 모든 값을 반환하는 특징을 가지고 있다.
- Object.entires(): 위와 비슷한 entires()는 위와 같이 역시 Object.keys와 관련이 있지만 키만 반환하는 대신 배열 방식으로 키와 값을 반환한다.
- String padding: String.prototype.padStart와 String.prototype.padEnd를 통해서 String에 각각의 인스턴스를 추가하는 것으로 앞 뒤에 문자열을 추가 할 수 있다.


### ES9
- 정규식의 많은 변화
- Promise에 finally 추가: 성공 여부에 관계없이 반드시 수행되는 항목
-  비동기 반복: 반복문에도 await 사용 가능


---

해당 내용은 다음 글을 참고 하였습니다.

- https://ko.wikipedia.org/wiki/ECMA%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8
- https://gs.saro.me/dev?tn=432
