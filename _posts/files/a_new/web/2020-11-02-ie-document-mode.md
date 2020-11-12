---
layout: post
title: IE문서 모드
categories: Web
---

IE브라우저 전용 속성인 documentMode 를 통해 현재 문서를 렌더링하기 위한 브라우저에서 사용하는 모드를 알 수 있습니다.

### IE에서 문서모드(버전) 읽기

IE에서 지원하는 documentMode 프로퍼티를 통해 문서모드의 버전을 알 수 있습니다.

```js
// mode 버전 반환. (8, 9, 10, 11 ..)
document.documentMode;
```

참고로 이전에는 window.navigator.userAgent의 msie문자열 유무에 따라 판별을 하였는데 IE11부터 해당 문자열이 사라졌습니다.

- 10버전: Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2)
- 11버전: Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko

## IE9버전 체크 하기

아래는 IE의 문서모드를 체크하는 코드 입니다. 크롬일 경우는 documentMode프로퍼티가 없기때문에 IE9버전을 체크할 때 false를 반환하게 됩니다.

```js
function isIE9AndBelow() {
  // 크롬일 경우 document.documentMode 프로퍼티가 없고 ie에서는 버전을 리턴함
  return setIsIE9AndBelow(window.document.documentMode < 10);
}
```

아래는 userAgent를 파싱하여 정보를 얻어오는 코드인데 앞으로는 더이상 지원되지 않고 들어 있는 정보로 브라우저의 버전을ㄴ 제대로 구분할 수 없으므로 사용하지 말아야 합니다.

```js
// bed
export const isIE9AndBelow = (function () {
  const ua = window.navigator.userAgent.toLowerCase();
  const isIE =
    ua.indexOf("msie") != -1 ? parseInt(ua.split("msie")[1], 10) : false;
  return isIE && isIE <= 9;
})();
```

참고) UserAgent는 다음과 같은 문제가 있습니다.

- 특정 버전의 버그
- OS의 동작 차이
- 버전에 따른 동작 차이
- 사용자 에이전트에 따라 보여줄 콘텐츠 협상

---

해당 내용은 다음 글을 참고 하였습니다.

- https://www.w3schools.com/jsref/prop_doc_documentmode.asp
- https://d2.naver.com/helloworld/6532276
