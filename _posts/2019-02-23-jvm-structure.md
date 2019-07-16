---
layout: post
title: JVM 구조 
categories: JAVA
---

JVM(Java Virtual Machine)은 자바 가상 머신으로 자바 바이트 코드를 실행할 수 있는 주체입니다. CPU나 운영체제(플랫폼)의 종류와 무관하게 실행이 가능합니다. 즉, 운영체제 위에서 동작하는 프로세스로 자바 코드를 컴파일해서 얻은 바이트 코드를 해당 운영체제가 이해할 수 있는 기계어로 바꿔 실행시켜주는 역할을 합니다.

JVM의 구성을 살펴보면 크게 4가지(Class Loader, Execution Engine, Garbage Collector, Runtime Data Area)로 나뉘게 되는데 각각에 대해서 자세히 알아보도록 하겠습니다.


## Class Loader
자바에서 소스를 작성하면 .java파일이 생성되고 .java 소스를 자바컴파일러가 컴파일하면 .class파일(바이트코드)이 생성됩니다. 이렇게 생성된 클래스파일들을 엮어서 JVM이 운영체제로부터 할당받은 메모리영역인 Runtime Data Area로 적재하는 역할을 Class Loader가 담당하게 됩니다.(자바 애플리케이션이 실행중일 때 이런 작업이 수행된다.)

## Execution Engine
Class Loader에 의해 메모리에 적재된 클래스(바이트 코드)들을 기계어로 변경해 명령어 단위로 실행하는 역할을 합니다. 명령어를 하나 하나 실행하는 인터프리터(Interpreter)방식이 있고 JIT(Just-In-Time) 컴파일러를 이용하는 방식이 있습니다. JIT 컴파일러는 적절한 시간에 전체 바이트 코드를 네이티브 코드로 변경해서 Execution Engine이 네이티브로 컴파일된 코드를 실행하는 것으로 성능을 높이는 방식입니다.

## Garbage Collector
Garbage Collector(GC)는 Heap 메모리 영역에 생성(적재)된 객체들 중에 참조되지 않는 객체들을 탐색 후 제거하는 역할을 합니다. GC가 역할을 하는 시간은 정확히 언제인지를 알 수 없습니다. (참조가 없어지자마자 해제되는 것을 보장하지 않음을 의미) 또 다른 특징은 GC가 수행되는 동안 GC를 수행하는 쓰레드가 아닌 다른 모든 쓰레드가 일시정지됩니다. 그렇기 때문에 Full GC가 일어나서 수 초간 모든 쓰레드가 정지한다면 장애로 이어지는 치명적인 문제가 생길 수 있습니다. 스택(Stack)영역과 메소드(Method)영역도 GC의 대상이 지만 힙(Heap) 메모리영역이 GC의 주요 대상입니다.

## Runtime Data Area
JVM의 메모리 영역으로 자바 애플리케이션을 실행할 때 사용되는 데이터들을 적재하는 영역입니다. 이 영역은 크게 Method Area, Heap Area, Stack Area, PC Register, Native Method Stack로 나눌 수 있습니다.

- Method area (메소드 영역): 클래스 멤버 변수의 이름, 데이터 타입, 접근 제어자 정보같은 필드 정보와 메소드의 이름, 리턴 타입, 파라미터, 접근 제어자 정보같은 메소드 정보, Type정보(Interface인지 class인지), Constant Pool(상수 풀 : 문자 상수, 타입, 필드, 객체 참조가 저장됨), static 변수, final class 변수등이 생성되는 영역이다.
- Heap area (힙 영역): new 키워드로 생성된 객체와 배열이 생성되는 영역이다. 메소드 영역에 로드된 클래스만 생성이 가능하고 Garbage Collector가 참조되지 않는 메모리를 확인하고 제거하는 영역이다.
- Stack area (스택 영역): 지역 변수, 파라미터, 리턴 값, 연산에 사용되는 임시 값등이 생성되는 영역이다.
- PC Register (PC 레지스터): Thread(쓰레드)가 생성될 때마다 생성되는 영역으로 Program Counter 즉, 현재 쓰레드가 실행되는 부분의 주소와 명령을 저장하고 있는 영역이다. (*CPU의 레지스터와 다름) 이것을 이용해서 쓰레드를 돌아가면서 수행할 수 있게 한다.
- Native method stack:  자바 외 언어로 작성된 네이티브 코드를 위한 메모리 영역이다. 보통 C/C++등의 코드를 수행하기 위한 스택이다. (JNI)


쓰레드가 생성되었을 때 기준으로 메소드 영역과 힙 영역을 모든 쓰레드가 공유하고, 스택 영역과 PC 레지스터, Native method stack은 각각의 쓰레드마다 생성되고 공유되지 않습니다.


## 정리
- JAVA Source : 사용자가 작성한 JAVA 코드
- JAVA Compiler　: JAVA 코드를 Byte Code로 변환시켜주는 기능
- Class Loader :　Class파일을 메모리(Runtime Data Area)에 적재하는 기능
- Execution Engine : Byte Code를 실행 가능하게 해석해주는 기능
- Runtime Data Area : 프로그램을 수행하기 위해 OS에서 할당 받은 메모리 공간





----
해당 내용은 다음 글을 참고 하였습니다.
- https://jeong-pro.tistory.com/148
- https://huelet.tistory.com/entry/JVM-%EB%A9%94%EB%AA%A8%EB%A6%AC%EA%B5%AC%EC%A1%B0