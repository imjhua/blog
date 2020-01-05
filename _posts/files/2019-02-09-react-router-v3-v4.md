---
layout: post
title: React Router v3와 v4 비교
categories: React
---

react-router v4 가 릴리즈 되면서 라우팅 적용 방식이 바뀌었습니다. 이전버전(v3)까지는 일반적으로 사용하는 정적 라우팅(Static Routing)이였다면, 동적 라우팅(Dynamic Routing)이 적용되었습니다.

## 정적 라우팅(v3) vs 동적 라우팅(v4)

### 정적 라우팅
일반적으로 최상위 페이지에 라우팅 정보를 모두 기입해 두고, 특정 패스가 브라우저에 입력되었을 때 해당되는 컴포넌트를 그려주는 방식을 말합니다. 모든 라우팅 정보가 한곳에 위치하기 때문에 관리하기 쉽다는 장점이 있겠지만, 정적이라는 특징 때문에 확장성과 재사용성은 떨어질 수 있습니다. 

### 동적 라우팅
라우팅 정보를 한곳에 모아둘 필요가 없습니다. 라우팅이 필요한 컴포넌트에 직접 붙여 사용할 수 있기 때문에 동적으로 컴포넌트를 구성하는데 더 효율적이라 할 수 있습니다.

## React Router v3와 v4
두 버전의 차이점을 간단하게 살펴보면 다음과 같습니다.

| v3	| v4 |
|-----|----| 
| 모듈 | react-router | react-router, react-router-dom, react-router-native |
| 라우팅	| 정적(static) 라우팅	| 동적(dynamic) 라우팅 |
| Route 컴포넌트	| 라우트 정보를 프로젝트 최상단에 모두 정의	코드 어디에나 사용 가능 |
| 계층구조	라우트 정보를 계층구조로 표현	계층구조 대신 렌더링 되는 컴포넌트에 직접 구현 (계층구조 표현 안됨) |
| 히스토리	| browserHistory 에 저장하여 Router 객체에 props 로 삽입	| BrowserRouter 객체에 내장

### React Router v3


react-router v3 는 정적 라우팅을 사용하기 때문에 미리 라우팅 정보를 탑 레벨에서 모두 정해두고 시작합니다. react-router 는 계층구조로 설정할 수가 있는데, 최상위에 Router 컴포넌트를 만들고 Route(실제 패스에 따라 컴포넌트를 교체해주는 역할) 컴포넌트를 아래에 만듭니다. 그리고 또 그 아래에 IndexRoute가 있고 여러개의 Route 컴포넌트가 존재합니다. 어떤 url 이 브라우저에 입력되면(또는 앵커 태그가 클릭되면), 각 라우터에 해당하는 컴포넌트가 렌더링 되는 구조입니다.

라우터의 히스토리는 browserHistory 에 저장해 둡니다. 그래야 브라우저에서 뒤로가기를 했을때 이전 페이지를 불러올 수 있기 때문이죠.

#### 라우팅 구현 코드 
모든 라우팅 정보가 한곳에 위치하고 있습니다. 따라서 라우트 정보를 계층구조로 표현됩니다. IndexRoute가 있고 여러개의 Route 컴포넌트가 존재합니다. third 뒤의 :id 부분은 컴포넌트의 this.props.params.id 형태로 전달되어 컴포넌트 내에서 사용할 수 있습니다.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App, { Home, First, Second, Third, Item } from './App.js'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="first" component={First} />
      <Route path="second" component={Second} />
      <Route path="third/" component={Third}>
        <Route path=":id" component={Item} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
)
```

#### 공통으로 사용되는 컴포넌트
공통으로 사용하는 컴포넌트를 붙여주기 위해 App.js를 다음과 같이 작성합니다. 
```js
import React, { Component } from 'react'
import Header from './Header.js'
import { Link } from 'react-router'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}
```



#### 라우트 컴포넌트 렌더링 
어떤 url 이 브라우저에 입력되면(또는 앵커 태그가 클릭되면), 각 라우터에 해당하는 컴포넌트가 렌더링 되는 구조입니다.

Third 부분이 v4 와 다른부분인데 컴포넌트 내에서 직접 라우팅 정보를 지정할 수 없기 때문에, 우회하는 방법으로 this.props.children 컴포넌트가 있는지 여부에 따라서 어떻게 렌더링할지를 결정합니다.

```js

export class Third extends Component {
  render() {
    console.dir(this.props)
    return (
      <div>
        <Link to={'/third/1'}>
          1번
        </Link>
        <Link to={'/third/2'}>2번</Link>
        {this.props.children ? (
          this.props.children
        ) : (
          <div>
            <h3>id를 선택해 주세요.</h3>
          </div>
        )}
      </div>
    )
  }
}
```
### React Router v4
v4에서는 react-router 는 코어 모듈에 react-router-dom, react-router-native 등이 추가되었습니다. react-router-dom 은 react-router 모듈에 dom 이 바인딩 되어 있는 구조 입니다. 개발자들을 위한 모듈이고 react-router-native 는 이름에서도 알 수 있듯이 react-native 를 개발할 때 사용하는 모듈입니다.


#### 라우팅 구현 코드 
컴포넌트에 히스토리가 내장되어 있는 Router(BrowserRouter)가 보입니다. v3 에서는 history 객체를 별도로 가져와 Router 의 프로퍼티로 넣어줘야 했습니다만, v4 에서는 어떤 설정도 해줄 필요가 없습니다. 또한, 라우터 컴포넌트 아래로 DOM 코드를 직접 넣어줄 수 있게 되었습니다. 어떤 코드에서든 Route 컴포넌트를 넣을 수 있다는 뜻입니다. 즉, 라우트는 필요할때마다 동적으로 생성 가능하다는 것입니다.

```js

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home, First, Second, Third } from './App.js'
import Header from './Header.js'

ReactDOM.render(
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/first" component={First} />
      <Route path="/first" component={First} />
      <Route path="/second" component={Second} />
      <Route path="/third" component={Third} />
    </div>
  </Router>,
  document.getElementById('root')
)
```

#### 공통으로 사용되는 컴포넌트
v4에서는 더이상 필요하지 않습니다. 컴포넌트 내에서 라우트 정보를 직접 넣어줄 수 있기 때문에 훨씬 명확한 코드를 작성할 수 있는것 같습니다.

#### 라우트 컴포넌트 렌더링 
```js

export class Third extends Component {
  render() {
    return (
      <div>
        <Link to={`${this.props.match.url}/1`}>
          1번
        </Link>
        <Link to={`${this.props.match.url}/2`}>2번</Link>
        <Route
          exact
          path={this.props.match.url}
          render={() => (
            <div>
              <h3>id를 선택해 주세요.</h3>
            </div>
          )}
        />
        <Route path={`${this.props.match.url}/:id`} component={Item} />
      </div>
    )
  }
}

```


----
해당 내용은 다음 글을 참고 하였습니다.
- https://reacttraining.com/react-router/
- https://blueshw.github.io/2017/06/22/static-routing-vs-dynamic-routing/