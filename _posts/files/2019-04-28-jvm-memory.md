---
layout: post
title: JVM(Java Virtual Machine) 메모리 구조
categories: JAVA
---

JVM(Java Virtual Machine) 메모리 구조에 대해 알아 봅시다.

## 메모리
프로그램을 실행하기 위한 데이터 및 명령어를 저장하는 공간을 메모리라고 합니다. 메모리구조를 알아야 하는 이유는 다음과 같습니다.
- 같은 기능의 프로그램이더라도 메모리 관리에 따라 성능이 좌우됨.
- 메모리 관리가 되지 않은 경우 속도저하 현상이나 튕김 현상 등이 일어날 수 있음.
- 한정된 메모리를 효율적으로 사용하여 최고의 성능을 내기 위함.

## 자바 프로그램의 실행구조 (JVM: Java Virtual Machine)
프로그램이 실행되기 위해서는 windows나 linux같은 운영체제(OS)가 제어하고 있는 시스템의 리소스의 일부인 메모리(RAM : 주기억장치)를 제어할수 있어야 하는데, java이전의 c같은 대부분의 언어로 만들어진 프로그램은 이러한 이유때문에 OS에 종속도어 실행되게 되어 있었습니다. 그러나 java프로그램은 JVM(Java Virtual Machine : 자바가상머신)이라는 프로그램만 있으면 실행이 가능한데, JVM이 OS에게서 메모리 사용권한을 할당받고 JVM이 자바프로그램을 호출하여 실행하게 되어 OS한태서는 독립되었지만 JVM이라는 프로그램에 종속적인 구조를 가집니다. JVM을 실행시키고 다시 JVM이 프로그램을 실행시키는 방식이다 보니 OS에 직접 제어받는 방식보다는 속도면에서는 느리다는 단점을 가집니다.

즉, 자바 프로그램은 운영체제에 독립적이고, 자바 가상 머신은 운영체제에 의존적입니다.
- 운영체제에 독립적이다.
- 객체지향 언어이다.
- 자동 메모리 관리
- 네트워크와 분산처리를 지원한다.
- 멀티쓰레드를 지원한다.
- 동적 로딩(Dynamic Loading)을 지원한다.
- JAVA와 OS 사이에서 중계자 역할을 한다.
- JAVA가 OS에 구애받지 않고 재사용을 가능하게 해 줌
- 메모리 관리 기능(GC: Garbage Collection)이 있다


## JVM 구조와 메모리 영역 구분
JAVA 프로그램이 실행되면, JVM은 OS으로부터 이 프로그램이 필요로 하는 메모리를 할당받고, JVM은 이 메모리를 용도에 따라 여러 영역으로 나누어 관리합니다.  JVM은 운영체제에서 할당받은 메모리 영역을 다음과 같이 세부 영역으로 구분해서 사용합니. 프로그램을 수행하기 위해 OS에서 할당 받은 메모리 공간을 Runtime Data Area이라고 하는데 해당 영역은 메소드 / 스택 / 힙 영역으로 나뉘어 집니다.

### 메소드 영역(Method Area / Static Area)
class의 구조 정보가 들어갑니다. Static 변수를 포함한 전역 변수와 함수 영역 이기도 합니다. 메소드 영역은 코드에서 사용되는 클래스(~.class)들을 클래스 로더로 읽어 클래스별로 런타임, 필드데이터, 메소드 데이터 등을 분류해서 저장합니다. 모든 객체가 공유 할 수 있고, 객체 생성 없이 접근 가능합니다.

### 스택 영역 (Stack Area)
지역변수 영역입니다. Method정보, 메소드 호출 시 사용하는 지역변수 데이터 등을 저장한다. {}가 끝나는 동안 유지된다. JVM시작시 생성되고 프로그램이 종료될때까지 유지된다. 스택 영역은 각 스레드마다 하나씩 존재하며 스레드가 시작될 때 할당된다. 스택은 메소드를 호출할 때마다 프레임을 추가(push)하고 메소드가 종료되면 해당 프레임을 제거(pop)을 한다.
 
- Last In First Out (LIFO)
- 메서드 호출 시마다 각각의 스택프레임(그 메서드만을 위한 공간)이 생성
- 메서드 안에서 사용되어지는 값들 저장, 호출된 메서드의 매개변수, 지역변수, 리턴 값 및 연산 시 일어나는 값들을 임시로 저장
- 메서드 수행이 끝나면 프레임별로 삭제


### 힙 영역(Heap Area)
동적변수와 포인터 영역 입니다. 즉, 객체와 배열이 생성되는 영역입니다. new 명령을 통해 생성된 인스턴스 변수의 메모리는 이곳에 보관(new 키워드는 자바 heap 영역에 메모리를 할당)됩니다. gc의 주요 대상입니다. 스택 영역에 저장되는 로컬변수, 매게 변수와는 달리 힙 영역에 보관되는 메모리는 메소드호출이 끝나도 사라지지 않고 유지됩니다. (언제까지? 주소를 잃어버려 가비지가 되어 가비지 컬렉터에 의해서 지워질때까지 혹은 JVM이 종료될때 까지) 

힙 영역에 생성된 객체와 배열은 JVM 스택 영역의 변수나 다른 객체의 필드에서 참조합니다. 참조하는 변수나 필드가 없다면 의미 없는 객체가 되기 때문에 이것을 쓰레기로 취급하고 JVM은 가비지 컬렉션을 실행시켜 자동으로 제거합니다. 힙은 어플리케이션 영역에 접근할 수 있는 메모리의 메인 영역입니다. 만약 new 키워드를 사용해서 객체에 메모리를 할당할 때 남아있는 메모리가 충분하지 않으면 JVM은 garbage collection을 사용해서 힙 메모리의 재사용을 시도합니다. 그래도 메모리가 부족하다면 우리가 종종 마주하는 OutOfMemoryError를 만나게 됩니다.

* 가비지 컬렉션(GC: Garbage Collection)
- 메모리 관리 기증을 담당
- 주요 대상은 heap 영역

## 인스턴스를 별도의 힙 영역에 할당하는 이유
인스턴스의 소멸바법과 소멸시점이 지역변수와는 다르기 때문입니다. 추가적으로 8가지 원시타입(byte, short, int, long, float, double, char, boolean)을 제외한 그외의 타입로 정의된 변수들은 모조리 레퍼런스 변수, 즉 참조 변수입니다. 이런 참조변수들은 실행될 때마다 많은 데이터들을 스택메모리 영역에 뒀다 뺐다 하는게 매우 비효율적이므로 힙 영역에 그 내용(진짜 값)이 저장되고, 스택 메모리에는 간단하게 그 주소만 저장이 되는 것입니다. 그리고 힙 영역에는 실제 그 변수가 가리키고 있는 값들이 저장되어 있습니다.



----
해당 내용은 다음 글을 참고 하였습니다.
- https://jeong-pro.tistory.com/148
- https://huelet.tistory.com/entry/JVM-%EB%A9%94%EB%AA%A8%EB%A6%AC%EA%B5%AC%EC%A1%B0