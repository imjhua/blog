---
layout: post
title: Http Cache
categories: Web
---

http에서 캐시를 다루는 방법을 알아봅니다.

## 캐시(cache)

캐시를 이용하면, 첫번째 서버 응답은 캐시에 보관됩니다. 캐시는 클라이언트가 서버로부터 데이터를 요청할때에, 불필요한 데이터 전송을 줄여서,네트워크 요금으로 인한 비용을 줄여이거나 네트워크 병목을 줄일 수 있고 대역폭을 늘리지 않고도 페이지를 빨리 불러올 수 있는 장점이 있습니다. 또한 갑작스런 요청이 발생하는 경우 네트워크 병목이 생길 수 있는 상황에서도 효과적으로 대응 할 수 있습니다.

다음은 대표적으로 사용되는 요청헤더에서의 Cache-Control 입니다.

- no-store: 캐시를 전혀 하지 않겠다.
- max-age=<seconds>: 일정기간(시간, 초)동안 캐시를 적용하겠다. (캐시유효시간 지정)
- no-cache: 캐시가 유효한지 항상 확인한다. 캐시를 할 건데, 항상 서버에 한번 물어보겠다.

참고) 캐시를 요청하는데, 수정사항이 있으면 200, 수정사항이 없다면 304

요청과 응답에서 사용되는 디렉티브가 미묘하게 다릅니다.

### 캐시 요청 디렉티브

```
HTTP 요청 내에서 클라이언트에 의해 사용될 수 있는 표준 Cache-Control 디렉티브.

Cache-Control: max-age=<seconds>
Cache-Control: max-stale[=<seconds>]
Cache-Control: min-fresh=<seconds>
Cache-control: no-cache
Cache-control: no-store
Cache-control: no-transform
Cache-control: only-if-cached
```

### 캐시 응답 디렉티브

```
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
```

## 캐시사용하지 않기

캐싱 막기위해, 캐싱을 끄기 위해서, 다음의 디렉티브들을 보낼 수 있습니다.

```
Cache-Control: no-cache, no-store, must-revalidate
```

참고) 추가로, Expires와 Pragma 헤더가 추가로 요청되어야 할 수 있습니다.

- Pragma는 HTTP/1.0 의 Pragma 헤더는 요청-응답 체인에 다양한 영향을 줄 수 있는 구현관련 헤더이다. 이것은 HTTP/1.0 버전에서 HTTP/1.1 버전의 Cache-Control 헤더가 생기기 전 그것과 동일한 역할을 하는 대용 헤더로 사용되었습니다.
- Expires 헤더는 응답이 더 이상 신선하지 않다고 판단할 날짜/시간을 포함합니다.

## 캐시의 사용(by 신선도 검사)

원서버 콘텐츠는 변경될 수 있기 때문에, 캐시는 반드시 그들이 갖고 있는 사본이 여전히 최신인지 서버를 통해 점검해야합니다. 이러한 신선도 검사를 HTTP 재검사라 부릅니다. 캐시를 통해 HTTP는 서버로부터 전체 객체를 가져오지 않고도, 콘텐츠가 여전히 신선한지 빠르게 검사할 수 있는 특별한 요청을 정의하였습니다. 대부분의 캐시는 클라가 사본을 요청하였으며, 그 사본이 검사를 할 필요가 있을 정도로 충분히 오래된 경우에만 재검사를 한다. 콘텐츠가 변경되지 않았다면, 서버는 아주 작은 304 Not Modified 응답을 보냅니다.

- max-age: 캐시 유효시간 정의 (max-age:0 은 no-cache와 동일한 의미)
- (Server) Last-Modified & (Client) If-Modified-Since: 서버는 파일의 수정시간을 내려주고 클라이언트는 이후에 수정된거 있어? 라고 물어본다. 있으면 200, 없다면 304. 시간을 비교하는 것이기 때문에 부정확하다. 오차가 존재한다.
- (Server) ETag & (Client) If-None-Match: 서버가 특정 버전의 리소스를 식별하는 식별자를 내려주고 클라이언트는 서버에게 ETag를 다시 전달하여, ETag가 달라졌는 지 검사해서 다를 경우에만 컨텐츠를 새로 내려준다.

### max-age 사용의 문제점

max-age를 설정하여 캐시를 정의하는 경우, 캐시의 유효시간을 지정하겠다는 의미입니다. 서버에서는 캐시에 대한 요청을 받아, 데이터의 변경사항이 있는지 없는 지 확인하고 최소한의 응답과 (최소한의 사이즈) 변경이 일어나지 않았다는 정보를 내려줍니다. 이 정보가 바로 httpCode 304 입니다.

```
304 Not Modified
```

서버는 헤더에 캐시 응답을 위해 Age를 포함하여 주기도 하는데, 이는 max-age 시간 내에서 얼마나 흘렀는지 초 단위로 알려줍니다.

```
// 캐시요청 max-age시간 내에서 60초가 흘렀다.
// 만약 요청의 max-age와 응답의 age가 같다면? 이제 캐시유효시간이 만료되었으므로 서버에서 실 데이터를 내려준다.
Age: 60
```

성능이 좋습니다. 그러나! 이때는 데이터가 신선하지 않을 수 있다는 문제가 있습니다. 아무리 서버에 변경사항이 생겨도 클라이언트는 계속 캐시데이터만 읽어 올 것입니다. 캐시를 1년으로 설정해두면, 1년동안 데이터가 갱신되지 않을 것입니다. 무슨말이냐 하면.. 캐시를 특정기간동안에 사용하겠다고 정의 하는 경우, 일정기간(약속된 캐시저장기간) 또는 시간 동안에만 데이터를 서버로 요청하지 않고 클라이언트가 임의로 저장한 데이터를 사용하겠다는 의미인데, 이 때문에 실제 서버단에서 업데이트가 이루어진 경우에도 불구하고 데이터가 갱신되지 않을 수 있는.. 큰 문제가 발생할 수 있는 상황을 가지고 있는 것 입니다. (캐시 사용에서 매우 주의할점!!)

### 재검사! 단순 캐시일정기간만 보는 것이 아닌 서버에서 한번더 비교하기(해결책 - 아이디어)

리소스가 갱신되었는지에 대한 비교를 통하여 단순 캐시유효기간이외에 필요에 따라 데이터를 새로 내려주는 아이디어에서 출발합니다. 하나는 리소스변경의 시간기준이고 다른 하나는 리소스의 식별자 입니다. 이 파일은 언제 수정한 파일이다에 대한 정보를 기준으로 서버에서 비교를 하여 변하지 않았다는 정보(httpCode 302)를 내려주거나 새로운 정보임을 나타냅니다.

Origin Server의 컨텐츠는 변경될 수 있기 때문에 캐시는 반드시 그들이 갖고 있는 사본이 여전히 최신인지 서버를 통해 때때로 점검해야 합니다. 이러한 신선도 검사를 HTTP 재검사라 부른다. 캐시된 문서가 만료되었다는 것은, 그 문서가 Origin Server에 현재 존재하는 것과 실제로 다르다는 것을 의미하지는 않으며, 다만 이제 검사할 시간이 되었음을 뜻합니다. 재검사 결과 컨텐츠가 변경되었다면 새로운 사본을 가져와 데이터 갱신을, 변경되지 않았다면 캐시 안의 헤더들을 갱신합니다.

효과적인 재검사를 위해 HTTP는 서버로부터 전체 객체를 가져오지 않고도 컨텐츠가 여전히 신선한지 빠르게 검사할 수 있는 특별한 요청을 정의했습니다. 캐시는 캐시된 사본의 재검사가 필요할 때 Origin Server에 작은 재검사 요청(GET If-Modified-Since)을 보냅니다. 컨텐츠가 변경되지 않았다면, 서버는 아주 작은 304 Not Modified 응답을 보냅니다.

- (Server) Last-Modified & (Client) If-Modified-Since: 서버는 파일의 수정시간을 내려주고 클라이언트는 이후에 수정된거 있어? 라고 물어본다. 있으면 200, 없다면 304. 시간을 비교하는 것이기 때문에 부정확하다. 오차가 존재한다.
- (Server) ETag & (Client) If-None-Match: 서버가 특정 버전의 리소스를 식별하는 식별자를 내려주고 클라이언트는 서버에게 ETag를 다시 전달하여, ETag가 달라졌는 지 검사해서 다를 경우에만 컨텐츠를 새로 내려준다.

#### (Server) Last-Modified & (Client) If-Modified-Since

Last-Modified 응답은 HTTP 헤더에 서버가 알고있는 가장 마지막 수정된 날짜와 시각을 담고 있습니다. 이는 저장된 리소스가 이전과 같은지 유효성 검사자로 사용됩니다. ETag 헤더보다는 덜 정확하지만, 이는 대비책으로 사용됩니다. 조건 요청은 If-Modified-Since 또는 If-Unmodified-Since 헤더로 이와 같은 필드를 사용하여 만들어집니다.

#### (Server) ETag & (Client) If-None-Match

ETag HTTP 응답 헤더는 특정 버전의 리소스를 식별하는 식별자입니다. 웹 서버가 내용을 확인하고 변하지 않았으면, 웹 서버로 full 요청을 보내지 않기 때문에, 캐쉬가 더 효율적이게 되고, 대역폭도 아낄 수 있습니다. 허나, 만약 내용이 변경되었다면, "mid-air collisions" 이라는 리소스 간의 동시 다발적 수정 및 덮어쓰기 현상을 막는데 유용하게 사용됩니다.

만약 특정 URL 의 리소스가 변경된다면, 새로운 ETag 가 생성됩니다. ETag 는 지문과 같은 역할을 하면서 다른 서버들이 추적하는 용도에 이용되기도 합니다. ETag 를 비교하여 리소스가 서로 같은지의 여부를 빠르게 판단할 수 있지만, 서버에서 무기한으로 지속될 수 있도록 설정할 수도 있습니다.

## 정리

Cache 처리 단계를 정리하면 다음과 같습니다.

- 단계 1: 요청 받기 - 캐시는 네트워크로부터 도착한 요청 메시지를 읽는다.
- 단계 2: 파싱 - 캐시는 메시지를 파싱하여 URL과 헤더들을 추출한다.
- 단계 3: 검색 - 캐시는 로컬 복사본이 있는지 검사하고, 사본이 없다면 사본을 받아온다 그리고 로컬에 저장한다.
- 단계 4: 신선도 검사 - 캐시는 캐시된 사본이 충분히 신선한지 검사하고, 신선하지 않다면 변경사항이 있는지 서버에 물어본다.
- 단계 5: 응답 생성 - 캐시는 캐시된 응답을 Origin Server에서 온 것처럼 보이게 하고 싶기 때문에, 새로운 헤더와 캐시된 본문으로 응답 메시지를 만든다. 이 때 헤더의 응답 버전을 클라이언트에 맞게 조정해야 하며, Cache-Control/Age/Expires 등 캐시 신선도 정보를 삽입하여야 한다. 또한 요청이 프락시 캐시를 거쳐갔음을 알려주기 위해 종종 Via 헤더를 포함시킨다.
- 단계 6: 발송 - 캐시는 네트워크를 통해 응답을 클라이언트에게 돌려준다.

### 캐시 제어(Cache-Control) 종류

#### no-cache vs no-store

- 'no-cache'는 매 요청마다 ETag를 통해 자원의 유효성 확인. Cache-Control의 max-age가 0과 같음.
- 'no-store'는 자원을 캐시하지 않음.

#### public vs private

- 'public'은 중간 단계를 포함해 캐시 가능하다. 대부분의 경우, 명시적 캐싱 정보(예: 'max-age')가 응답이 어떠한 경우든지 캐시가 가능하다고 나타내므로 'public'이 필요하지 않다.
- 'private'은 중간 단계에 캐시를 하지 않는다. 즉, 사용자 브라우저는 캐시할 수 있지만 CDN은 캐시할 수 없다.

마지막으로.. 유효기간을 까마득한 미래로 설정한다면 그 문서에 대한 어떤 변경도 캐시에 반영되지 않을 것이므로 주의해야 합니다!

---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Cache-Control
- https://feel5ny.github.io/2019/09/30/HTTP_007-1/
- https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=ko
- https://brainbackdoor.tistory.com/129