---
layout: post
title: React Router  (react-router-dom)
tags:
 - react-router
categories: React
---

## 소개
리액트는 SPA(Single Page Application)위한 자바스크립트 라이브러리이기 때문에, 클라이언트 사이드 렌더링과 클라이언트 사이드 라우팅이 필요합니다. 말 그대로 페이지가 하나이기 때문에 페이지가 여러개로 구성되어 있지 않아 사용자가 요청시 페이지를 새로고침 하거나 페이지 로딩시 서버로 부터 리소스를 전달받는 작업을 하지 않습니다. 즉  서버쪽에서 렌더링을 담당하지 않고 불필요한 트래픽을 아낄 수 있습니다. 웹서버처럼 각 페이지마다 다른 디렉토리 및 파일을 사용하는것과 달리, 싱글페이지의 경우 각각의 화면에 따라 주소를 만들어 주어야 하는데, 이를 라이팅이라고 합니다. 라우팅은 다른 주소에 따라 다른 뷰를 보여주는 것! 

라우터를 사용하게되면 처음부터 웹앱에서 사용 할 모든 컴포넌트들을 먼저 불러와두고, 페이지를 이동할 때 마다 그때 그때 페이지를 처음부터 로딩하지 않고 필요한 컴포넌트만 다시 렌더링 합니다. (즉, Header 같은 부분처럼 변동이 없는 부분들은 유지되어있다는 의미입니다)

이를 위해 react-router-dom 라이브러리를 사용해 보겠습니다. 

react-router-dom 을 사용하여 라우트를 해주면, 뒤에서 Single Page(SPA) React Application을 아주 부드럽게 조작하는 것이 가능합니다. 사용자가 링크를 누르면, URL이 바뀌고, 뷰가 바뀌고 다른 페이지로 넘어갔음을 알 수 있게 됩니다. 실제론 이동하지 않았는데 말이죠. 그와 같이 리액트 라우터는 리액트의 Virtual DOM을 아주 빠르게 렌더링하는 것으로, SPA를 Multi-page Application처럼 느끼게 해줍니다.

## react-router-dom
react-router-dom는 써드파티 라이브러리로서, 가장 많이 사용되고 있는 라이브러리로써 클라이언트 사이드에서 이뤄지는 라우팅을 간단하게 해줍니다. 여러 화면으로 구성되는 서비스를 제공하는 웹 어플리케이션을 만들게 된다면, react-router 는 필수 라이브러리입니다.

### BrowserRouter
브라우저 히스토리를 이용해서 구현할 라우터입니다. 라우트를 사용하고자 하는 컴포넌트에서 react-router에서 제공하는 BrowserRouter를 사용하여 뷰를 렌더팅 하는 곳을 감싸 줍니다. 오직 하나의 자식만을 가질 수 있습니다. 실제 컴포넌트와 path연결을 담당하거나 링크를 담당하는 등의 다른 라우팅 컴포넌트(Route, Link)를 사용하기 위해서 기본적으로 감싸줘야 합니다.  또한 나중에 리덕스를 적용 하게 될 때, Provider 를 통하여 프로젝트에 리덕스를 연결하게 됩니다.


```js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'shared/App';

const Root = () => (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

export default Root;
```

Provider를 통하여 redux연결을 합니다. 모든 브라우징 히스토리를 기록하고 있는 Redux의 store를 통해 모든 리액트 라우터 컴포넌트들이 중간에 끊기더라도 다시 호출 할수 있게 기억됩니다.
```js
 <Provider store={createStoreWithMiddleware(reducers)}>
```


### Route
Route컴포넌트는 URL과 match하도록 설정한 특정 컴포넌트를 렌더링 합니다. 라우트를 설정 할 때에는 Route 컴포넌트를 사용하고, 경로는 path 값으로 설정합니다. match객체를 이용하여 : 뒤에 오는 모든것들을 렌더링 된 컴포넌트 내에서 액세스 가능합니다. 
```js
const Post = (props: RouteComponentProps<{ postId: string }>) => {
  return (
    <h3>Post: {props.match.params.postId}</h3>
  );
};
```

비구조화할당으로 파라미터를 받는다면 다음과 같습니다.
```js
const Post = ({match}) => {
  return (
    <h3>Post: {match.params.postId}</h3>
  );
};
```

라우트는 component옵션에 연결된 컴포넌트에 match, location, history라는 객체를 넘깁니다. 컴포넌트에서는 해당 값을 사용하여 파라미터를 받거나 url을 이동시키거나 등의 조작을 가 할 수 있습니다.

- match: path에 정의한 것과 매치된 정보를 담고있음
- location: window.location 객체와 비슷함. URL을 다루기 쉽게 쪼개서 가지고 있음
- history: 브라우저의 window.history 객체와 비슷함, 주소를 임의로 변경하거나 되돌아갈 수 있음, 주소를 변경하더라도 SPA 동작방식에 맞게 페이지 일부만 리로드 함

### NavLink
NavLink 는 조금 특별한 Link입니다. to에 지정한 path와 URL이 매칭되는 경우, 특별한 스타일, 클래스를 적용할 수 있습니다. 

```js
    <li>
      <NavLink to="/" activeStyle={style}>Home</NavLink>
    </li>
```

### Link
컴포넌트안에 Link컴포넌트를 정의하여 a(앵커) 태그처럼 쓸 수 있습니다. 어디로 갈 지 to 필드를 채운 뒤, inline으로 스타일을 채워 넣거나 버튼 태그를 추가해서 사용합니다. a태그와 차이점은 페이지를 새로 고침 하느냐 하지 않느냐 인데, 앱 내에서 다른 라우트로 이동 할 때에는, 일반 a태그의 href속성을 이용하여 이동하게 되면 새로고침을 하므로 새로고침을 하지 않기 위해서는 리액트 라우터에 있는 Link 컴포넌트를 사용해야합니다. 이 컴포넌트를 사용하면 페이지를 새로 불러오는걸 막고, 원하는 라우트로 화면 전환을 해줍니다.

```js
<li>
  <Link to={"/about"} className="nav-link">
    About
  </Link>
</li>

```
참고 ) history.push 와 Link를 통해 URL을 이동 시킬 수 있습니다.
- Link: a 태그와 같다. 하지만 SPA 특성상 a태그 처럼 새로고침이 발생하면 안되기에, a 태그를 기반으로 기능상의 개선을 통해 새로고침없이 다른 뷰를 렌더 하기위해 사용하는 것이다.

- history.push: Route는 컴포넌트에 기본적으로 match, history, location 이라는 것을 넘겨준다. 이때 histroy.push(‘/인자’) 함수에 인자를 넣어주면 해당 인자로 url을 새로고침 없이 이동시켜준다.


#### match.params값을 사용하지 않고 데이터 넘기는 방법
match.params를 이용하여 파라미터 데이터를 넘기는 방법이 있습니다. 하지만 이렇게 하면 단점이 생기는데요, 하나는 넘기는 데이터가 많아지면 주소값이 너무 길어진다는 것과 만약 넘겨야하는 데이터가 보안상 중요한 데이터라면 주소를 통해서 너무 쉽게 노출이 되버리기 보안상 헛점이 생길 수도 있습니다. match값으로는 간단히 주소만 정해주고 중요한 데이터를 Routing할때 넘겨주려면 어떻게 해야 할까요?

Linkto를 앞서 사용할때는 해당 component의 주소값만을 넣어서 사용했지만, 사실 Object형태로 확장이 가능합니다! Linkto를 확장하면 pathname, query, hashname, state 이렇게 4가지 key를 가질 수 있게 됩니다. 여기서 pathname은 우리가 기존에 기본값으로 넣어서 사용했던 component주소를 넣어주면되고 데이터는 위의 스크린샷과 같이 state형태로 넘겨줄 수가 있습니다. 
```js

  <Link
    to={\{
      pathname: "/about",
      state: {
        id: 12
      }
    \}}
  >
    about
  </Link>
```

자 이제 데이터를 넘겨줬으니 받아서 사용해 봅시다. 앞서 말했듯이 Routing된 component는 3가지 props를 가집니다. Link를 통해 넘겨준 데이터는 location에서 접근 할 수 있습니다. 그래서 ``this.props.loaction.데이터이름` 의 형태로 가져다 쓸 수 있습니다.
```js
<h2>Aboutzzz {props.location.state.id} </h2>
```


#### 주의점: 일부가 포함된 경로와 컴포넌트 바인딩
라우트 path설정 시 주의할 점이 있는데, 경로와 정확히 매치 되지 않더라도(맞아 떨어지지 않더라도) 경로를 포함만 해도 렌더링이 됩니다. / 경로의 경우 시작점이 모두 동일하기 때문에, 최상단으로 먼저 정의할 경우 다음라인에 정의된 라우트들은 일부가 포함된 경로와 컴포넌트 바인딩이 먼저 일어남으로 인해 바인딩이 정상적으로 이루어지지 않습니다. exact 옵션을 통해 정확히 매칭될 때만 렌더 할 수 있지만 다음 규칙에 따라 사용하도록 합니다. exact는 기본적으로 허용하는 경로만 포함해도 렌더링 되는 것보다는 우선순위가 낮습니다. 즉, 구체적인 path가 뒤에 있으면 exact를 써도 적용이 안된다는 점!

따라서 라우트 path는 다음과 같은 순서로 작성합니다.
1. 구체적일수록 제일 먼저 쓰고, 
2. 일반적일수록 마지막에 두도록 합니다.
3. 꼭 필요한 경우 exact 옵션을 추가 합니다.


다음 코드들은 exact 옵션을 사용하엿지만 라우트 우선순위에 따라 일부가 포함된 먼저 정의된 경로를 읽어 들임으로 정상적으로 동작하지 않습니다.
```js
<Route path="/" component={Home} />
<Route exact path="/about" component={About} />

<Route path="/about" component={About} />
<Route exact path="/about/:id" component={AboutID} />

<Route path="/about/:name" component={About} />
<Route exact path="/about/zzz" component={Home} />
```

#### 정리

path작성 순서는 다음과 같습니다.
```js
<Route path="/about/:id" component={AboutID} />
<Route path="/about" component={About} />
<Route path="/" component={Home} />
```

exact를 사용한다면 다음고 같습니다.
```js
<Route exact path="/" component={Home} />
<Route path="/about/:id" component={AboutID} />
<Route path="/about" component={About} />
```

### Switch
URL당 하나의 컴포넌트를 렌더링하고 싶을 때, Switch는 배타적 렌더링을 허락합니다(뒤에선 정규표현식으로 매칭을 확인하고 있을겁니다). 이게 바로 순서를 정리할 때 주의해야할 점입니다. (Route참고) Switch는 Route중 매치되는 첫번째 것만 렌더합니다.

### Redirect
Redirect를 하는 컴포넌트입니다. 마운트 되면 지정한 경로로 이동합니다. 기본적으로 replace 방식이며 location 객체를 통해 리다이렉트 할 수도 있습니다. 따라서 push가 아닌 replace방식이라 history에 남지 않습니다.

다음과 같이 만약 이전에 /info 라는 주소가 있었는데 이 주소를 더이상 쓰지 않고 about으로 redirect 하려 한다면, Switch 안에 redirect를 추가해주시면 됩니다.

```js
<Redirect from="/info" to="/about" />
```

### withRouter
withRouter HOC를 통해 히스토리 객체의 속성과 의 match에 액세스 할 수 있습니다. withRouter는 render props : {match, location, history}와 같은 props로써 라우트가 변경할 때마다 해당 구성 요소를 다시 렌더링합니다.


### 정리 

```js
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'

function App() {
  return (
    <Router>
      <div>
        <h2>hello!</h2>
        <Switch>
          <Route path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/contact" component={Contact}/>
          </Switch>
          </div>
    </Router>
  );
}

export default App;

```

## 중첩 라우팅
```js
<Router>
  <Route path="/third" component={Third} />
</Router>
```

동적 라우팅을 통해 컴포넌트 안에서 라우트를 정의할 수 있습니다.

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
    );
  }
}

```


----
해당 내용은 다음 글을 참고 하였습니다.
- https://feel5ny.github.io/2017/12/13/React_02/
- https://velopert.com/1173
- https://velopert.com/3417