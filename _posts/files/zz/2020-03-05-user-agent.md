---
layout: post
title: User-Agent
categories: Web
---

유저 에이전트 스트링(User Agent String)은 주로 우리 웹사이트에 접속한 사용자의 환경(디바이스정보), 예를들어 운영체제가 무엇인지, 사용하는 브라우저는 어떤것인지 등의 정보를 담고 있는 문자열입니다. 브라우저와 웹 표준은 완벽하지 않고 그 간극은 여전히 브라우저 감지 기능을 필요로 합니다. 유저에이전트를 이용해서 접속자의 환경을 파악하고 그에 맞는 콘텐츠를 제공하거나 코드를 실행하게 하는 식으로 유용하게 사용할 수 있습니다.

## User-Agent

인터넷 사이트에 접속할 때 User-agent는 사용자에 관한 정보를 전송하게 되는데 그게 바로 "User-Agent" header 사용자 에이전트 헤더입니다. 단지 문자열인데, 브라우저/운영체제 등에 관한 정보를 담고 있습니다.

## User-Agent 등장

1995년 HTML 2.0이 나오기 전까지 HTML은 표준화되지 않았습니다. 당시에는 유저 에이전트 없이 아주 잘 사용하였는데, 시간이 지날수록 브라우저가 많아지고 `호환성 문제가 늘어나 이 문제들을 해결하기 위해` 등장한 것이 유저 에이전트입니다. 하지만 그 당시에는 Netscape Navigator와 Internet Explorer 만 주로 사용하였고, 그래서 종류와 버전으로 구분 했으면 되었습니다. 이후의 다른 브라우저 벤더들은 자사 제품이 Netscape 브라우저의 특정 버전과 호환된다는 의미로 유저 에이전트 정보에 Mozilla/version 을 추가하게 되었습니다.

### 헤더 문자열들

#### Chrome

Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36

#### Firefox

Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:72.0) Gecko/20100101 Firefox/72.0

#### Mobile Safari

Mozilla/5.0 (iPod; U; CPU iPhone OS 3_1_3 like Mac OS X; ko-kr) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7E18 Safari/528.16

#### Android Web Browser

Mozilla/5.0 (Linux; U; Android 2.1-update1; ko-kr; Nexus One Build/ERE27) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17

#### Opera Mini

Opera/9.80 (J2ME/MIDP; Opera Mini/5.0.18302/1114; U; en) Presto/2.4.15

#### WebOS Web Browser

Mozilla/5.0 (webOS/1.4.1.1; U; en-US) AppleWebKit/532.2 (KHTML, like Gecko) Version/1.0 Safari/532.2 Pre/1.0

## 모더나이저(Modernizr)

Modernizr은 개발자가 크로스 브라우저 호환성에 따라 다양한 수준의 경험을 만들 수 있도록 하는 오픈 소스 및 소형 JavaScript 라이브러리 입니다. Modernizr은 개발자가 크로스 브라우저 테스트 를 수행하여 차세대 HTML5 및 CSS3 기능이 방문자의 브라우저에서 기본적으로 지원 되는지 여부를 확인 하고 기능이 열악한 것으로 악명 높은 이전 브라우저에 대한 전용 폴백을 제공 할 수 있도록합니다. 점진적 향상 의 원리와 결합 된 Modernizr 은 IE와 같은 오래된 브라우저를 계속 사용하는 사용자를 버리지 않고 강력한 최신 웹 기술을 활용하여 최신 웹 사이트를 레이어별로 디자인 할 수 있습니다.

브라우저 간 호환성을 위해 Modernizr를 사용하여 특정 기술의 지원 여부를 알 수 있습니다. (기능 감지) 유저 에이전트 스트링에는 그다지 관련 없어보이는 단어들 예를들면 크롬에 Safari, Mozilla 등도 포함되어 있기 때문에 실제로 사용할 때는 좀 더 세심하게 다루어 주어야합니다. 이때 직접 다루기보다는 모더나이저(Modernizr)같은 라이브러리를 사용하면 쉽게 지원 기능을 감지 할 수 있습니다. 모더나이저는 사용자가 어떤 브라우저로 접속했는지를 직접 알려주지는 않지만, 보통은 그걸 알고 싶은 이유가 특정 기술의 지원 여부이기 때문에 쉽게 사용할 수 있습니다.

### Modernizr을 이용한 CSS 기능 탐지

이 클래스는 기능이 지정된 브라우저에서 지원되는지 여부에 따라 CSS 스타일 속성의 기능 감지를 위해 Modernizr의 <html> 태그에 추가되었습니다. 접두사가"no"인 클래스는 해당 기능을 지원하지 않는 브라우저에 자동으로 적용됩니다.

예를 들어 box-shadow 속성이 브라우저에서 지원되면 "boxshadow"Modernizr 클래스가 <html> 태그에 추가됩니다. 지원되지 않는 경우 "no-boxshadow"Modernizr 클래스가 대신 추가됩니다. 이 2 가지 CSS 클래스 만 사용하면이 특정 기능에 대한 지원 여부에 관계없이 모든 브라우저를 효과적으로 타겟팅 할 수 있습니다. ".boxshadow"클래스는 지원되는 모든 브라우저에서 가로 오프셋 및 세로 오프셋이 10px, 흐림이 8px, 스프레드가 15px 인 div 주위에 상자 그림자 스타일을 지정하는 데 사용될 수 있으며".no_boxshadow"클래스를 사용하여 폴백을 코딩 할 수 있습니다 지원되지 않는 모든 브라우저에 대한 그림자 부족을 보완하기 위해 두꺼운 테두리 너비를 사용합니다.

```css
.boxshadow #box {
  border: 2px solid black;
  -webkit-box-shadow: 10px 10px 8px 10px #888888;
  -moz-box-shadow: 10px 10px 8px 10px #888888;
}

.no-boxshadow #box {
  border: 5px solid black;
}
```

따라서 User-Agent Strings를 사용하여 개별 브라우저를 대상으로하는 코드 더미를 작성하는 대신 Modernizr의 기능 탐지 기능은 호환 가능한 브라우저 용 코드와 호환되지 않는 코드 용 코드를 2 개의 코드로 코딩하는 작업을 줄입니다.

CSS 선형 그라디언트의 또 다른 예입니다.

```css
.no-cssgradients .header {
  background: url("https://unsplash.it/640/425?image=44");
}

.cssgradients .header {
  background-image: url("https://unsplash.it/640/425?image=44"), linear-gradient(red, blue);
}
```

### 클래스 이름 충돌 방지

Modernizr이 만든 클래스가 스타일 시트에 추가 한 기존 CSS 클래스와 충돌 할 수 있다는 것은 매우 타당합니다. 이러한 시나리오를 피하려면 모든 Modernizr 클래스에"classPrefix"를 추가하여 완전히 고유하게 만드는 것이 좋습니다. 예를 들어 Modernboxr에서 생성 한 감지 클래스와 동일한 이름으로 충돌하는 'boxshadow'라는 클래스를 이미 사용하고있을 수 있습니다. 이 문제를 쉽게 해결하기 위해 클래스 접두사를 사용할 수 있습니다. 구성을 다음과 같이 변경하십시오.

```js
{
  "classPrefix": "foo-",
  "feature-detects": ["dom/boxshadow"]
}
```

이제 <html class="boxshadow"> 대신 <html class="foo-boxshadow"> 으로 사용합니다.

### Modernizr이 HTML 태그에 클래스를 추가하지 못하도록 방지

Modernizr이 클래스를 HTML 태그에 추가하지 않게하려면 설정 파일에서"enableClasses"를 false로 설정하십시오. 이것은 여전히 ​​no-js 클래스를 제외합니다. 이를 방지하려면"enableJSClass"도 false로 설정하십시오.

### Modernizr을 사용한 JavaScript 기능 탐지

앞에서 언급했듯이 Modernizr은 신뢰할 수없고 기능이 상실된 User-Agent 문자열을 사용하여 사용자의 브라우저를 감지하는 대신 기능 감지에 의존합니다. Modernizr은 페이지로드 중에 백그라운드에서 일련의 자바 스크립트 기반 검사 또는 테스트를 실행하여 기능이 브라우저에서 지원되는지 여부를 감지합니다. 이 테스트는 기능이 지원되고 "False"가 아닌 경우 부울 값 – "True"를 반환합니다. 이 부울 결과를 사용하여"Modernizr"라는 자바 스크립트 객체를 만듭니다. "Modernizr.featureName"을 사용하여 기능 감지를 위해이 개체 'Modernizr'의 다양한 속성에 액세스 할 수 있습니다. 예를 들어, Modernizr.video는 브라우저가 비디오 요소를 지원하면 "true"를 반환하고 브라우저가 지원하지 않으면 false를 반환합니다.

다음은 JavaScript를 사용하여 Modernizr에서 기능 감지에 사용되는 구문입니다.

```js
if (Modernizr.feature) {
  /* Rules for browsers that support this feature*/
} else {
  /* fallback for browsers that do not support this feature*/
}
```

Modernizr 객체는 HTML 기능뿐만 아니라 CSS에 대한 지원을 검증하는 데 도움이됩니다. 여기서 Modernizr은 @supports 기능 쿼리를 사용하여 기본 CSS 기능 감지에 비해 명확한 이점을 제공합니다. Modernizr의이 기능을 사용하여 캔버스, 비디오, 오디오와 같은 중요한 HTML5 요소 및 기사, 탐색 메뉴, 머리글, 바닥 글 등과 같은 시맨틱 요소에 필요한 폴백을 코딩 할 수 있습니다.

다음 예제는 자바 스크립트를 사용하여 CSS 선형 그라디언트를 테스트하고이를 지원하는 브라우저에 선형 그라디언트 클래스를 추가하는 방법을 보여줍니다.

```js
$(document).ready(function() {
  if (Modernizr.cssgradients) {
    alert("This browser supports CSS Gradients");
    $("#box").addClass("cssgradients");
  }

  if (Modernizr.cssgradients) {
    alert("This browser doesn't support CSS Gradients");
    $("#box").addClass("no-cssgradients");
  }
});
```


---

해당 내용은 다음 글을 참고 하였습니다.

- https://developer.mozilla.org/ko/docs/Web/HTTP/User_agent%EB%A5%BC_%EC%9D%B4%EC%9A%A9%ED%95%9C_%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80_%EA%B0%90%EC%A7%80
- https://blog.outsider.ne.kr/449
- http://rheasis.blogspot.com/2013/07/user-agent.html
- https://www.lambdatest.com/blog/feature-detection-with-modernizr-for-cross-browser-compatibility/
