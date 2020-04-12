---
layout: post
title: Nodejs버전 업데이트 하기
categories: Programming
---

nodejs 버전을 업데이트를 해 봅시다.

## node 최초 설치

참고) macOS기준으로 작성되어 있습니다.

```sh
$ brew update
$ brew uninstall node
$ brew install node
$ npm install -g node-gyp
$ brew postinstall
```

## 따라하기

### node 버전 업데이트

#### 현재 버전 확인

```sh
$ node -v
```

#### 강제로 캐시 삭제

```sh
$ sudo npm cache clean -f
```

#### n 모듈 설치

```sh
$ sudo npm install -g n
```

#### n 모듈사용

n 모듈을 사용하여 Nodejs 설치 (다른 버전의 Node.js 를 설치하려면 sudo n 5.11.0 이런식으로 명령어를 입력하면 됩니다)

```sh
$ sudo n stable
```

#### 버전 확인

```sh
$ node -v
```

### npm 버전 업데이트

#### 버전 확인

```sh
$ npm -v
```

#### npm으로 npm 설치 하기

```sh
$ sudo npm install -g npm
```

#### 버전 확인

```sh
$ npm -v
```

---

해당 내용은 다음 글을 참고 하였습니다.

- https://velopert.com/1351
