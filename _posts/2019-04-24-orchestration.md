---
layout: post
title: 오케스트레이션 
tags:
 - orchestration
comments: true
---

## 소개

## 용어 정리

오케스트레이션(Orchestration): 오케스트레이션이라는 뜻은 자원을 관리하고, 배치 및 정렬을 자동화 한다는 뜻입니다. 클라우드 컴퓨팅 서비스에서 인스턴스를 하나 생성하기 위해서는 여러 과정이 필요합니다. 인증 키를 발급 받아야 하고, 네트워크가 생성되었는지 확인해야 하며, 보안 룰도 미리 생성해 두어야 합니다. 이런 일련의 과정이 끝나야만 인스턴스를 하나 생성할 수 있습니다. 오케스트레이션은 이런 일련의 과정을 자동화하여 쉽게 인프라를 배포할 수 있도록 지원하는 템플릿 기반의 엔진입니다. 오케스트레이션에서 사용되는 템플릿 언어는 인프라뿐만 아니라 서비스 및 응용 프로그램의 전체 프로비저닝을 자동화하고, 컴퓨팅, 스토리지 및 네트워킹 구성뿐만 아니라 배포 후 작업을 지정할 수 있습니다. 텔레미터 서비스와의 통합을 통해, 오케스트레이션 엔진은 특정 인프라 요소의 자동 스케일링을 수행 할 수 있습니다.

컨테이너 오케스트레이션(Orchestration): 일반적으로 애플리케이션은 의도에 따라 애플리케이션이 실행되게 하기 위해 네트워킹 수준에서 정리가 필요한 개별적으로 컨테이너화된 구성 요소(주로 마이크로 서비스로 칭함)로 구성됩니다. 이러한 방식으로 다수의 컨테이너를 정리하는 과정이 컨테이너 오케스트레이션이라고 알려져 있습니다. 컨테이너 오케스트레이션 정의는 오늘날의 개발에서, 애플리케이션은 더 이상 하나의 통일체가 아니라 특정 애플리케이션이 설계 의도대로 기능하도록 함께 작동해야 하는 수십 또는 수백 개의 느슨하게 결합되고 컨테이너화된 요소로 구성됩니다. 컨테이너 오케스트레이션은 개별 구성 요소와 애플리케이션 계층의 작업을 정리하는 과정을 의미합니다. 컨테이너 오케스트레이션의 동작 방식 Apache Mesos, Google Kubernetes, Docker Swarm 등의 플랫폼들은 각자 컨테이너 관리를 위한 자체적인 특별한 방식을 보유하고 있지만, 사용자들은 컨테이너 오케스트레이션 엔진을 통해 컨테이너의 시작 및 중단 시점 제어, 클러스터로 그룹화, 애플리케이션을 구성하는 모든 과정을 관리할 수 있습니다. 사용자들은 컨테이너 오케스트레이션 툴을 통해 컨테이너 구축을 안내하고, 업데이트, 상태 모니터링, 장애 조치 절차를 자동화할 수 있습니다.

해당 내용은 다음 글을 참고 하였습니다.
http://blog.drakejin.me/Serverless-2/