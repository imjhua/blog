---
layout: post
title: Webpack moduel
categories: React
---

웹팩(Webpack)은 모듈 번들러 입니다. 여러개의 나누어져 있는 파일들을 하나의 파일로 만들어 주는역할을 하는데, 이때 어떤 파일들을 어떻게 module화 할지를 나타내는 속성이 바로 module입니다. module 속성에 대해 알아봅니다.

## module

먼저, entry point를 통해 의존성그래프의 시작점을 설정하면 웹팩은 모든 자원을 모듈로 로딩한 후 output으로 묶어 줍니다. 이때, 웹팩은 모든 파일을 모듈로 관리합니다. 그러나 웹팩은 자바스크립트 밖에 알지 못합니다. 자바스크립트가 아닌(비 자바스크립트) 파일을 웹팩이 이해하게끔 변경해야하는 일을 module에 정의하여 웹팩이 알수 있는 자바스크립트 모듈을 만들어 줍니다.

```js
const config = {
  module: {
    rules: [
      {
        //...
      },
    ],
  },
};
```

### rules

rules에 각종 loader들을 등록할 수 있습니다. 배열의 형태로 여러 loader(전처리기)들을 등록합니다. 로더에 대해서는 다음에 바로 설명합니다.

```js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: "css-loader" },
      { test: /\.ts$/, use: "ts-loader" },
    ],
  },
};

// 또는

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // style-loader
          { loader: "style-loader" },
          // css-loader
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          // sass-loader
          { loader: "sass-loader" },
        ],
      },
    ],
  },
};
```

### 테스트

test를 통해 load할 파일을 지정하고, exclude와 include를 통해 path를 지정해줄 수 있습니다. 그리고 나서 사용할 module을 use를 통해 작성해 줍니다. use 안에는 loader와 options를 명시하여 loader에 대한 명세를 합니다. 이 options의 경우는 babel의 .babelrc파일로 따로 추출할 수 있습니다. config.js 파일이 과도하게 복잡해지는 것을 방지하기 위해서 loader에 대한 옵션은 따로 추출하는 것도 좋은 방법입니다.

### 로더

실제 비 자바스크립트들 jsx, css, font 혹은 ES6 js문법들을 웹팩 및 브라우저가 해석할 수 있도록 각각의 성격에 맞는 다양한 로더들을 적용하여 변환합니다.

하나의 loader당 하나의 Object로 추가합니다.

#### babel loader

자바스크립트의 ES5 문법을 사용하기 위해 먼저 babel을 통해 transpile을 해야 하는데 이 작업을 babel-loader를 통해 설정해줄 수 있습니다.

```js
const config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, "src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["env", { module: false }]],
            },
          },
        ],
      },
    ],
  },
};
```

로더로 babel-loader 하나만 추가하였는데, babel-loader를 사용하기 위해서는 babel-core, babel-loader, babel-preset-env 세 개의 모듈이 필요합니다. option으로 적용한 presets은 babel에게 어떤 부분에 대해 변환을 할것인지 알려줄때 필요한 plugin들의 집합체라고 할 수 있습니다. 다양한 preset들이 있는데 이중 babel-preset-env는 babel-preset-env는 모든 es6 기능을 컴파일할 모든 plugin들(es2015, es2016, es2017, latest)을 모아둔 것이라 할 수 잇습니다.

참고) babel-preset-env는 단순히 모든 es6 plugin을 설치하는 것 이상으로, 기본적으로는 오래된 브라우저에 제공하기 위한 아주 많은 양의 컴파일된 결과를 제공하는데, 여기서 중요한 것은 원하는 브라우저!만 지원가능하도록 plugin을 선택할 수 있는 기능도 포함하고 있다.

#### css loader

css load를 위해, css 파일을 자바스크립트로 변환합니다.

### sass loader

Sass를 CSS 로 변환합니다.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};
```

#### font

자바스크립트 파일 뿐만 아니라 이미지, 폰트, 스타일시트도 전부 모듈로 관리한다.

## 그리고 플러그인

로더로 각 모듈별로 바벨, 사스변환 등의 처리하고 이 결과를 플러그인이 받아 난독화, 텍스트 추출 등의 추가 작업을 합니다.

## presets

presets에서 { module: false }는 tree shaking을 사용하는 옵션으로 bundling 결과로부터 사용되지 않은 코드를 삭제하어 파일 크기를 줄여줍니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://webpack.js.org/concepts/modules/
- https://jaeyeophan.github.io/2017/05/05/webpack-tutorial-1/
