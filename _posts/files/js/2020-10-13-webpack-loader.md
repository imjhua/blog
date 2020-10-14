---
layout: post
title: webpack 설정
categories: JavaScript
---

웹팩에 대한 기본지식이 있는 전재로 정리하는 글 입니다.

## webpack 플러그인

### React

- react: 리액트를 사용하기 위하 필수 라이브러리 입니다.
- react-dom: 리액트 라이브러리 입니다. 브라우저를 위한 DOM 메소드를 제공합니다.
- react-router-dom: 브라우저를 위한 라우팅 기능을 제공합니다.

### Babel

바벨은 ES6/ES7 코드를 ES5 코드로 트랜스파일링 하기 위한 도구입니다.

- @babel/core: 바벨을 사용하기 위한 필수 라이브러리입니다.
- @babel-polyfill: ES2015의 새로운 객체와 메소드를 사용할 수 있도록 도와줍니다.
- @babel/preset-env: 최신 자바스크립트 기능을 ES5로 트랜스파일 해주는 라이브러리입니다.
- @babel/preset-react: 리액트 환경(JSX)을 위한 라이브러리입니다.
- @babel/plugin-proposal-class-properties: 클래스 프로퍼티를 사용할 수 있도록 도와주는 바벨 플러그인입니다.
- @babel-loader: 바벨과 웹팩을 이용해 자바스크립트 파일을 트랜스파일링 합니다.

참고) 바벨 7버전부터 사용 가능한 라이브러리입니다. 바벨 7버전 아래의 경우 stage-0, stage-1, stage-2, stage-3을 설치하여 트랜스파일 해줘야합니다.

### 그외

- html-webpack-plugin: 웹팩 번들에 html파일을 제공하는 웹팩 라이브러리입니다.
- css-loader: css 파일을 import 또는 require할 수 있도록 도와주는 웹팩 라이브러리입니다.
- style-loader: 읽은 css파일을 style태그로 만들어 head태그에 삽입해주는 웹팩 라이브러리입니다.

### 웹팩

- webpack: 웹팩을 사용하기 위한 필수 라이브러리입니다.
- webpack-cli: 웹팩 커맨드라인 인터페이스 라이브러리입니다.
- webpack-dev-server: 웹팩 개발서버 라이브러리입니다.

## preset

https://velog.io/@pop8682/%EB%B2%88%EC%97%AD-%EC%99%9C-babel-preset%EC%9D%B4-%ED%95%84%EC%9A%94%ED%95%98%EA%B3%A0-%EC%99%9C-%ED%95%84%EC%9A%94%ED%95%9C%EA%B0%80-yhk03drm7q

## 예

바벨설정파일에 babel plugin들을 모아놓고 사용합니다.

```js
// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 3 versions", "not ie <= 8"],
        },
        modules: "commonjs",
      },
    ],
    [
      "@babel/preset-typescript",
      {
        isTSX: true,
        allExtensions: true,
        jsxPragma: "h",
      },
    ],
  ],
  plugins: [
    [
      "@babel/transform-react-jsx",
      {
        pragma: "h",
      },
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime",
  ],
};
```

---

해당 내용은 다음 글을 참고 하였습니다.

- https://velog.io/@padakim/Webpack4-for-React-%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A5%BC-%EC%9C%84%ED%95%9C-%EC%9B%B9%ED%8C%A94-1-
- https://velog.io/@pop8682/%EB%B2%88%EC%97%AD-React-webpack-%EC%84%A4%EC%A0%95-%EC%B2%98%EC%9D%8C%EB%B6%80%ED%84%B0-%ED%95%B4%EB%B3%B4%EA%B8%B0
