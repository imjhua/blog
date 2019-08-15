---
layout: post
title: React 성능 개선하기
categories: React
---

내부적으로 React는 몇 가지 테크닉을 통해 UI를 업데이트할 때 필요한 DOM 조작을 최소화하고 있습니다. 추가로 React 개발시에 성능을 개선할 수 있는 몇가지 방법들에 대해 소개 합니다.


## React virtaulDOM
React는 렌더링된 UI를 내부적으로 다른 식으로 관리하고 있습니다. React가 내부적으로 관리하고 있는 이 모델은 컴포넌트가 리턴한 React element를 포함하고 있습니다. 이 모델을 통해 React는 DOM node를 생성하는 것을 피하고 이미 존재하는 DOM node에 대해 불필요하게 접근하는 것을 피할 수 있습니다. 이미 존재하는 DOM node에 대한 접근은 JavaScript 오브젝트를 조작하는 것보다 종종 느릴 수 있기 때문입니다. 우리는 이것을 "virtual DOM”이라고 합니다.

## 컴포넌트를 잘 만드는 것이 중요한 이유
컴포넌트는 리액트에서 가장 중요한 구성요소입니다. 리액트로 만들어진 앱을 이루는 가장 최소한의 단위가 컴포넌트이기 때문인데 앱을 리액트로 만든다는 것은, 곧 작고 단단한 컴포넌트들을 만들고 이 컴포넌트들을 유기적으로 연결한다는 것을 뜻합니다. 따라서, 잘 동작하는 리액트 앱을 만들기 위해서 우리는 크게 두 가지를 잘하면 됩니다.

- 작고 단단한 컴포넌트를 만드는 것
- 이렇게 만들어진 컴포넌트간의 관계를 정의하고 유기적으로 연결하는 것

작고 단단한 컴포넌트를 만드는것이 기본적인것 같지만, 많이 놓치는 부분이기도 합니다. 컴포넌트를 만드는데 가장 기본적인 원칙들을 정의하고 그걸 지키려고 노력하는데 주안점을 두고자 합니다. 사실 이것만 잘해도 본인을 고급 리액트 개발자라고 부를 수 있다고 생각합니다.

### 컴포넌트란?
우리가 React를 사용하는 이유는 앱의 일부분인 화면(View)의 UI를 구성할때 도움을 받기 위해 사용합니다. UI는 View 함수에 어떤 State 값을 대입했을 때 나온 결과입니다. 중요한 점은 View를 State가 같다면 항상 같은 UI를 결과로 갖는 함수로 볼 수 있다는 점입니다. 즉 React는 View 함수 개발에 도움을 주는 라이브러리라고 정의할 수 있을 것입니다.

```jsx
UI = View(State)
```

마찬가지로, React의 기본이 되는 구성요소인 컴포넌트는, 데이터를 입력받아 DOM Node를 출력하는 함수(공식문서: Conceptually, components are like JavaScript functions. )라고 생각할 수 있습니다. 이 때 입력받는 데이터란 Props나 State 같은 것들입니다. 컴포넌트들은 상속보다는 합성을 통해 서로 연결되고 또다른 컴포넌트가 되기도 합니다. 컴포넌트를 구성할때는 다음을 고려하여 디자인하는 것이 좋습니다.

- DRY (Don’t Repeat Yourself: 같은 작업을 반족하지 마라)를 유지한다.
- 재사용 가능한 컴포넌트를 만든다.
- 컴포넌트가 무엇을 하는지 명확하게 이해할 수 있다.



## 성능 개선 포인트
### Compoent보다는 PureComponent 사용
컴포넌트의 props나 state가 변경되었을 때, React는 이전에 렌더된 React element와 새로 리턴된 React element를 비교하여 실제 DOM을 갱신할 필요가 있는지를 결정한다. 이 둘이 같지 않을 경우에 React는 DOM을 갱신한다. 이것을 재-렌더링 이라고 합니다. 어떤 경우에는 컴포넌트의 라이프사이클 함수 shouldComponentUpdate를 전부 오버라이드해서 속도를 올릴 수 있스비다. 이 함수는 리렌더링 프로세스가 시작하기 직전에 트리거되는 함수로써, 일반 컴포넌트를 상속받는다면 이 함수의 기본 구현은 true를 리턴(상태가 변해도 무조건 재 렌더링 수행)하여 React로 하여금 업데이트를 수행하도록 합니다.

PureComponent 는 Component 와 동일하게 동작합니다. 다만, 순수 컴포넌트는 shouldComponentUpdate 함수를 다뤄준다는 것이 하나의 차이점입니다. shouldComponentUpdat함수는 상태(state, props)가 변경될 때, 얕은 비교를 통하여 리렌더링의 유무를 결정합니다. 상태변화에 대한 비교없이 무조건 불필요한 리렌더링을 수행하는 일반 컴포넌트보다는 필요한 경우에만 렌더링을 수행하므로써, 성능을 개선할 수 있는 이점이 있습니다. 

### 정적인 변수와 함수는 render 함수 밖에 선언하여 레퍼런스 사용
Render가 될 때마다 선언되지 않은 타입의 변수들을 재생성하게 됩니다. 정적인 변수와 함수는 render 함수 밖으로 빼두어 변수의 레퍼런스를 사용하는 것이 좋습니다. 

```jsx
// Render가 될 때마다 style의 Object 재생성
class App extends PureComponent {
  render() {
    return (
      <div
        style={{
          backgroundColor: 'black',
          color: 'pink',
        }}
      >
        Hello, world!
      </div>
    );
  }
}

// style 아에 밖에 정의하여, 레퍼런스 사용
const style = {
  backgroundColor: 'black',
  color: 'pink',
};

class App extends PureComponent {
  render() {
    return (
      <div style={ style }>
        Hello, world!
      </div>
    );
  }
}

```

### 렌더시에 새로운 함수를 생성하는 대신, 부모 컴포넌트 메소드의 레퍼런스 사용
렌더시에 자식 컴포넌트에게 부모 컴포넌트의 메소드를 전달하고자 하는 경우, 새로운 함수를 직접 작성하여 prop을 넘길 수 있습니다. 이 방법의 문제점은, 매번 부모 컴포넌트의 렌더시점에 새로운 레퍼런스를 가지는 새로운 함수가 생성된다는 점 입니다. CommentItem 이 순수 컴포넌트라면, 부모 렌더시에 새로운 함수를 매번 생성하기 때문에 레퍼런스(참조값)이 변경되고, 따라서 데이터는 같은 상태임에도 불구하고 불필요한 렌더링을 여러 번 수행하게 될 것입니다. 불필요한 렌더링을 수행하게 되는 것이지요. 이를 해결하기 위해, 부모 컴포넌트 메소드의 레퍼런스를 직접 넘기도록 합니다. 그렇게 한다면 자식 컴포넌트의 likeComment 프로퍼티는 언제나 같은 값을 가지게 되며 절대로 불필요한 렌더링을 여러 번 수행하지 않을 것입니다.


```jsx
// 함수 생성
<CommentItem likeComment={() => this.likeComment()} />

// 부모 컴포넌트 메소드의 레퍼런스
<CommentItem likeComment={likeComment} />
```

### 렌더시 값을 함수 안에서 넘기는 대신, 부모 컴포넌트 메소드의 레퍼런스 사용
여러 아이템을 가지는 배열(list of items)을 가지고 있고, 각각 고유한 매개변수(parameter)를 부모 컴포넌트의 메소드로 전달한다고 했을 때, 다음과 같이 코드를 작성할 수 있습니다. 마찬가지로 새로운 함수를 생성하는 대신, 부모 컴포넌트 메소드의 레퍼런스와 값을 직접 넘기는 방법을 사용하도록 합니다. 

```jsx
// 함수를 생성하여 매개변수를 넘긴다.
<CommentItem likeComment={() => this.likeComment(user.id)} />

// 값을 또다른 프로퍼티로 넘겨 줍니다.
<CommentItem likeComment={this.likeComment} userID={user.id} />
```

다음과 같이 자식 컴포넌트에서는 props를 참조하는 메소드를 만들어 사용합니다.

```jsx
class CommentItem extends PureComponent {
  ...
  handleLike() {
    this.props.likeComment(this.props.userID)
  }
  ...
}
```


### 렌더 함수 안에서 데이터를 재창조(derive)하지 않는다.
다음과 같이 props의 값을 재 연산 해야 하는 경우가 있습니다. props의 값을 가공하는 것이기 때문에, props에 변화가 없으면 재연산도 하지 않는 것이 효율적이라고 할 수 있습니다. 그러나 렌더에서 데이터를 재연산하게 되면, props이 변경되지 않았다 하더라도, 컴포넌트가 매번 렌더링 될때마다 새로운 레퍼런스를 가지게 됩니다. 이는 불필요한 재 렌더링을 초래 합니다. 따라서 재창조된 데이터를 캐싱하여 문제를 해결 할 수 있습니다. 예를 들어, 재창조된 데이터를 컴포넌트의 state 에 저장(캐시)해 두었다가, posts 가 업데이트 될 때만 업데이트해주는 것입니다.

```jsx
render() {
  const { posts } = this.props
  const topTen = posts.sort((a, b) => b.likes - a.likes).slice(0, 9)
return //...
}

// state에 연산한 값을 담아두고 사용한다.
componentWillMount() {
  this.setTopTenPosts(this.props.posts)
}
componentWillReceiveProps(nextProps) {
  if (this.props.posts !== nextProps.posts) {
    this.setTopTenPosts(nextProps)
  }
}
setTopTenPosts(posts) {
  this.setState({
    topTen: posts.sort((a, b) => b.likes - a.likes).slice(0, 9)
  })
}
```



### 값의 변화를 렌더링을 원한다면 state로 관리
값을 저장하는 방법에는 일반 변수(this)와 state에 담는 두가지 방법이 있을 것입니다. 값을 담는 다는 것은 둘의 공통점이지만, 차이가 있다면, satte는 변경시 화면 갱신과 밀접한 관련성이 있고, 변수는 변하는 값일 뿐 화면이 갱신되는 렌더링과는 전혀 관련이 없다는 것 입니다. 즉, 화면의 노출과 관련없이 내부적으로만 사용될 것이라면 일반 변수를 사용하고, 화면에 보여지는 것을 담당하는 데이터라면 state로 관리하여 목적에 맞게 사용하는 것이 좋습니다. 불필요한 자원을 사용하지 않을 수 있으니까요.

----
해당 내용은 다음 글을 참고 하였습니다.
- https://reactjs-kr.firebaseapp.com/docs/optimizing-performance.html
- https://medium.com/@async3619/when-to-use-component-or-purecomponent-b810897a19a2
- https://www.holaxprogramming.com/2018/04/15/react-optimizing-virtual-dom-explained/
- https://orezytivarg.github.io/optimizing-performance/
- https://iseongho.github.io/posts/react-optimizing-performance/
- https://hyunseob.github.io/2019/06/02/react-component-the-right-way/