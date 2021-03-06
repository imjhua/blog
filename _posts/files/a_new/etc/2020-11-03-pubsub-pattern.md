---
layout: post
title: Pub-Sub 패턴
categories: Programming
---

Pub/Sub는 이벤트를 처리하는 서비스에서 이벤트를 생성하는 서비스를 분리하는 비동기 메시징 서비스입니다.

<hr />

<!-- vscode-markdown-toc -->

- [Publish(Pub)](<#publish(pub)>)
- [Subscribe(Sub)](<#subscribe(sub)>)
- [장점과 단점](#장점과-단점)
  - [장점](#장점)
  - [단점](#단점)
- [사용](#사용)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='publish(pub)'></a>Publish(Pub)

메시지를 보냅니다.
내고 (Publish : 발행) 받는 (Subscribe : 구독) 형태의 통신

## <a name='subscribe(sub)'></a>Subscribe(Sub)

메시지를 받습니다. 메시지를 받고 싶다면 해당 Pub을 구독합니다.

## <a name='장점과-단점'></a>장점과 단점

### <a name='장점'></a>장점

발행자와 구독자의 디커플링(의존성 없음)은 더 다이나믹한 네트워크 토폴로지와 높은 확장성을 허용합니다.

### <a name='단점'></a>단점

Pub은 메시지를 보내고 Sub이 받는지 받지 않는지 알지 못합니다. 메시지를 받았다 혹은 메시지를 보냈다는것을 보장 할 수 없습니다.

## <a name='사용'></a>사용

- 네트워크 클러스터 간의 워크로드 균형 조정. 대규모 작업 큐를 여러 작업자 간에 효율적으로 분배
- 비동기 워크플로 구현. 예: 주문 처리 애플리케이션이 주제를 주문하고 한 명 이상의 작업자가 주문을 처리합니다.
- 이벤트 알림 배포. 특정 이벤트가 발생할 때 마다 알림을 전송하고, 다운스트림 서비스는 이벤트 알림 수신을 구독한다.
- 분산 캐시 갱신. 예로 애플리케이션이 무효화 이벤트를 게시해, 변경된 객체의 ID를 업데이트한다.
- 여러 시스템에 로깅. 시스템 모니터링, 향후 쿼리용 데이터베이스 등에 대한 로그 기록
- 다양한 프로세스 또는 기기에서 데이터 스트리밍.
- 안정성 개선. 공통 주제를 구독하여 추가 영역에서 작동함으로써 특정 영역이나 리전에서 발생하는 오류를 복구한다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://cloud.google.com/pubsub/docs/overview
