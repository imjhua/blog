---
layout: post
title: React 프로젝트 시작하기 
tags:
 - react
categories: React
---

## 소개
리엑트 애플리케이션을 만들어 봅시다. 작업환경 셋업부터 프로젝트 생성 및 코딩까지 진행할 것입니다.

## 리엑트 작업 환경 설정
Nodejs 환경에서 리엑트를 사용해 볼 것입니다. npm을 통해 글로벌 패키지를 설치 합니다.

```sh
$ npm install -g babel webpack webpack-dev-server
```

- babel: 아직 ECMAScript6 를 지원하지 않는 환경에서 ECMAScript6 Syntax를 사용 할 수 있게 해줍니다.
- webpack: 모듈 번들러로서, Browserify 처럼 브라우저 위에서 import (require) 을 할 수 있게 해주고 자바스크립트 파일들을 하나로 합쳐줍니다.
- webpack-dev-server: wepback에서 지원하는 간단한 개발서버로서 별도의 서버를 구축하지 않고도 웹서버를 열 수 있으며 hot-loader를 통하여 코드가 수정될때마다 자동으로 리로드 되게 할 수 있습니다.

### 프로젝트 생성
루트 디렉토리 생성 후 노드 프로젝트를 생성합니다.
```sh
$ mkdir [REACT_APP_DIR_NAME] && cd [REACT_APP_DIR_NAME]
$ npm init -y
```

### 리엑트 설치
save 옵션을 함께 적용 하여 package.json 에 의존 패키지들을 추가 할 수 있습니다.

```sh
$ npm install -S react react-dom
```

### 개발 의존 모듈 설치
webpack 버전 관련 babel 의존성버전은 아래 페이지를 참고 합니다.
- https://webpack.js.org/loaders/babel-loader/

```sh
$ npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react
$ npm install -D react-hot-loader webpack webpack-dev-server webpack-cli
```

### 설치된 패키지 목록 확인
```sh
$ cat package.json
```

### 디렉토리 생성 및 기본 구조
다음과 같이 하위 디렉토리를 생성합니다.
```sh
$ mkdir src src/components public && touch public/index.html src/components/App.js src/index.js webpack.config.js
```

디렉토리 구조는 다음과 같습니다.
```
├── package.json         
├── public            # 서버 public path
│   └── index.html    # 메인 페이지
├── src               # React.js 프로젝트 루트
│   ├── components    # 컴포넌트 폴더
│   │   └── App.js    # App 컴포넌트
│   └── index.js      # Webpack Entry point
└── webpack.config.js # Webpack 설정파일
```

### webpack 설정
```js
var webpack = require('webpack');

module.exports ={
    entry: './src/index.js',
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 7777,
        contentBase: __dirname + '/public/'
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
              // plugins: ['@babel/plugin-transform-runtime']
            }
          }
        }
      ]
    }
}
```

웹팩 설정 디버깅 
```sh
$ webpack --debug webpack.config.js
```

### index.html
```html
<!DOCTYPE html>
<html>

   <head>
      <meta charset="UTF-8">
      <title>React App</title>
   </head>

   <body>
      <div id="root"></div>
      <script src="bundle.js"></script>
   </body>

</html>
```

### package.json
npm 스크립트를 추가해줍니다.
```js
  "scripts": {
    "start": "webpack-dev-server --hot --host 0.0.0.0"
  },
```

### 웹팩 데브 서버 시작
```js
$ npm start
```


### HMR(Hot Module Replacement)의 문제점
webpack-dev-server에서 제공하는 Hot Module Replacement 기능은 변경된 내용이 있는 경우 페이지를 새로 고침하지 않고 변경된 부분만 업데이트 해 주는 기능입니다. 어떠한 상황에 변경사항을 적용해야 하는지 index.js파일에 다음 내용을 추가 해줍니다.

```js
# index.js
if(module.hot){module.hot.accept();}
```

그러나, 이 모듈은 리로딩 될때 로컬 스테이트를 유지 하지 않고 날려버린다는 문제가 존재합니다. (아주 치명적입니다)

### react-hot-loader로 대체 하기
실시간 react 컴포넌트를 변경하기 위해 webpack.config 에 reate-hot-loader 모듈을 추가하여 사용하겠습니다. 적용 후에 서버를 재 시작 하여 확인 합니다. https://github.com/gaearon/react-hot-loader 를 참고 할 수 있습니다.

```js

            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ['react-hot-loader/babel']
            }
```



----
해당 내용은 다음 글을 참고 하였습니다.
- url