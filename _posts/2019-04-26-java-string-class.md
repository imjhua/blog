---
layout: post
title: JAVA String, StringBuffer, StringBuilder 차이점
categories: JAVA 
---

JAVA에서 문자열을 처리 하기 위한 String과 StringBuffer, StringBuilder 클래스 들의 차이점에 대해 알아 봅시다.

## String
String은 불변(immutable)객체 입니다. new 연산을 통해 생성되면 그 인스턴스의 메모리 공간은 절대로 변하지 않습니다. + 연산자나 concat을 이용해서 문자열을 업데이트 하더라도 메모리 공간이 변하는 것이 아니라 새로운 String 객체를 new로 만들어서 새로운 메모리 공간을 만들게 됩니다. 이렇게 새로운 문자열이 만들어지면 기존의 문자열은 가비지 콜렉터(GC)에 의해 제거되어야 하는데, GC는 언제 동작할지 알 수 없기 때문에 비효율적입니다. 따라서 이러한 문자열 연산이 많아질 때 계속해서 객체를 만드는 오버헤드가 발생하므로 성능이 떨어질 수 밖에 없습니다. (+연산시에는 내부적으로 char배열을 사용함) 

장점으로는, 객체가 불변이므로 멀티쓰레드 환경에서 동기화를 신경쓸 필요가 없고, 단순하게 읽어 가는 조회연산에서는 타 클래스보다 빠르게 읽을 수 있는 장점이 있습니다. 즉 String 클래스는 문자열 연산이 적고 조회가 많을 때 멀티쓰레드 환경에서 사용하면 좋습니다.

## StringBuffer
StringBuffer은 가변(mutable)객체 입니다. 문자열 연산에 있어 클래스를 한번만 만들고(new), 연산이 필요할 때 크기를 변경시켜서 문자열을 변경합니다. 그러므로 문자열 연산이 자주 있을 때 사용하면 성능이 좋습니다. 또한 멀티쓰레드 환경에서 synchronized키워드가 가능하므로 동기화가 가능합니다. 즉, thread-safe 합니다.


## StringBuilder
StringBuilder또한 가변(mutable)객체 입니다. StringBuffer와 거의 동일하지만 동기화를 지원하지 않기 때문에 멀티쓰레드환경에서는 적합하지 않습니다. 동기화를 고려하지 않기 때문에 싱글쓰레드 환경에서 StringBuffer에 비해 연산처리가 빠릅니다.


## 정리
- String클래스: 불변 객체이기 때문에 문자열 연산이 많은 프로그래밍이 필요할 때 계속해서 인스턴스를 생성하므로 성능이 떨어지지만 조회가 많은 환경, 멀티쓰레드 환경에서 성능적으로 유리합니다.
- StringBuffer클래스와 StringBuilder클래스는 문자열 연산이 자주 발생할 때 문자열이 변경가능한 객체기 때문에 성능적으로 유리합니다.
- StringBuffer와 StringBuilder의 차이점은 동기화지원의 유무이고 동기화를 고려하지 않는 환경에서 StringBuilder가 성능이 더 좋고, 동기화가 필요한 멀티쓰레드 환경에서는 StringBuffer를 사용하는 것이 유리합니다.

참고) StringBuffer와 StringBuilder는 성능으로 따졌을 때 2배의 속도차이가 있다고 하지만 참고사이트의 속도 차이 실험 결과 append()연산이 약 1억6천만번 일어날 때 약 2.6초의 속도차이를 보인다고 합니다. String은 +연산이 16만번이상 넘어가게 되면 10초이상 걸리면서 못 쓸정도의 성능을 보입니다. 따라서 문자열연산이 많지만 엄청나게 일어나지 않는 환경이라면 StringBuffer를 사용해서 thread-safe한 것이 좋습니다.

### 그 외
*JDK1.5이상부터 String에서 +연산으로 작성하더라도 StringBuilder로 컴파일하게 만들어 놨다지만 여전히 String클래스의 객체 생성하는 부분을 동일하므로 StringBuffer, StringBuilder 사용이 필요함.
* StringBuffer, StringBuilder의 경우 buffer size를 초기에 설정해야하는데 이런 생성, 확장 오버로드가 걸려 버퍼사이즈를 잘못 초기화할 경우 성능이 좋지 않을 수 있음.
* String클래스가 컴파일러분석단계에서 최적화될 가능성이 있기때문에 간혹 성능이 잘나오는 경우도 있음. 문자열 연산이 많지 않은 경우는 그냥 사용해도 무방. 런타임에서 문자열조합이 많아질 경우 String은 여전히 성능이 아주 안좋기 때문에 +, concat을 사용하지 말고 StringBuffer 또는 StringBuilder를 사용하도록 합시다.




----
해당 내용은 다음 글을 참고 하였습니다.
- https://jeong-pro.tistory.com/85