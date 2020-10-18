---
layout: post
title: React Portals를 사용하여 외부 DOM에 렌더링 하기
categories: React
---

포털(portal)은 하위 컴포넌트를 상위 컴포넌트의 DOM 계층 외부에있는 DOM 노드로 렌더링하는 방법을 제공합니다. v16에서 도입된 Portals기능을 사용하면 어디에 렌더링 시킬지 DOM을 선택하므로써, 부모의 DOM에 속하지 않는 독립적인 컴포넌트를 렌더링 할 수 있습니다.

## Portals

지금까지 컴포넌트를 렌더링 할 때에, 자식 컴포넌트는 부모 컴포넌트의 DOM내부에 렌더링 되어야만 했습니다. 개발을 하다보면 부모와는 독립적으로 존재하는 자식 컴포넌트들은 부모와의 독립성을 유지하는데 어려움이 있었습니다. 예를들면 Modal, Dialog, Tooltip등이 있을 것입니다. 이러한 컴포넌트들을 포탈을 사용하면 렌더링되어야 하는 DOM을 선택하여 부모의 DOM에 속하지 않는 다른 위치에 컴포넌트를 구성 할 수 있습니다. 또, 포탈을 사용하면 하위 컴포넌트에서 이벤트 버블링(Event Bubbling)을 잡아 낼 수 있기 때문에, 필요에 따라 하위 컴포넌트를 바꿔넣은 유연한 구조를 만들 수 있습니다.

### 사용법

Portal은 ReactDOM에 새로 추가된 함수로, 부모 컴포넌트의 DOM구조 밖에 존재하는 영역에 자식을 추가할 수 있도록 합니다.

```jsx
render() {
    // React does *not* create a new div. It renders the children into `domNode`.
    // `domNode` is any valid DOM node, regardless of its location in the DOM.
    return ReactDOM.createPortal(
        this.props.children,
        domNode,
    );
}
```

첫 번째 인자(child)는 엘리먼트, 문자열, 혹은 fragment와 같은 어떤 종류이든 렌더링할 수 있는 React 자식입니다. 두 번째 인자(container)는 DOM 엘리먼트입니다.

### 컴포넌트에서의 사용

id가 modal인 DOM영역은 다음과 같이 이미 존재 합니다.

```html
<body>
  <noscript> You need to enable JavaScript to run this app. </noscript>
  <div id="root"></div>
  <div id="modal-root"></div>
</body>
```

createPortal을 사용하여 이미 존재하는 DOM에 children 컴포넌트를 렌더링 합니다.

```js
import ReactDOM from "react-dom";

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal");
  return ReactDOM.createPortal(children, el);
};

export default ModalPortal;
```

children 컴포넌트는 다음과 같은 MyModal 컴포넌트 입니다.

```js
const MyModal = () => {
  return (
    <div className="MyModal">
      <div className="content">
        <h3>이것은 모달</h3>
        <p>궁시렁 궁시렁 내용입니다.</p>
        <button>닫기</button>
      </div>
    </div>
  );
};

export default MyModal;
```

### 사용시 주의 사항

사용시 주의할 점은 두번째 인자로 넘기는 DOM 엘리먼트는 virtaulDOM이 아닌, 이미 생성되어 있는 DOM이어야 한다는 점 입니다. 또한, 포탈생성을 담당하는 ModalPortal은 자식(children)이 마운트 된후 DOM에 삽입됩니다. 만약 자식 컴포넌트가 마운트 되기전, 포탈을 통해 자식에게 접근하려고 하면 정상으로 동작하지 않을 것입니다. 마운트될 때 그것을 즉시 DOM 트리에 연결해야만 한다면, 예를 들어, DOM 노드를 계산한다든지 자식 노드에서 'autoFocus'를 사용한다든지 하는 경우에, Modal에 state를 추가하고 Modal이 DOM 트리에 삽입되어 있을 때만 자식을 렌더링해야 합니다.

```js
// 여기 이 두 컨테이너는 DOM에서 형제 관계입니다.
const appRoot = document.getElementById("app-root");
const modalRoot = document.getElementById("modal-root");

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    // Portal 엘리먼트는 Modal의 자식이 마운트된 후 DOM 트리에 삽입됩니다.
    // 요컨대, 자식은 어디에도 연결되지 않은 DOM 노드로 마운트됩니다.
    // 만약 자식 컴포넌트가 마운트될 때 그것을 즉시 DOM 트리에 연결해야만 한다면,
    // 예를 들어, DOM 노드를 계산한다든지 자식 노드에서 'autoFocus'를 사용한다든지 하는 경우에,
    // Modal에 state를 추가하고 Modal이 DOM 트리에 삽입되어 있을 때만 자식을 렌더링하십시오.
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicks: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 이것은 Child에 있는 버튼이 클릭 되었을 때 발생하고 Parent의 state를 갱신합니다.
    // 비록 버튼이 DOM 상에서 직계 자식이 아니라고 하더라도 말입니다.
    this.setState((state) => ({
      clicks: state.clicks + 1,
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools to observe that the button is not a child
          of the div with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}
```

### 이벤트 버블링

portal이 DOM 트리의 어디에도 존재할 수 있다 하더라도 모든 다른 면에서 일반적인 React 자식처럼 동작합니다. context와 같은 기능은 자식이 portal이든지 아니든지 상관없이 정확하게 같게 동작합니다. 이는 DOM 트리에서의 위치에 상관없이 portal은 여전히 React 트리에 존재하기 때문입니다.

이것에는 이벤트 버블링도 포함되어 있습니다. portal 내부에서 발생한 이벤트는 React 트리에 포함된 상위로 전파될 것입니다. DOM 트리에서는 그 상위가 아니라 하더라도 말입니다.
portal에서 버블링된 이벤트를 부모 컴포넌트에서 포착한다는 것은 본질적으로 portal에 의존하지 않는 조금 더 유연한 추상화 개발이 가능함을 나타냅니다. 예를 들어, <Modal /> 컴포넌트를 렌더링할 때 부모는 그것이 portal을 사용했는지와 관계없이 <Modal />의 이벤트를 포착할 수 있습니다.

## 정리

한 마디로 요약하자면 Portal 컴포넌트는 논리적으로 하위 컴포넌트여야 하는데, 시각적으로는 상위 컴포넌트를 덮어야 할 상황일 때 사용할수 있는 기능입니다.

---

해당 내용은 다음 글을 참고 하였습니다.

- https://ko.reactjs.org/docs/portals.html
- https://velog.io/@velopert/react-portals
- https://hyunseob.github.io/2019/06/02/react-component-the-right-way/
- https://www.jayfreestone.com/writing/react-portals-with-hooks/
