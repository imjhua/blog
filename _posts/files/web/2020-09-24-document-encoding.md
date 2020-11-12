---
layout: post
title: 웹 서비스를 구성하는 문자 인코딩(charaterSet) 정리
categories: Web
---

웹 서비스는 서버와 클라이언트로, api와 html로, 동적인 기능구현을 위한 javascript로 구성될 것입니다. Server Response & HTML & Javascript 의 혼란스러운? 인코딩을 정리합니다.

## 문자 인코딩 (charaterSet)

문자인코딩, 줄여서 인코딩은 사용자가 입력한 문자나 기호들을 컴퓨터가 이용할 수 있는 신호로 만드는 것을 말합니다.

- 인코딩: 컴퓨터가 이해할 수 있는 신호로 문자 변환
- 디코딩: 사용자가 이해할 수 있도록 문자 해독

신호를 입력하는 인코딩과 문자를 해독하는 디코딩하기 위해선 미리 정해진 기준을 바탕으로 입력과 해독이 처리되어야 합니다. 이를 문자열 세트 또는 문자셋라고 하는 것입니다. 초기 charaterSet은 아스키나 EBCDIC이 표준이었으나, 표현해야 할 문자가 많아지면서 대체방식들이 개발되었고 유니코드가 등장하였습니다.

## 서버 응답에서의 charaterSet

서버에서 보내오는 문서(HTML/XHTML)소스의 인코딩정보는 HTTP 헤더의 Content-Type에서 확인할 수 있습니다. charset 매개변수를 보면 서버에서 내려주는 응답이 어떤 방식으로 인코딩 되었는지 알 수 있습니다.

- Content-Type: text/html; charset=utf-8

단, charset 매개변수는 없을 수 있습니다. 이것은 클라이언트 화면영역에 노출되는 응답의 인코딩에 대한 정보일 뿐이지, 이 값을 기준으로 문서가 변환되는 것은 아닙니다. 따라서 응답을 받는 문서 자체가 해당 문자 인코딩을 지정하는 경우에는 이 매개변수가 없어도 무방합니다.

## HTML문서(html / script)에서의 charaterSet

HTML요소의 속성(attribute)을 사용하여 문서가 렌더링에 사용하는 문자 인코딩을 선언합니다.

- charset `<meta>, <script>` 페이지 또는 스크립트의 문자 인코딩을 선언합니다.

참고) HTML의 요소란? 사용자가 원하는 기준을 충족하기 위해 요소를 구성하거나 다양한 방식으로 동작을 조정하는 추가 값.

### meta 속성

페이지의 문자 인코딩을 선언합니다. 이 특성이 존재할 경우, 그 값은 반드시 문자열 "utf-8"의 대소문자 구분 없는 ASCII 표현이어야 합니다. html 파일의 인코딩을 알려주는 태그로 인코딩을 명확하게 알려주지 않으면 웹브라우저 설정 상황에 따라 자동으로 인코딩을 추정해서 처리해주는데, 처리가 정확할 경우도 있지만, 그렇지 못하는 경우도 많습니다. 다양한 경우에 한글이 깨지지 않고 잘 보이기를 기대한다면 위 태그는 꼭 적어주는 것이 좋습니다.

```html
<meta charset="utf-8" />
```

#### http-equiv 요소

http-equiv 특성을 지정하면 유사한 이름의 HTTP 헤더가 제공하는 정보와 동일한 프래그마 지시문이 됩니다. http-equiv 요소의 content-type 통해 인코딩을 지정할 수 있습니다.

```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
```

참고) 프래그마? 프래그마 지시문?은 컴퓨터 프로그래밍에서 지시어 또는 pragma는 컴파일러가 입력을 처리하는 방법을 지정하는 언어 구조를 말한다. =지시문은 프로그래밍 언어 문법의 일부가 아니며 컴파일러마다 다를 수 있다.

### script 속성

자바스크립트의 문자 인코딩을 선언합니다.

```html
<script src="test.js" charset="utf-8"></script>
```

엘리먼트를 생성하여 script를 동적으로 로드할 경우, 속성정의 순서에 따라 인코딩변환이 제대로 일어나지 않을 수 있습니다.charset을 먼저 지정하고 src를 통해 스크립트를 로드하여야 문자인코딩이 정상적으로 이루어집니다.

```js
// asynchronously load js file
export const loadJS = (url: string, charset: string, id = ""): Promise<any> =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.charset = charset;
    script.src = url;
    script.id = id;
    script.addEventListener("load", resolve, false);
    document.body.appendChild(script);
  });
```

### WEB API를 통해 문서의 인코딩 확인

#### Document.characterSet (only-read)

Document.characterSet 읽기 전용 속성은 현재 문서가 렌더링에 사용하는 문자 인코딩을 반환합니다.

참고: Document.charset과 Document.inputEncoding 속성은 Document.characterSet의 이전 별칭입니다. 더 이상 사용지 마세요.

#### Document.charset (IE전용이며 read/write)

IE 전용이며 표준이 아닌, 도큐먼트 또는 엘리먼트의 캐릭터셋을 읽거나 변경하기 위한 속성입니다.

사용시 주의사항

- document.charset으로 캐릭터셋을 변경 시, 히스토리 변경(앞으로 가기/뒤로 가기) 후에도 변경한 캐릭터셋이 남아있는 문제가 있다.
- 이를 해결하기 위해 폼 전송 후 document.charset을 원래대로 복구해줘야 한다.
- (예: 폼 전송 후, 또는 window의 onbeforeunload 이벤트 핸들러에서 document.charset을 복구해준다.)

#### IE에서 문서모드(버전) 읽기

IE브라우저 전용 속성인 documentMode 를 통해 현재 문서를 렌더링하기 위한 브라우저에서 사용하는 모드를 알 수 있습니다.

IE8은! DOCTYPE 또는 특정 HTML 요소의 존재 여부에 따라 다른 모드로 페이지를 렌더링 할 수 있습니다.

```js
// mode 버전 반환. (8, 9, 10, 11 ..)
document.documentMode;
```

참고) 이전에는 window.navigator.userAgent의 msie문자열 유무에 따라 판별을 하였는데 IE11부터 해당 문자열이 사라졌다.

- 10버전: Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2)
- 11버전: Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko

```js
// bed
export const isIE9AndBelow = (function () {
  const ua = window.navigator.userAgent.toLowerCase();
  const isIE =
    ua.indexOf("msie") != -1 ? parseInt(ua.split("msie")[1], 10) : false;
  return isIE && isIE <= 9;
})();

// good
function isIE9AndBelow() {
  // 크롬일 경우 document.documentMode 프로퍼티가 없고 ie에서는 버전을 리턴함
  return setIsIE9AndBelow(window.document.documentMode < 10);
}
```

### form 전송

문서 페이지의 인코딩과 form sumbit 대상이 되는 페이지의 인코딩이 서로 다른경우 데이터가 깨지는 경우 발생하기 때문에 charSet이 다른 서비스로 submit할때에는 특히나 문자인코딩에 더 신경써야 합니다. form에서는 전송할 인코딩 set을 지정할 수 있습니다.

```html
<form accept-charset="character_set"></form>
```

태그의 accept-charset 속성은 다음을 의미합니다.

- 서버가 받아서 처리하기 위한 캐릭터셋을 의미한다.
- 값이 없을 때의 기본값은 UNKNOWN 이다.
- IE의 경우, 문서와 다른 캐릭터셋을 넣을 경우 UTF-8이 사용된다.

브라우저 지원여부에 따라 accept-charset 인코딩이 안될 수 있기때문에 (예를들면 IE) 직접 문서의 charset을 변경해야 하는 우회방법을 적용해야 할 수 있습니다.

1. 폼 엘리먼트에 accept-charset 속성을 추가하고 대상 서비스의 캐릭터셋 값을 준다.
   예) accept-charset="euc-kr"
2. 스크립트에서 폼 서브밋을 보내기 전,
   document.charset = "euc-kr"; 구문을 추가한다.
3. 폼 서브밋 후에 document.charset의 값을 원래 값으로 되돌린다.

예제) 현재 문서가 utf-8 캐릭터셋이고 요청 대상 서비스의 캐릭터셋이 euc-kr 인경우

```js
[마크업]
// accept-charset 속성에 대상 서비스의 캐릭터셋을 넣어준다.
<form action="" accept-charset="euc-kr"></form>

[스크립트]
// 요청 전 캐릭터셋을 대상 서비스의 캐릭터셋으로 설정한다.
document.charset = "euc-kr";

form.submit();

// 요청 후 캐릭터셋을 원래대로 복구한다.
if (document.charset) {
	document.charset = "utf-8";
}
```

## 정리

인코딩/디코딩을 위한 미리 정해진 기준을 charaterSet이라고 하며, 초기 표준은 아스키였고 표현해야 하는 문자가 많아지면서 유니코드가 등장하였습니다.

서버가 응답에 대한 인코딩 정보를 내려주고 문서는 동일한 인코딩으로 페이지의 인코딩 정보를 선언합니다. 이때 서버 응답에서의 문자 인코딩정보는 참고용이기 때문에 꼭 지정하지 않을 수 있습니다. 문서의 인코딩은 별개이며, 따라서 서버의 인코딩 정보는 참고용일 뿐 문서가 해당 charset으로 변환(인코딩) 되는 것은 아닙니다.

- 서버 소스 인코딩: utf-8
- 서버 응답 헤더(httpHeader): Content-Type: text/html; charset=utf-8
- HTML 문서: `<meta charset="utf-8" />`
- js: `<script src='test.js' charset="utf-8"></script>`

### 애매한 경우

서버가 잘못된 인코딩을 내려줄때 다음과 같은 경우라면?

- 서버 소스 인코딩: utf-8
- 서버 응답 헤더(httpHeader): euc-kr
- HTML 문서: utf-8

응답헤더(참고용이다!) 보다는 문서의 인코딩 선언인 utf-8로 페이지를 읽기 때문에 정상적으로 페이지 인코딩이 정상적으로 이루어집니다.햇갈릴 수 있지만.. 호출하는 쪽에서 문서의 인코딩을 바꿀수는 없고 참고용일 뿐인 것입니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://ko.wikipedia.org/wiki/%EB%AC%B8%EC%9E%90_%EC%9D%B8%EC%BD%94%EB%94%A9
- https://www.w3.org/TR/1998/REC-html40-19980424/interact/forms.html#adef-accept-charset
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
- https://ohgyun.com/314
