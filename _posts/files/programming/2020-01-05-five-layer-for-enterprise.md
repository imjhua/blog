---
layout: post
title: Enterprise 시스템 구축을 위한 5가지 계층
categories: Programming
---

애플리케이션을 개발할때 아키텍처를 구성하는 각각의 계층들이 존재 합니다. 이 계층들은 애플리케이션 내에서 명확히 구별되는 기능을 가지고 있으며, 서로 다른 계층을 침범하거나 그 기능에 있어 중복되는 점이 없어야 합니다. 지금은 대규모 웹 애플리케이션의 경우 다음 다섯가지 계층으로 일반화 되어 젹용되고 있습니다.

- 프리젠테이션 계층(Presentation Layer)
- 제어 계층(Control Layer)
- 비즈니스 로직 계층(Business Logic Layer)
- 퍼시스턴스 계층(Persistence Layer)
- 도메인 모델 계층(Domain Model Layer)

## 소개

약한 결합도를 가지는, 애플리케이션의 유연성을 더해주는 아키텍처 구성에 필요한 5가지 계층을 정리해보겠습니다.

## 프리젠테이션 계층(Presentation Layer)

UI, 앞단. 화면 컨트롤 및 결과를 보여줍니다. 사용자들이 보는 화면이라고 할 수 있습니다. 사용자가 선택할 수 있는 기능이 표시되어야 하고, 요청에 필요한 부가적인 정보 전달을 위한 입력 양식이 있어야 합니다. 데이터를 효과적으로 보여주기 위한 프리젠테이션 로직도 포함됩니다. 주의할 것은, 비지니스 로직이나 퍼시스턴스 계층에서 처리하는 일을 직접 사용하거나 컴포넌트와 직접적인 통신이 있어서는 안됩니다.

여러 개의 객체들로 구성된 복합 객체와 단일 객체를 클라이언트에서 구별 없이 다루게 해주는 패턴인 컴포지트 패턴이 주로 사용됩니다. 전체-부분의 관계를 갖는 객체들을 정의할때 유용합니다.

## 제어 계층(Control Layer)

제어 계층은 프리젠테이션 계층과 비즈니스 로직 계층을 분리하기 위한 컨트롤러를 제공합니다. 전체 시스템의 설정상태를 가지며 이를 통해 어떤 요청이 들어왔을때 어떤 로직이 처리해야 하는지를 결정합니다. 사용자 요청을 검증하기도 하고 로직에 요청을 전달하는 일, 로직에서 전달된 응답을 적절한 뷰에 연결짓는 역할을 합니다. UI 검증, 요청 및 응답 전달, 로직에서 던져진 예외 처리, 도메인 모델을 뷰와 연결하기 등의 고유 기능 외에는 어떤 기능도 포함하지 않습니다.

## 비즈니스 로직 계층(Business Logic Layer)

비즈니스 로직은 말 그대로 핵심 업무를 어떻게 처리하는지에 대한 방법을 기술하는 곳입니다. 비즈니스 로직에는 핵심 업무 로직의 구현과 그에 관련된 데이터의 적합성 검증 외에도 다양한 부가적인 구현이 추가됩니다. 트랜잭션 처리, 다른 계층들과 통신하기 위한 인터페이스를 제공, 해당 계층의 객체들간의 관계를 관리하는 것 등의 역할을 합니다.

## 퍼시스턴스 계층(Persistence Layer)

퍼시스턴스 계층은 데이터 처리를 담당하는 계층이다. 주로 데이터의 생성/수정/삭제/선택(검색)과 같은 CRUD 연산을 수행하게 됩니다. 데이터소스와 커넥션 풀을 담당, sql 맵핑, 캐싱 등의 물리적 저장공간을 이용한 로직이 존재 합니다. 이 데이터는 주로 데이터베이스에서 처리(디비에 로직 구현)되는 경우가 많아, 영속성을 의미하는 퍼시스턴스 계층이란 용어를 사용합니다. 이 계층에서는 일은 관계형 정보를 저장하고, 수정/삭제, 그러한 일을 수행하는 데 필요한 질의문을 관리하고 가져온 관계형 정보를 객체화시키는 일을 수행 합니다.

## 도메인 모델 계층(Domain Model Layer)

도메인 모델은 각 계층 사이에 전달되는 실질적인 비즈니스 객체입니다. 데이터가 담긴 그릇이라고 할 수 있습니다. 보통은 데이터를 전송할때, 객체(DTO) 형태로 개발자가 직접 제작해서, 리퀘스트나 세션과 같은 컨텍스트에 담아 넘기게 됩니다. 하지만 데이터베이스의 모든 정보를 일일이 객체로 만드는 것은 귀찮을 뿐 아니라, 계층간의 통신 과정에서 데이터가 유실될 위험도 있기 때문에 최근에는 도메인 모델을 서비스로 제공하여 자동화하는 경우가 많아졌습니다.

## 정리

지금까지 엔터프라이즈 시스템을 구축하기 위해 일반적으로 사용되는 다섯 계층에 대해 간단히 정리해 보았습니다. 비즈니스 로직 계층에 있어야 할 코드들이 프리젠테이션 계층이나 퍼시스턴스 계층에 여기저기 흩어져 있는 애플리케이션을 찾아보기란 그리 어려운 일이 아닙니다. 이런 구조는 각각의 계층을 모호하게 만들어 유지보수시 많은 시간을 필요로 하게 만듭니다. 다음을 기억하며 아키텍처를 구성하고 개발할때 관심사를 분리하여, 역할에 충실할 수 있는 개발을 해야겠습니다.

- 각각의 계층은 저마다의 분명한 역할이 존재하며, 그 역할을 충실히 수행할 수많은 대안기술(Alternative)들 사이에서 개발자는 무엇을 선택할 지 결정을 내려야 한다.
- 각각의 기술들은 독립적으로도 충분한 가치를 지니고 있지만, 가장 장점을 발휘하는 제 위치에서 서로 연계되어 사용될 때 그 시너지 효과가 더욱 크다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://postitforhooney.tistory.com/entry/Spring-MVC-%ED%8C%A8%ED%84%B4%EC%97%90%EC%84%9C%EC%9D%98-5%EA%B0%80%EC%A7%80-%EA%B3%84%EC%B8%B5%EC%97%90-%EB%8C%80%ED%95%9C-%EC%A0%95%EB%B3%B4-%ED%8D%BC%EC%98%B4