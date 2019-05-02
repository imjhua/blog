---
layout: post
title: JVM 구조 
tags:
 - jvm-structrue
categories: JAVA
---

## 소개
JVM 구조

## Class Loader

자바에서 소스를 작성하면 Person.java 처럼 .java파일이 생성된다.

.java 소스를 자바컴파일러가 컴파일하면 Person.class 같은 .class파일(바이트코드)이 생성된다.

이렇게 생성된 클래스파일들을 엮어서 JVM이 운영체제로부터 할당받은 메모리영역인 Runtime Data Area로 적재하는 역할을 Class Loader가 한다. (자바 애플리케이션이 실행중일 때 이런 작업이 수행된다.)

## 정리
- JAVA Source : 사용자가 작성한 JAVA 코드
- JAVA Compiler　: JAVA 코드를 Byte Code로 변환시켜주는 기능
- Class Loader :　Class파일을 메모리(Runtime Data Area)에 적재하는 기능
- Execution Engine : Byte Code를 실행 가능하게 해석해주는 기능
- Runtime Data Area : 프로그램을 수행하기 위해 OS에서 할당 받은 메모리 공간





해당 내용은 다음 글을 참고 하였습니다.
- https://jeong-pro.tistory.com/148
- https://huelet.tistory.com/entry/JVM-%EB%A9%94%EB%AA%A8%EB%A6%AC%EA%B5%AC%EC%A1%B0