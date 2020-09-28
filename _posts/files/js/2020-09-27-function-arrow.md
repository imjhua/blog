---
layout: post
title: fucntion & arrow 차이
categories: JavaScript
---

ES5에서의 fucntion과 ES6에서의 arrow function은 어떤 차이가 있을까?

## this의 차이

- es5: this가 인스턴스를 참조하지 못하므로 setTimeout()을 실행하기 전에 인스턴스를 변수에 할당하고, setTimeout() 콜백함수에서 변수의 인스턴스를 사용하는 형태

- es6: setTimeout()함수의 콜백함수를 화살표함수로 작성하면 this가 setTimeout()이 포함돈 함수의 인스턴스를 참조한다.

## 화살표 함수의 생성

엔진이 화살표함수를 만나게 되면 빌트인 Function 오브젝트의 prototype에 연결된 메서드로 오브젝트를 생성하여 변수에 할당합니다. Function 오브젝트를 생서하는 방법은 function 키워드로 생성하는 방법과 같습니다.

따라서 화살표 함수 표현은 메소드 함수가 아닌 곳에 가장 적합합니다. 그래서 생성자로서 사용할 수 없습니다.

## 함수와 메소드

함수와 메소드는 function과 같이 키워드를 사용한 형태입니다. 동일해보이지만 사용법도 전혀 다릅니다. 먼저 함수는 오브젝트 프로퍼티로 작성된 function을 의미합니다.

- Array.isArray([])

메서드는 prototype에 연결된 function을 의미합니다.

- (인스턴스로 접근 가능한)메서드: [].forEach)

두개를 구분하는 이유는 new연산자로 인서턴스를 생성할 때 인스턴스에 할당되는 기준이 다르기때문입니다. 구분해서 사용합시다!

---

해당 내용은 다음 글을 참고 하였습니다.
