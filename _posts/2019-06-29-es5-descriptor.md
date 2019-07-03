---
layout: post
title: ES5 프로퍼티 디스크립터 정리
categories: JavaScript
categories: TODO
---

VO(Value Object) 설계할 때 쓰라는 것인가..?
ES5의 Object 클래스에는 총 5개의 프로퍼티 디스크립터가 추가되었습니다. 
get: 프로퍼티의 값을 출력
set: 프로퍼티의 값을 반환
enumerable: 프로퍼티의 열거 가능여부 설정
configurable: 프로퍼티의 삭제 가능여부 설정
writable: 프로퍼티의 쓰기 가능여부 설정

1개 프로퍼티의 디스크립터 상태는 Object.defineProperty 라는 static 메소드를 사용해서 변경시킬 수 있습니다. 
아래의 코드는 a.b의 상태를 ‘기록할 수 없음’ 으로 바꿉니다.

var a = {b: 1};
Object.defineProperty(a, 'b', { writable:false });    
1개 프로퍼티의 Data 디스크립터 상태는 Object.getOwnPropertyDescriptor 라는 static 메소드를 사용해서 변경시킬 수 있습니다.
아래의 코드는 a.b의 모든 Data 디스크립터의 상태를 반환합니다.

var a = {b: 1};
var desc = Object.getOwnPropertyDescriptor(a, 'b');
console.log(desc);
프로퍼티 디스크립터 중에서
get, set, enumerable, configurable은 Access 프로퍼티 디스크립터
라고 하고, 
enumerable, configurable, writable은 Data 프로퍼티 디스크립터
라고 합니다.

Access 프로퍼티 디스크립터와 Data 프로퍼티 디스크립터는
새로 추가된 Object.defineProperty 메소드에서 한번에 설정할 수 없습니다.

즉,

Object.defineProperty(a, 'b', {
	get: ()=>'야호',
	enumerable: true,
});
는 가능하지만,

// Access 프로퍼티 디스크립터와 Data 프로퍼티 디스크립터를 한번에 설정할 수 없다.
Object.defineProperty(a, 'b', {
	get: ()=>'야호',
	writable: true,
});
는 불가능합니다.



----
해당 내용은 다음 글을 참고 하였습니다.

- https://cinos81.bitbucket.io/blog/_site/javascript/2016/07/13/property-descriptor.html
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty