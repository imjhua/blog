---
layout: post
title: React 성능 개선하기
categories: React
categories: TODO
---

useMemo
Input 컴포넌트를 조금 업데이트해서 컴포지션이 가능하도록 변경해볼게요. useRef를 이용해서 렌더링 횟수를 측정할텐데 useRef에 대해서는 조금 이따 얘기해볼게요. 일단은 accessory 라는 Props를 추가한 뒤 여기로 버튼을 넘기겠습니다. 이 버튼은 동적으로 렌더링이 될거에요. email이 빈 값이 아닐 때만 표시되도록 만들어 보겠습니다. 이렇게요.


https://hyunseob.github.io/2019/06/02/react-component-the-right-way/

바로 이전의 예제와 이 예제의 차이점은 이 예제에서는 인라인 함수를 썼다는 것입니다. 인라인 함수를 render 메소드 내에서 쓰면 매 render 실행시마다 함수 인스턴스가 새로 생성되겠죠? 따라서 이 코드를 실행되면 결과는 false로 출력됩니다.

1
(() => null) === (() => null); // false
이 말은 매 render 실행마다 Input에 Props로 내려오는 함수가 모두 다르다는 것이고, 함수의 실행과는 관계 없이 Shallow compare로 함수 자체가 다른지를 비교하기 때문에 항상 다르다는 결과를 반환하겠죠. 결론적으로 항상 re-render 되는 것입니다.

이런 상황은 인라인 함수 사용이 대표적이지만 이것 말고도 여러가지가 있습니다. 자주 부딪치는 문제중에서는 렌더 메소드 내에서 객체를 새로 만드는 케이스가 있죠. 이렇게요.

1
2
3
4
5
```js
class Parent extends React.Component {
  x = { bar: "baz" };
  render() {
    return <Child foo={x} />;
  }
}
```
또 한 가지 정말 쉽게 실수할 수 있는 케이스는 ReactNode를 넘길 때, children등을 사용할 때 인데요, 이 부분은 조금 이따가 Component Composition을 할 때 다뤄보겠습니다.


왜 이런걸까요? 문제는 아까와 같습니다. App의 render가 실행될 때마다 Dialog에 넘길 header, body, footer를 모두 새로 만들기 때문이에요.

1
<h2>반가워요!</h2> === <h2>반가워요!</h2>; // false
우리가 실제로 사용하는 JSX 문법은 실제로는 객체를, 보다 정확히 말하자면 ReactNode 객체를 생성합니다. 객체는 여러분들도 잘 아시겠지만 내부적으로는 데이터가 같아도 비교 연산자를 통해 비교해보면 다르다는 결과가 나오죠. 이 때문에 render 내에서 컴포지션을 지원하는 컴포넌트에 JSX로 생성한 ReactNode를 넘기면 매 번 렌더가 다시 됩니다. 이것은 children을 이용하더라도 마찬가지에요.

이 문제는 비교적 간단히 극복하실 수 있어요. render 내에서 ReactNode를 새로 생성하지 않으시면 됩니다.

//////////////


React는 간단하면서도 충분히 빠르다는 생각을 하고 있지만 이것은 착각입니다. 대충 만들어도 빠르다는 것은 절대 아닙니다. React 애플리케이션은 잘 만들어야 빠릅니다. React의 동작 원리를 이해하고 애플리케이션이 느려질 수 있는 상황들을 찾아 해결하는 것이 매우 중요합니다. 성능과 관련있는 방식들에 대해 살펴 보고 React 개발시에 성능을 개선할 수 있는 몇가지 방법들에 대해 소개 합니다.


## React의 기본
React의 성능 최적화를 위해서는 React의 Element, Component, Instance의 의미와 렌더링 등에 대한 기본 개념들에 대한 정확한 이해가 선행되어야 합니다.

## React란
우리가 React를 사용하는 이유는 앱의 일부분인 화면(View)의 UI를 구성할때 도움을 받기 위해 사용합니다. UI는 View 함수에 어떤 State 값을 대입했을 때 나온 결과입니다. 중요한 점은 View를 State가 같다면 항상 같은 UI를 결과로 갖는 함수로 볼 수 있다는 점입니다. 즉 React는 View 함수 개발에 도움을 주는 라이브러리라고 정의할 수 있을 것입니다.

```jsx
UI = View(State)
```

마찬가지로, React의 기본이 되는 구성요소인 컴포넌트는, 데이터를 입력받아 DOM Node를 출력하는 함수(공식문서: Conceptually, components are like JavaScript functions. )라고 생각할 수 있습니다. 이 때 입력받는 데이터란 Props나 State 같은 것들입니다. 

### 엘리먼트 또는 요소(Elements)
리액트 요소는 컴포넌트 인스턴스 혹은 DOM 노드와 그들의 속성을 설명하는 일반 객체입니다. 자바스크립트 객체는 가볍기 때문에 오버헤드 없이 요소들을 만들고 없앨 수 있습니다. React가 객체를 분석하고, 이전의 객체 표현과 비교하여 변경 사항 확인 후, 변경이 일어난 경우에만 실제 DOM을 업데이트할 수 있습니다. DOM node를 만들기 위해 React.createElement메소드를 사용하는데, 요소는 실제 인스턴스가 아니며, 화면에서 보고싶은 것을 알려주는 일종의 방법이라고 할 수 있습니다. 요소에 대한 어떤 메소드도 호출할 수 없습니다. 요소가 DOM에 렌더링될 때, DOM 노드가 렌더링된다고 표현합니다.


### 컴포넌트(Components)
컴포넌트는 리액트에서 가장 중요한 구성요소입니다. 컴포넌트는 React Element를 반환하는 함수 혹은 클래스입니다. 리액트로 만들어진 앱을 이루는 가장 최소한의 단위가 컴포넌트이기 때문인데 앱을 리액트로 만든다는 것은, 곧 작고 단단한 컴포넌트들을 만들고 이 컴포넌트들을 유기적으로 연결한다는 것을 뜻합니다. 따라서, 잘 동작하는 리액트 앱을 만들기 위해서 우리는 크게 두 가지를 잘하면 됩니다.

- 작고 단단한 컴포넌트를 만드는 것
- 이렇게 만들어진 컴포넌트간의 관계를 정의하고 유기적으로 연결하는 것

컴포넌트들은 상속보다는 합성을 통해 서로 연결되고 또다른 컴포넌트가 되기도 합니다. 컴포넌트를 구성할때는 다음을 고려하여 디자인하는 것이 좋습니다.
- DRY (Don’t Repeat Yourself: 같은 작업을 반족하지 마라)를 유지한다.
- 재사용 가능한 컴포넌트를 만든다.
- 컴포넌트가 무엇을 하는지 명확하게 이해할 수 있다.

리액트 컴포넌트에게 있어 props는 입력이며, 요소 트리는 출력입니다. props는 한 방향으로 흐릅니다. 이러한 구성으로 인해, 내부 DOM에 의존하지 않고 UI의 독립적인 부분을 작성할 수 있는 것입니다.


### 인스턴스(Instances)
인스턴스는 클래스 컴포넌트에서 this를 참조하며, 이는 지역 state를 저장하고, 생명주기 메소드를 사용하는 데 유용합니다. 인스턴스는 리액트가 이를 처리하기 때문에 컴포넌트 인스턴스를 직접 만들 필요는 없다. 클래스 컴포넌트는 인스턴스가 있지만 함수형 컴포넌트에는 인스턴스가 존재 하지 않습니다. 따라서 컴포넌트 혹은 컴포넌트의 DOM에 접근해야 하는 경우 사용하는 ref는 인스턴스에만 추가 할 수 있기 때문에 함수형 컴포넌트에서 사용할 수 없습니다. 

참고) ref의 사용예
- 클래스 DOM 요소에 ref 추가
- 클래스 컴포넌트에 ref 추가
- `클래스와 함수형 부모컴포넌트`에서 자식의 DOM노드에 접근해야 하는 경우 (custorm Attr)
- 함수형 컴포넌트 DOM 요소에 ref 추가
- 함수형 컴포넌트에 ref 추가 -> `함수형 컴포넌트는 인스턴스가 아니기 때문에 사용 불가 함`
- `함수형 부모컴포넌트에서 자식의 DOM노드에 접근해야 하는 경우(forwardRef활용)`

### React virtaulDOM과 Render
화면 갱신을 위해 DOM에 변화가 생기면 렌더 트리를 재생성하고 이 과정에서 모든 요소들의 스타일이 다시 계산되고, 레이아웃을 만들고 페인팅을 하는 과정이 반복됩니다다. DOM 조작이 많이 발생한다면 브라우저가 변화를 적용하기 위해 많은 연산을 해야 합니다. React는 UI의 구조를 내부적으로 컴포넌트가 반환하는 엘리먼트들을 트리 형태로 관리하고 표현합니다. 그리고 이 표현에 일반 객체(Plain object)를 사용합니다. 내부적으로 먼저 관리하고 변경이 필요한 부분만 찾도록 구현했기 때문에 불필요한 DOM 노드의 생성이나 제어를 최소화합니다. 보통 이 구조를 Virtual-DOM이라고 부르기도 하지만 IOS나 Android의 UI를 처리하는 React Native도 같은 방식으로 동작합니다. (때문에 엄밀히 따지면 Virtual-DOM은 살짝 오용되고 있다.) 컴포넌트의 Props나 State의 변경이 있을 때 React는 컴포넌트의 이전 상태 엘리먼트와 새로 만들어진 엘리먼트를 비교하고 실제 DOM의 업데이트 여부를 결정합니다. 엘리먼트를 비교하여 찾은 변경 점에 대해서만 갱신하는 것입니다. 그리고 엘리먼트는 기본적으로 Immutable이기 때문에 속성들(Props)을 직접 수정할 수 없습니다. 각 렌더링에 항상 새로운 엘리먼트(DOM Node가 아닌 일반 객체라는 점을 잊지 말자.)를 만듭니다. 엘리먼트는 영상의 한 프레임과 같다고 생각하면 됩니다.

정리하자면, React는 렌더링된 UI를 내부적으로 다른 식으로 관리하고 있습니다. React가 내부적으로 관리하고 있는 이 모델은 컴포넌트가 리턴한 React element를 포함하고 있고 이 모델을 통해 React는 DOM node를 생성하는 것을 피하고 이미 존재하는 DOM node에 대해 불필요하게 접근하는 것을 피할 수 있습니다. 이미 존재하는 DOM node에 대한 접근은 JavaScript 오브젝트를 조작하는 것보다 종종 느릴 수 있기 때문입니다. 우리는 이것을 "virtual DOM”이라고 하는 것 입니다.


## 성능 개선 포인트
다음 같은 리엑트의 원리를 이해하여 효율적인 성능을 낼 수 있는 방법에 대해 알아 봅니다.

### Compoent와 PureComponent 목적에 맞게 사용하기
컴포넌트의 props나 state가 변경되었을 때, React는 이전에 렌더된 React element와 새로 리턴된 React element를 비교하여 실제 DOM을 갱신할 필요가 있는지를 결정한다. 이 둘이 같지 않을 경우에 React는 DOM을 갱신한다. 이것을 재-렌더링 이라고 합니다. 어떤 경우에는 컴포넌트의 라이프사이클 함수 shouldComponentUpdate를 전부 오버라이드해서 속도를 올릴 수 있스비다. 이 함수는 리렌더링 프로세스가 시작하기 직전에 트리거되는 함수로써, 일반 컴포넌트를 상속받는다면 이 함수의 기본 구현은 true를 리턴(상태가 변해도 무조건 재 렌더링 수행)하여 React로 하여금 업데이트를 수행하도록 합니다.

PureComponent 는 Component 와 동일하게 동작합니다. 다만, 순수 컴포넌트는 shouldComponentUpdate 함수를 다뤄준다는 것이 하나의 차이점입니다. shouldComponentUpdat함수는 상태(state, props)가 변경될 때, 얕은 비교를 통하여 리렌더링의 유무를 결정합니다. 상태변화에 대한 비교없이 무조건 불필요한 리렌더링을 수행하는 일반 컴포넌트보다는 필요한 경우에만 렌더링을 수행하므로써, 성능을 개선할 수 있는 이점이 있습니다. 

### 되도록이면 render 함수에서는 새로운 오브젝트를 생성하지 말자
Render가 될 때마다 선언되지 않은 타입의 변수들을 재생성하게 됩니다. 정적인 변수와 함수는 render 함수 밖으로 빼두어 변수의 레퍼런스를 사용하는 것이 좋습니다. 

아래 코드에서는 Component1의 numbers 속성에 하드 코딩된 배열을 넘기고 있습니다. render함수가 호출될 때마다 numbers에는 매 번 새로운 배열이 할당됩니다. 메모리를 할당하는 문제보다 불필요한 렌더가 계속 일어나는 문제가 있습니다.있다.
```jsx
render() {
  return <div>
    <Component1 numbers={[1, 2, 3]} />
    ...
    
```

```jsx
// Render가 될 때마다 style의 Object 재생성
class App extends PureComponent {
  render() {
    return (
      <div
        style={`{
          backgroundColor: 'black',
          color: 'pink',
        }`}
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


## 성능을 저하 하는 나쁜 경우들
https://meetup.toast.com/posts/110



## 정리

DOM을 조작하는 비용은 상당합니다. 리엑트는 이런 비용을 절약할 수 있도록 다양한 방법들을 제공하고 있습니다. 불필요한 업데이트를 최소화 하여 효율적인 렌더링 방법들을 적용하면 어느새엔가는 성능이 좋은 애플리케이션이 될 것입니다. 

----
해당 내용은 다음 글을 참고 하였습니다.
- https://meetup.toast.com/posts/110
- https://reactjs-kr.firebaseapp.com/docs/optimizing-performance.html
- https://medium.com/@async3619/when-to-use-component-or-purecomponent-b810897a19a2
- https://www.holaxprogramming.com/2018/04/15/react-optimizing-virtual-dom-explained/
- https://orezytivarg.github.io/optimizing-performance/
- https://iseongho.github.io/posts/react-optimizing-performance/
- https://hyunseob.github.io/2019/06/02/react-component-the-right-way/
- https://ko.reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html
- https://github.com/wonism/TIL/blob/master/front-end/reactjs/etc/components-elements-instances.md