---
layout: post
title: HTTP 메소드 정리
categories: Http
---

HTTP에 사용되는 메소드를 정리합니다.

## HTTP 메소드 정리

## GET

요청받은 URI의 정보를 검색하여 응답합니다.

```
GET [request-uri]?key=value HTTP/1.1
Host:[Hostname] 혹은 [IP]
```

## HEAD

GET방식과 동일하지만, 응답에 BODY가 없고 응답코드와 HEAD만 응답합니다. 웹서버 정보확인, 헬스체크, 버젼확인, 최종 수정일자 확인등의 용도로 사용합니다.

```
HEAD [request-uri] HTTP/1.1
Host:[Hostname] 혹은 [IP]
```

## POST

요청된 자원을 생성(CREATE)합니다.

```
POST [request-uri] HTTP/1.1
Host:[Hostname] 혹은 [IP]
Content-Lenght:[Length in Bytes]
Content-Type:[Content Type]
[데이터]
```

## PUT

요청된 자원을 수정(UPDATE)합니다.

```
PUT [request-uri] HTTP/1.1
Host:[Hostname] 혹은 [IP]
Content-Lenght:[Length in Bytes]
Content-Type:[Content Type]
[데이터]
```

## PATCH

PUT과 유사하게 요청된 자원을 수정(UPDATE)할 때 사용합니다. PUT의 경우 자원 전체를 갱신하는 의미지만, PATCH는 해당자원의 일부를 교체하는 의미로 사용합니다.

```
PATCH [request-uri] HTTP/1.1
Host:[Hostname] 혹은 [IP]
Content-Lenght:[Length in Bytes]
Content-Type:[Content Type]
[데이터]
```

## DELETE

요청된 자원을 삭제할 것을 요청합니다. 안전성 문제로 대부분의 서버에서 비활성화 하기도 합니다.

```
DELETE [request-uri] HTTP/1.1
Host:[Hostname] 혹은 [IP]
```

## CONNECT

동적으로 터널 모드를 교환를 교환하거나 프락시 기능을 요청시 사용합니다.

```
CONNECT [request-uri] HTTP/1.1
Host:[Hostname] 혹은 [IP]
```

## TRACE

클라이언트가 요청한 자원에 도달하기까지의 경로를 기록하는 루프백(loop back) 검사용도로 사용합니다. 클라이언트가 요청 자원에 도달하기 까지 거쳐가는 프록시나 게이트웨이의 중간 경로부터 최종 수진 서버까지의 경로를 알아낼수 있습니다. 

```
TRACE [request-uri] HTTP/ 1.1
Host: [Hostname] 혹은 [IP]
```

참고) 루프백(Loopback)은 전화시스템에서 네트웍 목적지로 보내지는 시험 신호를 말한다. 이것은 주로 전송이나 수송 기반 시설을 테스트하는 수단으로 사용된다.

## OPTIONS

웹서버에서 지원되는 메소드의 종류를 확인할 경우 사용합니다.

```
OPTIONS [request-uri] HTTP/ 1.1
Host: [Hostname] 혹은 [IP]
```

## post와 put의 차이

POST는 보통 자원생성(INSERT)의 개념으로 사용되고, PUT은 수정(UPDATE)입니다. POST는 멱등하지 않고(매번 달라짐) PUT은 멱등(동일한 결과값)합니다. 즉 동일한 자원을 여러번 POST 하면 서버자원에는 변화가 생기지만, 여러번 PUT하는 경우는 변화가 생기지 않습니다.

참고) 멱등하다는 것은 연산을 여러 번 적용하더라도 결과값이 달라지지 않는 것을 말한다.

## 정리

- head: 웹서버 정보확인, 헬스체크, 버젼확인, 최종 수정일자 확인등의 용도
- post: 자원 생성
- put: 전체 자원 수정
- patch: 일부 내용 교체
- trace: 루프백 호출을 위해 테스트용으로 사용
- options 지원되는 메소드 종류 확인

---

해당 내용은 다음 글을 참고 하였습니다.

- https://javaplant.tistory.com/18
- https://goddaehee.tistory.com/169