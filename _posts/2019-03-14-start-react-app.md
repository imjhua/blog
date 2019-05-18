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
실시간 react 컴포넌트를 변경하기 위해 webpack.config 에 reate-hot-loader 모듈을 추가하여 사용하겠습니다. 적용 후에 서버를 재 시작 하여 확인 합니다. https://github.com/gaearon/react-hot-loader 를 참고 할 수 있습니다. 이떄 주의점은 리로딩시 컴포넌트의 construcor는 변경되지 않으므로 직접 새로고침 하여야 합니다.

```js

            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ['react-hot-loader/babel']
            }
```

### 컴포넌트에 이벤트 연결하기
다음처럼 컴포넌트 렌더 부분에서 Change이벤트에 메소드를 연결하고자 합니다.
```js

export default class Contact extends React.Component {
    constructor(props) {
        ...
    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    render(){
        return(
            <input
                name="keyword"
                placeholder="search"
                value={this.state.keyword}
                onChange={this.handleChange}
            />
        )
    }
}
```

참고) 만약 handleChange 메소드가 파라미터를 받는다면 arrow function을 이용하여 실행시켜주어야 합니다.
```js
    onChange={() => {
      this.handleChange(i);
    }}
```


render() 메소드가 handleChange 부를 때 여기서는 메소드를 호출한 것이 아니라 함수를 호출한것입니다. 메소드란 ‘property의 값인 함수(function)’ 즉, Contact 객체 내에서 정의된 함수를 의미하는 단어입니다. (특히 Jacascript의 method에서 this는 method가 속한 객체를 의미합니다.) 따라서 onChange에 연결된 this.handleChange의 this는 this가 무엇을 가리키는지 정확히 정의되지 않았기때문에 바인딩을 통해 관계를 설정해주어야 할 필요가 있습니다. bind를 사용하여 this를 알려주도록 합니다. bind에서 오타가 있을 경우, 해당 함수에서는 state값을 읽지 못하는 경우가 있으니 해메지 말고 오타를 확인하도록 합니다.

- render() 안에서 바인딩: onChange={ this.handleChange.bind( this ) }
- constructor() 안에서 바인딩(추천): this.handleChange.bind(this);

```js
export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            contactData: [
                { name: "A", phone: "0" },
                { name: "B", phone: "1" },
                { name: "C", phone: "2" },
                { name: "D", phone: "3" }
            ]
        };

        this.handleChange = this.handleChange.bind(this);
    }
     handleChange(e) {
        ...
    }

    render(){
        ...
    }
}
```

### 포커스 이벤트 추가 하기
html에 정의된 Input의 ref속성을 이용하여 다음과 같이 포커스 이벤트를 추가 할 수 있습니다. ref는 리엑트에서 DOM에 직접적인 접근을 하는 경우 사용합니다. 직접접근의 경우는 다음과 같은 때가 있습니다.
- input / textarea 등에 포커스를 해야 할때
- 특정 DOM 의 크기를 가져와야 할 때
- 특정 DOM 에서 스크롤 위치를 가져오거나 설정을 해야 할 때
- 외부 라이브러리 (플레이어, 차트, 캐로절 등) 을 사용 할 때

레퍼런스는 전체 컴포넌트 중 하나의 node, element를 선택하는 방법입니다. document.getElementBbyId()랑 같은 방법입니다. 이경우 ref 속성을 사용하므로써 input 엘리먼트에 직접적으로 접근 할수 있게 되었습니다.

```html

        <input
          type="text"
          name="name"
          palceholder="name"
          value={this.state.name}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          ref={ref => (this.focusTextInput = ref)}
        />
```

```js
  handleClick() {
    const contact = {
      name: this.state.name,
      phone: this.state.phone
    };
    this.props.onCreate(contact);
    this.setState({
      name: "",
      phone: ""
    });

    this.focusTextInput.focus();
  }
```

다른 컴포넌트끼리 직접 데이터를 전달하는것은 ref 를 사용할 수 있지만 상태가 꼬이는 문제가 발생하여 관리가 어려워지므로 가급적 지양 하여야 합니다. 그외 https://reactjs.org/docs/refs-and-the-dom.html 에서 좀더 자세한 내용을 확인 할 수 있습니다.

그 대신에, 컴포넌트들은 부모를 통하여 대화를 하도록 합시다!


### KeyPress 이벤트 추가 하기
이벤트의 charCode나 Key값으로 엔터키를 캐치하여 핸들링할수 있습니다.

```js
  handleKeyPress(e) {
    if (e.charCode === 13) {
      this.handleClick();
    }
  }


  handleKeyPress=(e)=>{
    if(e.key === 'Enter'){
      this.handleCraete();
    }
  }
```



----
해당 내용은 다음 글을 참고 하였습니다.
- https://velopert.com/1174
- https://wonong.wordpress.com/2016/05/17/javascript-functionmethodproperty-%EC%9D%98-%EC%B0%A8%EC%9D%B4-%EB%B0%8F-%EC%A0%95%EC%9D%98/