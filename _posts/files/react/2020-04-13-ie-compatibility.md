---
layout: post
title: IE 호환성
categories: React
categories: TODO
---
https://devhyun.com/blog/post/16

리엑트 개발환경은 기본적으로 Javascript ES6 이상의 문법을 사용합니다.
그러다 보니 구형 브라우저 특히 IE에서 흰색 화면을 맞이하게 됩니다.
react-app-polyfill, babel을 활용하면 이러한 문제를 해결할 수 있습니다 !

react-app-polyfill
리엑트 개발에서 사용하는 다양한 문법을 변환해주는 라이브러리입니다.
Promise, window.fetch, Symbol, Object.assign, Array.from + [ IE9 Map, Set ]와 같은 필요한 것만 포함하고 있어 사이즈가 작아 가벼운 게 특징이라 하네요.

설치해봅시다.

npm i react-app-polyfill
yarn add react-app-polyfill
프로젝트의 index.js 상단 부분에 라이브러리를 불러와 주세요.

// IE9의 경우
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

// IE11의 경우
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
stable은 package.json의 browserslist에 해당하는 브라우저에 대해 안정적인 코드를 사용할 수 있게 합니다.

간혹 적용되지 않는 경우 node_modules/.cache 폴더 삭제하고 다시 실행해보세요.

@babel/polyfill
제 프로젝트는 Promise가 아닌 async/await로 개발되어 있습니다. 일전에 Vue로 개발했을 때도 사용했던 라이브러리인데요, async, await, function*를 프로젝트에서 활용하는 경우 설치해야 합니다. 최근에 설치를 하려고 보니 아래와 같은 deprecated 메시지가 나오더군요.

This package has been deprecated in favor of separate inclusion of required parts of core-js and regenerator-runtime. See our website @babel/polyfill for more information.

그러면 바벨 공식 문서에서 확인해봅시다.

image.png

@babel/polyfill은 2가지 패키지로 구성되어있다고 하네요.
그럼 설치를 해볼까요.

npm install core-js regenerator-runtime
yarn add core-js regenerator-runtime
이제 index.js의 상단 부분에 import해주세요.

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
마치며
간단하게 React 프로젝트에서 IE 호환을 위한 처리를 정리해 보았습니다.
프론트엔드 개발을 하면서 가장 어려운 부분이 웹표준과 크로스 브라우징인것 같습니다. 항상 개발 결과를 확인할 땐 여러 브라우저에서 동일하게 의도대로 표현되고 있는지 꼭 확인해 주세요!


---

해당 내용은 다음 글을 참고 하였습니다.

- https://devhyun.com/blog/post/16