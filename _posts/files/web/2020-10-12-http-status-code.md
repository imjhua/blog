---
layout: post
title: Http Status Code
categories: Web
---

HTTP상태코드를 정리합니다.

<hr />

<!-- vscode-markdown-toc -->

- [정보(100~)](<#정보(100~)>)
  - [100 Continue](#100-continue)
- [성공(200~)](<#성공(200~)>)
  - [200 OK](#200-ok)
- [이동(300~)](<#이동(300~)>)
  - [301 Moved Permanently(영구적)](<#301-moved-permanently(영구적)>)
  - [302 Found(임시)](<#302-found(임시)>)
  - [304 Not Modified(캐시목적)](<#304-not-modified(캐시목적)>)
- [클라이언트에러(400~)](<#클라이언트에러(400~)>)
  - [400 Bad Request](#400-bad-request)
  - [401 Unauthorized](#401-unauthorized)
  - [403 Forbidden](#403-forbidden)
  - [404 Not Found](#404-not-found)
  - [405 Method Not Allowed](#405-method-not-allowed)
  - [408 Request Timeout](#408-request-timeout)
  - [409 Conflict](#409-conflict)
- [서버에러(500~)](<#서버에러(500~)>)
  - [500 Internal Server Error](#500-internal-server-error)
  - [501 Not Implemented](#501-not-implemented)
  - [502 Bad Gateway](#502-bad-gateway)
  - [503 Service Unavailable](#503-service-unavailable)
  - [504 Gateway Timeout](#504-gateway-timeout)
- [정리](#정리)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='정보(100~)'></a>정보(100~)

### <a name='100-continue'></a>100 Continue

요청의 시작 부분 일부가 받아들여졌으며, 클라이언트는 나머지를 계속 이어서 보내야 함을 의미합니다. 클라이언트가 엔터티를 서버에게 보내려고 하고, 100 continue 응답을 기다리겠다면, 클라는 Expect: 100-continue 요청 헤더를 보내야합니다.

## <a name='성공(200~)'></a>성공(200~)

### <a name='200-ok'></a>200 OK

요청이 성공적으로 되었습니다. 성공의 의미는 HTTP 메소드에 따라 달라집니다

- GET: 리소스를 불러와서 메시지 바디에 전송되었습니다.
- HEAD: 개체 해더가 메시지 바디에 있습니다.
- PUT 또는 POST: 수행 결과에 대한 리소스가 메시지 바디에 전송되었습니다.
- TRACE: 메시지 바디는 서버에서 수신한 요청 메시지를 포함하고 있습니다.

## <a name='이동(300~)'></a>이동(300~)

### <a name='301-moved-permanently(영구적)'></a>301 Moved Permanently(영구적)

이 응답 코드는 요청한 리소스의 URI가 변경되었음을 의미합니다. 새로운 URI가 응답에서 아마도 주어질 수 있습니다.

### <a name='302-found(임시)'></a>302 Found(임시)

이 응답 코드는 요청한 리소스의 URI가 일시적으로 변경되었음을 의미합니다. 새롭게 변경된 URI는 나중에 만들어질 수 있습니다. 그러므로, 클라이언트는 향후의 요청도 반드시 동일한 URI로 해야합니다.

### <a name='304-not-modified(캐시목적)'></a>304 Not Modified(캐시목적)

이것은 캐시를 목적으로 사용됩니다. 이것은 클라이언트에게 응답이 수정되지 않았음을 알려주며, 그러므로 클라이언트는 계속해서 응답의 캐시된 버전을 사용할 수 있습니다.

## <a name='클라이언트에러(400~)'></a>클라이언트에러(400~)

### <a name='400-bad-request'></a>400 Bad Request

이 응답은 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없음을 의미합니다.

### <a name='401-unauthorized'></a>401 Unauthorized

비록 HTTP 표준에서는 "미승인(unauthorized)"를 명확히 하고 있지만, 의미상 이 응답은 "비인증(unauthenticated)"을 의미합니다. 클라이언트는 요청한 응답을 받기 위해서는 반드시 스스로를 인증해야 합니다.

### <a name='403-forbidden'></a>403 Forbidden

클라이언트는 콘텐츠에 접근할 권리를 가지고 있지 않습니다. 예를들어 그들은 미승인이어서 서버는 거절을 위한 적절한 응답을 보냅니다. 401과 다른 점은 서버가 클라이언트가 누구인지 알고 있습니다.

### <a name='404-not-found'></a>404 Not Found

서버는 요청받은 리소스를 찾을 수 없습니다. 브라우저에서는 알려지지 않은 URL을 의미합니다. 이것은 API에서 종점은 적절하지만 리소스 자체는 존재하지 않음을 의미할 수도 있습니다. 서버들은 인증받지 않은 클라이언트로부터 리소스를 숨기기 위하여 이 응답을 403 대신에 전송할 수도 있습니다. 이 응답 코드는 웹에서 반복적으로 발생하기 때문에 가장 유명할지도 모릅니다.

### <a name='405-method-not-allowed'></a>405 Method Not Allowed

요청한 메소드는 서버에서 알고 있지만, 제거되었고 사용할 수 없습니다. 예를 들어, 어떤 API에서 리소스를 삭제하는 것을 금지할 수 있습니다. 필수적인 메소드인 GET과 HEAD는 제거될 수 없으며 이 에러 코드를 리턴할 수 없습니다.

### <a name='408-request-timeout'></a>408 Request Timeout

이 응답은 요청을 한지 시간이 오래된 연결에 일부 서버가 전송하며, 어떨 때에는 이전에 클라이언트로부터 어떠한 요청이 없었다고 하더라도 보내지기도 합니다. 이것은 서버가 사용되지 않는 연결을 끊고 싶어한다는 것을 의미합니다. 이 응답은 특정 몇몇 브라우저에서 빈번하게 보이는데, Chrome, Firefox 27+, 또는 IE9와 같은 웹서핑 속도를 올리기 위해 HTTP 사전 연결 메카니즘을 사용하는 브라우저들이 해당됩니다. 또한 일부 서버는 이 메시지를 보내지 않고 연결을 끊어버리기도 합니다.

### <a name='409-conflict'></a>409 Conflict

이 응답은 요청이 현재 서버의 상태와 충돌될 때 보냅니다.

## <a name='서버에러(500~)'></a>서버에러(500~)

### <a name='500-internal-server-error'></a>500 Internal Server Error

서버가 처리 방법을 모르는 상황이 발생했습니다. 서버는 아직 처리 방법을 알 수 없습니다.

### <a name='501-not-implemented'></a>501 Not Implemented

요청 방법은 서버에서 지원되지 않으므로 처리할 수 없습니다. 서버가 지원해야 하는 유일한 방법은 GET와 HEAD이다. 이 코드는 반환하면 안됩니다.

### <a name='502-bad-gateway'></a>502 Bad Gateway

이 오류 응답은 서버가 요청을 처리하는 데 필요한 응답을 얻기 위해 게이트웨이로 작업하는 동안 잘못된 응답을 수신했음을 의미합니다.

### <a name='503-service-unavailable'></a>503 Service Unavailable

서버가 요청을 처리할 준비가 되지 않았습니다. 일반적인 원인은 유지보수를 위해 작동이 중단되거나 과부하가 걸렸을 때 입니다. 이 응답과 함께 문제를 설명하는 사용자 친화적인 페이지가 전송되어야 한다는 점에 유의하십시오. 이 응답은 임시 조건에 사용되어야 하며, Retry-After: HTTP 헤더는 가능하면 서비스를 복구하기 전 예상 시간을 포함해야 합니다. 웹마스터는 또한 이러한 일시적인 조건 응답을 캐시하지 않아야 하므로 이 응답과 함께 전송되는 캐싱 관련 헤더에 대해서도 주의해야 합니다.

### <a name='504-gateway-timeout'></a>504 Gateway Timeout

서버가 게이트웨이(gateway) 혹은 프록시(proxy)의 역할을 하는 동안 시간 안에 업스트림 서버(upstream server)로부터 요청을 마치기 위해 필요한 응답를 받지 못 했음을 나타냅니다.

## <a name='정리'></a>정리

- 100 Continue

- 200 OK

- 301 Moved Permanently(영구이동): 308에러코드와 동일. URL변경으로 리디렉션을 할 때 사용
- 302 Found(임시이동): 307에러코드와 동일
- 304 Not Modified: 캐시목적

- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 405 Method Not Allowed
- 408 Request Timeout
- 409 Conflict

- 500 Internal Server Error
- 501 Not Implemented
- 502 Bad Gateway
- 503 Service Unavailable

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Web/HTTP/Status
- https://developer.mozilla.org/ko/docs/Web/HTTP/Status
