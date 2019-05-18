---
layout: post
title: 마이크로 서비스 아키텍처 (Micro Service Architecture)
tags:
 - msa
 - micero-service-architecture
categories: Programming
---

## 소개
대용량 웹서비스가 많아짐에 따라 정의된 아키텍처로써 서비스 지향 아키텍처(SOA: Srevice Oriented Architecture)를 근간으로 도메인을 기능별로 분리한 단위보다 더 작은 최소 단위입니다. 기능일수도 있고 최소 함수 및 조직단위가 하나의 서비스가 될 수 있습니다.

## 모노리틱 아키텍처(Monolithic Architecture)
마이크로 서비스 아케틱처가 등장하기 전, 과거에는 모노리틱 아키텍처로 많이 설계되었습니다. 모노토릭은 완전히, 통인된, 단일 결정된 뜻으로 기존의 전통적인 웹 시스템 개발에 많이 사용된 스타일입니다. 하나의 애플리케이션 내에 모든 로직들이 있는 통짜 구조의 아키텍처입니다. 상호작용을 하는 컴포넌트들이 함수호출을 통해 작용합니다. 전체 애플리케이션을 하나로 처리하기 때문에 개발툴 등에서 하나의 애플리케이션만 개발하면 되고 배포 및 테스트도 하나의 애플리케이션만 수행합니다.

### 장점 
규모가 작은 애플리케이션에서는 배포 및 운영 관리가 용이하고 매우 간단합니다. 하나의 구조로 되어 있기 때문에 트랜잭션 관리 등이 용이합니다. 
- 작은 규모에서는 빠른 프로토타입 실행, 그리고 생산성을 가져갈 수 있다.
- 배포할때에는 하나의 서버만 변경하면 되기 때문에 심플하게 재 배포할 수 있다.
- call by reference에 의한 컴포넌트간 호출시 성능에 제약이 덜함
- 트트렌젝션 관리가 용이하다.
- 운영 관리가 용이하다.

### 단점
컴포넌트들은 타이트한 연결로 전체 시스템 구조를 제대로 파악하지 못하는 경우 개발시에 모듈의 성능 문제나 장애가 다른 컴포넌트들에게 영향을 주게 되어 문제가 발생할 수 있습니다. 일부 컴포넌트에서만 수정이 이루어진 경우에도 전체를 통으로 배포해야 하므로 잦은 배포에 분리 하며 컴포넌트별로 특성에 맞게 다른 기술을 도입하고자 할때 유연하지 못합니다. 또한 대형시스템에서 크기가 큰 경우 빌드, 배포시간, 서버기동시간이 오래 걸립니다. 
- 규모가 클 경우에 빌드 및 배포 시간 그리고 서버의 기동 시간까지 오래걸린다.
- 한 두 사람의 실수는 전체 시스템 빌드의 실패를 유발한다. (Java같은 컴파일 언어 시에) 때문에 협업개발하기가 쉽지않다.
- 구조가 커지면 커질수록 해당 프로젝트의 소스코드를 수정하기위해 전체 프로젝트 구조와 로직을 숙지하기 까지 러닝커브시간이 깊어진다.
- 컴포넌트 재 배포시, 수정된 컴포넌트 뿐만 아니라, 전체 어플리케이션을 재 컴파일 하기 때문에 잦은 배포가 있는 시스템의 경우 불리하다. - 빌드, 구동 시간까지 오래걸린다.
- 예를 들어 Java 언어 플랫폼에서, 비동기 입출력을 요구하는 스펙에 맞추는 기능을 개발했을 때에, 전체 시스템이 꺼지지 않기 위한 복잡한 예외처리를 요구한다.(이 경우 node.js같은 언어가 더 적합하지만..)

## 서비스 지향 아키텍처(SOA: Service Oriented Architecture)
2000년대 초반 대용량 분산 시스템 설계의 한가지 방법으로 엔터프라이즈 시스템이 중심이 되는 아키텍처로 기존의 애플리케이션의 기능들을 비지니스적인 의미를 가지는 기능 단위로 묶어서 표준화된 호출 인터페이스를 통해서 서비스로 구현하고, 이 서비스들을 기업의 업무에 따라 조합하여 애플리케이션을 구성하는 소프트웨어 개발 아키텍처입니다. 점점 확장되어가능 독립된 업무 시스템의 통합에 대한 요구와 시스템 업무변화에 대한 대응력을 높이기 위해 등장하였습니다. 서비스와 API를 기본 컨셉으로 두고 있습니다. 구여기서 서비스란 비지니스적 의미를 가지는 기능들을 모아 놓은 소프트웨어 컴포넌트를 의미합니다.

토마스 얼의 SOA에 대한 정의
> SOA는 공개, 기민성, 확장, 연합, 자립적 요소들로 구성된 조합가능한 아키텍처이며 서비스 품질, 다양한 벤더, 상호 운영성, 서비스 발견 그리고 잠재적으로 재사용 가능한 서비스들이 웹서비스로 구현된다. SOA는 비지니스 로직과 기술을 추상화하여, 이 도메인 간에 느슨한 결합을 유도한다. SOA는 과거 플랫폼의 진화물로서 전통적인 아키텍처의 특징들을 고스란히 가지고 있으며, 명확한 원칙을 가지고 SOE를 지원하며 서비스 지향을 촉진한다. SOA는 엔터프라이즈 환경을 이상적으로는 표준화하지만, 치밀한 사전 계획에 의한 이전 필요성과 현재도 진화하고 있는 기술에 대한 지원만이 이러한 목적을 달성할 수 있다.

W3C의 Web Service Architecture Working Group에서 활동하고 있는 Hao He 박사의 SOA에 대한 정의
> 상호 작동하는 시스템 사이를 느슨하게 연결하려는 목적을 가진 아키텍처

## 마이크로 서비스 아키텍처(Micro Service Architecture)
2014년 부터 IT업계에서 알려지기 시작했습니다. 서비스와 API를 기본 컨셉으로 하는 서비스 지향 아키텍처(SOA)에 근간을 두고 대용량 웹서비스 개발에 맞는 구조로 경량화되고 대규모 개발팀의 조직 구조에 맞도록 변형된 아키텍처입니다. 엔터프라이즈 시스템보다는 대규모 처리가 필요한 B2C 형 서비스에 적합합니다.

### 서비스
시스템을 구성하고 있는 컴포넌트들을 하나의 서비스라는 개념으로 정의하는데 이때 컴포넌트들은 데이터부터 비지니스로직까지 독립적으로 상호 컴포넌트들간에 의존성이 없는(수직적 분할) 상태로 RestAPI와 같은 표준 인터페이스를 통해 그 기능을 외부에 제공하며 API를 통해 타 서비스와 통신합니다. 데이터 저장시에는 중앙집중화된 하나의 통 데이터베이스를 사용하는 것이 아닌, 서비스가 API에서 부터 데이터베이스까지 분리되는 수직분할원칙에 따라 서비스 별로 별도의 데이터베이스를 사용합니다. 

### 장점
컴포넌트 별 의존성이 없기 때문에 독립적인 배포가 가능합니다. 다른 서비스 컴포넌트에 대한 의존성이 없이 서비스를 독립적으로 개발 및 배포 운영할 수 있습니다. 서비스 부분만 재 배포 하면 되기 때문에, 빠르고 전체 시스템의 영향도를 최소화한 수준에서 배포를 진행할 수 있습니다.

서비스 별로 독립된 배포 구조는 확장성에 있어서도 많은 장점을 가지고 오는데, 부하가 많은 특정 서비스에 대해서만 확장이 가능하여 조금 더 유연한 확장 모델을 가질 수 있습니다. 모노리틱 아키텍처의 경우에는 특정 서비스의 부하가 많아서 성능 확장이 필요할 때, 전체 서버의 수를 늘리거나 각 서버의 CPU 수를 늘려줘야 하지만, 마이크로 서비스 아키텍처의 경우에는 부하를 많이 받는 서비스 컴포넌트 만 확장을 해주면 됩니다. 즉, 확장성이 좋다. 여러 언어로 개발해도 문제가 되지 않습니다. 

- 서비스 별로 집중해서 독립적으로 개발할 수 있습니다.
- 서비스 별로 독립적이기 때문에 소스를 이해하고 수정 및 유지보수가 쉬워집니다.
- 서비스 별로 외부에는 API 만 노출되기 때문에 내부적으로는 어떻게 구성하든 상관없습니다. 따라서 각 서비스별 특성에 맞게 기술 스택을 결정할 수 있고, 새로운 기술을 적용할 수도 있습니다.
- 서비스 별로 독립적인 배포 및 확장이 가능합니다.
- 서비스 별로 특성에 맞는 리소스를 선택해 하드웨어를 구성할 수 있습니다.

### 단점
나누는 것이 무조건 좋은 것은 아닙니다. 보시면 아시겠지만 간단한 애플리케이션이라면 굳이 나눌 필요가 없습니다. 분산 환경이 되면서 서비스 간 통신, 분산 데이터 처리 등 없어도 될 일들을 만드는 꼴입니다. 다른 컴포넌트의 데이타를 API 통신을 통해서만 가지고 와야 하기 때문에 성능상 문제를 야기할 수 있고, 또한 이 기종 데이타 베이스간의 트렌젝션을 묶을 수 없는 문제점을 가지고 있습니다. (이 문제는 SOA때 부터 존재해왔음)

- 서비스를 나눠서 서비스 간 통신 방법이 필요합니다.
- 서비스를 나눠서 서비스간 호출이 모놀리스보다 복잡합니다.
- 서비스를 나눠서 데이터 중복이 발생할 수 있고 정합성을 보장하기 어렵습니다.
- 서비스를 나눠서 테스트가 어렵습니다.
- 서비스를 나눠서 특정 서비스가 실패하더라도 나머지 서비스는 유지되기 때문에 서비스가 실패했을 때를 고려해서 개발해야 합니다.
- 서비스를 나눠서 배포하는 것이 복잡합니다. 서비스 디스커버리(Service discovery)[2]가 필요하고 배포를 자동화하기가 쉽지 않습니다.

## APIGateway
마이크로 서비스 아키텍처 설계시 많이 언급되는 컴포넌트입니다. 프록시처럼 API들 앞에서 모든 API대한 end-point를 통합하고 추가적인 기능을 제공하는 미들웨어로 API 게이트웨이는 부하를 분산시키는 로드 밸런싱, 캐싱, API 미터링, 모니터링 등 다양한 기능을 합니다. SOA의 ESB(Enterprise Service Bus)의 경량화 버전입니다. 

* 미들웨어(middleware)는 응용 소프트웨어가 운영 체제로부터 제공받는 서비스 이외에 추가적으로 이용할 수 있는 서비스를 제공하는 컴퓨터 소프트웨어

### ESB(Enterprise Service Bus) vs APIGateway
SOA 프로젝트의 실패중의 하나가 ESB(Enterprise Service Bus)로 꼽히는 경우가 많은데, 이는 ESB를 Proxy나 Gateway처럼 가벼운 연산만이 아니라, 여러개의 서비스를 묶는 로직에 무겁게 사용했기 때문입니다. (사용하면 안된다는 것이 아니라 잘 사용해야 한다는 것이다.) ESB는 메세지를 내부적으로 XML로 변환하여 처리하는데, XML 처리는 생각하는것 보다 파싱에 대한 오버헤드가 매우 큽니다.  또한 ESB의 고유적인 버스나 게이트웨이로써의 특성이 아니라 타 시스템을 통합 하기 위한 EAI적인 역할을 ESB를 이용해서 구현함으로써 많은 실패 사례를 만들어 냇습니다. 그래서 종종 ESB는 Enterprise Service Bus가 아니라 EnterpriSe nightmare Bus로 불리기도 합니다. 

이러한 개념적인 문제를 해결하기 위해서 나온 제품군이 APIGateway라는 미들웨어 제품군들인데, ESB와 기본적인 특성은 유사하나 기능을 낮추고 EAI의 통합 기능을 제거하고 API 처리에만 집중한 제품군들로, 클라우드상에서 작동하는 PaaS (Platform As A Service)형태의 서비스로는 apigee.com이나 3scale.com 등이 있고, 설치형 제품으로는 상용 제품인 CA社의 Layer7이나 오픈소스인 Apache Service Mix, MuleSoft의 ESB 제품 그리고 WSO2의 API Platform 등이 있습니다.

APIGateway 부분에 마이크로 서비스 아키텍처의 다른 부분 보다 많은 부분을 할애한 이유는, 컴포넌트를 서비스화 하는 부분에 까지는 대부분 큰 문제가 없이 적응을 하지만 APIGateway의 도입 부분의 경우, 내부적인 많은 잡음이 날 수 있고, 또한 도입을 했더라도 잘못된 설계나 구현으로 인해서 실패 가능성이 비교적 높은 모듈이기 때문입니다. 마이크로 서비스 아키텍처의 핵심 컴포넌트이기도 하지만, 도입을 위해서는 팀의 상당 수준의 높은 기술적인 이해와 개발 능력을 필요로 합니다.

### 주요 기능
APIGateway가 마이크로 서비스 아키텍처 상에서 수행하는 주요 기능은 다음과 같습니다.

#### EndPoint 통합 및 토폴로지 정리
마이크로 서비스 아키텍처의 문제점 중의 하나는 각 서비스가 다른 서버에 분리 배포 되기 때문에, API의 End point즉, 서버의 URL이 각기 다르다는 것입니다. API를 사용하는 클라이언트에서 서버간의 통신이나, 서버간의 API 통신의 경우 p2p(Point to Point)형태로 토폴로지가 복잡해지고 거미줄 모양의 서비스 컴포넌트간의 호출 구조는 향후 관리의 문제를 일으킬 수 있습니다. 하나의 end point를 변경하였을 때, 제대로 관리가 되지 않을 경우가 있습니다. 이러한 토폴로지상의 문제점을 해결하기 위해서 중앙에 서비스 버스와 같은 역할을 하는 채널을 배치 시켜서, 전체 토폴로지를 p2p에서 hub & spoke 방식으로 변환 시켜서, 서비스간 호출을 단순화 시킬 수 있습니다.

#### 오케스트래이션(Orchestration)
여러개의 서비스를 묶어서 하나의 새로운 서비스를 만드는 개념입니다. 이는 마이크로 서비스 아키텍처가 서비스 자체가 작은 덩어리(fine grained) 형태로 잘게 쪼게졌기 때문에 가능한 일인데, 사실 오케스트레이션을 APIGateway 계층에서 하는 것은 gateway 입장에서 부담이 되는 일입니다. 실제로 과거의 SOA 시절에 많은 ESB(Enterprise Service Bus) 프로젝트가 실패한 원인 중의 하나가 과도한 오케스트레이션 로직을 넣어서 전체적인 성능 문제를 유발한 경우가 많았습니다. 그래서 오케스트레이션 서비스의 활용은 마이크로 서비스 아키텍처에 대한 높은 이해와 APIGateway 자체에 대한 높은 수준의 기술적인 이해를 필요로 합니다.

실제로 넷플릭스의 경우 마이크로 서비스 아키텍처를 사용하면서, 여러개의 서비스들을 gateway 계층을 통해서 오케스트레이션 하는 모델을 사용하고 있습니다. 

#### 공통 기능 처리 (Cross cutting function handling)
또한 API에 대한 인증 (Authentication)이나, Logging과 같은 공통 기능에 대해서 서비스 컴포넌트 별로 중복 개발해야 하는 비효율성을 유발할 수 있습니다. APIGateway에서 이러한 공통 기능을 처리하기 되면, api 자체는 비지니스 로직에만 집중을 하여 개발에 있어서의 중복등을 방지 할 수 있습니다.

#### mediation(중재)
이외에도 XML이나 네이티브 메세지 포맷을 json등으로 상호 변환해주는 message transformation 기능이나, 프로토콜을 변환하는 기능, 서비스간의 메세지를 라우팅해주는 기능등 여러가지 고급 mediation 기능을 제공을 하지만, APIGateway를 최대한 가볍게 가져간다는 설계 원칙 아래서 가급 적이면 고급적인 mediation 기능을 사용할 때는 높은 수준의 설계와 기술적인 노하우를 동반해야 합니다.

### Conway’s Law (컨웨이의 법칙)
마이크로 서비스 아키텍처의 흥미로운 점중의 하나는 아키텍처 스타일의 조직 구조나 팀 운영 방식에 영향을 준다는 것인데, 마이크로 서비스 아키텍처는 컨웨이의 법칙에 근간을 두고 있습니다.

컨웨이의 법칙은
> "모든 시스템은 그 조직의 의사소통 구조와 동일하게 만들어진다."
> "소프트웨어의 구조는 그 소프트웨어를 만드는 조직의 구조와 일치한다"
라는 이론입니다.

마이크로 서비스 아키텍처는 각 컴포넌트를 팀에 배치해서 책임지고 개발하는 것을 근간으로 하며, 팀간의 의존성을 제거해서 각 팀이 컴포넌트 개발을 독립적으로할 수 있는 구조로 잡혀있습니다.


## 마이크로 서비스 아키텍처의 문제점
마이크로 서비스 아키텍처의 경우 성능, 메모리, 테스팅, 트랜잭션 처리등의 문제점이 있습니다.

### 성능
서비스간의 호출을 API통신으로 주고 받는 메세지들이 네트워크를 통해서 전송되기 때문에 그만한 시간이 더 추가로 소요됩니다. 이는 비동기패턴이나 캐쉬 등을 이용해 해결합니다. 

### 메모리
각 서비스를 독립된 서버에 분할 배치하기 때문에, 중복되는 모듈에 대해서 그만큼 메모리 사용량이 늘어납니다. 서비스 애플리케이션을 기동하거나 운영할때 메모리가 필요합니다. 가용 메모리 용량을 늘려 해결 가능합니다. 

### 테스팅
서비스들이 각각 분리가 되어 있고, 다른 서비스에 대한 종속성을 가지고 있기 때문에, 특정 사용자 시나리오나 기능을 테스트하고자 할 경우 여러 서비스에 걸처서 테스트를 진행해야 하기 때문에 테스트 환경 구축이나 문제 발생시 분리된 여러개의 시스템을 동시에 봐야 하기 때문에 테스팅의 복잡도가 올라갑니다.

### 운영
운영 관점에서는 서비스 별로 서로 다른 기술을 사용할 수 있으며, 시스템이 아주 잘게 서비스 단위로 쪼게 지기 때문에 운영을 해야할 대상 시스템의 개수가 늘어나고, 필요한 기술의 수도 늘어나게 됩니다.

### 서비스간 트렌젝션 처리
구현상의 가장 어려운 점중의 하나가, 트렌젝션 처리입니다. 모노리틱 아키텍처에서는 RDBMS를 사용하면서 하나의 애플리케이션 내에서 트렌젝션이 문제가 있으면 쉽게 데이타베이스의 기능을 이용해서 rollback을 할 수 있었습니다. 여러개의 데이타베이스를 사용하더라도, 분산 트렌젝션을 지원하는 트렌젝션 코디네이터 (JTS – Java Transaction Service)등을 이용해서 쉽게 구현이 가능했는데, API 기반의 여러 서비스를 하나의 트렌젝션으로 묶는 것은 불가능합니다. 사실 이 문제는 마이크로 서비스 아키텍처 이전에도, 서비스와 API를 기본 컨셉으로 하는 SOA에도 있었던 문제입니다.

이러한 문제를 해결하기 위해서 몇가지 방안이 있는데, 그 첫번째 방법으로는 아예 애플리케이션 디자인 단계에서 여러개의 API를 하나의 트렌젝션으로 묶는 분산 트렌젝션 시나리오 자체를 없애는 방안입니다. 트랜잭션 보장이 중요한 엔터프라이즈 시스템(금융이나 제조)에는 모노리틱 아키텍처로 접근하는 것이 낫습니다. 


## 마이크로서비스가 애플리케이션 통합에 가져오는 변화
마이크로서비스 아키텍처가 정상 애플리케이션처럼 작동하도록 하려면 서비스가 지속적으로 메시지를 보내 다른 서비스로부터 데이터를 요청해야 합니다. 애플리케이션에 서비스 메쉬 레이어를 구축하면 서비스 간 커뮤니케이션을 간소화할 수 있지만 마이크로서비스 아키텍처는 레거시 애플리케이션 및 다른 데이터 소스와 통합해야 할 수도 있습니다.

아키텍처가 분산되어 있고 통합은 엔터프라이즈 서비스 버스(Enterprise Service Bus, ESB)와 같은 중앙화된 기술을 관리하는 중앙집중식 팀에 의존하는 경우 마이크로서비스를 위한 비즈니스 목표는 무색해질 수 있습니다.

애자일 통합은 리소스를 연결하는 접근 방식으로, 통합 기술, 애자일 제공 기술 및 클라우드 네이티브 플랫폼을 결합하여 소프트웨어 제공 속도를 높이고 보안을 강화합니다.


## SOA vs MSA
표면적으로 마이크로서비스 아키텍처 패턴과 SOA 와 유사하게 보입니다. SOA 또한 애플리케이션을 서비스로 나눈다는 점에서 비슷합니다. 여기서 관건은 나뉜 서비스들을 어떻게 연결할 것이냐는 겁니다. 먼저 SOA 는 애플리케이션을 서비스로 나눈 후 ESB(Enterprise Service Bus)라는 미들웨어에서 연결하고 조립해서 만들어내는 아키텍처입니다.

SOA의 실패에는 ESB 가 큰 역할을 했습니다. SOA의 인기에 힘입어 벤더들이 파는 다양한 솔루션과 장비들로 인해 SOA를 구성하는 것이 어려워지고, 인기가 식어감에 따라 SOA는 더 이상 발전하지 못했습니다. 하지만 마이크로서비스는 중앙집중적인 ESB 대신 REST API 또는 경량화된 메시징을 이용해서 각 서비스 중심으로 처리합니다.

엔터프라이즈 IT 업계에서 시작된 SOA 의 개념은 근래의 대형 인터넷 업체들을 중심으로 이어져 서비스와 API 기반의 MSA 로 정립되었습니다. 구축된 API 는 외부로 오픈해서 다른 서비스와 함께 더 큰 가치를 만들거나 판매할 수도 있습니다.

## 정리
마이크로서비스란 소프트웨어를 구축하기 위한 아키텍처이자 하나의 접근 방식으로, 애플리케이션을 상호 독립적인 최소 구성 요소로 분할합니다. 모든 요소를 하나의 애플리케이션에 구축하는 전통적인 모놀리식 접근 방식 대신 마이크로서비스에서는 모든 요소가 독립적이며 연동되어 동일한 태스크를 완수합니다. 이러한 각각의 구성 요소 또는 프로세스가 마이크로서비스입니다. 소프트웨어 개발에 대한 이러한 접근 방식은 세분화, 경량화되어 있으며 다수의 애플리케이션 간에 유사한 프로세스를 공유하는 기능을 중시합니다. 이는 클라우드 네이티브 모델 구현을 위해 애플리케이션 개발을 최적화하는 데 필요한 주요 구성 요소입니다.

전통적인 애플리케이션 구축 방식에서는 모놀리식(Monolithic)에 초점을 맞췄으며 애플리케이션에서 구축 가능한 모든 부분이 하나의 애플리케이션에 포함되어 있었습니다. 이 방식의 단점은 애플리케이션이 커질수록 새로운 문제를 해결하고 새로운 기능을 추가하는 것이 어려워진다는 점이었습니다. 마이크로서비스 기반 애플리케이션 구축 방법은 이러한 문제를 해결하고 개발 및 대응 속도를 높입니다.

모놀리식 애플리케이션에 비해 마이크로서비스는 보다 손쉽게 구축, 테스트, 배포, 업데이트할 수 있습니다. 



----
해당 내용은 다음 글을 참고 하였습니다.
- https://bcho.tistory.com/948
- https://www.redhat.com/ko/topics/microservices/what-are-microservices
- https://futurecreator.github.io/2018/09/14/what-is-microservices-architecture/