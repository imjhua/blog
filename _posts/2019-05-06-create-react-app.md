---
layout: post
title: create-react-app와 redux 프로젝트
tags:
 - create-react-app
categories: React
---

## 소개
create-react-app 보일러플레이트(boilerplate)를 사용하여 간단한 애플리케이션을 시작 해 봅시다. 보일러플레이트란 반복되지만 자주쓰이는 형태를 자동해 놓은 것으로 다음고 같이 정의됩니다.

- 최소한의 변경으로 재사용할 수 있는 것
- 적은 수정만으로 여러 곳에 활용 가능한 코드, 문구
- 각종 문서에서 반복적으로 인용되는 문서의 한 부분

javaScript나 html에서의 보일러플레이트라고 하면 보통 크로스 브라우징과 호환성을 위한 Modernizr, polyfill, Normalize 등이 
적용되어 있는 템플릿 같은 형태로 많이 사용됩니다. 따라서 직접 webpack을 정의하여 애플리케이션 시작 코드를 작성하여도 되지만 페이스북에서 만든 리엑트 생성도구인 create-react-app 을 사용하면 복잡한 설정 없이 쉽게 프로젝트를 시작 할 수 있습니다.

## 설치

### create-react-app 설치 및 프로젝트 생성
글로벌로 설치 해 줍니다. 관련 문서는 https://facebook.github.io/create-react-app/docs/getting-started 를 참고 합니다. 
```sh
$ npm install -g create-react-app
```

바벨(babel)이나 웹팩(webpack) 설정을 자동으로 해줍니다. 설정을 오버라이드 할때는 직접 설정파일을 추가 하여야 하는데 이떄에는 eject 모듈을 이용히여 추가 하는 것을 권장하며 서버 포트는 기본으로 3000입니다.
```sh
$ create-react-app [PROJECT_NAME]
```

### redux패키지 설치 
view redux바인딩으로 컴포넌트에서 리덕스를 쉽게 연결 할 수 있습니다.
```sh
$ npm install -S redux react-redux
```


### 기본 디렉토리 구조
사용하지 않는 디렉토리는 정리하여도 좋습니다.

```
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

### redux 사용에 필요한 디렉토리 추가
다음 디렉토리를 추가 해 줍니다.

```sh
$ mkdir src/components src/actions src/reducers
```













## 






----
해당 내용은 다음 글을 참고 하였습니다.
- url