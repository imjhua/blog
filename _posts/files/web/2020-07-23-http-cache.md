---
layout: post
title: 요청과 응답의 Cache 설정
categories: Web
categories: TODO
---

https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=ko

HTTP 캐싱 확인 순서
- ETag로 캐시된 응답에 대한 유효성 검사 수행
- Cache-Control

서버가 응답을 반환할 때는 응답의 콘텐츠 유형, 길이, 캐싱 지시문, 유효성 검사 토큰 등을 설명하는 HTTP 헤더 모음도 방출합니다. 예를 들어, 위의 교환에서 서버는 1024바이트의 응답을 반환하고, 클라이언트에 최대 120초 동안 이를 캐시하도록 지시하고, 

!! 응답이 만료된 후 리소스가 수정되었는지 확인하는 데 사용할 수 있는 유효성 검사 토큰('x234dff')을 제공합니다.


예를 들면.. max-age=120
초기 가져오기를 수행한 이후 120초가 지났으며 브라우저가 동일한 리소스에 대해 새 요청을 실행했다고 가정해 봅시다. 우선, 브라우저는 로컬 캐시를 확인하고 이전 응답을 찾습니다. 불행히도 브라우저는 이전 응답이 이제 만료되었기 때문에 이를 사용할 수 없습니다. 이 시점에서 브라우저가 새 요청을 발송하고 전체 새 응답을 가져올 수 있습니다. 그러나 리소스가 변경되지 않은 경우 이미 캐시에 있는 동일한 정보를 다운로드할 이유가 없으므로 이 작업은 비효율적입니다.

!! 에러코드 304겠찌? ETag 헤더에 지정된 대로 유효성 검사 토큰은 바로 이 문제를 해결하기 위해 고안되었습니다. 서버는 일반적으로 파일 콘텐츠의 해시나 기타 몇 가지 디지털 지문인 임의 토큰을 생성하고 반환합니다. 클라이언트는 디지털 지문이 생성되는 방식에 대해 알 필요가 없고, 다음 요청 시 지문을 서버에 전송하기만 하면 됩니다. 디지털 지문이 여전히 동일한 경우 리소스가 변경되지 않고 이 다운로드를 건너뛸 수 있습니다.
ETag로 캐시된 응답에 대한 유효성 검사 수행


네트워크를 통해 무언가를 가져오는 작업은 느린 동시에 비용도 많이 듭니다. 크기가 큰 응답은 클라이언트와 서버 사이에 많은 왕복을 필요로 하므로, 응답을 사용할 수 있게 되어 브라우저가 처리할 수 있게 되는 시기가 지연되고 방문자에 대한 데이터 비용도 발생합니다. 따라서 이전에 가져온 리소스를 캐시했다가 재활용할 수 있는 기능은 성능 최적화에 있어 중요한 측면입니다.

좋은 소식은, 모든 브라우저에 HTTP 캐시 구현이 포함되어 있다는 것입니다. 여러분이 해야 할 일은 하나뿐입니다. 각 서버 응답이 올바른 HTTP 헤더 지시문을 제공하여 브라우저에 해당 브라우저가 응답을 캐시할 시점과 기간을 지시하는지 확인하기만 하면 됩니다.

참고: WebView를 사용하여 애플리케이션에서 웹 콘텐츠를 가져오고 표시하는 경우 추가 구성 플래그를 제공하여 HTTP 캐시가 활성화되고, 해당 크기가 활용 사례에 맞는 합당한 크기로 설정되고, 캐시가 지속되도록 해야 할 수 있습니다. 플랫폼 문서를 점검하여 설정을 확인하세요.





## pragma? IE? http/1.0 헤더?
..

## vary 헤더
..


## 캐시전략 / 캐시가 필요한 이유

- 리소스에 대한 만료시간을 주고받아야 한다
- 만료시간 전에는 리소스가 유효하다
- 만료시간 이후의 리소스는 신뢰 할 수 있다
- 캐시가 신뢰된 리소스에 대한 요청을 받을 경우, 아직 유효한가 아닌가를 검사하기위한 if none match와 함께 서버로 요청을 전송한다. 그렇다면 서버는 리소스본문을 전송하지 ㅏㄴ혹 304 수정되지 ㅇ낳음 헤더를 통해 대역폭을 절약한다.

웹 사이트와 애플리케이션의 성능은 이전에 가져온 리소스들을 재사용함으로써 현저하게 향상될 수 있습니다. 웹 캐시는 레이턴시와 네트워크 트래픽을 줄여주므로 리소스의 표현에 필요로 하는 시간을 줄여줍니다. HTTP 캐시 사용을 활용하여, 웹 사이트를 좀 더 잘 반응하도록 만들 수 있습니다.

클라이언트에 최대한 많은 응답을 최대한 길게 캐시하고 효율적인 유효성 재검사가 가능하도록 각 응답에 대한 유효성 검사 토큰을 제공해야 합니다.


## 프리플라이트 요청
예비요청. CORS프리플라잍 요청은 cors프로토콜이 이해되고, 서버가 특정 방법 및 헤더를 사용(인식)하는지 확인하는 cors 요청이다. 예를 들면 delete메소드를 허용하는지? 확인하는것.
예비요청을 통해 허용할 것인지 물어보고 서버가 내려준 allow-mehothds 헤더를 통해 확인 후 실제 요청을 날린다.


## http 조건부 요청
영향을 받는 리소스들을 검사기 값을 이용해 비교함으로써, HTTP는, 성공인 경우라도, 요청의 결과가 변경될 수 있는 조건부 요청의 컨셉을 가지고 있습니다. 그런 요청들은 캐시 컨텐츠와 쓸모없는 컨트롤 회피를 검증하고, 다운로드를 이어서 하거나 서버 상의 문서를 업로드 또는 수정할 때 수정된 내용을 잃지 않도록 할 때처럼, 문서의 무결성을 확증하는데 유용할 수 있습니다.

요청과 응답에서 사용되는 헤더(HTTP/ 1.1과 2)는 다음과 같이 구분됩니다.

RESPONSE: Last-Modified / Etag
REQUEST: If-Modified-Since / If-None-Match


### 응답헤더

```
// 허용하는 헤더
Access-Control-Allow-Headers: <header-name>[, <header-name>]*
Access-Control-Allow-Headers: *

// 허용하는 출처
Access-Control-Allow-Origin: *
Access-Control-Allow-Origin: <origin>
Access-Control-Allow-Origin: null

// preflight request에 한하여 응답헤더를 얼마나 유효하게 할지(얼마동안 캐시 할지, 결과를 캐시 할 수있는 최대 시간)
Access-Control-Max-Age
```

참고) Simple Request 조건에 해당하지 않으면 브라우저는 Preflight Request 방식으로 요청합니다. 따라서, Preflight Request는 GET, HEAD, POST 외의 다른 방식으로도 요청을 보낼 수 있고, application/xml 처럼 다른 Content-type으로 요청을 보낼 수도 있으며, 커스텀 헤더도 사용할 수 있습니다.

#### Access-Control-Allow-Origin(IE10)
*은 credential이 없는 요청들에만 허용가능 한 값. 브라우저 리소스에 접근하는 임의의 origin

#### Access-Control-Allow-Headers(IE10)
Access-Control-Allow-Headers 는 Access-Control-Request-Headers를 포함하는 preflight request의 응답에 사용되는 헤더로, 실제 요청때 사용할 수 있는 HTTP 헤더의 목록을 나열합니다.

*은 자격증명이 없는 요청(쿠키 혹은 HTTP인증이 아님)에서 사용. 가젹증명을 포함하는 경우 단순 *는 특별한 의미가 없는 헤더가 된다. 즉, Preflight reqeust 에 한하여 적용 가능.

참고) CORS 프리 플라이트 요청(Preflight reqeust)은 CORS 프로토콜이 이해되고 서버가 특정 방법 및 헤더를 사용 하는지 인식 하는지 확인 하는 CORS 요청입니다 .

## res(본문)

### Age 
Age 헤더는 캐시 응답 때 나타나는데, 요청 max-age 시간 내에서 얼마나 흘렀는지 초 단위로 알려줍니다. (캐싱 너의생명은 얼만큼 남았다의 지표)

### Expires
Cache-Control과 별개로 응답에 Expires라는 헤더를 줄 수도 있습니다. 응답 컨텐츠가 언제 만료되는지를 나타내며, 요청 Cache-Control의 max-age가 있는 경우 이 헤더는 무시됩니다.

Expires 헤더는 응답이 더 이상 신선하지 않다고 판단할 날짜/시간을 포함합니다. 0과 같은, 유효하지 않은 날짜는 과거의 시간을 나타내어 리소스가 이미 만료되었음을 의미합니다. 응답 내에 "max-age" 혹은 "s-max-age" 디렉티브를 지닌 Cache-Control 헤더가 존재할 경우, Expires 헤더는 무시됩니다.

참고) 요청에서의 Expires 정보가 ‘언제까지’를 설정하는 정보라면 max-age 정보는 클라이언트 시간과 관계없이 현재부터 며칠, 몇 년 등으로 지정할 수 있다.


#### ETag
HTTP 컨텐츠가 바뀌었는지를 검사할 수 있는 태그입니다. 같은 주소의 자원이더라도 컨텐츠가 달라졌다면 ETag가 다릅니다. 예를 하나 들어봅시다.



- Last-Modified	서버에서 저장하고 있는 마지막 수정 날짜. 


Access-Control-Max-Age응답 헤더 얼마나 (A)의 결과를 나타내는 플라이트 요청 (즉, 상기에 포함 된 정보이다 Access-Control-Allow-Methods하고 Access-Control-Allow-Headers캐시 할 수있는 헤더).


## 요청 헤더

```
// 요청 헤더
Access-Control-Request-Headers: <header-name>, <header-name>, ...

// 요청 메소드
Access-Control-Request-Method: <method>
```

req(브라우저)
- If-Modified-Since	브라우저에서 저장하고 있는 마지막 수정 날짜

그외
- Expires	만료 날짜. 언제까지 유효한지 미리 지정해 놓은 시간 정보로, 특정 날짜까지는 사용할 수 있다는 정보. 
- Cache-Control:	Expires 정보의 한계를 극복하려고 HTTP/1.1에서 소개된 캐시 설정 추가 정보

## Cache-Control 
일반 헤더 필드는 요청과 응답 내의 캐싱 메커니즘을 위한 디렉티브를 정하기 위해 사용됩니다. 캐싱 디렉티브는 단방향성이며, 이는 요청 내에 주어진 디렉티브가 응답 내에 주어진 디렉티브와 동일하다는 것을 뜻하지는 않는다는 것을 의미합니다.

캐시 요청 디렉티브
HTTP 요청 내에서 클라이언트에 의해 사용될 수 있는 표준 Cache-Control 디렉티브.

Cache-Control: max-age=<seconds>
Cache-Control: max-stale[=<seconds>]
Cache-Control: min-fresh=<seconds>
Cache-control: no-cache 
Cache-control: no-store
Cache-control: no-transform
Cache-control: only-if-cached

캐시 응답 디렉티브
HTTP 응답 내에서 서버에 의해 사용될 수 있는 표준 Cache-Control 디렉티브.

Cache-control: must-revalidate
Cache-control: no-cache
Cache-control: no-store
Cache-control: no-transform
Cache-control: public
Cache-control: private
Cache-control: proxy-revalidate
Cache-Control: max-age=<seconds>
Cache-control: s-maxage=<seconds>

- must-revalidate: must-revalidate는 만료된 캐시만 서버에 확인.

- public 또는 private: public이면 공유 캐시(또는 중개 서버)에 저장해도 된다는 뜻이고 private이면 브라우저같은 특정 사용자 환경에만 저장하라는 뜻입니다. 브라우저는 개인 개시이다.

- max-age: 유효시간. 리소스스가 최산상태라고 판단할 최대 시간.

이 지시문은 요청 시간부터 가져온 응답을 재활용할 수 있는 최대 시간(초)을 지정합니다. 예를 들어, 'max-age=60'은 응답이 다음 60초 동안 캐시되어 재활용될 수 있음을 나타냅니다.

캐시 유효시간. 캐싱할 시간. Cache-Control 정보 가운데 하나로 캐싱할 시간을 초 단위까지 정할 수 있다. Expires 정보는 특정 날짜 및 시간을 정하지만, max-age 정보는 캐싱할 시간을 초 단위로 지정할 수 있다. Expires 정보가 ‘언제까지’를 설정하는 정보라면 max-age 정보는 클라이언트 시간과 관계없이 현재부터 며칠, 몇 년 등으로 지정할 수 있다. 만료 날짜를 계속 확인하는 과정이 필요 없기 때문에 더 효율적이다. 다만 이 속성은 HTTP/1.1을 지원하지 않는 브라우저에서는 작동하지 않는다. 그래서 일반적으로 max-age 설정을 이용하려면 Expires 설정과 max-age 설정을 동시에 해야 한다. 자세한 내용은 아파치 웹서버 설정의 mod_expires 부분을 참조하면 된다. 예: Cache-Control max-age=36000(10시간을 의미한다.)

- 1800: 30m
- 3600: 1h
- 36000: 10h
- 2592000: 720h 30day
- 31536000: 1y

no-cache: 모든 캐시 사용전 서버에 물어본다. 캐시된 복사본을 사용자에게 보여주기전에 재검증(정말 캐시해도대?)을 위한 요청을 원 서버에 보내도록 강제한다. 즉, 캐시를 할꺼지만 서버에 확인해서 재검증 하겠다.

no-store: 아무것도 캐싱하지 않겠다. 클라이언트 요청 혹은 서버응답에 관해 어떤것도 저장하지 않겠다.


## 브라우저 캐시 무효화하는 방법

브라우저에서 응답을 캐시한 후 캐시된 버전은 max-age 또는 expires로 지정된 대로 더 이상 최신 상태가 아닐 때까지 사용되거나 또는 몇몇 다른 이유(예: 사용자가 브라우저 캐시를 지우는 경우)로 캐시에서 응답이 제거될 때까지 사용됩니다. 따라서, 여러 사용자가 페이지가 생성될 때 파일의 각기 다른 버전을 사용하여 작업을 마무리할 수 있습니다. 즉, 리소스를 방금 가져온 사용자는 새 버전을 사용하는 반면, 이전 버전이지만 여전히 유효한 복제본을 캐시한 사용자는 이 응답의 이전 버전을 사용하게 됩니다.

그렇다면, 클라이언트측 캐싱과 빠른 업데이트, 이 두 가지 모두를 가장 잘 활용하려면 어떻게 해야 할까요? 리소스의 URL을 변경하고 콘텐츠가 변경될 때마다 사용자가 새 응답을 다운로드하도록 하면 됩니다. 일반적으로, 이 작업은 파일의 디지털 지문이나 버전 번호를 파일 이름에 포함하는 방식으로 수행합니다(예: style.x234dff.css).

캐싱 체크리스트
유일한 최고의 캐시 정책은 없습니다. 트래픽 패턴, 제공되는 데이터 유형 및 데이터 최신 상태에 대한 애플리케이션별 요구사항에 따라 적절한 리소스별 설정과 전체 '캐싱 계층 구조'를 정의하고 구성해야 합니다.

캐싱 전략과 관련하여 작업할 때 유의해야 할 몇 가지 팁과 기술은 다음과 같습니다.

일관된 URL 사용: 여러 다른 URL에서 동일한 콘텐츠를 제공하는 경우 해당 콘텐츠를 여러 번 가져오고 저장합니다. 팁: 참고로 URL은 대/소문자를 구분합니다.
서버가 유효성 검사 토큰(ETag)을 제공하는지 확인: 유효성 검사 토큰은 서버에서 리소스가 변경되지 않았을 때 동일한 바이트를 전송해야 할 필요성을 없애줍니다.
중간 캐시를 통해 캐시할 수 있는 리소스 식별: 모든 사용자에 대해 동일한 응답을 갖는 리소스는 CDN 및 기타 중간 캐시에 의해 캐시될 가능성이 큽니다.
각 리소스에 대해 최적의 캐시 수명 결정: 리소스별로 최신 상태 관련 요구사항이 각각 다를 수 있습니다. 각각에 대해 적합한 max-age를 감사하고 결정합니다.
사이트에 가장 적절한 캐시 계층 구조 결정: 리소스 URL과 콘텐츠 디지털 지문을 결합하여 사용하고 HTML 문서의 수명을 짧거나 no-cache로 설정하면 클라이언트가 얼마나 빠르게 업데이트를 입수할 수 있을지 제어할 수 있습니다.
이탈 최소화: 몇몇 리소스는 다른 리소스보다 더 자주 업데이트됩니다. 리소스에 자주 업데이트되는 특정 부분(예: 자바스크립트 함수 또는 CSS 스타일 집합)이 있다면 해당 코드를 별도의 파일로 제공하는 것이 좋습니다. 그렇게 하면 나머지 콘텐츠(예: 자주 변경되지 않는 라이브러리 코드)를 캐시에서 가져올 수 있으므로, 업데이트를 가져올 때마다 다운로드되는 콘텐츠의 양이 최소화됩니다.
의견


## 정리
### 요청 
Access Control Request X
Cache-Control: max-age, no-cahce, no-store

### 응답 
Access Control Allow X

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Cache-Control
- https://www.zerocho.com/category/HTTP/post/5b594dd3c06fa2001b89feb9
- https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=ko
- https://developer.mozilla.org/en-US/docs/Glossary/preflight_request