---
layout: post
title: 브라우저 렌더링
categories: Web
---

사용자가 연결된 주소의 서버에 데이터 요청을 하게 되면 서버로부터 데이터를 다운로드 받은 것을 가지고 웹브라우저가 그것을 해석해서 사용자가 보는 UI 를 완성해 주게 됩니다. 그래서 웹은 네트워크가 상당히 중요합니다. 서버에서 다운로드 받은 HTML, CSS, JS를 브라우저가 해석하는데, 이 과정을 알아 보겠습니다.

## 브라우저 동작방식

브라우저의 주요 기능은 사용자가 선택한 자원을 서버에 요청하고 브라우저에 표시하는 것입니다. 자원은 보통 HTML 문서지만 PDF나 이미지 또는 다른 형태일 수 있습니다. 자원의 주소는 URI(Uniform Resource Identifier)에 의해 정해집니다. 브라우저는 HTML과 CSS 명세에 따라 HTML 파일을 해석해서 표시하는데 이 명세는 웹 표준화 기구인 W3C(World Wide Web Consortium)에서 정합니다. 과거에는 브라우저들이 일부만 이 명세에 따라 구현하고 독자적인 방법으로 확장함으로써 웹 제작자가 심각한 호환성 문제를 겪었지만 현대에는 대부분의 브라우저가 표준 명세를 따르고 있습니다.

### 브라우저가 문서(HTML)를 해석하면서 하는일

브라우저는 기본적으로 다음과 같은 작업을 수행합니다.

- 불러오기(Loading): 불러오기는 HTTP 모듈 또는 파일시스템으로 전달 받은 리소스 스트림(resource stream)을 읽는 과정으로 로더(Loader)가 이 역할을 맡고 있음. 로더는 단순히 읽는 것이 아니라, 이미 데이터를 읽었는지도 확인하고, 팝업창을 열지 말지, 또는 파일을 다운로드 받을 지를 결정한다.
- 파싱(Parsing): 파싱은 DOM(Document Object Model) 트리를 만드는 과정으로 일반적으로 HTML, XML 파서를 각각 가지고 있음. HTML 파서는 말 그대로 HTML 문서를 해석하는데 사용되고, XML 파서는 XML 형식을 따르는 SVG, MathML 등을 처리하는데 사용함.
- 렌더링 트리(Rendering Tree) 만들기: 파싱으로 생성된 DOM 트리는 HTML/XML 문서의 내용을 트리 형태로 자료 구조화 한 것을 말한다. 다시 말해, DOM 트리는 내용 자체를 저장하고 있고, 화면에 표시하기 위한 위치와 크기 정보, 그리는 순서 등을 저장하기 위한 별도의 트리 구조가 필요한데 이를 일반적으로 렌더링 트리라고 부른다.
- CSS 스타일 결정: CSS 는 HTML 문서 내용과 별도로 표현을 나타내기 위해 만들어 졌음
- 레이아웃(Layout): 렌더링 트리가 생성될 때, 각 렌더(Render) 객체가 위치와 크기를 갖게 되는 과정을 레이아웃이라고 한다.
- 그리기(Painting): 그리기 단계는 렌더링 트리를 탐색하면서 특정 메모리 공간에 RGB 값을 채우는 과정이다.

## Critical Rendering Path란?
브라우저가 페이지의 초기 출력을 위해 실행해야 하는 순서를 Critical Rendering Path(CRP)라고 합니다.

- DOM 트리 구축
- CSSOM 트리 구축
- JavaScript 실행
- 렌더 트리 구축
- 레이아웃 생성
- 페인팅

## 렌더링 엔진

렌더링 엔진의 역할은 요청 받은 내용을 브라우저 화면에 표시하는 일을 수행합니다.

### 렌더링 엔진 동작과정

렌더링 엔진은 통신으로부터 요청한 문서의 내용을 얻는 것으로 시작하는데 문서의 내용은 보통 8KB 단위로 전송됩니다.

1. DOM트리 구축을 위한 HTML파싱: 태그를 DOM 노드로 변환하고 외부 CSS 파일과 함께 포함된 스타일 요소도 파싱
2. 렌더트리 구축(생성): 스타일 정보와 HTML 표시 규칙으로 렌더 트리 생성. 색상 또는 면적과 같은 시각적 속성이 있는 사각형을 포함하고 있는데 정해진 순서대로 화면에 표시
3. 렌더트리 배치: 각 노드가 화면의 정확한 위치에 표시되는 것
4. 렌더트리 그리기: UI 백엔드에서 렌더 트리의 각 노드를 가로지르며 형상을 만들어 내는 그리기 과정

DOM 트리가 구축되는 동안 브라우저는 렌더 트리를 구축합니다. 표시해야 할 순서와 문서의 시각적인 구성 요소로써 올바른 순서로 내용을 그려낼 수 있도록 하기 위한 목적이 있습니다.

일련의 과정들이 점진적으로 진행된다는 것을 아는 것이 중요합니다. 렌더링 엔진은 좀 더 나은 사용자 경험을 위해 가능하면 빠르게 내용을 표시하는데 모든 HTML을 파싱할 때까지 기다리지 않고 배치와 그리기 과정을 시작합니다. 네트워크로부터 나머지 내용이 전송되기를 기다리는 동시에 받은 내용의 일부를 먼저 화면에 표시하는 것입니다.


## 웹킷과 게코 엔진에서의 브라우저 동작순서

웹킷과 게코가 용어를 약간 다르게 사용하고 있지만 동작 과정은 기본적으로 동일합니다. 게코는 시각적으로 처리되는 렌더 트리를 "형상 트리(frame tree)"라고 부르고 각 요소를 형상(frame)이라고 하는데 웹킷은 "렌더 객체(render object)"로 구성되어 있는 "렌더 트리(render tree)"라는 용어를 사용합니다. 웹킷은 요소를 배치하는데 "배치(layout)" 라는 용어를 사용하지만 게코는 "리플로(reflow)" 라고 부릅니다. "어태치먼트(attachment)"는 웹킷이 렌더 트리를 생성하기 위해 DOM 노드와 시각 정보를 연결하는 과정입니다. 게코는 HTML과 DOM 트리 사이에 "콘텐츠 싱크(content sink)"라고 부르는 과정을 두는데 이는 DOM 요소를 생성하는 공정으로 웹킷과 비교하여 의미있는 차이점이라고 보지는 않습니다.

### 웹킷(사파리 브라우저) 기준 브라우저 동작 순서

#### DOM트리와 병렬로 스타일 규칙 생성

- HTML -> HTML 파서 -> DOM트리
- Style Sheets -> CSS 파서 -> 스타일 규칙

#### 렌더트리 생성 전 Attachment

- Attachment

#### 렌더트리 구축(생성)

- 렌더트리 구축은 배치와 계속 주고 받음
- 렌더트리 생성이 완료되면 그리기
- 그리기를 통해 화면에 표시 된다.

### 게코(파이어폭스 브라우저) 기준 브라우저 동작 순서

#### DOM트리생성 과정에서 스타일 규칙 생성

- HTML -> HTML 파서 -> 콘텐츠 싱크 -> DOM트리
- 콘텐츠 싱크: Style Sheets -> CSS 파서 -> 스타일 규칙

#### 형상트리 구축(생성)
- 형상트리 구축은 리플로우(배치)와 계속 주고 받음
- 형상트리 생성이 완료되면 그리기
- 그리기를 통해 화면에 표시 된다.

### 정리
Webkit과 Gecko는 용어가 약간 다르지만 렌더링 과정은 유사합니다.

| Webkit	| Gecko	| 설명 | 
| ------	| -----	| --- | 
| Render | Tree	Frame Tree	| 렌더링 되는 노드 트리 | 
| Render | Object	Frame	| 렌더링 되는 노드 | 
| Layout	| Reflow	| 렌더링 되는 노드를 배치하는 과정 | 
| Attachment	| Frame Constructor	| 렌더링 되는 노드 트리를 만드는 과정 | 
| -	| Content Sink	| DOM 노드를 만드는 과정 | 

### 파싱

파싱은 렌더링 엔진에서 매우 중요한 과정입니다. 문서 파싱은 브라우저가 코드를 이해하고 사용할 수 있는 구조로 변환하는 것을 의미합니다. 파싱 결과는 보통 문서 구조를 나타내는 노드 트리인데 파싱 트리(parse tree) 또는 문법 트리(syntax tree)라고 부릅니다. 파싱은 다음 두 가지로 구분되어 과정을 거칩니다.

- 어휘 분석: 자료를 토큰으로 분해하는 과정. 공백과 줄 바꿈 같은 의미 없는 문자를 제거한다.
- 구문 분석: 언어의 구문 규칙을 적용하는 과정

파싱은 보통 문서를 다른 양식으로 변환하는데 컴파일이 하나의 예입니다. 소스 코드를 기계 코드로 만드는 컴파일러는 파싱 트리 생성 후 이를 기계 코드 문서로 변환합니다. HTML 파서는 HTML 마크업을 파싱 트리로 변환합니다. HTML의 어휘와 문법은 W3C에 의해 명세로 정의되어 있습니다.

## 스크립트와 스타일 시트의 진행 순서
일반적으로 브라우저가 위와 같은 문서를 만나게 되면 HTML을 파싱하고 외부 자원인 CSS, JS 파일을 로드하게 됩니다. 자바스크립트는 전달된 시점에 실행하게 되고 DOM 트리의 구축을 완료한 이후에 이미지 파일 및 플래시 등의 외부 리소스를 로드하면서 모든 작업이 완료됩니다. 스타일 시트는 이론적으로 DOM 트리를 변경하지 않기 때문에 문서 파싱을 기다리거나 중단하지 않습니다. 그러나 스크립트가 문서를 파싱하는 동안 스타일 정보를 요청하는 경우라면 문제가 됩니다. 스타일이 파싱되지 않은 상태라면 스크립트는 잘못된 결과를 내놓기 때문에 많은 문제를 야기합니다.


### 스크립트
중요한 점은 "스크립트를 만나게 되면 어떻게 되는 것인가" 입니다. JS인 script 태그를 만나면 스크립트가 해석 및 실행되는 동안 문서의 파싱은 중단되게 됩니다. 스크립트가 외부에 있는 경우 우선 네트워크로부터 자원을 가져와야 하는데 이 또한 실시간으로 처리되고 자원을 받을 때까지 파싱은 중단됩니다. 이 모델은 수 년간 지속됐고 HTML4와 HTML5의 명세에도 정의되어 있습니다.

#### 문제가 발생하는 경우
스크립트 파일을 먼저 로드하고 스타일을 불러오는 경우 즉, 스크립트가 문서를 파싱하는 동안 스타일 정보를 요청하는 경우라면 문제가 됩니다. 스크립트가 문서를 파싱하는 동안 브라우저는 다른 작업을 수행하지 않기 때문에 스타일이 파싱되지 않은 상태가 되고 이렇게 되었을 때 화면 레이아웃이 제대로 구성되지 않은 상태로 사용자에게 뷰를 제공하게 될 확률이 높기 때문에 사용자 경험(UX)을 떨어뜨리는 결과를 초래하게 될 것입니다. 이런 문제는 흔치 않은 것처럼 보이지만 매우 빈번하게 발생합니다. 이러한 문제를 야기시키지 않고 사용자 경험을 떨어뜨리지 않기 위해 다음과 같이 스크립트 소스를 body 태그 끝에 두는 것을 권장하고 있습니다. 스크립트 소스를 하단에 두게 되면 HTML 문서를 화면에 표시하는 속도가 빨라지게 되고 사용자가 뷰를 보는데 필요한 왠만한 문서를 해석한 상태이기 때문에 사용자의 불편을 초래하지 않을 수 있습니다.


#### 스크립트의 로드 시점제어하기 - async, defer
문서의 head 영역에 스크립트가 삽입되거나 외부의 파일에 정의되어 있다면 이벤트 연결은 문서의 로드시점에 맞게 처리해야 할것입니다. head 에 삽입하는 경우에 모던 브라우저에서는 defer, async 속성을 사용할 수 있습니다.

참고)
- DOMContentLoaded: DOM 트리를 완성되는 시점. images 와 같은 외부 자원(iframe, image)을 제외(ex. embedded type)한 HTML Element 를 해석, 구성해 주는 것
- Load: 문서의 모든 콘텐츠(images, script, css, etc)가 로드된 상태




## 결론

사이트의 성능을 향상시키는 방법을 이해하는데 다음 브라우저의 렌더링 순서는 매우 유용합니다.

- DOM 트리 구축(Constructing the DOM Tree)
- CSSOM 트리 구축(Constructing the CSSOM Tree)
- JavaScript 실행(Running JavaScript)
- 랜더링 트리 구축(Creating the Render Tree)
- 레이아웃 생성(Generating the Layout)
- 페인팅(Painting)

CSS는 "렌더링 차단 리소스"로, 완전히 파싱하지 않으면 렌더링 트리를 구성할 수 없습니다. JavaScript는 "파서 차단 리소스(parser blocking resource)"로, HTML 문서 자체의 구문 분석은 JavaScript에 의해 차단될 수 있습니다. 파서가 내부 태그이든 외부 태그이든 script 태그에 도달하면 (외부 태그 인 경우) fetch를 중단하고 실행합니다. 따라서 문서 내의 요소를 참조하는 JavaScript 파일이 있는 경우 해당 문서가 표시된 후에 배치 해야 합니다. JavaScript가 파서 차단(parser blocking)되는 것을 피하기 위해 async 속성을 적용하여 비동기적으로 로드 할 수 있습니다.

async와 defer를 지원하는 브라우저는 브라우저가 가지고 있는 JavaScript 엔진마다 약간 다를 수 있습니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://blog.asamaru.net/2017/05/04/script-async-defer/
- https://d2.naver.com/helloworld/59361
- https://webclub.tistory.com/630
- https://beomy.github.io/tech/browser/browser-rendering/