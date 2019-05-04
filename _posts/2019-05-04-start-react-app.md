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
$ npm init
```

### 리엑트 설치
save 옵션을 함께 적용 하여 package.json 에 의존 패키지들을 추가 할 수 있습니다.

```sh
$ npm install -S react react-dom
```

### 개발 의존 모듈 설치
```sh
$ npm install -D babel-core babel-loader babel-preset-es2015 babel-preset-react
$ npm install -D react-hot-loader webpack webpack-dev-server
```


해당 내용은 다음 글을 참고 하였습니다.
- url