---
layout: post
title: IE11에서 실행하기 (호환성)
categories: React
---

ES6이상의 문법이 사용되는 React개발환경은 구형브라우저에서는 동작하지 않는 문제가 발생합니다. 크게 2가지 원인이 있는데 그 원인과 해결안에 대해 알아봅니다. 구형브라우저, 특히 IE에서의 React를 실행할수 있는 방법들에 대해 정리해 보겠습니다. (해당글은 IE11기준으로 설명합니다.)


## 구형브라우저에서 동작하지 않는 이유는?
구형브라우저에서 React가 동작하지 않는 문제는 크게 2가지로 말할 수 있습니다.
- React에서 사용되는 JS ES6이상의 문법을 해석하지 못하는 경우
- 특정 기능이 지원되지 않는 경우

### ES6이상의 문법을 해석하지 못하는 경우
브라우저별 자바스크립트의 지원 문법이 다릅니다. 이말인 즉슨 모든 브라우저가 리엑트개발에 사용되는 ES6문법을 알 수 없다는 말입니다. 브라우저가 스크립트 문법자체를 모르면 해석이 중단되고 화면이 렌더링되지 않는 백화현상이 발생하게 됩니다. 

참고) ES6++ 브라우저별 지원 현황: https://kangax.github.io/compat-table/es6/

#### 대안
Babel은 자바스크립트 컴파일러로 최신 자바스크립트(ES6++)를 브라우저가 알고 있는 자바스크립트로 변환할 수 있습니다. 그렇게 되면 브라우저가 스크립트를 해석 할 수 있게 됩니다.

### 특정 기능이 지원되지 않는 경우
W3C트서는 제시하기는 표준 웹 기술(HTML5, CSS)들이 있습니다. 그러나 대부분 표준을 따르지만, 구형 브라우저에서는 웹 표준이 완벽하지 않아 여러가지 다양한 호환성 문제가 발생하고 있습니다. 

참고) W3C(영어: World Wide Web Consortium, 축약형은 영어: WWW 또는 W3)는 월드 와이드 웹을 위한 표준을 개발하고 장려하는 조직. 설립 목적은 웹의 지속적인 성장을 도모하는 프로토콜과 가이드라인을 개발하여 월드 와이드 웹의 모든 잠재력을 이끌어 내는 것이다.

#### 대응
폴리필(polyfill)은 개발자가 특정 기능이 지원되지 않는 브라우저를 위해 사용할 수 있는 코드 조각이나 플러그인을 말합니다. 폴리필을 사용하면 HTML5 및 CSS3와 오래된 브라우저 사이의 간격을 메꿀 수 있습니다.

참고) 그외 대안
- 크로스브라우징: 한쪽에 치우지지 않고 공통 요소를 사용하여 웹 페이지를 제작하는 기법
- 사용자의 사용환경을 파악(유저 에이전트)하여 그에 맞는 컨첸츠 제공


## IE11 미지원기능 & 기능 지원

대표적으로 IE11에서 지원하고 있지 못한 기능들(WEB API 와 ES6이상의 기능들)은 다음과 같습니다. 

- Promise
- window.fetch
- Symbol
- Object.assign
- Array.from + [ IE9 Map, Set ]


## IE11 에서 동작하게 하기
구형브라우저 IE11이 최신 문법을 적용하게 하기 위해 react-app-polyfill 또는 babel/polyfill 를 사용합니다. 

### react-app-polyfill
리엑트 개발에서 사용하는 다양한 문법을 변환해주는 라이브러리입니다. 다음과 같은 기능들을 지원합니다. 필요한 최소한의 기능들만 포함하고 있어 사이즈가 작아 가벼운게 특징입니다.

- Promise
- window.fetch
- Symbol
- Object.assign
- Array.from + [ IE9 Map, Set ]

#### 적용
엔트리 포인트가 되는 index.js 상단 부분에 라이브러리를 불러옵니다.


```js
// IE9의 경우
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

// IE11의 경우
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
```

참고) stable은 package.json의 browserslist에 해당하는 브라우저에 대해 안정적인 코드를 사용할 수 있게 합니다.

문제해결) 간혹 적용되지 않는 경우 node_modules/.cache 폴더 삭제하고 다시 실행해보세요.

### babel/polyfill
babel만으로는 es6의 내장메소드(ex: Array.includes)는 대체 불가합니다. 또 react-app-polyfill 은 ES8문법인 async/await 와 function* 등의 polyfill을 제공하지 않습니다. 이를 지원하기 위해서 babel/polyfill을 사용합니다. babe-polyfill 공식문서에는 "완전한 ES2015 + 환경에 필요한 폴리 필 제공" 이라고 소개되어 있습니다.

참고) https://babeljs.io/docs/en/babel-polyfill


#### 적용
적용하기전 babel/polyfill 의 버전(현재 기준 최신버전 7.8.7)을 먼저 확인해야 합니다. 이유는 다음과 같습니다.

```
Babel 7.4.0부터이 패키지는 core-js / stable (ECMAScript 기능을 polyfill하기 위해)과 regenerator-runtime / runtime (변환 된 생성기 함수를 사용해야 함)을 직접 포함하여 더 이상 사용되지 않습니다.
```

이말인 즉슨, 이 패키지는 core-js 및 regenerator-runtime의 필수 부분을 별도로 포함하기 위해 사용되지 않는다는 것입니다. 따라서 우리는 babel/polyfill은 deprecated 되었고 사용되는 두가지 모듈을 직접 사용해 보겠습니다.

참고) react-app-polyfill 에서 async & awit / generator가 지원되지 않았던 것처럼, core-js 또한 fetch를 지원하지 않는 것처럼 완벽히 모든것을 제공하지는 않습니다. 서로 상호보완적으로 사용해야 합니다.
https://github.com/zloirock/core-js#missing-polyfills

```js
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
```

## 전역에 추가하거나 & 플러그인을 사용하여 스코프를 제한하거나

### 전역에 폴리필 추가하기 (전역 오염 O)
winodw객체의 속성으로 모듈이 로드되기 때문에 각기 다른 모듈을 공유하는데 제약이 없는 문제가 있습니다. 파일을 독립적으로 존재하지 못하게 되면 같은 이름의 변수를 사용하거나 스코프가 전역으로 설정되는 문제가 발생할 수 있습니다.

```js
<script src="https://unpkg.com/core-js-bundle@3.1.4/index.js"></script>
<script src="https://unpkg.com/regenerator-runtime@0.13.3/runtime.js"></script>
```

### Webpack 번들에 포함하고 전역에 폴리필 추가하기 (전역 오염 O)
모듈로 로드하여 모듈의 의존성 및 스코프를 제한합니다.

```sh
$ npm install --save core-js regenerator-runtime
```

```js
import "core-js/stable";
import "regenerator-runtime/runtime";
```

### Webpack 번들에 포함하고 번들 내부에 가두기 (전역 오염 X)

의존 모듈 설치 후 Webpack Config에 아래와 같이 Plugins 설정을 추가합니다.

```sh
$ npm install --save-dev @babel/plugin-transform-runtime
$ npm install --save @babel/runtime @babel/runtime-corejs3
```

```js
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 3,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```


---

해당 내용은 다음 글을 참고 하였습니다.

- https://devhyun.com/blog/post/16
- https://okchangwon.tistory.com/3