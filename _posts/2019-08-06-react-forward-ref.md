---
layout: post
title: forwardRef 의 활용
categories: React
---

React에는 ref속성이 있습니다. 접근하는 대상에 따라 크게 3가지로 나위어 지는데, 그 중 함수형 컴포넌트에서 다른 함수형 컴포넌트의 DOM요소에 접근 할 수 있는 forwardRef에 대해 알아 보겠습니다.


## ref의 쓰임
클래스 형 컴포넌트와 함수형 컴포넌트를 나누어서 총 5가지의 경우가 존재 합니다.

- 클래스 DOM 요소에 ref 추가하기
- 클래스 컴포넌트에 ref 추가하기
- `클래스와 함수형 부모컴포넌트`에서 자식의 DOM노드에 접근해야 하는 경우 (custorm Attr)
- 함수형 컴포넌트에 ref 추가하기 -> `함수형 컴포넌트는 인스턴스가 아니기 때문에 사용 불가 함`
- 함수형 컴포넌트 DOM 요소에 ref 추가하기
- `함수형 부모컴포넌트에서 자식의 DOM노드에 접근해야 하는 경우(custrom attr 또는 forwardRef 활용)`


### 클래스 DOM 요소에 ref 추가하기
필드 정의후 ref속성을 바인딩 하여 사용합니다. 

```js
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={(input) => { this.textInput = input; }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

### 클래스 컴포넌트에 ref 추가하기
ref속성에 다른 컴포넌트를 바인딩하여 사용합니다.

```js
class AutoFocusTextInput extends React.Component {
  componentDidMount() {
    this.textInput.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput
        ref={(input) => { this.textInput = input; }} />
    );
  }
}
```

### 클래스와 함수형 부모컴포넌트에서 자식의 DOM노드에 접근해야 하는 경우
커스텀 ref속성 사용하여 프롭으로 ref를 전달하여 사용합니다. 

```js
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

### 함수형 컴포넌트에 ref 추가하기 
함수형 컴포넌트는 인스턴스가 아니기 때문에 사용 불가합니다. 대안으로는 forwardRef를 활용하여 함수형 부모컴포넌트에서 자식의 DOM노드에 접근하여 ref에 필요한 함수들을 추가 하여 호출할 수 있습니다. 

### 함수형 컴포넌트 DOM 요소에 ref 추가하기
함수형 컴포넌트 내부에서 ref 속성을 다음과 같이 사용할 수 있습니다.

```jsx
function CustomTextInput(props) {
  // textInput must be declared here so the ref callback can refer to it
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );  
}
```

### 함수형 부모컴포넌트에서 자식의 DOM노드에 접근해야 하는 경우 (custrom attr 또는 forwardRef 활용)
 React 16.3이상에서 제공되는 API입니다. React 16.3 이상을 사용하는 경우 이러한 경우에 Ref Forwarding을 사용하는 것이 좋습니다. ref 전달은 구성 요소가 하위 구성 요소의 참조를 자신의 것으로 노출하도록 선택할 수있게합니다. 참조 전달 문서에서 하위 DOM 노드를 상위 구성 요소에 노출하는 방법에 대한 자세한 예를 찾을 수 있습니다.


```js
import React, { useEffect, forwardRef, useRef, createRef } from "react";

const Modal = forwardRef((props, ref) => {
  useEffect(() => {
    console.log(ref);
    if (ref.current != null) {
      console.log("modal bind");
      ref.current.open = open;
      ref.current.close = close;
    }
  }, []);

  const open = () => {
    console.log("open");
  };
  const close = () => {
    console.log("close");
  };

  return (
    <div ref={ref}>
      <div>Common Modal영역입니다.</div>
      {/* <input ref={ref} /> */}
    </div>
  );
});

let modalRef = createRef();
const MyModal = props => {
  const open = () => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  };
  const close = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <div>
      <Modal ref={modalRef} />
      <div>
        Not work!!
        <div>
          <button onClick={modalRef.current ? modalRef.current.open : null}>
            open
          </button>
          <button onClick={modalRef.current ? modalRef.current.close : null}>
            close
          </button>
        </div>
      </div>
      <div>
        OK!
        <div>
          <button onClick={open}>open</button>
          <button onClick={close}>close</button>
        </div>
      </div>
    </div>
  );
};

export default MyModal;

```

custromArr를 사용하면 동일하게 동작은 합니다.
```js
import React, { useEffect, forwardRef, useRef, createRef } from "react";

const Modal = ({ myref }) => {
  useEffect(() => {
    console.log(myref);
    if (myref.current != null) {
      console.log("modal bind");
      myref.current.open = open;
      myref.current.close = close;
    }
  }, []);

  const open = () => {
    console.log("open");
  };
  const close = () => {
    console.log("close");
  };

  return (
    <div ref={myref}>
      <div>Common Modal영역입니다.</div>
      {/* <input ref={ref} /> */}
    </div>
  );
};

let modalRef = createRef();
const MyModal = props => {
  const open = () => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  };
  const close = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <div>
      <Modal myref={modalRef} />
      <div>
        Not work!!
        <div>
          <button onClick={modalRef.current ? modalRef.current.open : null}>
            open
          </button>
          <button onClick={modalRef.current ? modalRef.current.close : null}>
            close
          </button>
        </div>
      </div>
      <div>
        OK!
        <div>
          <button onClick={open}>open</button>
          <button onClick={close}>close</button>
        </div>
      </div>
    </div>
  );
};

export default MyModal;

```


## 정리

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

이러한 방법으로 FancyButton을 사용하는 컴포넌트는 DOM button을 직접 사용하는 것처럼 밑에 있는 button DOM 노드의 ref에 접근하고 필요에 따라 액세스할 수 있습니다.

다음은 위 예제에서 발생하는 상황에 대한 단계별 설명입니다.

React.createRef를 호출하여 React ref를 만들고 ref 변수를 지정합니다.
ref를 JSX 어트리뷰트로 지정하여 아래 <FancyButton ref={ref}>에 전달합니다.
React가 ref를 forwardRef 내부의 (props, ref) => ... 함수에 두 번째 인수로 전달합니다.
이 ref 인수를 JSX 어트리뷰트로 지정하여 아래 <button ref={ref}>에 전달합니다.
ref가 연결되면 ref.current가 <button> DOM 노드를 가리킵니다.
---

해당 내용은 다음 글을 참고 하였습니다.
- https://ko.reactjs.org/docs/forwarding-refs.html
- https://www.gaesignerblog.com/post/60