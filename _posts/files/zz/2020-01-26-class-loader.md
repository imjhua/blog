---
layout: post
title: 클래스 로더 
categories: JAVA
---


자바는 동적으로 클래스를 읽어옵니다. 즉, 런타임에 모든 코드가 JVM에 링크됩니다. 모든 클래스는 그 클래스가 참조되는 순간에 동적으로 JVM에 링크되며, 메모리에 로딩됩니다. 자바의 런타임 라이브러리([JDK 설치 디렉토리]/jre/lib/rt.jar) 역시 예외가 아닙니다. 이러한 동적인 클래스 로딩은 자바의 클래스로더 시스템을 통해서 이루어지며, 자바가 기본적으로 제공하는 클래스로더는 java.lang.ClassLoader를 통해서 표현됩니다. JVM이 시작되면, 부트스트랩(bootstrap) 클래스로더를 생성하고, 그 다음에 가장 첫번째 클래스인 Object를 시스템에 읽어옵니다.

## 동적인 클래스 로딩

런타임에 동적으로 클래스를 로딩하다는 것은 JVM이 클래스에 대한 정보를 갖고 있지 않다는 것을 의미합니다. 즉, JVM은 클래스의 메소드, 필드, 상속관계 등에 대한 정보를 알지 못합니다. 따라서, 클래스로더는 클래스를 로딩할 때 필요한 정보를 구하고, 그 클래스가 올바른지를 검사할 수 있어야 합니다. 만약 이것을 할 수 없다면, JVM은 .class 파일의 버전이 일치하지 않을 수 있으며, 또한 타입 검사를 하는 것이 불가능할 것입니다. JVM은 내부적으로 클래스를 분석할 수 있는 기능을 갖고 있으며, JDK 1.1부터는 개발자들이 리플렉션(Reflection)을 통해서 이러한 클래스의 분석을 할 수 있도록 하고 있습니다.

## 클래스를 로딩하는 방식

클래스를 로딩하는 방식에는 로드타임 동적 로딩(load-time dynamic loading)과 런타임 동적 로딩(run-time dynamic loading)이 있습니다. 

### 로드타임 동적 로딩(load-time dynamic loading)
JVM이 시작되고, 앞에서 말했듯이 부트스트랩 클래스로더가 생성된 후에, 모든 클래스가 상속받고 있는 Object 클래스를 읽어옵니다. 그 이후에, 클래스로더는 명령행에서 지정한 HelloWorld 클래스를 로딩하기 위해, HelloWorld.class 파일을 읽습니다. HelloWorld 클래스를 로딩하는 과정에서 필요한 클래스가 존재합니다. 바로 java.lang.String과 java.lang.System이다. 이 두 클래스는 HelloWorld 클래스를 읽어오는 과정에서, 즉 로드타임에 로딩됩니다. 이 처럼, 하나의 클래스를 로딩하는 과정에서 동적으로 클래스를 로딩하는 것을 로드타임 동적 로딩이라고 합니다.

```java
  public class HelloWorld {
     public static void main(String[] args) {
        System.out.println("안녕하세요!");
     }
  }
```

### 런타임 동적 로딩(run-time dynamic loading)
Class.forName(className)은 파리미터로 받은 className에 해당하는 클래스를 로딩한 후에, 그 클래스에 해당하는 Class 인스턴스(로딩한 클래스의 인스턴스가 아니다!)를 리턴합니다. Class 클래스의 newInstance() 메소드는 Class가 나타내는 클래스의 인스턴스를 생성합니다. 

따라서, Class.forName() 메소드가 실행되기 전까지는 RuntimeLoading 클래스에서 어떤 클래스를 참조하는 지 알수 없습니다. 다시 말해서, RuntimeLoading 클래스를 로딩할 때는 어떤 클래스도 읽어오지 않고, RuntimeLoading 클래스의 main() 메소드가 실행되고 Class.forName(args[0])를 호출하는 순간에 비로서 args[0]에 해당하는 클래스를 읽어옵니다. 이처럼 클래스를 로딩할 때가 아닌 코드를 실행하는 순간에 클래스를 로딩하는 것을 런타임 동적 로딩이라고 합니다.


```java
  public class HelloWorld1 implements Runnable {
     public void run() {
        System.out.println("안녕하세요, 1");
     }
  }
  public class HelloWorld2 implements Runnable {
     public void run() {
        System.out.println("안녕하세요, 2");
     }
  }

  public class RuntimeLoading {
     public static void main(String[] args) {
        try {
           if (args.length < 1) {
              System.out.println("사용법: java RuntimeLoading [클래스 이름]");
              System.exit(1);
           }
           Class klass = Class.forName(args[0]);
           Object obj = klass.newInstance();
           Runnable r = (Runnable) obj;
           r.run();
        } catch(Exception ex) {
           ex.printStackTrace();
        }
     }
  }
```

## ClassLoader

자바는 클래스로더를 사용하고, 클래스를 어떻게 언제 JVM으로 로딩하고, 언로딩하는지에 대한 특정한 규칙을 갖고 있습니다. 이러한 규칙을 이해해야, 클래스로더를 좀 더 유용하게 사용할 수 있으며 개발자가 직접 자신만의 커스텀 클래스로더를 작성할 수 있게 됩니다. 간단합니다. 클래스로더에 해당하는 클래스의 객체를 생성하고, 그 객체의 특정 메소드를 호출하기만 하면 됩니다.

----
해당 내용은 다음 글을 참고 하였습니다.
- https://javacan.tistory.com/entry/1