---
layout: post
title: 웹팩 기본설정
categories: JavaScript
categories: TODO
---


질문에 대한 답으로 Grunt, Gulp는 오로지 리소스들에 대한 툴로 사용되며 dependency graph에 대한 개념이 없습니다.
Browsify는 비슷한 도구이지만 속도면에서 webpack이 더 우월합니다.


출처: https://haviyj.tistory.com/17 [What do you want?]


http://jeonghwan-kim.github.io/js/2017/05/15/webpack.html

웹팩은 기본적으로 모듈 번들러다.

의존성 그래프에서 엔트리로 그래프의 시작점을 설정하면 웹팩은 모든 자원을 모듈로 로딩한 후 아웃풋으로 묶어준다. 로더로 각 모듈별로 바벨, 사스변환 등의 처리하고 이 결과를 플러그인이 받아 난독화, 텍스트 추출 등의 추가 작업을 한다.

명세 Manifest
어떤 파일들이 생성되어 졌는지 웹팩과 플러그인이 어떻게 “아는것” 처럼 보일까요? 모든 모듈이 어떻게 output 번들에 매핑되어 있는지 추적하는 웹팩의 manifest에 정답이 있습니다. 만약 웹팩의 output 관리 방식의 다른 방법을 알고 싶다면, manifest로 시작하는 것이 좋습니다.

  

manifest 데이터는 WebpackManifestPlugin을 통해 쉽게 사용 가능한 json으로 읽을 수 있습니다.



프로젝트에서 어떻게 이 플러그인을 사용하는지에 대한 모든 예제를 다뤄보지는 않을 것이지만, the concept page 와 caching guide를 통해 장기적인 캐싱과 어떻게 관련되어 있는지 확인할 수 있습니다.



출처: https://ibrahimovic.tistory.com/45 [Web Standard]


entry point 중 하나의 이름을 바꾸거나 추가하면 어떻게 될까요? 생성되는 번들의 이름은 바뀌겠지만, index.html에 명시된 js는 예전 파일명 그대로 일 것입니다. HtmlWebpackPlugin을 사용해서 수정해봅시다.





출처: https://ibrahimovic.tistory.com/45 [Web Standard]

따로 분리하여 bundle한 css파일과 js파일을 각각 html 파일에 link 태그와 script태그로 추가해줘야 합니다.

HtmlWebpackPlugin플러그인은 이것을 자동화해줍니다.

 

npm install --save-dev html-webpack-plugin

 
babel-loader는 webpack이 .js 파일들에 대해 babel을 실행하도록 만들어주고, babel-core는 babel이 실제 동작하는 코드이고, babel-preset-env는 babel이 동작할 때 지원범위가 어느정도까지 되어야 하는지에 대해 지정하도록 만들어주는 패키지입니다.

이렇게 설치를 진행하고 나면 Babel과 Webpack을 사용할 준비를 마친셈입니다.

NOTE: package.json뿐 아니라 package-lock.json파일도 함께 생길수 있습니다. 이 파일은 npm패키지들이 각각 수많은 의존성을 가지고 있기 때문에 의존성 패키지들을 다운받는 URL을babel-loader
가장 간간한 예가 바벨이다. ES6에서 ES5로 변환할 때 바벨을 사용할수 있는데 test에 ES6로 작성한 자바스크립트 파일을 지정하고, use에 이를 변환할 바벨 로더를 설정한다.

마침 위 코드를 ES6로 작성했으니 로더를 이용해 ES5으로 변환해 보겠다.

webpack.config.js:
 미리 모아둬 다른 컴퓨터에서 package.json을 통해 npm install로 패키지들을 설치시 훨씬 빠른 속도로 패키지를 받을 수 있도록 도와줍니다.

이제 설정파일 몇개를 만들고 수정해줘야 해요.

https://firejune.com/1798/%EC%B4%88%EB%B3%B4%EC%9E%90%EC%9A%A9+Webpack+%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC+%ED%8C%8C%ED%8A%B81+-+Webpack+%EC%9E%85%EB%AC%B8



css-loader, style-loader
예제를 하나더 살펴보자. 웹팩은 모든 것을 모듈로 다루기 때문에 CSS 파일을 자바스크립트로 변환해서 로딩해야 한다. css-loader가 그런 역할을 하는 로더이다.

css-loader를 적용한 뒤 번들링하면 다음처럼 CSS 코드가 자바스크립트로 변환된 것을 확인할 수 있다.

dist/bundle.js:

// module
exports.push([module.i, "body {\n  background-color: green;\n}\n", ""]);

이렇게 모듈로 변경된 스타일 시트는 돔에 추가되어야만 브라우져가 해석할수 있다. style-loader는 자바스크립트로 변경된 스타일시트를 동적으로 돔에 추가하는 로더이다. 보통 CSS를 번들링하기 위해서는 css-loader, style-loader를 함께 사용한다.


웹팩 플러그인?? 종류??

https://medium.com/@chullino/%EC%9B%B9%ED%8C%A9-2-4-%EA%B8%B0%EB%8A%A5-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-2d07ce76fade

https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html


----
해당 내용은 다음 글을 참고 하였습니다.
- https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html