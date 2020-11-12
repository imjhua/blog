---
layout: post
title: HTTP 엄격한 전송 보안 (HSTS)
categories: Http
---

Https프로토콜을 공부해보았다면 한번쯤은 들어봤을 HSTS!

## HTTP Strict Transport Security(HSTS) 란?

보안프로토콜을 사용하게 하기 위하여 서버에서는 HTTPS 를 강제할 수 있습니다. http로 접근시 서버측에서 302 Redirect 를 이용하여 https로 전환시켜 주는데, 이게 취약점일 수 있기때문에 클라이언트(브라우저)에게도 강제하는 것을 권장하며 이를 HTTP Strict Transport Security(HSTS)라고 합니다. 서버가 아닌 클라이언트에서 바로 차단되는 장점이 있습니다.

HSTS 기능을 사용하려면, Web Server 및 Web Browser 둘 다 기능을 지원해야 합니다. HSTS 기능을 지원하는 Web Server 를 HSTS enabled Server 라고 부릅니다.

### 크롬브라우저에서 적용하기

아래에서 HSTS 를 적용 할 도메인을 직접 추가/삭제하거나 쿼리하여 내용을 조회 할 수 있습니다.

```
chrome://net-internals/#hsts
```

참고) 2010년 이후에 출시된 대부분의 Web Browser 버전에서는 HSTS 기능을 지원하고 있습니다.

### 동작

사용자가 Web Browser 주소창에 도메인 이름을 입력하면(또는 실수로 “http://” 를 사용하여 URL 주소를 입력하면), 또는 Link된 URL 주소를 클릭하면, 도메인 주소만 추출하여, HSTS List에 있는 지, 확인하여, 있으면(정확히 기술하면, 도메인 이름에 HSTS가 설정되어 있으면), HTTPS Protocol을 사용하여 접속하게 됩니다.

### HSTS를 사용하는 이유

만약 해커와 같은 공격자가, 중간자공격(MITM attack)을 하여, 중간에 Proxy Server를 두고, 사용자와는 HTTP 통신을 하고, 실제 Site 와는 HTTPS 통신을 해도, 사용자는 전혀 인식을 하지 못하게 됩니다. 즉 사용자가 실제 Site 와 주고 받는 모든 정보는 공격자에게 노출이 되게 됩니다. 이러한 공격을 “SSL Stripping” 공격(attack)이라고 부르며, 이러한 공격을 방지하기 위하여 HSTS 기능을 사용합니다. SSL Stripping은 SSL/TLS Hijacking이라고도 부릅니다.

즉 사용자가 실수로 HTTPS Protocol을 지원하는 Site를, HTTP Protocol로 접속 했을 때, 중간자 공격에 의해, HTTP Protocol을 사용한 통신을 하게 되고, 이로 인해 통신 정보가 공격자에게 노출이 되는 것을 방지하고자 하는 목적입니다. 또한 cookie hijacking을 방지하는 용도로도 사용된다고 합니다.

## 정리

HSTS (HTTP Strict Transport Security)는 Web Site에 접속할 때, 강제적으로 HTTPS Protocol로만 접속하게 하는 기능입니다. 보안을 강화시킬 목적으로, Web Browser에게 HTTPS Protocol만 사용하도록 강제하는 기능입니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security
- https://rsec.kr/?p=315
- https://m.blog.naver.com/PostView.nhn?blogId=aepkoreanet&logNo=221575708943&proxyReferer=https:%2F%2Fwww.google.com%2F
