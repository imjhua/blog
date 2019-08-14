---
layout: post
title: Framework Patterns (MVC, MVP, MVVM, MVW)
categories: Web
---


프레임워크를 구성할때 사용하는 다양한 디자인 패턴들이 존재 합니다. 기본이되는 MVC와 이를 확장한 다른 패턴들에 대해서도 알아 봅시다.


## 소개
프레임워크를 구성할때 공통으로 꼭 필요한 요소들이 있습니다. 바로 Model과 View입니다.
- Model: 일종의 데이터(Data)라고 생각하면 된다. 데이터 이외에 데이터를 조작하는 간단한 로직이 추가 되기도 한다.
- View: 디스플레이. 사용자에게 제공되어지는 UI Layer를 뜻한다. 보통 Application에서는 View는 CSS/HTML/XML/XAML 등으로 렌더링 된 화면을 가르킨다.

MVC, MVP, MVVM 패턴과 같은 프레임워크가 나오게 된 궁극적인 이유는 각 계층을 분리시킴으로써 코드의 재활용성을 높이고 불필요한 중복을 막기 위함입니다. Model과 VIew의 의존성을 어떻게 제어하느냐에 따라 각 패턴이 분류 된다고 할 수 있습니다.


## MVC(Model - View - Controller입력담당)
모든 입력은 Controller에서 처리됩니다. 입력이 Controller로 들어오면 Controller는 입력에 해당하는 Model을 조작(업데이트)하고, Model을 나타내어줄 View를 선택합니다. Controller는 View를 선택할 수 있기 때문에 하나의 Controller가 여러개의 View를 선택하여 Model을 나타내어 줄 수 있습니다. 이때 Controller는 View를 선택만하고 업데이트를 시켜주지 않기 때문에 `View는 Model을 이용하여 업데이트` 하게 됩니다. Model을 직접 사용하거나 Model에서 View에게 Notify해주는 방법, View에서 Polling을 통해 Model의 변화를 알아채는 방법등이 있습니다. 이와 같이, View는 Model을 이용하기 때문에 서로간의 의존성을 완벽히 피할 수 없다는 단점이 있고, 좋은 MVC 패턴이라 함은 View와 Model간의 의존성을 최대한 낮게한 패턴이 좋은 패턴이라 할 수 있다.

## MVP(Model - View입력담당 - Presenter)
MVC 패턴의 단점인 View와 Model의 의존성을 줄이기 위해 새로 생긴 패턴입니다. MVC패턴과 다르게 입력이 View에서 처리됩니다. 이때, View와 Model은 직접 연결하지 않습니다. Presenter는 View의 인스턴스를 갖고 있으며 View와 1대1 관계이고, 그에 해당하는 Model의 인스턴스 또한 갖고 있기때문에 View와 Model 사이에서 다리와 같은 역할을 합니다. View에서 이벤트가 발생하면 Presenter에게 전달해주고 `Presenter는 해당 이벤트에 따른 Model을 조작`하고 그 결과를 바인딩을 통해 View에게 통보를 하여 View를 업데이트 시켜준다. VC 패턴과는 다르게 `Presenter를 통해 Model과 View를 완벽히 분리`해 주기 때문에 View는 Model을 따로 알고 있지 않아도 된다는 장점이 있습니다. 단점으로는 View와 1대1 관계이기 때문에 View와의 의존성이 매우 강합니다.

## MVVM(Model - View입력담당 - ViewModel)
MVP 패턴의 단점인 View와 Presenter가 1:1로 강한 의존성을 가지는 문제를 보안하기 위해 새로 생긴 패턴입니다. ViewModel 뷰모델 말그대로 View를 나타내주기 위한 Model이라고 생각하면 됩니다. View보다는 Model과 유사하게 디자인 되며, View의 바인딩 될 때 가장 강력합니다. MVP와 같이 View에서 입력이 처리됩니다. MVVM 패턴의 가장 큰 장점이라 함은 Command와 Data Binding으로 MVP 패턴과 달리 `View와의 의존성을 완벽히 분리` 할 수 있다는 장점이 있다. Command를 통하여 Behavior를 View의 특정한 ViewAction(Event)와 연결할 수 있으며, ViewModel의 속성과 특정 View의 속성을 Binding 시켜 줌으로써 ViewModel 속성이 변경 될때마다 View를 업데이트 시켜줄 수 있습니다.

MVVM은 두가지 디자인 패턴을 사용합니다. Command패턴과 Data Binding입니다. 이 두가지 패턴으로 인해 View와 ViewModel은 의존성이 완전히 사라지게 됩니다. MVP와 마찬가지로 View에서 입력이 들어오고 입력이 들어오면 Command 패턴을 통해 ViewModel에 명령을 내리게 되고 Data Binding으로 인해 ViewModel의 값이 변화하면 바로 View의 정보가 바뀌어져 버리게 되는 것 입니다.

## MVW (Model - View - Whatever)
MVW은 Model-View-Whatever를 의미하는 것으로 Whatever가 * (asterisk) 의 뜻을 가집니다. Contoller, ViewModel, Apadter 등 다양한 방식의 디자인패턴을 지칭하는 의미로 사용됩니다. MVW가 등장하게 된 배경은 AngularJS가 이 개념을 선언하면서부터 입니다. 개발자들이 어떠한 디자인패턴을 선택해야 하는지를 두고 논쟁을 벌이며 시간을 버리는 것을 보고 AngularJS의 프레임워크를 MVW로 선언했다고 합니다. 여기서 사용된 Whatever는 '무엇이든지 당신을 위해 일한다.' 는 의미라고 하니 어떠한 형태로 개발해야 하는 지 논쟁하지 말고 AngularJS를 사용하면 어떤 구조라도 포용할 수 있다는 것을 말하는 듯 합니다.
 

## 정리
공통점은 모델입니다. 언급한 프레임워크들의 모델은 대부분 양방향 바인딩을 통해 모델에 있는 값이 변하면 뷰에서도 이를 변화시켜줍니다. 여기서 핵심은 변화시킨다는 점입니다. 변화라는 것은 상당히 복잡한 작업이라, 특정 이벤트가 발생했을 때 모델에 변화를 일으키고, 변화를 일으킴에 따라 어떤 DOM을 가져와서 어떤 방식으로 뷰를 업데이트해줄 지 로직을 정해주어야합니다. 페이스북은 React를 만들기 전에 이런 발상을 했습니다. "Mutation을 하지 말자. 그 대신 데이터가 바뀌면 View를 날려버리고 새로 만들면 되지 않을까?"

그러면 변화를 만드는 복잡한 작업없이 간단하게 화면이 변경될 것입니다. 하지만, 브라우저가 DOM 기반으로 작동하는 이 페이지를 그때 그때 새로운 뷰를 만들어내라고 한다면 성능적인 문제가 발생할 것입니다. 그래서 사용되는 것이 바로 virtual DOM입니다.



----
해당 내용은 다음 글을 참고 하였습니다.
- https://hackersstudy.tistory.com/71