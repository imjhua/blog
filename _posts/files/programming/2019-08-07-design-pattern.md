---
layout: post
title: 소프트웨어 디자인 패턴 
categories: Programming
---

소프트웨어 디자인 패턴의 개념, 구조, 분류, 종류에 대해 각각 알아 보는 시간을 가져 보고자 합니다. 디자인 패턴이란 소프트웨어를 설계할 때 특정 맥락에서 자주 발생하는 고질적인 문제들이 있는데 이런 문제들이 또 발생했을 때 재사용할 수 있는 해결책들을 디자인 패턴이라고 정의하여 개발시에 사용하고 있습니다. 각기 다른 소프트웨어 모듈이나 기능을 가진 다양한 응용소프트웨어 시스템들을 개발할 때도 서로간의 공통되는 설계 문제가 존재하며 이를 처리하는 해결책 사이에도 공통점이 있습니다. 이런 유사점을 패턴이라하며 패턴은 개발시의 의사소통을 원활하게 해주는 중요한 역할을 합니다. 다만, 디자인 패턴을 맹신한 나머지 모든 문제를 패턴을 써서 해결하려 드는 패턴병에 걸리지 않도록 조심해야 합니다.

## 패턴의 분류

다양한 디자인 패턴을 범주별로 분리를 해보면서 패턴의 특징을 쉽게 파악할 수 있습니다. 다음 두가지로 크게 구분해 볼 수 있습니다.

- 생성, 행동, 구조 관련 패턴으로 분류
- 클래스, 객체 패턴으로 분류

### 생성, 행동, 구조 관련 패턴으로 분류

#### 생성

객체 생성과 관련된 패턴으로 객체 생성과 조합을 캡슐화 해 특정 객체가 생성되거나 변경되어도 프로그램 구조에 영향을 크게 받지 않도록 유연성을 제공합니다.

종류) 추상 / 빌더 / 팩토리 메서드 / 프로토타입 / 싱글톤

#### 구조

클래스나 객체를 조합해 더 큰 구조를 만드는 패턴으로 예를 들어 서로다른 인터페이스를 지닌 2개의 객체를 묶어 단일 인터페이스를 제공하거나 객체들을 서로 묶어 새로운 기능을 제공하는 패턴입니다.

종류) 어탭터 / 브릿지 / 컴포지트 / 데코레이터 / 퍼사드 / 플라이웨이트 / 프록시

#### 행위

클래스와 객체들이 상호작용하는 방법 및 역할을 분담하는 방법과 관련된 패턴으로 객체나 클래스 사이의 알고리즘이나 책임분배를 담당합니다. 한 객체가 혼자 수행할 수 없는 작업을 여러개의 객체로 어떻게 분배하는지, 또 그렇게 하면서도 객체사이의 결합도를 최소화하는 것에 중점을 두고 있습니다.

종류) 책임연쇄 / 커맨드 / 인터프리터 / 이터레이터 / 미디에이터 / 머멘토 / 옵저버 / 스테이트 / 스트래티지 / 템플릿 / 비지터

### 클래스, 객체 패턴으로 분류

#### 클래스 패턴(Class Pattern)

클래스 사이의 관계가 상속을 통해서 어떤 식으로 정의되는지를 다룹니다. 클래스 패턴은 컴파일시에 관계가 결정됩니다.

중류) 템플릿 메소드, 팩토리 메소드, 어댑터, 인터프리터

#### 객체 패턴(Object Patterns)

객체 사이의 관계를 다루며, 객체 사이의 관계는 보통 구성을 통해서 정의됩니다. 객체 패턴에서는 일반적으로 실행 중에 관계가 생성되기 때문에 더 동적이고 유연합니다.

종류) 스트래티지, 옵저버, 데코레이터, 프록시, 컴포지트, 이터레이터, 스테이트, 추상 팩토리, , 비지터, 메멘토, 역할 사슬, 브리지, 미디에이터, 플라이웨이트, 프로토타입, 빌더

## 패턴의 종류

### 추상화 패턴(Abstract Pattern)

구체적인 클래스에 의존하지 않고 서로 연관되거나 의존적인 객체들의 조합을 만드는 인터페이스를 제공합니다. 많은 수의 연관된 서브 클래스를 특정 그룹으로 묶어 한번에 교체할 수 있도록 만들었습니다.

### 팩토리 메서드 패턴(Factory Method Pattern)

팩토리 메소드 패턴은 객체 생성을 직접하지 않고 하위 클래스가 어떤 객체 생성을 할지 결정하도록 위임하는 디자인 패턴입니다. 객체를 만들어 반환하는 함수를 (생성자 대신) 제공하여 초기화 과정을 외부에서 보지 못하게 숨기고 반환 타입을 제어하는 방법입니다. 객체 생성처리를 서브 클래스로 분리해 처리하도록 캡슐화 합니다. 팩토리 메소드(Creator)라는 추상클래스를 만들고 추상클래스안에 create()라는 추상메서드를 만듭니다. 이 추상메서드 create()는 일련의 프로세스가 존재할 것입니다. 그러면 이 것을 받는 extends 하는 하위클래스(PotionCreator)를 만들고 여기서 들어오는 인자(String)로 알맞은 객체를 생성합니다. 즉, 객체의 생성 코드를 별도의 클래스/메서드로 분리함으로써 객체 생성의 변화에 대비하는 데 유용합니다. 상위 클래스에서 공통되는 알고리즘을 구현하고 각각의 하위 클래스에서 상세 부분을 구현합니다.

간단합니다.static 메소드입니다.

```java
public static Boolean valueOf(boolean b){ return b ? Boolean.TRUE : Boolean.FALSE; }
```

설계: 객체 생성을 전담하는 별도의 Factory 클래스 이용한다. 특정 기능의 구현은 개별 클래스를 통해 제공되는 것이 바람직한 설계다.

### 추상 팩토리 메서드 패턴(Abstract Factory Pattern)

관련성 있는 여러 종류의 객체를 일관된 방식으로 생성하는 경우에 유용합니다.

#### 예

엘리베이터 부품 업체를 변경하는 경우, 여러 제조 업체의 부품을 사용하더라도 결과적으로는 같은 동작을 지원하게 하는 것이 바람직하다. 즉, 엘리베이터 프로그램의 변경을 최소화해야 합니다.

- 주의사항: 부품별로 클래스를 만드는 대신 제조 업체 별로 팩토리 클래스를 만든다.
- 설계: 여러 종류의 객체를 생성할 때 객체들 사이의 관련성이 있는 경우, 각 종류별로 별도의 Factory 클래스를 사용하는 대신 관련 객체들을 일관성 있게 생성하는 Factory 클래스를 사용 하는 것이 편리할 수 있다.

### 빌더(Builder Pattern)

빌더 클래스는 인스턴스를 생성자를 통해 직접 생성하지 않고, 빌더라는 내부 클래스를 통해 간접적으로 생성하게 하는 패턴입니다. 클래스와 사용 대상의 결합도를 낮추거나 생성자에 전달하는 인수에 의미를 부여하기 위해 사용합니다. 생성자에 전달되어야 할 파라메터가 다양해서 골치 아픈 경우 Builder 패턴이 좋은 해결책이 된다. 방법은 Builder 객체를 만들고 setter 를 통해 필요한 파라메터를 설정 한 후에 build() 메소드 호출을 통해 실제 객체를 생성한다.

```js
let storage = StorageBuilder.newBuilder()
  .setURL("file:///tmp/test.csv")
  .setType("csv")
  .setFieldDelimiter(",")
  .setLineDelimiter("\n")
  .setEncoding("UTF-8")
  .build();
```

### 프로토타입(Prototype Pattern)

원본(Prototype)을 만들어 놓고 원본 객체를 복사하여 사용하는 방식의 디자인 패턴입니다.

### 싱클톤(Singleton Pattern)

전역 변수로 사용하지 않고 객체를 하나만 생성하도록 해서 생성된 객체를 어디에서든지 참고 할수 있도록 합니다. 클래스 내부에 생성된 유일한 인스턴스 이외에는 더 이상 인스턴스를 생성할 수 없는, 즉 1개의 클래스 인스턴스만 생성이 가능합니다. 애플리케이션이 시작될 때 어떤 클래스가 최초 한번만 메모리를 할당하고(Static) 그 메모리에 인스턴스를 만들어 사용하는 디자인패턴으로 생성자가 여러 차례 호출되더라도 실제로 생성되는 객체는 하나고 최초 생성 이후에 호출된 생성자는 최초에 생성한 객체를 반환합니다. (자바에선 생성자를 private로 선언해서 생성 불가하게 하고 getInstance()로 받아쓰기도 함) 고정된 메모리 영역을 얻으면서 한번의 new로 인스턴스를 사용하기 때문에 메모리 낭비를 방지할 수 있고 또한 싱글톤으로 만들어진 클래스의 인스턴스는 전역 인스턴스이기 때문에 다른 클래스의 인스턴스들이 데이터를 공유하기 쉽습니다.

싱글톤 패턴의 문제점으로는, 싱글톤 인스턴스가 너무 많은 일을 하거나 많은 데이터를 공유시킬 경우 다른 클래스의 인스턴스들 간에 결합도가 높아져 "개방-폐쇄 원칙" 을 위배하게 됩니다. (=객체 지향 설계 원칙에 어긋남) 따라서 수정이 어려워지고 테스트하기 어려워집니다. 또한 멀티쓰레드환경에서 동기화처리를 안하면 인스턴스가 두개가 생성된다든지 하는 경우가 발생할 수 있습니다.

DBCP(DataBase Connection Pool)처럼 공통된 객체를 여러개 생성해서 사용해야하는 상황에서 많이 사용됩니다.
ex) 쓰레드풀, 캐시, 대화상자, 사용자 설정, 레지스트리 설정, 로그 기록 객체 등

- 인스턴스가 절대적으로 한개만 존재하는 것을 보증하고 싶을 경우 사용.
- 두 번째 이용시부터는 객체 로딩 시간이 현저하게 줄어 성능이 좋아지는 장점.

구현 방법에는 사전 초기화, 늦 초기화 등이 있습니다.

- Eager initialization(사전 초기화): 클래스 로딩시에 인스턴스를 생성하는 방법이다. 멀티스레드 환경에서의 이중 객체 생성 문제가 없지만, 인스턴스를 호출하지 않아도 무조건 클래스를 초기화하기에 메모리 효율이나 연산 효율은 낮다.
- Lazy initialization(늦 초기화): 인스턴스를 실제로 사용할 시점에서 인스턴스를 생성하는 방법이다. 세심한 방법을 쓰지 않으면 이중 객체 생성 문제가 발생할 가능성이 높으나, 인스턴스를 실제로 사용하지 않는다면 메모리와 연산량을 아낄 수 있다는 장점이 있다.

싱글턴 패턴의 특징은 다음과 같습니다.

- private 생성자를 갖는다.
- 하나의 인스턴스를 반환하는 getInstance() 메서드를 사용한다.

### 컴포지트(Composite Pattern)

컴포지트 패턴이란 객체들의 관계를 트리 구조로 구성하여 부분-전체 계층을 표현하는 패턴으로, 여러개의 객체들로 구성된 복합 객체와 단일 객체를 클라이언트에서 구분 없이 다룰수 있습니다. 전체-부분 관계(Ex. Directory-File)를 갖는 객체들 사이의 관계를 정의할 때 유용합니다. 컴포지트 패턴은 아래와 같이 3가지의 요소에 의해 이루어진다.

#### 적용 포인트

컴포지트 패턴은 트리 같은 구조가 필요할 때 사용할 수 있습니다. 트리메뉴를 컴포지트 패턴을 이용해서 구성해 보는 것이 도움이 많이 됩니다. 컴포지트 패턴은 단일 객체처럼 행동하는 다수의 객체(인터페이스가 똑같거나, 비슷한 객체)가 있는 경우 적용시킬 수 있습니다.

```
Composite = Composite + Leaf.
```

즉 재귀적인(reculsive) 요소를 가지고 있습니다. 이 말은 다음 단계를 탐색하면서 하위 노드의 탐색이 끝나면 다시 자기자신으로 돌아옴을 뜻합니다.

이런 특성을 가지고 있으므로 하나의 인터페이스를 통해 서로 다른 종류의 하위 노드에 접근 할 수 있다면, 탐색시에 많은 편리함을 느낄 수 있습니다.

#### 컴포지트 구성요소

- Component (Interface): 복합 객체내에 들어있는 모든 객체들에 대한 인터페이스를 제공합니다. 복합노드, 리프노드에 대한 메소드를 정의함.
- Leaf: 그 안에 들어있는 원소에 대한 행동을 정의. Component를 구현하는 클래스요소. leaf 클래스에서는 base component 외에는 다른 컴포넌트를 섞지 않는다.
- Composite (=복합객체): 자식이 있는 구성요소의 행동을 정의하고 자식 구성요소를 저장하는 역할을 맡음. 다수의 leaf 클래스를 컨트롤 할 수 있는 클래스로 인터페이스는 Component부터 얻어 공통된 인터페이스로 작업을 할 수 있는 클래스이다.
- Client: Component 인터페이스를 사용해 복합 객체 내의 객체들을 조작할 수 있음.

#### 예제 코드

간단히 삼각형, 원, 선의 객체 오브젝트를 생성하고 이 모든 객체를 빨강색으로 칠하는 작업을 컴포지트 패턴을 통해서 해보도록 한다.

```js
// base component
public interface Shape {
    public void draw(String color);
}

// leaf
// 삼각형
public class Triangle implements Shape {
    @Override
    public void draw(String color) {
        System.out.print("triangle color: " + color);
    }
}

// 원
public class Circle implements Shape {
    @Override
    public void draw(String color) {
        System.out.print("circle color: " + color);
    }
}

// 라인
public class Line implements Shape {
    @Override
    public void draw(String color) {
        System.out.print("line color: " + color);
    }
}

// composite
public class Drawing implements Shape {
    private List<Shape> shapes = new ArrayList<Shape>();

    @Override
    public void draw(String color) {
        for (Shape sh : shapes) {
            sh.draw(color);
        }
    }

    // 아래서부터는 헬퍼 성격의 메소드이다. 추가/제거/전체제거
    public void add (Shape s) {
        this.shapes.add(s);
    }

    public void remove (Shape s) {
        this.shapes.remove(s);
    }

    public void clear () {
        this.shapes.clear();
    }
}
```

- base component: 뼈대가 되는 클래스로 아래와 같이 draw 메소드를 가지는 인터페이스로 구성되었다. 컴포지트 패턴을 사용하기 위해서는 아래의 클래스를 구현하는 방법으로 진행된다.
- leaf: 위의 base component를 구현하여 만들어진 클래스들이다. leaf로 구성된 클래스를 이용하여 다수의 객체를 생성할 수 있다. 위에서 설명했듯이 base component 외에는 다른 메소드를 사용할 수 없다.
- composite: leaf의 객체 그룹을 컨트롤 하는 역활을 한다.

#### 사용 예

컴퓨터에 추가 장치 지원하는 경우 각각의 부품은 마우스, 키보드, 본체, 모니터가 되고 컴퓨터는 구성 장치로서 합성 관계가 된다.

- 주의사항: 컴푸터 클래스에 속한 부품의 구체적인 객체를 가리키면 OCP(Open-Close-Principle)를 위반하게 된다는 것이다.
- 설계: 구체적인 부품들을 일반화한 클래스를 정의하고 이를 Computer 클래스가 가리키도록 설계한다. 구체적인 부품들을 일반화한 ComputerDevice 클래스를 정의하고 부품들은 해당 클래스를 상속받아 구현한다.

### 데코레이터(Decorator Pattern)

객체의 결합을 통해 기능을 동적으로 유연하게 확장 할 수 있습니다. 호출의 반환값에 변화를 줄 수 있습니다. 기본 기능에 추가할 수 있는 기능의 종류가 많은 경우에 각 추가 기능을 Decorator 클래스로 정의 한 후 필요한 Decorator 객체를 조합함으로써 추가 기능의 조합을 설계 하는 방식입니다. 즉, 객체에 추가적인 요건을 동적으로 첨가 합니다. 데코레이터는 서브클래스를 만드는 것을 통해서 기능을 유연하게 확장할 수 있는 방법을 제공합니다.

설계: 각 추가 기능별로 개별적인 클래스를 설계하고 기능을 조합할 때 각 클래스의 객체 조합을 이용한다.

### 퍼사드(Facade)

기능마다 별도의 클래스를 만들고, 그 기능들로 해야할 일을 한번에 처리해주는 클래스를 만들어 처리하는 패턴으로 복잡한 호출과정을 대신 처리해주는 wrapper 객체를 따로 만드는 것입니다. 함수 호출 비용이 조금 들어가나 훨씬 쉽게 사용할 수 있습니다. 여기서 객체를 따로 만드는 이유로는 하위 모듈을 건드릴 수 없는 경우(외부 라이브러리)나 저수준과 고수준 추상층(abstract layer) 개념 구분을 하고 싶은 경우, 크로스플랫폼 기술 구현 등의 이유가 있습니다.

파사드 패턴은 시스템의 복잡성을 감추고, 사용자(Client)가 시스템에 접근할 수 있는 인터페이스(Interface)를 사용자(Client)에게 제공합니다. 따라서 파사드 패턴은 기존의 시스템에 인터페이스를 추가함으로써, 복잡성을 감추기 위해 사용됩니다.

### 프록시(Proxy Pattern)

연산을 할 때 객체 스스로가 직접 처리하지 않고 중간에 다른 '숨겨진' 객체를 통해 처리하는 방법의 디자인 패턴입니다. 어떤 객체에 대한 접근을 제어하기 위한 용도로 대리인에 해당하는 객체를 제공하는 패턴입니다. 프록시 패턴을 이용하면 원격 객체라든가 생성하기 힘든 객체, 보안이 중요한 객체와 같은 다른 객체에 대한 접근을 제어하는 대변자 객체를 만들 수 있습니다.

데코레이터 패턴과 구현방법이 비슷하지만 차이점은, 데코레이터 패턴은 반환값에 장식을 추가 하지만 프록시 패턴은 장식을 추가 하지 않고 반환을 받는다는 차이가 있습니다. 두 패턴은 구현이 매우 유사 하지만 의도에서 분명한 차이를 보입니다. 데코레이터 패턴은 기존 객체의 기능을 확장하는데 초점이 맞춰져 있는 반면에 프록시 패턴의 경우 실제 객체에 대한 접근을 제어 하는데 초점을 맞추고 있습니다.

### 옵저버(Observer Pattern)

한 객체의 상태변화에 따라 다른 객체의 상태도 연동되도록 일대다 객체의 관계를 구성하는 패턴입니다. 데이터의 변경이 발생했을 경우 상대 클래스나 객체에 의존하지 않으면서 데이터 변경을 통보하고자 할 때 유용합니다.

설계: 공통 기능을 상위 클래스 및 인터페이스로 일반화하고 이를 활용하여 통보하는 클래스를 구현한다.

### 스테이트(State Pattern)

객체의 상태에 따라 객체의 해위 내용을 변경해 주는 패턴입니다.

### 스트래티지(Strategy Pattern)

행위를 클래스로 캡슐화해 동적으로 행위를 자유롭게 바꿀 수 있게 해주는 패턴입니다. 같은 문제를 해결하는 여러 알고리즘이 클래스별로 캡슐화되어 있고 이들이 필요할 때 교체할 수 있도록 함으로써 동일한 문제를 다른 알고리즘으로 해결할 수 있게 하는 디자인 패턴으로 쉽게 말해서 상속받은 객체마다 다를 수 있는 행위부분(메서드)을 캡슐화해 교환하여 사용하는 패턴입니다. 즉, 행위에 대한 전략을 쉽게 바꿀 수 있도록 해주는 디자인 패턴입니다.

하지만 정의된 행위가 없는 객체가 추가되거나 새로운 행위를 가진 객체가 추가된다면 해당되지 않는 메서드를 가지고 있어야 하거나 다시 제거시 번거로움이 있습니다. 인터페이스로 기능마다 만들려고 한다면 많은 기능이 있을 때 객체마다 다르게 implements해야하는 단점이 있습니다. 그래서 이것을 해결하기위해서 변경이 많은 부분은 인터페이스로 정의하고 인터페이스 변수를 자식클래스가 가지고 있는 방법으로 하면 자식클래스에서 인터페이스의 메서드를 부르게만 해 놓아서 기능을 위임하는 방법을 사용합니다.

### 템플릿 메소드(Template method Pattern)

템플릿, 말 그대로 템플릿을 만들어주고 특정 메서드 안을 채워넣기만 하면 되는 디자인 패턴입니다. (PPT 템플릿처럼 제목, 목차, 내용, 질의응답 칸이 있고 거기에 맞게 글을 채워넣듯) 어떤 작업을 처리하는 일부분을 서브 클래스로 캡슐화 해 전체 일을 수행하는 구조는 바꾸지 않으면서 특정 단계에서 수행하는 내용을 바꾸는 패턴입니다. 전체적인 레이아웃을 통일시키지만 상속받은 클래스가 유연성을 가질 수 있게 만드는 장점이 있습니다.

#### 예

설계: 2개 이상의 클래스가 유사한 기능을 제공하면서 중복된 코드가 있는 경우에는 상속을 이용해서 코드 중복 문제를 피할 수 있다.

### 커맨드(Command Pattern)

실행될 기능을 캡슐화 함으로써 주어진 여러 기능을 실행할 수 있게 재사용성이 높은 클래스를 설계하는 패턴입니다. 이벤트가 발생했을 때 실행될 기능이 다양하면서도 변경이 필요한 경우에 이벤트를 발생시키는 클래스를 변경하지 않고 재사용하고자 할 때 유용합니다.

설계: 구체적인 기능을 직접 구현하는 대신 실행될 기능을 캡슐화합니다.

## 어댑터(Adapter Pattern)

어댑터를 통해 호출하는 패턴으로, 한 클래스의 인터페이스를 클라이언트에서 사용하고자 하는 다른 인터페이스로 변환하는 패턴입니다. 이 패턴을 이용하면 인터페이스 호환성 문제로 같이 쓸수 있습니다. 어댑터 패턴은(종종 wrapper pattern이라고 언급되기도 하고, 더 간단히 wrapper라고 불리기도 함) 한 클래스의 인터페이스를 호환 가능한 다른 인터페이스로 변환시키는 디자인 패턴입니다. 호환되지 않는 인터페이스때문에 일반적인 방법으로는 같이 사용할 수 없는 클래스들을 어댑터 패턴을 이용하면 같이 사용할 수 있습니다. 이는 클라이언트 코드에게 원래 클래스의 인터페이스를 노출시키는 대신에 어댑터의 인터페이스를 노출시킴으로써 가능해집니다. 어댑터는 어댑터 인터페이스에 대한 호출을 원래 클래스의 인터페이스 호출로 변환하고, 이를 위해 필요한 코드 량은 일반적으로 작습니다. 어댑터는 또한 데이터를 적절한 형태로 변환하는 역할도 합니다.

예) 예를 들어, 여러개의 불(boolean) 값이 하나의 정수에 들어있는데(예를들면 flag같은 경우), 당신의 클라이언트 코드에서는 하나의 'true'나 'false' 값만 필요하다면 어댑터는 이 정수에서 적절한 값을 추출해내는 역할을 할 수 있다. 다른 예는 날짜의 형태를 변경하는 것이다.(예를들면 YYYYMMDD를 MM/DD/YYYY 형태로 만들거나 DD/MM/YYYY 같은 형태로 만들 수 있다.)

- 객체 어댑터 패턴 Object Adapter Pattern: 이 타입의 어댑터 패턴에서 어댑터는 감싸야할 클래스의 객체를 포함하고 있다. 이러한 상황에서 어댑터는 감싸진 객체를 호출하는 일을 한다.
- 클래스 어댑터 패턴 Class Adapter Pattern: 이 타입의 어댑터는 목표를 달성하기 위해 여러개의 다형성 인터페이스(polymorphic interfaces)를 사용한다. 어댑터는 구현될 예정인 인터페이스나 이미 구현된 인터페이스를 상속받아서 만들어진다. 구현될 예정인 인터페이스는 순수(pure) 인터페이스 클래스로 만들어지는 것이 일반적인데, 특히 자바같이 다중 상속(multiple inheritance)을 지원하지 않는 언어들에서 그러하다.

### MVC(Model View Contoroller Pattern)

MVC(Model-View-Controller) Pattern의 목표는 사용자 인터페이스로부터 비즈니스 로직 과 프레젠테이션 로직 의 분리입니다. 분리를 통해 비즈니스 로직은 재사용이 가능하도록 존재하며 뷰(View)또한 쉽게 고칠 수 있는 장점이 있습니다.

Model, View, Controller 세 가지 부분으로 이루어져 있습니다.

- Model: 자료(Data)를 생성, 저장, 처리하는 역할을 하는 부분이다.
- View: Model로부터 받은 자료를 여러 가지 형태로 사용자에게 보여주는 역할을 한다.
- Controller: 소프트웨어의 흐름을 제어하는 것으로 View와 Model 사이에서 관계를 설정하여 주는 부분을 말한다. Controller는 Model이나 View가 바뀌더라도 수정 없이 작동되어야 한다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://gmlwjd9405.github.io/2018/07/06/design-pattern.html
- https://donxu.tistory.com/entry/Adapter-Pattern-어댑터-패턴
