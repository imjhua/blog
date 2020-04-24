---
layout: post
title: Webpack entry point
categories: React
---


웹팩(Webpack)의 entry 속성을 정의하는 방법은 여러가지가 있습니다.

## Entry Point
웹팩의 엔트리 포인트는 라이브러리 간의 의존성을 그래프로 표현합니다. 이 그래프를 만들 떄의 시작점을 entry라는 옵션을 통해 설정합니다. 웹팩을 통해 애플리케이션을 번들링하고 빌드할때, 그 시작점을 설정하는 옵션입니다.

## 속성 정의

### 축약 구문
문자열과 배열을 통한 축약 구문을 사용하여 속성을 정의합니다.

```js
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```
entry point를 여러개 로드하여 적용하는 경우 배열을 사용하여 지정합니다. 

### 객체 구문
문자열 혹은 배열로 이루어진 축약구문을 객체 구문으로 표현하면 다음과 같습니다.

```js
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};

// 또는

module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js'
  }
};
```

## 멀티페이지 애플리케이션 
멀티페이지 애플리케이션을 정의할때 배열이 아닌, 여러개의 키를 가지는 객체로 Entry Point를 정의합니다. 이것은 각기 다른 완전히! 독립적인 분리된 의존성 그래프를 사용한다고 선언하는 것입니다.

### 사용하는 경우
각 엔트리포인트는 하나의 애플리케이션으로 동작하며 각 html은 정확히 하나의 엔트리포인트만을 사용하게 됩니다.

웹팩 공식문서에서는 하나의 진입 점(예 : 라이브러리)으로 애플리케이션 또는 도구에 대한 웹팩 구성을 신속하게 설정하려는 경우이 옵션을 선택하는 것이 좋다고 나와 있습니다. 

환경, 빌드 대상 및 런타임별로 우려 사항을 구분하는 데 사용합니다.

### 장점

애플리케이션 내부에서 수정되지 않은 필수 라이브러리 또는 파일 (예 : 부트 스트랩, jQuery, 이미지 등)을 가져올 수 있으며 자체 청크에 함께 번들됩니다. 컨텐츠 해시는 동일하게 유지되므로 브라우저가 개별적으로 캐시하여 로드 시간을 줄일 수 있는 장점이 있습니다.

## Webpack4 에서는..
webpack 버전 < 4에서는 별도의 진입 점으로 추가하여 별도의 파일로 컴파일하는 것이 일반적이었습니다 (CommonsChunkPlugin과 함께 사용).

그러나! webpack 4에서 권장하지 않습니다. 대신, optimization.splitChunks 옵션을 통해 애플리케이션 진입점과 모듈을 분리하고 별도의 파일을 작성합니다. 오로지 애플리케이션 실행 시작점에 대해서만 정의해야 합니다. (그외 기타 항목에 대한 항목을 작성하지 말라고 함)

참고) commons-chunk-plugin은 의존성 그래프에서 중복되는 코드들을 해결하는데 사용한다.

### optimization.splitChunks
optimization.splitChunks를 사용하면 각 페이지 사이에 공유 응용 프로그램의 코드의 중복을 없애고 묶음(chunk)을 만들 수 있습니다.

진입 점 사이에 많은 코드 / 모듈을 재사용하는 다중 페이지 응용 프로그램은 진입 점 수가 증가함에 따라 이러한 기술의 이점을 크게 활용할 수 있는 장점이 있습니다.

### 권장 사항 
바벨 공식 문서에 의하면.. 경험상, HTML 문서마다 정확히 하나의 진입 점을 사용해야 한다고 합니다.

---

해당 내용은 다음 글을 참고 하였습니다.
- https://webpack.js.org/concepts/entry-points/
- https://ibrahimovic.tistory.com/m/49
- https://jaeyeophan.github.io/2017/05/05/webpack-tutorial-1/