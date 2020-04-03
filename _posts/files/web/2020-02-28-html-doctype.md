---
layout: post
title: HTML DOCTYPE선언
categories: Web
---

DOCTYPE선언은 어떤 버전의 HTML문서로 작성했는지 브라우저에게 알려주는 것으로 웹브라우저가 내용을 올바르게 출력하도록 도와줍니다. DOCTYPE 선언은 HTML 태그는 아니지만, 선언된 페이지의 HTML 버전이 무엇인지를 웹 브라우저에 알려주는 역할을 하는 선언문으로, 대소문자를 구분하지 않습니다. DOCTYPE선언을 하면 표준 모드로 작동되고 선언하지 않으면 호환모드로 작동해 의도와 다르게 표시될 수 있습니다.

## 문서 형식 선언

HTML 문서의 규격 판 번호를 명시하는 데서 흔히 볼 수 있습니다. 웹 브라우저는 문서 형식 선언이 없는 HTML 문서를 쿼크 모드로 렌더링하지만 문서 형식 선언이 있는 HTML 문서를 표준 모드로 렌더링하기 때문에, 문서 형식 선언을 이용해서 어떤 웹 페이지가 모든 웹 브라우저에서 같은 레이아웃으로 제공되도록 할 수 있습니다. 한편 HTML5은 구조적으로 SGML과 호환될 수 없습니다. 따라서 HTML5로 구성된 문서에서 문서 형식 선언은 불필요하지만, 웹 브라우저들의 표준 모드를 활성화하기 위해 최소한의 형태로 유지되었습니다.

참고) SGML(Standard Generalized Markup Language)? 문서용 마크업 언어를 정의하기 위한 메타 언어이다.

## HTML5에서의 선언

HTML 4.01에서 DOCTYPE 선언은 SGML을 기반으로 하기 때문에 문서형정의(DTD:Document Type Definition)를 참조해야 합니다. DTD는 브라우저가 콘텐츠를 정확하게 표현하도록 마크업 언어에 대한 규칙을 명시합니다. 하지만 HTML5는 SGML을 기반으로 하지 않기 때문에 DTD를 참조할 필요가 없습니다. 따라서 다음과 같이 HTML5 이전버전들은 DOCTYPE선언이 꽤 길었지만 HTML5로 넘어오면서 많이 짧아졌습니다.

```html
// html5이전
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

// html5
<!DOCTYPE html>
```

DOCTYPE 선언은 선택적이지만 하위 호환성을 위해 위와 같이 사용하는 것이 추천됩니다.

### HTML5이전에 사용되던 예

- HTML 4.01 Strict

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

- HTML 4.01 Transitional

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

- HTML 4.01 Frameset

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

- XHTML 1.0 Strict

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

- XHTML 1.0 Transitional

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

- XHTML 1.0 Frameset

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

- XHTML 1.1

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
```

### 문서형 정의(DTD:Document Type Definition)

문서형 정의(DTD:Document Type Definition)은 HTML5, XHTML, HTML의 세가지 문서 유형이 존재하며, 기술한 유형에 따라 마크업 문서의 요소와 속성등을 처리하는 기준이 되며 유효성 검사에 이용됩니다. 이전 버전의 HTML(HTML2~HTML4)은 SGML(Standard Generalized Markup Language)에 기반을 두어 만들어졌기 때문에 DTD 참조가 필요하며, 이 때문에 DOCTYPE 선언을 하려면 공개 식별자와 시스템 식별자가 포함된 긴 문자열을 작성해야 합니다.

HTML과 XHTML은 각 버전에서 사용 가능한 태그나 속성 등을 DTD로 상세히 정의한다. DTD는 XML 문서들의 클래스에 논리적인 구조를 강요하는 법칙입니다. 따라서 DTD는 모든 적법한 마크업을 쓰고 마크업이 문서에 포함될 수 있는 장소와 그 방법을 지정한다. 이런 요소 구문 또는 문법은 요소와 그들의 속성의 의미를 정의합니다.

## 결론

DOCTYPE선언은 어떤 버전의 HTML문서로 작성했는지 브라우저에게 알려줍니다. DOCTYPE 선언은 HTML 문서에서 <html> 태그를 정의하기 전에 가장 먼저 선언되어야만 합니다. DOCTYPE 선언은 HTML 문서 제일 첫줄에 작성합니다. HTML(HTML2~HTML4)은 SGML(Standard Generalized Markup Language)에 기반을 두어 만들어졌기 때문에 DTD 참조가 필요하였으나 HTML5로 넘어오면서 간단해 졌습니다.

---

해당 내용은 다음 글을 참고 하였습니다.
- https://ko.wikipedia.org/wiki/%EB%AC%B8%EC%84%9C_%ED%98%95%EC%8B%9D_%EC%84%A0%EC%96%B8
- http://tcpschool.com/html-tags/doctype
- https://webdir.tistory.com/40
