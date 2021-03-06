---
layout: post
title: Http & Https
categories: Http
---

웹상에서 클라이언트와 서버 간에 요청/응답으로 정보를 주고 받을 수 있는 Http와 Https 프로토콜을 알아봅니다.

<hr />

<!-- vscode-markdown-toc -->

- [HTTP(HyperText Transfer Protocol) 프로토콜](<#http(hypertext-transfer-protocol)-프로토콜>)
- [HTTPS(Hypertext Transfer Protocol over Secure Socket Layer) 프로토콜](<#https(hypertext-transfer-protocol-over-secure-socket-layer)-프로토콜>)
  - [SSL? TLS?](#ssl?-tls?)
    - [TLS의 3단계 기본 절차](#tls의-3단계-기본-절차)
- [정리](#정리)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='http(hypertext-transfer-protocol)-프로토콜'></a>HTTP(HyperText Transfer Protocol) 프로토콜

웹상에서 클라이언트와 서버 간에 요청/응답으로 정보를 주고 받을 수 있는 프로토콜로 텍스트 교환을 담당합니다. 텍스트 교환을 할때에 특정 서버에 요청을 주고 받으며 수 많은 라우터와 스위치를 거치게 됩니다. 이때 문제가 있는데 그 과정을 중간에서 누군가가 우리의 패킷을 훔쳐 (Sniffing) 볼 수 있다는 것입니다. 패킷을 훔쳐 본다는 것은 결국 우리가 입력한 데이터, 예컨대 비밀번호와 같이 민감한 정보를 제 3자가 열람할 수 있다는 뜻이기 때문에 이를 미연에 방지하기 위한 많은 방법들이 연구되어 왔습니다. 네트워크 데이터가 암호화된다면, 중간에 공격자가 패킷을 열람하더라도 데이터가 유출되는 것을 막을 수 있습니다. HTTP의 기본 TCP/IP포트는 80입니다.

- 동작순서: TCP -> HTTP

## <a name='https(hypertext-transfer-protocol-over-secure-socket-layer)-프로토콜'></a>HTTPS(Hypertext Transfer Protocol over Secure Socket Layer) 프로토콜

HTTPS는 인터넷 상에서 정보를 암호화하는 추가 프로토콜(SSL 또는 TLS)을 이용하여 웹브라우저(클라이언트)와 서버가 데이터를 주고 받는 통신 규약입니다. 웹 통신 프로토콜인 HTTP의 보안이 강화된 버전으로 HTTPS는 소켓 통신에서 일반 텍스트를 이용하는 대신에, SSL(Secure Socket Layer)이나 TLS(Transport Layer Security) 프로토콜을 통해 세션 데이터를 암호화합니다. 따라서 데이터의 적절한 보호를 보장할 수 있습니다. HTTPS의 기본 TCP/IP포트는 443입니다. 암호화에 따른 속도저하 때문에 모든 사이트가 https를 사용하지는 않습니다. 그렇지만 사용하는게 보안에 좋겠지요?

- 동작순서: TCP -> TLS/SSL -> HTTP

HTTPS는 웹사이트를 SSL/TLS 인증서로 보안하는 경우 URL 창에 표시됩니다. 사용자는 브라우저 바의 잠금 기호를 클릭하여 인증서 발행, 웹사이트 소유 기업명을 포함한 인증서의 세부 내용을 확인할 수 있습니다.

참고) SSL/TLS는 오늘날 가장 널리 쓰이고 있는 암호화 방식으로 SSL/TLS1 를 사용하며 이 방식은 '인증서' 라고 하는 일종의 서명을 사용합니다.

### <a name='ssl?-tls?'></a>SSL? TLS?

전송 계층 보안(영어: Transport Layer Security, TLS, 과거 명칭: 보안 소켓 레이어/Secure Sockets Layer, SSL)는 컴퓨터 네트워크에 통신 보안을 제공하기 위해 설계된 암호 규약입니다. 그리고 '트랜스포트 레이어 보안'이라는 이름은 '보안 소켓 레이어'가 표준화 되면서 바뀐 이름입니다. 이 규약은 인터넷 같이 TCP/IP 네트워크를 사용하는 통신에 적용되며, 통신 과정에서 전송계층 종단간 보안과 데이터 무결성을 확보해준다. 이 규약은 웹 브라우징, 전자 메일, 인스턴트 메신저, voice-over-IP (VoIP) 같은 응용 부분에 적용되고 있습니다.

- 암호화: 교환되는 데이터를 암호화하여 침입자로부터 보호합니다. 즉, 사용자가 웹사이트를 탐색하는 동안 아무도 대화를 '엿들을' 수 없고 페이지에서 활동을 추적할 수 없으며 정보를 도용할 수 없습니다.
- 데이터 무결성: 데이터가 전송되는 동안 의도적이든 그렇지 않든 모르는 사이에 데이터가 변경되거나 손상되는 일을 방지합니다.
- 인증: 사용자가 의도된 웹사이트와 통신 중임을 입증합니다. 중간자 공격을 차단하고 사용자의 신뢰를 구축하게 되어 다른 비즈니스 이점으로 이어지게 됩니다.

https이외에 FTP (FTPS), TELNET, SMTP, SIP, POP, IMAP 등 에서 사용 가능하며 주로, 웹 브라우저와 웹 서버 사이의 안전한 보안 채널을 제공하기 위해 많이 사용됩니다.

#### <a name='tls의-3단계-기본-절차'></a>TLS의 3단계 기본 절차

TLS는 클라이언트/서버 응용 프로그램이 네트워크로 통신을 하는 과정에서 도청, 간섭, 위조를 방지하기 위해서 설계되었습니다. 그리고 암호화를 해서 최종단의 인증, 통신 기밀성을 유지시켜줍니다.

TLS의 3단계 기본 절차:

- 지원 가능한 알고리즘 서로 교환
- 키 교환, 인증
- 대칭키 암호로 암호화하고 메시지 인증

공개키암호화 방식을 통해 데이터를 암호화하므로 HTTPS를 지원하는 서버에 요청(Request)을 하려면 공개키가 필요하다는 것을 알 수 있습니다. 그 공개키는 공개키 저장소(CA:Certificate Authority)에 있다. SSL프로토콜의 사용 목적은 두가지! 데이터암호화와 신원확인 용도로 사용됩니다.

참고) CA? 웹서버의 신뢰성을 보증해주는 기관을 CA(Certificate Authority) 혹은 Root Certificate라고 말한다. 신뢰성이 중요하기에 공인된 기업들만 참여할 수 있다.

## <a name='정리'></a>정리

https 란 인터넷 상에서 정보를 암호화하는 SSL(Secure Socket Layer) 프로토콜을 이용하여 데이터를 전송하고 있다는 것을 의미합니다. http에서 https로 보낼때 서버 측 301 HTTP 리디렉션(영구이동)을 사용하여 HTTPS 페이지나 리소스로 사용자와 검색 엔진을 리디렉션합니다.

- SSL(Secure Socket Layer): 이전 명칭 / 보안 소켓 레이어
- TLS(Transport Layer Security): 표준화 명칙 / 전송 계층 보안

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developers.google.com/search/docs/advanced/security/https?hl=ko&visit_id=637407811992842884-3448721797&rd=1
- https://ko.wikipedia.org/wiki/%EC%A0%84%EC%86%A1_%EA%B3%84%EC%B8%B5_%EB%B3%B4%EC%95%88
