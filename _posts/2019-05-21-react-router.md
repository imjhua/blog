---
layout: post
title: React Router  (react-router-dom)
tags:
 - react-router
categories: React
---

## 소개
리액트는 SPA(Single Page Application)위한 자바스크립트 라이브러리이기 때문에, 클라이언트 사이드 렌더링과 클라이언트 사이드 라우팅이 필요합니다. 말 그대로 페이지가 하나이기 때문에 페이지가 여러개로 구성되어 있지 않아 사용자가 요청시 페이지를 새로고침 하거나 페이지 로딩시 서버로 부터 리소스를 전달받는 작업을 하지 않습니다. 즉  서버쪽에서 렌더링을 담당하지 않고 불필요한 트래픽을 아낄 수 있습니다.

싱글페이지의 경우 각각의 화면에 따라 주소를 만들어 주어야 하는ㄷ, 이를 라이팅이라고 합니다. 라우팅은 다른 주소에 따라 다른 뷰를 보여주는 것! 이를 위해 react-router-dom 라이브러리를 사용해 보겠습니다.

react-router-dom 을 사용하여 라우트를 해주면, 뒤에서 Single Page(SPA) React Application을 아주 부드럽게 조작하는 것이 가능합니다. 사용자가 링크를 누르면, URL이 바뀌고, 뷰가 바뀌고 다른 페이지로 넘어갔음을 알 수 있게 됩니다. 실제론 이동하지 않았는데 말이죠. 그와 같이 리액트 라우터는 리액트의 Virtual DOM을 아주 빠르게 렌더링하는 것으로, SPA를 Multi-page Application처럼 느끼게 해줍니다.

## react-router-dom
react-router-dom 는, 써드파티 라이브러리로서, 가장 많이 사용되고 있는 라이브러리로써 클라이언트 사이드에서 이뤄지는 라우팅을 간단하게 해줍니다. 여러 화면으로 구성되는 서비스를 제공하는 웹 어플리케이션을 만들게 된다면, react-router 는 필수 라이브러리입니다.



### 사용법

### BrowserRouter
브라우저 히스토리를 이용해서 구현할 라우터입니다. 라우트를 사용하고자 하는 컴포넌트에서 react-router에서 제공하는 BrowserRouter를 사용하여 뷰를 렌더팅 하는 곳을 감싸 줍니다. 실제 컴포넌트와 path연결을 담당하거나 링크를 담당하는 등의 다른 라우팅 컴포넌트(Route, Link)를 사용하기 위해서 기본적으로 감싸줘야 합니다. 또한 나중에 리덕스를 적용 하게 될 때, Provider 를 통하여 프로젝트에 리덕스를 연결하게 됩니다.


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

- match: path에 정의한 것과 매치된 정보를 담고있음
- location: window.location 객체와 비슷함. URL을 다루기 쉽게 쪼개서 가지고 있음
- history: 브라우저의 window.history 객체와 비슷함, 주소를 임의로 변경하거나 되돌아갈 수 있음, 주소를 변경하더라도 SPA 동작방식에 맞게 페이지 일부만 리로드 함


라우트 path설정 시 주의할 점이 있는데, 경로와 정확히 매치 되지 않더라도(맞아 떨어지지 않더라도) 경로를 포함만 해도 렌더링이 됩니다. 정확히 매칭될 때만 렌더하고 싶은 경우 exact옵션을 사용합니다. 라우트는 component옵션에 연결된 컴포넌트에 match, location, history라는 객체를 넘깁니다. 컴포넌트에서는 해당 값을 사용하여 파라미터를 받거나 url을 이동시키거나 등의 조작을 가 할 수 있습니다.


참고) 포함된 경로가 아닌 정확한 경로만 허용하고 싶은 경우 exact 옵션을 적용합니다. 다른 url에서도 / 을 포함하고 있기 때문에 의도치 않게 함께 그려지는 것을 방지해야 합니다.

그러나 exact를 사용하여 정확한 경로에만 컴포넌트를 보여준다 하더라도 다음과 같은 경우는 /about 호출시에도 /와 매핑된 Home 컴포넌트가 보여질 것입니다. 이유는? exact 옵션보다 포함한 경로가 이는 경우의 우선순위가 더 높기 때문입니다.

```js
<Route path="/" component={Home} />
<Route exact path="/about" component={About} />
```

```js
<Route path="/about" component={About} />
<Route exact path="/about/:id" component={AboutID} />
```

 이 우선순위는 기본적으로 허용하는 경로만 포함해도 렌더링 되는 것보다는 우선순위가 낮습니다. 즉, 구체적인 path가 뒤에 있으면 exact를 써도 적용이 안된다는 점!

따라서, 라우트 path작성 방법은 
1. 구체적일수록 제일 먼저 쓰고, 
2. 일반적일수록 마지막에 두도록 합니다.
3. 꼭 필요한 경우 exact 옵션을 추가 합니다.

절대! path="/"를 제일 먼저 두지 마세요. 모든 /로 시작하는 매칭되는 경로로 컴포넌트가 적용될 것입니다. 

정리하자면 path작성 순서는 다음과 같습니다.
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
URL당 하나의 컴포넌트를 렌더링하고 싶을 때, Switch는 배타적 렌더링을 허락합니다(뒤에선 정규표현식으로 매칭을 확인하고 있을겁니다). 이게 바로 순서를 정리할 때 주의해야할 점입니다. (Route참고)


### Redirect
Redirect를 하는 컴포넌트입니다. 마운트 되면 지정한 경로로 이동합니다. 기본적으로 replace 방식이며 location 객체를 통해 리다이렉트 할 수도 있습니다.

### NavLink
to에 지정한 path와 URL이 매칭되는 경우, 특별한 스타일, 클래스를 적용할 수 있습니다.

### Link
컴포넌트안에 Link컴포넌트를 정의하여 앵커 태그처럼 쓸 수 있습니다. 어디로 갈 지 to 필드를 채운 뒤, inline으로 스타일을 채워 넣거나 버튼 태그를 추가해서 사용합니다.

```js
<li>
  <Link to={"/about"} className="nav-link">
    About
  </Link>
</li>
```

참고 ) history.push 와 Link를 통해 URL을 이동 시킬 수 있습니다.
— Link: a 태그와 같다. 하지만 SPA 특성상 a태그 처럼 새로고침이 발생하면 안되기에, a 태그를 기반으로 기능상의 개선을 통해 새로고침없이 다른 뷰를 렌더 하기위해 사용하는 것이다.

— history.push: Route는 컴포넌트에 기본적으로 match, history, location 이라는 것을 넘겨준다. 이때 histroy.push(‘/인자’) 함수에 인자를 넣어주면 해당 인자로 url을 새로고침 없이 이동시켜준다.


### withRouter
withRouter HOC를 통해 히스토리 객체의 속성과 의 match에 액세스 할 수 있습니다. withRouter는 render props : {match, location, history}와 같은 props로써 ㅇ라우트가 변경할 때마다 해당 구성 요소를 다시 렌더링합니다.


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
### withRouter
withRouter HOC를 통해 히스토리 객체의 속성과 의 match에 액세스 할 수 있습니다. withRouter는 render props : {match, location, history}와 같은 props로써 ㅇ라우트가 변경할 때마다 해당 구성 요소를 다시 렌더링합니다.

### Link
HTML의 a태그와 유사합니다. 실제 동작은 페이지 전체를 리로드하지 않고
필요한 부분만 리로드하게 됩니다.
```js
<Link to="/" />
```



## 중첩 라우팅


## 라우트별 Code Splitting
SPA 의 단점은, 앱의 규모가 커지면 자바스크립트 파일 사이즈가 너무 커진다는 것 입니다. 유저가 실제로 방문하지 않을수도 있는 페이지에 관련된 렌더링 관련 스크립트도 불러오기 때문입니다.. 이를 개선하기 위해 Code Splitting 을 사용하여 라우트 별로 파일들을 나눠서 트래픽과 로딩속도를 개선 할 수 있습니다.



----
해당 내용은 다음 글을 참고 하였습니다.
- https://feel5ny.github.io/2017/12/13/React_02/