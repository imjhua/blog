---
layout: post
title: 하이퍼텍스트? 하이퍼스크립트 (HyperText? HyperScript)
categories: Programming
---

하이퍼텍스트? 하이퍼스크립트?라는 용어를 들어 보셨나요?

## 하이퍼텍스트

하이퍼텍스트라는 용어는 'hyper(초월한)'와 'text(문서)'의 합성어로, 1960년대 미국 철학자 '테드 넬슨(Ted Nelson)이 구상한 용어입니다. 이 용어를 현실화 하기 위해 재나두 프로젝트(Project Xanadu)를 진행하면서 세상의 모든 정보를 모아 서로 연계되고 이어지는 정보의 흐름을 만들자는 움직임은훗날 팀 버나스 리(Tim Berners-Lee)가 인터넷의 기반인 '월드 와이드 웹(WWW)'을 개발하는 데 큰 영향을 주었습니다. 이것이 바로 하이퍼텍스트입니다.

정리해보면, 하이퍼텍스트는 컴퓨터 디스플레이나 독자가 즉시 액세스 할 수 있는 다른 텍스트에 대한 참조(하이퍼 링크)가 있는 기타 전자 장치에 표시되는 텍스트를 말합니다. 하이퍼텍스트 문서는 일반적으로 마우스 클릭, 키 누르기 세트 또는 화면 터치에 의해 활성화되는 하이퍼 링크로 상호 연결되며 우리는 이러한 하이퍼링크들을 따라 다니며 문서를 이동하거나 페이지를 서비스하고 있는 정보들을 볼 수 있고 이것을 서핑 이라고 하지요.

## 하이퍼스크립트

하이퍼 스크립트는 HTML(HyperText Markup Languag)을 JavaScript 기반으로 표현한 것으로 하이퍼스크립트 실행시 순수한 DOM을 생성합니다.

### React - jsx

사용 예로, React에서는 JavaScript를 확장한 문법인 jsx를 사용하여 엘리먼트를 생성합니다. 눈으로 보기에는 (className 빼고) HTML과 비슷해 보입니다.

```js
// Using JSX
<div onClick={handleClick}>
  <h1 className="header">Hello</h1>
</div>;

// Using createElement()
createElement(
  "div",
  { onClick: handleClick },
  createElement("h1", { className: "header" }, "Hello")
);
```

createElement처럼 순수 DOM을 반환하는 스크립트를 하이퍼스크립트라고 합니다. jsx는 실제로 JSX는 많은 중첩 createElement()호출을 통해 엘리먼트를 생성합니다.

실제로, React와 같은 프레임워크는 DOM을 표현할때 가상 DOM을 사용하고 있기 때문에 하이퍼스크립트 또한 가상의 하이퍼스크립트를 사용하여 가상 virtual DOM을 반환합니다.

### Preact - h

하이퍼스크립트 h를 통해 생성된 hello는 순수한 DOM 일뿐입니다.

```js
var hello = h("div", "hello world ..!");
document.body.appendChild(hello);
```

참고) 마크업 언어(Markup Language)는 문서가 화면에 표시되는 형식을 나타내거나 데이터의 논리적인 구조를 명시하기 위한 규칙들을 정의한 언어이다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://ngrajblog.wordpress.com/2018/01/09/what-is-hyper-script/
- http://wiki.hash.kr/index.php/%ED%95%98%EC%9D%B4%ED%8D%BC%ED%85%8D%EC%8A%A4%ED%8A%B8
- https://m.blog.naver.com/PostView.nhn?blogId=marasyl&logNo=220250895696&proxyReferer=https:%2F%2Fwww.google.com%2F
