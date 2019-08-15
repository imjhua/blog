---
layout: post
title: React DOM Element
categories: React
categories: TODO
---

https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html

https://ko.reactjs.org/docs/dom-elements.html



ReactElement vs ReactComponent
가상 돔을 대할 때, 이 두 가지의 차이점에 대해 알아보는 것이 중요하다.

ReactElement
이건 리액트에서 표준 타입이다. 리액트 설명에는 이렇게 되어 있다.

ReactElement는 가볍고, 상태가 없고, 불변이며 돔 요소의 가상 표현식이다.

ReactElement는 가상 돔 안에 포함되어 있다. 이 개념들이 노드를 생성한다. ReactElement의 불변성이 다루기 쉽고, 비교와 업데이트를 빠르게 만들어준다. 이러한 것들이 리액트의 퍼포먼스가 뛰어난 이유다.

어떤 것들이 ReactElement가 될 수 있을까? HTML 태그라면 어떤 것들이던 가능하다. - div, table, strong등등. 이곳에 전체 리스트가 있다.

앞에서 정의한 것처럼, ReactElements는 일반 돔으로 그려질 수 있다. 여기서부터는 리액트가 요소들을 관리하는 게 중단되는 부분이다. 이것들은 느린 돔 노드가 된다.

var root = React.createElement('div');
ReactDOM.render(root, document.getElementById('example'));
// If you are surprised by the fact that `render`
// comes from `ReactDOM` package, see the Post Scriptum.
JSX는 HTML 태그를 ReactElements로 컴파일 한다. 아래와 같은 형식이다.

var root = <div />;
ReactDOM.render(root, document.getElementById('example'));
다시 한 번 말하지만, ReactElements는 리액트 가상 돔의 기본적인 아이템들이다. 하지만, 거기에는 상태 값이 없으므로 개발자들이 봤을 때 크게 도움이 될 것 같이 생기지는 않았다. 차라리 우리는 변수와 상수를 이용한, 클래스처럼 생긴 HTML로 작업하는 편이 더 나을 것 같다. 그렇게 생각하지 않나? 그렇다면...

ReactComponent
ReactComponent와 ReactElement의 차이점은 ReactComponents에는 상태 값이 있다는 것이다. 우리는 보통 어떤 것을 정의할 때 React.createClass 메소드를 사용한다.

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
HTML스러운 블럭은 상태 값을 가질 수 있는 render 메소드를 반환한다. 그리고 가장 좋은 건 (이미 알고 있겠지만, 리액트는 짱이다!) 상태 값이 바뀔 때마다 컴포넌트는 다시 그려진다.

var Timer = React.createClass({
  getInitialState: function() {
    return {secondsElapsed: 0};
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
});
ReactComponents는 동적인 HTML을 디자인 할 수 있는 좋은 도구라고 알려졌다. ReactComponents이 가상 돔에 직접 접근할 수 있는 건 아니지만, ReactElements으로 쉽게 컨버팅 된다.

var element = React.createElement(MyComponent);
// or equivalently, with JSX
var element = <MyComponent />;
차이점
ReactComponents은 훌륭하다, 또한 다루기 쉬우므로 많이들 사용하고 있다.

ReactComponent가 상태 값을 바꿀 때, 우리는 일반 돔이 가능하면 최대한 적게 변하길 원한다. 이게 바로 리액트가 하는 역할이다. ReactComponent는 ReactElement로 변환된다. 그러면 ReactElement은 빠르고 쉽게 비교, 업데이트 작업을 한 후 가상 돔에 삽입된다. 일반 돔을 다룰 때보다 훨씬 빠르고 정확하게 된다. (이건 리액트 안에 선언된 diff 알고리즘을 통해 계산된다.)

리액트가 수정 내역을 알게 되면, 이 부분은 low-level(HTML DOM)으로 바뀌고, 일반 돔 안으로 삽입된다. 그 코드는 브라우저에 의해 최적화 된다.

요약
가상 돔이 정말 메인 페이지를 강화할 수 있는 기능일까? 나는 그렇다고 생각한다. 예제를 통해서 리액트의 퍼포먼스는 굉장히 좋고, 가상 돔은 정말 큰 도움이 되었다.

추가. 지난주에 리액트 0.14 버전이 나왔는데 돔 처리와 관련된 부분은 react-dom 이름으로 react 패키지에서 따로 분리 되었다. 새롭게 바뀐 점은 여기에서 더 읽을 수 있다.



----
해당 내용은 다음 글을 참고 하였습니다.
- https://ko.reactjs.org/docs/dom-elements.html
- http://webframeworks.kr/tutorials/translate/virtual-dom/